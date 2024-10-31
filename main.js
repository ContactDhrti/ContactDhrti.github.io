// Add this to your existing main.js file
document.addEventListener('DOMContentLoaded', function() {
    // Calculator Card
    const calculatorCard = document.querySelector('.calculator-card');
    const calculatorForm = document.querySelector('.calculator-form');

    // Pickup Card
    const pickupCard = document.querySelector('.pickup-card');
    const pickupForm = document.querySelector('.pickup-form');

    // Impact Card
    const impactCard = document.querySelector('.impact-card');
    const impactTrackerForm = document.querySelector('.impact-tracker-form');

    // Sample data for impact tracker
    const sampleImpact = {
        plasticRecycled: 125,
        carbonReduced: 250,
        treesEquivalent: 5
    };

    // Function to update impact stats
    function updateImpactStats() {
        const statValues = document.querySelectorAll('.stat-value');
        if (statValues.length >= 3) {
            statValues[0].textContent = `${sampleImpact.plasticRecycled} kg`;
            statValues[1].textContent = `${sampleImpact.carbonReduced} kg CO₂e`;
            statValues[2].textContent = `${sampleImpact.treesEquivalent} trees`;
        }
    }

    // Function to handle card clicks
    function handleCardClick(clickedCard) {
        // Hide all forms first
        [calculatorForm, pickupForm, impactTrackerForm].forEach(form => {
            if (form) form.style.display = 'none';
        });

        // Show the clicked card's form
        if (clickedCard === calculatorCard && calculatorForm) {
            calculatorForm.style.display = 'block';
        } else if (clickedCard === pickupCard && pickupForm) {
            pickupForm.style.display = 'block';
        } else if (clickedCard === impactCard && impactTrackerForm) {
            impactTrackerForm.style.display = 'block';
            updateImpactStats(); // Update stats when showing the impact tracker
        }
    }

    // Add click event listeners to cards
    if (calculatorCard) {
        calculatorCard.addEventListener('click', () => handleCardClick(calculatorCard));
    }
    if (pickupCard) {
        pickupCard.addEventListener('click', () => handleCardClick(pickupCard));
    }
    if (impactCard) {
        impactCard.addEventListener('click', () => handleCardClick(impactCard));
    }

    // Prevent form clicks from triggering card collapse
    [calculatorForm, pickupForm, impactTrackerForm].forEach(form => {
        if (form) {
            form.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    });

    // Add sample timeline entries
    const timelineItems = document.querySelector('.timeline-items');
    if (timelineItems) {
        const sampleActivities = [
            { date: 'Today', content: 'Recycled 5kg of plastic bottles' },
            { date: 'Yesterday', content: 'Earned Green Warrior badge' },
            { date: '2 days ago', content: 'Completed first recycling milestone' }
        ];

        timelineItems.innerHTML = sampleActivities.map(activity => `
            <div class="timeline-item">
                <div class="timeline-date">${activity.date}</div>
                <div class="timeline-content">${activity.content}</div>
            </div>
        `).join('');
    }

    // Handle download report button
    const downloadBtn = document.querySelector('.download-report');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            alert('Generating your impact report...');
            // Add actual download functionality here
        });
    }

    // Console log to help debug
    console.log({
        calculatorCard: !!calculatorCard,
        pickupCard: !!pickupCard,
        impactCard: !!impactCard,
        calculatorForm: !!calculatorForm,
        pickupForm: !!pickupForm,
        impactTrackerForm: !!impactTrackerForm
    });

    // Impact Calculator Functions
    const calculateImpactBtn = document.getElementById('calculate-impact');
    if (calculateImpactBtn) {
        calculateImpactBtn.addEventListener('click', calculateEnvironmentalImpact);
    }

    function calculateEnvironmentalImpact() {
        const weight = parseFloat(document.getElementById('plastic-weight').value) || 0;
        const plasticType = document.getElementById('plastic-type-impact').value;

        // Impact conversion factors (example values - should be adjusted based on actual data)
        const factors = {
            'PET': { energy: 8.9, co2: 2.29, water: 17.2 },
            'HDPE': { energy: 7.1, co2: 1.83, water: 15.1 },
            'PVC': { energy: 9.1, co2: 2.35, water: 18.4 },
            'LDPE': { energy: 7.4, co2: 1.89, water: 15.8 },
            'PP': { energy: 7.0, co2: 1.81, water: 15.0 }
        };

        if (plasticType && factors[plasticType]) {
            const impact = {
                energy: (weight * factors[plasticType].energy).toFixed(2),
                co2: (weight * factors[plasticType].co2).toFixed(2),
                water: (weight * factors[plasticType].water).toFixed(2)
            };

            // Update results
            document.getElementById('result-energy').textContent = impact.energy;
            document.getElementById('result-co2').textContent = impact.co2;
            document.getElementById('result-water').textContent = impact.water;

            // Show results
            document.getElementById('impact-results').style.display = 'block';
        }
    }

    // Update monthly goal
    document.getElementById('update-goal')?.addEventListener('click', function() {
        const newGoal = prompt('Enter your new monthly recycling goal (in kg):', '200');
        if (newGoal && !isNaN(newGoal)) {
            document.getElementById('monthly-goal').textContent = newGoal;
            // Here you would typically also update this in your backend
        }
    });

    // Download report functionality
    document.querySelector('.download-report')?.addEventListener('click', function() {
        // Implement report generation and download
        alert('Generating your impact report...');
        // Here you would typically generate and download a PDF or CSV report
    });
});
