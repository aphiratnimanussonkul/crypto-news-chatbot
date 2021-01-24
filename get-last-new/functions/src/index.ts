const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("../src/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://crypto-news-chatbot.firebaseio.com",
});

const db = admin.firestore();

exports.getLastNewsByCurrencyCode = functions.https.onRequest(
  async (request: any, response: any) => {
    const { currency } = request.body;

    try {
      let getNewsResult: any[] = [];
      await db
        .collection("news")
        .limit(5)
        .get()
        .then((result: any) => {
          result.docs.map((data: any) => {
            getNewsResult.push(data.data());
          });
        });
      getNewsResult = getNewsResult
        .reverse()
        .filter((news) =>
          news.currencies.find((cur: any) => cur.code == currency)
        );
      if (getNewsResult[0]) {
        response.status(200).json(getNewsResult[0]);
      }
      response.status(200).json({
        title: "ยังไม่มีข่าวใหม่เกี่ยวกับเหรียญ " + currency,
        currencies: [],
        id: null,
        url: "",
      });
    } catch (error) {
      console.log(error);
      response.status(400).json(error);
    }
  }
);
