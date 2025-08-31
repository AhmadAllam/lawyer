function displaySettingsModal() {
    document.getElementById('modal-title').textContent = 'الإعدادات';
    const modalContent = document.getElementById('modal-content');
    modalContent.classList.remove('search-modal-content');
    modalContent.innerHTML = `
        <div class="max-w-full mx-auto p-3">
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                
                <!-- النسخ الاحتياطي والاستعادة -->
                <div class="bg-white border-2 border-gray-300 rounded-xl p-3 shadow-md transition-all h-fit">
                    <div class="text-center mb-4">
                        <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                            <i class="ri-hard-drive-2-line text-white text-lg"></i>
                        </div>
                        <h3 class="text-base font-bold text-blue-700 mb-1">النسخ الاحتياطي</h3>
                        <p class="text-sm text-gray-600">حماية البيانات</p>
                    </div>
                    <p class="text-gray-600 text-sm mb-4 text-center">نسخ احتياطي أو استعادة</p>
                    <div class="space-y-3">
                        <button id="backup-data-btn" class="w-full px-4 py-3 bg-blue-900 text-white rounded-lg hover:bg-black transition-colors text-sm font-bold flex items-center justify-center gap-2 shadow-md">
                            <i class="ri-download-2-line text-lg"></i>
                            إنشاء نسخة احتياطية
                        </button>
                        <div class="relative">
                            <input type="file" id="restore-file-input" accept=".json" class="hidden">
                            <button id="restore-data-btn" class="w-full px-4 py-3 bg-blue-900 text-white rounded-lg hover:bg-black transition-colors text-sm font-bold flex items-center justify-center gap-2 shadow-md">
                                <i class="ri-upload-2-line text-lg"></i>
                                استعادة من نسخة احتياطية
                            </button>
                        </div>
                        <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <span class="text-sm font-semibold text-gray-700">النسخ الاحتياطي تلقائياً عند الخروج</span>
                            <label class="flex items-center gap-3 cursor-pointer select-none">
                                <input id="toggle-auto-backup" type="checkbox" style="position:absolute;width:1px;height:1px;opacity:0;">
                                <div id="auto-backup-track" class="relative" style="width:56px;height:28px;border-radius:9999px;background:#e5e7eb;border:1px solid #cbd5e1;box-shadow:inset 0 1px 2px rgba(0,0,0,.08);transition:background .25s, box-shadow .25s, border-color .25s;cursor:pointer;">
                                    <div id="auto-backup-knob" style="position:absolute;top:2px;left:2px;width:24px;height:24px;background:#ffffff;border-radius:9999px;box-shadow:0 1px 2px rgba(0,0,0,.2);transition:transform .25s, box-shadow .25s;"></div>
                                </div>
                                <span id="auto-backup-off" class="text-xs font-bold" style="color:#4b5563;">موقوف</span>
                                <span id="auto-backup-on" class="text-xs font-bold" style="color:#1d4ed8;display:none;">مُفعّل</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- البيانات التجريبية -->
                <div class="bg-white border-2 border-gray-300 rounded-xl p-3 shadow-md transition-all h-fit">
                    <div class="text-center mb-4">
                        <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                            <i class="ri-database-2-line text-white text-lg"></i>
                        </div>
                        <h3 class="text-base font-bold text-blue-700 mb-1">البيانات التجريبية</h3>
                        <p class="text-sm text-gray-600">للاختبار والتجربة</p>
                    </div>
                    <p class="text-gray-600 text-sm mb-4 text-center">بيانات تجريبية للاختبار</p>
                    <div class="space-y-3">
                        <button id="add-sample-data-btn" class="w-full px-4 py-3 bg-blue-900 text-white rounded-lg hover:bg-black transition-colors text-sm font-bold flex items-center justify-center gap-2 shadow-md">
                            <i class="ri-database-2-line text-lg"></i>
                            إضافة البيانات التجريبية
                        </button>
                        <button id="delete-all-data-btn" class="w-full px-4 py-3 bg-blue-900 text-white rounded-lg hover:bg-black transition-colors text-sm font-bold flex items-center justify-center gap-2 shadow-md">
                            <i class="ri-delete-bin-2-line text-lg"></i>
                            حذف جميع البيانات
                        </button>
                    </div>
                </div>

                <!-- إعدادات المكتب -->
                <div class="bg-white border-2 border-gray-300 rounded-xl p-3 shadow-md transition-all h-fit">
                    <div class="text-center mb-4">
                        <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                            <i class="ri-building-line text-white text-lg"></i>
                        </div>
                        <h3 class="text-base font-bold text-blue-700 mb-1">إعدادات المكتب</h3>
                        <p class="text-sm text-gray-600">تخصيص معلومات المكتب</p>
                    </div>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2 text-center">اسم المكتب</label>
                            <input type="text" id="office-name-input" 
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-sm bg-white transition-all" 
                                   placeholder="أدخل اسم المكتب">
                        </div>
                        <button id="save-office-settings-btn" class="w-full px-4 py-3 bg-blue-900 text-white rounded-lg hover:bg-black transition-colors text-sm font-bold flex items-center justify-center gap-2 shadow-md">
                            <i class="ri-save-line text-lg"></i>
                            حفظ الإعدادات
                        </button>
                    </div>
                </div>

                <!-- إعدادات الأمان -->
                <div class="bg-white border-2 border-gray-300 rounded-xl p-3 shadow-md transition-all h-fit">
                    <div class="text-center mb-4">
                        <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                            <i class="ri-shield-keyhole-line text-white text-lg"></i>
                        </div>
                        <h3 class="text-base font-bold text-blue-700 mb-1">إعدادات الأمان</h3>
                        <p class="text-sm text-gray-600">حماية التطبيق بكلمة مرور</p>
                    </div>
                    <div class="space-y-3">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2 text-center">كلمة المرور</label>
                            <input type="password" id="app-password-input" 
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-sm bg-white transition-all" 
                                   placeholder="أدخل كلمة المرور">
                        </div>
                        <button id="save-password-btn" class="w-full px-4 py-3 bg-blue-900 hover:bg-black text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                            <i class="ri-lock-line text-lg"></i>
                            حفظ كلمة المرور
                        </button>
                    </div>
                </div>

                                
            </div>
        </div>
    `;
    
    (function(){ 
        const grid = document.querySelector('#modal-content .grid');
        if (!grid) return;
        grid.insertAdjacentHTML('beforeend', `
                <div class="bg-white border-2 border-gray-300 rounded-xl p-3 shadow-md transition-all h-fit">
                    <div class="text-center mb-4">
                        <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                            <i class="ri-volume-up-line text-white text-lg"></i>
                        </div>
                        <h3 class="text-base font-bold text-blue-700 mb-1">التنبيهات الصوتيه</h3>
                        <p class="text-sm text-gray-600">تنبيهات جلسات الغد وأعمال الغد</p>
                    </div>
                    <div class="space-y-3">
                        <label class="block text-sm font-bold text-gray-700 mb-2 text-center">تكرار التنبيه</label>
                        <select id="tomorrow-audio-mode" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-sm bg-white transition-all">
                            <option value="off">معطل</option>
                            <option value="always">تشغيل باستمرار</option>
                            <option value="hourly">كل ساعة</option>
                            <option value="2h">كل ساعتين</option>
                            <option value="3h">كل 3 ساعات</option>
                        </select>
                        <button id="save-tomorrow-audio-settings-btn" class="w-full px-4 py-3 bg-blue-900 text-white rounded-lg hover:bg-black transition-colors text-sm font-bold flex items-center justify-center gap-2 shadow-md">
                            <i class="ri-save-line text-lg"></i>
                            حفظ الإعدادات
                        </button>
                    </div>
                </div>
        `);
        const select = document.getElementById('tomorrow-audio-mode');
        const btn = document.getElementById('save-tomorrow-audio-settings-btn');
        (async ()=>{ 
            try { 
                const v = await getSetting('tomorrowAudioMode'); 
                if (v === 'off' || v === 'always' || v === 'hourly' || v === '2h' || v === '3h') { 
                    select.value = v; 
                } else { 
                    select.value = 'hourly'; 
                } 
            } catch (e) { 
                select.value = 'hourly'; 
            } 
        })();
        if (btn) btn.addEventListener('click', async ()=>{ 
            try { 
                const val = select.value; 
                await setSetting('tomorrowAudioMode', val); 
                if (typeof showToast==='function') showToast('تم حفظ إعدادات التنبيه'); 
            } catch (e) {} 
        });
    })();
    
    loadOfficeSettings();
    
    document.getElementById('save-office-settings-btn').addEventListener('click', handleSaveOfficeSettings);
    document.getElementById('backup-data-btn').addEventListener('click', handleBackupData);
    document.getElementById('restore-data-btn').addEventListener('click', handleRestoreDataClick);
    document.getElementById('restore-file-input').addEventListener('change', handleRestoreData);
    document.getElementById('add-sample-data-btn').addEventListener('click', handleAddSampleData);
    document.getElementById('delete-all-data-btn').addEventListener('click', handleDeleteAllData);
    (function initAutoBackupToggle() {
        const autoToggle = document.getElementById('toggle-auto-backup');
        const track = document.getElementById('auto-backup-track');
        const knob = document.getElementById('auto-backup-knob');
        const onLabel = document.getElementById('auto-backup-on');
        const offLabel = document.getElementById('auto-backup-off');
        if (!autoToggle) return;
        const render = (checked) => {
            if (track) {
                track.style.background = checked ? 'linear-gradient(90deg, #2563eb, #1d4ed8)' : '#e5e7eb';
                track.style.borderColor = checked ? '#1d4ed8' : '#cbd5e1';
                track.style.boxShadow = checked ? 'inset 0 1px 2px rgba(0,0,0,.08), 0 0 0 2px rgba(37, 99, 235, .15)' : 'inset 0 1px 2px rgba(0,0,0,.08)';
            }
            if (knob) {
                knob.style.transform = checked ? 'translateX(28px)' : 'translateX(0)';
                knob.style.boxShadow = checked ? '0 1px 2px rgba(0,0,0,.2), 0 0 0 3px rgba(147,197,253,.45)' : '0 1px 2px rgba(0,0,0,.2)';
            }
            if (onLabel) onLabel.style.display = checked ? 'inline' : 'none';
            if (offLabel) offLabel.style.display = checked ? 'none' : 'inline';
        };
        (async () => {
            try {
                const v = await getSetting('autoBackupOnExit');
                autoToggle.checked = (v === true || v === '1' || v === 1);
            } catch (e) {}
            render(autoToggle.checked);
        })();
        autoToggle.addEventListener('change', async () => {
            try {
                await setSetting('autoBackupOnExit', autoToggle.checked);
                render(autoToggle.checked);
                if (typeof showToast==='function') showToast(autoToggle.checked ? 'تم تفعيل النسخ الاحتياطي التلقائي' : 'تم إيقاف النسخ الاحتياطي التلقائي');
            } catch (e) {}
        });
    })();
    const savePwdBtn = document.getElementById('save-password-btn');
    if (savePwdBtn) {
        savePwdBtn.addEventListener('click', async function () {
            try {
                const input = document.getElementById('app-password-input');
                const val = (input && input.value ? input.value.trim() : '');
                if (input && input.dataset.masked === '1') { if (typeof showToast==='function') showToast('تم الاحتفاظ بكلمة المرور الحالية', 'success'); return; }
                if (!val) { if (typeof showToast==='function') showToast('يرجى إدخال كلمة المرور', 'error'); return; }
                const enc = new TextEncoder().encode(val);
                const buf = await crypto.subtle.digest('SHA-256', enc);
                const hex = Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
                await setSetting('appPasswordHash', hex);
                await setSetting('appPasswordLen', val.length);
                sessionStorage.removeItem('auth_ok');
                if (typeof showToast==='function') showToast('تم حفظ كلمة المرور', 'success');
                if (input) { input.value = 'x'.repeat(val.length); input.dataset.masked='1'; }
            } catch (e) {}
        });
    }
    (async ()=>{
        const input = document.getElementById('app-password-input');
        if (!input) return;
        try {
            const len = await getSetting('appPasswordLen');
            const n = Number(len);
            if (n && n > 0) {
                input.value = 'x'.repeat(n);
                input.dataset.masked = '1';
            }
        } catch(e) {}
        input.addEventListener('input', ()=>{ if (input.dataset.masked==='1') { delete input.dataset.masked; } });
    })();
}

async function handleAddSampleData() {
    const confirmation = confirm('هل تريد إضافة البيانات التجريبية؟ سيتم إضافة موكلين وخصوم وقضايا وجلسات للاختبار.');
    if (confirmation) {
        try {
            await addSampleData();
            closeModal();
        } catch (error) {
            showToast('حدث خطأ في إضافة البيانات التجريبية', 'error');
        }
    }
}



async function handleDeleteAllData() {
    const confirmation = confirm('هل أنت متأكد من حذف جميع البيانات؟ سيتم حذف جميع الموكلين والقضايا والجلسات والحسابات نهائياً!');
    if (!confirmation) return;

    try {
                
        // محاولة الطريقة الأولى: حذف البيانا�� من كل جدول
        const success = await clearAllDataFromTables();
        
        if (success) {
            showToast('تم حذف جميع البيانات بنجاح ✅');
            if (typeof updateCountersInHeader === 'function') {
                await updateCountersInHeader();
            }
            
            // إعادة تحميل الصفحة بعد ثانية واحدة
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            return;
        }
        
        // إذا فشلت الطريقة الأولى، نجرب حذف قاعدة البيانات كاملة
        await deleteEntireDatabase();
        
    } catch (error) {
        console.error('Error in handleDeleteAllData:', error);
        showToast('فشل حذف البيانات: ' + error.message, 'error');
        
        // في حالة فشل كل شيء، إعادة تحميل الصفحة
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }
}

// دالة لحذف البيانات من كل جدول على حدة
async function clearAllDataFromTables() {
    try {
        const dbInstance = getDbInstance();
        if (!dbInstance) {
            throw new Error('قاعدة البيانات غير متاحة');
        }

        const storeNames = ['clients', 'opponents', 'cases', 'sessions', 'accounts', 'administrative', 'clerkPapers', 'expertSessions', 'settings'];
        
                
        for (const storeName of storeNames) {
            try {
                await clearStore(storeName);
                console.log(`تم حذف بيانات جدول ${storeName}`);
            } catch (error) {
                console.warn(`تعذر حذف جدول ${storeName}:`, error);
                // نتجاهل الأخطاء ونكمل مع الجداول الأخرى
            }
        }
        
        // إضافة الإعدادات الافتراضية مرة أخرى
        try {
            await setSetting('officeName', 'محامين مصر الرقمية');
        } catch (error) {
            console.warn('تعذر إضافة الإعدادات الافتراضية:', error);
        }
        
        return true;
    } catch (error) {
        console.error('فشل في حذف البيانات من الجداول:', error);
        return false;
    }
}

// دالة لحذف قاعدة البيانات بالكامل
async function deleteEntireDatabase() {
    return new Promise((resolve, reject) => {
        // إغلاق قاعدة البيانات بشكل قوي
        const dbInstance = getDbInstance();
        if (dbInstance) {
            dbInstance.close();
        }
        
        // انتظار قصير للتأكد من إغلاق الاتصالات
        setTimeout(() => {
            const deleteRequest = indexedDB.deleteDatabase('LawyerAppDB');
            
            // مهلة زمنية للحذف (5 ثواني)
            const timeout = setTimeout(() => {
                window.location.reload();
            }, 5000);

            deleteRequest.onsuccess = async () => {
                clearTimeout(timeout);
                try {
                    // انتظار قصير قبل إعادة التهيئة
                    await new Promise(resolve => setTimeout(resolve, 300));
                    
                    await initDB();
                    if (typeof updateCountersInHeader === 'function') {
                        await updateCountersInHeader();
                    }
                    
                    showToast('تم حذف جميع البيانات بنجاح ✅');
                    
                    // إعادة تحميل الصفحة بعد ثانية واحدة
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                    
                    resolve();
                } catch (error) {
                    console.error('Error reinitializing database:', error);
                    showToast('تم حذف جميع البيانات بنجاح ✅');
                    // إعادة تحميل الصفحة في كل الأحوال
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                    resolve();
                }
            };

            deleteRequest.onerror = (event) => {
                clearTimeout(timeout);
                console.error('Error deleting database:', event);
                showToast('فشل حذف البيانات', 'error');
                // إعادة تحميل الصفحة كحل أخير
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
                reject(event);
            };
            
            deleteRequest.onblocked = () => {
                clearTimeout(timeout);
                // إعادة تحميل الصفحة فوراً
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            };
        }, 200);
    });
}


async function loadOfficeSettings() {
    try {
        const officeName = await getSetting('officeName');
        const officeNameInput = document.getElementById('office-name-input');
        if (officeNameInput && officeName) {
            officeNameInput.value = officeName;
        }
    } catch (error) {
    }
}

async function handleSaveOfficeSettings() {
    try {
        const officeNameInput = document.getElementById('office-name-input');
        const officeName = officeNameInput.value.trim();
        
        if (!officeName) {
            showToast('يرجى إدخال اسم المكتب', 'error');
            return;
        }
        
        await setSetting('officeName', officeName);
        showToast('تم حفظ إعدادات المكتب بنجاح');
        

        startDateAlternation();
        
    } catch (error) {

        showToast('حدث خطأ في حفظ الإعدادات', 'error');
    }
}


async function handleBackupData() {
    try {
        showToast('جاري إنشاء النسخة الاحتياطية...', 'info');
        
        const backupData = await createBackup();
        const dataStr = JSON.stringify(backupData, null, 2);
        

        const now = new Date();
        const dateStr = now.toISOString().slice(0, 19).replace(/:/g, '-');
        const filename = `lawyers-backup-${dateStr}.json`;
        

        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showToast('تم إنشاء النسخة الاحتياطية بنجاح');
        
    } catch (error) {
        showToast('حدث خطأ في إنشاء النسخة الاحتياطية', 'error');
    }
}

function handleRestoreDataClick() {
    document.getElementById('restore-file-input').click();
}

async function handleRestoreData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.name.endsWith('.json')) {
        showToast('يرجى اختيار ملف JSON صحيح', 'error');
        return;
    }
    
    const confirmation = confirm('هل تريد استعادة البيانات من النسخة الاحتياطية؟ سيتم استبدال جميع البيانات الحالية.');
    if (!confirmation) return;
    
    try {
        showToast('جاري استعادة البيانات...', 'info');
        

        const fileContent = await readFileAsText(file);

        

        let backupData;
        try {
            backupData = JSON.parse(fileContent);
        } catch (parseError) {
            throw new Error('الملف ليس بصيغة JSON صحيحة');
        }
        

        if (!backupData || typeof backupData !== 'object') {
            throw new Error('بنية الملف غير صحيحة');
        }
        
        if (!backupData.data) {
            throw new Error('الملف لا يحتوي على بيانات صحيحة');
        }
        

        const expectedStores = ['clients', 'opponents', 'cases', 'sessions'];
        const hasValidData = expectedStores.some(store => 
            backupData.data[store] && Array.isArray(backupData.data[store])
        );
        
        if (!hasValidData) {
            throw new Error('الملف لا يحتوي على بيانات صحيحة للتطبيق');
        }
        

        

        

        await restoreBackup(backupData);
        

        await updateCountersInHeader();
        
        showToast('تم استعادة البيانات بنجاح ✅');
        closeModal();
        

        setTimeout(() => {
            window.location.reload();
        }, 1000);
        
    } catch (error) {
        let errorMessage = 'حدث خطأ في استعادة البيانات';
        if (error.message?.includes('JSON')) {
            errorMessage = 'الملف ليس بصيغة JSON صحيحة';
        } else if (error.message?.includes('بنية')) {
            errorMessage = 'بنية الملف غير صحيحة - تأكد من أنه ملف نسخة احتياطية صحيح';
        } else if (error.message?.includes('البيانات مفقودة')) {
            errorMessage = 'الملف لا يحتوي على بيانات';
        } else if (error.message?.includes('فشل في استعادة جدول')) {
            errorMessage = `خطأ في قاعدة البيانات: ${error.message}`;
        } else if (error.message) {
            errorMessage = error.message;
        }
        showToast(errorMessage, 'error');
    }
    

    event.target.value = '';
}

async function createBackup() {
    const backup = {
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        data: {}
    };
    

    const storeNames = ['clients', 'opponents', 'cases', 'sessions', 'accounts', 'administrative', 'clerkPapers', 'expertSessions', 'settings'];
    
    for (const storeName of storeNames) {
        try {
            const records = await getAllRecords(storeName);
            backup.data[storeName] = records;
        } catch (error) {
            /* تعذر نسخ جدول ${storeName} */
            backup.data[storeName] = [];
        }
    }
    
    return backup;
}

async function restoreBackup(backupData) {

    if (!backupData || typeof backupData !== 'object') {
        throw new Error('ملف النسخة الاحتياطية غير صحيح - البيانات مفقودة');
    }
    
    if (!backupData.data || typeof backupData.data !== 'object') {
        throw new Error('ملف النسخة الاحتياطية غير صحيح - بنية البيانات خاطئة');
    }
    
    /* بدء استعادة البيانات */
    
    try {

        await initDB();
        

        const expectedStores = ['clients', 'opponents', 'cases', 'sessions', 'accounts', 'administrative', 'clerkPapers', 'expertSessions', 'settings'];
        

        for (const storeName of expectedStores) {
            try {
                await clearStore(storeName);

            } catch (error) {
                /* تعذر حذف جدول ${storeName} */
            }
        }
        

        let restoredCount = 0;
        for (const [storeName, records] of Object.entries(backupData.data)) {
            if (Array.isArray(records) && records.length > 0) {
                try {
                    /* استعادة سجلات من جدول */
                    
                    for (const record of records) {
                        if (record && typeof record === 'object') {
                            // إنشاء نسخة من السجل
                            const recordCopy = { ...record };
                            
                            // نحافظ على المعرفات كما هي لضمان العلاقات بين الجداول
                            // في حال وجود id سيتم استخدام put (تحديث/إدراج) بنفس المفتاح
                            if (storeName === 'settings') {
                                // settings keyPath = key
                                await putRecord(storeName, recordCopy);
                            } else {
                                if (recordCopy.id) {
                                    await putRecord(storeName, recordCopy);
                                } else {
                                    await addRecord(storeName, recordCopy);
                                }
                            }
                            restoredCount++;
                        }
                    }
                    
                    /* تم استعادة جدول بنجاح */
                } catch (error) {
                    console.error(`خطأ في استعادة جدول ${storeName}:`, error);
                    throw new Error(`فشل في استعادة جدول ${storeName}: ${error.message}`);
                }
            } else {
                /* جدول فارغ أو غير صحيح */
            }
        }
        
        /* تم استعادة سجلات بنجاح */
        
    } catch (error) {
        throw error;
    }
}

// دالة مساعدة لحذف جميع البيانات من جدول معين
async function clearStore(storeName) {
    return new Promise((resolve, reject) => {
        const dbInstance = getDbInstance();
        if (!dbInstance) {
            reject(new Error('قاعدة البيانات غير متاحة'));
            return;
        }
        
        try {
            const transaction = dbInstance.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const clearRequest = store.clear();
            
            clearRequest.onsuccess = () => resolve();
            clearRequest.onerror = () => reject(clearRequest.error);
            
            transaction.onerror = () => reject(transaction.error);
        } catch (error) {
            // إذا كان الجدول غير موجود، نتجاهل الخطأ
            console.warn(`Table ${storeName} not found, skipping...`);
            resolve();
        }
    });
}

function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
}

function getAllRecords(storeName) {
    return new Promise((resolve, reject) => {
        const dbInstance = getDbInstance();
        if (!dbInstance) return reject("DB not initialized");
        
        try {
            const transaction = dbInstance.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        } catch (error) {
            // إذا كان الجدول غير موجود، نرجع مصفوفة فارغة
            console.warn(`Table ${storeName} not found, returning empty array`);
            resolve([]);
        }
    });
}
