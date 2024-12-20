document.addEventListener("DOMContentLoaded", function () {

    // Navbar Scroll Check
    const navbar = document.querySelector(".navbar");

    function handleNavbarScroll() {
        if (window.scrollY > 600) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
    
    window.addEventListener("scroll", handleNavbarScroll);

    // Navbar Toggle for Small Screens
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarMenu = document.querySelector('.navbar-collapse');
    navbarToggler.addEventListener('click', function () {
        navbarMenu.classList.toggle('show');    
    });

    // Carousel Transition
    $(document).ready(function () {
        $('#carouselExampleSlidesOnly').carousel({
            interval: 2000 
        });
    });

    // Smooth Scroll Functionality
    const links = document.querySelectorAll('.navbar-nav a');
    for (const link of links) {
        link.addEventListener('click', smoothScroll);
    }

    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: "smooth"
        });
    }

    // Contact Form Validation and Submission
    const contactForm = document.querySelector('#contact-form');

    // Ensure contactForm exists before adding an event listener
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const firstname = document.querySelector('#firstname').value.trim();
            const lastname = document.querySelector('#lastname').value.trim();
            const mobile = document.querySelector('#mobile').value.trim();
            const email = document.querySelector('#email').value.trim();
            const message = document.querySelector('#message').value.trim();

            let isValid = true;

            // First Name validation
            if (firstname === "") {
                showError('firstname', 'Please enter your first name');
                isValid = false;
            } else {
                clearError('firstname');
            }

            // Last Name validation
            if (lastname === "") {
                showError('lastname', 'Please enter your last name');
                isValid = false;
            } else {
                clearError('lastname');
            }

            // Mobile Number validation (10 digits)
            const mobilePattern = /^[0-9]{10}$/;
            if (!mobilePattern.test(mobile)) {
                showError('mobile', 'Mobile number must be a 10-digit number');
                isValid = false;
            } else {
                clearError('mobile');
            }

            // Email validation
            const emailField = document.querySelector('#email');

            function validateEmail(email) {
                const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                return re.test(email);
            }
        
            validateEmail("test@example.com"); 
            validateEmail("invalid-email");

            emailField.addEventListener('blur', function () {
                    const email = emailField.value.trim();
                    if (!validateEmail(email)) {
                    showError('email', 'Please enter a valid email address');
                    isValid = false;
                    } else {
                    clearError('email');
                    }
            });

            // Message validation (minimum 50 characters)
            const minMessageLength = 20;
            if (message.length < minMessageLength) {
                showError('message', `Message must be at least ${minMessageLength} characters long`);
                isValid = false;
            } else {
                clearError('message');
            }

            // If form is valid, display success message and reset the form
            if (isValid) {
                alert("Thank you for your message!");
                contactForm.reset();
            }
        });
     } else {
            console.error("Contact form not found.");
     }
       

    // Helper functions for showing and clearing errors
    function showError(field, message) {
        const fieldElement = document.querySelector(`#${field}`);
        const errorElement = document.querySelector(`#${field}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('error-message');
        } else {
            console.error(`Error span for ${field} not found.`);
        }
    }

    function clearError(field) {
        const fieldElement = document.querySelector(`#${field}`);
        const errorElement = document.querySelector(`#${field}-error`);
        if (errorElement) {
            errorElement.textContent = "";
            fieldElement.classList.remove('error');
        }
    }
});