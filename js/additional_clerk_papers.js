// بيانات تجريبية إضافية لأوراق المحضرين
const additionalClerkPapers = [
    // أوراق محضرين للموكل الثالث (محمد عبد الله الشافعي) - قضية تعويض الحادث
    {
        clientId: 3,
        caseId: 4,
        clerkOffice: "قلم محضري محكمة الإسكندرية الابتدائية",
        paperType: "إعلان",
        paperNumber: "2024/6789",
        deliveryDate: "2024-03-25",
        receiptDate: "2024-03-28",
        notes: "إعلان بدعوى تعويض عن حادث سيارة وأضرار جسدية"
    },
    {
        clientId: 3,
        caseId: 4,
        clerkOffice: "قلم محضري محكمة الإسكندرية الابتدائية",
        paperType: "إنذار",
        paperNumber: "2024/7123",
        deliveryDate: "2024-04-20",
        receiptDate: "2024-04-23",
        notes: "إنذار ب��رورة تقديم تقرير طبي شامل عن الإصابات"
    },
    
    // أوراق محضرين للموكل الرابع (سارة أحمد محمود) - قضية النفقة
    {
        clientId: 4,
        caseId: 5,
        clerkOffice: "قلم محضري محكمة طنطا الابتدائية",
        paperType: "إعلان",
        paperNumber: "2024/8456",
        deliveryDate: "2024-04-05",
        receiptDate: "2024-04-08",
        notes: "إعلان بدعوى نفقة الأطفال وحضانة الأم"
    },
    {
        clientId: 4,
        caseId: 5,
        clerkOffice: "قلم محضري محكمة طنطا الابتدائية",
        paperType: "إنذار",
        paperNumber: "2024/8789",
        deliveryDate: "2024-05-15",
        receiptDate: "2024-05-18",
        notes: "إنذار بتنفيذ حكم النفقة المؤقتة للأطفال"
    },
    
    // أوراق محضرين للموكل الخامس (عمر حسام الدين) - قضية النزاع التجاري
    {
        clientId: 5,
        caseId: 7,
        clerkOffice: "قلم محضري محكمة الإسكندرية التجارية",
        paperType: "إعلان",
        paperNumber: "2024/9012",
        deliveryDate: "2024-05-05",
        receiptDate: "2024-05-08",
        notes: "إعلان بنزاع تجاري حول عقد توريد بضائع بقيمة 500 ألف جنيه"
    },
    {
        clientId: 5,
        caseId: 7,
        clerkOffice: "قلم محضري محكمة الإسكندرية التجارية",
        paperType: "إنذار",
        paperNumber: "2024/9345",
        deliveryDate: "2024-06-10",
        receiptDate: "2024-06-13",
        notes: "إنذار بضرورة تسليم البضائع المتفق عليها في العقد"
    },
    
    // أوراق محضرين للموكل السادس (نادية فؤاد عبد الرحمن) - قضية الإخلاء
    {
        clientId: 6,
        caseId: 8,
        clerkOffice: "قلم محضري محكمة دمياط الابتدائية",
        paperType: "إنذار",
        paperNumber: "2024/9678",
        deliveryDate: "2024-05-15",
        receiptDate: "2024-05-18",
        notes: "إنذار بإخلاء العقار المؤجر لانتهاء مدة الإيجار"
    }
];

// دالة لإضافة البيانات الإضافية لأوراق المحضرين
async function addAdditionalClerkPapers() {
    try {
        for (const paper of additionalClerkPapers) {
            await addRecord('clerkPapers', paper);
        }
        
        if (typeof showToast === 'function') {
            showToast('تم إضافة 7 أوراق محضرين إضافية بنجاح!', 'success');
        } else {
            alert('تم إضافة 7 أوراق محضرين إضافية بنجاح!');
        }
        
    } catch (error) {
        console.error('خطأ في إضافة أوراق المحضرين الإضافية:', error);
        if (typeof showToast === 'function') {
            showToast('حدث خطأ في إضافة أوراق المحضرين الإضافية', 'error');
        } else {
            alert('حدث خطأ في إضافة أوراق المحضرين الإضافية');
        }
    }
}