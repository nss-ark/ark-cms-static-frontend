// Ark CMS Global JavaScript

document.addEventListener('DOMContentLoaded', () => {
    handleMockLogins();
    initializeDropdowns();
    initializeModals();
    initializeTabs();
    initializeMobileNav();

    // Add other general UI initializations here
});

function handleMockLogins() {
    const loginForms = document.querySelectorAll('form[id$="-login-form"]'); // e.g., dp-login-form
    loginForms.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const emailInput = form.querySelector('input[type="email"], input[name="email_phone"]');
            const passwordInput = form.querySelector('input[type="password"]');
            const portalType = form.id.split('-')[0]; // dp, df_admin, etc.

            // Basic validation (can be more robust)
            if (!emailInput.value || !passwordInput.value) {
                alert('Please enter both email/phone and password.');
                return;
            }

            // Mock credentials (replace with actual values if needed for different roles)
            let expectedEmail;
            let dashboardUrl;

            switch (portalType) {
                case 'dp':
                    expectedEmail = 'dp_user@ark.com';
                    dashboardUrl = 'dp_dashboard.html';
                    break;
                case 'df_admin':
                    expectedEmail = 'df_admin@fiduciary.com';
                    dashboardUrl = 'df_admin_dashboard.html';
                    break;
                case 'df_dpo':
                    expectedEmail = 'df_dpo@fiduciary.com';
                    dashboardUrl = 'df_dpo_dashboard.html';
                    break;
                case 'df_operator':
                    expectedEmail = 'df_operator@fiduciary.com';
                    dashboardUrl = 'df_operator_dashboard.html';
                    break;
                case 'superadmin':
                    expectedEmail = 'super_admin@ark.com';
                    dashboardUrl = 'superadmin_dashboard.html';
                    // OTP is mandatory for SuperAdmin as per wireframes
                const saOtpInput = form.querySelector('input[name="otp"]');
                if (saOtpInput && !saOtpInput.closest('.otp-step').classList.contains('active')) {
                    // Show OTP step
                    form.querySelector('.credential-step').style.display = 'none';
                    const otpStep = form.querySelector('.otp-step');
                    otpStep.style.display = 'block';
                    otpStep.classList.add('active');
                    saOtpInput.focus();
                    return; // Stop further processing until OTP is submitted
                } else if (saOtpInput && saOtpInput.closest('.otp-step').classList.contains('active')) {
                    if (saOtpInput.value === "123456") { // Check mock OTP
                        window.location.href = dashboardUrl;
                    } else {
                        alert('Invalid OTP. Please try again.');
                    }
                    return; // OTP processed
                }
                    break;
                default:
                    alert('Unknown portal type.');
                    return;
            }

            if (emailInput.value.toLowerCase() === expectedEmail && passwordInput.value === 'password') {
                // Check for OTP step (simplified)
                const otpInput = form.querySelector('input[name="otp"]');
                if (otpInput && !otpInput.closest('.otp-step').classList.contains('active')) {
                    // Show OTP step if it exists and is not active
                    const credentialStep = form.querySelector('.credential-step');
                    const otpStep = form.querySelector('.otp-step');
                    if (credentialStep && otpStep) {
                        credentialStep.style.display = 'none';
                        otpStep.style.display = 'block';
                        otpStep.classList.add('active'); // Mark as active
                        otpInput.focus();
                    } else { // If no OTP step defined, log in directly
                        window.location.href = dashboardUrl;
                    }
                    return; // Don't proceed to login yet
                } else if (otpInput && otpInput.closest('.otp-step').classList.contains('active')) {
                    if (otpInput.value === "123456") { // Mock OTP
                         window.location.href = dashboardUrl;
                    } else {
                        alert('Invalid OTP. Please try again.');
                    }
                    return;
                }
                // If no OTP input field present, or OTP already handled by above logic
                window.location.href = dashboardUrl;

            } else {
                alert('Invalid credentials. Please try again.');
            }
        });
    });
}

function initializeDropdowns() {
    const dropdownTriggers = document.querySelectorAll('.user-menu-trigger'); // Generalize for more dropdowns
    dropdownTriggers.forEach(trigger => {
        const dropdown = trigger.nextElementSibling;
        if (dropdown && dropdown.classList.contains('user-menu-dropdown')) {
            trigger.addEventListener('click', (event) => {
                event.stopPropagation();
                dropdown.classList.toggle('active');
            });
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        document.querySelectorAll('.user-menu-dropdown.active').forEach(dropdown => {
            if (!dropdown.contains(event.target) && !dropdown.previousElementSibling.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });
    });
}

function initializeModals() {
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetModalId = trigger.getAttribute('data-modal-target');
            const modal = document.getElementById(targetModalId);
            if (modal) {
                modal.classList.add('active');
            }
        });
    });

    const modalCloseButtons = document.querySelectorAll('.modal-close-btn, .modal-overlay[data-modal-dismiss]');
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // If the event target is the overlay itself (for data-modal-dismiss)
            if (button.hasAttribute('data-modal-dismiss') && event.target !== button) {
                return;
            }
            button.closest('.modal-overlay').classList.remove('active');
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
}

function initializeTabs() {
    const tabLists = document.querySelectorAll('.tab-list');
    tabLists.forEach(tabList => {
        const tabItems = tabList.querySelectorAll('.tab-item');
        const tabPanelsContainer = tabList.nextElementSibling; // Assuming panels are next sibling or need specific targeting

        tabItems.forEach(tabItem => {
            tabItem.addEventListener('click', () => {
                // Deactivate all tabs and panels in this group
                tabItems.forEach(item => item.classList.remove('active'));
                if (tabPanelsContainer) {
                    const panels = tabPanelsContainer.querySelectorAll('.tab-panel');
                    panels.forEach(panel => panel.classList.remove('active'));
                } else { // Fallback for panels identified by data-tab attribute
                    const currentTabGroup = tabItem.closest('.tabs');
                    if(currentTabGroup) {
                        currentTabGroup.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
                    }
                }


                // Activate clicked tab
                tabItem.classList.add('active');

                // Activate corresponding panel
                const targetPanelId = tabItem.getAttribute('data-tab');
                const targetPanel = document.getElementById(targetPanelId);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });

        // Activate the first tab by default if none are active
        if (tabList.querySelector('.tab-item.active') === null && tabItems.length > 0) {
            tabItems[0].click();
        }
    });
}

function initializeMobileNav() {
    const hamburger = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // Optional: Close sidebar when a nav link is clicked on mobile
        const sidebarLinks = sidebar.querySelectorAll('.sidebar-nav a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                }
            });
        });

        // Optional: Close sidebar if clicking outside of it on mobile
        document.addEventListener('click', (event) => {
            if (sidebar.classList.contains('active') && !sidebar.contains(event.target) && !hamburger.contains(event.target)) {
                sidebar.classList.remove('active');
            }
        });
    }
}

// Utility to get initials for avatar
function getInitials(name) {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length > 1) {
        return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

// Populate user-specific elements on dashboard pages
function populateUserSpecificElements(userName) {
    const welcomeElements = document.querySelectorAll('.welcome-message');
    welcomeElements.forEach(el => el.textContent = `Welcome, ${userName}!`);

    const avatarElements = document.querySelectorAll('.avatar');
    avatarElements.forEach(el => el.textContent = getInitials(userName));

    const userNameElements = document.querySelectorAll('.user-name-display');
    userNameElements.forEach(el => el.textContent = userName);
}