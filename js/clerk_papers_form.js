// عرض نموذج إضافة/تعديل ورقة محضر
function displayClerkPaperForm(paperId = null) {
    navigateTo(async () => {
        const paperData = paperId ? await getById('clerkPapers', paperId) : {};
        
        document.getElementById('modal-title').textContent = paperId ? 'تعديل ورقة محضر' : 'إضافة ورقة محضر جديدة';
        const modalContent = document.getElementById('modal-content');
        const modalContainer = document.getElementById('modal-container');
        
        // توسيع النافذة لملء الشاشة مثل نافذة العمل الإداري
        modalContainer.classList.remove('max-w-5xl', 'max-w-7xl', 'mx-4');
        modalContainer.classList.add('w-full');
        modalContent.classList.remove('search-modal-content');
        
        // جلب قائمة الموكلين
        const clients = await getAllClients();
        
        modalContent.innerHTML = `
            <div class="w-full h-full p-2">
                <div class="w-full mx-auto">
                    <form id="clerk-paper-form" class="space-y-3">
                        <!-- السطر الأول: الموكل ونوع الورقة -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            <!-- الموكل -->
                            <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                <label class="block text-base font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="ri-user-line text-lg text-blue-500"></i>
                                    الموكل *
                                </label>
                                <select id="client-select" name="clientId" required class="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <option value="">اختر الموكل</option>
                                    ${clients.map(client => `
                                        <option value="${client.id}" ${paperData.clientId === client.id ? 'selected' : ''}>${client.name}</option>
                                    `).join('')}
                                </select>
                            </div>
                            
                            <!-- نوع الورقة -->
                            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-2 border-blue-200">
                                <label class="block text-base font-bold text-blue-800 mb-2 flex items-center gap-2">
                                    <i class="ri-file-paper-line text-lg"></i>
                                    نوع الورقة *
                                </label>
                                <select id="paper-type" name="paperType" required class="w-full p-3 text-base border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium">
                                    <option value="">اختر نوع الورقة</option>
                                    <option value="إنذار" ${paperData.paperType === 'إنذار' ? 'selected' : ''}>إنذار</option>
                                    <option value="إعلان" ${paperData.paperType === 'إعلان' ? 'selected' : ''}>إعلان</option>
                                    <option value="أخرى" ${paperData.paperType === 'أخرى' ? 'selected' : ''}>أخرى</option>
                                </select>
                            </div>
                        </div>
                        
                        <!-- السطر الثاني: رقم الورقة وقلم المحضرين -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <!-- رقم الورقة -->
                            <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                <label class="block text-base font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="ri-hashtag text-lg text-blue-500"></i>
                                    رقم الورقة *
                                </label>
                                <input type="text" id="paper-number" name="paperNumber" value="${paperData.paperNumber || ''}" required class="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            </div>
                            
                            <!-- قلم المحضرين -->
                            <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                <label class="block text-base font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="ri-building-line text-lg text-blue-500"></i>
                                    قلم المحضرين
                                </label>
                                <input type="text" id="clerk-office" name="clerkOffice" value="${paperData.clerkOffice || ''}" class="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            </div>
                        </div>
                        
                        <!-- السطر الثالث: تاريخ التسليم وتاريخ الاستلام -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <!-- تاريخ التسليم -->
                            <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                <label class="block text-base font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="ri-calendar-line text-lg text-blue-500"></i>
                                    تاريخ تسليم الورقة
                                </label>
                                <input type="date" id="delivery-date" name="deliveryDate" value="${paperData.deliveryDate || ''}" class="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right">
                            </div>
                            
                            <!-- تاريخ الاستلام -->
                            <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                <label class="block text-base font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="ri-calendar-check-line text-lg text-blue-500"></i>
                                    تاريخ استلام الورقة
                                </label>
                                <input type="date" id="receipt-date" name="receiptDate" value="${paperData.receiptDate || ''}" class="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right">
                            </div>
                        </div>
                        
                        <!-- السطر الرابع: الملاحظات -->
                        <div class="grid grid-cols-1 gap-4">
                            <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                <label class="block text-base font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="ri-sticky-note-line text-lg text-blue-500"></i>
                                    ملاحظات
                                </label>
                                <input type="text" id="notes" name="notes" value="${paperData.notes || ''}" class="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="أي ملاحظات إضافية...">
                            </div>
                        </div>
                        
                        <!-- أزرار الحفظ والإلغاء -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                            <button type="submit" class="px-6 py-3 text-base bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-bold transition-all shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2">
                                <i class="ri-save-line text-lg"></i>
                                ${paperId ? 'تحديث الورقة' : 'حفظ الورقة'}
                            </button>
                            <button type="button" id="cancel-paper-btn" class="px-6 py-3 text-base bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-bold transition-all shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2">
                                <i class="ri-close-line text-lg"></i>
                                إلغاء
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            const backBtn = document.getElementById('back-to-main');
            const pageTitle = document.getElementById('page-title');
            if (backBtn && pageTitle) {
                backBtn.innerHTML = `
                    <i class="ri-arrow-right-line text-white text-lg"></i>
                    <span class="text-white">رجوع</span>
                `;
                pageTitle.textContent = paperId ? 'تعديل ورقة محضر' : 'إضافة ورقة محضر جديدة';
                
                const newBackBtn = backBtn.cloneNode(true);
                backBtn.parentNode.replaceChild(newBackBtn, backBtn);
                
                newBackBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigateBack();
                });
            }
        }, 100);
        
        // ربط الأحداث
        attachClerkPaperFormListeners(paperId);
    });
}