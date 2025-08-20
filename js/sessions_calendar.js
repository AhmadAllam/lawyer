// Sessions Calendar Module - نافذة التقويم والجلسات
class SessionsCalendar {
    constructor() {
        this.currentDate = new Date();
        this.sessions = [];
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
            await this.loadAllSessions();
            this.restoreState(); // استعادة الحالة المحفوظة
            try {
                const ref = document.referrer || '';
                if (!/session-edit\.html|case-info\.html/i.test(ref)) {
                    this.clearSavedState();
                    this.viewMode = 'calendar';
                    this.sortOrder = 'desc';
                    this.filteredDate = null;
                    this.selectedDate = null;
                }
            } catch (e) {}
            this.render();
        } catch (error) {
            showToast('حدث خطأ في تحميل الجلسات', 'error');
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
        sessionStorage.setItem('sessionsCalendarState', JSON.stringify(this.savedState));
    }

    // استعادة الحالة المحفوظة
    restoreState() {
        try {
            const savedStateStr = sessionStorage.getItem('sessionsCalendarState');
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
        sessionStorage.removeItem('sessionsCalendarState');
    }

    async loadAllSessions() {
        try {
            // جلب كل الجلسات من قاعدة البيانات
            this.sessions = await getAllSessions();

        } catch (error) {
            this.sessions = [];
        }
    }

    render() {
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');
        const modalContainer = document.getElementById('modal-container');
        
        modalTitle.textContent = 'إدارة الجلسات';
        modalContent.classList.remove('search-modal-content');
        modalContent.classList.remove('px-4');
        modalContent.classList.add('px-0');
        
        // توسيع النافذة - اجعلها تاخد العرض بالكامل
        modalContainer.classList.remove('max-w-5xl', 'max-w-7xl', 'mx-4');
        modalContainer.classList.add('w-full');
        
        modalContent.innerHTML = `
            <div class="sessions-calendar-container">
                <!-- Main Layout: Right Sidebar + Content -->
                <div class="flex gap-2">
                    <!-- Right Sidebar -->
                    <div class="w-80 lg:w-72 xl:w-72 2xl:w-80 flex-shrink-0 space-y-6">
                        <!-- View Toggle Buttons -->
                        <div class="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                            <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <i class="ri-eye-line text-blue-500"></i>
                                طرق العرض
                            </h3>
                            <div class="flex bg-gray-100 rounded-lg p-1 w-full">
                                <button id="calendar-view-btn" class="flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${this.viewMode === 'calendar' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-600 hover:text-gray-800'}">
                                    <i class="ri-calendar-line ml-1"></i>
                                    تقويم
                                </button>
                                <button id="list-view-btn" class="flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${this.viewMode === 'list' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-600 hover:text-gray-800'}">
                                    <i class="ri-list-check ml-1"></i>
                                    قائمة
                                </button>
                            </div>
                        </div>

                        <!-- Date Search Box -->
                        <div class="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                            <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <i class="ri-search-line text-blue-500"></i>
                                البحث بالتاريخ
                            </h3>
                            <input type="date" id="date-search" 
                                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium"
                                value="${this.filteredDate || ''}">
                        </div>

                        <!-- Statistics -->
                        <div class="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                            <h3 class="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <i class="ri-bar-chart-line text-blue-500"></i>
                                الإحصائيات
                            </h3>
                            <div class="space-y-3">
                                <!-- Today's Sessions - Full Width -->
                                <div class="bg-gradient-to-br from-pink-200 via-rose-300 to-red-200 rounded-xl p-3 border-2 border-pink-300 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                    <div class="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-1 shadow-md">
                                        <i class="ri-today-line text-white text-lg drop-shadow-sm"></i>
                                    </div>
                                    <div class="text-2xl font-bold text-red-700 mb-0.5" id="stats-today">0</div>
                                    <div class="text-xs font-semibold text-red-800">جلسات اليوم</div>
                                </div>

                                <!-- Month and Week Sessions - Side by Side -->
                                <div class="grid grid-cols-2 gap-2">
                                    <!-- This Month's Sessions -->
                                    <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200 text-center shadow-sm hover:shadow-md transition-shadow">
                                        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-1">
                                            <i class="ri-calendar-2-line text-white text-sm"></i>
                                        </div>
                                        <div class="text-lg font-bold text-blue-600 mb-1" id="stats-month">0</div>
                                        <div class="text-xs font-medium text-blue-800">الشهر الحالي</div>
                                    </div>

                                    <!-- This Week's Sessions -->
                                    <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200 text-center shadow-sm hover:shadow-md transition-shadow">
                                        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-1">
                                            <i class="ri-calendar-week-line text-white text-sm"></i>
                                        </div>
                                        <div class="text-lg font-bold text-green-600 mb-1" id="stats-week">0</div>
                                        <div class="text-xs font-medium text-green-800">الأسبوع الحالي</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Main Content Area -->
                    <div class="flex-1">
                        <div id="calendar-content" class="min-h-[calc(100vh-140px)]">
                            ${this.viewMode === 'calendar' ? this.renderCalendar() : this.renderSessionsList()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.updateStatistics();
        const detailsPanel = document.getElementById('session-details');
        if (detailsPanel) { detailsPanel.remove(); }
        this.attachEventListeners();
        
        // إعداد صندوق التمرير إذا كان في وضع القائمة
        if (this.viewMode === 'list') {
            setTimeout(() => {
                this.setupSessionsListScrollBox?.();
            }, 10);
        }
    }

    updateStatistics() {
        const today = new Date();
        const todayStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
        
        // حساب جلسات الشهر الحالي
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const monthSessions = this.sessions.filter(session => {
            if (!session.sessionDate) return false;
            const sessionDate = new Date(session.sessionDate);
            return sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear;
        }).length;
        
        // حساب جلسات الأسبوع الحالي
        const startOfWeek = new Date(today);
        const dayOfWeek = today.getDay();
        // في النظام العربي السبت = 0، لذلك نحسب بداية الأسبوع من السبت
        const daysToSubtract = dayOfWeek === 6 ? 0 : dayOfWeek + 1;
        startOfWeek.setDate(today.getDate() - daysToSubtract);
        startOfWeek.setHours(0, 0, 0, 0);
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        
        const weekSessions = this.sessions.filter(session => {
            if (!session.sessionDate) return false;
            const sessionDate = new Date(session.sessionDate);
            return sessionDate >= startOfWeek && sessionDate <= endOfWeek;
        }).length;
        
        // حساب جلسات اليوم
        const todaySessions = this.sessions.filter(session => session.sessionDate === todayStr).length;
        
        // تحديث الإحصائيات في الواجهة
        const monthElement = document.getElementById('stats-month');
        const weekElement = document.getElementById('stats-week');
        const todayElement = document.getElementById('stats-today');
        
        if (monthElement) monthElement.textContent = monthSessions;
        if (weekElement) weekElement.textContent = weekSessions;
        if (todayElement) todayElement.textContent = todaySessions;
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
                <div class="calendar-header bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-t-lg">
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
            const sessionsForDay = this.getSessionsForDate(currentDateStr);
            const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
            const isSelected = this.selectedDate === currentDateStr;

            let dayClasses = 'h-20 border-l border-b border-gray-200 p-1.5 cursor-pointer transition-all duration-200 relative overflow-hidden';
            let dayContent = '';
            let dayNumberStyle = 'text-xs font-medium text-gray-800 mb-1';

            if (isToday) {
                dayClasses += ' bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300';
                dayNumberStyle = 'text-xs font-bold text-blue-800 mb-1';
            } else {
                dayClasses += ' hover:bg-blue-50 hover:border-blue-300';
            }

            if (isSelected) {
                dayClasses += ' ring-1 ring-blue-500 bg-gradient-to-br from-blue-200 to-blue-300';
                dayNumberStyle = 'text-xs font-bold text-blue-900 mb-1';
            }

            if (sessionsForDay.length > 0) {
                dayClasses += ' has-sessions';
                
                // تحديد لون المؤشر حسب عدد الجلسات
                let indicatorColor = 'bg-green-500';
                let textColor = 'text-green-700';
                if (sessionsForDay.length > 2) {
                    indicatorColor = 'bg-red-500';
                    textColor = 'text-red-700';
                } else if (sessionsForDay.length > 1) {
                    indicatorColor = 'bg-orange-500';
                    textColor = 'text-orange-700';
                }

                dayContent = `
                    <div class="session-indicators">
                        <!-- نقطة المؤشر -->
                        <div class="absolute top-0.5 left-0.5 w-2 h-2 ${indicatorColor} rounded-full shadow-sm animate-pulse"></div>
                        
                        <!-- عداد الجلسات -->
                        <div class="absolute bottom-0.5 left-0.5 right-0.5">
                            <div class="bg-white bg-opacity-90 rounded-sm px-1 py-0.5 shadow-sm">
                                <div class="text-xs ${textColor} font-bold text-center flex items-center justify-center gap-0.5">
                                    <i class="ri-calendar-event-fill text-xs"></i>
                                    <span>${sessionsForDay.length}</span>
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

    renderSessionsList() {
        // فلترة الجلسات حسب التاريخ المحدد (إن وجد)
        let sessionsToShow = [...this.sessions];
        let titleText = 'جميع الجلسات';
        let clearFilterButton = '';

        if (this.filteredDate) {
            sessionsToShow = this.sessions.filter(session => session.sessionDate === this.filteredDate);
            titleText = `جلسات يوم ${this.filteredDate}`;
            clearFilterButton = `
                <button id="clear-filter-btn" class="px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors">
                    <i class="ri-close-line ml-1"></i>إلغاء الفلترة
                </button>
            `;
        }

        if (sessionsToShow.length === 0) {
            return `
                <div class="text-center py-12">
                    <i class="ri-calendar-line text-6xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500 text-lg">${this.filteredDate ? 'لا توجد جلسات في هذا التاريخ' : 'لا توجد جلسات مضافة بعد'}</p>
                    <p class="text-gray-400 text-sm mt-2">يمكنك إضافة الجلسات من خلال القضايا أو الموكلين</p>
                    ${clearFilterButton}
                </div>
            `;
        }

        // ترتيب الجلسات حسب النظام المحدد
        const sortedSessions = [...sessionsToShow].sort((a, b) => {
            if (!a.sessionDate) return 1;
            if (!b.sessionDate) return -1;
            
            const dateA = new Date(a.sessionDate);
            const dateB = new Date(b.sessionDate);
            
            return this.sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });

        let listHTML = `
            <div class="w-full">
                <div id="sessions-list-wrapper" class="bg-blue-50 rounded-xl border-2 border-blue-300 shadow-sm h-full min-h-0 overflow-hidden flex flex-col">
                    <div class="sessions-list-header flex justify-between items-center p-3 border-b border-blue-200/60 bg-blue-50">
                        <div class="flex items-center gap-3">
                            <h3 class="text-lg font-bold text-gray-800">${titleText} (${sessionsToShow.length})</h3>
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
                    <div id="sessions-list" class="space-y-3 overscroll-contain p-3">
        `;

        sortedSessions.forEach((session, index) => {
            const sessionDate = session.sessionDate || 'غير محدد';
            const decision = session.decision || 'لا يوجد قرار';
            const roll = session.roll || '-';
            const inventoryNumber = session.inventoryNumber || '-';
            
            listHTML += `
                <div class="session-card bg-white border border-gray-200 rounded-lg p-4 hover:bg-blue-50 hover:border-blue-300">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-2">
                                <i class="ri-calendar-event-line text-blue-500"></i>
                                <span class="font-semibold text-gray-800">${sessionDate}</span>
                                ${session.roll ? `<span class=\"text-sm text-gray-500\">• الرول: ${roll}</span>` : ''}
                            </div>
                            <div class="text-sm text-gray-600 mb-2">
                                ${inventoryNumber !== '-' ? `رقم الحصر: ${inventoryNumber}` : ''}
                                ${session.inventoryYear ? ` لسنة ${session.inventoryYear}` : ''}
                            </div>
                            <div class="text-sm text-gray-700">
                                <strong>القرار:</strong> ${decision}
                            </div>
                        </div>
                        <div class="flex gap-1">
                            <button class="view-case-btn p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors" data-session-id="${session.id}" title="عرض بيانات القضية">
                                <i class="ri-eye-line"></i>
                            </button>
                            <button class="edit-session-btn p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" data-session-id="${session.id}" title="تعديل الجلسة">
                                <i class="ri-pencil-line"></i>
                            </button>
                            <button class="delete-session-btn p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" data-session-id="${session.id}" title="حذف الجلسة">
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

    getSessionsForDate(dateStr) {
        return this.sessions.filter(session => session.sessionDate === dateStr);
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
                // مسح التحديد السابق عند التبديل للقائمة
                // this.selectedDate = null;  // سنبقي عليه للفلترة
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

        // Date search - prevent duplicate listeners
        const dateSearch = document.getElementById('date-search');
        if (dateSearch) {
            // Remove existing listener to avoid duplicates
            dateSearch.replaceWith(dateSearch.cloneNode(true));
            const newDateSearch = document.getElementById('date-search');
            newDateSearch.addEventListener('change', (e) => {
                const selectedDate = e.target.value;
                if (selectedDate) {
                    this.searchByDate(selectedDate, { silent: true });
                }
            });
        }

        // Clear filter button - prevent duplicate listeners
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
            // Remove existing listener first to avoid duplicates
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
                // اكتب التاريخ في البحث لزيادة التركيز
                const dateInput = document.getElementById('date-search');
                if (dateInput) dateInput.value = date;
                this.selectDate(date);
            });
        });

        // Session list actions - open dedicated pages
        document.querySelectorAll('.view-case-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sessionId = parseInt(e.currentTarget.dataset.sessionId, 10);
                // حفظ حالة الفلترة والفرز قبل الانتقال
                this.saveState();
                window.location.href = `case-info.html?sessionId=${sessionId}`;
            });
        });

        document.querySelectorAll('.edit-session-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sessionId = parseInt(e.currentTarget.dataset.sessionId, 10);
                // حفظ حالة الفلترة والفرز قبل الانتقال
                this.saveState();
                window.location.href = `session-edit.html?sessionId=${sessionId}`;
            });
        });

        document.querySelectorAll('.delete-session-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sessionId = parseInt(e.currentTarget.dataset.sessionId, 10);
                this.deleteSession(sessionId);
            });
        });
    }

    updateContent() {
        const contentContainer = document.getElementById('calendar-content');
        if (contentContainer) {
            contentContainer.innerHTML = this.viewMode === 'calendar' ? this.renderCalendar() : this.renderSessionsList();
            this.attachEventListeners();
            if (this.viewMode === 'list') {
                // طبق نفس منطق صندوق تمرير الموكلين
                setTimeout(() => {
                    this.setupSessionsListScrollBox?.();
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
            calendarBtn.className = `flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${this.viewMode === 'calendar' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-600 hover:text-gray-800'}`;
            listBtn.className = `flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${this.viewMode === 'list' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-600 hover:text-gray-800'}`;
        }

        // Update session details panel visibility
        const detailsPanel = document.getElementById('session-details');
        if (detailsPanel) {
            detailsPanel.classList.add('hidden');
        }

        // Event listeners are handled in main attachEventListeners to avoid duplicates
    }

    searchByDate(dateStr, options = {}) {
        const { silent = false } = options;
        // تحقق من أن التاريخ مختلف عن السابق لتجنب الرسائل المكررة
        const isNewSearch = this.lastToastDate !== dateStr;
        
        const sessionsForDate = this.getSessionsForDate(dateStr);
        
        // تطبيق الفلترة بالتاريخ المحدد
        this.filteredDate = dateStr;
        
        // Switch to list view and show filtered sessions
        this.viewMode = 'list';
        this.selectedDate = dateStr;
        this.updateContent();
        
        // إلغاء رسائل التوست عند الفلترة إذا طُلب ذلك
        if (!silent && isNewSearch) {
            this.lastToastDate = dateStr; // حفظ التاريخ لتجنب التكرار
            // يمكننا إلغاء الرسائل تماماً حسب طلبك
            // لذلك لا نظهر أي رسائل هنا
        }
    }

    clearFilter() {
        this.filteredDate = null;
        this.selectedDate = null;
        this.lastToastDate = null; // مسح التاريخ المحفوظ
        document.getElementById('date-search').value = '';
        this.updateContent();
        // بدون رسائل توست للفلترة حسب طلبك
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
                contentContainer.innerHTML = this.renderSessionsList();
                this.attachEventListeners();
                setTimeout(() => {
                    this.setupSessionsListScrollBox?.();
                }, 10);
            }
        }
        
        // لا نعرض رسائل توست لتغيير الترتيب
    }

    selectDate(dateStr) {
        this.selectedDate = dateStr;
        const sessionsForDate = this.getSessionsForDate(dateStr);
        if (this.viewMode === 'calendar') {
            if (sessionsForDate.length > 0) {
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

    showSessionDetails(sessions) {
        const detailsContainer = document.getElementById('session-details');
        if (!detailsContainer) return;
        detailsContainer.classList.add('hidden');
    }

    clearSessionDetails() {
        const detailsContainer = document.getElementById('session-details');
        if (detailsContainer) {
            detailsContainer.classList.add('hidden');
        }
    }

    attachDetailEventListeners() {
        document.querySelectorAll('#session-details .view-case-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const sessionId = parseInt(e.currentTarget.dataset.sessionId, 10);
                await this.viewCaseData(sessionId);
            });
        });

        document.querySelectorAll('#session-details .edit-session-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const sessionId = parseInt(e.currentTarget.dataset.sessionId, 10);
                const sessionData = await getById('sessions', sessionId);
                this.editSession(sessionId, sessionData);
            });
        });

        document.querySelectorAll('#session-details .delete-session-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sessionId = parseInt(e.currentTarget.dataset.sessionId, 10);
                this.deleteSession(sessionId);
            });
        });
    }

    // يطابق منطق حجم مربع البحث: يحدد ارتفاع الحاوية ويجعل التمرير داخلياً
    setupSessionsListScrollBox() {
        try {
            const wrapper = document.getElementById('sessions-list-wrapper');
            const list = document.getElementById('sessions-list');
            if (!wrapper || !list) return;

            const mainEl = document.querySelector('main');
            const viewportH = window.innerHeight;
            const top = wrapper.getBoundingClientRect().top;
            const targetH = Math.max(240, viewportH - top - 12);

            wrapper.style.height = targetH + 'px';
            wrapper.style.minHeight = '0px';
            list.style.maxHeight = (targetH - 48) + 'px'; // طرح ارتفاع الهيدر التقريبي
            list.style.overflowY = 'auto';

            if (mainEl) {
                mainEl.style.overflowY = 'hidden';
            }
        } catch (e) {}

        // إعادة الضبط عند تغيير المقاس
        if (!this.__sessionsListResizeBound) {
            this.__sessionsListResizeBound = true;
            window.addEventListener('resize', () => this.setupSessionsListScrollBox());
        }
    }

    // Add session functionality removed - this is management only

    async viewCaseData(sessionId) {
        try {
            // جلب بيانات الجلسة
            const sessionData = await getById('sessions', sessionId);
            if (!sessionData || !sessionData.caseId) {
                showToast('لم يتم العثور على بيانات القضية', 'error');
                return;
            }

            // جلب بيانات القضية
            const caseData = await getById('cases', sessionData.caseId);
            if (!caseData || !caseData.clientId) {
                showToast('لم يتم العثور على بيانات القضية أو الموكل', 'error');
                return;
            }

            // جلب بيانات الموكل
            const clientData = await getById('clients', caseData.clientId);
            if (!clientData) {
                showToast('لم يتم العثور على بيانات الموكل', 'error');
                return;
            }

            // فتح نافذة بيانات الأطراف للموكل مع حفظ حالة إدارة الجلسات
            navigateTo(displayClientViewForm, caseData.clientId);
            
        } catch (error) {
            console.error('Error viewing case data:', error);
            showToast('حدث خطأ في عرض بيانات القضية', 'error');
        }
    }

    editSession(sessionId, sessionData) {
        // حفظ الحالة الحالية قبل الانتقال
        this.saveState();
        // استخدام النموذج الموجود من sessions.js
        navigateTo(displaySessionForm, sessionId, sessionData);
    }

    async deleteSession(sessionId) {
        if (confirm('هل أنت متأكد من حذف هذه الجلسة؟')) {
            try {
                await deleteRecord('sessions', sessionId);
                await this.loadAllSessions(); // إعادة تحميل الجلسات
                this.updateContent(); // تحديث العرض والإحصائيات
                await updateCountersInHeader(); // تحديث العدادات
                showToast('تم حذف الجلسة بنجاح', 'success');
                
                // إخفاء تفاصيل الجلسة إذا كانت مفتوحة
                const detailsContainer = document.getElementById('session-details');
                if (detailsContainer) {
                    detailsContainer.classList.add('hidden');
                }
            } catch (error) {
                console.error('Error deleting session:', error);
                showToast('حدث خطأ أثناء حذف الجلسة', 'error');
            }
        }
    }
}

// Global variable to maintain calendar state
let globalSessionsCalendar = null;

// Global function to display sessions calendar
async function displaySessionsCalendar() {
    if (!globalSessionsCalendar) {
        globalSessionsCalendar = new SessionsCalendar();
    }
    await globalSessionsCalendar.init();
}

// استمع لحفظ الجلسات لإعادة تحميل التقويم
document.addEventListener('sessionSaved', async () => {
    // إذا كان التقويم مفتوح، أعد تحميله
    const modalTitle = document.getElementById('modal-title');
    if (modalTitle && modalTitle.textContent === 'إدارة الجلسات' && globalSessionsCalendar) {
        await globalSessionsCalendar.loadAllSessions();
        globalSessionsCalendar.updateContent();
    }
});