(function(){
function n(t){return typeof t==="string"?parseInt(t,10):typeof t==="number"?t:null}
function a(t){return Math.max(0,Math.ceil((t-Date.now())/86400000))}
function b(t){try{return new Date(t).toLocaleString('ar-EG')}catch(e){return String(t)}}
function g(){return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(h){const r=crypto.getRandomValues(new Uint8Array(1))[0]&15;const v=h==='x'?r:(r&3|8);return v.toString(16)})}
async function r(){try{await initDB()}catch(e){}
const d=Date.now();let s=await getSetting("licensed");s=s===true||s==="true";let i=n(await getSetting("trialStartMs"));let l=n(await getSetting("trialEndMs"));let c=n(await getSetting("lastSeenMs"));let k=await getSetting("installId");if(!k){k=g();try{await setSetting("installId",k)}catch(e){}}let w=await getSetting("licenseKeyHash");if(!i||!l){i=d;l=d+14*86400000;c=d;try{await setSetting("trialStartMs",i)}catch(e){}
try{await setSetting("trialEndMs",l)}catch(e){}
try{await setSetting("lastSeenMs",c)}catch(e){}
}
let o=false;if(!s){if(c&&d+3600000<c){o=true}else if(d>=l){o=true}else{try{await setSetting("lastSeenMs",d)}catch(e){}}}
function u(){if(!/settings\.html$/.test(window.location.pathname))return;const e=document.querySelector('#modal-content .grid');if(!e){setTimeout(u,50);return}let y=document.getElementById('trial-settings-card');if(!y){y=document.createElement('div');y.id='trial-settings-card';y.className='bg-white border-2 border-gray-300 rounded-xl p-3 shadow-md transition-all h-fit';e.insertAdjacentElement('afterbegin',y)}
const now=Date.now();const rem=a(l);const total=Math.max(0,Math.ceil((l-(i||now))/86400000));const start=i?b(i):'-';const end=l?b(l):'-';const last=b(c||now);const rollback=!!(c&&now+3600000<c);const expired=!s&&(now>=l);const status=s?'مرخّص':(rollback?'محاولة تغيير الوقت':(expired?'منتهي':'تجريبي'));const color=s?'green':((expired||rollback)?'red':'blue');const icon=s?'ri-shield-check-line':((expired||rollback)?'ri-time-line':'ri-key-line');let html='';html+='<div class="text-center mb-4">';html+='<div class="w-10 h-10 bg-'+color+'-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">';html+='<i class="'+icon+' text-white text-lg"></i>';html+='</div>';html+='<h3 class="text-base font-bold text-'+(s?'green':((expired||rollback)?'red':'blue'))+'-700 mb-1">الترخيص</h3>';html+='<p class="text-sm text-gray-600">'+status+'</p>';html+='</div>';if(!s){
html+='<div class="grid grid-cols-2 gap-2 text-sm">';
html+='<div class="text-gray-600">مدة التجربة</div><div class="text-gray-800 font-semibold text-left">'+total+' يوم</div>';
html+='<div class="text-gray-600">المتبقي</div><div class="text-gray-800 font-semibold text-left">'+rem+' يوم</div>';
html+='<div class="text-gray-600">أول تشغيل</div><div class="text-gray-800 font-semibold text-left">'+start+'</div>';
html+='<div class="text-gray-600">آخر ظهور</div><div class="text-gray-800 font-semibold text-left">'+last+'</div>';
html+='<div class="text-gray-600">نهاية التجربة</div><div class="text-gray-800 font-semibold text-left">'+end+'</div>';
html+='<div class="text-gray-600">مرخّص</div><div class="text-gray-800 font-semibold text-left">لا</div>';
if(w){html+='<div class="text-gray-600">License Hash</div><div class="text-gray-800 font-semibold text-left break-all">'+w+'</div>'}
html+='</div>';
html+='<div class="mt-3"><button id="trial-activate-settings" class="w-full px-4 py-3 bg-blue-900 text-white rounded-lg hover:bg-black transition-colors text-sm font-bold flex items-center justify-center gap-2 shadow-md"><i class="ri-check-line text-lg"></i>تفعيل</button></div>';
} else {
html+='<div class="grid grid-cols-2 gap-2 text-sm">';
html+='<div class="text-gray-600">مرخّص</div><div class="text-gray-800 font-semibold text-left">نعم</div>';
if(w){html+='<div class="text-gray-600">License Hash</div><div class="text-gray-800 font-semibold text-left break-all">'+w+'</div>'}
html+='</div>';
}
y.innerHTML=html;const btn=document.getElementById('trial-activate-settings');if(btn)btn.addEventListener('click',p)
}
function f(){let e=document.getElementById("trial-expired-overlay");if(e)return;e=document.createElement("div");e.id="trial-expired-overlay";e.className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90";e.innerHTML='<div class="w-[95vw] max-w-sm bg-white rounded-lg p-6 flex flex-col items-center gap-4"><div class="text-gray-800 text-base">انتهت الفترة التجريبية</div><button id="trial-activate-overlay" class="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-base">تفعيل</button></div>';
try{document.body.appendChild(e);document.body.style.overflow="hidden"}catch(h){}
const y=document.getElementById("trial-activate-overlay");if(y)y.addEventListener("click",p)
}
async function p(){const e=window.prompt("أدخل كود التفعيل");if(e===null)return;const v=e.trim();if(v==="1234"){const enc=new TextEncoder().encode(v);const buf=await crypto.subtle.digest('SHA-256',enc);const hex=Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');try{await setSetting("licenseKeyHash",hex)}catch(h){}try{await setSetting("licensed",true)}catch(h){}
s=true;w=hex;const y=document.getElementById("trial-expired-overlay");if(y){try{y.remove();document.body.style.overflow=""}catch(h){}}
u()}else{alert("الكود غير صحيح")}}
if(!s)u();if(o&&!s)f();if(s)u()}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",r)}else{r()}
})();