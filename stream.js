var axios = require("axios").default;
var urlStatusCode = require('url-status-code');

async function getMeta(imdbId, tmdbToken = "e4e9c05e1c65b5dc20e239cae5a88b2c") {
    try {
        var meta = (
            await axios.get(
                `https://api.themoviedb.org/3/find/${imdbId}?api_key=${tmdbToken}&language=en-US&external_source=imdb_id`
            )
        ).data;
    } catch (error) {
        console.error(
            `The MovieDB id retrieval failed with http status ${error.response.status}`
        );
    }
    let { id, name } = meta.tv_results[0];
    return {
        tmdbId: id,
        name,
    };
}

function checkUrl(url) {
    return urlStatusCode(url).then(code => code === 200).catch((err) => false);
}

/*async function getToken() {
    try {
        var series = (
            await axios.get(
                `https://megahdfilmes.com/wp-json/api/tvshows?what=launch&version=5.4`
            )
        ).data;
    } catch (error) {
        console.error(
            `Token retrieval failed with http status ${error.response.status}`
        );
    }

    for (m of series.data) {
        for (p of m.seasons[0].episodes[0].player) {
            if (p.title === `Mega Player`) {
                let url = new URL(p.url);

                return url.hostname.split(".")[0];
            }
        }
    }
}*/

module.exports = { getMeta, checkUrl };
