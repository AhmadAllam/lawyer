
async function displayCaseEditForm(caseId) {
    try {
        const caseData = await getById('cases', caseId);
        if (!caseData) {
            showToast('لم يتم العثور على بيانات القضية', 'error');
            return;
        }

        const modalTitleEl = document.getElementById('modal-title');
        if (modalTitleEl) modalTitleEl.textContent = '';
        const modalContent = document.getElementById('modal-content');
        modalContent.classList.remove('search-modal-content');
        
        modalContent.innerHTML = `
            <div class="bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl p-6 shadow-lg border border-green-300">
                <form id="edit-case-form" class="space-y-6" novalidate>
                    <input type="hidden" id="edit-case-id" value="${caseId}">
                    
                    <!-- الحقول الأساسية -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-green-200 shadow-md">
                        <div>
                            <label for="edit-court" class="block text-sm font-semibold text-gray-700 text-right">المحكمة</label>
                            <input type="text" id="edit-court" name="court" value="${caseData.court || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-green-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right font-semibold text-gray-800">
                        </div>
                        <div>
                            <label for="edit-caseStatus" class="block text-sm font-semibold text-gray-700 text-right">حالة القضية</label>
                            <select id="edit-caseStatus" name="caseStatus" class="mt-1 block w-full p-3 bg-white border-2 border-green-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right font-bold">
                                <option value="">اختر حالة القضية</option>
                                <option value="جاري النظر" ${caseData.caseStatus === 'جاري النظر' ? 'selected' : ''}>جاري النظر</option>
                                <option value="محكوم فيها" ${caseData.caseStatus === 'محكوم فيها' ? 'selected' : ''}>محكوم فيها</option>
                                <option value="مؤجلة" ${caseData.caseStatus === 'مؤجلة' ? 'selected' : ''}>مؤجلة</option>
                                <option value="منتهية" ${caseData.caseStatus === 'منتهية' ? 'selected' : ''}>منتهية</option>
                                <option value="مستأنفة" ${caseData.caseStatus === 'مستأنفة' ? 'selected' : ''}>مستأنفة</option>
                            </select>
                        </div>
                        <div>
                            <label for="edit-caseType" class="block text-sm font-semibold text-gray-700 text-right">نوع الدعوى</label>
                            <input type="text" id="edit-caseType" name="caseType" value="${caseData.caseType || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-green-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right font-semibold text-gray-800">
                        </div>
                        <div>
                            <label for="edit-caseSubject" class="block text-sm font-semibold text-gray-700 text-right">موضوع الدعوى</label>
                            <input type="text" id="edit-caseSubject" name="caseSubject" value="${caseData.caseSubject || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-green-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right font-semibold text-gray-800">
                        </div>
                        <div>
                            <label for="edit-caseNumber" class="block text-sm font-semibold text-gray-700 text-right">رقم الدعوى</label>
                            <input type="text" id="edit-caseNumber" name="caseNumber" value="${caseData.caseNumber || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-green-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right font-semibold text-gray-800">
                        </div>
                        <div>
                            <label for="edit-caseYear" class="block text-sm font-semibold text-gray-700 text-right">سنة الدعوى</label>
                            <input type="text" id="edit-caseYear" name="caseYear" value="${caseData.caseYear || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-green-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right font-semibold text-gray-800">
                        </div>
                        <div>
                            <label for="edit-appealNumber" class="block text-sm font-semibold text-gray-700 text-right">رقم الاستئناف</label>
                            <input type="text" id="edit-appealNumber" name="appealNumber" value="${caseData.appealNumber || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-green-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right font-semibold text-gray-800">
                        </div>
                        <div>
                            <label for="edit-appealYear" class="block text-sm font-semibold text-gray-700 text-right">سنة الاستئناف</label>
                            <input type="text" id="edit-appealYear" name="appealYear" value="${caseData.appealYear || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-green-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right font-semibold text-gray-800">
                        </div>
                        <div>
                            <label for="edit-cassationNumber" class="block text-sm font-semibold text-gray-700 text-right">رقم النقض</label>
                            <input type="text" id="edit-cassationNumber" name="cassationNumber" value="${caseData.cassationNumber || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-green-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right font-semibold text-gray-800">
                        </div>
                        <div>
                            <label for="edit-cassationYear" class="block text-sm font-semibold text-gray-700 text-right">سنة النقض</label>
                            <input type="text" id="edit-cassationYear" name="cassationYear" value="${caseData.cassationYear || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-green-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right font-semibold text-gray-800">
                        </div>
                        <div>
                            <label for="edit-notes" class="block text-sm font-semibold text-gray-700 text-right">ملاحظات</label>
                            <input type="text" id="edit-notes" name="notes" value="${caseData.notes || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-green-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right font-semibold text-gray-800">
                        </div>
                        <div>
                            <label for="edit-poaNumber" class="block text-sm font-semibold text-gray-700 text-right">رقم التوكيل</label>
                            <input type="text" id="edit-poaNumber" name="poaNumber" value="${caseData.poaNumber || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-green-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right font-semibold text-gray-800">
                        </div>
                    </div>

                    <!-- أزرار التحكم -->
                    <div class="flex gap-4 pt-6 border-t border-gray-200 justify-center">
                        <button type="button" id="save-case-edit-btn" class="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold border-2 border-green-500">
                            <i class="ri-save-line ml-2"></i>حفظ التعديلات
                        </button>
                        <button type="button" id="cancel-case-edit-btn" class="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold border-2 border-gray-400">
                            <i class="ri-close-line ml-2"></i>إلغاء
                        </button>
                    </div>
                </form>
            </div>
        `;


        attachCaseEditListeners(caseId);
        
    } catch (error) {
        showToast('حدث خطأ في تحميل بيانات القضية', 'error');
    }
}


function attachCaseEditListeners(caseId) {

    document.getElementById('save-case-edit-btn').addEventListener('click', async () => {
        const form = document.getElementById('edit-case-form');
        const formData = new FormData(form);
        const caseData = Object.fromEntries(formData.entries());
        

        if (!caseData.court.trim()) {
            showToast('يجب إدخال اسم المحكمة', 'error');
            document.getElementById('edit-court').focus();
            return;
        }

        try {
            await updateRecord('cases', caseId, caseData);
            showToast('تم حفظ التعديلات بنجاح', 'success');
            navigateBack();
        } catch (error) {
            showToast('حدث خطأ في حفظ التعديلات', 'error');
        }
    });


    document.getElementById('cancel-case-edit-btn').addEventListener('click', () => {
        navigateBack();
    });
}


async function displayEditClientForm(clientId) {
    try {
        const client = await getById('clients', clientId);
        if (!client) {
            showToast('لم يتم العثور على بيانات الموكل', 'error');
            return;
        }

        document.getElementById('modal-title').textContent = `تعديل بيانات الموكل: ${client.name}`;
        const modalContent = document.getElementById('modal-content');
        modalContent.classList.remove('search-modal-content');
        
        modalContent.innerHTML = `
            <div class="space-y-6">
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 class="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                        <i class="ri-edit-line"></i>تعديل البيانات الشخصية
                    </h3>
                    <form id="edit-client-form" class="space-y-4">
                        <input type="hidden" id="edit-client-id" value="${clientId}">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">اسم الموكل *</label>
                                <input type="text" id="edit-client-name" value="${client.name || ''}" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right" required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">صفة الموكل</label>
                                <input type="text" id="edit-client-capacity" value="${client.capacity || ''}" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                                <input type="text" id="edit-client-phone" value="${client.phone || ''}" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
                            <textarea id="edit-client-address" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right">${client.address || ''}</textarea>
                        </div>
                    </form>
                </div>

                <!-- أزرار التحكم -->
                <div class="flex gap-3 pt-4 border-t border-gray-200">
                    <button id="save-client-btn" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-all font-bold">
                        <i class="ri-save-line mr-2"></i>حفظ التعديلات
                    </button>
                    <button id="cancel-edit-client-btn" class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                        <i class="ri-close-line mr-2"></i>إلغاء
                    </button>
                </div>
            </div>
        `;


        attachEditClientListeners(clientId);
        
    } catch (error) {
        showToast('حدث خطأ في تحميل نافذة التعديل', 'error');
    }
}


function attachEditClientListeners(clientId) {

    document.getElementById('save-client-btn').addEventListener('click', async () => {
        try {
            const form = document.getElementById('edit-client-form');
            const formData = new FormData(form);
            
            const updatedClient = {
                name: document.getElementById('edit-client-name').value.trim(),
                capacity: document.getElementById('edit-client-capacity').value.trim(),
                phone: document.getElementById('edit-client-phone').value.trim(),
                address: document.getElementById('edit-client-address').value.trim()
            };

            if (!updatedClient.name) {
                showToast('اسم الموكل مطلوب', 'error');
                return;
            }

            await updateRecord('clients', clientId, updatedClient);
            showToast('تم حفظ تعديلات الموكل بنجاح');
            

            navigateTo(displayClientViewForm, clientId);
            
        } catch (error) {
            showToast('حدث خطأ في حفظ التعديلات', 'error');
        }
    });
    

    document.getElementById('cancel-edit-client-btn').addEventListener('click', () => {
        navigateBack();
    });
}


async function displayEditOpponentForm(opponentId) {
    try {
        const opponent = await getById('opponents', opponentId);
        if (!opponent) {
            showToast('لم يتم العثور على بيانات الخصم', 'error');
            return;
        }

        const modalTitleEl = document.getElementById('modal-title');
        if (modalTitleEl) modalTitleEl.textContent = '';
        const modalContent = document.getElementById('modal-content');
        modalContent.classList.remove('search-modal-content');
        
        modalContent.innerHTML = `
            <div class="space-y-6">
                <div class="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 class="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                        <i class="ri-edit-line"></i>تعديل البيانات الشخصية
                    </h3>
                    <form id="edit-opponent-form" class="space-y-4">
                        <input type="hidden" id="edit-opponent-id" value="${opponentId}">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">اسم الخصم *</label>
                                <input type="text" id="edit-opponent-name" value="${opponent.name || ''}" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-right" required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">صفة الخصم</label>
                                <input type="text" id="edit-opponent-capacity" value="${opponent.capacity || ''}" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-right">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                                <input type="text" id="edit-opponent-phone" value="${opponent.phone || ''}" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-right">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
                            <textarea id="edit-opponent-address" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-right">${opponent.address || ''}</textarea>
                        </div>
                    </form>
                </div>

                <!-- أزرار التحكم -->
                <div class="flex gap-3 pt-4 border-t border-gray-200">
                    <button id="save-opponent-btn" class="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-all font-bold">
                        <i class="ri-save-line mr-2"></i>حفظ التعديلات
                    </button>
                    <button id="cancel-edit-opponent-btn" class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                        <i class="ri-close-line mr-2"></i>إلغاء
                    </button>
                </div>
            </div>
        `;


        attachEditOpponentListeners(opponentId);
        
    } catch (error) {
        showToast('حدث خطأ في تحميل نافذة التعديل', 'error');
    }
}


function attachEditOpponentListeners(opponentId) {

    document.getElementById('save-opponent-btn').addEventListener('click', async () => {
        try {
            const updatedOpponent = {
                name: document.getElementById('edit-opponent-name').value.trim(),
                capacity: document.getElementById('edit-opponent-capacity').value.trim(),
                phone: document.getElementById('edit-opponent-phone').value.trim(),
                address: document.getElementById('edit-opponent-address').value.trim()
            };

            if (!updatedOpponent.name) {
                showToast('اسم الخصم مطلوب', 'error');
                return;
            }

            await updateRecord('opponents', opponentId, updatedOpponent);
            showToast('تم حفظ تعديلات الخصم بنجاح');
            

            navigateTo(displayOpponentViewForm, opponentId);
            
        } catch (error) {
            showToast('حدث خطأ في حفظ التعديلات', 'error');
        }
    });
    

    document.getElementById('cancel-edit-opponent-btn').addEventListener('click', () => {
        navigateBack();
    });
}


async function displayEditCaseForm(caseId) {
    try {
        const caseRecord = await getById('cases', caseId);
        if (!caseRecord) {
            showToast('لم يتم العثور على بيانات القضية', 'error');
            return;
        }

        const client = await getById('clients', caseRecord.clientId);
        const opponent = await getById('opponents', caseRecord.opponentId);

        const pageHeaderTitle = document.getElementById('page-title');
        if (pageHeaderTitle) pageHeaderTitle.textContent = 'تعديل الدعوى';
        const modalTitleElCase = document.getElementById('modal-title');
        if (modalTitleElCase) modalTitleElCase.textContent = '';
        const modalContent = document.getElementById('modal-content');
        modalContent.classList.remove('search-modal-content');
        
        modalContent.innerHTML = `
            <div class="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl p-6 shadow-lg border border-blue-300">
                <form id="edit-case-form" class="space-y-6" novalidate>
                    <input type="hidden" id="edit-case-id" value="${caseId}">
                    
                    <!-- الحقول الأساسية -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-blue-200 shadow-md">
                        <div>
                            <label for="edit-case-court" class="block text-sm font-semibold text-gray-700 text-right">المحكمة</label>
                            <input type="text" id="edit-case-court" value="${caseRecord.court || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-blue-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right transition-colors font-semibold text-gray-800" placeholder="اكتب اسم المحكمة">
                        </div>
                        <div>
                            <label for="edit-case-status" class="block text-sm font-semibold text-gray-700 text-right flex items-center gap-2">
                                <i class="ri-pulse-line text-blue-600"></i>
                                <span>حالة القضية</span>
                            </label>
                            <select id="edit-case-status" class="mt-1 block w-full p-3 bg-white border-2 border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-bold transition-colors">
                                <option value="">اختر حالة القضية</option>
                                <option value="جاري النظر" ${caseRecord.caseStatus === 'جاري النظر' ? 'selected' : ''}>جاري النظر</option>
                                <option value="محكوم فيها" ${caseRecord.caseStatus === 'محكوم فيها' ? 'selected' : ''}>محكوم فيها</option>
                                <option value="مؤجلة" ${caseRecord.caseStatus === 'مؤجلة' ? 'selected' : ''}>مؤجلة</option>
                                <option value="منتهية" ${caseRecord.caseStatus === 'منتهية' ? 'selected' : ''}>منتهية</option>
                                <option value="مستأنفة" ${caseRecord.caseStatus === 'مستأنفة' ? 'selected' : ''}>مستأنفة</option>
                            </select>
                        </div>
                        <div><label for="edit-case-type" class="block text-sm font-semibold text-gray-700 text-right">نوع الدعوى</label><input type="text" id="edit-case-type" value="${caseRecord.caseType || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-blue-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right transition-colors font-semibold text-gray-800"></div>
                        <div><label for="edit-case-subject" class="block text-sm font-semibold text-gray-700 text-right">موضوع الدعوى</label><input type="text" id="edit-case-subject" value="${caseRecord.subject || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-blue-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right transition-colors font-semibold text-gray-800"></div>
                        <div><label for="edit-case-number" class="block text-sm font-semibold text-gray-700 text-right">رقم الدعوى</label><input type="text" id="edit-case-number" value="${caseRecord.caseNumber || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-blue-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right transition-colors font-semibold text-gray-800"></div>
                        <div><label for="edit-case-year" class="block text-sm font-semibold text-gray-700 text-right">سنة الدعوى</label><input type="text" id="edit-case-year" value="${caseRecord.caseYear || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-blue-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right transition-colors font-semibold text-gray-800"></div>
                        <div><label for="edit-case-appeal-number" class="block text-sm font-semibold text-gray-700 text-right">رقم الاستئناف</label><input type="text" id="edit-case-appeal-number" value="${caseRecord.appealNumber || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-blue-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right transition-colors font-semibold text-gray-800"></div>
                        <div><label for="edit-case-appeal-year" class="block text-sm font-semibold text-gray-700 text-right">سنة الاستئناف</label><input type="text" id="edit-case-appeal-year" value="${caseRecord.appealYear || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-blue-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right transition-colors font-semibold text-gray-800"></div>
                        <div><label for="edit-case-cassation-number" class="block text-sm font-semibold text-gray-700 text-right">رقم النقض</label><input type="text" id="edit-case-cassation-number" value="${caseRecord.cassationNumber || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-blue-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right transition-colors font-semibold text-gray-800"></div>
                        <div><label for="edit-case-cassation-year" class="block text-sm font-semibold text-gray-700 text-right">سنة النقض</label><input type="text" id="edit-case-cassation-year" value="${caseRecord.cassationYear || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-blue-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right transition-colors font-semibold text-gray-800"></div>
                        <div><label for="edit-case-notes" class="block text-sm font-semibold text-gray-700 text-right">ملاحظات</label><input type="text" id="edit-case-notes" value="${caseRecord.notes || ''}" placeholder="أضف أي ملاحظات..." class="mt-1 block w-full p-3 bg-white border-2 border-blue-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right transition-colors font-semibold text-gray-800"></div>
                        <div><label for="edit-case-poa-number" class="block text-sm font-semibold text-gray-700 text-right">رقم التوكيل</label><input type="text" id="edit-case-poa-number" value="${caseRecord.poaNumber || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-blue-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right transition-colors font-semibold text-gray-800"></div>
                        
                        <!-- زر حفظ القضية في المنتصف تحت الحقلين -->
                        <div class="col-span-2 flex justify-center pt-6">
                            <button type="button" id="save-case-btn" class="px-10 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg font-bold flex items-center justify-center gap-3 border-2 border-green-400">
                                <i class="ri-save-3-line text-xl"></i>
                                <span>حفظ التعديلات</span>
                            </button>
                        </div>
                    </div>
                </form>
                
                <!-- زر الإلغاء خارج مربع البيانات -->
                <div class="flex justify-center mt-6">
                    <button type="button" id="cancel-edit-case-btn" class="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold border-2 border-gray-400">
                        <i class="ri-close-line mr-2 text-lg"></i>إلغاء
                    </button>
                </div>
            </div>
        `;


        attachEditCaseListeners(caseId, caseRecord.clientId, caseRecord.opponentId);
        
    } catch (error) {
        showToast('حدث خطأ في تحميل نافذة التعديل', 'error');
    }
}


function attachEditCaseListeners(caseId, clientId, opponentId) {

    document.getElementById('save-case-btn').addEventListener('click', async () => {
        try {
            const updatedCase = {
                caseNumber: document.getElementById('edit-case-number').value.trim(),
                caseYear: document.getElementById('edit-case-year').value.trim(),
                court: document.getElementById('edit-case-court').value.trim(),
                caseType: document.getElementById('edit-case-type').value,
                poaNumber: document.getElementById('edit-case-poa-number').value.trim(),

                caseStatus: document.getElementById('edit-case-status').value,
                appealNumber: document.getElementById('edit-case-appeal-number').value.trim(),
                appealYear: document.getElementById('edit-case-appeal-year').value.trim(),
                cassationNumber: document.getElementById('edit-case-cassation-number').value.trim(),
                cassationYear: document.getElementById('edit-case-cassation-year').value.trim(),
                subject: document.getElementById('edit-case-subject').value.trim(),
                notes: document.getElementById('edit-case-notes').value.trim()
            };



            await updateRecord('cases', caseId, updatedCase);
            showToast('تم حفظ تعديلات القضية بنجاح');
            

            navigateBack();
            
        } catch (error) {
            showToast('حدث خطأ في حفظ التعديلات', 'error');
        }
    });
    

    document.getElementById('cancel-edit-case-btn').addEventListener('click', () => {
        navigateBack();
    });
}


async function displayEditSessionForm(sessionId) {
    try {
        const session = await getById('sessions', sessionId);
        if (!session) {
            showToast('لم يتم العثور على بيانات الجلسة', 'error');
            return;
        }

        const caseRecord = await getById('cases', session.caseId);

        const modalTitleEl3 = document.getElementById('modal-title');
        if (modalTitleEl3) modalTitleEl3.textContent = '';
        const modalContent = document.getElementById('modal-content');
        modalContent.classList.remove('search-modal-content');
        
        modalContent.innerHTML = `
            <div class="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl p-6 shadow-2xl border border-blue-300">
                <form id="edit-session-form" class="space-y-6" novalidate>
                    <input type="hidden" id="edit-session-id" value="${sessionId}">
                    
                    <!-- معلومات القضية -->
                    <div class="p-4 bg-white/95 backdrop-blur-sm rounded-xl border border-blue-200 shadow-md">
                        <h4 class="font-bold text-gray-800 mb-2 text-right">القضية المرتبطة:</h4>
                        <p class="text-sm text-gray-600 text-right">
                            قضية رقم ${caseRecord ? caseRecord.caseNumber : 'غير محدد'} لسنة ${caseRecord ? caseRecord.caseYear : 'غير محدد'}
                        </p>
                    </div>
                    
                    <!-- الحقول الأساسية -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 p-6 bg-white/95 backdrop-blur-sm rounded-xl border border-blue-200 shadow-md">
                        <div>
                            <label for="edit-session-date" class="block text-sm font-semibold text-gray-700 text-right mb-2">
                                <i class="ri-calendar-line text-blue-600 ml-2"></i>
                                تاريخ الجلسة
                            </label>
                            <input type="date" id="edit-session-date" value="${session.sessionDate || ''}" required class="mt-1 block w-full p-3 bg-white border-2 border-blue-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right transition-colors font-semibold text-gray-800">
                        </div>
                        <div>
                            <label for="edit-session-roll" class="block text-sm font-semibold text-gray-700 text-right mb-2">
                                <i class="ri-list-check text-green-600 ml-2"></i>
                                الرول
                            </label>
                            <input type="text" id="edit-session-roll" value="${session.roll || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-blue-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right transition-colors font-semibold text-gray-800">
                        </div>
                        <div>
                            <label for="edit-session-inventory-number" class="block text-sm font-semibold text-gray-700 text-right mb-2">
                                <i class="ri-hashtag text-purple-600 ml-2"></i>
                                رقم الحصر
                            </label>
                            <input type="text" id="edit-session-inventory-number" value="${session.inventoryNumber || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-blue-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right transition-colors font-semibold text-gray-800">
                        </div>
                        <div>
                            <label for="edit-session-inventory-year" class="block text-sm font-semibold text-gray-700 text-right mb-2">
                                <i class="ri-calendar-2-line text-orange-600 ml-2"></i>
                                سنة الحصر
                            </label>
                            <input type="text" id="edit-session-inventory-year" value="${session.inventoryYear || ''}" class="mt-1 block w-full p-3 bg-white border-2 border-blue-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right transition-colors font-semibold text-gray-800">
                        </div>
                    </div>
                    
                    <!-- حقل القرار -->
                    <div class="p-6 bg-white/95 backdrop-blur-sm rounded-xl border border-blue-200 shadow-md">
                        <label for="edit-session-decision" class="block text-sm font-semibold text-gray-700 text-right mb-3">
                            <i class="ri-file-text-line text-indigo-600 ml-2"></i>
                            القرار
                        </label>
                        <textarea id="edit-session-decision" rows="4" placeholder="اكتب قرار الجلسة..." class="mt-1 block w-full p-4 bg-white border-2 border-blue-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right transition-colors resize-none font-semibold text-gray-800">${session.decision || session.notes || ''}</textarea>
                    </div>
                    
                    <div class="flex justify-center pt-4">
                        <button type="button" id="save-session-btn" class="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg font-bold flex items-center justify-center gap-3">
                            <i class="ri-save-3-line text-xl"></i><span>حفظ التعديلات</span>
                        </button>
                    </div>
                </form>
                
                <!-- زر الإلغاء خارج النموذج -->
                <div class="flex justify-center mt-6">
                    <button type="button" id="cancel-edit-session-btn" class="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold border-2 border-gray-400">
                        <i class="ri-close-line mr-2 text-lg"></i>إلغاء
                    </button>
                </div>
            </div>
        `;


        attachEditSessionListeners(sessionId, session.caseId);
        
    } catch (error) {
        showToast('حدث خطأ في تحميل نافذة التعديل', 'error');
    }
}


function attachEditSessionListeners(sessionId, caseId) {

    document.getElementById('save-session-btn').addEventListener('click', async () => {
        try {
            const updatedSession = {
                sessionDate: document.getElementById('edit-session-date').value,
                roll: document.getElementById('edit-session-roll').value.trim(),
                inventoryNumber: document.getElementById('edit-session-inventory-number').value.trim(),
                inventoryYear: document.getElementById('edit-session-inventory-year').value.trim(),
                decision: document.getElementById('edit-session-decision').value.trim()
            };

            if (!updatedSession.sessionDate) {
                showToast('تاريخ الجلسة مطلوب', 'error');
                return;
            }

            await updateRecord('sessions', sessionId, updatedSession);
            showToast('تم حفظ تعديلات الجلسة بنجاح');
            

            navigateTo(displayCaseViewForm, caseId);
            
        } catch (error) {
            showToast('حدث خطأ في حفظ التعديلات', 'error');
        }
    });
    

    document.getElementById('cancel-edit-session-btn').addEventListener('click', () => {
        navigateBack();
    });
}


async function displayAddSessionForm(caseId) {
    try {
        const caseRecord = await getById('cases', caseId);
        if (!caseRecord) {
            showToast('لم يتم العثور على بيانات القضية', 'error');
            return;
        }

        const modalTitleEl2 = document.getElementById('modal-title');
        if (modalTitleEl2) modalTitleEl2.textContent = '';
        const modalContent = document.getElementById('modal-content');
        modalContent.classList.remove('search-modal-content');
        
        modalContent.innerHTML = `
            <div class="space-y-6">
                <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                    <h3 class="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                        <i class="ri-add-line"></i>إضافة جلسة جديدة
                    </h3>
                    
                    <!-- معلومات القضية -->
                    <div class="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                        <h4 class="font-bold text-gray-800 mb-2">القضية:</h4>
                        <p class="text-sm text-gray-600">
                            قضية رقم ${caseRecord.caseNumber || 'غير محدد'} لسنة ${caseRecord.caseYear || 'غير محدد'}
                        </p>
                    </div>
                    
                    <form id="add-session-form" class="space-y-4">
                        <input type="hidden" id="add-session-case-id" value="${caseId}">
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">تاريخ الجلسة *</label>
                                <input type="date" id="add-session-date" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">وقت الجلسة</label>
                                <input type="time" id="add-session-time" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">رقم الحصر</label>
                                <input type="text" id="add-session-inventory-number" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">سنة الحصر</label>
                                <input type="text" id="add-session-inventory-year" value="${new Date().getFullYear()}" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right">
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">نوع الجلسة</label>
                                <select id="add-session-type" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right">
                                    <option value="">اختر نوع الجلسة</option>
                                    <option value="جلسة أولى">جلسة أولى</option>
                                    <option value="جلسة تحضيرية">جلسة تحضيرية</option>
                                    <option value="جلسة مرافعة">جلسة مرافعة</option>
                                    <option value="جلسة حكم">جلسة حكم</option>
                                    <option value="جلسة خبرة">جلسة خبرة</option>
                                    <option value="جلسة تنفيذ">جلسة تنفيذ</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">حالة الجلسة</label>
                                <select id="add-session-status" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right">
                                    <option value="مقررة" selected>مقررة</option>
                                    <option value="منتهية">منتهية</option>
                                    <option value="مؤجلة">مؤجلة</option>
                                    <option value="ملغية">ملغية</option>
                                </select>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">ملاحظات الجلسة</label>
                            <textarea id="add-session-notes" rows="4" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-right" placeholder="أدخل ملاحظات الجلسة..."></textarea>
                        </div>
                    </form>
                </div>

                <!-- أزرار التحكم -->
                <div class="flex gap-3 pt-4 border-t border-gray-200">
                    <button id="save-new-session-btn" class="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-all font-bold">
                        <i class="ri-save-line mr-2"></i>حفظ الجلسة
                    </button>
                    <button id="cancel-add-session-btn" class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                        <i class="ri-close-line mr-2"></i>إلغاء
                    </button>
                </div>
            </div>
        `;


        attachAddSessionListeners(caseId);
        
    } catch (error) {
        showToast('حدث خطأ في تحميل نافذة الإضافة', 'error');
    }
}


function attachAddSessionListeners(caseId) {

    document.getElementById('save-new-session-btn').addEventListener('click', async () => {
        try {
            const newSession = {
                caseId: caseId,
                sessionDate: document.getElementById('add-session-date').value,
                sessionTime: document.getElementById('add-session-time').value,
                inventoryNumber: document.getElementById('add-session-inventory-number').value.trim(),
                inventoryYear: document.getElementById('add-session-inventory-year').value.trim(),
                sessionType: document.getElementById('add-session-type').value,
                sessionStatus: document.getElementById('add-session-status').value,
                notes: document.getElementById('add-session-notes').value.trim(),
                createdAt: new Date().toISOString()
            };

            if (!newSession.sessionDate) {
                showToast('تاريخ الجلسة مطلوب', 'error');
                return;
            }

            await addSession(newSession);
            showToast('تم إضافة الجلسة بنجاح');
            

            navigateTo(displayCaseViewForm, caseId);
            
        } catch (error) {
            showToast('حدث خطأ في إضافة الجلسة', 'error');
        }
    });
    

    document.getElementById('cancel-add-session-btn').addEventListener('click', () => {
        navigateBack();
    });
}