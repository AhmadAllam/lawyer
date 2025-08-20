// ملف إدارة جلسات الخبراء
// نافذة جلسات الخبراء مع البحث والإحصائيات وعرض البيانات بطريقة الكروت

// متغيرات عامة
let openExpertClientIds = new Set(); // لحفظ الموكلين المفتوحين

// عرض نافذة جلسات الخبراء
function displayExpertSessionsModal() {
    document.getElementById('modal-title').textContent = 'جلسات الخبراء';
    const modalContent = document.getElementById('modal-content');
    const modalContainer = document.getElementById('modal-container');
    
    // توسيع النافذة
    modalContainer.classList.remove('max-w-5xl');
    modalContainer.classList.add('w-full');
    
    modalContent.classList.remove('search-modal-content');
    
    // إعادة تعيين زر الرئيسية للحالة الأصلية
    setTimeout(() => {
        const backBtn = document.getElementById('back-to-main');
        const pageTitle = document.getElementById('page-title');
        if (backBtn && pageTitle) {
            backBtn.innerHTML = `
                <i class="ri-home-5-line text-white text-lg"></i>
                <span class="text-white">الرئيسيه</span>
            `;
            pageTitle.textContent = 'جلسات الخبراء';
            
            // إزالة جميع event listeners السابقة وإضافة الأصلي
            const newBackBtn = backBtn.cloneNode(true);
            backBtn.parentNode.replaceChild(newBackBtn, backBtn);
            
            newBackBtn.addEventListener('click', function () {
                window.location.href = 'index.html';
            });
        }
    }, 100);
    
    modalContent.innerHTML = `
        <div class="flex gap-6 h-[75vh]">
            <!-- الجانب الأيمن: شريط البحث والإحصائيات -->
            <div class="w-1/4 space-y-6" data-left-pane="expert">
                <!-- شريط البحث -->
                <div class="bg-purple-50 p-6 rounded-xl border border-purple-200 shadow-sm">
                    <div class="space-y-2">
                        <div class="relative">
                            <input type="text" id="expert-sessions-search" 
                                   placeholder="ابحث بالموكل أو اسم الخبير..." 
                                   class="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-right shadow-sm pr-10">
                            <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <i class="ri-search-2-line text-gray-400 text-base"></i>
                            </div>
                        </div>
                        
                        <button id="clear-expert-sessions-search" class="w-full px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all shadow-sm">
                            <i class="ri-close-line text-lg ml-2"></i>مسح البحث
                        </button>
                        <button id="add-new-expert-session" class="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-sm text-sm font-bold flex items-center justify-center gap-2">
                            <i class="ri-add-line text-lg ml-2"></i>إضافة جلسة جديدة
                        </button>
                    </div>
                </div>

                <!-- إحصائيات سريعة -->
                <div class="bg-white rounded-lg p-3 shadow-md border border-gray-200 mb-2">
                    <h3 class="text-xs font-bold text-gray-800 mb-2 flex items-center gap-1">
                        <i class="ri-bar-chart-line text-purple-500 text-sm"></i>
                        الإحصائيات
                    </h3>
                    <div class="space-y-2">
                        <!-- Total Sessions - Full Width -->
                        <div class="bg-purple-200 rounded-lg p-2 border border-purple-300 text-center shadow-sm hover:shadow-md transition-all duration-300">
                            <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-1">
                                <i class="ri-team-line text-white text-xs"></i>
                            </div>
                            <div class="text-lg font-bold text-purple-700" id="total-sessions">0</div>
                            <div class="text-xs font-semibold text-purple-800">إجمالي الجلسات</div>
                        </div>

                        <!-- Completed vs Scheduled Sessions - Small Stats -->
                        <div class="grid grid-cols-2 gap-1.5">
                            <!-- Completed Sessions -->
                            <div class="bg-green-100 rounded-lg p-2 border border-green-300 text-center shadow-sm">
                                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-1">
                                    <i class="ri-check-line text-white text-xs"></i>
                                </div>
                                <div class="text-sm font-bold text-green-700" id="completed-sessions">0</div>
                                <div class="text-xs font-medium text-green-800">تمت</div>
                            </div>

                            <!-- Scheduled Sessions -->
                            <div class="bg-orange-100 rounded-lg p-2 border border-orange-300 text-center shadow-sm">
                                <div class="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-1">
                                    <i class="ri-calendar-todo-line text-white text-xs"></i>
                                </div>
                                <div class="text-sm font-bold text-orange-700" id="scheduled-sessions">0</div>
                                <div class="text-xs font-medium text-orange-800">مجدولة</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                            </div>

            <!-- الجانب الأيسر: قائمة جلسات الخبراء -->
            <div class="flex-1 min-h-0">
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm h-full min-h-0 overflow-hidden flex flex-col">
                    <div id="expert-sessions-list" class="space-y-4 overscroll-contain p-6">
                        <div class="text-center text-gray-500 py-12 sticky top-0 bg-white">
                            <i class="ri-loader-4-line animate-spin text-3xl mb-3"></i>
                            <p class="text-lg">جاري تحميل جلسات الخبراء...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    attachExpertSessionsListeners();
    loadAllExpertSessions();
    updateExpertSessionsStats();
    
    // إعداد التمرير لجلسات الخبراء
    try {
        requestAnimationFrame(() => {
            setupExpertSessionsScrollBox();
            setupExpertSessionsHoverScrollBehavior();
        });
        window.addEventListener('resize', setupExpertSessionsScrollBox);
    } catch (e) { 
        console.error(e); 
    }
}

// ربط المستمعات للأحداث
function attachExpertSessionsListeners() {
    // البحث
    const searchInput = document.getElementById('expert-sessions-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.trim();
            filterExpertSessions(searchTerm);
        });
    }

    // مسح البحث
    const clearSearchBtn = document.getElementById('clear-expert-sessions-search');
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            document.getElementById('expert-sessions-search').value = '';
            loadAllExpertSessions();
        });
    }

    // إضافة جلسة جديدة
    const addNewBtn = document.getElementById('add-new-expert-session');
    if (addNewBtn) {
        addNewBtn.addEventListener('click', () => {
            displayExpertSessionForm();
        });
    }
}

// تحميل جميع جلسات الخبراء
async function loadAllExpertSessions() {
    try {
        const expertSessions = await getAllExpertSessions();
        const clients = await getAllClients();
        const cases = await getAllCases();
        
        displayExpertSessionsList(expertSessions, clients, cases);
        updateExpertSessionsStats();
    } catch (error) {
        const listContainer = document.getElementById('expert-sessions-list');
        if (listContainer) {
            listContainer.innerHTML = `
                <div class="text-center text-red-500 py-12">
                    <i class="ri-error-warning-line text-3xl mb-3"></i>
                    <p class="text-lg">حدث خطأ في تحميل جلسات الخبراء</p>
                </div>
            `;
        }
    }
}

// عرض قائمة جلسات الخبراء مجمعة بالموكل
function displayExpertSessionsList(expertSessions, clients, cases) {
    const listContainer = document.getElementById('expert-sessions-list');
    if (!listContainer) return;

    if (!expertSessions || expertSessions.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center text-gray-500 py-12">
                <i class="ri-team-line text-4xl mb-3"></i>
                <p class="text-lg">لا توجد جلسات خبراء مضافة</p>
                <p class="text-sm text-gray-400 mt-2">اضغط على "إضافة جلسة جديدة" لبدء الإضافة</p>
            </div>
        `;
        return;
    }

    // تجميع الجلسات بالموكل
    const sessionsByClient = {};
    
    expertSessions.forEach(session => {
        const clientId = session.clientId;
        
        if (clientId) {
            if (!sessionsByClient[clientId]) {
                sessionsByClient[clientId] = [];
            }
            sessionsByClient[clientId].push({...session, clientData: clients.find(c => c.id === clientId)});
        }
    });

    let html = '';
    
    Object.keys(sessionsByClient).forEach(clientId => {
        const clientData = clients.find(c => c.id === parseInt(clientId));
        const clientSessions = sessionsByClient[clientId];
        
        if (clientData) {
            html += `
                <div class="client-group bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-green-300 transition-all duration-300 mb-3" data-client-id="${clientId}">
                    <div class="client-header cursor-pointer p-4 hover:bg-gray-50 transition-colors duration-200" onclick="toggleClientSessions(${clientId})">
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-md">
                                    <i class="ri-user-line text-white text-lg"></i>
                                </div>
                                <div>
                                    <div class="flex items-center gap-2">
                                        <h3 class="font-bold text-gray-800 text-lg">${clientData.name}</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="inline-block bg-purple-100 text-purple-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-purple-200">${clientSessions.length} ${clientSessions.length === 1 ? 'جلسة' : 'جلسات'}</span>
                                <i class="ri-arrow-down-s-line text-gray-400 hover:text-gray-600 text-xl transform transition-transform duration-300 ${openExpertClientIds.has(clientId.toString()) ? 'rotate-180' : ''}" id="arrow-${clientId}"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="client-sessions border-t border-gray-200 ${openExpertClientIds.has(clientId.toString()) ? '' : 'hidden'}" id="sessions-${clientId}">
                        <div class="p-4 space-y-3 bg-gray-50 rounded-b-lg">
                            ${clientSessions.map(session => createExpertSessionCard(session, clientData)).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
    });

    listContainer.innerHTML = html;
}

// إنشاء كارت جلسة خبير
function createExpertSessionCard(session, clientData) {
    return `
        <div class="session-card bg-white border border-gray-200 rounded-md p-3 hover:shadow-sm hover:border-blue-300 cursor-pointer">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                        <i class="ri-team-line text-sm"></i>
                    </div>
                    <div class="space-y-1">
                        <div class="grid grid-cols-2 gap-2 items-stretch">
                            <div class="bg-blue-100 border border-blue-200 rounded px-2 h-8 w-full flex items-center justify-center gap-1 text-center">
                                <span class="text-[11px] text-blue-600">نوع الجلسة</span>
                                <span class="text-xs font-semibold text-blue-800 truncate">${session.sessionType || 'غير محدد'}</span>
                            </div>
                            <div class="bg-blue-100 border border-blue-200 rounded px-2 h-8 w-full flex items-center justify-center gap-1 text-center">
                                <span class="text-[11px] text-blue-600">الحالة</span>
                                <span class="text-xs font-semibold text-blue-800 truncate">${session.status || 'غير محدد'}</span>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-2 items-stretch">
                            <div class="bg-blue-100 border border-blue-200 rounded px-2 h-8 w-full flex items-center justify-center gap-1 text-center">
                                <span class="text-[11px] text-blue-600">التاريخ</span>
                                <span class="text-xs font-semibold text-blue-800 truncate">${session.sessionDate || 'غير محدد'}</span>
                            </div>
                            <div class="bg-blue-100 border border-blue-200 rounded px-2 h-8 w-full flex items-center justify-center gap-1 text-center">
                                <span class="text-[11px] text-blue-600">الوقت</span>
                                <span class="text-xs font-semibold text-blue-800 truncate">${session.sessionTime || 'غير محدد'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-1">
                    <button onclick="editExpertSession(${session.id})" class="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                        <i class="ri-pencil-line text-xs"></i>
                    </button>
                    <button onclick="deleteExpertSession(${session.id})" class="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200">
                        <i class="ri-delete-bin-line text-xs"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// توسيع/طي جلسات الموكل
function toggleClientSessions(clientId) {
    const sessionsContainer = document.getElementById(`sessions-${clientId}`);
    const arrow = document.getElementById(`arrow-${clientId}`);
    if (sessionsContainer && arrow) {
        const isOpen = openExpertClientIds.has(clientId.toString());
        if (isOpen) {
            sessionsContainer.classList.add('hidden');
            arrow.style.transform = 'rotate(0deg)';
            openExpertClientIds.delete(clientId.toString());
        } else {
            sessionsContainer.classList.remove('hidden');
            arrow.style.transform = 'rotate(180deg)';
            openExpertClientIds.add(clientId.toString());
        }
    }
}

// إعادة تحميل البيانات مع الحفاظ على الحالة
async function reloadExpertSessionsWithState() {
    const searchTerm = document.getElementById('expert-sessions-search')?.value || '';
    if (searchTerm) {
        await filterExpertSessions(searchTerm);
    } else {
        await loadAllExpertSessions();
    }
}

// العودة لنافذة جلسات الخبراء مع الحفاظ على الحالة
async function returnToExpertSessionsModal() {
    displayExpertSessionsModal();
    await reloadExpertSessionsWithState();
    updateExpertSessionsStats();
}

// تحديث إحصائيات جلسات الخبراء
async function updateExpertSessionsStats() {
    try {
        const expertSessions = await getAllExpertSessions();
        
        const completedSessions = expertSessions.filter(session => session.status === 'تمت').length;
        const scheduledSessions = expertSessions.filter(session => session.status === 'مجدولة').length;
        const totalSessions = expertSessions.length;
        
        const completedElement = document.getElementById('completed-sessions');
        const scheduledElement = document.getElementById('scheduled-sessions');
        const totalElement = document.getElementById('total-sessions');
        
        if (completedElement) completedElement.textContent = completedSessions;
        if (scheduledElement) scheduledElement.textContent = scheduledSessions;
        if (totalElement) totalElement.textContent = totalSessions;
        
    } catch (error) {
    }
}

// فلترة جلسات الخبراء
async function filterExpertSessions(searchTerm) {
    if (!searchTerm) {
        loadAllExpertSessions();
        return;
    }
    
    try {
        const allSessions = await getAllExpertSessions();
        const clients = await getAllClients();
        const cases = await getAllCases();
        
        const filteredSessions = allSessions.filter(session => {
            const clientData = clients.find(cl => cl.id === session.clientId);
            
            return (
                (clientData && clientData.name.includes(searchTerm)) ||
                (session.expertName && session.expertName.includes(searchTerm))
            );
        });
        
        displayExpertSessionsList(filteredSessions, clients, cases);
    } catch (error) {
    }
}

// ربط مستمعات نموذج جلسة الخبير
function attachExpertSessionFormListeners(sessionId) {
    const form = document.getElementById('expert-session-form');
    const cancelBtn = document.getElementById('cancel-session-btn');
    
    // حفظ النموذج
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSaveExpertSession(e, sessionId);
        });
    }
    
    // إلغاء
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            navigateBack();
        });
    }
}

// حفظ جلسة الخبير
async function handleSaveExpertSession(e, sessionId) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const sessionData = Object.fromEntries(formData.entries());
    
    // تحويل البيانات للأنواع الصحيحة
    sessionData.clientId = parseInt(sessionData.clientId);
    
    // التحقق من البيانات المطلوبة
    if (!sessionData.clientId || !sessionData.sessionType) {
        showToast('يرجى ملء الحقول المطلوبة: الموكل، نوع الجلسة', 'error');
        return;
    }
    
    try {
        if (sessionId) {
            // تعديل جلسة موجودة
            const existingSession = await getById('expertSessions', sessionId);
            const updatedSession = { ...existingSession, ...sessionData };
            await updateRecord('expertSessions', sessionId, updatedSession);
            showToast('تم تعديل جلسة الخبير بنجاح', 'success');
        } else {
            // إضافة جلسة جديدة
            await addExpertSession(sessionData);
            showToast('تم حفظ جلسة الخبير بنجاح', 'success');
        }
        
        // العودة لنافذة جلسات الخبراء مع الحفاظ على الحالة
        navigateBack();
        
    } catch (error) {
        showToast('حدث خطأ أثناء حفظ جلسة الخبير', 'error');
    }
}

// تعديل جلسة خبير
async function editExpertSession(sessionId) {
    displayExpertSessionForm(sessionId);
}

// حذف جلسة خبير
async function deleteExpertSession(sessionId) {
    if (confirm('هل أنت متأكد من حذف هذه الجلسة؟')) {
        try {
            await deleteRecord('expertSessions', sessionId);
            showToast('تم حذف جلسة الخبير بنجاح', 'success');
            await reloadExpertSessionsWithState();
            updateExpertSessionsStats();
        } catch (error) {
            showToast('حدث خطأ أثناء حذف جلسة الخبير', 'error');
        }
    }
}

// دوال قاعدة البيانات لجلسات الخبراء
async function getAllExpertSessions() {
    return await getAll('expertSessions') || [];
}

async function addExpertSession(sessionData) {
    return await addRecord('expertSessions', sessionData);
}

// إعداد صندوق التمرير لجلسات الخبراء
function setupExpertSessionsScrollBox() {
    try {
        const rightWrapper = document.querySelector('#modal-content .flex-1.min-h-0 > div');
        const expertSessionsList = document.getElementById('expert-sessions-list');
        if (!rightWrapper || !expertSessionsList) return;
        
        const viewportH = window.innerHeight;
        const wrapperTop = rightWrapper.getBoundingClientRect().top;
        const targetH = Math.max(240, viewportH - wrapperTop - 12);
        
        rightWrapper.style.height = targetH + 'px';
        rightWrapper.style.minHeight = '0px';
        
        expertSessionsList.style.maxHeight = (targetH - 24) + 'px';
        expertSessionsList.style.overflowY = 'auto';
        
        const leftPane = document.querySelector('#modal-content [data-left-pane="expert"]');
        if (leftPane) {
            leftPane.style.maxHeight = targetH + 'px';
            leftPane.style.minHeight = '0px';
            leftPane.style.overflowY = 'auto';
        }
    } catch (e) {}
}

// إعداد سلوك التمرير عند التحويم لجلسات الخبراء
function setupExpertSessionsHoverScrollBehavior() {
    const leftPane = document.querySelector('#modal-content [data-left-pane="expert"]');
    const rightList = document.getElementById('expert-sessions-list');
    const mainEl = document.querySelector('main');
    if (!leftPane || !rightList || !mainEl) return;

    // افتراضي: تمرير الصفحة مفعل
    const enablePageScroll = () => {
        mainEl.style.overflowY = 'auto';
        document.body.style.overflowY = '';
        rightList.style.overscrollBehavior = 'contain';
    };

    const enableRightListScrollOnly = () => {
        mainEl.style.overflowY = 'hidden';
        rightList.style.overscrollBehavior = 'contain';
    };

    // عند التحويم على الجانب الأيسر -> تمرير الصفحة
    leftPane.addEventListener('mouseenter', enablePageScroll);
    leftPane.addEventListener('mouseleave', enableRightListScrollOnly);

    // عند التحويم على قائمة جلسات الخبراء -> تمرير داخلي
    rightList.addEventListener('mouseenter', enableRightListScrollOnly);
    rightList.addEventListener('mouseleave', enablePageScroll);

    // تهيئة الحالة بناءً على موضع المؤشر الأولي
    enablePageScroll();
}