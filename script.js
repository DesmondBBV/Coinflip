// script.js
const vouchers = {
    "kSgkO": 60,
    "GjRtZ": 90,
    "akaKV": 100,
    "ASFPb": 20,
    "meqxc": 275,
    "WAnNf": 280,
    "ORWSY": 170,
    "WauLI": 65,
    "DQWoT": 200,
    "EqYEM": 290,
    "dYGdQ": 285,
    "fwezz": 100,
    "niRLT": 100,
    "wdvVE": 15,
    "QVmwE": 145,
    "oVBMU": 170,
    "jznFy": 150,
    "VlQkc": 10,
    "ieBVs": 10,
    "asruz": 20,
    "VTzRI": 125,
    "jQIoi": 155,
    "UIkuY": 60,
    "qbegu": 110,
    "sRLxC": 10,
    "aSqto": 190,
    "cPDok": 235,
    "tgNry": 250,
    "crkkn": 300,
    "hjBZi": 120,
    "vExCZ": 80,
    "uvnhM": 75,
    "LFUdN": 30,
    "jFeAh": 110,
    "vzAJw": 200,
    "FpRBM": 295,
    "oSctn": 20,
    "LhaNK": 235,
    "nGUgX": 220,
    "dMXup": 215,
    "tkqVQ": 90,
    "WVGCF": 55,
    "UDJUl": 55,
    "lecwW": 245,
    "NXIKu": 215,
    "cIRTj": 100,
    "eMnCk": 155,
    "mevQf": 25,
    "kEWJa": 120,
    "IdDZb": 150,
    "FoPZc": 100,
    "JCMqX": 265,
    "HDGpN": 295,
    "SQoSp": 85,
    "qKPss": 100,
    "pedat": 225,
    "oZJVp": 55,
    "liHKQ": 135,
    "oHFvW": 90,
    "DNJJI": 275,
};

let balance = 0;

document.addEventListener("DOMContentLoaded", () => {
    const savedBalance = localStorage.getItem('balance');
    if (savedBalance !== null && parseInt(savedBalance) > 0) {
        balance = parseInt(savedBalance);
        document.getElementById('balance').textContent = formatBalance(balance);
        showPage('game-page');
    } else {
        showPage('landing-page');
    }
});

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    setTimeout(() => {
        document.getElementById(pageId).classList.add('active');
    }, 100);
}

function validateVoucher() {
    const code = document.getElementById('voucher-code').value;
    if (vouchers[code] !== undefined) {
        balance = vouchers[code];
        localStorage.setItem('balance', balance);
        document.getElementById('balance').textContent = formatBalance(balance);
        showPage('game-page');
    } else {
        document.getElementById('voucher-error').textContent = 'Invalide code';
    }
}

function placeBet(choice) {
    const betAmount = parseInt(document.getElementById('bet-amount').value);
    const errorElement = document.getElementById('game-error');
    const coin = document.getElementById('coin');

    if (isNaN(betAmount)) {
        errorElement.textContent = 'Please enter a numeric value for the bet amount.';
        return;
    }
    
    if (betAmount <= 0) {
        errorElement.textContent = 'Bet amount must be greater than zero.';
        return;
    }

    if (betAmount > balance) {
        errorElement.textContent = 'Bet amount cannot exceed current balance.';
        return;
    }

    errorElement.textContent = '';
    coin.classList.add('flip');

    setTimeout(() => {
        let outcome;

        if (betAmount > 170) {
            // Apply 20% lose rate for bets greater than 170 diamonds
            outcome = Math.random() < 0.15 ? 'lose' : 'win';
        } else {
            outcome = Math.random() < 0.3 ? 'win' : 'lose';  // 40% chance to win
        }

        if (outcome === 'win') {
            balance += betAmount * 1.5;  // Payout changed to 2 times the bet amount
            errorElement.textContent = `You won! Your new balance is ${formatBalance(balance)} diamonds.`;
        } else {
            balance -= betAmount;
            errorElement.textContent = `You lost! Your new balance is ${formatBalance(balance)} diamonds.`;
        }

        if (balance < 0) {
            balance = 0;
        }

        document.getElementById('balance').textContent = formatBalance(balance);
        localStorage.setItem('balance', balance);
        coin.classList.remove('flip');

        if (balance <= 0) {
            document.getElementById('new-voucher-code').style.display = 'block';
        }
    }, 1000);
}


function cashOut() {
    const encodedBalance = btoa(balance + 'FlorisSmikkelBeer');
    document.getElementById('encoded-balance').value = encodedBalance;
    balance = 0;
    localStorage.setItem('balance', balance);
    showPage('cash-out-page');
}

function copyToClipboard() {
    const encodedBalance = document.getElementById('encoded-balance');
    encodedBalance.select();
    document.execCommand('copy');
}

function formatBalance(balance) {
    return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function showVoucherInput() {
    document.getElementById('new-voucher-code').style.display = 'block';
}

function addVoucher() {
    const code = document.getElementById('new-voucher-code').value;
    if (vouchers[code] !== undefined) {
        balance += vouchers[code];
        localStorage.setItem('balance', balance);
        document.getElementById('balance').textContent = formatBalance(balance);
        document.getElementById('new-voucher-code').style.display = 'none';
        document.getElementById('new-voucher-code').value = '';
        document.getElementById('game-error').textContent = '';
    } else {
        document.getElementById('game-error').textContent = 'Invalide code';
    }
}
