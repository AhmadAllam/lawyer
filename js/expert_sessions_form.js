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
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            <!-- الموكل -->
                            <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                                <label class="block text-base font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="ri-user-line text-lg text-purple-500"></i>
                                    الموكل *
                                </label>
                                <select id="client-select" name="clientId" required class="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                                    <option value="">اختر الموكل</option>
                                    ${clients.map(client => `
                                        <option value="${client.id}" ${sessionData.clientId === client.id ? 'selected' : ''}>${client.name}</option>
                                    `).join('')}
                                </select>
                            </div>
                            
                            <!-- اسم الخبير -->
                            <div class="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border-2 border-purple-200">
                                <label class="block text-base font-bold text-purple-800 mb-2 flex items-center gap-2">
                                    <i class="ri-team-line text-lg"></i>
                                    اسم الخبير
                                </label>
                                <input type="text" id="expert-name" name="expertName" value="${sessionData.expertName || ''}" class="w-full p-3 text-base border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-medium">
                            </div>
                        </div>
                        
                        <!-- السطر الثاني: نوع الجلسة والحالة -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <!-- نوع الجلسة -->
                            <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                                <label class="block text-base font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="ri-file-list-line text-lg text-purple-500"></i>
                                    نوع الجلسة *
                                </label>
                                <input type="text" id="session-type" name="sessionType" value="${sessionData.sessionType || ''}" required class="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                            </div>
                            
                            <!-- الحالة -->
                            <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                                <label class="block text-base font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="ri-checkbox-circle-line text-lg text-purple-500"></i>
                                    الحالة
                                </label>
                                <select id="status" name="status" class="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                                    <option value="مجدولة" ${sessionData.status === 'مجدولة' ? 'selected' : ''}>مجدولة</option>
                                    <option value="تمت" ${sessionData.status === 'تمت' ? 'selected' : ''}>تمت</option>
                                    <option value="ملغية" ${sessionData.status === 'ملغية' ? 'selected' : ''}>ملغية</option>
                                </select>
                            </div>
                        </div>
                        
                        <!-- السطر الثالث: تاريخ الجلسة ووقت الجلسة -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <!-- تاريخ الجلسة -->
                            <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                                <label class="block text-base font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="ri-calendar-line text-lg text-purple-500"></i>
                                    تاريخ الجلسة
                                </label>
                                <input type="date" id="session-date" name="sessionDate" value="${sessionData.sessionDate || ''}" class="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-right">
                            </div>
                            
                            <!-- وقت الجلسة -->
                            <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                                <label class="block text-base font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="ri-time-line text-lg text-purple-500"></i>
                                    وقت الجلسة
                                </label>
                                <input type="time" id="session-time" name="sessionTime" value="${sessionData.sessionTime || ''}" class="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-right">
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                                <label class="block text-base font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="ri-map-pin-line text-lg text-purple-500"></i>
                                    مكان الجلسة
                                </label>
                                <input type="text" id="location" name="location" value="${sessionData.location || ''}" class="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="مكان انعقاد الجلسة...">
                            </div>
                            <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                                <label class="block text-base font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="ri-sticky-note-line text-lg text-purple-500"></i>
                                    ملاحظات
                                </label>
                                <input type="text" id="notes" name="notes" value="${sessionData.notes || ''}" class="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="أي ملاحظات إضافية...">
                            </div>
                        </div>
                        
                        <!-- أزرار الحفظ والإلغاء -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                            <button type="submit" class="px-6 py-3 text-base bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-bold transition-all shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2">
                                <i class="ri-save-line text-lg"></i>
                                ${sessionId ? 'تحديث الجلسة' : 'حفظ الجلسة'}
                            </button>
                            <button type="button" id="cancel-session-btn" class="px-6 py-3 text-base bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-bold transition-all shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2">
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