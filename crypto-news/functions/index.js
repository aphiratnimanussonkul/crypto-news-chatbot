"use strict";
const fetch = require("node-fetch");
const { WebhookClient } = require("dialogflow-fulfillment");
// @ts-ignore
const { Card, Suggestion } = require("dialogflow-fulfillment");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    // @ts-ignore
    type: "service_account",
    project_id: "crypto-news-chatbot",
    private_key_id: "6e2a49a5dd197685a00fe1be99589e9b604b2878",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/yeMP0ryr6QlN\nTP3VbNgNoD/bfMlwuFeyGRCAau6NbGh+CF1sr6R0eDEFQfZ4twn8Jw+VpAPTYRsD\nnxFuBLD0XT14Cp88VN7Q3RVoNWv+UOGwJwxObbsOyRX+5/imWvpr5jPVaE+8q9Qs\n8i6/DR9HMW+3jaxaEh+9BnS8HV6ICTRBV2hWzkcRh/4vloM+Cq72LplE9HA4/x3x\ngeqPL9XZSOYqHK1UP+dQtEur7IK8rayttcMFHwURKggrMtw7n/5nXOVccgoJQmf8\nAuysiLvNhAYc20ag+etxUa86HIWszQqBbMMRQaG0Z8VOcEwcm3eRLPInDZ9dB5iy\nQYc5khk5AgMBAAECggEAHufIwWvV/8/cMgrg8UEKaduzyUnzvh3T8pJWaz3lYNXM\n2tkR5lSW0uFBaQBRrZngBTRC2dF7KldraSsmEw1feelX4Uhjk5nLlBW5quLHmyJB\nKXKJaaQGG40COzhPWc4EV68vasmAkT3mlt2UnzCH+fV4nrgOQ4TIfNyVosYKzdnX\nNGgk0OyXVGabOp7xUYWxBubi4re2EMbmk/u+s4SNG3ZltVvkFXcPkN5ZQHziN3Zc\nEdgNi8gex76WPoNj0FTxdAybZIQq+07wTa76qgQH3H/ANhg6pmfvJQAIips+pu9X\nS3OtJMQiDScUuAQlhqC3XoZ1hDPFRyKcXZM7x/wZtwKBgQD7PctqPSrlTuYDTF9I\nAdnKvb79vPnhGpF6IzN2J4gF0EcAGVgqV5RJWwLNikP1Qvz3zqS8z1hhROJtdKdv\nV78VO2xm371w+zMhl4FjbboPtlC2G/wpVEZWL3yAfULSVT3zlnxfI5HksEPWt1Fo\nw2D0+spBXjU7J8kP9Xt4Onek/wKBgQDDa9IyHl8T/SSOdVI+r6sim/YmzXEOVE27\nEk4t9rRsOXv6VBGpmwnIV4nGlx/ocAQ11Hl2j44CKl9aLJ//Y/BhqMbPVZZ/0Sxo\ny4V1bMAfcUJhh2yKL0midjVIdzJJB+mx6qURl8mdj6xyD3dHs5+mUO66G/R6hQXC\nQGfDLtwpxwKBgQDlO5ihsnW1C6vqToCRHr8ssLvWn9oOfUNHAV8u6xq80zA08ury\nlz4BQDzqdMFUwm41XCIK89Rby5Ic9FbgzFrYcIOTyYj70PbyK14u7irZsyspPZdx\nzibu9BzQz3lsl8ISwrdvxvCSjBEZk+F/iOSqITjxM5e2BbL6EK07IX2Q2QKBgBC2\nlvqMWGtYOhko9YjA82z5U7sL1QB5u1Alh6Qstk+PNwg4ym3sAZEt0221nRf/BI0q\nB91Y97c9snv+1ww7muJvUdmHo2B5Hkg0J8zcKS5HPHsk3uaOlsibPYFeGGHgmF8M\nB2QSzD56fDAhHH14Yk4SG+i03VrhJ5XudjFeP5wfAoGAYEkuoLq7rZIJM1syOwcw\nMmoa7Su5tJdPBSOdZFizG3VEjBClqJQCtpd3IGap+ocbV+m9r5+N4HWSFv0e18Cw\nLJU9YnHzepbrgr/ZTP0NhM8+3+S7u9sOrZt2wz3wYILAkT6VAhT6Tsy4reEwqEg5\ncE7eouviLxqaOBV/YmgHcmA=\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-y233u@crypto-news-chatbot.iam.gserviceaccount.com",
    client_id: "113647215053630451095",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-y233u%40crypto-news-chatbot.iam.gserviceaccount.com",
  }),
  databaseURL: "https://crypto-news-chatbot.firebaseio.com",
});

const db = admin.firestore();

var url =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,ADA,DOT,USDT,XRP,LTC,BCH,BNB,LINK";
const requestOptions = {
  method: "GET",
  uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
  qs: {
    start: "1",
    limit: "100000000000000000",
    convert: "USD",
  },
  headers: {
    "X-CMC_PRO_API_KEY": "1cd6a078-e484-4a96-99b9-7524fa67164b",
  },
  json: true,
  gzip: true,
};

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
  (request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log(
      "Dialogflow Request headers: " + JSON.stringify(request.headers)
    );
    console.log("Dialogflow Request body: " + JSON.stringify(request.body));

    function select(agent) {
      var my = JSON.stringify(request.body);
      var parseData = JSON.parse(my);
      var favorite =
        parseData.originalDetectIntentRequest.payload.data.postback.payload;
      var sender = parseData.originalDetectIntentRequest.payload.data.sender.id;
      console.log(`Sender id = ${sender}`);

      saveFavorite(favorite);
      agent.add(`Your is ${favorite} in favorite`);
    }

    function saveFavorite(curreny) {
      return db
        .collection("users")
        .doc("bb1SMPu9BnxZemoxEzHd")
        .set({
          favoriteCoin: curreny,
          id: 2640677152657766,
        })
        .then(() => {});
    }

    function bitcoinprice(agent) {
      // @ts-ignore
      return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((json) => {
          // do something with JSON
          const my = json;
          const myJSON = JSON.stringify(my);
          const parseData = JSON.parse(myJSON);
          const priceJSON = parseData.data.BTC.quote.USD.price;
          const price = JSON.stringify(priceJSON);
          const priceis = parseFloat(price).toFixed(2);
          agent.add("$" + priceis);
        })
        .catch(() => {
          agent.add("error");
        });
    }
    function ethereumprice(agent) {
      // @ts-ignore
      return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((json) => {
          // do something with JSON
          const my = json;
          const myJSON = JSON.stringify(my);
          const parseData = JSON.parse(myJSON);
          const priceJSON = parseData.data.ETH.quote.USD.price;
          const price = JSON.stringify(priceJSON);
          const priceis = parseFloat(price).toFixed(2);
          agent.add("$" + priceis);
        })
        .catch(() => {
          agent.add("error");
        });
    }
    function tetherprice(agent) {
      // @ts-ignore
      return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((json) => {
          // do something with JSON
          const my = json;
          const myJSON = JSON.stringify(my);
          const parseData = JSON.parse(myJSON);
          const priceJSON = parseData.data.USDT.quote.USD.price;
          const price = JSON.stringify(priceJSON);
          const priceis = parseFloat(price).toFixed(2);
          agent.add("$" + priceis);
        })
        .catch(() => {
          agent.add("error");
        });
    }
    function polkadotprice(agent) {
      // @ts-ignore
      return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((json) => {
          // do something with JSON
          const my = json;
          const myJSON = JSON.stringify(my);
          const parseData = JSON.parse(myJSON);
          const priceJSON = parseData.data.DOT.quote.USD.price;
          const price = JSON.stringify(priceJSON);
          const priceis = parseFloat(price).toFixed(2);
          agent.add("$" + priceis);
        })
        .catch(() => {
          agent.add("error");
        });
    }
    function xrpprice(agent) {
      // @ts-ignore
      return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((json) => {
          // do something with JSON
          const my = json;
          const myJSON = JSON.stringify(my);
          const parseData = JSON.parse(myJSON);
          const priceJSON = parseData.data.XRP.quote.USD.price;
          const price = JSON.stringify(priceJSON);
          const priceis = parseFloat(price).toFixed(2);
          agent.add("$" + priceis);
        })
        .catch(() => {
          agent.add("error");
        });
    }
    function cardanoprice(agent) {
      // @ts-ignore
      return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((json) => {
          // do something with JSON
          const my = json;
          const myJSON = JSON.stringify(my);
          const parseData = JSON.parse(myJSON);
          const priceJSON = parseData.data.ADA.quote.USD.price;
          const price = JSON.stringify(priceJSON);
          const priceis = parseFloat(price).toFixed(2);
          agent.add("$" + priceis);
        })
        .catch(() => {
          agent.add("error");
        });
    }
    function litecoinprice(agent) {
      // @ts-ignore
      return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((json) => {
          // do something with JSON
          const my = json;
          const myJSON = JSON.stringify(my);
          const parseData = JSON.parse(myJSON);
          const priceJSON = parseData.data.LTC.quote.USD.price;
          const price = JSON.stringify(priceJSON);
          const priceis = parseFloat(price).toFixed(2);
          agent.add("$" + priceis);
        })
        .catch(() => {
          agent.add("error");
        });
    }
    function bitcoincashprice(agent) {
      // @ts-ignore
      return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((json) => {
          // do something with JSON
          const my = json;
          const myJSON = JSON.stringify(my);
          const parseData = JSON.parse(myJSON);
          const priceJSON = parseData.data.BCH.quote.USD.price;
          const price = JSON.stringify(priceJSON);
          const priceis = parseFloat(price).toFixed(2);
          agent.add("$" + priceis);
        })
        .catch(() => {
          agent.add("error");
        });
    }
    function chainlinkprice(agent) {
      // @ts-ignore
      return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((json) => {
          // do something with JSON
          const my = json;
          const myJSON = JSON.stringify(my);
          const parseData = JSON.parse(myJSON);
          const priceJSON = parseData.data.LINK.quote.USD.price;
          const price = JSON.stringify(priceJSON);
          const priceis = parseFloat(price).toFixed(2);
          agent.add("$" + priceis);
        })
        .catch(() => {
          agent.add("error");
        });
    }
    function binancecoinprice(agent) {
      // @ts-ignore
      return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((json) => {
          // do something with JSON
          const my = json;
          const myJSON = JSON.stringify(my);
          const parseData = JSON.parse(myJSON);
          const priceJSON = parseData.data.BNB.quote.USD.price;
          const price = JSON.stringify(priceJSON);
          const priceis = parseFloat(price).toFixed(2);
          agent.add("$" + priceis);
        })
        .catch(() => {
          agent.add("error");
        });
    }

    async function getLastNews(agent, currency) {
      try {
        return db
          .collection("news")
          .limit(5)
          .get()
          .then((result) => {
            let getNewsResult = [];
            result.docs.map((data) => {
              getNewsResult.push(data.data());
            });
            getNewsResult = getNewsResult
              .reverse()
              .filter((news) =>
                news.currencies.find((cur) => cur.code == currency)
              );
            if (getNewsResult[0]) {
              agent.add(`${getNewsResult[0].title} ${getNewsResult[0].url}`);
            } else {
              agent.add(`ยังไม่มีข่าวใหม่เกี่ยวกับเหรียญ ${currency}`);
            }
          });
      } catch (error) {
        console.log("error when get data from fb", error);
        return null;
      }
    }

    async function ethereumnews(agent) {
      await getLastNews(agent, "ETH");
    }

    async function bitcoinnews(agent) {
      await getLastNews(agent, "BTC");
    }

    async function tethernews(agent) {
      await getLastNews(agent, "USDT");
    }

    async function polkadotnews(agent) {
      await getLastNews(agent, "DOT");
    }

    async function xrpnews(agent) {
      await getLastNews(agent, "XRP");
    }

    async function cardanonews(agent) {
      await getLastNews(agent, "ADA");
    }

    async function litecoinnews(agent) {
      await getLastNews(agent, "LTC");
    }

    async function bitcoincashnews(agent) {
      await getLastNews(agent, "BCH");
    }

    async function chainlinknews(agent) {
      await getLastNews(agent, "LINK");
    }

    async function binancecoinnews(agent) {
      await getLastNews(agent, "BNB");
    }

    let intentMap = new Map();
    intentMap.set("NewsETH", ethereumnews);
    intentMap.set("NewsBTC", bitcoinnews);
    intentMap.set("NewsUSDT", tethernews);
    intentMap.set("NewsDOT", polkadotnews);
    intentMap.set("NewsXRP", xrpnews);
    intentMap.set("NewsADA", cardanonews);
    intentMap.set("NewsLTC", litecoinnews);
    intentMap.set("NewsBCH", bitcoincashnews);
    intentMap.set("NewsLINK", chainlinknews);
    intentMap.set("NewsBNB", binancecoinnews);
    intentMap.set("PriceBTC", bitcoinprice);
    intentMap.set("PriceETH", ethereumprice);
    intentMap.set("PriceUSDT", tetherprice);
    intentMap.set("PriceDOT", polkadotprice);
    intentMap.set("PriceXRP", xrpprice);
    intentMap.set("PriceADA", cardanoprice);
    intentMap.set("PriceLTC", litecoinprice);
    intentMap.set("PriceBCH", bitcoincashprice);
    intentMap.set("PriceLINK", chainlinkprice);
    intentMap.set("PriceBNB", binancecoinprice);
    intentMap.set("Select", select);
    // intentMap.set('your intent name here', yourFunctionHandler);
    // intentMap.set('your intent name here', googleAssistantHandler);
    agent.handleRequest(intentMap);
  }
);


