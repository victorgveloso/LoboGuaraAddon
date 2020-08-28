const serveHTTP = require("./serveHTTP");
const { addonBuilder, publishToCentral } = require("stremio-addon-sdk");
const { getMeta } = require("./stream");
var urlStatusCode = require('url-status-code');

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
        },
        {
            id: `${imdbId}:${season}:${episode}`,
            title: name,
            type: `series`,
            url: `https://hope.azureedge.net/thor/${tmdbId}/${season}/dub/${episode}.mp4`,
            behaviorHints:{
                bingeGroup: `${name}-hope`
            }
        }
    ].filter((stream) => urlStatusCode(stream.url)
            .then(code => code == 200)
            .catch((err) => false))
    .map((value,index)=>{ return {...value, title: value.title + ` [Server: ${index}]`}});

    console.log(streams);

    return { streams };
});

exports.loboguara = serveHTTP(addon.getInterface());
