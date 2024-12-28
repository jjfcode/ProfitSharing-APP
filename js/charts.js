function createCharts(totalAmount, totalCosts, netAmount, companyNames, companyCosts, shares) {
    // Create a container for charts
    const chartsContainer = document.createElement('div');
    chartsContainer.className = 'row mt-4';

    // Pie chart for Total Amount breakdown
    const pieChartDiv = document.createElement('div');
    pieChartDiv.className = 'col-md-6';
    pieChartDiv.innerHTML = '<canvas id="expensesChart"></canvas>';
    chartsContainer.appendChild(pieChartDiv);

    // Bar chart for Company Breakdown
    const barChartDiv = document.createElement('div');
    barChartDiv.className = 'col-md-6';
    barChartDiv.innerHTML = '<canvas id="companyChart"></canvas>';
    chartsContainer.appendChild(barChartDiv);

    // Add charts before the save button
    const saveButton = document.querySelector('.dropdown');
    saveButton.parentNode.insertBefore(chartsContainer, saveButton);

    // Create Pie Chart
    new Chart(document.getElementById('expensesChart'), {
        type: 'pie',
        data: {
            labels: ['Total Costs', 'Net Profit'],
            datasets: [{
                data: [totalCosts, netAmount],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(75, 192, 192, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Expenses vs Profit Breakdown',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Create Bar Chart
    new Chart(document.getElementById('companyChart'), {
        type: 'bar',
        data: {
            labels: companyNames,
            datasets: [
                {
                    label: 'Costs',
                    data: companyCosts,
                    backgroundColor: 'rgba(255, 99, 132, 0.8)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Share',
                    data: shares,
                    backgroundColor: 'rgba(75, 192, 192, 0.8)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount ($)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Company Breakdown',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
} 