function addCost(companyId) {
    // Check if company name is filled out first
    const companySection = document.querySelector(`#costs-${companyId}`).closest('.company-section');
    const companyNameInput = companySection.querySelector('.company-name');
    const companyNameError = companySection.querySelector('.company-name-error');
    
    if (!companyNameInput.value.trim()) {
        companyNameError.style.display = 'block';
        companyNameInput.classList.add('is-invalid');
        companyNameInput.focus();
        return;
    }

    const costContainer = document.getElementById(`costs-${companyId}`);
    const costItem = document.createElement('div');
    costItem.className = 'cost-item mb-2';
    costItem.innerHTML = `
        <div class="input-group">
            <input type="text" class="form-control cost-description" placeholder="Cost description">
            <input type="number" class="form-control cost-amount" placeholder="Amount" step="0.01" min="0">
            <div class="input-group-append">
                <button type="button" class="btn btn-danger" onclick="removeCost(this)">×</button>
            </div>
        </div>
    `;
    
    const costInput = costItem.querySelector('.cost-amount');
    costInput.addEventListener('input', function(e) {
        let value = e.target.value;
        if (value.includes('.')) {
            const decimals = value.split('.')[1];
            if (decimals.length > 2) {
                e.target.value = parseFloat(value).toFixed(2);
            }
        }
    });
    
    costContainer.appendChild(costItem);
}

function removeCost(button) {
    button.closest('.cost-item').remove();
}

function calculateTotalCosts() {
    const costAmounts = [...document.getElementsByClassName('cost-amount')]
        .map(input => parseFloat(input.value) || 0);
    return parseFloat(costAmounts.reduce((a, b) => a + b, 0).toFixed(2));
}

function generateCompanyFields() {
    // Check if show name is filled out first
    const showNameInput = document.getElementById('showName');
    const showNameError = document.getElementById('showNameError');
    const showName = showNameInput.value.trim();
    
    if (showName === '') {
        showNameError.style.display = 'block';
        showNameInput.classList.add('is-invalid');
        showNameInput.focus();
        return;
    }

    // Check if total amount is filled out
    const totalAmountInput = document.getElementById('totalAmount');
    const totalAmountError = document.getElementById('totalAmountError');
    const totalAmount = totalAmountInput.value.trim();
    
    if (totalAmount === '' || parseFloat(totalAmount) <= 0) {
        totalAmountError.style.display = 'block';
        totalAmountInput.classList.add('is-invalid');
        totalAmountInput.focus();
        return;
    }

    const numberOfCompaniesInput = document.getElementById('numberOfCompanies');
    const numberOfCompaniesError = document.getElementById('numberOfCompaniesError');
    const numberOfCompanies = parseInt(numberOfCompaniesInput.value);
    
    if (!numberOfCompanies || numberOfCompanies < 2 || numberOfCompanies > 10) {
        numberOfCompaniesError.style.display = 'block';
        numberOfCompaniesInput.classList.add('is-invalid');
        numberOfCompaniesInput.focus();
        return;
    }

    const container = document.getElementById('companiesContainer');
    container.innerHTML = ''; // Clear existing fields

    for (let i = 1; i <= numberOfCompanies; i++) {
        const companySection = document.createElement('div');
        companySection.className = 'company-section card mb-4 p-3';
        companySection.innerHTML = `
            <h4>Company ${i}</h4>
            <div class="form-group">
                <label>Company Name *</label>
                <input type="text" 
                       class="form-control company-name" 
                       required 
                       minlength="1"
                       placeholder="Enter company name (required)">
                <small class="text-danger company-name-error" style="display: none;">
                    Please enter the company name
                </small>
            </div>
            <div class="form-group">
                <label>Costs</label>
                <div id="costs-${i}" class="costs-container">
                    <div class="cost-item mb-2">
                        <div class="input-group">
                            <input type="text" class="form-control cost-description" placeholder="Cost description">
                            <input type="number" class="form-control cost-amount" placeholder="Amount" step="0.01" min="0">
                            <div class="input-group-append">
                                <button type="button" class="btn btn-danger" onclick="removeCost(this)">×</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-secondary btn-sm mt-2" onclick="addCost(${i})">+ Add Cost</button>
            </div>
        `;
        container.appendChild(companySection);

        // Add validation for company name input
        const companyNameInput = companySection.querySelector('.company-name');
        const companyNameError = companySection.querySelector('.company-name-error');
        
        companyNameInput.addEventListener('input', function() {
            if (this.value.trim() === '') {
                companyNameError.style.display = 'block';
                this.classList.add('is-invalid');
            } else {
                companyNameError.style.display = 'none';
                this.classList.remove('is-invalid');
            }
        });
    }

    document.getElementById('companiesSection').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('profitForm');
    const result = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');
    const showNameInput = document.getElementById('showName');
    const showNameError = document.getElementById('showNameError');

    // Show name validation
    showNameInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            showNameError.style.display = 'block';
            this.classList.add('is-invalid');
        } else {
            showNameError.style.display = 'none';
            this.classList.remove('is-invalid');
        }
    });

    const totalAmountInput = document.getElementById('totalAmount');
    const totalAmountError = document.getElementById('totalAmountError');

    // Total amount validation
    totalAmountInput.addEventListener('input', function(e) {
        if (this.value.trim() === '' || parseFloat(this.value) <= 0) {
            totalAmountError.style.display = 'block';
            this.classList.add('is-invalid');
        } else {
            totalAmountError.style.display = 'none';
            this.classList.remove('is-invalid');
        }

        // Decimal validation
        let value = e.target.value;
        if (value.includes('.')) {
            const decimals = value.split('.')[1];
            if (decimals.length > 2) {
                e.target.value = parseFloat(value).toFixed(2);
            }
        }
    });

    const numberOfCompaniesInput = document.getElementById('numberOfCompanies');
    const numberOfCompaniesError = document.getElementById('numberOfCompaniesError');

    // Number of companies validation
    numberOfCompaniesInput.addEventListener('input', function() {
        const value = parseInt(this.value);
        if (this.value.trim() === '' || value < 2 || value > 10) {
            numberOfCompaniesError.style.display = 'block';
            this.classList.add('is-invalid');
        } else {
            numberOfCompaniesError.style.display = 'none';
            this.classList.remove('is-invalid');
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate show name
        const showName = showNameInput.value.trim();
        if (showName === '') {
            showNameError.style.display = 'block';
            showNameInput.classList.add('is-invalid');
            showNameInput.focus();
            return;
        }
        
        const totalAmount = parseFloat(parseFloat(document.getElementById('totalAmount').value).toFixed(2));
        const companyNames = [...document.getElementsByClassName('company-name')].map(input => input.value);
        const companyCosts = [...document.getElementsByClassName('costs-container')].map(container => {
            return parseFloat(
                [...container.getElementsByClassName('cost-amount')]
                    .map(input => parseFloat(input.value) || 0)
                    .reduce((a, b) => a + b, 0)
                    .toFixed(2)
            );
        });

        const totalCosts = parseFloat(companyCosts.reduce((a, b) => a + b, 0).toFixed(2));
        const netAmount = parseFloat((totalAmount - totalCosts).toFixed(2));
        const distributionType = document.querySelector('input[name="distributionType"]:checked').value;

        if (netAmount < 0) {
            resultContent.innerHTML = `
                <div class="alert alert-danger">
                    Costs exceed total amount. Cannot calculate distribution.
                </div>
            `;
            result.style.display = 'block';
            return;
        }

        if (distributionType === 'equal') {
            const sharePerCompany = netAmount / companyNames.length;
            
            let resultsHtml = `
                <div class="alert alert-info">
                    <strong>Show Name:</strong> ${showName}<br>
                    <strong>Total Amount:</strong> $${totalAmount.toFixed(2)}<br>
                    <strong>Total Costs:</strong> $${totalCosts.toFixed(2)}<br>
                    <strong>Net Amount:</strong> $${netAmount.toFixed(2)}
                </div>
                <div class="alert alert-success">Each company will receive: $${sharePerCompany.toFixed(2)}</div>
                <h4>Company Details:</h4>
            `;

            companyNames.forEach((name, index) => {
                const checkAmount = companyCosts[index] + sharePerCompany;
                resultsHtml += `
                    <div class="result-item">
                        <strong>${name}</strong><br>
                        Costs: $${companyCosts[index].toFixed(2)}<br>
                        Share: $${sharePerCompany.toFixed(2)}<br>
                        Check Amount: $${checkAmount.toFixed(2)}
                    </div>
                `;
            });

            resultContent.innerHTML = resultsHtml;
        } else {
            // For percentage-based distribution
            let percentageInputs = `
                <div class="alert alert-info">
                    <strong>Show Name:</strong> ${showName}<br>
                    <strong>Total Amount:</strong> $${totalAmount.toFixed(2)}<br>
                    <strong>Total Costs:</strong> $${totalCosts.toFixed(2)}<br>
                    <strong>Net Amount:</strong> $${netAmount.toFixed(2)}
                </div>
                <div class="alert alert-info mb-3">Enter percentage for each company (total must equal 100%)</div>
            `;
            
            companyNames.forEach((name, index) => {
                percentageInputs += `
                    <div class="form-group">
                        <label>${name} Percentage</label>
                        <input type="number" class="form-control percentage-input" min="0" max="100" required>
                        <small class="text-muted">Company Costs: $${companyCosts[index].toFixed(2)}</small>
                    </div>
                `;
            });
            
            percentageInputs += '<button class="btn btn-success" onclick="calculatePercentageShares()">Calculate Shares</button>';
            resultContent.innerHTML = percentageInputs;
        }

        result.style.display = 'block';
    });
});

function calculatePercentageShares() {
    const showName = document.getElementById('showName').value;
    const totalAmount = parseFloat(parseFloat(document.getElementById('totalAmount').value).toFixed(2));
    const companyNames = [...document.getElementsByClassName('company-name')].map(input => input.value);
    const companyCosts = [...document.getElementsByClassName('costs-container')].map(container => {
        return parseFloat(
            [...container.getElementsByClassName('cost-amount')]
                .map(input => parseFloat(input.value) || 0)
                .reduce((a, b) => a + b, 0)
                .toFixed(2)
        );
    });
    
    const totalCosts = parseFloat(companyCosts.reduce((a, b) => a + b, 0).toFixed(2));
    const netAmount = parseFloat((totalAmount - totalCosts).toFixed(2));
    const percentages = [...document.getElementsByClassName('percentage-input')].map(input => parseFloat(input.value));
    
    // Validate that percentages sum to 100
    const sum = percentages.reduce((a, b) => a + b, 0);
    if (sum !== 100) {
        resultContent.innerHTML = '<div class="alert alert-danger">Percentages must sum to 100%</div>';
        return;
    }

    // Calculate and display shares
    let sharesHtml = `
        <div class="alert alert-info">
            <strong>Show Name:</strong> ${showName}<br>
            <strong>Total Amount:</strong> $${totalAmount.toFixed(2)}<br>
            <strong>Total Costs:</strong> $${totalCosts.toFixed(2)}<br>
            <strong>Net Amount:</strong> $${netAmount.toFixed(2)}
        </div>
        <div class="alert alert-success">Distribution Results:</div>
    `;
    
    companyNames.forEach((name, index) => {
        const share = (percentages[index] / 100) * netAmount;
        const checkAmount = companyCosts[index] + share;
        sharesHtml += `
            <div class="result-item">
                <strong>${name}</strong><br>
                Costs: $${companyCosts[index].toFixed(2)}<br>
                Share: $${share.toFixed(2)} (${percentages[index]}%)<br>
                Check Amount: $${checkAmount.toFixed(2)}
            </div>
        `;
    });

    document.getElementById('resultContent').innerHTML = sharesHtml;
} 