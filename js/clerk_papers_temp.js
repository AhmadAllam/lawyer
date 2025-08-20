// إعداد صندوق التمرير لأوراق المحضرين
function setupClerkPapersScrollBox() {
    try {
        const rightWrapper = document.querySelector('#modal-content .flex-1 > div');
        const clerkPapersList = document.getElementById('clerk-papers-list');
        if (!rightWrapper || !clerkPapersList) return;
        
        const viewportH = window.innerHeight;
        const wrapperTop = rightWrapper.getBoundingClientRect().top;
        const targetH = Math.max(240, viewportH - wrapperTop - 12);
        
        rightWrapper.style.height = targetH + 'px';
        rightWrapper.style.minHeight = '0px';
        
        clerkPapersList.style.maxHeight = (targetH - 24) + 'px';
        clerkPapersList.style.overflowY = 'auto';
        
        const leftPane = document.querySelector('#modal-content .w-1/3');
        if (leftPane) {
            leftPane.style.maxHeight = targetH + 'px';
            leftPane.style.minHeight = '0px';
            leftPane.style.overflowY = 'auto';
        }
    } catch (e) {}
}

// إعداد سلوك التمرير عند التحويم لأوراق المحضرين
function setupClerkPapersHoverScrollBehavior() {
    const leftPane = document.querySelector('#modal-content .w-1/3');
    const rightList = document.getElementById('clerk-papers-list');
    const mainEl = document.querySelector('main');
    if (!leftPane || !rightList || !mainEl) return;

    // افتراضي: تمرير الصفحة مفعل
    const enablePageScroll = () => {
        mainEl.style.overflowY = 'auto';
        document.body.style.overflowY = '';
        rightList.style.overscrollBehavior = 'contain';
    };

    const enableRightListScrollOnly = () => {
        mainEl.style.overflowY = 'hidden';
        rightList.style.overscrollBehavior = 'contain';
    };

    // عند التحويم على الجانب الأيسر -> تمرير الصفحة
    leftPane.addEventListener('mouseenter', enablePageScroll);
    leftPane.addEventListener('mouseleave', enableRightListScrollOnly);

    // عند التحويم على قائمة أوراق المحضرين -> تمرير داخلي
    rightList.addEventListener('mouseenter', enableRightListScrollOnly);
    rightList.addEventListener('mouseleave', enablePageScroll);

    // تهيئة الحالة بناءً على موضع المؤشر الأولي
    enablePageScroll();
}