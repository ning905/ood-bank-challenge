const Transaction = require("./Transaction");
const Statement = require("./Statement");

class BankAccount {
  #name;
  #id;
  #balance;
  #transactions;
  constructor(name, id, balance) {
    this.#name = name;
    this.#id = id;
    this.#balance = balance;
    this.#transactions = [];
  }

  getName() {
    return this.#name;
  }

  getId() {
    return this.#id;
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

class Bank {
  #accounts;
  #id;
  #balance;
  constructor() {
    this.#accounts = [];
    this.#id = 1;
    this.#balance;
  }

  getAccounts() {
    return this.#accounts;
  }

  getAccountByName(name) {
    return this.#accounts.find((account) => account.getName() === name);
  }

  getAccountById(id) {
    return this.#accounts.find((account) => account.getId() === id);
  }

  getBalance() {
    this.#balance = this.#accounts.reduce(
      (sum, account) => (sum += account.getBalance()),
      0
    );
    return this.#balance;
  }

  addAccount(name, balance = 0) {
    if (name === null) {
      return "Invalid Account Name.";
    }
    if (this.getAccountByName(name)) {
      return "Account already exists.";
    }
    const thisId = this.#id;
    const newAccount = new BankAccount(name, thisId, balance);
    this.#accounts.push(newAccount);
    this.#id++;
  }

  creditToAccount(account, amount) {
    const findAccount = this.getAccountByName(account);
    if (!findAccount) {
      return "Account not found.";
    }
    findAccount.credit(amount);
  }

  debitToAccount(account, amount) {
    const findAccount = this.getAccountByName(account);
    if (!findAccount) {
      return "Account not found.";
    }
    findAccount.debit(amount);
  }

  getAccountBalance(account) {
    const findAccount = this.getAccountByName(account);
    if (!findAccount) {
      return "Account not found.";
    }
    return findAccount.getBalance();
  }

  getAccountStatement(account) {
    const findAccount = this.getAccountByName(account);
    if (!findAccount) {
      return "Account not found.";
    }
    return findAccount.getStatement();
  }
}

module.exports = BankAccount;

const bank = new Bank();
console.log("bank accounts", bank.getAccounts());
console.log("create bank account", bank.addAccount("normal account", 50000));
console.log("bank accounts", bank.getAccounts());
console.log("create bank account", bank.addAccount("special account", 2));
console.log("bank accounts", bank.getAccounts());
console.log(
  "create an existing bank account",
  bank.addAccount("special account", 2)
);
console.log("credit to an account", bank.creditToAccount("special account", 4));
console.log(
  "credit to an account",
  bank.creditToAccount("normal account", 4000)
);
console.log("get total balance", bank.getBalance());
console.log("get account balance", bank.getAccountBalance("special account"));
console.log(
  "get account statement \n",
  bank.getAccountStatement("special account")
);
