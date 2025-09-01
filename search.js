const searchOptions = [
    { type: 'client', label: 'بحث باسم الموكل', placeholder: 'ادخل اسم الموكل...', inputs: [{ id: 'search-term', type: 'text' }] },
    { type: 'opponent', label: 'بحث باسم الخصم', placeholder: 'ادخل اسم الخصم...', inputs: [{ id: 'search-term', type: 'text' }] },
    { type: 'caseNumber', label: 'بحث برقم الدعوى', inputs: [{ id: 'search-term-number', type: 'text', placeholder: 'رقم الدعوى' }, { id: 'search-term-year', type: 'text', placeholder: 'سنة الدعوى' }] },
    { type: 'inventoryNumber', label: 'بحث برقم الحصر', inputs: [{ id: 'search-term-number', type: 'text', placeholder: 'رقم الحصر' }, { id: 'search-term-year', type: 'text', placeholder: 'سنة الحصر' }] },
    { type: 'poaNumber', label: 'بحث برقم التوكيل', placeholder: 'ادخل رقم التوكيل...', inputs: [{ id: 'search-term', type: 'text' }] }
];

function displaySearchOptions() {
    document.getElementById('modal-title').textContent = 'البحث والموكلين';
    const modalContent = document.getElementById('modal-content');
    const modalContainer = document.getElementById('modal-container');
    

    modalContainer.classList.remove('max-w-5xl');
    modalContainer.classList.add('max-w-7xl', 'mx-4');
    
    modalContent.classList.remove('search-modal-content');
    
    modalContent.innerHTML = `
        <div class="flex gap-6 h-[75vh]">
            <!-- الجانب الأيسر: شريط البحث والإعدادات -->
            <div class="w-1/3 space-y-6">
                <!-- شريط البحث -->
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 shadow-sm">
                    <div class="text-center mb-4">
                        <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i class="ri-search-line text-3xl text-white"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">البحث</h3>
                        <p class="text-sm text-gray-600">الموكلين • الخصوم • القضايا • التوكيلات • الحصر</p>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="relative">
                            <input type="text" id="quick-search" 
                                   placeholder="ابحث هنا..." 
                                   class="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right shadow-sm pr-12">
                            <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <i class="ri-search-2-line text-gray-400 text-xl"></i>
                            </div>
                        </div>
                        
                        <button id="clear-search" class="w-full px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all shadow-sm">
                            <i class="ri-close-line text-lg ml-2"></i>مسح البحث
                        </button>
                    </div>
                </div>

                <!-- إحصائيات سريعة -->
                <div id="quick-stats" class="bg-blue-50 rounded-xl border-2 border-blue-300 shadow-sm p-6">
                    <h4 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <i class="ri-bar-chart-line text-green-600"></i>
                        إحصائيات سريعة
                    </h4>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-700">إجمالي الموكلين</span>
                            <span id="total-clients" class="font-bold text-blue-700">-</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-700">النتائج المعروضة</span>
                            <span id="displayed-results" class="font-bold text-green-700">-</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- الجانب الأيمن: قائمة الموكلين -->
            <div class="flex-1">
                <div class="bg-blue-50 rounded-xl border-2 border-blue-300 shadow-sm h-full overflow-hidden">
                    <div id="clients-list" class="space-y-4 h-full overflow-y-auto p-6">
                        <div class="text-center text-gray-500 py-12">
                            <i class="ri-loader-4-line animate-spin text-3xl mb-3"></i>
                            <p class="text-lg">جاري تحميل الموكلين...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    attachQuickSearchListener();
    loadAllClients();
    updateQuickStats();
}


function attachQuickSearchListener() {
    const quickSearch = document.getElementById('quick-search');
    const clearBtn = document.getElementById('clear-search');
    
    quickSearch.addEventListener('input', debounce(async (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length < 2) {

            loadAllClients();
            document.getElementById('search-results').classList.add('hidden');
            return;
        }
        
        await performQuickSearch(query);
    }, 300));
    
    clearBtn.addEventListener('click', () => {
        quickSearch.value = '';

        loadAllClients();
        document.getElementById('search-results').classList.add('hidden');
    });
}


async function loadAllClients() {
    try {
        const clients = await getAllClients();
        const clientsList = document.getElementById('clients-list');
        
        if (clients.length === 0) {
            clientsList.innerHTML = `
                <div class="text-center text-gray-500 py-12">
                    <i class="ri-user-3-line text-4xl mb-4 text-gray-400"></i>
                    <p class="text-lg font-medium">لا يوجد موكلين مسجلين</p>
                    <p class="text-sm text-gray-400 mt-2">ابدأ ��إضافة موكل جديد من قائمة "جديد"</p>
                </div>
            `;
            return;
        }
        
        let html = '';
        for (const client of clients) {

            const cases = await getFromIndex('cases', 'clientId', client.id);
            

            const caseOpponentIds = [...new Set(cases.map(c => c.opponentId).filter(id => id))];
            

            let tempOpponentIds = [];
            const clientOpponentRelations = JSON.parse(localStorage.getItem('clientOpponentRelations') || '{}');
            if (clientOpponentRelations[client.id]) {
                tempOpponentIds = clientOpponentRelations[client.id];
            }
            

            const uniqueOpponentIds = [...new Set([...caseOpponentIds, ...tempOpponentIds])];
            
            const opponents = [];
            for (const opponentId of uniqueOpponentIds) {
                const opponent = await getById('opponents', opponentId);
                if (opponent) opponents.push(opponent);
            }
            

            let totalSessions = 0;
            for (const caseRecord of cases) {
                const sessions = await getFromIndex('sessions', 'caseId', caseRecord.id);
                totalSessions += sessions.length;
            }
            
            html += `
                <div class="client-card bg-blue-50 border-2 border-blue-300 rounded-xl p-5 hover:shadow-lg hover:border-blue-400 transition-all duration-300 cursor-pointer group" data-client-id="${client.id}">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4 flex-1">
                            <div class="relative">
                                <div class="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <i class="ri-user-3-line text-white text-lg"></i>
                                </div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <h4 class="font-bold text-xl text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">${client.name}</h4>
                                <div class="flex items-center gap-3">
                                    <div class="flex items-center gap-1 bg-red-100 px-3 py-1.5 rounded-full">
                                        <i class="ri-shield-user-line text-red-600 text-sm"></i>
                                        <span class="text-sm font-semibold text-red-700">${opponents.length}</span>
                                        <span class="text-xs text-red-600">خصم</span>
                                    </div>
                                    <div class="flex items-center gap-1 bg-blue-100 px-3 py-1.5 rounded-full">
                                        <i class="ri-briefcase-line text-blue-600 text-sm"></i>
                                        <span class="text-sm font-semibold text-blue-700">${cases.length}</span>
                                        <span class="text-xs text-blue-600">قضية</span>
                                    </div>
                                    <div class="flex items-center gap-1 bg-green-100 px-3 py-1.5 rounded-full">
                                        <i class="ri-calendar-event-line text-green-600 text-sm"></i>
                                        <span class="text-sm font-semibold text-green-700">${totalSessions}</span>
                                        <span class="text-xs text-green-600">جلسة</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <button class="attach-files-btn bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105" data-client-name="${client.name}">
                                <i class="ri-attachment-2 ml-1"></i>إرفاق ملفات
                            </button>
                            <button class="open-folder-btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105" data-client-name="${client.name}">
                                <i class="ri-folder-open-line ml-1"></i>فتح المجلد
                            </button>
                            <button class="delete-client-btn bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105" data-client-id="${client.id}">
                                <i class="ri-delete-bin-line ml-1"></i>حذف
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
        
        clientsList.innerHTML = html;
        attachClientCardListeners();
        

        const displayedResultsElement = document.getElementById('displayed-results');
        if (displayedResultsElement) {
            displayedResultsElement.textContent = clients.length;
        }
        
    } catch (error) {
        document.getElementById('clients-list').innerHTML = `
            <div class="text-center text-red-500 py-8">
                <i class="ri-error-warning-line text-2xl mb-2"></i>
                <p>خطأ في تحميل الموكلين</p>
            </div>
        `;
    }
}


function attachClientCardListeners() {

    document.querySelectorAll('.client-card').forEach(card => {
        card.addEventListener('click', async (e) => {
            if (e.target.closest('.edit-client-btn') || e.target.closest('.delete-client-btn') || e.target.closest('.attach-files-btn') || e.target.closest('.open-folder-btn')) return;
            
            const clientId = parseInt(card.dataset.clientId);

            navigateTo(displayClientViewForm, clientId);
        });
    });
    

    document.querySelectorAll('.attach-files-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const clientName = btn.dataset.clientName;
            await handleCreateFolderAndUploadForClient(clientName);
        });
    });
    

    document.querySelectorAll('.open-folder-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const clientName = btn.dataset.clientName;
            await handleOpenFolderForClient(clientName);
        });
    });
    

    document.querySelectorAll('.delete-client-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const clientId = parseInt(btn.dataset.clientId);
            await handleDeleteClient(clientId);
        });
    });
}

// نافذة تعديل موكل منفرد
function displayEditClientForm(clientId) {
    document.getElementById('modal-title').textContent = 'تعديل بيانات الموكل';
    const modalContent = document.getElementById('modal-content');
    
    modalContent.innerHTML = `
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div class="flex items-center gap-3 mb-6">
                <i class="ri-user-3-line text-2xl text-blue-600"></i>
                <h3 class="text-xl font-bold text-blue-800">تعديل بيانات الموكل</h3>
            </div>
            
            <form id="edit-single-client-form" class="space-y-4">
                <input type="hidden" id="edit-single-client-id" value="${clientId}">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">اسم الموكل</label>
                        <input type="text" id="edit-single-client-name" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">صفة الموكل</label>
                        <input type="text" id="edit-single-client-capacity" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">عنوان الموكل</label>
                        <input type="text" id="edit-single-client-address" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">هاتف الموكل</label>
                        <input type="text" id="edit-single-client-phone" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">رقم التوكيل</label>
                        <input type="text" id="edit-single-client-poa-number" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                </div>
                
                <div class="flex gap-3 pt-4">
                    <button type="submit" class="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        <i class="ri-save-line mr-2"></i>حفظ التعديل
                    </button>
                    <button type="button" id="cancel-edit" class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                        إلغاء
                    </button>
                </div>
            </form>
        </div>
    `;

    loadSingleClientData(clientId);
    attachSingleClientEditListeners();
}

async function loadSingleClientData(clientId) {
    try {
        const client = await getById('clients', clientId);
        if (client) {
            document.getElementById('edit-single-client-name').value = client.name || '';
            document.getElementById('edit-single-client-capacity').value = client.capacity || '';
            document.getElementById('edit-single-client-address').value = client.address || '';
            document.getElementById('edit-single-client-phone').value = client.phone || '';
            document.getElementById('edit-single-client-poa-number').value = client.poaNumber || '';
        }
    } catch (error) {
        showToast('خطأ في تحميل بيانات الموكل');
    }
}

function attachSingleClientEditListeners() {
    document.getElementById('edit-single-client-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const clientId = parseInt(document.getElementById('edit-single-client-id').value);
        
        const clientData = {
            name: document.getElementById('edit-single-client-name').value.trim(),
            capacity: document.getElementById('edit-single-client-capacity').value.trim(),
            address: document.getElementById('edit-single-client-address').value.trim(),
            phone: document.getElementById('edit-single-client-phone').value.trim(),
            poaNumber: document.getElementById('edit-single-client-poa-number').value.trim()
        };

        if (!clientData.name) {
            showToast('يرجى إدخال اسم الموكل');
            return;
        }

        try {
            await updateRecord('clients', clientId, clientData);
            showToast('تم تحديث بيانات الموكل بنجاح');
            await updateCountersInHeader();
            // الرجوع لنافذة بيانات الأطراف بدلاً من البحث
            displayClientView(clientId);
        } catch (error) {
            showToast('خطأ في تحديث بيانات الموكل');
        }
    });

    document.getElementById('cancel-edit').addEventListener('click', () => {
        // الرجوع لنافذة بيانات الأطراف بدلاً من البحث
        const clientId = parseInt(document.getElementById('edit-single-client-id').value);
        displayClientView(clientId);
    });
}

// نافذة تعديل خصم منفرد
function displayEditOpponentForm(opponentId) {
    document.getElementById('modal-title').textContent = 'تعديل بيانات الخصم';
    const modalContent = document.getElementById('modal-content');
    
    modalContent.innerHTML = `
        <div class="bg-red-50 border border-red-200 rounded-lg p-6">
            <div class="flex items-center gap-3 mb-6">
                <i class="ri-shield-user-line text-2xl text-red-600"></i>
                <h3 class="text-xl font-bold text-red-800">تعديل بيانات الخصم</h3>
            </div>
            
            <form id="edit-single-opponent-form" class="space-y-4">
                <input type="hidden" id="edit-single-opponent-id" value="${opponentId}">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">اسم الخصم</label>
                        <input type="text" id="edit-single-opponent-name" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">صفة الخصم</label>
                        <input type="text" id="edit-single-opponent-capacity" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">عنوان الخصم</label>
                        <input type="text" id="edit-single-opponent-address" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">هاتف الخصم</label>
                        <input type="text" id="edit-single-opponent-phone" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">رقم الملف</label>
                        <input type="text" id="edit-single-opponent-file-number" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    </div>
                </div>
                
                <div class="flex gap-3 pt-4">
                    <button type="submit" class="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium">
                        <i class="ri-save-line mr-2"></i>حفظ التعديل
                    </button>
                    <button type="button" id="cancel-opponent-edit" class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                        إلغاء
                    </button>
                </div>
            </form>
        </div>
    `;

    loadSingleOpponentData(opponentId);
    attachSingleOpponentEditListeners();
}

async function loadSingleOpponentData(opponentId) {
    try {
        const opponent = await getById('opponents', opponentId);
        if (opponent) {
            document.getElementById('edit-single-opponent-name').value = opponent.name || '';
            document.getElementById('edit-single-opponent-capacity').value = opponent.capacity || '';
            document.getElementById('edit-single-opponent-address').value = opponent.address || '';
            document.getElementById('edit-single-opponent-phone').value = opponent.phone || '';
            document.getElementById('edit-single-opponent-file-number').value = opponent.fileNumber || '';
        }
    } catch (error) {
        showToast('خطأ في تحميل بيانات الخصم');
    }
}

function attachSingleOpponentEditListeners() {
    document.getElementById('edit-single-opponent-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const opponentId = parseInt(document.getElementById('edit-single-opponent-id').value);
        
        const opponentData = {
            name: document.getElementById('edit-single-opponent-name').value.trim(),
            capacity: document.getElementById('edit-single-opponent-capacity').value.trim(),
            address: document.getElementById('edit-single-opponent-address').value.trim(),
            phone: document.getElementById('edit-single-opponent-phone').value.trim(),
            fileNumber: document.getElementById('edit-single-opponent-file-number').value.trim()
        };

        if (!opponentData.name) {
            showToast('يرجى إدخال اسم الخصم');
            return;
        }

        try {
            await updateRecord('opponents', opponentId, opponentData);
            showToast('تم تحديث بيانات الخصم بنجاح');
            await updateCountersInHeader();
            // البحث عن الموكل المرتبط بهذا الخصم والرجوع لنافذة بيانات الأطراف
            const cases = await getFromIndex('cases', 'opponentId', opponentId);
            if (cases.length > 0) {
                displayClientView(cases[0].clientId);
            } else {
                navigateBack();
            }
        } catch (error) {
            showToast('خطأ في تحديث بيانات الخصم');
        }
    });

    document.getElementById('cancel-opponent-edit').addEventListener('click', async () => {
        // البحث عن الموكل المرتبط بهذا الخصم والرجوع لنافذة بيانات الأطراف
        const opponentId = parseInt(document.getElementById('edit-single-opponent-id').value);
        const cases = await getFromIndex('cases', 'opponentId', opponentId);
        if (cases.length > 0) {
            displayClientView(cases[0].clientId);
        } else {
            navigateBack();
        }
    });
}

// باقي الدوال...
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

async function updateQuickStats() {
    try {
        const clients = await getAllClients();
        const totalClientsElement = document.getElementById('total-clients');
        const displayedResultsElement = document.getElementById('displayed-results');
        
        if (totalClientsElement) {
            totalClientsElement.textContent = clients.length;
        }
        
        if (displayedResultsElement) {
            displayedResultsElement.textContent = clients.length;
        }
    } catch (error) {
        console.error('خطأ في تحديث الإحصائيات:', error);
    }
}

async function handleDeleteClient(clientId) {
    try {
        const client = await getById('clients', clientId);
        if (!client) {
            showToast('الموكل غير موجود', 'error');
            return;
        }
        
        const cases = await getFromIndex('cases', 'clientId', clientId);
        
        let confirmMessage = `هل أنت متأكد من حذف الموكل "${client.name}"؟`;
        if (cases.length > 0) {
            confirmMessage += `\n\nتحذير: سيتم حذف ${cases.length} قضية مرتبطة بهذا الموكل وجميع الجلسات المرتبطة بها.`;
        }
        
        if (!confirm(confirmMessage)) {
            return;
        }
        
        for (const caseRecord of cases) {
            const sessions = await getFromIndex('sessions', 'caseId', caseRecord.id);
            for (const session of sessions) {
                await deleteRecord('sessions', session.id);
            }
        }
        
        for (const caseRecord of cases) {
            await deleteRecord('cases', caseRecord.id);
        }
        
        await deleteRecord('clients', clientId);
        
        showToast('تم حذف الموكل وجميع القضايا والجلسات المرتبطة به بنجاح', 'success');
        
        await loadAllClients();
        await updateCountersInHeader();
        
    } catch (error) {
        console.error('خطأ في حذف الموكل:', error);
        showToast('حدث خطأ أثناء حذف الموكل', 'error');
    }
}

async function handleCreateFolderAndUploadForClient(clientName) {
    if (!clientName) {
        showToast('يجب تحديد اسم الموكل', 'error');
        return;
    }
    
    if (!window.electronAPI || !window.electronAPI.createClientFolder) {
        showToast('هذه الميزة متاحة فقط في تطبيق سطح المكتب', 'error');
        return;
    }
    
    try {
        const result = await window.electronAPI.createClientFolder(clientName);
        if (result.success) {
            if (result.filesCount > 0) {
                showToast(`${result.message} (${result.filesCount} ملف)`, 'success');
            } else {
                showToast(result.message, 'success');
            }
        } else {
            showToast(result.message, 'error');
        }
    } catch (error) {
        console.error('Error creating folder:', error);
        showToast('حدث خطأ في إنشاء المجلد', 'error');
    }
}

async function handleOpenFolderForClient(clientName) {
    if (!clientName) {
        showToast('يجب تحديد اسم الموكل', 'error');
        return;
    }
    
    if (!window.electronAPI || !window.electronAPI.openClientFolder) {
        showToast('هذه الميزة متاحة فقط في تطبيق سطح المكتب', 'error');
        return;
    }
    
    try {
        const result = await window.electronAPI.openClientFolder(clientName);
        if (result.success) {
            showToast(result.message, 'success');
        } else {
            showToast(result.message, 'error');
        }
    } catch (error) {
        console.error('Error opening folder:', error);
        showToast('حدث خطأ في فتح المجلد', 'error');
    }
}