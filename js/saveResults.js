function saveToFile(distributionType) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 20;

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

    // Title
    doc.setFontSize(16);
    doc.text('Profit Sharing Calculation Results', 20, y);
    y += 15;

    // Summary
    doc.setFontSize(12);
    doc.text(`Show Name: ${showName}`, 20, y); y += 10;
    doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 20, y); y += 10;
    doc.text(`Total Costs: $${totalCosts.toFixed(2)}`, 20, y); y += 10;
    doc.text(`Net Amount: $${netAmount.toFixed(2)}`, 20, y); y += 15;

    // Companies
    companyNames.forEach((name, index) => {
        // Add new page if we're near the bottom
        if (y > 250) {
            doc.addPage();
            y = 20;
        }

        doc.setFontSize(14);
        doc.text(`Company: ${name}`, 20, y); y += 8;
        doc.setFontSize(12);

        // Costs
        if (companyCosts[index].length > 0) {
            doc.text('Costs:', 20, y); y += 8;
            companyCosts[index].forEach(cost => {
                const costText = `- ${cost.company}: ${cost.description} - $${cost.amount.toFixed(2)}`;
                // Split long text into multiple lines
                const textLines = doc.splitTextToSize(costText, 170);
                doc.text(textLines, 25, y);
                y += textLines.length * 6 + 2;
            });
        } else {
            doc.text('No costs reported', 25, y);
            y += 8;
        }

        // Share information
        if (distributionType === 'equal') {
            const sharePerCompany = netAmount / companyNames.length;
            const checkAmount = (companyCosts[index].reduce((a, b) => a + b.amount, 0) + sharePerCompany);
            doc.text(`Share Amount: $${sharePerCompany.toFixed(2)}`, 20, y); y += 8;
            doc.text(`Check Amount: $${checkAmount.toFixed(2)}`, 20, y); y += 15;
        } else {
            const percentage = document.querySelectorAll('.percentage-input')[index].value;
            const share = (percentage / 100) * netAmount;
            const checkAmount = (companyCosts[index].reduce((a, b) => a + b.amount, 0) + share);
            doc.text(`Share Amount: $${share.toFixed(2)} (${percentage}%)`, 20, y); y += 8;
            doc.text(`Check Amount: $${checkAmount.toFixed(2)}`, 20, y); y += 15;
        }
    });

    // Save the PDF
    doc.save(`${showName.replace(/\s+/g, '_')}_profit_sharing.pdf`);
} 