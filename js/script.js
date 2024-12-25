function addCost(companyId) {
    // Check if company name is filled out first
    const companySection = document.querySelector(`#costs-${companyId}`).closest('.company-section');
    const companyNameInput = companySection.querySelector('.company-name');
    const companyNameError = companySection.querySelector('.company-name-error');
    
    // Check main company name
    if (!companyNameInput.value.trim()) {
        companyNameError.style.display = 'block';
        companyNameInput.classList.add('is-invalid');
        companyNameInput.focus();
        return;
    }

    // Check if there's an existing cost item with empty company name
    const existingCosts = companySection.querySelectorAll('.cost-company');
    for (let costInput of existingCosts) {
        const costItem = costInput.closest('.cost-item');
        const amountInput = costItem.querySelector('.cost-amount');
        
        // Only validate if amount has a value
        if (amountInput.value.trim() !== '' && !costInput.value.trim()) {
            costInput.classList.add('is-invalid');
            costInput.focus();
            costItem.querySelector('.cost-error').style.display = 'block';
            return;
        }
    }

    // If all existing company names are filled, add new cost item
    const costContainer = document.getElementById(`costs-${companyId}`);
    const costItem = document.createElement('div');
    costItem.className = 'cost-item mb-2';
    costItem.innerHTML = `
        <div class="input-group">
            <input type="text" 
                   class="form-control cost-company" 
                   placeholder="Company name for cost">
            <input type="text" 
                   class="form-control cost-description" 
                   placeholder="Cost description">
            <input type="number" 
                   class="form-control cost-amount" 
                   placeholder="Amount" 
                   step="0.01" 
                   min="0">
            <div class="input-group-append">
                <button type="button" class="btn btn-danger" onclick="removeCost(this)">×</button>
            </div>
        </div>
        <div class="invalid-feedback cost-error" style="display: none;">
            Company name and description are required when amount is entered
        </div>
    `;
    
    // Add validation for cost fields
    const costCompanyInput = costItem.querySelector('.cost-company');
    const costDescInput = costItem.querySelector('.cost-description');
    const costAmountInput = costItem.querySelector('.cost-amount');
    const costError = costItem.querySelector('.cost-error');

    function validateCostFields() {
        if (costAmountInput.value.trim() !== '') {
            // Only validate if amount has a value
            const companyValid = costCompanyInput.value.trim() !== '';
            const descValid = costDescInput.value.trim() !== '';

            if (!companyValid || !descValid) {
                costError.style.display = 'block';
                if (!companyValid) costCompanyInput.classList.add('is-invalid');
                if (!descValid) costDescInput.classList.add('is-invalid');
                return false;
            }
        }
        
        // If no amount or all fields are valid
        costError.style.display = 'none';
        costCompanyInput.classList.remove('is-invalid');
        costDescInput.classList.remove('is-invalid');
        return true;
    }

    // Handle Enter key in amount field
    costAmountInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const addCostButton = this.closest('.company-section').querySelector('.btn-secondary');
            if (validateCostFields()) {
                addCostButton.click();
            }
        }
    });

    costCompanyInput.addEventListener('input', validateCostFields);
    costDescInput.addEventListener('input', validateCostFields);
    costAmountInput.addEventListener('input', function(e) {
        // Decimal validation
        let value = e.target.value;
        if (value.includes('.')) {
            const decimals = value.split('.')[1];
            if (decimals.length > 2) {
                e.target.value = parseFloat(value).toFixed(2);
            }
        }
        validateCostFields();
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
                            <input type="text" 
                                   class="form-control cost-company" 
                                   placeholder="Company name for cost">
                            <input type="text" 
                                   class="form-control cost-description" 
                                   placeholder="Cost description">
                            <input type="number" 
                                   class="form-control cost-amount" 
                                   placeholder="Amount" 
                                   step="0.01" 
                                   min="0">
                            <div class="input-group-append">
                                <button type="button" class="btn btn-danger" onclick="removeCost(this)">×</button>
                            </div>
                        </div>
                        <div class="invalid-feedback cost-error" style="display: none;">
                            Company name and description are required when amount is entered
                        </div>
                    </div>
                </div>
                <div class="btn-group mt-2">
                    <button type="button" class="btn btn-secondary btn-sm" onclick="addCost(${i})">+ Add Cost</button>
                    <button type="button" class="btn btn-info btn-sm" onclick="markNoCost(${i})">No Cost</button>
                </div>
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

        const initialCostAmount = companySection.querySelector('.cost-amount');
        initialCostAmount.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const addCostButton = this.closest('.company-section').querySelector('.btn-secondary');
                if (this.value.trim() !== '') {
                    addCostButton.click();
                }
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

        // Validate all costs before proceeding
        if (!validateAllCosts()) {
            alert('Please complete or remove any partially filled cost entries');
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
            const saveButton = document.createElement('button');
            saveButton.className = 'btn btn-primary mt-3';
            saveButton.innerHTML = 'Save Results';
            saveButton.onclick = () => saveToFile('equal');
            resultContent.appendChild(saveButton);
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
            const saveButton = document.createElement('button');
            saveButton.className = 'btn btn-primary mt-3';
            saveButton.innerHTML = 'Save Results';
            saveButton.onclick = () => saveToFile('percentage');
            resultContent.appendChild(saveButton);
        }

        result.style.display = 'block';
    });

    // Prevent form submission on Enter key and trigger Add Companies button
    form.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            // Check if we have enough data to generate company fields
            const showName = document.getElementById('showName').value.trim();
            const totalAmount = document.getElementById('totalAmount').value.trim();
            const numberOfCompanies = document.getElementById('numberOfCompanies').value.trim();
            
            if (showName && totalAmount && numberOfCompanies) {
                generateCompanyFields();
            }
        }
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
    const saveButton = document.createElement('button');
    saveButton.className = 'btn btn-primary mt-3';
    saveButton.innerHTML = 'Save Results';
    saveButton.onclick = () => saveToFile('percentage');
    resultContent.appendChild(saveButton);
}

function markNoCost(companyId) {
    const costContainer = document.getElementById(`costs-${companyId}`);
    // Remove all existing costs
    costContainer.innerHTML = `
        <div class="alert alert-info mb-2">
            This company has no costs
        </div>
    `;
    // Hide the cost buttons after marking as no cost
    const btnGroup = costContainer.nextElementSibling;
    btnGroup.style.display = 'none';
}

function validateAllCosts() {
    const costItems = document.querySelectorAll('.cost-item');
    let isValid = true;

    costItems.forEach(costItem => {
        const companyInput = costItem.querySelector('.cost-company');
        const descInput = costItem.querySelector('.cost-description');
        const amountInput = costItem.querySelector('.cost-amount');
        const costError = costItem.querySelector('.cost-error');

        // Skip validation if this is a "No Cost" company
        if (!companyInput || !descInput || !amountInput) return;

        // Only validate if amount has a value
        if (amountInput.value.trim() !== '') {
            if (!companyInput.value.trim() || !descInput.value.trim()) {
                costError.style.display = 'block';
                if (!companyInput.value.trim()) companyInput.classList.add('is-invalid');
                if (!descInput.value.trim()) descInput.classList.add('is-invalid');
                isValid = false;
            }
        } else {
            // If amount is empty, remove any validation styling
            costError.style.display = 'none';
            companyInput.classList.remove('is-invalid');
            descInput.classList.remove('is-invalid');
            amountInput.classList.remove('is-invalid');
        }
    });

    return isValid;
}

// Add this new function to save results
function saveToFile(distributionType) {
    const showName = document.getElementById('showName').value;
    const totalAmount = parseFloat(document.getElementById('totalAmount').value);
    const companyNames = [...document.getElementsByClassName('company-name')].map(input => input.value);
    const companyCosts = [...document.getElementsByClassName('costs-container')].map(container => {
        const costs = [...container.getElementsByClassName('cost-amount')]
            .map((input, index) => {
                const costRow = input.closest('.cost-item');
                if (costRow) {
                    return {
                        company: costRow.querySelector('.cost-company').value,
                        description: costRow.querySelector('.cost-description').value,
                        amount: parseFloat(input.value) || 0
                    };
                }
                return null;
            })
            .filter(cost => cost !== null && cost.amount > 0);
        return costs;
    });

    const totalCosts = parseFloat(companyCosts.flat().reduce((a, b) => a + b.amount, 0).toFixed(2));
    const netAmount = parseFloat((totalAmount - totalCosts).toFixed(2));
    
    let content = `Profit Sharing Calculation Results\n`;
    content += `================================\n\n`;
    content += `Show Name: ${showName}\n`;
    content += `Total Amount: $${totalAmount.toFixed(2)}\n`;
    content += `Total Costs: $${totalCosts.toFixed(2)}\n`;
    content += `Net Amount: $${netAmount.toFixed(2)}\n\n`;

    companyNames.forEach((name, index) => {
        content += `Company: ${name}\n`;
        content += `Costs:\n`;
        
        if (companyCosts[index].length > 0) {
            companyCosts[index].forEach(cost => {
                content += `  - ${cost.company}: ${cost.description} - $${cost.amount.toFixed(2)}\n`;
            });
        } else {
            content += `  No costs reported\n`;
        }

        if (distributionType === 'equal') {
            const sharePerCompany = netAmount / companyNames.length;
            const checkAmount = (companyCosts[index].reduce((a, b) => a + b.amount, 0) + sharePerCompany);
            content += `Share Amount: $${sharePerCompany.toFixed(2)}\n`;
            content += `Check Amount: $${checkAmount.toFixed(2)}\n`;
        } else {
            const percentage = document.querySelectorAll('.percentage-input')[index].value;
            const share = (percentage / 100) * netAmount;
            const checkAmount = (companyCosts[index].reduce((a, b) => a + b.amount, 0) + share);
            content += `Share Amount: $${share.toFixed(2)} (${percentage}%)\n`;
            content += `Check Amount: $${checkAmount.toFixed(2)}\n`;
        }
        content += `\n`;
    });

    // Create and download the file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${showName.replace(/\s+/g, '_')}_profit_sharing.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
} 