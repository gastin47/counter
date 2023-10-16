document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.counter__form');
    const ageInput = document.getElementById('age');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const activityInputs = document.querySelectorAll('input[name="activity"]');
    const submitButton = document.querySelector('.form__submit-button');
    const resetButton = document.querySelector('.form__reset-button');
    const resultSection = document.querySelector('.counter__result');
    const caloriesNorm = document.getElementById('calories-norm');
    const caloriesMinimal = document.getElementById('calories-minimal');
    const caloriesMaximal = document.getElementById('calories-maximal');

    const ACTIVITY_COEFFICIENTS = {
        'min': 1.2,
        'low': 1.375,
        'medium': 1.55,
        'high': 1.725,
        'max': 1.9,
    };

    form.addEventListener('input', function () {
        resetButton.disabled = !ageInput.value && !heightInput.value && !weightInput.value;

        submitButton.disabled = !ageInput.value || !heightInput.value || !weightInput.value;
    });

    resetButton.addEventListener('click', function () {
        resultSection.classList.add('counter__result--hidden');
    });

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        const age = parseInt(ageInput.value);
        const height = parseInt(heightInput.value);
        const weight = parseInt(weightInput.value);
        const gender = [...genderInputs].find(input => input.checked).value;
        const activity = [...activityInputs].find(input => input.checked).value;

        let basalMetabolicRate;

        if (gender === "male") {
            basalMetabolicRate = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            basalMetabolicRate = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        const maintenance = basalMetabolicRate * ACTIVITY_COEFFICIENTS[activity];
        const weightLoss = maintenance * 0.85;
        const weightGain = maintenance * 1.15;

        caloriesNorm.textContent = Math.round(maintenance);
        caloriesMinimal.textContent = Math.round(weightLoss);
        caloriesMaximal.textContent = Math.round(weightGain);

        resultSection.classList.remove('counter__result--hidden');
    });
});
