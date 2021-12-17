import initApp from "../src/app";
import { join } from "path";
import request from "supertest";

const content = join(__dirname, "multiserver-test-content");

const app = request(initApp(content));
const appWithHostnameOverride = request(initApp(content, "example.com"));

describe("GET /test(.html)", () => {
  it("should return 200", () => app.get("/test").expect(200));
  it("should return 200 (.html)", () => app.get("/test.html").expect(200));
});

describe("GET /test.json", () => {
  it("should return 200", () => app.get("/test.json").expect("Content-Type", /json/).expect(200));
});

describe("GET /test-domain", () => {
  it("should return 404 without hostname", () => app.get("/test-domain").expect(404));
  it("should return 200 with hostname", () => appWithHostnameOverride.get("/test-domain").expect(200));
});

describe("GET /test-redirect", () => {
  it("should return 302", () => app.get("/test-redirect").expect(302));
});

describe("GET /invalid", () => {
  it("should return 404", () => app.get("/invalid").expect(404));
});
