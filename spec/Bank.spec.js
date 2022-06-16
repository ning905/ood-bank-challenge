const BankAccount = require("../src/Bank");

describe("Bank account", () => {
  let bankAccount;

  beforeEach(() => {
    bankAccount = new BankAccount();
  });

  it("starts with a balance of 0", () => {
    //set up
    const expected = 0;
    //execute
    const result = bankAccount.getBalance();
    //verify
    expect(expected).toEqual(result);
  });

  it("can deposit money", () => {
    //set up
    bankAccount.credit(500);
    const expected = 500;
    //execute
    const result = bankAccount.getBalance();
    //verify
    expect(expected).toEqual(result);
  });

  it("can return error when depositing invalid amount of money", () => {
    //set up
    const expected = "Please enter a valid amount.";
    //execute
    const result = bankAccount.credit(-50);
    //verify
    expect(expected).toEqual(result);
  });

  it("can withdraw money", () => {
    //set up
    bankAccount.credit(1500);
    bankAccount.debit(500);
    const expected = 1000;
    //execute
    const result = bankAccount.getBalance();
    //verify
    expect(expected).toEqual(result);
  });

  it("can return error when withdrawing invalid amount of money", () => {
    //set up
    bankAccount.credit(1500);
    const expected = "Please enter a valid amount.";
    //execute
    const result = bankAccount.debit(-500);
    //verify
    expect(expected).toEqual(result);
  });

  it("can return error when balance is lower than the amount to be withdrawn", () => {
    //set up
    bankAccount.credit(500);
    const expected = "Your balance is not enough.";
    //execute
    const result = bankAccount.debit(1500);
    //verify
    expect(expected).toEqual(result);
  });

  it("can print bank statement", () => {
    //set up
    bankAccount.credit(1000, "10/01/2012");
    bankAccount.credit(2000, "13/01/2012");
    bankAccount.debit(500, "14/01/2012");
    const expected =
      "date       || credit || debit  || balance\n14/01/2012  ||        || 500.00 || 2500.00\n13/01/2012  || 2000.00||        || 3000.00\n10/01/2012  || 1000.00||        || 1000.00";
    //execute
    const result = bankAccount.getStatement();
    //verify
    expect(expected).toEqual(result);
  });

  it("can return error printing bank statement with no transaction history", () => {
    //set up
    const expected = "You have no transaction history.";
    //execute
    const result = bankAccount.getStatement();
    //verify
    expect(expected).toEqual(result);
  });
});
