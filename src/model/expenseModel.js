class ExpenseModel {
    constructor(db) {
      this.db = db;
    }
  
    async list() {
      const snapshot = await this.db.collection('expenses').get();
      const expenses = [];
      snapshot.forEach((doc) => {
        expenses.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return expenses;
    }
  }
  
  module.exports = ExpenseModel;

