// Dark Mode functionality
export function initDarkMode() {
    // Create dark mode toggle button
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = `
        <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" id="darkModeSwitch">
            <label class="custom-control-label" for="darkModeSwitch">
                <i class="fas fa-moon"></i> Dark Mode
            </label>
        </div>
    `;

    // Add toggle to navbar
    const navbar = document.querySelector('.navbar-nav');
    navbar.appendChild(darkModeToggle);

    // Initialize dark mode state
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    
    // Load saved preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeSwitch.checked = true;
    }

    // Handle dark mode toggle
    darkModeSwitch.addEventListener('change', () => {
        if (darkModeSwitch.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
}

// Add these styles to your CSS
const darkModeStyles = `
    .dark-mode {
        background-color: #1a1a1a;
        color: #ffffff;
    }

    .dark-mode .card {
        background-color: #2d2d2d;
        border-color: #3d3d3d;
    }

    .dark-mode .form-control {
        background-color: #333333;
        border-color: #444444;
        color: #ffffff;
    }

    .dark-mode .result-item {
        background-color: #2d2d2d;
        border-color: #3d3d3d;
    }

    .dark-mode .alert-info {
        background-color: #1a3a4a;
        border-color: #2a4a5a;
        color: #ffffff;
    }

    .dark-mode .alert-success {
        background-color: #1a4a3a;
        border-color: #2a5a4a;
        color: #ffffff;
    }

    .dark-mode-toggle {
        margin-left: 1rem;
        color: #ffffff;
    }

    .dark-mode .custom-control-label {
        color: #ffffff;
    }

    .dark-mode .modal-content {
        background-color: #2d2d2d;
        border-color: #3d3d3d;
    }

    .dark-mode .modal-header {
        border-bottom-color: #3d3d3d;
    }

    .dark-mode .modal-footer {
        border-top-color: #3d3d3d;
    }

    .dark-mode .table {
        color: #ffffff;
    }

    .dark-mode .dropdown-menu {
        background-color: #2d2d2d;
        border-color: #3d3d3d;
    }

    .dark-mode .dropdown-item {
        color: #ffffff;
    }

    .dark-mode .dropdown-item:hover {
        background-color: #3d3d3d;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = darkModeStyles;
document.head.appendChild(styleSheet); 