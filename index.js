// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal functionality
const modal = document.getElementById('appointmentModal');
const contactBtn = document.getElementById('contact-btn');
const closeModal = document.getElementById('closeModal');
const appointmentForm = document.getElementById('appointmentForm');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const currentStepElement = document.getElementById('currentStep');

let currentStep = 1;
const totalSteps = 3;

// Open modal
contactBtn.addEventListener('click', function(e) {
    e.preventDefault();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close modal
closeModal.addEventListener('click', function() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    resetForm();
});

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        resetForm();
    }
});

// Generate time slots
const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
const timeGrid = document.getElementById('timeGrid');
const selectedTimeInput = document.getElementById('selectedTime');

timeSlots.forEach(time => {
    const timeSlot = document.createElement('button');
    timeSlot.type = 'button';
    timeSlot.className = 'time-slot';
    timeSlot.textContent = time;
    timeSlot.addEventListener('click', function() {
        // Remove selected class from all time slots
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('selected');
        });
        // Add selected class to clicked time slot
        this.classList.add('selected');
        selectedTimeInput.value = time;
    });
    timeGrid.appendChild(timeSlot);
});

// Set minimum date to today
const dateInput = document.getElementById('appointmentDate');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Step navigation
function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(stepElement => {
        stepElement.classList.add('hidden');
    });

    // Show current step
    document.getElementById('step' + step).classList.remove('hidden');

    // Update step indicator
    currentStepElement.textContent = step;

    // Update buttons
    if (step === 1) {
        prevBtn.classList.add('hidden');
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    } else if (step === totalSteps) {
        prevBtn.classList.remove('hidden');
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        prevBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
}

// Next button
nextBtn.addEventListener('click', function() {
    if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
    }
});

// Previous button
prevBtn.addEventListener('click', function() {
    currentStep--;
    showStep(currentStep);
});

// Validate current step
function validateStep(step) {
    const currentStepElement = document.getElementById('step' + step);
    const inputs = currentStepElement.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '#d1d5db';
        }
    });

    // Special validation for step 2 (service selection)
    if (step === 2) {
        const serviceSelected = currentStepElement.querySelector('input[name="service"]:checked');
        if (!serviceSelected) {
            isValid = false;
            alert('Veuillez sélectionner un service.');
        }
    }

    if (!isValid) {
        alert('Veuillez remplir tous les champs obligatoires.');
    }

    return isValid;
}

// Form submission
appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate step 3
    if (!validateStep(3)) {
        return;
    }

    // Check if time is selected
    if (!selectedTimeInput.value) {
        alert('Veuillez sélectionner une heure.');
        return;
    }

    // Get form data
    const formData = new FormData(appointmentForm);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    data.time = selectedTimeInput.value;

    // In a real application, you would send this data to a server
    console.log('Appointment data:', data);

    // Show success message
    alert('Demande de rendez-vous envoyée ! Nous vous contacterons dans les 24h.');

    // Close modal and reset form
    modal.classList.remove('active');
    document.body.style.overflow = '';
    resetForm();
});

// Reset form
function resetForm() {
    appointmentForm.reset();
    currentStep = 1;
    showStep(currentStep);

    // Reset time selection
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    selectedTimeInput.value = '';
}

// Initialize
showStep(currentStep);

// Download button functionality (placeholder)
document.querySelectorAll('.btn-download').forEach(button => {
    button.addEventListener('click', function() {
        alert('Le téléchargement commencera bientôt. Dans une version réelle, cela téléchargerait le fichier.');
    });
});
