#!/usr/bin/env node
var exec = require("child_process").exec;
var http = require("http");

const Twitter = require("twitter-v2");

const client = new Twitter({
  bearer_token:
    "AAAAAAAAAAAAAAAAAAAAACSGWgEAAAAAT2p9DA4UDf7BAEqDNzmOWhc%2BOg0%3DkMm1GsWo9I3mrVQjyBn3vKT7ZkjwOA0B1HLV2NzSUYdVTfgm0Z" /** Token */,
});

/** Opens the browser on the url.. */
const openBrowser = (url) => {
  exec(`open "${url}"`, function (error, stdout, stderr) {
    if (error !== null) {
      console.log("exec error: " + error);
    }
  })
};

const weekAgo = () => {
  var d = new Date();
  return new Date(d.setDate(d.getDate() - 6)).toISOString();
};

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/** ### Default Pattern
 *  Description: Return one random from the last 24 hours.
 */
const one = async () => {
  console.info("Getting you some Humor by opening a random #DevsPelades");
  let newsDevPelades;
  try {
    newsDevPelades = await client.get(
      `tweets/search/recent?start_time=${weekAgo()}&max_results=100&tweet.fields=attachments,author_id&expansions=author_id&query=%23devpelades`,
      ""
    );
  } finally {
    const chosenPelade =
      newsDevPelades.data[
        randomIntFromInterval(0, newsDevPelades.meta.result_count - 1)
      ];
    openBrowser(`https://twitter.com/i/web/status/${chosenPelade.id}`);
  }
  //
};

/** ## Get Some
 * Description: Open "N" new tabs.
 */
const some = (size) => {
  if (size > 10) {
    console.warn(`
      MEO! TU TÁ QUERENDO ABRIR ${size} DEVS PELADES???? PROCURA AJUDA MEU! Ou ... usa o "--all"
    `);
  } else {
    console.info("Toma aqui os que tu pediu");
  }
};

/** ### Open the hasthage itselfs */
const all = () => {
  console.info("Beleza vamo abrir a hashtag então broder");
};

/** Receives the CLI commands */
const cliArgs = process.argv.slice(2);

(() => {
  /** Where position 0 is the command and 1 the optional, if its there */
  const args = cliArgs.map((arg) => arg.replace(/--/g, ""));
  switch (args[0]) {
    /** Dava pra usar Regex aqui também, mas deu preguiça, sou um @devscansados */
    case "all":
    case "todos":
      all();

      console.log("Not implemented, gonna get u one");
      one();
      break;
    case "some":
    case "alguns":
      some(args[1]);
      console.log("Not implemented, gonna get u one");
      one();
      break;
    case "help":
    case "socorro":
      console.info("dude.. só roda mano...");
      break;
    default:
      one();
  }
})();
