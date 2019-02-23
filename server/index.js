const { start } = require("./server.js");

try {
  await start()
} catch(e) {
  console.log(`[ERROR] - something went wrong during the start`);
}
