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

const bankAccounts = []

const accountForm = document.querySelector('#accountForm')
const customerName = document.querySelector('#customerName')
const initialBalance = document.querySelector('#initialBalance')
const accountsDiv = document.querySelector('#accouns-div')


accountForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Create a new account
    const account = new BankAccount(customerName.value, +initialBalance.value);
    bankAccounts.push(account);
    
    // Create the div only for the newly added account
    const accountDiv = document.createElement('div');
    accountDiv.classList.add('rounded-md', 'shadow-md', 'p-4');
    
    const accountHolder = document.createElement('p');
    accountHolder.innerText = `Account holder: ${account.customerName}`;
    
    const accountBalance = document.createElement('p');
    accountBalance.innerText = `Balance: ${account.balance}`;
    
    const accountNumber = document.createElement('p');
    accountNumber.innerText = `Account Number: ${account.accountNumber}`;
    
    accountDiv.append(accountHolder, accountNumber, accountBalance);
    
    accountsDiv.append(accountDiv);

    console.log(bankAccounts);
});


