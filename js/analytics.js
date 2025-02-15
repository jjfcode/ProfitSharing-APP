function trackEvent(category, action, label = null) {
    if (window.gtag) {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track PWA installation
window.addEventListener('beforeinstallprompt', (e) => {
    trackEvent('PWA', 'install-prompt-shown');
    
    e.userChoice.then((choiceResult) => {
        trackEvent('PWA', 'install-' + choiceResult.outcome);
    });
});

// Track form submissions
document.getElementById('profitForm').addEventListener('submit', () => {
    trackEvent('Calculator', 'calculation-performed');
});

// Track PDF exports
document.addEventListener('pdf-exported', () => {
    trackEvent('Export', 'pdf-downloaded');
});