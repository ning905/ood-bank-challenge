class Statement {
  constructor() {
    this.header = "date       || credit || debit  || balance";
  }

  getStatement(transactions) {
    let body = "";
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      console.log(transaction);
      if (transaction.isCredit()) {
        body += `\n${transaction.date}  || ${transaction.amount.toFixed(
          2
        )}||        || ${transaction.balance.toFixed(2)}`;
      } else if (transaction.isDebit()) {
        body += `\n${
          transaction.date
        }  ||        || ${transaction.amount.toFixed(
          2
        )} || ${transaction.balance.toFixed(2)}`;
      }
    }
    return this.header + body;
  }
}

module.exports = Statement;
