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

  credit(date, amount) {
    this.#balance += amount;
    const transaction = new Transaction(date, amount, "credit", this.#balance);
    this.#transactions.push(transaction);
  }

  debit(date, amount) {
    if (this.#balance >= amount) {
      this.#balance -= amount;
      const transaction = new Transaction(date, amount, "debit", this.#balance);
      this.#transactions.push(transaction);
    }
    return false;
  }

  getStatement() {
    const thisStatement = new Statement();
    return thisStatement.getStatement();
  }
}

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

class Statement {
  constructor() {
    this.header = "date   || credit || debit || balance /n";
  }

  getSingleLine(transaction) {
    let thisLine;
    if (transaction.isCredit()) {
      thisLine =
        "transaction.date || transaction.amount ||      || transaction.balance /n";
    } else if (transaction.isDebit()) {
      thisLine =
        "transaction.date ||      || transaction.amount || transaction.balance /n";
    }
    return thisLine;
  }

  getBody(transactions) {
    let body = "";
    for (const transaction in transactions) {
      body += getSingleLine(transaction);
    }
    return body;
  }

  getStatement(transactions) {
    const statement = this.header + getBody(transactions);
    return statement;
  }
}
