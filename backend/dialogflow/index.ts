// const fetch = require("node-fetch");
// const functions = require("firebase-functions");
// const { WebhookClient } = require("dialogflow-fulfillment");
// const { Card, Suggestion } = require("dialogflow-fulfillment");
// process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements
// var url =
//   "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,ADA,DOT,USDT,XRP,LTC,BCH,BNB,LINK";
// const requestOptions = {
//   method: "GET",
//   uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
//   qs: {
//     start: "1",
//     limit: "100000000000000000",
//     convert: "USD",
//   },
//   headers: {
//     "X-CMC_PRO_API_KEY": "1cd6a078-e484-4a96-99b9-7524fa67164b",
//   },
//   json: true,
//   gzip: true,
// };
// exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
//   (request, response) => {
//     const agent = new WebhookClient({ request, response });
//     console.log(
//       "Dialogflow Request headers: " + JSON.stringify(request.headers)
//     );
//     console.log("Dialogflow Request body: " + JSON.stringify(request.body));
//     function select(agent) {
//       var my = JSON.stringify(request.body);
//       var parseData = JSON.parse(my);
//       var favorite =
//         parseData.originalDetectIntentRequest.payload.data.postback.payload;
//       var sender = parseData.originalDetectIntentRequest.payload.data.sender.id;
//       agent.add(`Your is ${favorite} in favorite`);
//     }
//     function bitcoinprice(agent) {
//       return fetch(url, requestOptions)
//         .then((res) => res.json())
//         .then((json) => {
//           // do something with JSON
//           const my = json;
//           const myJSON = JSON.stringify(my);
//           const parseData = JSON.parse(myJSON);
//           const priceJSON = parseData.data.BTC.quote.USD.price;
//           const price = JSON.stringify(priceJSON);
//           const priceis = parseFloat(price).toFixed(2);
//           agent.add("$" + priceis);
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     function ethereumprice(agent) {
//       return fetch(url, requestOptions)
//         .then((res) => res.json())
//         .then((json) => {
//           // do something with JSON
//           const my = json;
//           const myJSON = JSON.stringify(my);
//           const parseData = JSON.parse(myJSON);
//           const priceJSON = parseData.data.ETH.quote.USD.price;
//           const price = JSON.stringify(priceJSON);
//           const priceis = parseFloat(price).toFixed(2);
//           agent.add("$" + priceis);
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     function tetherprice(agent) {
//       return fetch(url, requestOptions)
//         .then((res) => res.json())
//         .then((json) => {
//           // do something with JSON
//           const my = json;
//           const myJSON = JSON.stringify(my);
//           const parseData = JSON.parse(myJSON);
//           const priceJSON = parseData.data.USDT.quote.USD.price;
//           const price = JSON.stringify(priceJSON);
//           const priceis = parseFloat(price).toFixed(2);
//           agent.add("$" + priceis);
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     function polkadotprice(agent) {
//       return fetch(url, requestOptions)
//         .then((res) => res.json())
//         .then((json) => {
//           // do something with JSON
//           const my = json;
//           const myJSON = JSON.stringify(my);
//           const parseData = JSON.parse(myJSON);
//           const priceJSON = parseData.data.DOT.quote.USD.price;
//           const price = JSON.stringify(priceJSON);
//           const priceis = parseFloat(price).toFixed(2);
//           agent.add("$" + priceis);
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     function xrpprice(agent) {
//       return fetch(url, requestOptions)
//         .then((res) => res.json())
//         .then((json) => {
//           // do something with JSON
//           const my = json;
//           const myJSON = JSON.stringify(my);
//           const parseData = JSON.parse(myJSON);
//           const priceJSON = parseData.data.XRP.quote.USD.price;
//           const price = JSON.stringify(priceJSON);
//           const priceis = parseFloat(price).toFixed(2);
//           agent.add("$" + priceis);
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     function cardanoprice(agent) {
//       return fetch(url, requestOptions)
//         .then((res) => res.json())
//         .then((json) => {
//           // do something with JSON
//           const my = json;
//           const myJSON = JSON.stringify(my);
//           const parseData = JSON.parse(myJSON);
//           const priceJSON = parseData.data.ADA.quote.USD.price;
//           const price = JSON.stringify(priceJSON);
//           const priceis = parseFloat(price).toFixed(2);
//           agent.add("$" + priceis);
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     function litecoinprice(agent) {
//       return fetch(url, requestOptions)
//         .then((res) => res.json())
//         .then((json) => {
//           // do something with JSON
//           const my = json;
//           const myJSON = JSON.stringify(my);
//           const parseData = JSON.parse(myJSON);
//           const priceJSON = parseData.data.LTC.quote.USD.price;
//           const price = JSON.stringify(priceJSON);
//           const priceis = parseFloat(price).toFixed(2);
//           agent.add("$" + priceis);
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     function bitcoincashprice(agent) {
//       return fetch(url, requestOptions)
//         .then((res) => res.json())
//         .then((json) => {
//           // do something with JSON
//           const my = json;
//           const myJSON = JSON.stringify(my);
//           const parseData = JSON.parse(myJSON);
//           const priceJSON = parseData.data.BCH.quote.USD.price;
//           const price = JSON.stringify(priceJSON);
//           const priceis = parseFloat(price).toFixed(2);
//           agent.add("$" + priceis);
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     function chainlinkprice(agent) {
//       return fetch(url, requestOptions)
//         .then((res) => res.json())
//         .then((json) => {
//           // do something with JSON
//           const my = json;
//           const myJSON = JSON.stringify(my);
//           const parseData = JSON.parse(myJSON);
//           const priceJSON = parseData.data.LINK.quote.USD.price;
//           const price = JSON.stringify(priceJSON);
//           const priceis = parseFloat(price).toFixed(2);
//           agent.add("$" + priceis);
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     function binancecoinprice(agent) {
//       return fetch(url, requestOptions)
//         .then((res) => res.json())
//         .then((json) => {
//           // do something with JSON
//           const my = json;
//           const myJSON = JSON.stringify(my);
//           const parseData = JSON.parse(myJSON);
//           const priceJSON = parseData.data.BNB.quote.USD.price;
//           const price = JSON.stringify(priceJSON);
//           const priceis = parseFloat(price).toFixed(2);
//           agent.add("$" + priceis);
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     function ethereumnews(agent) {
//       return fetch(
//         "https://cryptopanic.com/api/v1/posts/?auth_token=a7e15b7cabe10166a7cdc0035afbd062426256f3&currencies=ETH&kind=news"
//       )
//         .then((res) => res.json())
//         .then((json) => {
//           var n = json;
//           const myJSON = JSON.stringify(n);
//           const parseData = JSON.parse(myJSON);
//           var urleth = [];
//           var slugeth = [];
//           var i = 0;
//           for (i = 0; i < 5; i++) {
//             const priceJSON = parseData.results[i].url;
//             urleth[i] = JSON.stringify(priceJSON);
//             const newJSON = parseData.results[i].slug;
//             slugeth[i] = JSON.stringify(newJSON);
//             agent.add(slugeth[i] + urleth[i]);
//           }
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     function bitcoinnews(agent) {
//       return fetch(
//         "https://cryptopanic.com/api/v1/posts/?auth_token=a7e15b7cabe10166a7cdc0035afbd062426256f3&currencies=BTC&kind=news"
//       )
//         .then((res) => res.json())
//         .then((json) => {
//           var n = json;
//           const myJSON = JSON.stringify(n);
//           const parseData = JSON.parse(myJSON);
//           var urlbtc = [];
//           var slugbtc = [];
//           var i = 0;
//           for (i = 0; i < 5; i++) {
//             const priceJSON = parseData.results[i].url;
//             urlbtc[i] = JSON.stringify(priceJSON);
//             const newJSON = parseData.results[i].slug;
//             slugbtc[i] = JSON.stringify(newJSON);
//             agent.add(slugbtc[i] + urlbtc[i]);
//           }
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     function tethernews(agent) {
//       return fetch(
//         "https://cryptopanic.com/api/v1/posts/?auth_token=a7e15b7cabe10166a7cdc0035afbd062426256f3&currencies=USDT&kind=news"
//       )
//         .then((res) => res.json())
//         .then((json) => {
//           var n = json;
//           const myJSON = JSON.stringify(n);
//           const parseData = JSON.parse(myJSON);
//           var urlusdt = [];
//           var slugusdt = [];
//           var i = 0;
//           for (i = 0; i < 5; i++) {
//             const priceJSON = parseData.results[i].url;
//             urlusdt[i] = JSON.stringify(priceJSON);
//             const newJSON = parseData.results[i].slug;
//             slugusdt[i] = JSON.stringify(newJSON);
//             agent.add(slugusdt[i] + urlusdt[i]);
//           }
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     function polkadotnews(agent) {
//       return fetch(
//         "https://cryptopanic.com/api/v1/posts/?auth_token=a7e15b7cabe10166a7cdc0035afbd062426256f3&currencies=DOT&kind=news"
//       )
//         .then((res) => res.json())
//         .then((json) => {
//           var n = json;
//           const myJSON = JSON.stringify(n);
//           const parseData = JSON.parse(myJSON);
//           var urldot = [];
//           var slugdot = [];
//           var i = 0;
//           for (i = 0; i < 5; i++) {
//             const priceJSON = parseData.results[i].url;
//             urldot[i] = JSON.stringify(priceJSON);
//             const newJSON = parseData.results[i].slug;
//             slugdot[i] = JSON.stringify(newJSON);
//             agent.add(slugdot[i] + urldot[i]);
//           }
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     function xrpnews(agent) {
//       return fetch(
//         "https://cryptopanic.com/api/v1/posts/?auth_token=a7e15b7cabe10166a7cdc0035afbd062426256f3&currencies=XRP&kind=news"
//       )
//         .then((res) => res.json())
//         .then((json) => {
//           var n = json;
//           const myJSON = JSON.stringify(n);
//           const parseData = JSON.parse(myJSON);
//           var urlxrp = [];
//           var slugxrp = [];
//           var i = 0;
//           for (i = 0; i < 5; i++) {
//             const priceJSON = parseData.results[i].url;
//             urlxrp[i] = JSON.stringify(priceJSON);
//             const newJSON = parseData.results[i].slug;
//             slugxrp[i] = JSON.stringify(newJSON);
//             agent.add(slugxrp[i] + urlxrp[i]);
//           }
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     function cardanonews(agent) {
//       return fetch(
//         "https://cryptopanic.com/api/v1/posts/?auth_token=a7e15b7cabe10166a7cdc0035afbd062426256f3&currencies=ADA&kind=news"
//       )
//         .then((res) => res.json())
//         .then((json) => {
//           var n = json;
//           const myJSON = JSON.stringify(n);
//           const parseData = JSON.parse(myJSON);
//           var urlada = [];
//           var slugada = [];
//           var i = 0;
//           for (i = 0; i < 5; i++) {
//             const priceJSON = parseData.results[i].url;
//             urlada[i] = JSON.stringify(priceJSON);
//             const newJSON = parseData.results[i].slug;
//             slugada[i] = JSON.stringify(newJSON);
//             agent.add(slugada[i] + urlada[i]);
//           }
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     function litecoinnews(agent) {
//       return fetch(
//         "https://cryptopanic.com/api/v1/posts/?auth_token=a7e15b7cabe10166a7cdc0035afbd062426256f3&currencies=LTC&kind=news"
//       )
//         .then((res) => res.json())
//         .then((json) => {
//           var n = json;
//           const myJSON = JSON.stringify(n);
//           const parseData = JSON.parse(myJSON);
//           var urlltc = [];
//           var slugltc = [];
//           var i = 0;
//           for (i = 0; i < 5; i++) {
//             const priceJSON = parseData.results[i].url;
//             urlltc[i] = JSON.stringify(priceJSON);
//             const newJSON = parseData.results[i].slug;
//             slugltc[i] = JSON.stringify(newJSON);
//             agent.add(slugltc[i] + urlltc[i]);
//           }
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     function bitcoincashnews(agent) {
//       return fetch(
//         "https://cryptopanic.com/api/v1/posts/?auth_token=a7e15b7cabe10166a7cdc0035afbd062426256f3&currencies=BCH&kind=news"
//       )
//         .then((res) => res.json())
//         .then((json) => {
//           var n = json;
//           const myJSON = JSON.stringify(n);
//           const parseData = JSON.parse(myJSON);
//           var urlbch = [];
//           var slugbch = [];
//           var i = 0;
//           for (i = 0; i < 5; i++) {
//             const priceJSON = parseData.results[i].url;
//             urlbch[i] = JSON.stringify(priceJSON);
//             const newJSON = parseData.results[i].slug;
//             slugbch[i] = JSON.stringify(newJSON);
//             agent.add(slugbch[i] + urlbch[i]);
//           }
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     function chainlinknews(agent) {
//       return fetch(
//         "https://cryptopanic.com/api/v1/posts/?auth_token=a7e15b7cabe10166a7cdc0035afbd062426256f3&currencies=LINK&kind=news"
//       )
//         .then((res) => res.json())
//         .then((json) => {
//           var n = json;
//           const myJSON = JSON.stringify(n);
//           const parseData = JSON.parse(myJSON);
//           var urllink = [];
//           var sluglink = [];
//           var i = 0;
//           for (i = 0; i < 5; i++) {
//             const priceJSON = parseData.results[i].url;
//             urllink[i] = JSON.stringify(priceJSON);
//             const newJSON = parseData.results[i].slug;
//             sluglink[i] = JSON.stringify(newJSON);
//             agent.add(sluglink[i] + urllink[i]);
//           }
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     function binancecoinnews(agent) {
//       return fetch(
//         "https://cryptopanic.com/api/v1/posts/?auth_token=a7e15b7cabe10166a7cdc0035afbd062426256f3&currencies=BNB&kind=news"
//       )
//         .then((res) => res.json())
//         .then((json) => {
//           var n = json;
//           const myJSON = JSON.stringify(n);
//           const parseData = JSON.parse(myJSON);
//           var urlbnb = [];
//           var slugbnb = [];
//           var i = 0;
//           for (i = 0; i < 5; i++) {
//             const priceJSON = parseData.results[i].url;
//             urlbnb[i] = JSON.stringify(priceJSON);
//             const newJSON = parseData.results[i].slug;
//             slugbnb[i] = JSON.stringify(newJSON);
//             agent.add(slugbnb[i] + urlbnb[i]);
//           }
//         })
//         .catch(() => {
//           agent.add("error");
//         });
//     }
//     let intentMap = new Map();
//     intentMap.set("NewsETH", ethereumnews);
//     intentMap.set("NewsBTC", bitcoinnews);
//     intentMap.set("NewsUSDT", tethernews);
//     intentMap.set("NewsDOT", polkadotnews);
//     intentMap.set("NewsXRP", xrpnews);
//     intentMap.set("NewsADA", cardanonews);
//     intentMap.set("NewsLTC", litecoinnews);
//     intentMap.set("NewsBCH", bitcoincashnews);
//     intentMap.set("NewsLINK", chainlinknews);
//     intentMap.set("NewsBNB", binancecoinnews);
//     intentMap.set("PriceBTC", bitcoinprice);
//     intentMap.set("PriceETH", ethereumprice);
//     intentMap.set("PriceUSDT", tetherprice);
//     intentMap.set("PriceDOT", polkadotprice);
//     intentMap.set("PriceXRP", xrpprice);
//     intentMap.set("PriceADA", cardanoprice);
//     intentMap.set("PriceLTC", litecoinprice);
//     intentMap.set("PriceBCH", bitcoincashprice);
//     intentMap.set("PriceLINK", chainlinkprice);
//     intentMap.set("PriceBNB", binancecoinprice);
//     intentMap.set("Select", select);
//     // intentMap.set('your intent name here', yourFunctionHandler);
//     // intentMap.set('your intent name here', googleAssistantHandler);
//     agent.handleRequest(intentMap);
//   }
// );
