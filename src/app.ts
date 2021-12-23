import { existsSync, readFileSync, statSync } from "fs";
import express from "express";
import { expressLogger } from "./utils/logger";
import { join } from "path";

export default function(contentFolder: string, overrideHostname?: string, commonFolder = "_common") {
  if (!existsSync(contentFolder)) throw new Error("No content folder found");

  const app = express();
  app.use(expressLogger);

  app.get("/*", (req, res) => {
    const domain = overrideHostname || req.hostname;

    let path = req.path.substring(1) || "index.html";
    if (!path.includes(".")) path += ".html";
    if (path.includes("..")) return res.sendStatus(403);

    // test for file
    const files = [
      join(contentFolder, domain, path), // content/example.com/index.html
      join(contentFolder, commonFolder, path), // content/_common/index.html
    ];
    const file = files.find(testFile);

    if (file) {
      const fileContent = readFileSync(file, "utf8");
      if (fileContent.startsWith("redirect: ")) return res.redirect(fileContent.substring(10)); // test for redirect
      return res.sendFile(file);
    }

    // test for 404 file
    const files404 = [
      join(contentFolder, domain, "404.html"), // content/example.com/404.html
      join(contentFolder, commonFolder, "404.html"), // content/_common/404.html
    ];
    const file404 = files404.find(testFile);

    if (file404) return res.status(404).sendFile(file404);

    // return plain 404
    return res.sendStatus(404);
  });

  return app;
}

function testFile(path: string): boolean {
  return existsSync(path) && statSync(path).isFile();
}
