const Transaction = require("./Transaction");
const Statement = require("./Statement");

class BankAccount {
  #balance;
  #transactions;
  constructor() {
    this.#balance = 0;
    this.#transactions = [];
  }

  getBalance() {
    return this.#balance;
  }

  getTransactions() {
    return this.#transactions;
  }

  credit(amount, date = new Date().toLocaleDateString("en-GB")) {
    if (amount <= 0) {
      return "Please enter a valid amount.";
    }
    this.#balance += amount;
    const transaction = new Transaction(date, "credit", amount, this.#balance);
    this.#transactions.unshift(transaction);
  }

  debit(amount, date = new Date().toLocaleDateString("en-GB")) {
    if (amount <= 0) {
      return "Please enter a valid amount.";
    }
    if (this.#balance >= amount) {
      this.#balance -= amount;
      const transaction = new Transaction(date, "debit", amount, this.#balance);
      this.#transactions.unshift(transaction);
    } else {
      return "Your balance is not enough.";
    }
  }

  getStatement() {
    if (this.#transactions.length === 0) {
      return "You have no transaction history.";
    }
    const thisStatement = new Statement();
    return thisStatement.getStatement(this.#transactions);
  }
}

module.exports = BankAccount;
