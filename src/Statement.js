class Statement {
  #header;
  constructor() {
    this.#header = "date       || credit || debit  || balance\n";
  }

  getHeader() {
    return this.#header;
  }

  getSingleLine(transaction) {
    let thisLine;
    if (transaction.isCredit()) {
      thisLine = `${transaction.date}  || ${transaction.amount.toFixed(
        2
      )}||        || ${transaction.balance.toFixed(2)}`;
    } else if (transaction.isDebit()) {
      thisLine = `${
        transaction.date
      }  ||        || ${transaction.amount.toFixed(
        2
      )} || ${transaction.balance.toFixed(2)}`;
    }
    return thisLine;
  }

  getBody(transactions) {
    return transactions.reduce((body, transaction) => {
      return body + this.getSingleLine(transaction) + "\n";
    }, "");
  }

  getStatement(transactions) {
    return this.#header + this.getBody(transactions);
  }

  getStatementInRange(start, end) {}
}

module.exports = Statement;
