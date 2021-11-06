const express = require("express");
const fs = require("fs-extra");

const app = express();
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
      else if (file.startsWith("redirect: ")) res.redirect(file.substring(10));
      else res.status(status).sendFile(path);
    })
    else resolve(false); // file did not exist
  }))
}

require("dotenv").config(); // load in environment variables if they're in .env file
if (!process.env.PORT) {
  console.log("No port was found in environment variable or .env file, exiting.");
  process.exit(1);
}

app.listen(process.env.PORT, () => console.log(`Webserver started on port ${process.env.PORT}`));

if (!fs.existsSync("./content")) {
  console.log("No content is present, will copy over example content to get you started.");
  fs.copy("./content-example", "./content", err => err ? console.log(err) : console.log("Copy successful."))
}