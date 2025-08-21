async function displaySessionList() {
    const embedded = document.getElementById('embedded-content');
    const container = embedded || document.getElementById('modal-content');
    const isEmbedded = !!embedded;

    if (!container) return;

    // عنوان النافذة
    if (!isEmbedded) {
        document.getElementById('modal-title').textContent = 'قائمة الجلسات';
        container.classList.remove('search-modal-content');
    }
    const pageHeaderTitle = document.getElementById('page-title');
    if (pageHeaderTitle) pageHeaderTitle.textContent = 'قائمة الجلسات';
    if (typeof setHeaderAsBack === 'function') setHeaderAsBack();

    const sessions = await getFromIndex('sessions', 'caseId', stateManager.currentCaseId);
    let sessionListHtml = '<div class="space-y-2">';
    if (sessions.length > 0) {
        sessions.sort((a,b) => (a.sessionDate > b.sessionDate) ? 1 : -1)
        sessions.forEach(s => {
            sessionListHtml += `
                <div class="p-3 bg-gray-100 rounded-lg flex justify-between items-center">
                    <div>
                        <p class="font-bold">تاريخ: ${s.sessionDate || 'غير محدد'}</p>
                        <p class="text-sm text-gray-600">${s.decision || 'لا يوجد قرار'}</p>
                    </div>
                    <div class="flex gap-2">
                        <button data-session-id="${s.id}" class="edit-session-btn text-blue-500 hover:text-blue-700"><i class="ri-pencil-line"></i></button>
                        <button data-session-id="${s.id}" class="delete-session-btn text-red-500 hover:text-red-700"><i class="ri-delete-bin-line"></i></button>
                    </div>
                </div>
            `;
        });
    } else {
        sessionListHtml += '<p class="text-center text-gray-500 p-4">لا توجد جلسات مضافة لهذه القضية.</p>';
    }
    sessionListHtml += '</div>';

    container.innerHTML = `
        <div id="session-list-container">${sessionListHtml}</div>
        <div class="flex justify-center mt-6">
             <button id="add-new-session-btn" class="w-full md:w-auto px-12 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
                <i class="ri-add-line"></i><span>إضافة جلسة جديدة</span>
             </button>
        </div>
    `;
    
    attachSessionListEventListeners();
    

    if (sessions.length === 1) {
        setTimeout(async () => {
            const sessionId = sessions[0].id;
            const sessionData = await getById('sessions', sessionId);
            navigateTo(displaySessionForm, sessionId, sessionData);
        }, 100);
    }
}

async function handleDeleteSession(sessionId) {
    if (confirm('هل أنت متأكد من حذف هذه الجلسة؟')) {
        try {
            await deleteRecord('sessions', sessionId);
            showToast('تم حذف الجلسة بنجاح.');
            await updateCountersInHeader();
            

            document.dispatchEvent(new CustomEvent('sessionSaved'));
            
            replaceCurrentView(displaySessionList);
        } catch (error) {
            showToast('حدث خطأ أثناء الحذف.');

        }
    }
}

function attachSessionListEventListeners() {
    document.getElementById('add-new-session-btn')?.addEventListener('click', () => navigateTo(displaySessionForm, null, null));

    document.querySelectorAll('.edit-session-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const sessionId = parseInt(e.currentTarget.dataset.sessionId, 10);
            const sessionData = await getById('sessions', sessionId);
            navigateTo(displaySessionForm, sessionId, sessionData);
        });
    });

    document.querySelectorAll('.delete-session-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const sessionId = parseInt(e.currentTarget.dataset.sessionId, 10);
            handleDeleteSession(sessionId);
        });
    });
}

function displaySessionForm(sessionId = null, sessionData = null) {
    const currentSessionData = sessionData || {};
    
    const embedded = document.getElementById('embedded-content');
    const container = embedded || document.getElementById('modal-content');
    const isEmbedded = !!embedded;

    if (!container) return;

    if (!isEmbedded) {
        const modalTitle = document.getElementById('modal-title');
        if (modalTitle) modalTitle.textContent = '';
        container.classList.remove('search-modal-content');
    }
    const pageHeaderTitle2 = document.getElementById('page-title');
    if (pageHeaderTitle2) pageHeaderTitle2.textContent = 'تعديل الجلسة';
    if (typeof setHeaderAsBack === 'function') setHeaderAsBack();

    container.innerHTML = `
        <div class="bg-white rounded-2xl p-6 shadow-2xl">
            <form id="session-form" class="space-y-6" novalidate>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 p-6 bg-blue-50 backdrop-blur-sm rounded-xl shadow-md">
                    <div class="flex items-stretch">
                        <label for="session-date" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg"><i class="ri-calendar-line text-blue-600 ml-2"></i>تاريخ الجلسة</label>
                        <input type="date" id="session-date" name="sessionDate" value="${currentSessionData.sessionDate || ''}" required class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-600 text-right font-semibold text-gray-800 -mr-px">
                    </div>
                    <div class="flex items-stretch">
                        <label for="session-roll" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg"><i class="ri-list-check text-green-600 ml-2"></i>الرول</label>
                        <input type="text" id="session-roll" name="roll" value="${currentSessionData.roll || ''}" class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-600 text-right font-semibold text-gray-800 -mr-px">
                    </div>
                    <div class="flex items-stretch">
                        <label for="inventory-number" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg"><i class="ri-hashtag text-purple-600 ml-2"></i>رقم الحصر</label>
                        <input type="text" id="inventory-number" name="inventoryNumber" value="${currentSessionData.inventoryNumber || ''}" class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-600 text-right font-semibold text-gray-800 -mr-px">
                    </div>
                    <div class="flex items-stretch">
                        <label for="inventory-year" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg"><i class="ri-calendar-2-line text-orange-600 ml-2"></i>سنة الحصر</label>
                        <input type="text" id="inventory-year" name="inventoryYear" value="${currentSessionData.inventoryYear || ''}" class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-600 text-right font-semibold text-gray-800 -mr-px">
                    </div>
                </div>
                
                <!-- حقل القرار -->
                <div class="p-6 bg-blue-50 backdrop-blur-sm rounded-xl shadow-md">
                    <div class="flex items-stretch">
                        <label for="session-decision" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg"><i class="ri-file-text-line text-indigo-600 ml-2"></i>القرار</label>
                        <textarea id="session-decision" name="decision" rows="4" placeholder="اكتب قرار الجلسة..." class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-600 text-right transition-colors resize-none font-semibold text-gray-800 -mr-px">${currentSessionData.decision || ''}</textarea>
                    </div>
                </div>
                
                <div class="flex justify-center pt-4">
                    <button type="submit" class="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg font-bold flex items-center justify-center gap-3">
                        <i class="ri-save-3-line text-xl"></i><span>حفظ الجلسة</span>
                    </button>
                </div>
            </form>
        </div>
    `;
    document.getElementById('session-form').addEventListener('submit', (e) => handleSaveSession(e, sessionId));

    // عند العرض المدمج: لا نستخدم المودال، ونحافظ على سلوك العودة الافتراضي
    if (isEmbedded) {
        const modal = document.getElementById('modal');
        if (modal && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    }
}

async function handleSaveSession(e, sessionId) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newSessionData = Object.fromEntries(formData.entries());

    const sessionDate = newSessionData.sessionDate?.trim() || '';
    const roll = newSessionData.roll?.trim() || '';
    const inventoryNumber = newSessionData.inventoryNumber?.trim() || '';
    const inventoryYear = newSessionData.inventoryYear?.trim() || '';
    const decision = newSessionData.decision?.trim() || '';
    
    const hasAnyData = sessionDate !== '' || roll !== '' || inventoryNumber !== '' || inventoryYear !== '' || decision !== '';
    
    if (!hasAnyData) {
        showToast('يجب إدخال بيانات في أي حقل على الأقل قبل الحفظ', 'error');
        return;
    }

    try {
        if (sessionId) {
            const existingSession = await getById('sessions', sessionId);
            const updatedSession = { ...existingSession, ...newSessionData };
            await updateRecord('sessions', sessionId, updatedSession);
            showToast('تم تعديل الجلسة بنجاح.');
        } else {
            if (!stateManager.currentCaseId) {
                showToast("خطأ: لا يمكن إضافة جلسة بدون قضية.");
                return;
            }
            newSessionData.caseId = stateManager.currentCaseId;
            await addSession(newSessionData);
            showToast('تم حفظ الجلسة بنجاح.');
        }
        await updateCountersInHeader();
        
        // إرسال إشعار لتحديث التقويم
        document.dispatchEvent(new CustomEvent('sessionSaved'));
        
        // في الصفحة المستقلة لتعديل الجلسة لا نغادر بعد الحفظ
        if (window.STAY_ON_SAVE || window.location.pathname.includes('session-edit.html')) {
            return;
        }

        const modalTitle = document.getElementById('modal-title')?.textContent || '';
        

        if (window.location.pathname.includes('new.html') && stateManager.currentCaseId) {

            if (typeof displayCaseDetailsForm === 'function') {
                displayCaseDetailsForm();
            } else {
                navigateBack();
            }
        } else if (modalTitle.includes('بيانات الأطراف') && stateManager.currentCaseId) {
            navigateBack();

            setTimeout(async () => {
                if (window.loadCaseSessions && window.attachAddSessionButtonListener) {
                    await window.loadCaseSessions(stateManager.currentCaseId.toString());
                    window.attachAddSessionButtonListener();
                }
            }, 100);
        } else {
            navigateBack();
        }
    } catch (error) {
        showToast('حدث خطأ أثناء حفظ الجلسة.');

    }
}
