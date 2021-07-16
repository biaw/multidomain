const express = require('express'), app = express(), fs = require("fs"), config = require("./config.json");

app.use(require("morgan")("dev")) // logs server activity

app.get("/*", async (req, res) => {
  let path = req.path.substring(1) || "index.html";
  if (!path.includes(".")) path += ".html";

  if (await tryFile(res, `${__dirname}/content/${req.hostname}/${path}`)) return;
  if (await tryFile(res, `${__dirname}/content/_common/${path}`)) return;
  if (await tryFile(res, `${__dirname}/content/${req.hostname}/404.html`, 404)) return;
  if (await tryFile(res, `${__dirname}/content/_common/404.html`, 404)) return;

  res.sendStatus(404);
});

function tryFile(res, path, status = 200) {
  return new Promise(resolve => fs.stat(path, (err, stats) => {
    if (!err && stats.isFile()) fs.readFile(path, "utf8", (err, file) => {
      resolve(true); // we will respond here anyways so we can return early
      if (err) res.sendStatus(500);
      else if (file.startsWith("redirect:")) res.redirect(file.substring(10));
      else res.status(status).sendFile(path);
    })
    else resolve(false); // file did not exist
  }))
}

app.listen(config.port, () => console.log(`Webserver started on port ${config.port}`));