function saveToFile(distributionType) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 20;

    // Get data
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

    // Helper function to draw a line
    function drawLine(y) {
        doc.setDrawColor(200, 200, 200);
        doc.line(20, y, 190, y);
    }

    // Helper function to add section header
    function addSectionHeader(text, y) {
        doc.setFillColor(51, 122, 183); // Bootstrap primary color
        doc.rect(20, y - 6, 170, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.text(text, 25, y);
        doc.setTextColor(0, 0, 0);
        return y + 10;
    }

    // Title
    doc.setFontSize(24);
    doc.setTextColor(51, 122, 183); // Bootstrap primary color
    doc.text('Profit Sharing Calculator', 20, y);
    y += 10;

    doc.setFontSize(16);
    doc.setTextColor(108, 117, 125); // Bootstrap secondary color
    doc.text('Calculation Results', 20, y);
    y += 15;

    // Summary Section
    y = addSectionHeader('Summary Information', y);
    doc.setFontSize(11);
    doc.text(`Show Name: ${showName}`, 25, y); y += 7;
    doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 25, y); y += 7;
    doc.text(`Total Costs: $${totalCosts.toFixed(2)}`, 25, y); y += 7;
    doc.setTextColor(51, 122, 183);
    doc.setFontSize(12);
    doc.text(`Net Amount: $${netAmount.toFixed(2)}`, 25, y);
    doc.setTextColor(0, 0, 0);
    y += 15;

    drawLine(y - 5);

    // Companies
    companyNames.forEach((name, index) => {
        if (y > 250) {
            doc.addPage();
            y = 20;
        }

        y = addSectionHeader(`Company: ${name}`, y);
        doc.setFontSize(11);

        // Costs
        if (companyCosts[index].length > 0) {
            doc.text('Costs:', 25, y); y += 7;
            companyCosts[index].forEach(cost => {
                const costText = `• ${cost.company}: ${cost.description}`;
                const amountText = `$${cost.amount.toFixed(2)}`;
                
                // Split long text into multiple lines
                const textLines = doc.splitTextToSize(costText, 140);
                doc.text(textLines, 30, y);
                doc.text(amountText, 175, y, { align: 'right' });
                y += textLines.length * 6 + 2;
            });
        } else {
            doc.setTextColor(108, 117, 125);
            doc.text('No costs reported', 30, y);
            doc.setTextColor(0, 0, 0);
            y += 7;
        }

        // Share information
        y += 5;
        if (distributionType === 'equal') {
            const sharePerCompany = netAmount / companyNames.length;
            const checkAmount = (companyCosts[index].reduce((a, b) => a + b.amount, 0) + sharePerCompany);
            
            doc.text('Share Amount:', 25, y);
            doc.text(`$${sharePerCompany.toFixed(2)}`, 175, y, { align: 'right' }); 
            y += 7;
            
            doc.setTextColor(40, 167, 69); // Bootstrap success color
            doc.text('Final Check Amount:', 25, y);
            doc.text(`$${checkAmount.toFixed(2)}`, 175, y, { align: 'right' });
            doc.setTextColor(0, 0, 0);
            y += 15;
        } else {
            const percentage = document.querySelectorAll('.percentage-input')[index].value;
            const share = (percentage / 100) * netAmount;
            const checkAmount = (companyCosts[index].reduce((a, b) => a + b.amount, 0) + share);
            
            doc.text(`Share Amount (${percentage}%)`, 25, y);
            doc.text(`$${share.toFixed(2)}`, 175, y, { align: 'right' });
            y += 7;
            
            doc.setTextColor(40, 167, 69); // Bootstrap success color
            doc.text('Final Check Amount:', 25, y);
            doc.text(`$${checkAmount.toFixed(2)}`, 175, y, { align: 'right' });
            doc.setTextColor(0, 0, 0);
            y += 15;
        }

        drawLine(y - 5);
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(108, 117, 125);
        doc.text(`Page ${i} of ${pageCount}`, 20, doc.internal.pageSize.height - 10);
        doc.text('Generated by Profit Sharing Calculator', doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10, { align: 'right' });
    }

    // Save the PDF
    doc.save(`${showName.replace(/\s+/g, '_')}_profit_sharing.pdf`);
} 