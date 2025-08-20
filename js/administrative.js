// إضافة CSS للمحاذاة
if (!document.getElementById('administrative-custom-css')) {
    const style = document.createElement('style');
    style.id = 'administrative-custom-css';
    style.textContent = `
        /* تخصيص محاذاة تاريخ الإنجاز */
        #due-date {
            text-align: right !important;
            direction: rtl;
        }
        
        /* تحسين عرض التاريخ في المتصفحات المختلفة */
        #due-date::-webkit-calendar-picker-indicator {
            margin-left: 0;
            margin-right: auto;
        }
        
        #due-date::-webkit-inner-spin-button,
        #due-date::-webkit-outer-spin-button {
            margin-left: 0;
            margin-right: auto;
        }
    `;
    document.head.appendChild(style);
}

// Administrative Manager Module - نافذة إدارة الأعمال الإدارية
class AdministrativeManager {
    constructor() {
        this.currentDate = new Date();
        this.administrative = [];
        this.selectedDate = null;
        this.viewMode = 'calendar'; // calendar or list
        this.filteredDate = null; // للبحث بتاريخ معين
        this.sortOrder = 'desc'; // desc = من الأحدث للأقدم, asc = من الأقدم للأحدث
        this.lastToastDate = null; // لتجنب تكرار رسائل التاريخ
        
        // حفظ حالة الفرز والبحث للعودة إليها بعد التعديل
        this.savedState = {
            viewMode: 'calendar',
            sortOrder: 'desc',
            filteredDate: null,
            selectedDate: null
        };
    }

    async init() {
        try {
            await this.loadAllAdministrative();
            this.restoreState(); // استعادة الحالة المحفوظة
            this.render();
        } catch (error) {
            showToast('حدث خطأ في تحميل الأعمال الإدارية', 'error');
        }
    }

    // حفظ الحالة الحالية
    saveState() {
        this.savedState = {
            viewMode: this.viewMode,
            sortOrder: this.sortOrder,
            filteredDate: this.filteredDate,
            selectedDate: this.selectedDate
        };
        
        // حفظ في sessionStorage أيضاً للاستمرارية
        sessionStorage.setItem('administrativeState', JSON.stringify(this.savedState));
    }

    // استعادة الحالة المحفوظة
    restoreState() {
        try {
            const savedStateStr = sessionStorage.getItem('administrativeState');
            if (savedStateStr) {
                const savedState = JSON.parse(savedStateStr);
                this.viewMode = savedState.viewMode || 'calendar';
                this.sortOrder = savedState.sortOrder || 'desc';
                this.filteredDate = savedState.filteredDate || null;
                this.selectedDate = savedState.selectedDate || null;
                this.savedState = savedState;
            }
        } catch (error) {
        }
    }

    // مسح الحالة المحفوظة
    clearSavedState() {
        sessionStorage.removeItem('administrativeState');
    }

    async loadAllAdministrative() {
        try {
            this.administrative = await getAllAdministrative();
        } catch (error) {
            this.administrative = [];
        }
    }

    render() {
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');
        const modalContainer = document.getElementById('modal-container');
        
        modalTitle.textContent = 'إدارة الأعمال الإدارية';
        modalContent.classList.remove('search-modal-content');
        modalContent.classList.remove('px-4');
        modalContent.classList.add('px-0');
        
        // إعادة تعيين زر الرئيسية والعنوان للحالة الطبيعية
        const backBtn = document.getElementById('back-to-main');
        const pageTitle = document.getElementById('page-title');
        if (backBtn && pageTitle) {
            backBtn.innerHTML = `
                <i class="ri-home-5-line text-white text-lg"></i>
                <span class="text-white">الرئيسيه</span>
            `;
            pageTitle.textContent = 'إدارة الأعمال الإدارية';
            
            // إزالة المستمع القديم وإضافة الجديد للرجوع للرئيسية مباشرة
            const newBackBtn = backBtn.cloneNode(true);
            backBtn.parentNode.replaceChild(newBackBtn, backBtn);
            
            newBackBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                // الرجوع للشاشة الرئيسية مباشرة
                window.location.href = 'index.html';
            });
        }
        
        // توسيع النافذة - اجعلها تاخد العرض بالكامل
        modalContainer.classList.remove('max-w-5xl', 'max-w-7xl', 'mx-4');
        modalContainer.classList.add('w-full');
        modalContent.classList.remove('search-modal-content');
        
        modalContent.innerHTML = `
            <div class="administrative-manager-container">
                <!-- Main Layout: Right Sidebar + Content -->
                <div class="flex gap-2">
                    <!-- Right Sidebar -->
                    <div class="w-80 lg:w-72 xl:w-72 2xl:w-80 flex-shrink-0 space-y-3">
                        <!-- View Toggle Buttons -->
                        <div class="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                            <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <i class="ri-eye-line text-indigo-500"></i>
                                طرق العرض
                            </h3>
                            <div class="flex bg-gray-100 rounded-lg p-1 w-full">
                                <button id="calendar-view-btn" class="flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${this.viewMode === 'calendar' ? 'bg-indigo-500 text-white shadow-md' : 'text-gray-600 hover:text-gray-800'}">
                                    <i class="ri-calendar-line ml-1"></i>
                                    تقويم
                                </button>
                                <button id="list-view-btn" class="flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${this.viewMode === 'list' ? 'bg-indigo-500 text-white shadow-md' : 'text-gray-600 hover:text-gray-800'}">
                                    <i class="ri-list-check ml-1"></i>
                                    قائمة
                                </button>
                            </div>
                        </div>

                        <!-- Date Search Box -->
                        <div class="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                            <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <i class="ri-search-line text-indigo-500"></i>
                                البحث بالتاريخ
                            </h3>
                            <input type="date" id="date-search" 
                                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium"
                                value="${this.filteredDate || ''}">
                        </div>

                        <!-- Add New Work Button -->
                        <div class="bg-white rounded-lg p-3 shadow-md border border-gray-200">
                            <button id="add-new-work-btn" class="w-full px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all shadow-sm flex items-center justify-center gap-2 text-sm">
                                <i class="ri-add-line text-base"></i>
                                إضافة عمل جديد
                            </button>
                        </div>

                        <!-- Statistics -->
                        <div class="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                            <h3 class="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                                <i class="ri-bar-chart-line text-indigo-500"></i>
                                الإحصائيات
                            </h3>
                            <div class="space-y-3">
                                <!-- Today's Works - Full Width -->
                                <div class="bg-gradient-to-br from-pink-200 via-rose-300 to-red-200 rounded-xl p-3 border-2 border-pink-300 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                    <div class="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-1 shadow-md">
                                        <i class="ri-today-line text-white text-lg drop-shadow-sm"></i>
                                    </div>
                                    <div class="text-2xl font-bold text-red-700 mb-0.5" id="stats-today">0</div>
                                    <div class="text-xs font-semibold text-red-800">أعمال اليوم</div>
                                </div>

                                <!-- Month and Week Works - Side by Side -->
                                <div class="grid grid-cols-2 gap-2">
                                    <!-- Completed Works -->
                                    <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200 text-center shadow-sm hover:shadow-md transition-shadow">
                                        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-1">
                                            <i class="ri-check-line text-white text-sm"></i>
                                        </div>
                                        <div class="text-lg font-bold text-green-600 mb-1" id="stats-completed">0</div>
                                        <div class="text-xs font-medium text-green-800">منجز</div>
                                    </div>

                                    <!-- Pending Works -->
                                    <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200 text-center shadow-sm hover:shadow-md transition-shadow">
                                        <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-1">
                                            <i class="ri-time-line text-white text-sm"></i>
                                        </div>
                                        <div class="text-lg font-bold text-purple-600 mb-1" id="stats-pending">0</div>
                                        <div class="text-xs font-medium text-purple-800">متبقي</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Main Content Area -->
                    <div class="flex-1">
                        <div id="calendar-content" class="min-h-[calc(100vh-140px)]">
                            ${this.viewMode === 'calendar' ? this.renderCalendar() : this.renderWorksList()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.updateStatistics();
        const detailsPanel = document.getElementById('work-details');
        if (detailsPanel) { detailsPanel.remove(); }
        this.attachEventListeners();
        
        // إعداد صندوق التمرير إذا كان في وضع القائمة
        if (this.viewMode === 'list') {
            setTimeout(() => {
                this.setupAdministrativeListScrollBox?.();
            }, 10);
        }
    }

    updateStatistics() {
        const today = new Date();
        const todayStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
        
        // حساب أعمال اليوم
        const todayWorks = this.administrative.filter(work => work.dueDate === todayStr).length;
        
        // حساب الأعمال المنجزة والمتبقية
        const completedWorks = this.administrative.filter(work => work.completed).length;
        const pendingWorks = this.administrative.length - completedWorks;
        
        // تحديث الإحصائيات في الواجهة
        const todayElement = document.getElementById('stats-today');
        const completedElement = document.getElementById('stats-completed');
        const pendingElement = document.getElementById('stats-pending');
        
        if (todayElement) todayElement.textContent = todayWorks;
        if (completedElement) completedElement.textContent = completedWorks;
        if (pendingElement) pendingElement.textContent = pendingWorks;
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const today = new Date();
        
        // أسماء الشهور بالعربية
        const monthNames = [
            'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
            'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
        ];

        // أسماء أيام الأسبوع بالعربية (تبدأ من السبت)
        const dayNames = ['سبت', 'أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'];

        // الحصول على أول يوم في الشهر وعدد الأيام
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        // تحويل يوم البداية للنظام العربي (السبت = 0)
        let startingDayOfWeek = firstDay.getDay();
        startingDayOfWeek = startingDayOfWeek === 6 ? 0 : startingDayOfWeek + 1;

        let calendarHTML = `
            <div class="calendar-container bg-white rounded-lg shadow-md border border-gray-200 w-full">
                <!-- Calendar Header -->
                <div class="calendar-header bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-3 rounded-t-lg">
                    <div class="flex items-center justify-between gap-3 flex-wrap">
                        <div class="flex items-center gap-2">
                            <button id="prev-month" class="p-1.5 hover:bg-white hover:bg-opacity-20 rounded-md transition-colors">
                                <i class="ri-arrow-right-s-line text-lg"></i>
                            </button>
                            <button id="next-month" class="p-1.5 hover:bg-white hover:bg-opacity-20 rounded-md transition-colors">
                                <i class="ri-arrow-left-s-line text-lg"></i>
                            </button>
                        </div>
                        <h2 class="text-lg font-bold">${monthNames[month]} ${year}</h2>
                        <div class="w-6"></div>
                    </div>
                </div>

                <!-- Days of Week Header -->
                <div class="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        `;

        // إضافة أسماء أيام الأسبوع
        dayNames.forEach(day => {
            calendarHTML += `
                <div class="p-2 text-center text-xs font-semibold text-gray-600 border-l border-gray-200 last:border-l-0">
                    ${day}
                </div>
            `;
        });

        calendarHTML += `</div><div class="grid grid-cols-7 gap-0">`;

        // إضافة الأيام الفارغة في بداية الشهر
        for (let i = 0; i < startingDayOfWeek; i++) {
            calendarHTML += `<div class="h-20 border-l border-b border-gray-200 bg-gray-50"></div>`;
        }

        // إضافة أيام الشهر
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const worksForDay = this.getWorksForDate(currentDateStr);
            const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
            const isSelected = this.selectedDate === currentDateStr;

            let dayClasses = 'h-20 border-l border-b border-gray-200 p-1.5 cursor-pointer transition-all duration-200 relative overflow-hidden';
            let dayContent = '';
            let dayNumberStyle = 'text-xs font-medium text-gray-800 mb-1';

            if (isToday) {
                dayClasses += ' bg-gradient-to-br from-indigo-100 to-indigo-200 border-indigo-300';
                dayNumberStyle = 'text-xs font-bold text-indigo-800 mb-1';
            } else {
                dayClasses += ' hover:bg-indigo-50 hover:border-indigo-300';
            }

            if (isSelected) {
                dayClasses += ' ring-1 ring-indigo-500 bg-gradient-to-br from-indigo-200 to-indigo-300';
                dayNumberStyle = 'text-xs font-bold text-indigo-900 mb-1';
            }

            if (worksForDay.length > 0) {
                dayClasses += ' has-works';
                
                // تحديد لون المؤشر حسب عدد الأعمال
                let indicatorColor = 'bg-green-500';
                let textColor = 'text-green-700';
                if (worksForDay.length > 2) {
                    indicatorColor = 'bg-red-500';
                    textColor = 'text-red-700';
                } else if (worksForDay.length > 1) {
                    indicatorColor = 'bg-orange-500';
                    textColor = 'text-orange-700';
                }

                dayContent = `
                    <div class="work-indicators">
                        <!-- نقطة المؤشر -->
                        <div class="absolute top-0.5 left-0.5 w-2 h-2 ${indicatorColor} rounded-full shadow-sm animate-pulse"></div>
                        
                        <!-- عداد الأعمال -->
                        <div class="absolute bottom-0.5 left-0.5 right-0.5">
                            <div class="bg-white bg-opacity-90 rounded-sm px-1 py-0.5 shadow-sm">
                                <div class="text-xs ${textColor} font-bold text-center flex items-center justify-center gap-0.5">
                                    <i class="ri-briefcase-fill text-xs"></i>
                                    <span>${worksForDay.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            calendarHTML += `
                <div class="${dayClasses}" data-date="${currentDateStr}">
                    <div class="${dayNumberStyle}">${day}</div>
                    ${dayContent}
                </div>
            `;
        }

        calendarHTML += `</div></div>`;
        return calendarHTML;
    }

    renderWorksList() {
        // فلترة الأعمال حسب التاريخ المحدد (إن وجد)
        let worksToShow = [...this.administrative];
        let titleText = 'جميع الأعمال الإدارية';
        let clearFilterButton = '';

        if (this.filteredDate) {
            worksToShow = this.administrative.filter(work => work.dueDate === this.filteredDate);
            titleText = `أعمال يوم ${this.filteredDate}`;
            clearFilterButton = `
                <button id="clear-filter-btn" class="px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors">
                    <i class="ri-close-line ml-1"></i>إلغاء الفلترة
                </button>
            `;
        }

        if (worksToShow.length === 0) {
            return `
                <div class="text-center py-12">
                    <i class="ri-briefcase-line text-6xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500 text-lg">${this.filteredDate ? 'لا توجد أعمال في هذا التاريخ' : 'لا توجد أعمال إدارية مضافة بعد'}</p>
                    <p class="text-gray-400 text-sm mt-2">يمكنك إضافة الأعمال الإدارية من الزر أعلاه</p>
                    ${clearFilterButton}
                </div>
            `;
        }

        // ترتيب الأعمال حسب النظام المحدد
        const sortedWorks = [...worksToShow].sort((a, b) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            
            const dateA = new Date(a.dueDate);
            const dateB = new Date(b.dueDate);
            
            return this.sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });

        let listHTML = `
            <div class="w-full">
                <div id="administrative-list-wrapper" class="bg-indigo-50 rounded-xl border-2 border-indigo-300 shadow-sm h-full min-h-0 overflow-hidden flex flex-col">
                    <div class="administrative-list-header flex justify-between items-center p-3 border-b border-indigo-200/60 bg-indigo-50">
                        <div class="flex items-center gap-3">
                            <h3 class="text-lg font-bold text-gray-800">${titleText} (${worksToShow.length})</h3>
                            ${clearFilterButton}
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-sm text-gray-600">ترتيب:</span>
                            <button id="sort-btn" class="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm transition-colors">
                                <span>${this.sortOrder === 'desc' ? 'الأحدث أولاً' : 'الأقدم أولاً'}</span>
                                <i class="ri-arrow-${this.sortOrder === 'desc' ? 'down' : 'up'}-line text-gray-600"></i>
                            </button>
                        </div>
                    </div>
                    <div id="administrative-list" class="space-y-3 overscroll-contain p-3">
        `;

        sortedWorks.forEach((work, index) => {
            const dueDate = work.dueDate || 'غير محدد';
            const task = work.task || 'غير محدد';
            const location = work.location || 'غير محدد';
            const completed = work.completed ? 'منجز' : 'متبقي';
            const completedClass = work.completed ? 'text-green-600' : 'text-red-600';
            const completedIcon = work.completed ? 'ri-check-line' : 'ri-time-line';
            
            listHTML += `
                <div class="work-card bg-white border border-gray-200 rounded-lg p-4 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-2">
                                <i class="ri-calendar-event-line text-indigo-500"></i>
                                <span class="font-semibold text-gray-800">${dueDate}</span>
                                <span class="text-sm ${completedClass} flex items-center gap-1">
                                    <i class="${completedIcon}"></i>
                                    ${completed}
                                </span>
                            </div>
                            <div class="text-sm text-gray-700 mb-2">
                                <strong>العمل المطلوب:</strong> ${task}
                            </div>
                            <div class="text-sm text-gray-600">
                                <i class="ri-map-pin-line ml-1"></i>
                                <strong>المكان:</strong> ${location}
                            </div>
                        </div>
                        <div class="flex gap-1">
                            <button class="edit-work-btn p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" data-work-id="${work.id}" title="تعديل العمل">
                                <i class="ri-pencil-line"></i>
                            </button>
                            <button class="delete-work-btn p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" data-work-id="${work.id}" title="حذف العمل">
                                <i class="ri-delete-bin-line"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        listHTML += `
                    </div>
                </div>
            </div>`;
        return listHTML;
    }

    getWorksForDate(dateStr) {
        return this.administrative.filter(work => work.dueDate === dateStr);
    }

    attachEventListeners() {
        // View toggle buttons
        document.getElementById('calendar-view-btn')?.addEventListener('click', () => {
            if (this.viewMode !== 'calendar') {
                this.viewMode = 'calendar';
                // إلغاء الفلترة عند الانتقال للتقويم
                this.filteredDate = null;
                document.getElementById('date-search').value = '';
                this.updateContent();
            }
        });

        document.getElementById('list-view-btn')?.addEventListener('click', () => {
            if (this.viewMode !== 'list') {
                this.viewMode = 'list';
                this.updateContent();
            }
        });

        // Calendar navigation
        document.getElementById('prev-month')?.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.updateContent();
        });

        document.getElementById('next-month')?.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.updateContent();
        });

        // Date search
        const dateSearch = document.getElementById('date-search');
        if (dateSearch) {
            dateSearch.replaceWith(dateSearch.cloneNode(true));
            const newDateSearch = document.getElementById('date-search');
            newDateSearch.addEventListener('change', (e) => {
                const selectedDate = e.target.value;
                if (selectedDate) {
                    this.searchByDate(selectedDate, { silent: true });
                }
            });
        }

        // Clear filter button
        const clearBtn = document.getElementById('clear-filter-btn');
        if (clearBtn) {
            clearBtn.replaceWith(clearBtn.cloneNode(true));
            const newClearBtn = document.getElementById('clear-filter-btn');
            newClearBtn.addEventListener('click', () => {
                this.clearFilter();
            });
        }

        // Sort button
        const sortBtn = document.getElementById('sort-btn');
        if (sortBtn) {
            sortBtn.replaceWith(sortBtn.cloneNode(true));
            const newSortBtn = document.getElementById('sort-btn');
            newSortBtn.addEventListener('click', () => {
                this.toggleSort();
            });
        }

        // Calendar day clicks
        document.querySelectorAll('[data-date]').forEach(dayElement => {
            dayElement.addEventListener('click', (e) => {
                const date = e.currentTarget.dataset.date;
                const dateInput = document.getElementById('date-search');
                if (dateInput) dateInput.value = date;
                this.selectDate(date);
            });
        });

        // Add new work button
        document.getElementById('add-new-work-btn')?.addEventListener('click', () => {
            this.saveState();
            navigateTo(displayAdministrativeForm);
        });

        // Work list actions
        document.querySelectorAll('.edit-work-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const workId = parseInt(e.currentTarget.dataset.workId, 10);
                this.saveState();
                navigateTo(displayAdministrativeForm, workId);
            });
        });

        document.querySelectorAll('.delete-work-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const workId = parseInt(e.currentTarget.dataset.workId, 10);
                this.deleteWork(workId);
            });
        });
    }

    updateContent() {
        const contentContainer = document.getElementById('calendar-content');
        if (contentContainer) {
            contentContainer.innerHTML = this.viewMode === 'calendar' ? this.renderCalendar() : this.renderWorksList();
            this.attachEventListeners();
            if (this.viewMode === 'list') {
                setTimeout(() => {
                    this.setupAdministrativeListScrollBox?.();
                }, 10);
            } else {
                const mainEl = document.querySelector('main');
                if (mainEl) mainEl.style.overflowY = 'auto';
            }
        }

        // Update statistics
        this.updateStatistics();

        // Update view toggle buttons
        const calendarBtn = document.getElementById('calendar-view-btn');
        const listBtn = document.getElementById('list-view-btn');
        
        if (calendarBtn && listBtn) {
            calendarBtn.className = `flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${this.viewMode === 'calendar' ? 'bg-indigo-500 text-white shadow-md' : 'text-gray-600 hover:text-gray-800'}`;
            listBtn.className = `flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${this.viewMode === 'list' ? 'bg-indigo-500 text-white shadow-md' : 'text-gray-600 hover:text-gray-800'}`;
        }

        // Update work details panel visibility
        const detailsPanel = document.getElementById('work-details');
        if (detailsPanel) {
            detailsPanel.classList.add('hidden');
        }
    }

    searchByDate(dateStr, options = {}) {
        const { silent = false } = options;
        const isNewSearch = this.lastToastDate !== dateStr;
        
        const worksForDate = this.getWorksForDate(dateStr);
        
        // تطبيق الفلترة بالتار��خ المحدد
        this.filteredDate = dateStr;
        
        // Switch to list view and show filtered works
        this.viewMode = 'list';
        this.selectedDate = dateStr;
        this.updateContent();
        
        if (!silent && isNewSearch) {
            this.lastToastDate = dateStr;
        }
    }

    clearFilter() {
        this.filteredDate = null;
        this.selectedDate = null;
        this.lastToastDate = null;
        document.getElementById('date-search').value = '';
        this.updateContent();
    }

    toggleSort() {
        this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
        
        // Update button immediately
        const sortBtn = document.getElementById('sort-btn');
        if (sortBtn) {
            const span = sortBtn.querySelector('span');
            const icon = sortBtn.querySelector('i');
            if (span) span.textContent = this.sortOrder === 'desc' ? 'الأحدث أولاً' : 'الأقدم أولاً';
            if (icon) icon.className = `ri-arrow-${this.sortOrder === 'desc' ? 'down' : 'up'}-line text-gray-600`;
        }
        
        // Re-render the list only
        if (this.viewMode === 'list') {
            const contentContainer = document.getElementById('calendar-content');
            if (contentContainer) {
                contentContainer.innerHTML = this.renderWorksList();
                this.attachEventListeners();
                setTimeout(() => {
                    this.setupAdministrativeListScrollBox?.();
                }, 10);
            }
        }
    }

    selectDate(dateStr) {
        this.selectedDate = dateStr;
        const worksForDate = this.getWorksForDate(dateStr);
        if (this.viewMode === 'calendar') {
            if (worksForDate.length > 0) {
                this.filteredDate = dateStr;
                this.viewMode = 'list';
                this.updateContent();
            } else {
                this.updateContent();
            }
        } else {
            this.filteredDate = dateStr;
            this.updateContent();
        }
    }

    async deleteWork(workId) {
        if (confirm('هل أنت متأكد من حذف هذا العمل؟')) {
            try {
                await deleteById('administrative', workId);
                await this.loadAllAdministrative();
                this.updateContent();
                await updateCountersInHeader();
                showToast('تم حذف العمل بنجاح', 'success');
            } catch (error) {
                console.error('Error deleting work:', error);
                showToast('حدث خطأ أثناء حذف العمل', 'error');
            }
        }
    }

    setupAdministrativeListScrollBox() {
        try {
            const wrapper = document.getElementById('administrative-list-wrapper');
            const list = document.getElementById('administrative-list');
            if (!wrapper || !list) return;

            const mainEl = document.querySelector('main');
            const viewportH = window.innerHeight;
            const top = wrapper.getBoundingClientRect().top;
            const targetH = Math.max(240, viewportH - top - 12);

            wrapper.style.height = targetH + 'px';
            wrapper.style.minHeight = '0px';
            list.style.maxHeight = (targetH - 48) + 'px';
            list.style.overflowY = 'auto';

            if (mainEl) {
                mainEl.style.overflowY = 'hidden';
            }
        } catch (e) {}

        if (!this.__administrativeListResizeBound) {
            this.__administrativeListResizeBound = true;
            window.addEventListener('resize', () => this.setupAdministrativeListScrollBox());
        }
    }
}

// Global variable to maintain administrative state
let globalAdministrativeManager = null;

// Global function to display administrative modal
async function displayAdministrativeModal() {
    if (!globalAdministrativeManager) {
        globalAdministrativeManager = new AdministrativeManager();
    }
    await globalAdministrativeManager.init();
}

// عرض نموذج إضافة/تعديل العمل الإداري
async function displayAdministrativeForm(workId = null) {
    try {
        const isEdit = workId !== null;
        let work = null;
        
        if (isEdit) {
            work = await getById('administrative', workId);
            if (!work) {
                showToast('لم يتم العثور على العمل', 'error');
                return;
            }
        }
        
        // جلب جميع الموكلين
        const clients = await getAllClients();
        
        document.getElementById('modal-title').textContent = isEdit ? 'تعديل العمل الإداري' : 'إضافة عمل إداري جديد';
        const modalContent = document.getElementById('modal-content');
        const modalContainer = document.getElementById('modal-container');
        
        // توسيع النافذة لملء الشاشة
        modalContainer.classList.remove('max-w-5xl', 'max-w-7xl', 'mx-4', 'w-full');
        modalContainer.classList.add('w-full', 'h-full');
        modalContent.classList.remove('px-4', 'pb-4');
        modalContent.classList.add('p-6', 'h-full', 'overflow-y-auto');
        
        modalContent.innerHTML = `
            <div class="w-full h-full p-4">
                <div class="w-full mx-auto">
                    <form id="administrative-form" class="space-y-4">
                        <!-- السطر الأول: الموكل والعمل المطلوب -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <!-- الموكل -->
                            <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
                                <label class="block text-base font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="ri-user-line text-lg text-indigo-500"></i>
                                    الموكل
                                </label>
                                <select id="client-select" class="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="">عمل عام (بدون موكل محدد)</option>
                                    ${clients.map(client => `
                                        <option value="${client.id}" ${work && work.clientId === client.id ? 'selected' : ''}>
                                            ${client.name}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>
                            
                            <!-- العمل المطلوب -->
                            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border-2 border-indigo-200">
                                <label class="block text-base font-bold text-indigo-800 mb-2 flex items-center gap-2">
                                    <i class="ri-briefcase-line text-lg"></i>
                                    العمل المطلوب *
                                </label>
                                <input type="text" id="task" class="w-full p-3 text-base border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium" 
                                       value="${work ? work.task || '' : ''}" placeholder="اكتب وصف العمل المطلوب..." required>
                            </div>
                        </div>
                        
                        <!-- السطر الثاني: تاريخ الإنجاز ومكان العمل -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <!-- تاريخ الإنجاز -->
                            <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
                                <label class="block text-base font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="ri-calendar-line text-lg text-indigo-500"></i>
                                    تاريخ الإنجاز *
                                </label>
                                <input type="date" id="due-date" class="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                       value="${work ? work.dueDate || '' : ''}" required>
                            </div>
                            
                            <!-- مكان العمل -->
                            <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
                                <label class="block text-base font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="ri-map-pin-line text-lg text-indigo-500"></i>
                                    مكان العمل
                                </label>
                                <input type="text" id="location" class="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                       value="${work ? work.location || '' : ''}" placeholder="مكان إتمام العمل...">
                            </div>
                        </div>
                        
                        <!-- السطر الثالث: الملاحظات وحالة العمل -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <!-- الملاحظات -->
                            <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
                                <label class="block text-base font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="ri-file-text-line text-lg text-indigo-500"></i>
                                    ملاحظات
                                </label>
                                <input type="text" id="notes" class="w-full p-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                                       value="${work ? work.notes || '' : ''}" placeholder="أي ملاحظات إضافية...">
                            </div>
                            
                            <!-- حالة العمل -->
                            <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
                                <label class="block text-base font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <i class="ri-settings-line text-lg text-indigo-500"></i>
                                    حالة العمل
                                </label>
                                <div class="grid grid-cols-2 gap-2">
                                    <label class="flex items-center justify-center gap-1 cursor-pointer bg-gray-50 p-3 rounded-lg border border-red-200 hover:border-red-400 hover:bg-red-50 transition-all ${!work || !work.completed ? 'ring-2 ring-red-400 bg-red-50' : ''}">
                                        <input type="radio" name="completed" value="false" class="w-4 h-4 text-red-600 focus:ring-red-500" 
                                               ${!work || !work.completed ? 'checked' : ''}>
                                        <i class="ri-time-line text-red-600"></i>
                                        <span class="text-red-600 font-bold text-sm">غير منجز</span>
                                    </label>
                                    <label class="flex items-center justify-center gap-1 cursor-pointer bg-gray-50 p-3 rounded-lg border border-green-200 hover:border-green-400 hover:bg-green-50 transition-all ${work && work.completed ? 'ring-2 ring-green-400 bg-green-50' : ''}">
                                        <input type="radio" name="completed" value="true" class="w-4 h-4 text-green-600 focus:ring-green-500" 
                                               ${work && work.completed ? 'checked' : ''}>
                                        <i class="ri-check-line text-green-600"></i>
                                        <span class="text-green-600 font-bold text-sm">منجز</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <!-- أزرار الحفظ والإلغاء -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                            <button type="submit" class="px-6 py-3 text-base bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg font-bold transition-all shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2">
                                <i class="ri-save-line text-lg"></i>
                                ${isEdit ? 'تحديث العمل' : 'حفظ العمل'}
                            </button>
                            <button type="button" id="cancel-administrative-btn" class="px-6 py-3 text-base bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-bold transition-all shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2">
                                <i class="ri-close-line text-lg"></i>
                                إلغاء
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        // تغيير زر الرئيسية لزر رجوع بعد إنشاء المحتوى
        setTimeout(() => {
            const backBtn = document.getElementById('back-to-main');
            const pageTitle = document.getElementById('page-title');
            if (backBtn && pageTitle) {
                backBtn.innerHTML = `
                    <i class="ri-arrow-right-line text-white text-lg"></i>
                    <span class="text-white">رجوع</span>
                `;
                pageTitle.textContent = isEdit ? 'تعديل العمل الإداري' : 'إضافة عمل إداري جديد';
                
                // إزالة المستمع القديم وإضافة الجديد
                const newBackBtn = backBtn.cloneNode(true);
                backBtn.parentNode.replaceChild(newBackBtn, backBtn);
                
                newBackBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigateBack();
                });
            }
        }, 100);
        
        // إضافة مستمعي الأحداث
        document.getElementById('administrative-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            await saveAdministrative(workId);
        });
        
        document.getElementById('cancel-administrative-btn').addEventListener('click', () => {
            const clientSelect = document.getElementById('client-select');
            if (clientSelect && clientSelect.value) {
                sessionStorage.setItem('expandedAdministrativeClientId', clientSelect.value);
            }
            navigateBack();
        });
        
    } catch (error) {
        showToast('حدث خطأ في عرض النموذج', 'error');
    }
}

// حفظ العمل الإداري
async function saveAdministrative(workId = null) {
    try {
        const clientId = document.getElementById('client-select').value || null;
        const task = document.getElementById('task').value.trim();
        const dueDate = document.getElementById('due-date').value;
        const location = document.getElementById('location').value.trim();
        const completed = document.querySelector('input[name="completed"]:checked').value === 'true';
        const notes = document.getElementById('notes').value.trim();
        
        if (!task || !dueDate) {
            showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        const workData = {
            clientId: clientId ? parseInt(clientId) : null,
            task,
            dueDate,
            location: location || null,
            completed,
            notes: notes || null,
            createdAt: workId ? undefined : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        if (workId) {
            await updateById('administrative', workId, workData);
            showToast('تم تحديث العمل بنجاح', 'success');
            
            if (workData.clientId) {
                sessionStorage.setItem('expandedAdministrativeClientId', workData.clientId);
            } else {
                sessionStorage.setItem('expandedAdministrativeClientId', 'general');
            }
        } else {
            await addToStore('administrative', workData);
            showToast('تم حفظ ال��مل بنجاح', 'success');
        }
        
        navigateBack();
        
    } catch (error) {
        showToast('حدث خطأ في حفظ العمل', 'error');
    }
}

// دوال قاعدة البيانات للأعمال الإدارية
async function getAllAdministrative() {
    return await getAll('administrative');
}

// استمع لحفظ الأعمال الإدارية لإعادة تحميل المدير
document.addEventListener('administrativeSaved', async () => {
    const modalTitle = document.getElementById('modal-title');
    if (modalTitle && modalTitle.textContent === 'إدارة الأعمال الإدارية' && globalAdministrativeManager) {
        await globalAdministrativeManager.loadAllAdministrative();
        globalAdministrativeManager.updateContent();
    }
});