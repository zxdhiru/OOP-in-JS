function BankAccount(customerName, balance = 0) {
    this.customerName = customerName,
        this.accountNumber = Math.floor(Date.now() + Math.random()),
        this.balance = balance
}

BankAccount.prototype.deposit = function (amount) {
    this.balance += amount
}
BankAccount.prototype.withdraw = function (amount) {
    this.balance -= amount
}

const dhiruAccount = new BankAccount("Dhiru", 500)
dhiruAccount.deposit(6000)
dhiruAccount.withdraw(18)

console.log(dhiruAccount);
