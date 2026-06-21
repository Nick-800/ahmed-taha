// Generate Ambient Background Particles
const particlesContainer = document.getElementById('particles-container');
const particleCount = 12;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random styling parameters
    const size = Math.random() * 3 + 2; // 2px to 5px
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    particle.style.left = Math.random() * 100 + 'vw';
    
    const duration = Math.random() * 10 + 12; // 12s to 22s
    particle.style.animationDuration = duration + 's';
    
    const delay = Math.random() * -15; // Negative delay to prevent all starting at bottom at same time
    particle.style.animationDelay = delay + 's';
    
    particle.style.opacity = Math.random() * 0.4 + 0.15;
    
    particlesContainer.appendChild(particle);
}

// Modal and State System Controllers
const modal = document.getElementById('booking-modal');
const modalContainer = document.getElementById('modal-container');
const bookingForm = document.getElementById('booking-form');
const modalClose = document.getElementById('modal-close');
const inputBookName = document.getElementById('book-name');
const inputUserName = document.getElementById('user-name');
const inputUserPhone = document.getElementById('user-phone');
const formContent = document.getElementById('modal-form-content');
const successView = document.getElementById('success-view');

const nameError = document.getElementById('name-error');
const phoneError = document.getElementById('phone-error');

let activeTriggerButton = null;
let lastActiveFocusedElement = null;

// Open Modal Controller
function openReservationModal(button) {
    activeTriggerButton = button;
    lastActiveFocusedElement = document.activeElement; // Remember where we were for key navigation

    const bookTitle = button.getAttribute('data-book-title');
    inputBookName.value = bookTitle;

    // Clear previous validation states
    resetValidationStates();

    // Display modal
    modal.classList.add('active');
    
    // Focus on first input
    setTimeout(() => {
        inputUserName.focus();
    }, 100);
}

// Close Modal Controller
function closeReservationModal() {
    modal.classList.remove('active');
    
    // Clean modal success states back to form view after transition ends
    setTimeout(() => {
        formContent.style.display = 'block';
        formContent.style.opacity = '1';
        successView.style.display = 'none';
        successView.style.opacity = '0';
        bookingForm.reset();
        resetValidationStates();
    }, 400);

    // Return focus to triggering element for screen readers
    if (lastActiveFocusedElement) {
        lastActiveFocusedElement.focus();
    }
}

// Revert card reserved state
function releaseBookReservation(button, id) {
    button.classList.remove('reserved');
    button.innerText = 'احجز الآن';
    
    const badge = document.getElementById('badge-' + id);
    if (badge) {
        badge.classList.remove('active');
    }
}

// Reset Input borders and helpers
function resetValidationStates() {
    inputUserName.classList.remove('input-invalid', 'shake-anim');
    inputUserPhone.classList.remove('input-invalid', 'shake-anim');
    nameError.style.display = 'none';
    phoneError.style.display = 'none';
}

// Event Delegator for Book Grid actions
document.getElementById('book-grid').addEventListener('click', (e) => {
    const button = e.target.closest('.btn-reserve');
    if (!button) return;

    const bookId = button.getAttribute('data-book-id');

    if (button.classList.contains('reserved')) {
        // Return Book System
        releaseBookReservation(button, bookId);
    } else {
        // Open Reservation Modal
        openReservationModal(button);
    }
});

// Close events
modalClose.addEventListener('click', closeReservationModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeReservationModal();
    }
});

// Handle Escape Key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeReservationModal();
    }
});

// Form Validation & Morphing Success Sequence
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    resetValidationStates();

    const nameValue = inputUserName.value.trim();
    const phoneValue = inputUserPhone.value.trim();
    let isValid = true;

    // Full Name Check: Minimum 3 characters
    if (nameValue.length < 3) {
        isValid = false;
        inputUserName.classList.add('input-invalid');
        nameError.style.display = 'block';
        inputUserName.classList.add('shake-anim');
        setTimeout(() => {
            inputUserName.classList.remove('shake-anim');
        }, 400);
    }

    // Phone Check: Minimum 8 digits, numeric, allowing + and spaces
    const phoneRegex = /^[0-9+\s]{8,}$/;
    if (!phoneRegex.test(phoneValue)) {
        isValid = false;
        inputUserPhone.classList.add('input-invalid');
        phoneError.style.display = 'block';
        inputUserPhone.classList.add('shake-anim');
        setTimeout(() => {
            inputUserPhone.classList.remove('shake-anim');
        }, 400);
    }

    if (!isValid) {
        // Focus on first invalid input
        const firstInvalid = modal.querySelector('.input-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
    }

    // Transition: Validation Success Sequence
    formContent.style.opacity = '0';
    setTimeout(() => {
        formContent.style.display = 'none';
        successView.style.display = 'flex';
        setTimeout(() => {
            successView.style.opacity = '1';
        }, 50);

        // Morph parent card UI states after successful reserve
        if (activeTriggerButton) {
            const bookId = activeTriggerButton.getAttribute('data-book-id');
            
            activeTriggerButton.classList.add('reserved');
            activeTriggerButton.innerText = 'استرجاع الكتاب';

            const badge = document.getElementById('badge-' + bookId);
            if (badge) {
                badge.classList.add('active');
            }
        }

        // Autoclose modal after check animation displays
        setTimeout(() => {
            closeReservationModal();
        }, 1300);

    }, 300);
});

// Focus Trap System inside Modal for Keyboard Accessibility (WCAG)
const focusableElements = 'button, input';

document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab' && modal.classList.contains('active')) {
        const focusableContent = modal.querySelectorAll(focusableElements);
        // Filter out read-only elements from focus trap loop
        const activeFocusable = Array.from(focusableContent).filter(el => el.tabIndex !== -1);
        
        const firstFocusable = activeFocusable[0];
        const lastFocusable = activeFocusable[activeFocusable.length - 1];

        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else { // Tab
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    }
});
