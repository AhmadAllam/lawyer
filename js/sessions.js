async function displaySessionList() {
    const embedded = document.getElementById('embedded-content');
    const container = embedded || document.getElementById('modal-content');
    const isEmbedded = !!embedded;

    if (!container) return;

    // عنوان النافذة
    if (!isEmbedded) {
        document.getElementById('modal-title').textContent = 'قائمة الجلسات';
        container.classList.remove('search-modal-content');
    }
    const pageHeaderTitle = document.getElementById('page-title');
    if (pageHeaderTitle) pageHeaderTitle.textContent = 'قائمة الجلسات';
    if (typeof setHeaderAsBack === 'function') setHeaderAsBack();

    const sessions = await getFromIndex('sessions', 'caseId', stateManager.currentCaseId);
    let sessionListHtml = '<div class="space-y-2">';
    if (sessions.length > 0) {
        sessions.sort((a,b) => (a.sessionDate > b.sessionDate) ? 1 : -1)
        sessions.forEach(s => {
            sessionListHtml += `
                <div class="p-3 bg-gray-100 rounded-lg flex justify-between items-center">
                    <div>
                        <p class="font-bold">تاريخ: ${s.sessionDate || 'غير محدد'}</p>
                        <p class="text-sm text-gray-600">${s.decision || 'لا يوجد قرار'}</p>
                    </div>
                    <div class="flex gap-2">
                        <button data-session-id="${s.id}" class="edit-session-btn text-blue-500 hover:text-blue-700"><i class="ri-pencil-line"></i></button>
                        <button data-session-id="${s.id}" class="delete-session-btn text-red-500 hover:text-red-700"><i class="ri-delete-bin-line"></i></button>
                    </div>
                </div>
            `;
        });
    } else {
        sessionListHtml += '<p class="text-center text-gray-500 p-4">لا توجد جلسات مضافة لهذه القضية.</p>';
    }
    sessionListHtml += '</div>';

    container.innerHTML = `
        <div id="session-list-container">${sessionListHtml}</div>
        <div class="flex justify-center mt-6">
             <button id="add-new-session-btn" class="w-full md:w-auto px-12 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
                <i class="ri-add-line"></i><span>إضافة جلسة جديدة</span>
             </button>
        </div>
    `;
    
    attachSessionListEventListeners();
    

    if (sessions.length === 1) {
        setTimeout(async () => {
            const sessionId = sessions[0].id;
            const sessionData = await getById('sessions', sessionId);
            navigateTo(displaySessionForm, sessionId, sessionData);
        }, 100);
    }
}

async function handleDeleteSession(sessionId) {
    if (confirm('هل أنت متأكد من حذف هذه الجلسة؟')) {
        try {
            await deleteRecord('sessions', sessionId);
            showToast('تم حذف الجلسة بنجاح.');
            await updateCountersInHeader();
            

            document.dispatchEvent(new CustomEvent('sessionSaved'));
            
            replaceCurrentView(displaySessionList);
        } catch (error) {
            showToast('حدث خطأ أثناء الحذف.');

        }
    }
}

function attachSessionListEventListeners() {
    document.getElementById('add-new-session-btn')?.addEventListener('click', () => navigateTo(displaySessionForm, null, null));

    document.querySelectorAll('.edit-session-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const sessionId = parseInt(e.currentTarget.dataset.sessionId, 10);
            const sessionData = await getById('sessions', sessionId);
            navigateTo(displaySessionForm, sessionId, sessionData);
        });
    });

    document.querySelectorAll('.delete-session-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const sessionId = parseInt(e.currentTarget.dataset.sessionId, 10);
            handleDeleteSession(sessionId);
        });
    });
}

function displaySessionForm(sessionId = null, sessionData = null) {
    const currentSessionData = sessionData || {};
    
    const embedded = document.getElementById('embedded-content');
    const container = embedded || document.getElementById('modal-content');
    const isEmbedded = !!embedded;

    if (!container) return;

    if (!isEmbedded) {
        const modalTitle = document.getElementById('modal-title');
        if (modalTitle) modalTitle.textContent = '';
        container.classList.remove('search-modal-content');
    }
    const pageHeaderTitle2 = document.getElementById('page-title');
    if (pageHeaderTitle2) pageHeaderTitle2.textContent = 'تعديل الجلسة';
    if (typeof setHeaderAsBack === 'function') setHeaderAsBack();

    container.innerHTML = `
        <div class="bg-white rounded-2xl p-6 shadow-2xl">
            <form id="session-form" class="space-y-6" novalidate>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 p-6 bg-blue-50 backdrop-blur-sm rounded-xl shadow-md">
                    <div class="flex items-stretch relative">
                        <label for="session-date" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg"><i class="ri-calendar-line text-blue-600 ml-2"></i>تاريخ الجلسة</label>
                        <div class="flex-1 -mr-px relative">
                            <input type="text" id="session-date" name="sessionDate" value="${currentSessionData.sessionDate || ''}" placeholder="YYYY-MM-DD" required class="w-full px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-600 text-right font-semibold text-gray-800 pr-10">
                            <button type="button" id="open-date-picker" class="absolute inset-y-0 left-2 flex items-center text-blue-600">
                                <i class="ri-calendar-event-line"></i>
                            </button>
                            <div id="custom-date-picker" class="absolute left-0 top-12 bg-white border border-gray-300 rounded-lg shadow-xl p-3 w-80 hidden z-50"></div>
                        </div>
                    </div>
                    <div class="flex items-stretch">
                        <label for="session-roll" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg"><i class="ri-list-check text-green-600 ml-2"></i>الرول</label>
                        <input type="text" id="session-roll" name="roll" value="${currentSessionData.roll || ''}" class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-600 text-right font-semibold text-gray-800 -mr-px">
                    </div>
                    <div class="flex items-stretch">
                        <label for="inventory-number" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg"><i class="ri-hashtag text-purple-600 ml-2"></i>رقم الحصر</label>
                        <input type="text" id="inventory-number" name="inventoryNumber" value="${currentSessionData.inventoryNumber || ''}" class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-600 text-right font-semibold text-gray-800 -mr-px">
                    </div>
                    <div class="flex items-stretch">
                        <label for="inventory-year" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg"><i class="ri-calendar-2-line text-orange-600 ml-2"></i>سنة الحصر</label>
                        <input type="text" id="inventory-year" name="inventoryYear" value="${currentSessionData.inventoryYear || ''}" class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-600 text-right font-semibold text-gray-800 -mr-px">
                    </div>
                                    </div>
                
                <!-- حقل القرار -->
                <div class="p-6 bg-blue-50 backdrop-blur-sm rounded-xl shadow-md">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="flex items-stretch">
                            <label for="session-decision" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg"><i class="ri-file-text-line text-indigo-600 ml-2"></i>القرار</label>
                            <textarea id="session-decision" name="decision" rows="4" placeholder="اكتب قرار الجلسة..." class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-600 text-right transition-colors resize-none font-semibold text-gray-800 -mr-px">${currentSessionData.decision || ''}</textarea>
                        </div>
                        <div class="flex items-stretch">
                            <label for="session-requests" class="px-3 py-3 border-2 border-gray-400 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg"><i class="ri-question-answer-line text-indigo-600 ml-2"></i>الطلبات</label>
                            <textarea id="session-requests" name="requests" rows="4" class="flex-1 px-3 py-3 bg-white border-2 border-gray-400 rounded-l-lg placeholder-gray-400 focus:ring-0 focus:border-blue-600 text-right transition-colors resize-none font-semibold text-gray-800 -mr-px">${currentSessionData.requests || ''}</textarea>
                        </div>
                    </div>
                </div>
                
                <div class="flex justify-center pt-4">
                    <button type="submit" class="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg font-bold flex items-center justify-center gap-3">
                        <i class="ri-save-3-line text-xl"></i><span>حفظ الجلسة</span>
                    </button>
                </div>
            </form>
        </div>
    `;
    const dateInput = document.getElementById('session-date');
    const dpBtn = document.getElementById('open-date-picker');
    const dp = document.getElementById('custom-date-picker');
    function pad(n){return n.toString().padStart(2,'0');}
    function toYMD(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());}
    function parseYMD(s){const ok = s && /^\d{4}-\d{2}-\d{2}$/.test(s); if(!ok) return null; const [y,mo,da]=s.split('-').map(Number); const d=new Date(y,mo-1,da); if(d.getFullYear()!==y||d.getMonth()!==mo-1||d.getDate()!==da) return null; return d;}
    function normalizeDMYString(s){
        if(!s) return null;
        const m = s.trim().match(/^(\d{1,2})\D+(\d{1,2})\D+(\d{2,4})$/);
        if(!m) return null;
        let d = parseInt(m[1],10), mo = parseInt(m[2],10), y = parseInt(m[3],10);
        if(m[3].length===2){ y = y < 50 ? 2000 + y : 1900 + y; }
        const dt = new Date(y, mo-1, d);
        if(dt.getFullYear()!==y || dt.getMonth()!==mo-1 || dt.getDate()!==d) return null;
        return toYMD(dt);
    }
    let viewDate = parseYMD(dateInput?.value) || new Date();
    function buildDPHTML(d){
        const months=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
        const y=d.getFullYear();
        const m=d.getMonth();
        const first=new Date(y,m,1);
        let start=first.getDay();
        const daysInMonth=new Date(y,m+1,0).getDate();
        const dayNames=['سبت','أحد','اثنين','ثلاثاء','أربعاء','خميس','جمعة'];
        const cells=[];
        for(let i=0;i<start;i++) cells.push('');
        for(let day=1; day<=daysInMonth; day++) cells.push(day);
        while(cells.length%7!==0) cells.push('');
        let grid='';
        for(const c of cells){
            if(c==='') grid+=`<button type="button" class="w-10 h-10 text-center text-gray-300 cursor-default" disabled>-</button>`;
            else {
                const isSel = dateInput && dateInput.value && dateInput.value===toYMD(new Date(y,m,c));
                grid+=`<button type="button" data-day="${c}" class="w-10 h-10 rounded ${isSel?'bg-blue-600 text-white':'hover:bg-blue-100 text-gray-800'}">${c}</button>`;
            }
        }
        return `
            <div class="flex items-center justify-between mb-2">
                <button type="button" id="dp-next" class="w-8 h-8 border rounded text-sm leading-none flex items-center justify-center">›</button>
                <div class="flex items-center gap-2">
                    <select id="dp-month" class="border rounded px-2 py-1 text-sm">
                        ${months.map((nm,idx)=>`<option value="${idx}" ${idx===m?'selected':''}>${nm}</option>`).join('')}
                    </select>
                    <input id="dp-year" type="number" class="border rounded px-2 py-1 w-20 text-sm" value="${y}">
                </div>
                <button type="button" id="dp-prev" class="w-8 h-8 border rounded text-sm leading-none flex items-center justify-center">‹</button>
            </div>
            <div class="grid grid-cols-7 gap-1 text-center text-xs text-gray-600 mb-1">
                ${dayNames.map(n=>`<div>${n}</div>`).join('')}
            </div>
            <div class="grid grid-cols-7 gap-1 mb-2">${grid}</div>
            <div class="flex items-center justify-between gap-2">
                <div class="flex gap-2">
                    <button type="button" id="dp-today" class="px-2 py-1 border rounded text-sm">اليوم</button>
                    <button type="button" id="dp-yesterday" class="px-2 py-1 border rounded text-sm">البارحة</button>
                    <button type="button" id="dp-tomorrow" class="px-2 py-1 border rounded text-sm">غداً</button>
                </div>
                <button type="button" id="dp-close" class="px-2 py-1 border rounded text-sm">إغلاق</button>
            </div>`;
    }
    function attachDPHandlers(){
        const prev=document.getElementById('dp-prev');
        const next=document.getElementById('dp-next');
        const mSel=document.getElementById('dp-month');
        const yInp=document.getElementById('dp-year');
        if (dp) dp.addEventListener('click', (e)=> e.stopPropagation());
        if(prev) prev.addEventListener('click',(e)=>{ e.stopPropagation(); viewDate=new Date(viewDate.getFullYear(), viewDate.getMonth()-1, 1); renderDP(); });
        if(next) next.addEventListener('click',(e)=>{ e.stopPropagation(); viewDate=new Date(viewDate.getFullYear(), viewDate.getMonth()+1, 1); renderDP(); });
        if(mSel) {
            mSel.addEventListener('click',(e)=> e.stopPropagation());
            mSel.addEventListener('change',(e)=>{ e.stopPropagation(); viewDate=new Date(viewDate.getFullYear(), parseInt(mSel.value), 1); renderDP(); });
        }
        if(yInp) {
            yInp.addEventListener('click',(e)=> e.stopPropagation());
            yInp.addEventListener('input',(e)=>{ e.stopPropagation(); const yy=parseInt(yInp.value)||viewDate.getFullYear(); viewDate=new Date(yy, viewDate.getMonth(), 1); });
            yInp.addEventListener('change',(e)=>{ e.stopPropagation(); renderDP(); });
        }
        dp.querySelectorAll('button[data-day]').forEach(b=>{
            b.addEventListener('click',(e)=>{ e.stopPropagation(); const day=parseInt(b.getAttribute('data-day')); const d=new Date(viewDate.getFullYear(), viewDate.getMonth(), day); if(dateInput) dateInput.value=toYMD(d); dp.classList.add('hidden'); });
        });
        const t=document.getElementById('dp-today');
        const yst=document.getElementById('dp-yesterday');
        const tm=document.getElementById('dp-tomorrow');
        const cl=document.getElementById('dp-close');
        if(t) t.addEventListener('click',(e)=>{ e.stopPropagation(); const d=new Date(); if(dateInput) dateInput.value=toYMD(d); dp.classList.add('hidden'); });
        if(yst) yst.addEventListener('click',(e)=>{ e.stopPropagation(); const d=new Date(); d.setDate(d.getDate()-1); if(dateInput) dateInput.value=toYMD(d); dp.classList.add('hidden'); });
        if(tm) tm.addEventListener('click',(e)=>{ e.stopPropagation(); const d=new Date(); d.setDate(d.getDate()+1); if(dateInput) dateInput.value=toYMD(d); dp.classList.add('hidden'); });
        if(cl) cl.addEventListener('click',(e)=>{ e.stopPropagation(); dp.classList.add('hidden'); });
    }
    function renderDP(){ if(dp) { dp.innerHTML=buildDPHTML(viewDate); attachDPHandlers(); } }
    function openDP(){ renderDP(); if(dp) dp.classList.remove('hidden'); }
    function outsideClose(e){ if(dp && !dp.contains(e.target) && e.target!==dpBtn && !e.target.closest('#open-date-picker')) dp.classList.add('hidden'); }
    if(dpBtn && dp){ dpBtn.addEventListener('click',(e)=>{ e.stopPropagation(); openDP(); }); document.addEventListener('click', outsideClose); }

    const tryNormalizeManual = ()=>{ if(dateInput){ const n = normalizeDMYString(dateInput.value); if(n) dateInput.value = n; } };
    if(dateInput){ dateInput.addEventListener('blur', tryNormalizeManual); dateInput.addEventListener('change', tryNormalizeManual); }

    document.getElementById('session-form').addEventListener('submit', (e) => handleSaveSession(e, sessionId));

    // عند العرض المدمج: لا نستخدم المودال، ونحافظ على سلوك العودة الافتراضي
    if (isEmbedded) {
        const modal = document.getElementById('modal');
        if (modal && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    }
}

async function handleSaveSession(e, sessionId) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newSessionData = Object.fromEntries(formData.entries());
    {
        const s = newSessionData.sessionDate ? newSessionData.sessionDate.trim() : '';
        const m = s.match(/^(\d{1,2})\D+(\d{1,2})\D+(\d{2,4})$/);
        if(m){
            const _pad = n=>n.toString().padStart(2,'0');
            let d = parseInt(m[1],10), mo = parseInt(m[2],10), y = parseInt(m[3],10);
            if(m[3].length===2){ y = y < 50 ? 2000 + y : 1900 + y; }
            const dt = new Date(y, mo-1, d);
            if(dt.getFullYear()===y && dt.getMonth()===mo-1 && dt.getDate()===d){
                newSessionData.sessionDate = `${y}-${_pad(mo)}-${_pad(d)}`;
            }
        }
    }

    const sessionDate = newSessionData.sessionDate?.trim() || '';
    const roll = newSessionData.roll?.trim() || '';
    const inventoryNumber = newSessionData.inventoryNumber?.trim() || '';
    const inventoryYear = newSessionData.inventoryYear?.trim() || '';
    const decision = newSessionData.decision?.trim() || '';
    const requests = newSessionData.requests?.trim() || '';
    
    const hasAnyData = sessionDate !== '' || roll !== '' || inventoryNumber !== '' || inventoryYear !== '' || decision !== '' || requests !== '';
    
    if (!hasAnyData) {
        showToast('يجب إدخال بيانات في أي حقل على الأقل قبل الحفظ', 'error');
        return;
    }

    try {
        if (sessionId) {
            const existingSession = await getById('sessions', sessionId);
            const updatedSession = { ...existingSession, ...newSessionData };
            await updateRecord('sessions', sessionId, updatedSession);
            showToast('تم تعديل الجلسة بنجاح.');
        } else {
            if (!stateManager.currentCaseId) {
                showToast("خطأ: لا يمكن إضافة جلسة بدون قضية.");
                return;
            }
            newSessionData.caseId = stateManager.currentCaseId;
            await addSession(newSessionData);
            showToast('تم حفظ الجلسة بنجاح.');
        }
        await updateCountersInHeader();
        
        // إرسال إشعار لتحديث التقويم
        document.dispatchEvent(new CustomEvent('sessionSaved'));
        
        // في الصفحة المستقلة لتعديل الجلسة لا نغادر بعد الحفظ
        if (window.STAY_ON_SAVE || window.location.pathname.includes('session-edit.html')) {
            return;
        }

        const modalTitle = document.getElementById('modal-title')?.textContent || '';
        

        if (window.location.pathname.includes('new.html') && stateManager.currentCaseId) {

            if (typeof displayCaseDetailsForm === 'function') {
                displayCaseDetailsForm();
            } else {
                navigateBack();
            }
        } else if (modalTitle.includes('بيانات الأطراف') && stateManager.currentCaseId) {
            navigateBack();

            setTimeout(async () => {
                if (window.loadCaseSessions && window.attachAddSessionButtonListener) {
                    await window.loadCaseSessions(stateManager.currentCaseId.toString());
                    window.attachAddSessionButtonListener();
                }
            }, 100);
        } else {
            navigateBack();
        }
    } catch (error) {
        showToast('حدث خطأ أثناء حفظ الجلسة.');

    }
}
