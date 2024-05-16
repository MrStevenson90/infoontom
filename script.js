// script.js
document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('mouseover', () => {
        box.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
    });
    box.addEventListener('mouseout', () => {
        box.style.backgroundColor = '';
    });
});
function updateValues() {
    const daysPerWeek = document.getElementById('days').value;
    const hoursPerDay = document.getElementById('hours').value;
    const monthsPerYear = document.getElementById('months').value;

    document.getElementById('daysValue').textContent = daysPerWeek;
    document.getElementById('hoursValue').textContent = hoursPerDay;
    document.getElementById('monthsValue').textContent = monthsPerYear;

    const totalHoursPerYear = daysPerWeek * hoursPerDay * 4 * monthsPerYear; // Approximating 4 weeks per month
    const yearsToComplete = 10000 / totalHoursPerYear;

    document.getElementById('years').textContent = isFinite(yearsToComplete) ? yearsToComplete.toFixed(2) : "Infinity";
}

window.onload = function() {
    updateValues(); // Ensure the default values are used to calculate initially
};
const triggerPopup = document.querySelector('.trigger-popup');
const popup = document.querySelector('.popup');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');

triggerPopup.addEventListener('click', function() {
    popup.style.display = 'block';
    overlay.style.display = 'block';
});

closeBtn.addEventListener('click', function() {
    popup.style.display = 'none';
    overlay.style.display = 'none';
});

overlay.addEventListener('click', function() {
    popup.style.display = 'none';
    overlay.style.display = 'none';
});