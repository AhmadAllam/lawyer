const partyDetailsFormHTML = `
<form id="party-details-form" class="space-y-6 min-h-[calc(100vh-48px)]">
    <div class="flex flex-row items-center gap-6">
        <div class="flex-1 p-6 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-200 shadow-lg">
             <h3 class="text-lg font-bold text-blue-800 mb-4 flex items-center justify-center gap-2"><i class="ri-user-3-line"></i><span>بيانات الموكل</span></h3>
            <div class="space-y-3">
                <div class="autocomplete-container">
                    <div class="flex items-stretch">
                        <label for="client-name" class="px-3 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">اسم الموكل</label>
                        <input type="text" id="client-name" name="clientName" required autocomplete="off" class="flex-1 p-3 bg-white border-2 border-blue-300 rounded-l-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-semibold text-gray-800 -mr-px">
                    </div>
                    <div id="client-autocomplete-results-container" class="autocomplete-results hidden"></div>
                </div>
                <div class="flex items-stretch"><label for="client-capacity" class="px-3 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">صفته</label><input type="text" id="client-capacity" name="clientCapacity" class="flex-1 p-3 bg-white border-2 border-blue-300 rounded-l-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-semibold text-gray-800 -mr-px"></div>
                <div class="flex items-stretch"><label for="client-address" class="px-3 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">عنوانه</label><input type="text" id="client-address" name="clientAddress" class="flex-1 p-3 bg-white border-2 border-blue-300 rounded-l-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-semibold text-gray-800 -mr-px"></div>
                <div class="flex items-stretch"><label for="client-phone" class="px-3 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">الهاتف</label><input type="text" id="client-phone" name="clientPhone" class="flex-1 p-3 bg-white border-2 border-blue-300 rounded-l-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-semibold text-gray-800 -mr-px"></div>
                            </div>
        </div>
        <div class="flex items-center justify-center"><span class="text-sm md:text-base font-bold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">ضد</span></div>
        <div class="flex-1 p-6 rounded-xl bg-gradient-to-br from-pink-50 to-red-50 shadow-lg">
             <h3 class="text-lg font-bold text-red-600 mb-4 flex items-center justify-center gap-2"><i class="ri-shield-user-line"></i><span>بيانات الخصم</span></h3>
            <div class="space-y-3">
                <div class="autocomplete-container">
                    <div class="flex items-stretch">
                        <label for="opponent-name" class="px-3 py-3 border-2 border-red-200 bg-red-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">اسم الخصم</label>
                        <input type="text" id="opponent-name" name="opponentName" required autocomplete="off" class="flex-1 p-3 bg-white border-2 border-red-200 rounded-l-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-red-400 focus:border-red-400 text-right font-semibold text-gray-800 -mr-px">
                    </div>
                    <div id="opponent-autocomplete-results-container" class="autocomplete-results hidden"></div>
                </div>
                <div class="flex items-stretch"><label for="opponent-capacity" class="px-3 py-3 border-2 border-red-200 bg-red-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">صفته</label><input type="text" id="opponent-capacity" name="opponentCapacity" class="flex-1 p-3 bg-white border-2 border-red-200 rounded-l-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-red-400 focus:border-red-400 text-right font-semibold text-gray-800 -mr-px"></div>
                <div class="flex items-stretch"><label for="opponent-address" class="px-3 py-3 border-2 border-red-200 bg-red-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">عنوانه</label><input type="text" id="opponent-address" name="opponentAddress" class="flex-1 p-3 bg-white border-2 border-red-200 rounded-l-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-red-400 focus:border-red-400 text-right font-semibold text-gray-800 -mr-px"></div>
                <div class="flex items-stretch"><label for="opponent-phone" class="px-3 py-3 border-2 border-red-200 bg-red-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">الهاتف</label><input type="text" id="opponent-phone" name="opponentPhone" class="flex-1 p-3 bg-white border-2 border-red-200 rounded-l-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-red-400 focus:border-red-400 text-right font-semibold text-gray-800 -mr-px"></div>
                            </div>
        </div>
    </div>
    <div id="party-details-actions" class="flex flex-col items-center gap-3 p-4 mt-3 mb-6 bg-blue-50 rounded-xl shadow-md">
        <!-- Wide Save & Proceed button -->
        <div class="w-full flex justify-center">
            <button type="button" id="next-to-case-details-btn" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
                <i class="ri-save-3-line"></i>
                <span>حفظ ومتابعة للقضية</span>
            </button>
        </div>
        <!-- Attach and Open buttons below -->
        <div class="flex items-center justify-center gap-2">
            <button type="button" id="create-folder-btn" class="px-4 py-2 bg-white border-2 border-gray-500 text-gray-800 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50 focus:outline-none focus:ring-0 focus:border-blue-600">
                <i class="ri-attachment-2"></i>
                <span>إرفاق ملفات</span>
            </button>
            <button type="button" id="open-folder-btn" class="px-4 py-2 bg-white border-2 border-gray-500 text-gray-800 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50 focus:outline-none focus:ring-0 focus:border-blue-600">
                <i class="ri-folder-open-line"></i>
                <span>فتح المجلد</span>
            </button>
        </div>
            </div>
</form>
`;

function displayNewCaseForm() {
    const pageHeaderTitle = document.getElementById('page-title');
    if (pageHeaderTitle) pageHeaderTitle.textContent = 'أطراف الدعوى';
    const modalTitleEl = document.getElementById('modal-title');
    if (modalTitleEl) modalTitleEl.textContent = '';
    const modalContent = document.getElementById('modal-content');
    modalContent.classList.remove('search-modal-content');
    modalContent.innerHTML = partyDetailsFormHTML;

    const form = document.getElementById('party-details-form');
    

    if (stateManager.caseDataStash.parties) {
        for (const [key, value] of Object.entries(stateManager.caseDataStash.parties)) {
            if (form.elements[key]) {
                form.elements[key].value = value;
            }
        }
    }
    

    if (stateManager.selectedClientId && !stateManager.caseDataStash.parties?.clientName) {
        loadSelectedClientData();
    }
    
    async function loadSelectedClientData() {
        try {
            const clientData = await getById('clients', stateManager.selectedClientId);
            if (clientData) {
                document.getElementById('client-name').value = clientData.name || '';
                document.getElementById('client-capacity').value = clientData.capacity || '';
                document.getElementById('client-address').value = clientData.address || '';
                document.getElementById('client-phone').value = clientData.phone || '';
                            }
        } catch (error) {
        }
    }

    document.getElementById('next-to-case-details-btn').addEventListener('click', handleSaveAndProceedToCaseDetails);
    

    document.getElementById('create-folder-btn').addEventListener('click', handleCreateFolderAndUpload);
    document.getElementById('open-folder-btn').addEventListener('click', handleOpenFolder);
    

    updateClientCasesCount();
    
    setupAutocomplete('client-name', 'client-autocomplete-results-container', getAllClients, (item) => {
        stateManager.setSelectedClientId(item ? item.id : null);
        document.getElementById('client-capacity').value = item ? item.capacity || '' : '';
        document.getElementById('client-address').value = item ? item.address || '' : '';
        document.getElementById('client-phone').value = item ? item.phone || '' : '';

        updateClientCasesCount();
    });

    setupAutocomplete('opponent-name', 'opponent-autocomplete-results-container', getAllOpponents, (item) => {
        stateManager.setSelectedOpponentId(item ? item.id : null);
        document.getElementById('opponent-capacity').value = item ? item.capacity || '' : '';
        document.getElementById('opponent-address').value = item ? item.address || '' : '';
        document.getElementById('opponent-phone').value = item ? item.phone || '' : '';
            });
    

    document.getElementById('client-name').addEventListener('input', () => {

        stateManager.setSelectedClientId(null);

        setTimeout(updateClientCasesCount, 300);
    });
}

async function handleSavePartiesOnly(e) {
    e.preventDefault();
    const form = document.getElementById('party-details-form');
    const formData = new FormData(form);
    const partyData = Object.fromEntries(formData.entries());
    

    if (!partyData.clientName || !partyData.clientName.trim()) {
        showToast('يجب إدخال اسم الموكل قبل الحفظ', 'error');
        document.getElementById('client-name').focus();
        return;
    }
    
    if (!partyData.opponentName || !partyData.opponentName.trim()) {
        showToast('يجب إدخال اسم الخصم قبل الحفظ', 'error');
        document.getElementById('opponent-name').focus();
        return;
    }
    
    stateManager.updateCaseDataStash('parties', partyData);

    try {
        const { clientId, opponentId } = await saveParties(partyData);
        stateManager.setSelectedClientId(clientId);
        stateManager.setSelectedOpponentId(opponentId);
        showToast('تم حفظ بيانات الأطراف بنجاح.');
        await updateCountersInHeader();
    } catch (error) {
        showToast('حدث خطأ أثناء حفظ بيانات الأطراف.');
    }
}

async function handleSaveAndProceedToCaseDetails(e) {
    e.preventDefault();
    const form = document.getElementById('party-details-form');
    const formData = new FormData(form);
    const partyData = Object.fromEntries(formData.entries());
    

    if (!partyData.clientName || !partyData.clientName.trim()) {
        showToast('يجب إدخال اسم الموكل قبل المتابعة', 'error');
        document.getElementById('client-name').focus();
        return;
    }
    
    if (!partyData.opponentName || !partyData.opponentName.trim()) {
        showToast('يجب إدخال اسم الخصم قبل المتابعة', 'error');
        document.getElementById('opponent-name').focus();
        return;
    }
    
    stateManager.updateCaseDataStash('parties', partyData);

    try {
        const { clientId, opponentId } = await saveParties(partyData);
        stateManager.setSelectedClientId(clientId);
        stateManager.setSelectedOpponentId(opponentId);
        

        stateManager.setCurrentCaseId(null);
        

        showToast('تم حفظ بيانات الأطراف تلقائياً.');
        await updateCountersInHeader();
        
        navigateTo(displayCaseDetailsForm);
    } catch (error) {
        showToast('حدث خطأ أثناء حفظ بيانات الأطراف.');
    }
}

async function saveParties(partyData) {
    let clientId = stateManager.selectedClientId;
    let opponentId = stateManager.selectedOpponentId;

    if (!clientId) {
        const clientData = {
            name: partyData.clientName,
            capacity: partyData.clientCapacity,
            address: partyData.clientAddress,
            phone: partyData.clientPhone,
            poaNumber: partyData.clientPoaNumber
        };
        clientId = await addClient(clientData);
    }

    if (!opponentId) {
        const opponentData = {
            name: partyData.opponentName,
            capacity: partyData.opponentCapacity,
            address: partyData.opponentAddress,
            phone: partyData.opponentPhone,
            fileNumber: partyData.fileNumber
        };
        opponentId = await addOpponent(opponentData);
    }


    let clientOpponentRelations = JSON.parse(localStorage.getItem('clientOpponentRelations') || '{}');
    if (!clientOpponentRelations[clientId]) {
        clientOpponentRelations[clientId] = [];
    }
    if (!clientOpponentRelations[clientId].includes(opponentId)) {
        clientOpponentRelations[clientId].push(opponentId);
    }
    localStorage.setItem('clientOpponentRelations', JSON.stringify(clientOpponentRelations));

    return { clientId, opponentId };
}

async function getCourtNames() {
    try {
        const cases = await getAllCases();
        return [...new Set(cases
            .map(c => c.court)
            .filter(name => name && name.trim() !== '')
        )].sort();
    } catch (error) {
        return [];
    }
}

async function loadCourtsSelect() {
    const courtNames = await getCourtNames();
    const select = document.getElementById('courtSelect');
    if (select) {
        select.innerHTML = `
            <option value="">اختر المحكمة</option>
            <option value="__custom__">إدخال يدوي...</option>
        `;
        courtNames.forEach(courtName => {
            const option = document.createElement('option');
            option.value = courtName;
            option.textContent = courtName;
            select.insertBefore(option, select.lastElementChild);
        });
    }
}

function setupCourtSelection() {
    const select = document.getElementById('courtSelect');
    const input = document.getElementById('court');
    
    if (select && input) {
        select.addEventListener('change', function() {
            if (this.value === '__custom__') {
                select.classList.add('hidden');
                input.classList.remove('hidden');
                input.focus();
                input.value = '';
            } else if (this.value !== '') {
                input.value = this.value;
            } else {
                input.value = '';
            }
        });
        
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                input.classList.add('hidden');
                select.classList.remove('hidden');
                select.value = '';
            }
        });
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                input.classList.add('hidden');
                select.classList.remove('hidden');
                select.value = '';
                input.value = '';
            }
        });
    }
}

function loadCourtData() {
    const select = document.getElementById('courtSelect');
    const input = document.getElementById('court');
    
    if (select && input) {
        const courtValue = input.value;
        if (courtValue) {
            const option = Array.from(select.options).find(opt => opt.value === courtValue);
            if (option && option.value !== '__custom__') {
                select.value = courtValue;
            } else {
                select.value = '__custom__';
                select.classList.add('hidden');
                input.classList.remove('hidden');
            }
        }
    }
}

async function displayCaseDetailsForm() {
    const pageHeaderTitle = document.getElementById('page-title');
    if (pageHeaderTitle) pageHeaderTitle.textContent = 'بيانات الدعوى الجديدة';
    document.getElementById('modal-title').textContent = '';
    const modalContent = document.getElementById('modal-content');
    modalContent.classList.remove('search-modal-content');
    modalContent.innerHTML = `
        <div class="bg-white rounded-xl pt-0 px-4 pb-4 shadow-lg">
            <form id="case-details-form" class="space-y-6" novalidate>
                <!-- الحقول الأساسية -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 p-6 bg-blue-50 backdrop-blur-sm rounded-xl shadow-md">
                    <div class="flex items-stretch">
                        <label for="court" class="px-3 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">المحكمة</label>
                        <div class="flex-1 relative -mr-px">
                            <select id="courtSelect" class="w-full h-full px-3 py-3 bg-white border-2 border-blue-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-semibold text-gray-800">
                                <option value="">اختر المحكمة</option>
                                <option value="__custom__">إدخال يدوي...</option>
                            </select>
                            <input type="text" id="court" name="court" class="w-full h-full px-3 py-3 bg-white border-2 border-blue-300 rounded-l-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right transition-colors font-semibold text-gray-800 hidden" placeholder="اكتب اسم المحكمة">
                        </div>
                    </div>
                    <div class="flex items-stretch"><label for="circuitNumber" class="px-3 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">رقم الدائرة</label><input type="text" id="circuitNumber" name="circuitNumber" class="flex-1 px-3 py-3 bg-white border-2 border-blue-300 rounded-l-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-semibold text-gray-800 -mr-px"></div>
                    <div class="flex items-stretch">
                        <label for="caseStatus" class="px-3 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">حالة القضية</label>
                        <select id="caseStatus" name="caseStatus" class="flex-1 px-3 py-3 bg-white border-2 border-blue-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-bold transition-colors -mr-px">
                            <option value="">اختر حالة القضية</option>
                            <option value="جاري النظر">جاري النظر</option>
                            <option value="محكوم فيها">محكوم فيها</option>
                            <option value="مؤجلة">مؤجلة</option>
                            <option value="منتهية">منتهية</option>
                            <option value="مستأنفة">مستأنفة</option>
                        </select>
                    </div>
                    <div class="flex items-stretch"><label for="caseType" class="px-3 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">نوع الدعوى</label><input type="text" id="caseType" name="caseType" class="flex-1 px-3 py-3 bg-white border-2 border-blue-300 rounded-l-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-semibold text-gray-800 -mr-px"></div>
                    <div class="flex items-stretch"><label for="caseSubject" class="px-3 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">موضوع الدعوى</label><input type="text" id="caseSubject" name="caseSubject" class="flex-1 px-3 py-3 bg-white border-2 border-blue-300 rounded-l-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-semibold text-gray-800 -mr-px"></div>
                    <div class="flex items-stretch">
                        <label for="caseNumber" class="px-3 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">رقم الدعوى</label>
                        <div class="flex-1 -mr-px">
                            <input type="text" id="caseNumber" name="caseNumber" class="w-full px-3 py-3 bg-white border-2 border-blue-300 rounded-l-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-semibold text-gray-800">
                            <p id="case-number-error" class="text-red-500 text-xs text-right mt-1 hidden">هذا الرقم مستخدم بالفعل لهذه السنة.</p>
                        </div>
                    </div>
                    <div class="flex items-stretch"><label for="caseYear" class="px-3 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">سنة الدعوى</label><input type="text" id="caseYear" name="caseYear" class="flex-1 px-3 py-3 bg-white border-2 border-blue-300 rounded-l-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-semibold text-gray-800 -mr-px"></div>
                    <div class="flex items-stretch"><label for="appealNumber" class="px-3 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">رقم الاستئناف</label><input type="text" id="appealNumber" name="appealNumber" class="flex-1 px-3 py-3 bg-white border-2 border-blue-300 rounded-l-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-semibold text-gray-800 -mr-px"></div>
                    <div class="flex items-stretch"><label for="appealYear" class="px-3 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">سنة الاستئناف</label><input type="text" id="appealYear" name="appealYear" class="flex-1 px-3 py-3 bg-white border-2 border-blue-300 rounded-l-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-semibold text-gray-800 -mr-px"></div>
                    <div class="flex items-stretch"><label for="cassationNumber" class="px-3 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">رقم النقض</label><input type="text" id="cassationNumber" name="cassationNumber" class="flex-1 px-3 py-3 bg-white border-2 border-blue-300 rounded-l-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-semibold text-gray-800 -mr-px"></div>
                    <div class="flex items-stretch"><label for="cassationYear" class="px-3 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">سنة النقض</label><input type="text" id="cassationYear" name="cassationYear" class="flex-1 px-3 py-3 bg-white border-2 border-blue-300 rounded-l-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-semibold text-gray-800 -mr-px"></div>
                    <div class="flex items-stretch"><label for="notes" class="px-3 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">ملاحظات</label><input type="text" id="notes" name="notes" placeholder="أضف أي ملاحظات..." class="flex-1 px-3 py-3 bg-white border-2 border-blue-300 rounded-l-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-semibold text-gray-800 -mr-px"></div>
                    <div class="flex items-stretch"><label for="fileNumber" class="px-3 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">رقم الملف</label><input type="text" id="fileNumber" name="fileNumber" class="flex-1 px-3 py-3 bg-white border-2 border-blue-300 rounded-l-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-semibold text-gray-800 -mr-px"></div>
                    <div class="flex items-stretch"><label for="poaNumber" class="px-3 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">رقم التوكيل</label><input type="text" id="poaNumber" name="poaNumber" class="flex-1 px-3 py-3 bg-white border-2 border-blue-300 rounded-l-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-semibold text-gray-800 -mr-px"></div>
                    
                    <!-- Actions Row: Save and proceed to sessions (unified) -->
                    <div class="col-span-2 flex flex-row flex-wrap items-center justify-center gap-1 pt-4">
                        <button type="button" id="manage-sessions-btn" class="flex items-center gap-4 px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-xl shadow-lg font-bold border border-blue-800">
                            <i class="ri-save-3-line"></i>
                            <span>حفظ ومتابعة للجلسات</span>
                            <span class="text-xs opacity-80">(<span id="case-session-count">0</span>)</span>
                        </button>
                    </div>
                </div>
            </form>
            
            </div>
    `;

    const form = modalContent.querySelector('#case-details-form');
    
    // إذا كان هناك قضية حالية، حمل بياناتها مباشرة
    if (stateManager.currentCaseId) {
        const existingCase = await getById('cases', stateManager.currentCaseId);
        if (existingCase) {
             for (const [key, value] of Object.entries(existingCase)) {
                if (form.elements[key]) {
                    form.elements[key].value = value || '';
                }
            }
        }
    } else if (stateManager.caseDataStash.caseDetails) {
        // إذا لم تكن هناك قضية حالية، استخدم البيانات من الـ stash
        for (const [key, value] of Object.entries(stateManager.caseDataStash.caseDetails)) {
             if (form.elements[key]) {
                form.elements[key].value = value;
            }
        }
    }
    
    // Auto-fill POA number from parties data if available and field is empty
    if (stateManager.caseDataStash.parties && stateManager.caseDataStash.parties.clientPoaNumber) {
        const poaNumberField = document.getElementById('poaNumber');
        if (poaNumberField && !poaNumberField.value) {
            poaNumberField.value = stateManager.caseDataStash.parties.clientPoaNumber;
        }
    }
    
    // تحميل الجلسات فقط إذا كان هناك قضية حالية
    let sessions = [];
    if (stateManager.currentCaseId) {
        sessions = await getFromIndex('sessions', 'caseId', stateManager.currentCaseId);
    }
    document.getElementById('case-session-count').textContent = sessions.length;

    document.getElementById('manage-sessions-btn').addEventListener('click', async () => {
        // إذا لم تكن القضية محفوظة، احفظها تلقائياً
        if (!stateManager.currentCaseId) {
            const form = document.getElementById('case-details-form');
            const formData = new FormData(form);
            const caseData = Object.fromEntries(formData.entries());
            
            // التحقق من وجود أي بيانات في أي حقل
            const hasAnyData = Object.values(caseData).some(value => value && value.trim() !== '');
            
            if (!hasAnyData) {
                showToast('يجب إدخال بيانات في أي حقل على الأقل قبل إدارة الجلسات', 'error');
                return;
            }
            
            stateManager.updateCaseDataStash('caseDetails', caseData);

            const caseNumber = caseData.caseNumber?.trim();
            const caseYear = caseData.caseYear?.trim();

            if (caseNumber && caseYear) {
                const existing = await getFromIndex('cases', 'caseNumberYear', [caseNumber, caseYear]);
                if (existing.length > 0) {
                    showToast('خطأ: قضية بنفس الرقم والسنة موجودة بالفعل.');
                    return;
                }
            }

            try {
                const fullCaseData = {
                    ...caseData,
                    clientId: stateManager.selectedClientId,
                    opponentId: stateManager.selectedOpponentId
                };

                const caseId = await addCase(fullCaseData);
                stateManager.setCurrentCaseId(caseId);
                showToast('تم حفظ بيانات الدعوى تلقائياً.');
                await updateCountersInHeader();
            } catch (error) {
                if (error.message.includes('ConstraintError')) {
                    showToast('خطأ: قضية بنفس الرقم والسنة موجودة بالفعل.');
                } else {
                    showToast('حدث خطأ أثناء حفظ بيانات الدعوى.');
                }
                return;
            }
        }
        
        const currentSessions = await getFromIndex('sessions', 'caseId', stateManager.currentCaseId);
        if (currentSessions.length === 0) {
            navigateTo(displaySessionForm, null, null);
            // لا تحدّث العنوان هنا، سيتم ضبطه تلقائياً داخل displaySessionForm/navigateTo
        } else {
            navigateTo(displaySessionList);
            // لا تحدّث العنوان هنا، سيتم ضبطه تلقائياً داخل displaySessionList/navigateTo
        }
    });
    
    // تحديد نوع العملية (إضافة أم تحديث)
    if (stateManager.currentCaseId) {
        document.getElementById('case-details-form').addEventListener('submit', handleUpdateCaseDetails);
    } else {
        document.getElementById('case-details-form').addEventListener('submit', handleSaveCaseDetails);
    }

    const caseNumberInput = document.getElementById('caseNumber');
    const caseYearInput = document.getElementById('caseYear');
    const caseNumberError = document.getElementById('case-number-error');
    caseNumberInput.addEventListener('input', () => validateCaseNumber(caseNumberInput, caseYearInput, caseNumberError));
    caseYearInput.addEventListener('input', () => validateCaseNumber(caseNumberInput, caseYearInput, caseNumberError));
    
    setTimeout(async () => {
        await loadCourtsSelect();
        setupCourtSelection();
        loadCourtData();
    }, 100);
}

async function handleUpdateCaseDetails(e) {
    e.preventDefault();
    if (!stateManager.currentCaseId) {
        showToast("خطأ: لا يوجد قضية حالية للحفظ.");
        return;
    }
    
    const form = e.target;
    const formData = new FormData(form);
    const updatedData = Object.fromEntries(formData.entries());
    stateManager.updateCaseDataStash('caseDetails', updatedData);

    const caseNumber = updatedData.caseNumber?.trim();
    const caseYear = updatedData.caseYear?.trim();

    if (caseNumber && caseYear) {
        const matchingCases = await getFromIndex('cases', 'caseNumberYear', [caseNumber, caseYear]);
        if (matchingCases.length > 0 && matchingCases[0].id !== stateManager.currentCaseId) {
            showToast('خطأ: قضية بنفس الرقم والسنة موجودة بالفعل.');
            return;
        }
    }

    try {
        const existingCase = await getById('cases', stateManager.currentCaseId);
        const updatedRecord = { ...existingCase, ...updatedData, subject: updatedData.caseSubject };
        
        await updateRecord('cases', stateManager.currentCaseId, updatedRecord);
        showToast('تم حفظ بيانات الدعوى بنجاح.');
        await updateCountersInHeader();
    } catch (error) {
        showToast('حدث خطأ أثناء تحديث بيانات الدعوى.');
    }
}

async function validateCaseNumber(numberInput, yearInput, errorElement) {
    const number = numberInput.value.trim();
    const year = yearInput.value.trim();
    if (number && year) {
        const existing = await getFromIndex('cases', 'caseNumberYear', [number, year]);
        if (existing.length > 0 && existing[0].id !== stateManager.currentCaseId) {
            errorElement.classList.remove('hidden');
        } else {
            errorElement.classList.add('hidden');
        }
    } else {
        errorElement.classList.add('hidden');
    }
}

async function handleSaveCaseDetails(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const caseData = Object.fromEntries(formData.entries());
    
    // التحقق من وجود أي بيانات في أي حقل
    const hasAnyData = Object.values(caseData).some(value => value && value.trim() !== '');
    
    if (!hasAnyData) {
        showToast('يجب إدخال بيانات في أي حقل على الأقل قبل الحفظ', 'error');
        return;
    }
    
    stateManager.updateCaseDataStash('caseDetails', caseData);

    const caseNumber = caseData.caseNumber?.trim();
    const caseYear = caseData.caseYear?.trim();

    if (caseNumber && caseYear) {
        const existing = await getFromIndex('cases', 'caseNumberYear', [caseNumber, caseYear]);
        if (existing.length > 0) {
            showToast('خطأ: قضية بنفس الرقم والسنة موجودة بالفعل.');
            return;
        }
    }

    try {
        const fullCaseData = {
            ...caseData,
            subject: caseData.caseSubject,
            clientId: stateManager.selectedClientId,
            opponentId: stateManager.selectedOpponentId
        };

        const caseId = await addCase(fullCaseData);
        stateManager.setCurrentCaseId(caseId);
        showToast('تم حفظ بيانات الدعوى بنجاح.');
        await updateCountersInHeader();
        
        // إعادة تحميل النافذة لتظهر كتعديل بدلاً من إضافة
        navigateTo(displayCaseDetailsForm);
    } catch (error) {
        if (error.message.includes('ConstraintError')) {
            showToast('خطأ: قضية بنفس الرقم والسنة موجودة بالفعل.');
        } else {
            showToast('حدث خطأ أثناء إدخال بيانات الدعوى.');
        }
    }
}

// دالة تحديث عدد القضايا المرتبطة بالموكل
async function updateClientCasesCount() {
    const countElement = document.getElementById('client-cases-count');
    if (!countElement) return;
    
    try {
        let casesCount = 0;
        
        // إذا كان هناك موكل محدد، احسب قضاياه
        if (stateManager.selectedClientId) {
            const cases = await getFromIndex('cases', 'clientId', stateManager.selectedClientId);
            casesCount = cases.length;
        } else {
            // إذا لم يكن هناك موكل محدد، ابحث بالاسم
            const clientNameInput = document.getElementById('client-name');
            if (clientNameInput && clientNameInput.value.trim()) {
                const allClients = await getAllClients();
                const matchingClient = allClients.find(client => 
                    client.name && client.name.trim().toLowerCase() === clientNameInput.value.trim().toLowerCase()
                );
                if (matchingClient) {
                    const cases = await getFromIndex('cases', 'clientId', matchingClient.id);
                    casesCount = cases.length;
                }
            }
        }
        
        countElement.textContent = casesCount;
    } catch (error) {
        countElement.textContent = '0';
    }
}

// File management functions
async function handleCreateFolderAndUpload() {
    const clientNameInput = document.getElementById('client-name');
    const clientName = clientNameInput ? clientNameInput.value.trim() : '';
    
    if (!clientName) {
        showToast('يجب إدخال اسم الموكل أولاً', 'error');
        if (clientNameInput) {
            clientNameInput.focus();
        }
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
        showToast('حدث خطأ في إنشاء المجلد', 'error');
    }
}

async function handleOpenFolder() {
    const clientNameInput = document.getElementById('client-name');
    const clientName = clientNameInput ? clientNameInput.value.trim() : '';
    
    if (!clientName) {
        showToast('يجب إدخال اسم الموكل أولاً', 'error');
        if (clientNameInput) {
            clientNameInput.focus();
        }
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
        showToast('حدث خطأ في فتح المجلد', 'error');
    }
}