// Party Details Form HTML
const partyDetailsFormHTML = `
<form id="party-details-form" class="space-y-6 min-h-[calc(100vh-48px)]">
    <div class="flex flex-row items-center gap-6">
        <div class="flex-1 p-6 border-2 border-blue-300 rounded-xl bg-blue-100 shadow-sm">
             <h3 class="text-lg font-bold text-blue-800 mb-4 flex items-center justify-center gap-2"><i class="ri-user-3-line"></i><span>بيانات الموكل</span></h3>
            <div class="space-y-3">
                <div class="autocomplete-container">
                    <div class="flex items-stretch">
                        <label for="client-name" class="px-4 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-32 md:w-36 text-right rounded-r-lg">اسم الموكل</label>
                        <input type="text" id="client-name" name="clientName" required autocomplete="off" class="flex-1 px-4 py-3 bg-white border-2 border-blue-300 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-600 text-right font-semibold text-gray-900 -mr-px min-h-[48px]">
                    </div>
                    <div id="client-autocomplete-results-container" class="autocomplete-results hidden"></div>
                </div>
                <div class="flex items-stretch">
                    <label for="client-capacity" class="px-4 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-32 md:w-36 text-right rounded-r-lg">صفته</label>
                    <input type="text" id="client-capacity" name="clientCapacity" class="flex-1 px-4 py-3 bg-white border-2 border-blue-300 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-600 text-right font-semibold text-gray-900 -mr-px min-h-[48px]">
                </div>
                <div class="flex items-stretch">
                    <label for="client-address" class="px-4 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-32 md:w-36 text-right rounded-r-lg">عنوانه</label>
                    <input type="text" id="client-address" name="clientAddress" class="flex-1 px-4 py-3 bg-white border-2 border-blue-300 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-600 text-right font-semibold text-gray-900 -mr-px min-h-[48px]">
                </div>
                <div class="flex items-stretch">
                    <label for="client-phone" class="px-4 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-32 md:w-36 text-right rounded-r-lg">الهاتف</label>
                    <input type="text" id="client-phone" name="clientPhone" class="flex-1 px-4 py-3 bg-white border-2 border-blue-300 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-600 text-right font-semibold text-gray-900 -mr-px min-h-[48px]">
                </div>
                <div class="flex items-stretch">
                    <label for="client-poa-number" class="px-4 py-3 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-gray-700 shrink-0 w-32 md:w-36 text-right rounded-r-lg">رقم التوكيل</label>
                    <input type="text" id="client-poa-number" name="clientPoaNumber" class="flex-1 px-4 py-3 bg-white border-2 border-blue-300 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-600 text-right font-semibold text-gray-900 -mr-px min-h-[48px]">
                </div>
            </div>
        </div>
        <div class="flex items-center justify-center"><span class="text-sm md:text-base font-bold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">ضد</span></div>
        <div class="flex-1 p-6 border-2 border-red-300 rounded-xl bg-red-50 shadow-sm">
             <h3 class="text-lg font-bold text-red-800 mb-4 flex items-center justify-center gap-2"><i class="ri-shield-user-line"></i><span>بيانات الخصم</span></h3>
            <div class="space-y-3">
                <div class="autocomplete-container">
                    <div class="flex items-stretch">
                        <label for="opponent-name" class="px-4 py-3 border-2 border-red-200 bg-red-50 text-sm font-bold text-gray-700 shrink-0 w-32 md:w-36 text-right rounded-r-lg">اسم الخصم</label>
                        <input type="text" id="opponent-name" name="opponentName" required autocomplete="off" class="flex-1 px-4 py-3 bg-white border-2 border-red-200 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-red-400 text-right font-semibold text-gray-900 -mr-px min-h-[48px]">
                    </div>
                    <div id="opponent-autocomplete-results-container" class="autocomplete-results hidden"></div>
                </div>
                <div class="flex items-stretch">
                    <label for="opponent-capacity" class="px-4 py-3 border-2 border-red-200 bg-red-50 text-sm font-bold text-gray-700 shrink-0 w-32 md:w-36 text-right rounded-r-lg">صفته</label>
                    <input type="text" id="opponent-capacity" name="opponentCapacity" class="flex-1 px-4 py-3 bg-white border-2 border-red-200 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-red-400 text-right font-semibold text-gray-900 -mr-px min-h-[48px]">
                </div>
                <div class="flex items-stretch">
                    <label for="opponent-address" class="px-4 py-3 border-2 border-red-200 bg-red-50 text-sm font-bold text-gray-700 shrink-0 w-32 md:w-36 text-right rounded-r-lg">عنوانه</label>
                    <input type="text" id="opponent-address" name="opponentAddress" class="flex-1 px-4 py-3 bg-white border-2 border-red-200 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-red-400 text-right font-semibold text-gray-900 -mr-px min-h-[48px]">
                </div>
                <div class="flex items-stretch">
                    <label for="opponent-phone" class="px-4 py-3 border-2 border-red-200 bg-red-50 text-sm font-bold text-gray-700 shrink-0 w-32 md:w-36 text-right rounded-r-lg">الهاتف</label>
                    <input type="text" id="opponent-phone" name="opponentPhone" class="flex-1 px-4 py-3 bg-white border-2 border-red-200 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-red-400 text-right font-semibold text-gray-900 -mr-px min-h-[48px]">
                </div>
                <div class="flex items-stretch">
                    <label for="file-number" class="px-4 py-3 border-2 border-red-200 bg-red-50 text-sm font-bold text-gray-700 shrink-0 w-32 md:w-36 text-right rounded-r-lg">رقم الملف</label>
                    <input type="text" id="file-number" name="fileNumber" class="flex-1 px-4 py-3 bg-white border-2 border-red-200 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-red-400 text-right font-semibold text-gray-900 -mr-px min-h-[48px]">
                </div>
            </div>
        </div>
    </div>
    <div id="party-details-actions" class="flex flex-col items-center gap-3 p-4 mt-3 mb-6 bg-blue-50 border-2 border-blue-300 rounded-xl shadow-md">
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
        <div class="text-xs text-gray-500">
            (<span id="client-cases-count">0</span> قضية محفوظة)
        </div>
    </div>
</form>
`;

document.addEventListener('DOMContentLoaded', async function() {
    try {
        await initDB();
        loadPartyDetailsForm();
        setupBackButton();
        setupModalClose();
    } catch (error) {
        console.error('Error initializing new case page:', error);
        if (typeof showToast === 'function') {
            showToast('حدث خطأ في تهيئة الصفحة', 'error');
        } else {
            alert('حدث خطأ في تهيئة الصفحة: ' + error.message);
        }
    }
});

function loadPartyDetailsForm() {
    const container = document.getElementById('party-form-container');
    if (!container) return;
    
    container.innerHTML = partyDetailsFormHTML;

    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.textContent = 'إدخال بيانات الأطراف';

    const form = document.getElementById('party-details-form');
    
    // Fill data from stash first
    if (stateManager.caseDataStash.parties) {
        for (const [key, value] of Object.entries(stateManager.caseDataStash.parties)) {
            if (form.elements[key]) {
                form.elements[key].value = value;
            }
        }
    }
    
    // If there's a pre-selected client, load their data
    if (stateManager.selectedClientId && !stateManager.caseDataStash.parties?.clientName) {
        loadSelectedClientData();
    }
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup autocomplete
    setupAutocompleteFields();
    
    // Update client cases count
    updateClientCasesCount();
}

async function loadSelectedClientData() {
    try {
        const clientData = await getById('clients', stateManager.selectedClientId);
        if (clientData) {
            document.getElementById('client-name').value = clientData.name || '';
            document.getElementById('client-capacity').value = clientData.capacity || '';
            document.getElementById('client-address').value = clientData.address || '';
            document.getElementById('client-phone').value = clientData.phone || '';
            document.getElementById('client-poa-number').value = clientData.poaNumber || '';
        }
    } catch (error) {
        console.error('Error loading client data:', error);
    }
}

function setupEventListeners() {
    // Unified Save & Proceed button
    document.getElementById('next-to-case-details-btn').addEventListener('click', handleSaveAndProceedToCaseDetails);
    
    // File management buttons
    document.getElementById('create-folder-btn').addEventListener('click', handleCreateFolderAndUpload);
    document.getElementById('open-folder-btn').addEventListener('click', handleOpenFolder);
    
    // Update client cases count when typing client name manually
    document.getElementById('client-name').addEventListener('input', () => {
        // Reset selected client ID when typing manually
        stateManager.setSelectedClientId(null);
        // Update counter after short delay
        setTimeout(updateClientCasesCount, 300);
    });
}

function setupAutocompleteFields() {
    // Client autocomplete
    setupAutocomplete('client-name', 'client-autocomplete-results-container', getAllClients, (item) => {
        stateManager.setSelectedClientId(item ? item.id : null);
        document.getElementById('client-capacity').value = item ? item.capacity || '' : '';
        document.getElementById('client-address').value = item ? item.address || '' : '';
        document.getElementById('client-phone').value = item ? item.phone || '' : '';
        document.getElementById('client-poa-number').value = item ? item.poaNumber || '' : '';
        // Update cases count when client changes
        updateClientCasesCount();
    });

    // Opponent autocomplete
    setupAutocomplete('opponent-name', 'opponent-autocomplete-results-container', getAllOpponents, (item) => {
        stateManager.setSelectedOpponentId(item ? item.id : null);
        document.getElementById('opponent-capacity').value = item ? item.capacity || '' : '';
        document.getElementById('opponent-address').value = item ? item.address || '' : '';
        document.getElementById('opponent-phone').value = item ? item.phone || '' : '';
        document.getElementById('file-number').value = item ? item.fileNumber || '' : '';
    });
}

function setupBackButton() {
    const backButton = document.getElementById('back-to-main');
    if (backButton) {
        backButton.addEventListener('click', (e) => {
            const embedded = document.getElementById('embedded-content');
            const hasEmbeddedView = embedded && embedded.childElementCount > 0;
            const caseForm = embedded ? embedded.querySelector('#case-details-form') : null;
            const sessionForm = embedded ? embedded.querySelector('#session-form') : null;
            const sessionList = embedded ? embedded.querySelector('#session-list-container') : null;

            // لو في شاشة الجلسات (فورم أو قائمة)، ارجع ل"ادخال بيانات الدعوى الجديدة"
            if (sessionForm || sessionList) {
                e.preventDefault();
                if (typeof displayCaseDetailsForm === 'function') {
                    navigateTo(displayCaseDetailsForm);
                    const titleEl = document.getElementById('page-title');
                    if (titleEl) titleEl.textContent = 'إدخال بيانات الدعوى';
                } else {
                    if (embedded) embedded.innerHTML = '';
                    const titleEl = document.getElementById('page-title');
                    if (titleEl) titleEl.textContent = 'إدخال بيانات الدعوى';
                }
                return;
            }

            // لو في شاشة "ادخال بيانات الدعوى" (case-details-form) ارجع ل"ادخال بيانات ا��أطراف"
            if (caseForm) {
                e.preventDefault();
                const partyContainer = document.getElementById('party-form-container');
                if (partyContainer) partyContainer.classList.remove('hidden');
                if (embedded) embedded.innerHTML = '';
                const pageTitleEl = document.getElementById('page-title');
                if (pageTitleEl) pageTitleEl.textContent = 'إدخال بيانات الأطراف';
                return;
            }

            // لو في أي محتوى مدمج آخر، امسحه
            if (hasEmbeddedView) {
                e.preventDefault();
                if (embedded) embedded.innerHTML = '';
                return;
            }

            // لا يوجد محتوى مدمج: الرجوع للصفحة الرئيسية
            window.location.href = 'index.html';
        });
    }
}

function setupModalClose() {
    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('modal-close-button');
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                navigateBack();
            }
        });
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', navigateBack);
    }
}

async function handleSavePartiesOnly(e) {
    e.preventDefault();
    const form = document.getElementById('party-details-form');
    const formData = new FormData(form);
    const partyData = Object.fromEntries(formData.entries());
    
    // Validate required fields
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
        // Update client cases count after saving
        updateClientCasesCount();
    } catch (error) {
        showToast('حدث خطأ أثناء حفظ بيانات الأطراف.');
    }
}

async function handleSaveAndProceedToCaseDetails(e) {
    e.preventDefault();
    const form = document.getElementById('party-details-form');
    const formData = new FormData(form);
    const partyData = Object.fromEntries(formData.entries());
    
    // Validate required fields
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
        
        // Reset case ID to ensure creating new case
        stateManager.setCurrentCaseId(null);
        
        // Show auto-save confirmation message
        showToast('تم حفظ بيانات الأطراف تلقائياً.');
        
        // Navigate to case details
        const partyContainer = document.getElementById('party-form-container');
        if (partyContainer) partyContainer.classList.add('hidden');
        displayCaseDetailsForm();
        
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

    // Save client-opponent relationship in local storage temporarily
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

async function updateClientCasesCount() {
    try {
        const clientNameInput = document.getElementById('client-name');
        const countElement = document.getElementById('client-cases-count');
        
        if (!clientNameInput || !countElement) return;
        
        const clientName = clientNameInput.value.trim();
        if (!clientName) {
            countElement.textContent = '0';
            return;
        }
        
        const cases = await getAllCases();
        const clientCases = cases.filter(c => 
            c.clientName && c.clientName.toLowerCase().includes(clientName.toLowerCase())
        );
        
        countElement.textContent = clientCases.length.toString();
    } catch (error) {
        console.error('Error updating client cases count:', error);
        const countElement = document.getElementById('client-cases-count');
        if (countElement) {
            countElement.textContent = '0';
        }
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
        console.error('Error creating folder:', error);
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
        console.error('Error opening folder:', error);
        showToast('حدث خطأ في فتح المجلد', 'error');
    }
}

// Header helpers for new.html
function setHeaderAsBack() {
    const btn = document.getElementById('back-to-main');
    if (!btn) return;
    const icon = btn.querySelector('i');
    const span = btn.querySelector('span');
    if (icon) {
        icon.className = 'ri-arrow-go-back-line text-blue-600 text-lg';
    }
    if (span) span.textContent = 'رجوع';
}
function setHeaderAsHome() {
    const btn = document.getElementById('back-to-main');
    if (!btn) return;
    const icon = btn.querySelector('i');
    const span = btn.querySelector('span');
    if (icon) {
        icon.className = 'ri-home-5-line text-blue-600 text-lg';
    }
    if (span) span.textContent = 'الرئيسيه';
}

// Case Details Form Functions
async function displayCaseDetailsForm() {
    // نافذة الإدخال فقط (للدعاوى الجديدة)
    const embedded = document.getElementById('embedded-content');
    const targetContainer = embedded || document.getElementById('modal-content');
    if (targetContainer) {
        const titleEl = document.getElementById('modal-title');
        if (titleEl) titleEl.textContent = '';
        targetContainer.classList.remove('search-modal-content');
        if (typeof setHeaderAsBack === 'function') setHeaderAsBack();
    }
    const pageHeaderTitle = document.getElementById('page-title');
    if (pageHeaderTitle) pageHeaderTitle.textContent = 'بيانات الدعوى الجديدة';
    setHeaderAsBack();
    if (!targetContainer) return;
    targetContainer.innerHTML = `
        <div class="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-300">
            <form id="case-details-form" class="space-y-6" novalidate>
                <!-- Basic Fields -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 p-6 bg-blue-50 backdrop-blur-sm rounded-xl border-2 border-blue-300 shadow-md">
                    <div class="flex items-stretch">
                        <label for="court" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">المحكمة</label>
                        <div class="flex-1 relative -mr-px">
                            <select id="courtSelect" class="w-full h-full px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg focus:ring-0 focus:border-blue-700 text-right font-semibold text-gray-800">
                                <option value="">اختر المحكمة</option>
                                <option value="__custom__">إدخال يدوي...</option>
                            </select>
                            <input type="text" id="court" name="court" class="w-full h-full px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-700 text-right transition-colors font-semibold text-gray-800 hidden" placeholder="اكتب اسم ال��حكمة">
                        </div>
                    </div>
                    <div class="flex items-stretch">
                        <label for="caseStatus" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg flex items-center gap-2">
                            <i class="ri-pulse-line text-blue-600"></i>
                            <span>حالة القضية</span>
                        </label>
                        <select id="caseStatus" name="caseStatus" class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg focus:ring-0 focus:border-blue-700 text-right font-bold transition-colors -mr-px">
                            <option value="">اختر حالة القضية</option>
                            <option value="جاري النظر">جاري النظر</option>
                            <option value="محكوم فيها">محكوم فيها</option>
                            <option value="مؤجلة">مؤجلة</option>
                            <option value="منتهية">منتهية</option>
                            <option value="مستأنفة">مستأنفة</option>
                        </select>
                    </div>
                    <div class="flex items-stretch"><label for="caseType" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">نوع الدعوى</label><input type="text" id="caseType" name="caseType" class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-700 text-right font-semibold text-gray-800 -mr-px"></div>
                    <div class="flex items-stretch"><label for="caseSubject" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">موضوع الدعوى</label><input type="text" id="caseSubject" name="caseSubject" class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-700 text-right font-semibold text-gray-800 -mr-px"></div>
                    <div class="flex items-stretch">
                        <label for="caseNumber" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">رقم الدعوى</label>
                        <div class="flex-1 -mr-px">
                            <input type="text" id="caseNumber" name="caseNumber" class="w-full px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-700 text-right font-semibold text-gray-800">
                            <p id="case-number-error" class="text-red-500 text-xs text-right mt-1 hidden">هذا الرقم مستخدم بالفعل لهذه السنة.</p>
                        </div>
                    </div>
                    <div class="flex items-stretch"><label for="caseYear" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">سنة الدعوى</label><input type="text" id="caseYear" name="caseYear" class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-700 text-right font-semibold text-gray-800 -mr-px"></div>
                    <div class="flex items-stretch"><label for="appealNumber" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">رقم الاستئناف</label><input type="text" id="appealNumber" name="appealNumber" class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-700 text-right font-semibold text-gray-800 -mr-px"></div>
                    <div class="flex items-stretch"><label for="appealYear" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">سنة الاستئناف</label><input type="text" id="appealYear" name="appealYear" class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-700 text-right font-semibold text-gray-800 -mr-px"></div>
                    <div class="flex items-stretch"><label for="cassationNumber" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">رقم النقض</label><input type="text" id="cassationNumber" name="cassationNumber" class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-700 text-right font-semibold text-gray-800 -mr-px"></div>
                    <div class="flex items-stretch"><label for="cassationYear" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">سنة النقض</label><input type="text" id="cassationYear" name="cassationYear" class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-700 text-right font-semibold text-gray-800 -mr-px"></div>
                    <div class="flex items-stretch"><label for="notes" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">ملاحظات</label><input type="text" id="notes" name="notes" placeholder="أضف أي ملاحظات..." class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-700 text-right font-semibold text-gray-800 -mr-px"></div>
                    <div class="flex items-stretch"><label for="poaNumber" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">رقم التوكيل</label><input type="text" id="poaNumber" name="poaNumber" class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-700 text-right font-semibold text-gray-800 -mr-px"></div>
                    
                    <!-- Actions Row: Save and proceed to sessions -->
                    <div class="col-span-2 flex flex-row flex-wrap items-center justify-center gap-1 pt-4">
                        <button type="button" id="manage-sessions-btn" class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-semibold">
                            <i class="ri-save-3-line"></i>
                            <span>حفظ ومتابعة للجلسات</span>
                            <span class="text-xs opacity-80">(<span id="case-session-count">0</span>)</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `;

    const form = (typeof targetContainer !== 'undefined' ? targetContainer : document).querySelector('#case-details-form');
    
    // If there's a current case, load its data directly
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
        // If there's no current case, use data from stash
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
    
    // Load sessions only if there's a current case
    let sessions = [];
    if (stateManager.currentCaseId) {
        sessions = await getFromIndex('sessions', 'caseId', stateManager.currentCaseId);
    }
    const caseSessionCountEl = document.getElementById('case-session-count'); if (caseSessionCountEl) caseSessionCountEl.textContent = sessions.length;

    const manageBtn = (typeof targetContainer !== 'undefined' ? targetContainer : document).querySelector('#manage-sessions-btn');
    if (manageBtn) manageBtn.addEventListener('click', async () => {
        const form = document.getElementById('case-details-form');
        const formData = new FormData(form);
        const caseData = Object.fromEntries(formData.entries());

        const hasAnyData = Object.values(caseData).some(value => value && value.trim() !== '');
        if (!hasAnyData) {
            showToast('يجب إدخال بيانات في أي حقل على الأقل قبل المتابعة', 'error');
            return;
        }

        stateManager.updateCaseDataStash('caseDetails', caseData);

        const caseNumber = caseData.caseNumber?.trim();
        const caseYear = caseData.caseYear?.trim();

        try {
            if (stateManager.currentCaseId) {
                if (caseNumber && caseYear) {
                    const matchingCases = await getFromIndex('cases', 'caseNumberYear', [caseNumber, caseYear]);
                    if (matchingCases.length > 0 && matchingCases[0].id !== stateManager.currentCaseId) {
                        showToast('خطأ: قضية بنفس الرقم والسنة موجودة بالفعل.');
                        return;
                    }
                }
                const existingCase = await getById('cases', stateManager.currentCaseId);
                const updatedRecord = { ...existingCase, ...caseData };
                await updateRecord('cases', stateManager.currentCaseId, updatedRecord);
                showToast('تم حفظ بيانات الدعوى بنجاح.');
                await updateCountersInHeader();
            } else {
                if (caseNumber && caseYear) {
                    const existing = await getFromIndex('cases', 'caseNumberYear', [caseNumber, caseYear]);
                    if (existing.length > 0) {
                        showToast('خطأ: قضية بنفس الرقم والسنة موجودة بالفعل.');
                        return;
                    }
                }
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
            }
        } catch (error) {
            if (error.message && error.message.includes('ConstraintError')) {
                showToast('خطأ: قضية بنفس الرقم والسنة موجودة بالفعل.');
            } else {
                showToast('حدث خطأ أثناء حفظ بيانات الدعوى.');
            }
            return;
        }

        navigateTo(displaySessionForm, null, null);
    });
    
    // Determine operation type (add or update)
    if (stateManager.currentCaseId) {
        const caseForm = (typeof targetContainer !== 'undefined' ? targetContainer : document).querySelector('#case-details-form');
        if (caseForm) caseForm.addEventListener('submit', handleUpdateCaseDetails);
    } else {
        const caseForm = (typeof targetContainer !== 'undefined' ? targetContainer : document).querySelector('#case-details-form');
        if (caseForm) caseForm.addEventListener('submit', handleSaveCaseDetails);
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

async function getCourtNames() {
    try {
        const cases = await getAllCases();
        return [...new Set(cases
            .map(c => c.court)
            .filter(name => name && name.trim() !== '')
        )].sort();
    } catch (error) {
        console.error('خطأ في جلب أسماء المحاكم:', error);
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
        const updatedRecord = { ...existingCase, ...updatedData };
        
        await updateRecord('cases', stateManager.currentCaseId, updatedRecord);
        showToast('تم حفظ بيانات الدعوى بنجاح.');
        await updateCountersInHeader();
    } catch (error) {
        console.error('Error updating case:', error);
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
    
    // Check if there's any data in any field
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
        
        // Reload the window to show as edit instead of add
        navigateTo(displayCaseDetailsForm);
    } catch (error) {
        if (error.message.includes('ConstraintError')) {
            showToast('خطأ: قضية بنفس الرقم والسنة موجودة بالفعل.');
        } else {
            showToast('حدث خطأ أثناء إدخال بيانات الدعوى.');
        }
    }
}

// Modal functions
function openModalWithView(viewFunction, ...args) {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('hidden');
        viewFunction(...args);
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function navigateTo(viewFunction, ...args) {
    viewFunction(...args);
}