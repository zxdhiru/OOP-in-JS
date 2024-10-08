function BankAccount(customerName, balance = 0) {
    this.customerName = customerName,
        this.accountNumber = Math.floor(Date.now() + Math.random()),
        this.balance = balance

    this.deposit = function (amount) {
        this.balance += amount
    }

    this.withdraw = function (amount) {
        this.balance -= amount
    }
}

const dhiruAccount = new BankAccount("Dhiru", 1000)
dhiruAccount.deposit(4000)
dhiruAccount.withdraw(500)
console.log(dhiruAccount);
