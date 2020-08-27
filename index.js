const serveHTTP = require("./serveHTTP");
const { addonBuilder, publishToCentral } = require("stremio-addon-sdk");
const { getMeta, checkUrl } = require("./stream");

const manifest = require("./manifest.json");
const addon = new addonBuilder(manifest);


addon.defineStreamHandler(async (args) => {
    let [imdbId, season, episode] = args.id.split(":");
    let { tmdbId, name } = await getMeta(imdbId);

    let streams = [
        {
            id: `${imdbId}:${season}:${episode}`,
            title: name,
            type: `series`,
            url: `https://braintv.azureedge.net/tv/${tmdbId}/${season}/dub/${episode}.mp4`,
            behaviorHints:{
                bingeGroup: `${name}-braintv`
            }
        }
    ].filter((stream) => checkUrl(stream.url));

    console.log(streams);

    return { streams };
});

exports.loboguara = serveHTTP(addon.getInterface());
