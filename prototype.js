// BankAccount constructor
function BankAccount(customerName, balance = 0) {
    this.customerName = customerName;
    this.accountNumber = Math.floor(Date.now() + Math.random());
    this.balance = balance;
}

// Prototype methods for deposit and withdraw
BankAccount.prototype.deposit = function (amount) {
    this.balance += amount;
};

BankAccount.prototype.withdraw = function (amount) {
    this.balance -= amount;
};

// Save bank account to localStorage
function saveAccountToLocalStorage(account) {
    let bankAccounts = JSON.parse(localStorage.getItem('bankAccounts')) || [];
    bankAccounts.push({
        accountNumber: account.accountNumber,
        balance: account.balance,
        accountHolder: account.customerName
    });
    localStorage.setItem('bankAccounts', JSON.stringify(bankAccounts));
}

const accountsDiv = document.querySelector('#accountsDiv');
const customerName = document.querySelector('#customerName');
const initialBalance = document.querySelector('#initialBalance');

// Display a single account in the UI
function displayAccount(accountHolderName, balance, accountNumber) {
    const accountDiv = document.createElement('div');
    accountDiv.classList.add('rounded-md', 'shadow-md', 'p-4', 'cursor-pointer', 'hover:shadow-green-200','relative', 'transition-opacity' );

    const accountHolder = document.createElement('p');
    accountHolder.innerHTML = `Account holder: <strong>${accountHolderName}</strong>`;

    const accountBalance = document.createElement('p');
    accountBalance.innerHTML = `Balance: <strong>${balance}</strong>`;

    const accountNumberText = document.createElement('p');
    accountNumberText.innerHTML = `Account Number: <strong>${accountNumber}</strong>`;
    // <span class="material-symbols-outlined absolute top-4 right-4 cursor-pointer hover:text-red-500">delete</span>

    const deleteIcon = document.createElement('span')
    deleteIcon.innerText = 'delete'
    deleteIcon.classList.add('material-symbols-outlined', 'absolute', 'top-4', 'right-4', 'cursor-pointer', 'hover:text-red-500', 'bg-slate-200', 'rounded-full', 'p-1', 'shadow-lg')
    deleteIcon.addEventListener('click', (e) => {
        deleteAccount(accountNumber)
    })

    accountDiv.append(accountHolder, accountNumberText, accountBalance, deleteIcon);
    accountsDiv.append(accountDiv);
}

// Load all accounts from localStorage and display them
function loadAccounts() {
    const bankAccounts = JSON.parse(localStorage.getItem('bankAccounts')) || [];
    bankAccounts.forEach(account => {
        displayAccount(account.accountHolder, account.balance, account.accountNumber);
    });
}

// Add event listener to the account form
accountForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Create a new BankAccount instance
    const account = new BankAccount(customerName.value, +initialBalance.value);

    // Save the new account to localStorage and display it
    saveAccountToLocalStorage(account);
    displayAccount(account.customerName, account.balance, account.accountNumber);  // Only display the new account

    // Clear form input fields
    customerName.value = '';
    initialBalance.value = '';
});
function deleteAccount(accountNumber) {
    let bankAccounts = JSON.parse(localStorage.getItem('bankAccounts')) || [];
    
    // Filter out the account to be deleted
    bankAccounts = bankAccounts.filter(account => account.accountNumber !== accountNumber);
    
    // Update localStorage
    localStorage.setItem('bankAccounts', JSON.stringify(bankAccounts));

    accountsDiv.innerHTML = ''

    // Reload the accounts
    loadAccounts();
}

// Load accounts when the DOM is ready
document.addEventListener('DOMContentLoaded', loadAccounts);
