let balance = parseInt(localStorage.getItem('balance')) || 0;
let turboActive = false;
let botBought = false;
const turboMultiplier = 30;
const normalMultiplier = 5;
const botPrice = 100000;
let energy = 5000;
const maxEnergy = 5000;
let isTapping = false;

function handleTap(event) {
    if (!isTapping && energy >= 5) {
        isTapping = true;
        let increment = turboActive ? turboMultiplier : normalMultiplier;
        balance += increment;
        energy -= 5;
        document.getElementById('balance').innerText = balance;
        updateEnergyBar();
        showCoinAnimation(event, increment);
        localStorage.setItem('balance', balance);
        setTimeout(() => {
            isTapping = false;
        }, 100);
    } else if (energy < 5) {
        alert('Not enough energy.');
    }
}

function updateEnergyBar() {
    const energyBar = document.getElementById('energy-bar');
    const energyPercentage = (energy / maxEnergy) * 100;
    energyBar.style.width = `${energyPercentage}%`;
}

function showCoinAnimation(event, increment) {
    const coinAnim = document.createElement('div');
    coinAnim.className = 'coin-anim';
    coinAnim.innerText = `+${increment} coins`;
    document.body.appendChild(coinAnim);

    const rect = event.target.getBoundingClientRect();
    coinAnim.style.left = `${rect.left + rect.width / 2 - 50}px`;
    coinAnim.style.top = `${rect.top}px`;

    setTimeout(() => {
        document.body.removeChild(coinAnim);
    }, 2000);
}

function toggleBoost() {
    const boostOptions = document.getElementById('boost-options');
    boostOptions.classList.toggle('hidden');
    showConfirmation('Boost activated!');
}

function activateTurbo() {
    turboActive = !turboActive;
    showConfirmation(`Turbo ${turboActive ? 'activated' : 'deactivated'}`);
}

function buyBot() {
    if (balance >= botPrice) {
        balance -= botPrice;
        botBought = true;
        document.getElementById('balance').innerText = balance;
        localStorage.setItem('balance', balance);
        setInterval(() => {
            if (botBought) {
                balance += 100;
                document.getElementById('balance').innerText = balance;
                localStorage.setItem('balance', balance);
            }
        }, 1000);
        showConfirmation('Bot purchased!');
    } else {
        alert('Not enough balance to purchase Bot
