class BankAccount
properties:
    transactions: []

getBalance()
    let balance = 0
    calculate balance

credit(date, amount)
    getBalance()
    new Transaction(date, credit, balance)
    store in transactions
    
debit(date, amount)
    getBalance()
    if balance is not less than amount
    new Transaction(date, debit, balance)
    store in transactions



class Transaction
//record transaction data
properties:
    date
    type
    balance

isCredit() {
    if(this.type === 'credit) {
        return true
    }
    return false
}

isDebit() {
    if(this.type === 'debit') {
        return true
    }
    return false
}


class Statement 
//generate a statement
    header: 'date   || credit || debit || balance /n'

getSingleLine(transaction) {
    if (transaction.isCredit()) {
        const thisLine = 'transaction.date || transaction.amount ||      || transaction.balance /n'
    } else if (transaction.isDebit()) {
        const thisLine = 'transaction.date ||      || transaction.amount || transaction.balance /n'
    }
    return thisLine
}

getBody(transactions) {
    let body = ''
    for (const transaction in transactions) {
        body += getSingleLine(transaction)
    }
}

getStatement(transactions) {
    const statement = this.header + getBody(transactions)
    return statement
}