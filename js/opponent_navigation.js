// دالة تحديث عرض الخصم الحالي
function updateOpponentDisplay(opponents) {
    if (opponents.length === 0) return;
    
    const currentOpponent = opponents[currentOpponentIndex];
    
    // تحديث البيانات باستخدام selectors أكثر دقة
    const opponentSection = document.querySelector('.bg-red-50\\/50');
    if (!opponentSection) return;
    
    const dataFields = opponentSection.querySelectorAll('.space-y-4 .text-center .font-bold, .space-y-4 .text-center .font-medium');
    
    if (dataFields.length >= 4) {
        dataFields[0].textContent = currentOpponent.name || 'فارغ';
        dataFields[1].textContent = currentOpponent.capacity || 'فارغ';
        dataFields[2].textContent = currentOpponent.address || 'فارغ';
        dataFields[3].textContent = currentOpponent.phone || 'فارغ';
    }
    
    // تحديث زر التعديل
    const editBtn = document.querySelector('.edit-opponent-btn');
    if (editBtn) {
        editBtn.setAttribute('data-opponent-id', currentOpponent.id);
    }
    
    // تحديث المؤشر
    const indexSpan = document.getElementById('current-opponent-index');
    if (indexSpan) {
        indexSpan.textContent = currentOpponentIndex + 1;
    }
}