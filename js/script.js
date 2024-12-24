function addCost(companyId) {
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
    const numberOfCompanies = parseInt(document.getElementById('numberOfCompanies').value);
    if (!numberOfCompanies || numberOfCompanies < 1) {
        alert('Please enter a valid number of companies');
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
                <label>Company Name</label>
                <input type="text" class="form-control company-name" required>
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
    }

    document.getElementById('companiesSection').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('profitForm');
    const result = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');

    const totalAmountInput = document.getElementById('totalAmount');
    totalAmountInput.addEventListener('input', function(e) {
        let value = e.target.value;
        if (value.includes('.')) {
            const decimals = value.split('.')[1];
            if (decimals.length > 2) {
                e.target.value = parseFloat(value).toFixed(2);
            }
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
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