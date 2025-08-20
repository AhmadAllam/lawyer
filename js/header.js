async function updateCountersInHeader() {
    try {
        const clientCount = await getCount('clients');
        const caseCount = await getCount('cases');
        const tomorrowSessionsCount = await getTomorrowSessionsCount();
        const tomorrowAdministrativeCount = await getTomorrowAdministrativeCount();
        
        const clientCountElement = document.getElementById('client-count');
        const lawsuitCountElement = document.getElementById('lawsuit-count');
        const tomorrowSessionsCountElement = document.getElementById('tomorrow-sessions-count');
        const tomorrowAdministrativeCountElement = document.getElementById('tomorrow-administrative-count');
        
        if (clientCountElement) clientCountElement.textContent = clientCount.toString();
        if (lawsuitCountElement) lawsuitCountElement.textContent = caseCount.toString();
        if (tomorrowSessionsCountElement) {
            tomorrowSessionsCountElement.textContent = tomorrowSessionsCount > 0 ? tomorrowSessionsCount.toString() : '0';
        }
        if (tomorrowAdministrativeCountElement) {
            tomorrowAdministrativeCountElement.textContent = tomorrowAdministrativeCount > 0 ? tomorrowAdministrativeCount.toString() : '0';
        }
        
    } catch (error) {
    }
}

function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

async function startDateAlternation() {
    const displayElement = document.getElementById('alternating-display');
    const labelElement = document.getElementById('alternating-label');
    const iconElement = document.getElementById('alternating-icon');
    
    if (!displayElement || !labelElement || !iconElement) return;
    
    let isShowingDate = true;
    let officeName = "محامين مصر الرقمية"; // القيمة الافتراضية
    

    try {
        const savedOfficeName = await getSetting('officeName');
        if (savedOfficeName) {
            officeName = savedOfficeName;
        }
    } catch (error) {

    }
    
    function updateDisplay() {
        labelElement.style.opacity = '0';
        displayElement.style.opacity = '0';
        iconElement.style.opacity = '0';
        
        setTimeout(() => {
            if (isShowingDate) {
                labelElement.textContent = 'اليوم';
                labelElement.className = 'text-xs text-black font-bold alternating-label fade-in';
                
                displayElement.textContent = getCurrentDate();
                displayElement.className = 'alternating-text fade-in';
                
                iconElement.className = 'ri-calendar-line alternating-icon fade-in';
            } else {
                labelElement.textContent = 'المكتب';
                labelElement.className = 'text-xs text-black font-bold alternating-label fade-in';
                
                displayElement.textContent = officeName;
                displayElement.className = 'alternating-text fade-in';
                
                iconElement.className = 'ri-briefcase-line alternating-icon fade-in';
            }
            
            setTimeout(() => {
                labelElement.style.opacity = '1';
                displayElement.style.opacity = '1';
                iconElement.style.opacity = '1';
            }, 50);
            
            isShowingDate = !isShowingDate;
        }, 250);
    }
    
    updateDisplay();
    setInterval(updateDisplay, 4000);
}

async function enforceAppPassword() {
    try {
        if (typeof initDB === 'function') {
            try { await initDB(); } catch (e) {}
        }
        const stored = await getSetting('appPasswordHash');
        if (!stored) return;
        if (sessionStorage.getItem('auth_ok') === '1') return;
        const overlay = document.createElement('div');
        overlay.id = 'password-overlay';
        overlay.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-black';
        overlay.innerHTML = `
            <div class="bg-white rounded-lg w-[95vw] max-w-xl p-8 border border-gray-200">
                <div class="flex items-center justify-center gap-2 mb-4">
                    <i class="ri-lock-2-line text-pink-600 text-lg"></i>
                    <span class="text-gray-800 font-semibold text-lg">أدخل كلمة المرور</span>
                </div>
                <form id="app-login-form" class="space-y-4">
                    <input id="app-login-password" type="password" class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-center text-lg" placeholder="كلمة المرور" autocomplete="current-password">
                    <div id="app-login-error" class="text-red-600 text-sm text-center -mt-2 min-h-[1rem]"></div>
                    <button id="app-login-btn" class="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-lg">دخول</button>
                </form>
            </div>
        `;
        document.body.appendChild(overlay);
        try { document.body.style.overflow = 'hidden'; } catch(e) {}
        const input = overlay.querySelector('#app-login-password');
        const form = overlay.querySelector('#app-login-form');
        const errorEl = overlay.querySelector('#app-login-error');
        const showError = (msg) => {
            if (errorEl) errorEl.textContent = msg;
            if (input) input.classList.add('border-red-500','ring-2','ring-red-500');
        };
        const clearError = () => {
            if (errorEl) errorEl.textContent = '';
            if (input) input.classList.remove('border-red-500','ring-2','ring-red-500');
        };
        const doCheck = async () => {
            const val = (input && input.value ? input.value.trim() : '');
            if (!val) { showError('يرجى إدخال كلمة المرور'); if (input) input.focus(); return; }
            const enc = new TextEncoder().encode(val);
            const buf = await crypto.subtle.digest('SHA-256', enc);
            const hex = Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
            if (hex === stored) {
                sessionStorage.setItem('auth_ok','1');
                overlay.remove();
                try { document.body.style.overflow = ''; } catch(e) {}
            } else {
                showError('كلمة المرور غير صحيحة');
                if (input) { input.focus(); input.select(); }
            }
        };
        form.addEventListener('submit', (e)=>{ e.preventDefault(); doCheck(); });
        if (input) input.addEventListener('input', clearError);
        setTimeout(()=>{ if (input) input.focus(); }, 50);
    } catch (e) {}
}
// Copy-on-click for header title (no extra buttons)
window.addEventListener('DOMContentLoaded', async () => {
    await enforceAppPassword();
    const copyableTitle = document.getElementById('copyable-title');
    const pageTitleSpan = document.getElementById('page-title');
    if (copyableTitle && pageTitleSpan) {
        copyableTitle.addEventListener('click', async () => {
            const text = pageTitleSpan.textContent.trim();
            try {
                await navigator.clipboard.writeText(text);
                if (typeof showToast === 'function') showToast('تم النسخ', 'success');
            } catch (e) {
                const ta = document.createElement('textarea');
                ta.value = text;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
            }
        });
    }
});
