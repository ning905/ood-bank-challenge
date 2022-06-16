class Transaction {
  constructor(date, type, amount, balance) {
    this.date = date;
    this.type = type;
    this.amount = amount;
    this.balance = balance;
  }

  isCredit() {
    if (this.type === "credit") {
      return true;
    }
    return false;
  }

  isDebit() {
    if (this.type === "debit") {
      return true;
    }
    return false;
  }
}

module.exports = Transaction;
