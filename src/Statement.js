class Statement {
  constructor() {
    this.header = "date       || credit || debit  || balance";
  }

  getSingleLine(transaction) {
    let thisLine;
    if (transaction.isCredit()) {
      thisLine = `\n${transaction.date}  || ${transaction.amount.toFixed(
        2
      )}||        || ${transaction.balance.toFixed(2)}`;
    } else if (transaction.isDebit()) {
      thisLine = `\n${
        transaction.date
      }  ||        || ${transaction.amount.toFixed(
        2
      )} || ${transaction.balance.toFixed(2)}`;
    }
    return thisLine;
  }

  getBody(transactions) {
    return transactions.reduce((body, transaction) => {
      return body + this.getSingleLine(transaction);
    }, "");
  }

  getStatement(transactions) {
    return this.header + this.getBody(transactions);
  }
}

module.exports = Statement;
