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