const BankAccount = require("./BankAccount");
const Statement = require("./Statement");
const Transaction = require("./Transaction");

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

  addAccount(name, deposit = 0) {
    if (name === null) {
      return "Invalid Account Name.";
    }
    if (this.getAccountByName(name)) {
      return "Account already exists.";
    }
    const thisId = this.#id;
    const newAccount = new BankAccount(name, thisId);
    if (deposit) {
      newAccount.credit(deposit);
    }
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

  getAllStatements() {
    const statement = new Statement();
    const body = this.#accounts.reduce(
      (sum, account) =>
        sum +
        account.getName() +
        "||" +
        statement.getBody(account.getTransactions()),
      ""
    );
    return "Account       ||" + statement.getHeader() + body;
  }
}

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
console.log("all statements \n", bank.getAllStatements());
console.log("parse date", Date.parse("20/06/2022"));
