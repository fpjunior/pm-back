const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json');
// const db = admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// }).firestore();

module.exports = {
  async getExpenses(req, res) {
    try {
      const snapshot = await db.collection('expenses').get();
      const expenses = [];
      snapshot.forEach((doc) => {
        expenses.push({
          id: doc.id,
          ...doc.data()
        });
      });
      res.send(expenses);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Erro ao buscar despesas.' });
    }
  }
}
