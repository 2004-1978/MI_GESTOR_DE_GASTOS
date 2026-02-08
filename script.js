const balance = document.getElementById('balance');
const list = document.getElementById('list');
const form = document.getElementById('exp-form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransactionDOM(transaction) {
    const item = document.createElement('li');
    // Añadimos clase de animación de Animate.css
    item.classList.add('animate__animated', 'animate__backInLeft');
    
    item.innerHTML = `
        ${transaction.text} 
        <span style="color: ${transaction.amount < 0 ? '#ff7675' : '#55efc4'}">
            $${Math.abs(transaction.amount).toFixed(2)}
        </span>
    `;
    list.appendChild(item);
}

function updateValues() {
    const total = transactions
        .reduce((acc, item) => (acc += item.amount), 0)
        .toFixed(2);
    
    // Animación numérica simple
    balance.innerText = `$ ${total}`;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newTransaction = {
        id: Math.random(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(newTransaction);
    addTransactionDOM(newTransaction);
    updateValues();
    localStorage.setItem('transactions', JSON.stringify(transactions));

    text.value = '';
    amount.value = '';
});

// Carga inicial
transactions.forEach(addTransactionDOM);
updateValues();