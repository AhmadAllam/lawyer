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
                    <p class="text-sm text-gray-400 mt-2">ابدأ بإضافة موكل جديد من قائمة "جديد"</p>
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
        

        html = html.replace(
            /<button class="attach-files-btn([^>]*)>\s*<i class="ri-attachment-2 ml-1"><\/i>إرفاق ملفات\s*<\/button>\s*<button class="open-folder-btn([^>]*)>\s*<i class="ri-folder-open-line ml-1"><\/i>فتح المجلد\s*<\/button>/g,
            '<div class="flex gap-1"><button class="attach-files-btn$1 px-3 py-2 text-xs"><i class="ri-attachment-2"></i></button><button class="open-folder-btn$2 px-3 py-2 text-xs"><i class="ri-folder-open-line"></i></button></div>'
        );
        
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


async function displayClientCases(clientId, cases) {
    if (cases.length === 1) {

        navigateTo(displayComprehensiveEditForm, cases[0].id, clientId, cases[0].opponentId);
        return;
    }
    
    // إذا كان للموكل أكثر من قضية، اعرض قائمة للاختيار
    const resultsContainer = document.getElementById('results-container');
    const searchResults = document.getElementById('search-results');
    
    searchResults.classList.remove('hidden');
    
    let html = '<div class="space-y-3">';
    for (const caseRecord of cases) {
        let opponent = await getById('opponents', caseRecord.opponentId);
        
        // إذا لم يتم العثور على خصم من القضية، ابحث في العلاقات المؤقتة
        if (!opponent) {
            const clientOpponentRelations = JSON.parse(localStorage.getItem('clientOpponentRelations') || '{}');
            if (clientOpponentRelations[clientId] && clientOpponentRelations[clientId].length > 0) {
                opponent = await getById('opponents', clientOpponentRelations[clientId][0]);
            }
        }
        html += `
            <div class="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-all" data-case-id="${caseRecord.id}" data-search-type="client">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <p class="font-bold text-lg text-blue-600">قضية رقم: ${caseRecord.caseNumber || ''} لسنة ${caseRecord.caseYear || ''}</p>
                        <div class="text-sm text-gray-600 mt-1">
                            <p><span class="font-medium">ضد:</span> ${opponent ? opponent.name : 'غير محدد'}</p>
                            ${caseRecord.caseType ? `<p><span class="font-medium">نوع القضية:</span> ${caseRecord.caseType}</p>` : ''}
                        </div>
                    </div>
                    <button class="comprehensive-edit-btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors" data-case-id="${caseRecord.id}" data-client-id="${caseRecord.clientId}" data-opponent-id="${caseRecord.opponentId}">
                        <i class="ri-edit-box-line mr-1"></i>تعديل شامل
                    </button>
                </div>
            </div>
        `;
    }
    html += '</div>';
    resultsContainer.innerHTML = html;
    
    attachComprehensiveCaseListeners();
}



// البحث الشامل
async function performQuickSearch(query) {
    const clientsList = document.getElementById('clients-list');
    
    // مسح النتائج الحالية وعرض مؤشر التحميل
    clientsList.innerHTML = '<div class="text-center text-gray-500 py-8"><i class="ri-loader-4-line animate-spin text-3xl mb-3"></i><p class="text-lg">جاري البحث السريع...</p></div>';
    
    try {
        let allMatchingClients = new Set(); // استخدام Set لتجنب التكرار
        
        // 1. البحث في أسماء الموكلين
        const clients = await getAllClients();
        const matchingClientsByName = clients.filter(c => c.name.toLowerCase().includes(query));
        matchingClientsByName.forEach(client => allMatchingClients.add(client.id));
        
        // 2. البحث في أسماء الخصوم
        const opponents = await getAllOpponents();
        const matchingOpponents = opponents.filter(o => o.name.toLowerCase().includes(query));
        
        for (const opponent of matchingOpponents) {
            // جلب القضايا المرتبطة بهذا الخصم
            const opponentCases = await getFromIndex('cases', 'opponentId', opponent.id);
            for (const caseRecord of opponentCases) {
                if (caseRecord.clientId) {
                    allMatchingClients.add(caseRecord.clientId);
                }
            }
        }
        
        // 3. البحث في أرقام القضايا
        const allCases = await getAllCases();
        const matchingCasesByNumber = allCases.filter(c => 
            (c.caseNumber && c.caseNumber.includes(query)) ||
            (c.appealNumber && c.appealNumber.includes(query)) ||
            (c.cassationNumber && c.cassationNumber.includes(query))
        );
        
        for (const caseRecord of matchingCasesByNumber) {
            if (caseRecord.clientId) {
                allMatchingClients.add(caseRecord.clientId);
            }
        }
        
        // 4. البحث في أرقام التوكيل
        const matchingCasesByPOA = allCases.filter(c => 
            c.poaNumber && c.poaNumber.includes(query)
        );
        
        for (const caseRecord of matchingCasesByPOA) {
            if (caseRecord.clientId) {
                allMatchingClients.add(caseRecord.clientId);
            }
        }
        
        // 5. البحث في أرقام الحصر
        const allSessions = await getAllSessions();
        const matchingSessionsByInventory = allSessions.filter(s => 
            (s.inventoryNumber && s.inventoryNumber.includes(query))
        );
        
        for (const session of matchingSessionsByInventory) {
            if (session.caseId) {
                const sessionCase = await getById('cases', session.caseId);
                if (sessionCase && sessionCase.clientId) {
                    allMatchingClients.add(sessionCase.clientId);
                }
            }
        }
        
        // تحويل Set إلى Array والحصول على بيانات الموكلين
        const uniqueClientIds = Array.from(allMatchingClients);
        const finalMatchingClients = [];
        
        for (const clientId of uniqueClientIds) {
            const client = await getById('clients', clientId);
            if (client) {
                finalMatchingClients.push(client);
            }
        }
        
        if (finalMatchingClients.length === 0) {
            clientsList.innerHTML = `
                <div class="text-center text-gray-500 py-12">
                    <i class="ri-search-line text-4xl mb-4 text-gray-400"></i>
                    <p class="text-lg font-medium">لا توجد نتائج للبحث</p>
                    <p class="text-sm text-gray-400 mt-2">جرب كلمات بحث أخرى</p>
                    <div class="mt-4 text-xs text-gray-400">
                        <p>البحث السريع يشمل: أسماء الموكلين، أسماء الخصوم، أرقام القضايا، أرقام التوكيل، أرقام الحصر</p>
                    </div>
                </div>
            `;
            return;
        }
        
        // عرض النتائج بنفس تصميم قائمة الموكلين
        let html = '';
        for (const client of finalMatchingClients) {

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
            
            // تحديد سبب ظهور هذا الموكل في النتائج
            let matchReason = '';
            
            // فحص إذا كان الاسم يطابق البحث
            if (client.name.toLowerCase().includes(query)) {
                matchReason = 'اسم الموكل';
            } else {
                // فحص الخصوم
                const clientOpponents = opponents.filter(o => o.name.toLowerCase().includes(query));
                if (clientOpponents.length > 0) {
                    matchReason = `اسم الخصم: ${clientOpponents[0].name}`;
                } else {
                    // فحص القضايا
                    const matchingCase = cases.find(c => 
                        (c.caseNumber && c.caseNumber.includes(query)) ||
                        (c.appealNumber && c.appealNumber.includes(query)) ||
                        (c.cassationNumber && c.cassationNumber.includes(query)) ||
                        (c.poaNumber && c.poaNumber.includes(query))
                    );
                    
                    if (matchingCase) {
                        if (matchingCase.caseNumber && matchingCase.caseNumber.includes(query)) {
                            matchReason = `رقم القضية: ${matchingCase.caseNumber}`;
                        } else if (matchingCase.poaNumber && matchingCase.poaNumber.includes(query)) {
                            matchReason = `رقم التوكيل: ${matchingCase.poaNumber}`;
                        } else {
                            matchReason = 'بيانات القضية';
                        }
                    } else {
                        matchReason = 'رقم الحصر';
                    }
                }
            }
            
            html += `
                <div class="client-card bg-gradient-to-r from-white via-green-50 to-white border border-green-200 rounded-xl p-5 hover:shadow-lg hover:border-green-400 hover:from-green-50 hover:to-green-100 transition-all duration-300 cursor-pointer group" data-client-id="${client.id}">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4 flex-1">
                            <div class="relative">
                                <div class="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <i class="ri-user-3-line text-white text-lg"></i>
                                </div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-3 mb-2">
                                    <h4 class="font-bold text-xl text-gray-800 group-hover:text-green-700 transition-colors">${client.name}</h4>
                                    <span class="px-3 py-1 bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-xs rounded-full font-semibold shadow-sm">
                                        <i class="ri-search-eye-line ml-1"></i>${matchReason}
                                    </span>
                                </div>
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
        

        html = html.replace(
            /<button class="attach-files-btn([^>]*)>\s*<i class="ri-attachment-2 ml-1"><\/i>إرفاق ملفات\s*<\/button>\s*<button class="open-folder-btn([^>]*)>\s*<i class="ri-folder-open-line ml-1"><\/i>فتح المجلد\s*<\/button>/g,
            '<div class="flex gap-1"><button class="attach-files-btn$1 px-3 py-2 text-xs"><i class="ri-attachment-2"></i></button><button class="open-folder-btn$2 px-3 py-2 text-xs"><i class="ri-folder-open-line"></i></button></div>'
        );
        
        clientsList.innerHTML = html;
        attachClientCardListeners();
        

        const displayedResultsElement = document.getElementById('displayed-results');
        if (displayedResultsElement) {
            displayedResultsElement.textContent = finalMatchingClients.length;
        }
        
    } catch (error) {
        console.error('خطأ في البحث الشامل:', error);
        clientsList.innerHTML = `
            <div class="text-center text-red-500 py-8">
                <i class="ri-error-warning-line text-2xl mb-2"></i>
                <p>خطأ في البحث</p>
            </div>
        `;
    }
}

// مستمعي أحداث للنافذة الشاملة
function attachComprehensiveCaseListeners() {
    // أزرار التعديل الشامل فقط (بدون النقر على الكارت)
    document.querySelectorAll('.comprehensive-edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const caseId = parseInt(btn.dataset.caseId);
            const clientId = parseInt(btn.dataset.clientId);
            const opponentId = parseInt(btn.dataset.opponentId);
            
            navigateTo(displayComprehensiveEditForm, caseId, clientId, opponentId);
        });
    });
}

// النافذة الشاملة لتعديل كل شيء
function displayComprehensiveEditForm(caseId, clientId, opponentId) {
    document.getElementById('modal-title').textContent = 'تعديل شامل للقضية';
    const modalContent = document.getElementById('modal-content');
    
    modalContent.innerHTML = `
        <div class="space-y-6">
            <!-- بيانات الأطراف -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- بيانات الموكل -->
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 class="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                        <i class="ri-user-3-line"></i>بيانات الموكل
                    </h3>
                    <div id="client-info-display" class="space-y-2 text-sm text-gray-700 mb-4"></div>
                    <button id="edit-client-btn" class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                        <i class="ri-edit-line mr-2"></i>تعديل الموكل
                    </button>
                </div>

                <!-- بيانات الخصم -->
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 class="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                        <i class="ri-shield-user-line"></i>بيانات الخصم
                    </h3>
                    <div id="opponent-info-display" class="space-y-2 text-sm text-gray-700 mb-4"></div>
                    <button id="edit-opponent-btn" class="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors">
                        <i class="ri-edit-line mr-2"></i>تعديل الخصم
                    </button>
                </div>
            </div>

            <!-- قضايا الموكل -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold text-blue-800 flex items-center gap-2">
                        <i class="ri-briefcase-line"></i>قضايا الموكل
                    </h3>
                    <div id="cases-count" class="text-sm text-blue-600 font-medium"></div>
                </div>
                <div id="cases-list" class="space-y-2 mb-4 max-h-60 overflow-y-auto"></div>
                <div class="flex gap-3">
                    <button id="add-case-btn" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors font-medium">
                        <i class="ri-add-line mr-2"></i>إضافة قضية جديدة
                    </button>
                </div>
            </div>

            <!-- الجلسات للقضية المحددة -->
            <div id="sessions-section" class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-purple-800 flex items-center gap-2">
                        <i class="ri-calendar-line"></i>جلسات القضايا
                    </h3>
                    <div id="sessions-count" class="text-sm text-purple-600 font-medium"></div>
                </div>
                <div id="current-case-info" class="bg-white p-3 rounded border mb-4 text-sm"></div>
                <div id="sessions-list" class="space-y-2 mb-4 max-h-40 overflow-y-auto"></div>
                <div class="flex gap-3">
                    <button id="add-session-btn" class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                        <i class="ri-add-line mr-2"></i>إضافة جلسة جديدة
                    </button>
                    <button id="manage-sessions-btn" class="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors">
                        <i class="ri-settings-line mr-2"></i>إدارة الجلسات
                    </button>
                </div>
            </div>

            <!-- أزرار التحكم -->
            <div class="flex gap-3 pt-4 border-t border-gray-200">
                <button id="save-all-btn" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-all font-bold">
                    <i class="ri-save-3-line mr-2"></i>حفظ جميع التعديلات
                </button>
                <button id="close-comprehensive-btn" class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    <i class="ri-close-line mr-2"></i>إغلاق
                </button>
            </div>
        </div>
    `;

    loadComprehensiveData(caseId, clientId, opponentId);
    attachComprehensiveEditListeners(caseId, clientId, opponentId);
}

async function loadComprehensiveData(caseId, clientId, opponentId) {
    try {
        // تحميل بيانات الموكل
        const client = await getById('clients', clientId);
        if (client) {
            document.getElementById('client-info-display').innerHTML = `
                <div><strong>الاسم:</strong> ${client.name || 'غير محدد'}</div>
                <div><strong>الصفة:</strong> ${client.capacity || 'غير محدد'}</div>
                <div><strong>الهاتف:</strong> ${client.phone || 'غير محدد'}</div>
                <div><strong>العنوان:</strong> ${client.address || 'غير محدد'}</div>
            `;
        }

        // تحميل بيانات الخصم
        const opponent = await getById('opponents', opponentId);
        if (opponent) {
            document.getElementById('opponent-info-display').innerHTML = `
                <div><strong>الاسم:</strong> ${opponent.name || 'غير محدد'}</div>
                <div><strong>الصفة:</strong> ${opponent.capacity || 'غير محدد'}</div>
                <div><strong>الهاتف:</strong> ${opponent.phone || 'غير محدد'}</div>
                <div><strong>العنوان:</strong> ${opponent.address || 'غير محدد'}</div>
            `;
        }

        // تحميل جميع قضايا الموكل
        const allClientCases = await getFromIndex('cases', 'clientId', clientId);
        document.getElementById('cases-count').textContent = `${allClientCases.length} قضية`;
        
        if (allClientCases.length > 0) {
            let casesHtml = '';
            for (let i = 0; i < allClientCases.length; i++) {
                const caseRecord = allClientCases[i];
                const caseOpponent = await getById('opponents', caseRecord.opponentId);
                const isFirst = i === 0; // القضية الأولى محددة افتراضياً
                
                casesHtml += `
                    <div class="case-item flex justify-between items-center p-3 bg-white rounded border ${isFirst ? 'border-blue-500 bg-blue-50' : ''} hover:shadow-sm transition-all cursor-pointer" data-case-id="${caseRecord.id}">
                        <div class="flex-1">
                            <div class="font-medium text-blue-800">
                                قضية رقم ${caseRecord.caseNumber || 'غير محدد'} لسنة ${caseRecord.caseYear || 'غير محدد'}
                                ${isFirst ? '<span class="text-xs bg-blue-500 text-white px-2 py-1 rounded ml-2">محددة حالياً</span>' : ''}
                            </div>
                            <div class="text-sm text-gray-600 mt-1">
                                <span><strong>ضد:</strong> ${caseOpponent ? caseOpponent.name : 'غير محدد'}</span>
                                ${caseRecord.caseType ? ` | <strong>النوع:</strong> ${caseRecord.caseType}` : ''}
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <button class="edit-case-btn bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs transition-colors" data-case-id="${caseRecord.id}">
                                <i class="ri-edit-line mr-1"></i>تعديل
                            </button>
                            <button class="delete-case-btn bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors" data-case-id="${caseRecord.id}">
                                <i class="ri-delete-bin-line mr-1"></i>حذف
                            </button>
                        </div>
                    </div>
                `;
            }
            document.getElementById('cases-list').innerHTML = casesHtml;
        } else {
            document.getElementById('cases-list').innerHTML = `
                <div class="text-center text-gray-500 py-4">
                    <i class="ri-briefcase-line text-2xl mb-2"></i>
                    <p>لا توجد قضايا مسجلة</p>
                </div>
            `;
        }

        // تحميل جلسات أول قضية (إذا وجدت)
        if (allClientCases.length > 0) {
            await loadCurrentCaseSessions(allClientCases[0].id);
        } else {
            // إذا لم توجد قضايا، اعرض رسالة فارغة
            document.getElementById('current-case-info').innerHTML = `
                <div class="text-center text-gray-500">
                    <i class="ri-briefcase-line text-xl mb-2"></i>
                    <p>لا توجد قضايا لعرض جلساتها</p>
                </div>
            `;
            document.getElementById('sessions-count').textContent = '0 جلسة';
            document.getElementById('sessions-list').innerHTML = `
                <div class="text-center text-gray-500 py-4">
                    <i class="ri-calendar-line text-2xl mb-2"></i>
                    <p>لا توجد جلسات</p>
                </div>
            `;
        }

    } catch (error) {
        showToast('خطأ في تحميل البيانات');
    }
}

// تحميل جلسات القضية المحددة
async function loadCurrentCaseSessions(caseId) {
    try {
        const caseData = await getById('cases', caseId);
        const sessions = await getFromIndex('sessions', 'caseId', caseId);
        
        // عرض معلومات القضية المحددة
        if (caseData) {
            document.getElementById('current-case-info').innerHTML = `
                <strong>عرض جلسات القضية:</strong> رقم ${caseData.caseNumber || 'غير محدد'} لسنة ${caseData.caseYear || 'غير محدد'}
                ${caseData.caseType ? ` | النوع: ${caseData.caseType}` : ''}
            `;
        }
        
        document.getElementById('sessions-count').textContent = `${sessions.length} جلسة`;
        
        if (sessions.length > 0) {
            let sessionsHtml = '';
            sessions.forEach(session => {
                sessionsHtml += `
                    <div class="flex justify-between items-center p-2 bg-white rounded border">
                        <div class="text-sm">
                            <strong>جلسة ${session.sessionDate}</strong> - ${session.sessionTime || 'غير محدد'}
                            ${session.inventoryNumber ? ` | حصر: ${session.inventoryNumber}/${session.inventoryYear}` : ''}
                        </div>
                        <button class="edit-session-btn bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs transition-colors" data-session-id="${session.id}" data-case-id="${caseId}">
                            <i class="ri-edit-line mr-1"></i>تعديل
                        </button>
                    </div>
                `;
            });
            document.getElementById('sessions-list').innerHTML = sessionsHtml;
        } else {
            document.getElementById('sessions-list').innerHTML = `
                <div class="text-center text-gray-500 py-4">
                    <i class="ri-calendar-line text-2xl mb-2"></i>
                    <p>لا توجد جلسات مسجلة لهذه القضية</p>
                </div>
            `;
        }
        
        // تحديث متغير القضية الحالية للجلسات
        window.currentSessionsCaseId = caseId;
        
    } catch (error) {
        showToast('خطأ في تحميل جلسات القضية');
    }
}



function attachComprehensiveEditListeners(caseId, clientId, opponentId) {
    let currentCaseId = caseId;
    let currentOpponentId = opponentId;
    window.currentSessionsCaseId = caseId; // متغير global لتتبع القضية المحددة للجلسات

    // تعديل الموكل
    document.getElementById('edit-client-btn').addEventListener('click', () => {
        navigateTo(displayEditClientForm, clientId);
    });

    // تعديل الخصم
    document.getElementById('edit-opponent-btn').addEventListener('click', () => {
        navigateTo(displayEditOpponentForm, currentOpponentId);
    });

    // إضافة قضية جديدة
    document.getElementById('add-case-btn').addEventListener('click', async () => {
        // تعيين الموكل المحدد مسبقاً
        stateManager.setSelectedClientId(clientId);
        
        try {
            const clientData = await getById('clients', clientId);
            if (clientData) {
                const partyData = {
                    clientName: clientData.name || '',
                    clientCapacity: clientData.capacity || '',
                    clientAddress: clientData.address || '',
                    clientPhone: clientData.phone || '',
                    opponentName: '',
                    opponentCapacity: '',
                    opponentAddress: '',
                    opponentPhone: '',
                };
                stateManager.updateCaseDataStash('parties', partyData);
            }
        } catch (error) {
            console.error('Error loading client data:', error);
        }
        
        // إعادة تعيين معرف القضية الحالية لإنشاء قضية جديدة
        stateManager.resetCaseState();
        navigateTo(displayNewCaseForm);
    });



    // تعديل قضية
    document.getElementById('modal-content').addEventListener('click', (e) => {
        if (e.target.closest('.edit-case-btn')) {
            const btn = e.target.closest('.edit-case-btn');
            const editCaseId = parseInt(btn.dataset.caseId);
            stateManager.setCurrentCaseId(editCaseId);
            navigateTo(displayCaseDetailsForm);
        }
    });



    // إضافة جلسة جديدة
    document.getElementById('add-session-btn').addEventListener('click', () => {
        if (window.currentSessionsCaseId) {
            stateManager.setCurrentCaseId(window.currentSessionsCaseId);
            navigateTo(displaySessionForm);
        } else {
            showToast('يرجى تحديد قضية أولاً');
        }
    });

    // إدارة الجلسات
    document.getElementById('manage-sessions-btn').addEventListener('click', () => {
        if (window.currentSessionsCaseId) {
            stateManager.setCurrentCaseId(window.currentSessionsCaseId);
            navigateTo(displaySessionList);
        } else {
            showToast('يرجى تحديد قضية أولاً');
        }
    });

    // تعديل جلسة معينة
    document.getElementById('modal-content').addEventListener('click', async (e) => {
        if (e.target.closest('.edit-session-btn')) {
            const btn = e.target.closest('.edit-session-btn');
            const sessionId = parseInt(btn.dataset.sessionId);
            const sessionCaseId = parseInt(btn.dataset.caseId);
            const sessionData = await getById('sessions', sessionId);
            stateManager.setCurrentCaseId(sessionCaseId);
            navigateTo(displaySessionForm, sessionId, sessionData);
        }
    });

    // النقر على قضية لعرض جلساتها (فقط في النافذة الشاملة)
    document.getElementById('cases-list').addEventListener('click', async (e) => {
        if (e.target.closest('.case-item') && !e.target.closest('.edit-case-btn') && !e.target.closest('.delete-case-btn')) {
            try {
                const caseItem = e.target.closest('.case-item');
                const selectedCaseId = parseInt(caseItem.dataset.caseId);
                
                if (isNaN(selectedCaseId)) {
                    console.error('Invalid case ID');
                    return;
                }
                
                // تحديث مظهر القضايا وإزالة العلامات القديمة
                document.querySelectorAll('.case-item').forEach(item => {
                    item.classList.remove('border-blue-500', 'bg-blue-50');
                    // إزالة علامة "محددة حالياً" من جميع القضايا
                    const currentLabel = item.querySelector('.text-xs.bg-blue-500');
                    if (currentLabel) {
                        currentLabel.remove();
                    }
                });
                
                // إضافة التمييز للقضية المحددة
                caseItem.classList.add('border-blue-500', 'bg-blue-50');
                
                // إضافة علامة "محددة حالياً"
                const titleDiv = caseItem.querySelector('.font-medium');
                if (titleDiv && !titleDiv.querySelector('.text-xs.bg-blue-500')) {
                    titleDiv.innerHTML += '<span class="text-xs bg-blue-500 text-white px-2 py-1 rounded ml-2">محددة حالياً</span>';
                }
                
                // تحميل جلسات القضية المحددة
                window.currentSessionsCaseId = selectedCaseId;
                await loadCurrentCaseSessions(selectedCaseId);
                
            } catch (error) {
                console.error('Error handling case selection:', error);
                showToast('حدث خطأ أثناء تحديد القضية');
            }
        }
    });

    // إغلاق النافذة
    document.getElementById('close-comprehensive-btn').addEventListener('click', () => {
        navigateBack();
    });

    // حفظ جميع التعديلات
    document.getElementById('save-all-btn').addEventListener('click', () => {
        showToast('تم حفظ جميع التعديلات بنجاح');
        navigateBack();
    });
}

// مستمعي أحداث نتائج القضايا
function attachCaseResultListeners() {
    // أزرار التعديل فقط (بدون النقر على الكارت)
    document.querySelectorAll('.edit-case-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const caseId = parseInt(btn.dataset.caseId);
            const clientId = parseInt(btn.dataset.clientId);
            const opponentId = parseInt(btn.dataset.opponentId);
            
            navigateTo(displayEditForm, caseId, clientId, opponentId);
        });
    });
}

// فانكشن debounce للبحث السريع
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
            phone: document.getElementById('edit-single-client-phone').value.trim()
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
            phone: document.getElementById('edit-single-opponent-phone').value.trim()
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

async function displaySearchResults(cases, container, searchType) {
    if (!cases || cases.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500">لا توجد نتائج مطابقة.</p>';
        return;
    }

    let html = '<div class="space-y-3">';
    for (const caseRecord of cases) {
        const client = await getById('clients', caseRecord.clientId);
        const opponent = await getById('opponents', caseRecord.opponentId);
        html += `
            <div class="p-4 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700/50 transition-colors duration-200" data-case-id="${caseRecord.id}" data-search-type="${searchType}">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <p class="font-bold text-lg text-cyan-400">قضية رقم: ${caseRecord.caseNumber || ''} لسنة ${caseRecord.caseYear || ''}</p>
                        <div class="text-sm text-gray-300 mt-1">
                            <p><span class="font-semibold text-gray-400">الموكل:</span> ${client ? client.name : 'غير محدد'}</p>
                            <p><span class="font-semibold text-gray-400">الخصم:</span> ${opponent ? opponent.name : 'غير محدد'}</p>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <button class="view-case-btn bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors" data-case-id="${caseRecord.id}">
                            <i class="ri-eye-line mr-1"></i>عرض
                        </button>
                        <button class="edit-case-btn bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-md text-sm transition-colors" data-case-id="${caseRecord.id}" data-client-id="${caseRecord.clientId}" data-opponent-id="${caseRecord.opponentId}">
                            <i class="ri-edit-line mr-1"></i>تعديل
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    html += '</div>';
    container.innerHTML = html;
    


    // إضافة مستمعي أحداث أزرار العرض
    container.querySelectorAll('.view-case-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const caseId = parseInt(btn.dataset.caseId);
            navigateTo(displayCaseViewForm, caseId);
        });
    });

    // إضافة مستمعي أحداث أزرار التعديل
    container.querySelectorAll('.edit-case-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const caseId = parseInt(btn.dataset.caseId);
            
            navigateTo(displayEditCaseForm, caseId);
        });
    });
}

// دالة حذف الموكل
async function handleDeleteClient(clientId) {
    try {
        // جلب بيانات الموكل
        const client = await getById('clients', clientId);
        if (!client) {
            showToast('الموكل غير موجود', 'error');
            return;
        }
        
        // جلب القضايا المرتبطة بالموكل
        const cases = await getFromIndex('cases', 'clientId', clientId);
        
        // رسالة تأكيد
        let confirmMessage = `هل أنت متأكد من حذف الموكل "${client.name}"؟`;
        if (cases.length > 0) {
            confirmMessage += `\n\nتحذير: سيتم حذف ${cases.length} قضية مرتبطة بهذا الموكل وجميع الجلسات المرتبطة بها.`;
        }
        
        if (!confirm(confirmMessage)) {
            return;
        }
        
        // حذف جميع الجلسات المرتبطة بقضايا الموكل
        for (const caseRecord of cases) {
            const sessions = await getFromIndex('sessions', 'caseId', caseRecord.id);
            for (const session of sessions) {
                await deleteRecord('sessions', session.id);
            }
        }
        
        // حذف جميع القضايا المرتبطة بالموكل
        for (const caseRecord of cases) {
            await deleteRecord('cases', caseRecord.id);
        }
        
        // حذف الموكل
        await deleteRecord('clients', clientId);
        
        // إظهار رسالة نجاح
        showToast('تم حذف الموكل وجميع القضايا والجلسات المرتبطة به بنجاح', 'success');
        
        // إعادة تحميل قائمة الموكلين
        await loadAllClients();
        
        // تحديث العدادات في الهيدر
        await updateCountersInHeader();
        
    } catch (error) {
        console.error('خطأ في حذف الموكل:', error);
        showToast('حدث خطأ أثناء حذف الموكل', 'error');
    }
}



// تحديث الإحصائيات السريعة
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

// إرفاق ملفات للموكل من نافذة البحث
async function handleCreateFolderAndUploadForClient(clientName) {
    if (!clientName) {
        showToast('يجب تحديد اسم الموكل', 'error');
        return;
    }
    
    // Check if electronAPI is available
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

// فتح مجلد الموكل من نافذة البحث
async function handleOpenFolderForClient(clientName) {
    if (!clientName) {
        showToast('يجب تحديد اسم الموكل', 'error');
        return;
    }
    
    // Check if electronAPI is available
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