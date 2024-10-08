function BankAccount(customerName, balance = 0) {
    this.customerName = customerName,
        this.accountNumber = Math.floor(Date.now() + Math.random()),
        this.balance = balance

    function deposit(amount) {
        this.balance += amount
    }

    function withdraw(amount) {
        this.balance -= amount
    }
}

const dhiruAccount = new BankAccount("Dhiru", 1000)

console.log(dhiruAccount);
