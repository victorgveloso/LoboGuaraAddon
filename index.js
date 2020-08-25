const serveHTTP = require("./serveHTTP");
const { addonBuilder, publishToCentral } = require("stremio-addon-sdk");

const manifest = require("./manifest.json");
const addon = new addonBuilder({
  "id": "my.first.stremio.add-on",
  "version": "1.0.0",
  "name": "Hello, World",
  "description": "My first Stremio add-on",
  "logo": "https://www.stremio.com/website/stremio-logo-small.png",
  "resources": ["stream"],
  "types": ["series"],
  "catalogs": [],
});

addon.defineStreamHandler(async (args) => {
  let serie = args.id.split(":");
  let { id, name } = await getMeta(serie[ID]);
  let token = await getToken();

  let streams = [
    {
      id: args.id,
      title: name,
      type: `series`,
      url: ""//`https://${token}.belugacdn.link/${id}-${serie[SEASON]}-${serie[EPISODE]}.mp4`,
    },
  ];

  return { streams };
});

exports.helloHttp = serveHTTP(addon.getInterface());