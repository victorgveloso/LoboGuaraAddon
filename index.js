const serveHTTP = require("./serveHTTP");
const { addonBuilder, publishToCentral } = require("stremio-addon-sdk");
const {getMeta, getToken} = require("./stream");

const manifest = require("./manifest.json");
const addon = new addonBuilder(manifest);

addon.defineStreamHandler(async (args) => {
  let [ imdbId, season, episode ] = args.id.split(":");
  let { id, name } = await getMeta(imdbId);
  let token = await getToken();

  let streams = [
    {
      id: args.id,
      title: name,
      type: `series`,
      url: `https://${token}.belugacdn.link/${id}-${season}-${episode}.mp4`,
    },
  ];

  console.log(streams);

  return { streams };
});

exports.helloHttp = serveHTTP(addon.getInterface());