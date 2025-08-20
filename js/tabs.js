// نظام التبويبات
class TabsManager {
    constructor() {
        this.tabs = new Map();
        this.activeTab = 'main';
        this.tabCounter = 0;
        this.init();
    }

    init() {
        // إضافة التبويبة الرئيسية
        this.tabs.set('main', {
            id: 'main',
            title: '🏠 التطبيق الرئيسي',
            icon: 'ri-home-line',
            type: 'app',
            closable: false
        });

        this.bindEvents();
    }

    bindEvents() {
        // النقر على التبويبات
        document.addEventListener('click', (e) => {
            if (e.target.closest('.tab-item')) {
                const tabId = e.target.closest('.tab-item').dataset.tab;
                this.switchToTab(tabId);
            }

            if (e.target.closest('.tab-close')) {
                e.stopPropagation();
                const tabId = e.target.closest('.tab-item').dataset.tab;
                this.closeTab(tabId);
            }
        });
    }

    createTab(url, title) {
        this.tabCounter++;
        const tabId = `website-${this.tabCounter}`;
        
        // استخراج اسم الموقع من الرابط
        let siteName = title;
        try {
            const urlObj = new URL(url);
            siteName = urlObj.hostname.replace('www.', '');
        } catch (e) {
            // استخدام العنوان المرسل
        }

        const tab = {
            id: tabId,
            title: siteName,
            url: url,
            icon: 'ri-global-line',
            type: 'website',
            closable: true
        };

        this.tabs.set(tabId, tab);
        this.renderTabs();
        this.switchToTab(tabId);
        
        return tabId;
    }

    closeTab(tabId) {
        if (tabId === 'main' || !this.tabs.has(tabId)) return;

        this.tabs.delete(tabId);
        
        // إذا كانت التبويبة المغلقة هي النشطة، انتقل للرئيسية
        if (this.activeTab === tabId) {
            this.switchToTab('main');
        }

        this.renderTabs();
        
        // إخفاء شريط التبويبات إذا لم تعد هناك مواقع
        if (this.tabs.size === 1) {
            document.getElementById('tabs-bar').style.display = 'none';
        }
    }

    switchToTab(tabId) {
        if (!this.tabs.has(tabId)) return;

        this.activeTab = tabId;
        const tab = this.tabs.get(tabId);

        if (tab.type === 'app') {
            // عرض التطبيق الرئيسي
            document.getElementById('main-app').style.display = 'block';
            document.getElementById('website-container').style.display = 'none';
        } else {
            // عرض الموقع
            document.getElementById('main-app').style.display = 'none';
            document.getElementById('website-container').style.display = 'block';
            
            const webview = document.getElementById('website-webview');
            // تحديث الرابط دائماً للتأكد من عرض الموقع الصحيح
            webview.src = tab.url;
        }

        this.renderTabs();
    }

    renderTabs() {
        const tabsBar = document.getElementById('tabs-bar');
        const tabsHtml = Array.from(this.tabs.values()).map(tab => {
            const isActive = tab.id === this.activeTab;
            const closeButton = tab.closable ? 
                `<button class="tab-close ml-1 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    <i class="ri-close-line"></i>
                </button>` : '';

            return `
                <div class="tab-item ${isActive ? 'active' : ''} flex items-center gap-2 px-4 py-2 rounded-lg text-sm cursor-pointer transition-all duration-200" data-tab="${tab.id}">
                    <i class="${tab.icon} text-sm"></i>
                    <span class="max-w-32 truncate font-bold">${tab.title}</span>
                    ${closeButton}
                </div>
            `;
        }).join('');

        tabsBar.innerHTML = tabsHtml;

        // إظهار شريط التبويبات دائماً إذا كان هناك أكثر من تبويبة
        if (this.tabs.size > 1) {
            tabsBar.style.display = 'flex';
        } else {
            tabsBar.style.display = 'none';
        }
    }

    openWebsite(url, title) {
        // التحقق من وجود تبويبة بنفس الرابط
        for (const [id, tab] of this.tabs) {
            if (tab.url === url) {
                this.switchToTab(id);
                return id;
            }
        }

        // إنشاء تبويبة جديدة
        return this.createTab(url, title);
    }
}

// إنشاء مدير التبويبات
window.tabsManager = new TabsManager();

// استقبال رسائل فتح المواقع
if (window.electronAPI && window.electronAPI.onOpenWebsiteTab) {
    window.electronAPI.onOpenWebsiteTab((event, data) => {
        const siteNames = {
            '1': '📚 مكتبة الكتب',
            '2': '📖 فولا بوك',
            '3': '🤖 DeepAI',
            '4': '⚖️ وزارة العدل',
            '5': '🏛️ مصر الرقمية',
            '6': '🏛️ النيابة العامة'
        };
        
        const siteName = siteNames[data.siteNumber] || `🌐 موقع ${data.siteNumber}`;
        window.tabsManager.openWebsite(data.url, siteName);
    });
}