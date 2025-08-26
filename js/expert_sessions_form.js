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
                                    <label for="client-name" class="px-3 py-2 border-2 border-gray-300 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">الموكل</label>
                                    <div class="flex-1 relative -mr-px">
                                        <input type="text" id="client-name" autocomplete="off" class="w-full px-4 py-3 text-base bg-white border-2 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder:text-sm placeholder:font-normal placeholder:text-gray-400" value="${sessionData.clientId ? ((clients.find(c=>c.id===sessionData.clientId)||{}).name||'') : ''}" placeholder="اكتب أو اختر الموكل" required>
                                        <button type="button" id="client-name-toggle" class="absolute inset-y-0 left-0 flex items-center px-2 text-gray-500 hover:text-gray-700"><i class="ri-arrow-down-s-line"></i></button>
                                        <div id="client-name-dropdown" class="autocomplete-results hidden"></div>
                                        <input type="hidden" id="client-select" name="clientId" value="${sessionData.clientId || ''}">
                                    </div>
                                </div>
                            </div>
                            
                            <!-- اسم الخبير -->
                            <div>
                                <div class="flex items-stretch">
                                    <label for="expert-name-display" class="px-3 py-2 border-2 border-purple-300 bg-purple-50 text-sm font-bold text-purple-800 shrink-0 w-28 md:w-32 text-right rounded-r-lg">اسم الخبير</label>
                                    <div class="flex-1 relative -mr-px">
                                        <input type="text" id="expert-name-display" autocomplete="off" class="w-full px-4 py-3 text-base bg-white border-2 border-purple-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder:text-sm placeholder:font-normal placeholder:text-gray-400" value="${sessionData.expertName || ''}" placeholder="اكتب أو اختر اسم الخبير">
                                        <button type="button" id="expert-name-toggle" class="absolute inset-y-0 left-0 flex items-center px-2 text-gray-500 hover:text-gray-700"><i class="ri-arrow-down-s-line"></i></button>
                                        <div id="expert-name-dropdown" class="autocomplete-results hidden"></div>
                                        <input type="hidden" id="expert-name" name="expertName" value="${sessionData.expertName || ''}">
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- السطر الثاني: نوع الجلسة والحالة -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <!-- نوع الجلسة -->
                            <div>
                                <div class="flex items-stretch">
                                    <label for="session-type-display" class="px-3 py-2 border-2 border-gray-300 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">نوع الجلسة</label>
                                    <div class="flex-1 relative -mr-px">
                                        <input type="text" id="session-type-display" autocomplete="off" class="w-full px-4 py-3 text-base bg-white border-2 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder:text-sm placeholder:font-normal placeholder:text-gray-400" value="${sessionData.sessionType || ''}" placeholder="اكتب أو اختر نوع الجلسة">
                                        <button type="button" id="session-type-toggle" class="absolute inset-y-0 left-0 flex items-center px-2 text-gray-500 hover:text-gray-700"><i class="ri-arrow-down-s-line"></i></button>
                                        <div id="session-type-dropdown" class="autocomplete-results hidden"></div>
                                        <input type="hidden" id="session-type" name="sessionType" value="${sessionData.sessionType || ''}">
                                    </div>
                                </div>
                            </div>
                            
                            <!-- الحالة -->
                            <div>
                                <div class="flex items-stretch">
                                    <label for="status-display" class="px-3 py-2 border-2 border-gray-300 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">الحالة</label>
                                    <div class="flex-1 relative -mr-px">
                                        <input type="text" id="status-display" autocomplete="off" class="w-full px-4 py-3 text-base bg-white border-2 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder:text-sm placeholder:font-normal placeholder:text-gray-400" value="${sessionData.status || ''}" placeholder="اكتب أو اختر الحالة">
                                        <button type="button" id="status-toggle" class="absolute inset-y-0 left-0 flex items-center px-2 text-gray-500 hover:text-gray-700"><i class="ri-arrow-down-s-line"></i></button>
                                        <div id="status-dropdown" class="autocomplete-results hidden"></div>
                                        <input type="hidden" id="status" name="status" value="${sessionData.status || ''}">
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- السطر الثالث: تاريخ الجلسة ووقت الجلسة -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <!-- تاريخ الجلسة -->
                            <div>
                                <div class="flex items-stretch">
                                    <label for="session-date" class="px-3 py-2 border-2 border-gray-300 bg-gray-100 text-sm font-bold text-gray-700 shrink-0 w-28 md:w-32 text-right rounded-r-lg">تاريخ الجلسة</label>
                                    <div class="flex-1 -mr-px relative">
                                        <input type="text" id="session-date" name="sessionDate" value="${sessionData.sessionDate || ''}" placeholder="YYYY-MM-DD" class="w-full px-4 py-3 text-base bg-white border-2 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-right pr-10 -mr-px">
                                        <button type="button" id="open-date-picker-exp" class="absolute inset-y-0 left-2 flex items-center text-purple-600">
                                            <i class="ri-calendar-event-line"></i>
                                        </button>
                                        <div id="custom-date-picker-exp" class="absolute left-0 top-12 bg-white border border-gray-300 rounded-lg shadow-xl p-3 w-80 hidden z-50"></div>
                                    </div>
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
        
        (function(){
            const dateInput = document.getElementById('session-date');
            const dpBtn = document.getElementById('open-date-picker-exp');
            const dp = document.getElementById('custom-date-picker-exp');
            function pad(n){return n.toString().padStart(2,'0');}
            function toYMD(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());}
            function parseYMD(s){const ok = s && /^\d{4}-\d{2}-\d{2}$/.test(s); if(!ok) return null; const [y,mo,da]=s.split('-').map(Number); const d=new Date(y,mo-1,da); if(d.getFullYear()!==y||d.getMonth()!==mo-1||d.getDate()!==da) return null; return d;}
            function normalizeDMYString(s){ if(!s) return null; const m=s.trim().match(/^(\d{1,2})\D+(\d{1,2})\D+(\d{2,4})$/); if(!m) return null; let d=parseInt(m[1],10), mo=parseInt(m[2],10), y=parseInt(m[3],10); if(m[3].length===2){ y = y < 50 ? 2000 + y : 1900 + y; } const dt=new Date(y,mo-1,d); if(dt.getFullYear()!==y||dt.getMonth()!==mo-1||dt.getDate()!==d) return null; return toYMD(dt); }
            let viewDate = parseYMD(dateInput?.value) || new Date();
            function buildDPHTML(d){
                const months=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
                const dayNames=['سبت','أحد','اثنين','ثلاثاء','أربعاء','خميس','جمعة'];
                const y=d.getFullYear();
                const m=d.getMonth();
                const first=new Date(y,m,1);
                let start=first.getDay();
                const daysInMonth=new Date(y,m+1,0).getDate();
                const cells=[]; for(let i=0;i<start;i++) cells.push(''); for(let day=1; day<=daysInMonth; day++) cells.push(day); while(cells.length%7!==0) cells.push('');
                let grid='';
                for(const c of cells){ if(c==='') grid+=`<button type="button" class="w-10 h-10 text-center text-gray-300 cursor-default" disabled>-</button>`; else { const isSel = dateInput && dateInput.value && dateInput.value===toYMD(new Date(y,m,c)); grid+=`<button type=\"button\" data-day=\"${c}\" class=\"w-10 h-10 rounded ${isSel?'bg-purple-600 text-white':'hover:bg-purple-100 text-gray-800'}\">${c}</button>`; } }
                return `
                    <div class=\"flex items-center justify-between mb-2\">
                        <button type=\"button\" id=\"dp-next\" class=\"w-8 h-8 border rounded text-sm leading-none flex items-center justify-center\">›</button>
                        <div class=\"flex items-center gap-2\">
                            <select id=\"dp-month\" class=\"border rounded px-2 py-1 text-sm\">${months.map((nm,idx)=>`<option value=\"${idx}\" ${idx===m?'selected':''}>${nm}</option>`).join('')}</select>
                            <input id=\"dp-year\" type=\"number\" class=\"border rounded px-2 py-1 w-20 text-sm\" value=\"${y}\">
                        </div>
                        <button type=\"button\" id=\"dp-prev\" class=\"w-8 h-8 border rounded text-sm leading-none flex items-center justify-center\">‹</button>
                    </div>
                    <div class=\"grid grid-cols-7 gap-1 text-center text-xs text-gray-600 mb-1\">${dayNames.map(n=>`<div>${n}</div>`).join('')}</div>
                    <div class=\"grid grid-cols-7 gap-1 mb-2\">${grid}</div>
                    <div class=\"flex items-center justify-between gap-2\">
                        <div class=\"flex gap-2\">
                            <button type=\"button\" id=\"dp-today\" class=\"px-2 py-1 border rounded text-sm\">اليوم</button>
                            <button type=\"button\" id=\"dp-yesterday\" class=\"px-2 py-1 border rounded text-sm\">البارحة</button>
                            <button type=\"button\" id=\"dp-tomorrow\" class=\"px-2 py-1 border rounded text-sm\">غداً</button>
                        </div>
                        <button type=\"button\" id=\"dp-close\" class=\"px-2 py-1 border rounded text-sm\">إغلاق</button>
                    </div>`;
            }
            function attachDPHandlers(){
                if (dp) dp.addEventListener('click', (e)=> e.stopPropagation());
                const prev=dp.querySelector('#dp-prev');
                const next=dp.querySelector('#dp-next');
                const mSel=dp.querySelector('#dp-month');
                const yInp=dp.querySelector('#dp-year');
                if(prev) prev.addEventListener('click',(e)=>{ e.stopPropagation(); viewDate=new Date(viewDate.getFullYear(), viewDate.getMonth()-1, 1); renderDP(); });
                if(next) next.addEventListener('click',(e)=>{ e.stopPropagation(); viewDate=new Date(viewDate.getFullYear(), viewDate.getMonth()+1, 1); renderDP(); });
                if(mSel) { mSel.addEventListener('click',(e)=> e.stopPropagation()); mSel.addEventListener('change',(e)=>{ e.stopPropagation(); viewDate=new Date(viewDate.getFullYear(), parseInt(mSel.value), 1); renderDP(); }); }
                if(yInp) { yInp.addEventListener('click',(e)=> e.stopPropagation()); yInp.addEventListener('input',(e)=>{ e.stopPropagation(); const yy=parseInt(yInp.value)||viewDate.getFullYear(); viewDate=new Date(yy, viewDate.getMonth(), 1); }); yInp.addEventListener('change',(e)=>{ e.stopPropagation(); renderDP(); }); }
                dp.querySelectorAll('button[data-day]').forEach(b=>{ b.addEventListener('click',(e)=>{ e.stopPropagation(); const day=parseInt(b.getAttribute('data-day')); const d=new Date(viewDate.getFullYear(), viewDate.getMonth(), day); if(dateInput) dateInput.value=toYMD(d); dp.classList.add('hidden'); }); });
                const t=dp.querySelector('#dp-today');
                const yst=dp.querySelector('#dp-yesterday');
                const tm=dp.querySelector('#dp-tomorrow');
                const cl=dp.querySelector('#dp-close');
                if(t) t.addEventListener('click',(e)=>{ e.stopPropagation(); const d=new Date(); if(dateInput) dateInput.value=toYMD(d); dp.classList.add('hidden'); });
                if(yst) yst.addEventListener('click',(e)=>{ e.stopPropagation(); const d=new Date(); d.setDate(d.getDate()-1); if(dateInput) dateInput.value=toYMD(d); dp.classList.add('hidden'); });
                if(tm) tm.addEventListener('click',(e)=>{ e.stopPropagation(); const d=new Date(); d.setDate(d.getDate()+1); if(dateInput) dateInput.value=toYMD(d); dp.classList.add('hidden'); });
                if(cl) cl.addEventListener('click',(e)=>{ e.stopPropagation(); dp.classList.add('hidden'); });
            }
            function renderDP(){ if(dp) { dp.innerHTML=buildDPHTML(viewDate); attachDPHandlers(); } }
            function openDP(){ renderDP(); if(dp) dp.classList.remove('hidden'); }
            function outsideClose(e){ if(dp && !dp.contains(e.target) && e.target!==dpBtn && !e.target.closest('#open-date-picker-exp')) dp.classList.add('hidden'); }
            if(dpBtn && dp){ dpBtn.addEventListener('click',(e)=>{ e.stopPropagation(); openDP(); }); document.addEventListener('click', outsideClose); }
            const tryNormalizeManual = ()=>{ if(dateInput){ const n = normalizeDMYString(dateInput.value); if(n) dateInput.value = n; } };
            if(dateInput){ dateInput.addEventListener('blur', tryNormalizeManual); dateInput.addEventListener('change', tryNormalizeManual); }
        })();

        // ربط الأحداث
        attachExpertSessionFormListeners(sessionId);
    });
}