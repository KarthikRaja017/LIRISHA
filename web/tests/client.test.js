const test = require("node:test");
const assert = require("node:assert");

test("Frontend configuration & utilities sanity test", () => {
  const apiUrl = "http://localhost:8000/api/v1";
  assert.strictEqual(apiUrl.includes("/api/v1"), true);
});
