var axios = require("axios").default;

async function getMeta(imdbId, tmdbToken = "e4e9c05e1c65b5dc20e239cae5a88b2c") {
  console.log(imdbId);
  let meta = (
    await axios.get(
      `https://api.themoviedb.org/3/find/${imdbId}?api_key=${tmdbToken}&language=en-US&external_source=imdb_id`
    )
  ).data;
  console.log(meta);
  return meta.tv_results[0];
}

async function getToken() {
  let series = (
    await axios.get(
      `https://megahdfilmes.com/wp-json/api/tvshows?what=launch&version=5.4`
    )
  ).data;

  for (m of series.data) {
    for (p of m.seasons[0].episodes[0].player) {
      if (p.title === `Mega Player`) {
        let url = new URL(p.url);

        return url.hostname.split(".")[0];
      }
    }
  }
}

module.exports = { getMeta, getToken };
