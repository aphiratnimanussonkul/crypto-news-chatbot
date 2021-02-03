"use strict";
const fetch = require("node-fetch");
const { WebhookClient, Payload, Platforms } = require("dialogflow-fulfillment");
// @ts-ignore
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    // @ts-ignore
    type: "service_account",
    project_id: "kittitorn-fmefkd",
    private_key_id: "d92340f0a74c6687f421636442371bfb6e28fdaf",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDsln1R6MiIquoc\npmxmzcVzd5QXIodovmd/jUk75LeAgXr9Rei8SBM9Z4z6Le4gnRWJ+JoYcuVrZ8ZW\nmx0A7XMsGpQfTXP4nKvgFKNNnpxa+cFNie7QeHbBCsV7VUHsT/IgWwxY+FsLcuGk\nucAGwckXPUTC2nB7ZMmZocVsrAu/+C4iQ6Y5EmBa1kQZClgJDWVTSvY5GGx1eFN6\n9s9OeXps4IGC2GPaFV2dCdIXrtodNI1qJ4JPIEjdMsHkcye12OlrXz3835IzQe8K\nrkAl3rS6YkDq6sIFvoU9xLENdnBDF5pL5+DEdU7Oqq9WMUqj0oQiWDf80w/tdiCu\nlhNH/P+PAgMBAAECggEACCteInDuU8HLGbgpcBdU5RrQ80eO82/3tPDVAYtxRq+x\n5oL+eVnnyCwGMzFY0ql57+y0rXlyMJZBxAXRJ5ILcw9r4/TRt1j5mmA8D1cVwRJ0\nuU+0/l/agen0TcDw6M8N5k4ejAfvZOLPpdeAKPuSDQphkHTog2pEh9iNL6Z1NWi0\nd1nupYdTPZ5nJRsWp/WijuwX9CcbjSaT5YQFh8nETB4dXPn+nTbSMjZRwA7fVA46\n8nViBTwavFnTYx+ongiZz7BtOh8oG0LqFXvKZ6BAQCxEx1fu7zkMNw4ZxxcmIjBX\nrja8cPOxQVTcVatuYPVdQJRdzF0xWOeWy+EVLxjTgQKBgQD6sSIzfe6LxOlXu6X3\nXjICBODYIRAGBkXdA7Xq5IFbtv2zcPNlEHnC5cOLOlpcD0VcAnN390UjXM7OzvfQ\ntrai8nr/qcpyFO1Zq2M6fFSe4Z234XIKWUf6+NChceytiGjCk9aoO7PTq/htME3l\n12ch53ZJm6u5AzuF1/cQywotTwKBgQDxmOfBTNja7UwzWWgGRpiWCTjPN+1Ip0rH\nc8GCW1ezQW9AM62cWIwsTY7oIw6mrJWZLNdk4sImPexLNp86wBlbJCJ4onPI2jov\nveEJkxEOchr3t2BAT10mmGc9g61ek3z4PGAbfyAHhRnq+35BWLj2isqVuHyN/tMh\nSj9poxH5wQKBgHX99TkDJsnGToWqnn0Fasgkf6d6OE59mVhjLLZ4AqKmSFay7Pw+\nevDOr/DR8EGwNlcOGEb4rSPtxLD2HRGxTdj4BAhdZBm529T+o9+dMT7utgscI07X\notdvUNMMCffLYnNinf/kycjxAiZyO9fYQIRmqvgOOw8DhHqEoZbX2dxlAoGAPvbS\nr5YPjj759QgADGKpsbCFlbvFo4G2A3UvoYGcwaL0E49kV7LcFU/BRs6cKuQfuOPu\n3uQaJU1OH+wEY5NdCFvKgBYWhuoY8AhUdeJWN6WVUaoA88G7TSu6/FUtAdD+aNOT\nWJcxCcSulIcmyHEPA3H4ijyieX9IFwz6qdVOAgECgYEA+qeLoDwDVPvsSDZMhnQA\nJW2lC/MfyLfdYkgrRmgpRCdxdhSvES35NywiZ4Q4ZXdgSuDpSpE5i3gbO9uqq6VP\nohfCRMK8tPzQAXbX0r94B6mzwB1CtsteAUiabgA9GCLA44uJzbDqSsEpg/p63bNr\n6FL1GSn7091thdxn3dQ8fU0=\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-7h93i@kittitorn-fmefkd.iam.gserviceaccount.com",
    client_id: "113196491205536285035",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7h93i%40kittitorn-fmefkd.iam.gserviceaccount.com",
  }),
  databaseURL: "https://kittitorn-fmefkd.firebaseio.com",
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

    async function select(agent) {
      var my = JSON.stringify(request.body);
      var parseData = JSON.parse(my);
      var favorite =
        parseData.originalDetectIntentRequest.payload.data.postback.payload;
      var sender = parseData.originalDetectIntentRequest.payload.data.sender.id;
      console.log(`Sender id = ${sender}`);

      await saveFavorite(agent, favorite);
    }

    async function saveFavorite(agent, curreny) {
      return db
        .collection("users")
        .doc("bb1SMPu9BnxZemoxEzHd")
        .set({
          favoriteCoin: curreny,
          id: 2640677152657766,
        })
        .then(() => {
          agent.add(`Your is ${curreny} in favorite`);
        });
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
            if (getNewsResult.length) {
              let lastNewIndex =
                getNewsResult.length >= 5 ? 5 : getNewsResult.length;
              for (let i = 0; i < lastNewIndex; i++) {
                let message = `${getNewsResult[i].title} \n ${getNewsResult[i].url}`;
                agent.add(message);
              }
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

    async function showMyFavorite(agent) {
      return db
        .collection("users")
        .doc("bb1SMPu9BnxZemoxEzHd")
        .get()
        .then((result) => {
          let data = result.data();
          let favorite = "เหรียญที่คุณสนใจคือ \n";
          if (data.favoriteCoins) {
            data.favoriteCoins.forEach((coin) => {
              favorite = `${favorite}${coin}\n`;
            });
            agent.add(favorite);
          } else {
            agent.add("คุณยังไม่มีเหรียญที่สนใจ");
          }
        });
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
    intentMap.set("ติดตาม", showMyFavorite);
    intentMap.set("เหรียญของฉัน", showMyFavorite);
    // intentMap.set('your intent name here', yourFunctionHandler);
    // intentMap.set('your intent name here', googleAssistantHandler);
    agent.handleRequest(intentMap);

    function getFavoriteCoinCard(currency) {
      switch (currency) {
        case "ETH":
          return {
            buttons: [
              {
                title: "เลิกติดตาม",
                type: "postback",
                payload: "เลิกติดตาม ETH",
              },
            ],
            image_url:
              "https://satang.zendesk.com/hc/article_attachments/360052756911/mceclip0.png",
            default_action: {
              type: "web_url",
              url: "https://www.google.com/",
              webview_height_ratio: "tall",
            },
            title: "ETH",
          };
        case "BTC":
          return {
            default_action: {
              url: "https://www.google.com/",
              webview_height_ratio: "tall",
              type: "web_url",
            },
            buttons: [
              {
                title: "เลิกติดตาม",
                type: "postback",
                payload: "เลิกติดตาม BTC",
              },
            ],
            title: "BTC",
            image_url:
              "https://logos-world.net/wp-content/uploads/2020/08/Bitcoin-Logo-700x394.png",
          };
        case "USDT":
          return {
            default_action: {
              url: "https://www.google.com/",
              webview_height_ratio: "tall",
              type: "web_url",
            },
            buttons: [
              {
                title: "เลิกติดตาม",
                type: "postback",
                payload: "เลิกติดตาม USDT",
              },
            ],
            image_url:
              "https://www.coin-report.net/en/wp-content/uploads/sites/11/2018/01/tether-coin.png",
            title: "USDT",
          };
        case "DOT":
          return {
            image_url:
              "https://research.binance.com/static/images/projects/polkadot/logo.png",
            default_action: {
              url: "https://www.google.com/",
              type: "web_url",
              webview_height_ratio: "tall",
            },
            title: "DOT",
            buttons: [
              {
                title: "เลิกติดตาม",
                payload: "เลิกติดตาม DOT",
                type: "postback",
              },
            ],
          };
        case "XRP":
          return {
            title: "XRP",
            buttons: [
              {
                title: "เลิกติดตาม",
                type: "postback",
                payload: "เลิกติดตาม XRP",
              },
            ],
            image_url:
              "https://www.netclipart.com/pp/m/176-1761401_ripple-xrp-new-logo-png.png",
            default_action: {
              webview_height_ratio: "tall",
              type: "web_url",
              url: "https://www.google.com/",
            },
          };
        case "BCH":
          return {
            buttons: [
              {
                title: "เลิกติดตาม",
                type: "postback",
                payload: "เลิกติดตาม BCH",
              },
            ],
            default_action: {
              webview_height_ratio: "tall",
              type: "web_url",
              url: "https://www.google.com/",
            },
            image_url:
              "https://www.pngitem.com/pimgs/m/650-6504368_bitcoin-cash-bch-logo-hd-png-download.png",
            title: "BCH",
          };
        case "LINK":
          return {
            buttons: [
              {
                title: "เลิกติดตาม",
                type: "postback",
                payload: "เลิกติดตาม LINK",
              },
            ],
            title: "LINK",
            image_url:
              "https://blockspaper-prod.oss-ap-southeast-1.aliyuncs.com/20200828e1a6c1a79bf98c48.jpg",
            default_action: {
              type: "web_url",
              url: "https://www.google.com/",
              webview_height_ratio: "tall",
            },
          };
        case "BNB":
          return {
            image_url:
              "https://bitcoinaddict.org/wp-content/uploads/2019/12/12-19-2019-10-35-45-AM.png",
            buttons: [
              {
                title: "เลิกติดตาม",
                payload: "เลิกติดตาม BNB",
                type: "postback",
              },
            ],
            default_action: {
              webview_height_ratio: "tall",
              type: "web_url",
              url: "https://www.google.com/",
            },
            title: "BNB",
          };
        case "LTC":
          return {
            default_action: {
              url: "https://www.google.com/",
              type: "web_url",
              webview_height_ratio: "tall",
            },
            title: "LTC",
            buttons: [
              {
                title: "เลิกติดตาม",
                payload: "เลิกติดตาม LTC",
                type: "postback",
              },
            ],
            image_url:
              "https://play-lh.googleusercontent.com/Xg4CyE2Wr-GAYMN88ppBrvYT70UGhi7F7Zd2GqATrvExBy6aByd_OCBruH65B3MHWQ",
          };
        case "ADA":
          return {
            buttons: [
              {
                payload: "เลิกติดตาม ADA",
                title: "เลิกติดตาม",
                type: "postback",
              },
            ],
            title: "ADA",
            image_url:
              "https://essentialbinaryoptions.com/wp-content/uploads/2019/10/ada.png",
            default_action: {
              webview_height_ratio: "tall",
              type: "web_url",
              url: "https://www.google.com/",
            },
          };
      }
    }
  }
);
