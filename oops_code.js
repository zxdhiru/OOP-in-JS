// BankAccount class
class BankAccount {
    constructor(customerName, balance = 0) {
        this.customerName = customerName;
        this.accountNumber = Math.floor(Date.now() + Math.random());
        this.balance = balance;
    }

    // Deposit method
    deposit(amount) {
        this.balance += amount;
    }

    // Withdraw method
    withdraw(amount) {
        this.balance -= amount;
    }

    // Save bank account to localStorage
    static saveAccountToLocalStorage(account) {
        let bankAccounts = JSON.parse(localStorage.getItem('bankAccounts')) || [];
        bankAccounts.push({
            accountNumber: account.accountNumber,
            balance: account.balance,
            accountHolder: account.customerName
        });
        localStorage.setItem('bankAccounts', JSON.stringify(bankAccounts));
    }

    // Static method to delete account from localStorage
    static deleteAccount(accountNumber) {
        let bankAccounts = JSON.parse(localStorage.getItem('bankAccounts')) || [];
        
        // Filter out the account to be deleted
        bankAccounts = bankAccounts.filter(account => account.accountNumber !== accountNumber);
        
        // Update localStorage
        localStorage.setItem('bankAccounts', JSON.stringify(bankAccounts));

        accountsDiv.innerHTML = ''; // Clear the displayed accounts

        // Reload the accounts
        BankAccount.loadAccounts();
    }

    // Static method to load accounts from localStorage and display them
    static loadAccounts() {
        const bankAccounts = JSON.parse(localStorage.getItem('bankAccounts')) || [];
        bankAccounts.forEach(account => {
            BankAccount.displayAccount(account.accountHolder, account.balance, account.accountNumber);
        });
    }

    // Static method to display an account in the UI
    static displayAccount(accountHolderName, balance, accountNumber) {
        const accountDiv = document.createElement('div');
        accountDiv.classList.add('rounded-md', 'shadow-md', 'p-4', 'cursor-pointer', 'hover:shadow-green-200', 'relative', 'transition-opacity');

        const accountHolder = document.createElement('p');
        accountHolder.innerHTML = `Account holder: <strong>${accountHolderName}</strong>`;

        const accountBalance = document.createElement('p');
        accountBalance.innerHTML = `Balance: <strong>${balance}</strong>`;

        const accountNumberText = document.createElement('p');
        accountNumberText.innerHTML = `Account Number: <strong>${accountNumber}</strong>`;

        const deleteIcon = document.createElement('span');
        deleteIcon.innerText = 'delete';
        deleteIcon.classList.add('material-symbols-outlined', 'absolute', 'top-4', 'right-4', 'cursor-pointer', 'hover:text-red-500', 'bg-slate-200', 'rounded-full', 'p-1');
        deleteIcon.addEventListener('click', () => {
            BankAccount.deleteAccount(accountNumber);
        });

        accountDiv.append(accountHolder, accountNumberText, accountBalance, deleteIcon);
        accountsDiv.append(accountDiv);
    }
}

// Query DOM elements
const accountsDiv = document.querySelector('#accountsDiv');
const accountForm = document.querySelector('#accountForm');
const customerName = document.querySelector('#customerName');
const initialBalance = document.querySelector('#initialBalance');

// Event listener for the account form
accountForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Create a new BankAccount instance
    const account = new BankAccount(customerName.value, +initialBalance.value);

    // Save the new account to localStorage and display it
    BankAccount.saveAccountToLocalStorage(account);
    BankAccount.displayAccount(account.customerName, account.balance, account.accountNumber);  // Only display the new account

    // Clear form input fields
    customerName.value = '';
    initialBalance.value = '';
});

// Load accounts when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    BankAccount.loadAccounts();
});
