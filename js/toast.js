function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    
    // تحديد الألوان والأيقونات حسب النوع
    let bgColor, icon;
    switch (type) {
        case 'error':
            bgColor = '#ef4444'; // red-500
            icon = 'ri-error-warning-fill';
            break;
        case 'info':
            bgColor = '#3b82f6'; // blue-500
            icon = 'ri-information-fill';
            break;
        case 'warning':
            bgColor = '#f59e0b'; // amber-500
            icon = 'ri-alert-fill';
            break;
        default: // success
            bgColor = '#2dce89'; // success green
            icon = 'ri-checkbox-circle-fill';
    }
    
    toast.className = 'toast';
    toast.style.backgroundColor = bgColor;
    toast.innerHTML = `<i class="${icon} text-xl"></i><span>${message}</span>`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);
}
