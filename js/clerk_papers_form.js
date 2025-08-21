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
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <!-- الموكل -->
                            <div>
                                <div class="flex items-stretch">
                                    <label for="client-select" class="px-3 py-2 border-2 border-gray-300 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">الموكل</label>
                                    <select id="client-select" name="clientId" required class="flex-1 px-4 py-3 text-base bg-white border-2 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 -mr-px">
                                        <option value="">اختر الموكل</option>
                                        ${clients.map(client => `
                                            <option value="${client.id}" ${paperData.clientId === client.id ? 'selected' : ''}>${client.name}</option>
                                        `).join('')}
                                    </select>
                                </div>
                            </div>
                            
                            <!-- نوع الورقة -->
                            <div>
                                <div class="flex items-stretch">
                                    <label for="paper-type" class="px-3 py-2 border-2 border-blue-300 bg-blue-50 text-sm font-bold text-blue-800 shrink-0 w-28 md:w-32 text-right rounded-r-lg">نوع الورقة</label>
                                    <select id="paper-type" name="paperType" required class="flex-1 px-4 py-3 text-base bg-white border-2 border-blue-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium -mr-px">
                                        <option value="">اختر نوع الورقة</option>
                                        <option value="إنذار" ${paperData.paperType === 'إنذار' ? 'selected' : ''}>إنذار</option>
                                        <option value="إعلان" ${paperData.paperType === 'إعلان' ? 'selected' : ''}>إعلان</option>
                                        <option value="أخرى" ${paperData.paperType === 'أخرى' ? 'selected' : ''}>أخرى</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- السطر الثاني: رقم الورقة وقلم المحضرين -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <!-- رقم الورقة -->
                            <div>
                                <div class="flex items-stretch">
                                    <label for="paper-number" class="px-3 py-2 border-2 border-gray-300 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">رقم الورقة</label>
                                    <input type="text" id="paper-number" name="paperNumber" value="${paperData.paperNumber || ''}" required class="flex-1 px-4 py-3 text-base bg-white border-2 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 -mr-px">
                                </div>
                            </div>
                            
                            <!-- قلم المحضرين -->
                            <div>
                                <div class="flex items-stretch">
                                    <label for="clerk-office" class="px-3 py-2 border-2 border-gray-300 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">قلم المحضرين</label>
                                    <input type="text" id="clerk-office" name="clerkOffice" value="${paperData.clerkOffice || ''}" class="flex-1 px-4 py-3 text-base bg-white border-2 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 -mr-px">
                                </div>
                            </div>
                        </div>
                        
                        <!-- السطر الثالث: تاريخ التسليم وتا��يخ الاستلام -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <!-- تاريخ التسليم -->
                            <div>
                                <div class="flex items-stretch">
                                    <label for="delivery-date" class="px-3 py-2 border-2 border-gray-300 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">تاريخ التسليم</label>
                                    <input type="date" id="delivery-date" name="deliveryDate" value="${paperData.deliveryDate || ''}" class="flex-1 px-4 py-3 text-base bg-white border-2 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right -mr-px">
                                </div>
                            </div>
                            
                            <!-- تاريخ الاستلام -->
                            <div>
                                <div class="flex items-stretch">
                                    <label for="receipt-date" class="px-3 py-2 border-2 border-gray-300 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">تاريخ الاستلام</label>
                                    <input type="date" id="receipt-date" name="receiptDate" value="${paperData.receiptDate || ''}" class="flex-1 px-4 py-3 text-base bg-white border-2 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right -mr-px">
                                </div>
                            </div>
                        </div>
                        
                        <!-- السطر الرابع: الملاحظات -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <!-- الملاحظات -->
                            <div>
                                <div class="flex items-stretch">
                                    <label for="notes" class="px-3 py-2 border-2 border-gray-300 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">ملاحظات</label>
                                    <input type="text" id="notes" name="notes" value="${paperData.notes || ''}" class="flex-1 px-4 py-3 text-base bg-white border-2 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 -mr-px" placeholder="أي ملاحظات إضافية...">
                                </div>
                            </div>
                        </div>
                        
                        <!-- أزرار الحفظ والإلغاء -->
                        <div class="mt-auto pt-4">
                            <div class="sticky bottom-0 left-0 right-0 z-10 bg-gray-50 border-t border-gray-200 py-3">
                                <div class="flex justify-center">
                                    <div class="bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm flex items-center gap-2">
                                        <button type="submit" class="w-auto px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-md font-semibold shadow-sm flex items-center justify-center gap-1">
                                            <i class="ri-save-line text-base"></i>
                                            ${paperId ? 'تحديث الورقة' : 'حفظ الورقة'}
                                        </button>
                                        <button type="button" id="cancel-paper-btn" class="w-auto px-4 py-2 text-sm bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-md font-semibold shadow-sm flex items-center justify-center gap-1">
                                            <i class="ri-close-line text-base"></i>
                                            إلغاء
                                        </button>
                                    </div>
                                </div>
                            </div>
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