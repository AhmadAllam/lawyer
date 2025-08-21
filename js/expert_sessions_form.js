// عرض نموذج إضافة/تعديل جلسة خبير
function displayExpertSessionForm(sessionId = null) {
    navigateTo(async () => {
        const sessionData = sessionId ? await getById('expertSessions', sessionId) : {};
        
        document.getElementById('modal-title').textContent = sessionId ? 'تعديل جلسة خبير' : 'إضافة جلسة خبير جديدة';
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
                    <form id="expert-session-form" class="space-y-3">
                        <!-- السطر الأول: الموكل واسم الخبير -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <!-- الموكل -->
                            <div>
                                <div class="flex items-stretch">
                                    <label for="client-select" class="px-3 py-2 border-2 border-gray-300 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">الموكل</label>
                                    <select id="client-select" name="clientId" required class="flex-1 px-4 py-3 text-base bg-white border-2 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 -mr-px">
                                        <option value="">اختر الموكل</option>
                                        ${clients.map(client => `
                                            <option value="${client.id}" ${sessionData.clientId === client.id ? 'selected' : ''}>${client.name}</option>
                                        `).join('')}
                                    </select>
                                </div>
                            </div>
                            
                            <!-- اسم الخبير -->
                            <div>
                                <div class="flex items-stretch">
                                    <label for="expert-name" class="px-3 py-2 border-2 border-purple-300 bg-purple-50 text-sm font-bold text-purple-800 shrink-0 w-28 md:w-32 text-right rounded-r-lg">اسم الخبير</label>
                                    <input type="text" id="expert-name" name="expertName" value="${sessionData.expertName || ''}" class="flex-1 px-4 py-3 text-base bg-white border-2 border-purple-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-medium -mr-px">
                                </div>
                            </div>
                        </div>
                        
                        <!-- السطر الثاني: نوع الجلسة والحالة -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <!-- نوع الجلسة -->
                            <div>
                                <div class="flex items-stretch">
                                    <label for="session-type" class="px-3 py-2 border-2 border-gray-300 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">نوع الجلسة</label>
                                    <input type="text" id="session-type" name="sessionType" value="${sessionData.sessionType || ''}" required class="flex-1 px-4 py-3 text-base bg-white border-2 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 -mr-px">
                                </div>
                            </div>
                            
                            <!-- الحالة -->
                            <div>
                                <div class="flex items-stretch">
                                    <label for="status" class="px-3 py-2 border-2 border-gray-300 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">الحالة</label>
                                    <select id="status" name="status" class="flex-1 px-4 py-3 text-base bg-white border-2 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 -mr-px">
                                        <option value="مجدولة" ${sessionData.status === 'مج��ولة' ? 'selected' : ''}>مجدولة</option>
                                        <option value="تمت" ${sessionData.status === 'تمت' ? 'selected' : ''}>تمت</option>
                                        <option value="ملغية" ${sessionData.status === 'ملغية' ? 'selected' : ''}>ملغية</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- السطر الثالث: تاريخ الجلسة ووقت الجلسة -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <!-- تاريخ الجلسة -->
                            <div>
                                <div class="flex items-stretch">
                                    <label for="session-date" class="px-3 py-2 border-2 border-gray-300 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">تاريخ الجلسة</label>
                                    <input type="date" id="session-date" name="sessionDate" value="${sessionData.sessionDate || ''}" class="flex-1 px-4 py-3 text-base bg-white border-2 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-right -mr-px">
                                </div>
                            </div>
                            
                            <!-- وقت الجلسة -->
                            <div>
                                <div class="flex items-stretch">
                                    <label for="session-time" class="px-3 py-2 border-2 border-gray-300 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">وقت الجلسة</label>
                                    <input type="time" id="session-time" name="sessionTime" value="${sessionData.sessionTime || ''}" class="flex-1 px-4 py-3 text-base bg-white border-2 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-right -mr-px">
                                </div>
                            </div>
                        </div>
                        
                        <!-- السطر الرابع: الملاحظات -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <!-- الملاحظات -->
                            <div>
                                <div class="flex items-stretch">
                                    <label for="notes" class="px-3 py-2 border-2 border-gray-300 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">ملاحظات</label>
                                    <input type="text" id="notes" name="notes" value="${sessionData.notes || ''}" class="flex-1 px-4 py-3 text-base bg-white border-2 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 -mr-px" placeholder="أي ملاحظات إضافية...">
                                </div>
                            </div>
                        </div>
                        
                        <!-- أزرار الحفظ والإلغاء -->
                        <div class="mt-auto pt-4">
                            <div class="sticky bottom-0 left-0 right-0 z-10 bg-gray-50 border-t border-gray-200 py-3">
                                <div class="flex justify-center">
                                    <div class="bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm flex items-center gap-2">
                                        <button type="submit" class="w-auto px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-md font-semibold shadow-sm flex items-center justify-center gap-1">
                                            <i class="ri-save-line text-base"></i>
                                            ${sessionId ? 'تحديث الجلسة' : 'حفظ الجلسة'}
                                        </button>
                                        <button type="button" id="cancel-session-btn" class="w-auto px-4 py-2 text-sm bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-md font-semibold shadow-sm flex items-center justify-center gap-1">
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
                pageTitle.textContent = sessionId ? 'تعديل جلسة خبير' : 'إضافة جلسة خبير جديدة';
                
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
        attachExpertSessionFormListeners(sessionId);
    });
}