const app = require("./index.js").helloHttp;

const server = app.listen(3000);
new Promise(function (resolve, reject) {
  server.on("listening", function () {
    const url = `http://127.0.0.1:${server.address().port}/manifest.json`;
    console.log("HTTP addon accessible at:", url);
    if (process.argv.includes("--launch")) {
      const base = "https://staging.strem.io#";
      //const base = 'https://app.strem.io/shell-v4.4#'
      const installUrl = `${base}?addonOpen=${encodeURIComponent(url)}`;
      opn(installUrl);
    }
    if (process.argv.includes("--install")) {
      opn(url.replace("http://", "stremio://"));
    }
    resolve({ url, server });
  });
  server.on("error", reject);
});
