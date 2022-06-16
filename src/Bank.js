class Bank {
  constructor() {
    this.user = new User();
  }

  getBalance() {
    return this.user.getBalance();
  }

  getTransactions() {
    return this.user.getTransactions();
  }

  deposit(amount) {
    this.user.deposit(amount);
  }

  withdraw(amount) {
    return this.user.withdraw(amount);
  }
}

class User {
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

  deposit(amount, date = new Date()) {
    this.#balance += amount;
    const transaction = {
      date: date,
      credit: "",
      debit: amount,
      balance: this.#balance,
    };
    this.#transactions.push(transaction);
  }

  withdraw(amount) {
    if (this.#balance >= amount) {
      this.#balance -= amount;
      return true;
    }
    return false;
  }
}

class BankAccount {
  #balance;
  constructor() {
    this.#balance = 0;
  }
}

class Transaction {
  constructor() {}
}

class Statement {
  constructor() {
    this.statements = [];
  }
}
