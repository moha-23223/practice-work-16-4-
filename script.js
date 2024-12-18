const notificationElement = document.createElement('div');
document.body.appendChild(notificationElement);

function showNotification(message) {
    notificationElement.textContent = message;
    notificationElement.style.position = 'fixed';
    notificationElement.style.top = '20px';
    notificationElement.style.left = '50%';
    notificationElement.style.transform = 'translateX(-50%)';
    notificationElement.style.padding = '10px 20px';
    notificationElement.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
    notificationElement.style.color = 'white';
    notificationElement.style.borderRadius = '5px';
    notificationElement.style.fontSize = '16px';
}

function hideNotification() {
    notificationElement.textContent = '';
}

function checkNetworkStatus() {
    const startTime = Date.now();

    fetch('https://sb-film.skillbox.cc/ping', { method: 'POST' })
        .then(response => {
            const endTime = Date.now();
            const duration = endTime - startTime;

            if (duration > 500) {
                showNotification('Медленное соединение');
            } else {
                hideNotification();
            }
        })
        .catch(error => {
            showNotification('Неполадки с сетью');
        });
}

setInterval(checkNetworkStatus, 5000);

window.addEventListener('online', () => {
    hideNotification();
});

window.addEventListener('offline', () => {
    showNotification('Неполадки с сетью');
});