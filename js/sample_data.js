// بيانات تجريبية مبسطة
const sampleData = {
    clients: [
        {
            name: "أحمد محمد علي السيد",
            capacity: "بصفته الشخصية",
            address: "15 شارع الجمهورية، المنصورة، الدقهلية",
            phone: "01012345678"
        },
        {
            name: "فاطمة حسن إبراهيم",
            capacity: "بصفتها وريثة شرعية",
            address: "42 شارع النيل، أسيوط",
            phone: "01098765432"
        },
        {
            name: "محمد عبد الله الشافعي",
            capacity: "بصفته الشخصية",
            address: "28 شارع الثورة، الإسكندرية",
            phone: "01123456789"
        },
        {
            name: "سارة أحمد محمود",
            capacity: "بصفتها وكيلة عن زوجها",
            address: "65 شارع الجيش، طنطا، الغربية",
            phone: "01234567890"
        },
        {
            name: "عمر حسام الدين",
            capacity: "بصفته مدير شركة النور التجارية",
            address: "12 شارع البحر الأعظم، الإسكندرية",
            phone: "01345678901"
        },
        {
            name: "نادية فؤاد عبد الرحمن",
            capacity: "بصفتها الشخصية",
            address: "89 شارع الحرية، دمياط",
            phone: "01456789012"
        },
        {
            name: "خالد محمود السيد",
            capacity: "بصفته الشخصية",
            address: "33 شارع الجلاء، الزقازيق، الشرقية",
            phone: "01567890123"
        },
        {
            name: "منى عبد الحميد أحمد",
            capacity: "بصفتها وكيلة عن والدها",
            address: "77 شارع المحطة، بنها، القليوبية",
            phone: "01678901234"
        },
        {
            name: "يوسف علي حسن",
            capacity: "بصفته مدير شركة الأمل للتجارة",
            address: "21 شارع الكورنيش، أسوان",
            phone: "01789012345"
        },
        {
            name: "هدى محمد فتحي",
            capacity: "بصفتها الشخصية",
            address: "56 شارع الشهداء، المنيا",
            phone: "01890123456"
        },
        {
            name: "طارق سامي عبد الله",
            capacity: "بصفته الشخصية",
            address: "94 شارع الجامعة، بني سويف",
            phone: "01901234567"
        }
    ],
    opponents: [
        {
            name: "شركة العقارات المصرية المحدودة",
            capacity: "بصفتها شركة مساهمة",
            address: "مجمع التحرير، الدور الخامس، القاهرة",
            phone: "0225551234"
        },
        {
            name: "محمد عبد الرحمن طه",
            capacity: "بصفته الشخصية",
            address: "78 شارع الهرم، الجيزة",
            phone: "01155443322"
        },
        {
            name: "بنك مصر فرع المنصورة",
            capacity: "بصفته مؤسسة مصرفية",
            address: "شارع الجلاء، المنصورة، الدقهلية",
            phone: "0502345678"
        },
        {
            name: "شركة النقل والتوريدات الحديثة",
            capacity: "بصفتها شركة ذات مسئولية محدودة",
            address: "45 شارع الصناعة، العاشر من رمضان",
            phone: "0155667788"
        },
        {
            name: "أمينة سعد الدين محمد",
            capacity: "بصفتها الشخصية",
            address: "67 شارع الأزهر، القاهرة",
            phone: "01244556677"
        },
        {
            name: "البنك الأهلي المصري فرع أسيوط",
            capacity: "بصفته مؤسسة مصرفية",
            address: "شارع الثورة، أسيوط",
            phone: "0882334455"
        },
        {
            name: "شركة المقاولات العربية",
            capacity: "بصفتها شركة مساهمة",
            address: "مدينة نصر، القاهرة",
            phone: "0226677889"
        },
        {
            name: "حسام الدين عبد الفتاح",
            capacity: "بصفته الشخصية",
            address: "23 شارع السلام، الإسماعيلية",
            phone: "01355667788"
        },
        {
            name: "شركة التأمين الوطنية",
            capacity: "بصفتها شركة تأمين",
            address: "برج النيل، الدقي، الجيزة",
            phone: "0233445566"
        },
        {
            name: "مص��فى أحمد الجندي",
            capacity: "بصفته الشخصية",
            address: "88 شارع فؤاد، الإسكندرية",
            phone: "01466778899"
        },
        {
            name: "شركة الكهرباء والطاقة المتجددة",
            capacity: "بصفتها شركة حكومية",
            address: "العاصمة الإدارية الجديدة",
            phone: "0277889900"
        }
    ],
    cases: [
        {
            clientId: 1,
            opponentId: 1,
            caseNumber: "1234",
            caseYear: "2024",
            court: "محكمة المنصورة الابتدائية",
            caseType: "مدني",
            subject: "مطالبة بتسليم شقة سكنية",
            caseStatus: "جاري النظر",
            poaNumber: "POA-2024-001",
            poaDate: "2024-01-15",
            notes: "دعوى مطالبة بتسليم شقة سكنية"
        },
        {
            clientId: 2,
            opponentId: 2,
            caseNumber: "5678",
            caseYear: "2024",
            court: "محكمة أسيوط الابتدائية",
            caseType: "أحوال شخصية",
            subject: "قسمة تركة",
            caseStatus: "جاري النظر",
            poaNumber: "POA-2024-002",
            poaDate: "2024-02-01",
            notes: "دعوى قسمة تركة"
        },
        {
            clientId: 2,
            opponentId: 3,
            caseNumber: "9101",
            caseYear: "2024",
            court: "محكمة أسيوط التجارية",
            caseType: "تجاري",
            subject: "إلغاء حجز تحفظي",
            caseStatus: "جاري النظر",
            poaNumber: "POA-2024-003",
            poaDate: "2024-03-10",
            notes: "دعوى إلغاء حجز تحفظي"
        },
        {
            clientId: 3,
            opponentId: 1,
            caseNumber: "1122",
            caseYear: "2024",
            court: "محكمة الإسكندرية الابتدائية",
            caseType: "مدني",
            subject: "تعويض حادث سيارة",
            caseStatus: "جاري النظر",
            poaNumber: "POA-2024-004",
            poaDate: "2024-03-20",
            notes: "دعوى تعويض حادث سيارة"
        },
        {
            clientId: 4,
            opponentId: 2,
            caseNumber: "3344",
            caseYear: "2024",
            court: "محكمة طنطا الابتدائية",
            caseType: "أحوال شخصية",
            subject: "نفقة وحضانة أطفال",
            caseStatus: "جاري النظر",
            poaNumber: "POA-2024-005",
            poaDate: "2024-04-01",
            notes: "دعوى نفقة وحضانة"
        },
        {
            clientId: 5,
            opponentId: 1,
            caseNumber: "7788",
            caseYear: "2024",
            court: "محكمة الإسكندرية التجارية",
            caseType: "تجاري",
            subject: "نزاع تجاري",
            caseStatus: "جاري النظر",
            poaNumber: "POA-2024-007",
            poaDate: "2024-05-01",
            notes: "نزاع تجاري"
        },
        {
            clientId: 6,
            opponentId: 2,
            caseNumber: "9900",
            caseYear: "2024",
            court: "محكمة دمياط الابتدائية",
            caseType: "مدني",
            subject: "إخلاء عقار مؤجر",
            caseStatus: "جاري النظر",
            poaNumber: "POA-2024-008",
            poaDate: "2024-05-10",
            notes: "دعوى إخلاء عقار"
        },
        {
            clientId: 7,
            opponentId: 4,
            caseNumber: "2233",
            caseYear: "2024",
            court: "محكمة الزقازيق الابتدائية",
            caseType: "تجاري",
            subject: "مطالبة بقيمة بضائع",
            caseStatus: "جاري النظر",
            poaNumber: "POA-2024-009",
            poaDate: "2024-06-01",
            notes: "دعوى مطالبة بقيمة بضائع تالفة"
        },
        {
            clientId: 8,
            opponentId: 5,
            caseNumber: "4455",
            caseYear: "2024",
            court: "محكمة بنها الابتدائية",
            caseType: "مدني",
            subject: "فسخ عقد إيجار",
            caseStatus: "جاري النظر",
            poaNumber: "POA-2024-010",
            poaDate: "2024-06-15",
            notes: "دعوى فسخ عقد إيجار محل تجاري"
        },
        {
            clientId: 9,
            opponentId: 6,
            caseNumber: "6677",
            caseYear: "2024",
            court: "محكمة أسوان الابتدائية",
            caseType: "تجاري",
            subject: "تحصيل ديون تجارية",
            caseStatus: "جاري النظر",
            poaNumber: "POA-2024-011",
            poaDate: "2024-07-01",
            notes: "دعوى تحصيل ديون مستحقة"
        },
        {
            clientId: 10,
            opponentId: 7,
            caseNumber: "8899",
            caseYear: "2024",
            court: "محكمة المنيا الابتدائية",
            caseType: "مدني",
            subject: "تعويض أضرار مقاولات",
            caseStatus: "جاري النظر",
            poaNumber: "POA-2024-012",
            poaDate: "2024-07-15",
            notes: "دعوى تعويض أضرار في أعمال البناء"
        }
    ],
    sessions: [
        {
            clientId: 1,
            caseId: 1,
            sessionDate: "2024-04-15",
            sessionTime: "10:00",
            court: "محكمة المنصورة الابتدائية",
            sessionType: "مرافعة",
            notes: "جلسة مرافعة أولى"
        },
        {
            clientId: 2,
            caseId: 2,
            sessionDate: "2024-04-20",
            sessionTime: "11:30",
            court: "محكمة أسيوط الابتدائية",
            sessionType: "مرافعة",
            notes: "جلسة مناقشة تقرير الخبير"
        },
        {
            clientId: 3,
            caseId: 4,
            sessionDate: "2024-04-25",
            sessionTime: "09:00",
            court: "محكمة الإسكندرية الابتدائية",
            sessionType: "شهود",
            notes: "جلسة سماع شهود الحادث"
        },
        {
            clientId: 4,
            caseId: 5,
            sessionDate: "2024-05-05",
            sessionTime: "14:00",
            court: "محكمة طنطا الابتدائية",
            sessionType: "مرافعة",
            notes: "جلسة مناقشة البحث الاجتماعي"
        },
        {
            clientId: 5,
            caseId: 6,
            sessionDate: "2024-05-10",
            sessionTime: "10:30",
            court: "محكمة الإسكندرية التجارية",
            sessionType: "خبرة",
            notes: "جلسة تعيين خبير محاسبي"
        },
        {
            clientId: 6,
            caseId: 7,
            sessionDate: "2024-05-15",
            sessionTime: "12:00",
            court: "محكمة دمياط الابتدائية",
            sessionType: "معاينة",
            notes: "جلسة معاينة العقار"
        },
        {
            clientId: 1,
            caseId: 1,
            sessionDate: "2024-06-05",
            sessionTime: "10:15",
            court: "محكمة المنصورة الابتدائية",
            sessionType: "حكم",
            notes: "جلسة النطق بالحكم"
        },
        {
            clientId: 7,
            caseId: 8,
            sessionDate: "2025-08-18",
            sessionTime: "09:30",
            court: "محكمة الزقازيق الابتدائية",
            sessionType: "مرافعة",
            notes: "جلسة مرافعة نهائية"
        },
        {
            clientId: 8,
            caseId: 9,
            sessionDate: "2025-08-18",
            sessionTime: "11:00",
            court: "محكمة بنها الابتدائية",
            sessionType: "صلح",
            notes: "جلسة محاولة صلح"
        },
        {
            clientId: 9,
            caseId: 10,
            sessionDate: "2025-08-18",
            sessionTime: "13:30",
            court: "محكمة أسوان الابتدائية",
            sessionType: "مرافعة",
            notes: "جلسة مناقشة المستندات"
        },
        {
            clientId: 10,
            caseId: 11,
            sessionDate: "2025-08-18",
            sessionTime: "10:15",
            court: "محكمة المنيا الابتدائية",
            sessionType: "خبرة",
            notes: "جلسة تعيين خبير هندسي"
        }
    ],
    accounts: [
        {
            clientId: 1,
            caseId: 1,
            transactionType: "استلام أتعاب",
            amount: 5000,
            transactionDate: "2024-01-20",
            description: "أتعاب قضية تسليم الشقة",
            paymentMethod: "نقدي"
        },
        {
            clientId: 2,
            caseId: 2,
            transactionType: "استلام أتعاب",
            amount: 7500,
            transactionDate: "2024-02-05",
            description: "أتعاب قضية قسمة التركة",
            paymentMethod: "تحويل بنكي"
        },
        {
            clientId: 3,
            caseId: 4,
            transactionType: "استلام أتعاب",
            amount: 6000,
            transactionDate: "2024-03-25",
            description: "أتعاب قضية تعويض الحادث",
            paymentMethod: "شيك"
        },
        {
            clientId: 4,
            caseId: 5,
            transactionType: "استلام أتعاب",
            amount: 4500,
            transactionDate: "2024-04-05",
            description: "أتعاب قضية النفقة والحضانة",
            paymentMethod: "نقدي"
        },
        {
            clientId: 5,
            caseId: 6,
            transactionType: "استلام أتعاب",
            amount: 8000,
            transactionDate: "2024-05-05",
            description: "أتعاب النزاع التجاري",
            paymentMethod: "تحويل بنكي"
        },
        {
            clientId: 6,
            caseId: 7,
            transactionType: "استلام أتعاب",
            amount: 3500,
            transactionDate: "2024-05-15",
            description: "أتعاب قضية الإخلاء",
            paymentMethod: "نقدي"
        },
        {
            clientId: 7,
            caseId: 8,
            transactionType: "استلام أتعاب",
            amount: 5500,
            transactionDate: "2024-06-05",
            description: "أتعاب قضية البضائع التالفة",
            paymentMethod: "شيك"
        },
        {
            clientId: 8,
            caseId: 9,
            transactionType: "استلام أتعاب",
            amount: 4000,
            transactionDate: "2024-06-20",
            description: "أتعاب فسخ عقد الإيجار",
            paymentMethod: "تحويل بنكي"
        },
        {
            clientId: 9,
            caseId: 10,
            transactionType: "استلام أتعاب",
            amount: 6500,
            transactionDate: "2024-07-05",
            description: "أتعاب تحصيل الديون",
            paymentMethod: "نقد��"
        },
        {
            clientId: 10,
            caseId: 11,
            transactionType: "استلام أتعاب",
            amount: 7000,
            transactionDate: "2024-07-20",
            description: "أتعاب قضية أضرار المقاولات",
            paymentMethod: "شيك"
        },
        {
            clientId: 1,
            caseId: 1,
            transactionType: "مصروفات",
            amount: -500,
            transactionDate: "2024-02-01",
            description: "رسوم المحكمة وطوابع",
            paymentMethod: "نقدي"
        }
    ],
    administrative: [
        {
            clientId: 1,
            workType: "إعداد مذكرة دفاع",
            description: "إعداد مذكرة دفاع في قضية تسليم الشقة",
            assignedDate: "2024-01-25",
            dueDate: "2024-02-05",
            completed: true,
            completedDate: "2024-02-03",
            notes: "تم إعداد المذكرة وتقديمها للمحكمة"
        },
        {
            clientId: 2,
            workType: "جمع مستندات",
            description: "جمع مستندات التركة والوثائق المطلوبة",
            assignedDate: "2024-02-10",
            dueDate: "2024-02-20",
            completed: true,
            completedDate: "2024-02-18",
            notes: "تم جمع جميع المستندات المطلوبة"
        },
        {
            clientId: 3,
            workType: "إعداد تقرير طبي",
            description: "متابعة إعداد التقرير الطبي للحادث",
            assignedDate: "2024-03-30",
            dueDate: "2024-04-10",
            completed: true,
            completedDate: "2024-04-08",
            notes: "تم الحصول على التقرير الطبي النهائي"
        },
        {
            clientId: 4,
            workType: "بحث اجتماعي",
            description: "متابعة إجراء البحث الاجتماعي للأطفال",
            assignedDate: "2024-04-10",
            dueDate: "2024-04-25",
            completed: true,
            completedDate: "2024-04-22",
            notes: "تم إنجاز البحث الاجتماعي"
        },
        {
            clientId: 5,
            workType: "مراجعة عقود",
            description: "مراجعة العقود التجارية المت��ازع عليها",
            assignedDate: "2024-05-10",
            dueDate: "2024-05-20",
            completed: false,
            completedDate: null,
            notes: "جاري مراجعة العقود"
        },
        {
            clientId: 6,
            workType: "إعداد إنذار",
            description: "إعداد إنذار بالإخلاء للمستأجر",
            assignedDate: "2024-05-20",
            dueDate: "2024-05-30",
            completed: true,
            completedDate: "2024-05-28",
            notes: "تم إعداد وتوجيه الإنذار"
        },
        {
            clientId: 11,
            workType: "إعداد لائحة دعوى",
            description: "إعداد لائحة دعوى جديدة",
            assignedDate: "2025-08-17",
            dueDate: "2025-08-18",
            completed: false,
            completedDate: null,
            notes: "جاري إعداد اللائحة"
        },
        {
            clientId: 7,
            workType: "تقييم أضرار",
            description: "تقييم الأضرار في البضائع التالفة",
            assignedDate: "2025-08-17",
            dueDate: "2025-08-18",
            completed: false,
            completedDate: null,
            notes: "جاري التقييم مع الخبير"
        },
        {
            clientId: 8,
            workType: "مراجعة عقد إيجار",
            description: "مراجعة بنود عقد الإيجار المتنازع عليه",
            assignedDate: "2025-08-17",
            dueDate: "2025-08-18",
            completed: false,
            completedDate: null,
            notes: "جاري مراجعة بنود العقد"
        },
        {
            clientId: 9,
            workType: "حصر ديون",
            description: "حصر الديون المستحقة للشركة",
            assignedDate: "2025-08-17",
            dueDate: "2025-08-18",
            completed: false,
            completedDate: null,
            notes: "جاري حصر الديون"
        },
        {
            clientId: 10,
            workType: "فحص مواصفات",
            description: "فحص مواصفات أعمال البناء المنجزة",
            assignedDate: "2025-08-17",
            dueDate: "2025-08-25",
            completed: false,
            completedDate: null,
            notes: "جاري الفحص مع المهندس"
        }
    ],
    clerkPapers: [
        {
            clientId: 1,
            caseId: 1,
            clerkOffice: "قلم محضري محكمة ��لمنصورة الابتدائية",
            paperType: "إنذار",
            paperNumber: "2024/1567",
            deliveryDate: "2024-03-15",
            receiptDate: "2024-03-18",
            notes: "إنذار بتسليم الشقة"
        },
        {
            clientId: 1,
            caseId: 1,
            clerkOffice: "قلم محضري محكمة المنصورة الابتدائية",
            paperType: "إعلان",
            paperNumber: "2024/1890",
            deliveryDate: "2024-04-10",
            receiptDate: "2024-04-12",
            notes: "إعلان بجلسة المرافعة"
        },
        {
            clientId: 2,
            caseId: 2,
            clerkOffice: "قلم محضري محكمة أسيوط الابتدائية",
            paperType: "إعلان",
            paperNumber: "2024/3456",
            deliveryDate: "2024-02-28",
            receiptDate: "2024-03-02",
            notes: "إعلان بدعوى قسمة التركة"
        },
        {
            clientId: 2,
            caseId: 3,
            clerkOffice: "قلم محضري محكمة أسيوط التجارية",
            paperType: "إعلان",
            paperNumber: "2024/4123",
            deliveryDate: "2024-03-20",
            receiptDate: "2024-03-23",
            notes: "إعلان بطلب إلغاء الحجز"
        },
        {
            clientId: 3,
            caseId: 4,
            clerkOffice: "قلم محضري محكمة الإسكندرية الابتدائية",
            paperType: "إعلان",
            paperNumber: "2024/6789",
            deliveryDate: "2024-03-25",
            receiptDate: "2024-03-28",
            notes: "إعلان بدعوى تعويض حادث"
        },
        {
            clientId: 3,
            caseId: 4,
            clerkOffice: "قلم محضري محكمة الإسكندرية الابتدائية",
            paperType: "إنذار",
            paperNumber: "2024/7123",
            deliveryDate: "2024-04-20",
            receiptDate: "2024-04-23",
            notes: "إنذار بتقديم تقرير طبي"
        },
        {
            clientId: 4,
            caseId: 5,
            clerkOffice: "قلم ��حضري محكمة طنطا الابتدائية",
            paperType: "إعلان",
            paperNumber: "2024/8456",
            deliveryDate: "2024-04-05",
            receiptDate: "2024-04-08",
            notes: "إعلان بدعوى نفقة الأطفال"
        },
        {
            clientId: 4,
            caseId: 5,
            clerkOffice: "قلم محضري محكمة طنطا الابتدائية",
            paperType: "إنذار",
            paperNumber: "2024/8789",
            deliveryDate: "2024-05-15",
            receiptDate: "2024-05-18",
            notes: "إنذار بتنفيذ حكم النفقة"
        },
        {
            clientId: 5,
            caseId: 6,
            clerkOffice: "قلم محضري محكمة الإسكندرية التجارية",
            paperType: "إعلان",
            paperNumber: "2024/9012",
            deliveryDate: "2024-05-05",
            receiptDate: "2024-05-08",
            notes: "إعلان بنزاع تجاري"
        },
        {
            clientId: 6,
            caseId: 7,
            clerkOffice: "قلم محضري محكمة دمياط الابتدائية",
            paperType: "إنذار",
            paperNumber: "2024/9678",
            deliveryDate: "2024-05-15",
            receiptDate: "2024-05-18",
            notes: "إنذار بإخلاء العقار"
        },
        {
            clientId: 7,
            caseId: 8,
            clerkOffice: "قلم محضري محكمة الزقازيق الابتدائية",
            paperType: "إعلان",
            paperNumber: "2024/1011",
            deliveryDate: "2024-06-10",
            receiptDate: "2024-06-13",
            notes: "إعلان بدعوى البضائع التالفة"
        }
    ],
    expertSessions: [
        {
            clientId: 1,
            caseId: 1,
            expertName: "المهندس محمد حسن الخبير",
            sessionType: "معاينة عقار",
            sessionDate: "2024-04-15",
            sessionTime: "10:00",
            location: "الشقة محل النزاع - 15 شارع الجمهورية، المنصورة",
            status: "تمت",
            notes: "تم معاينة الشقة وتحديد حالتها الفنية"
        },
        {
            clientId: 1,
            caseId: 1,
            expertName: "المهندس محمد حسن الخبير",
            sessionType: "تقرير فني",
            sessionDate: "2024-04-25",
            sessionTime: "14:00",
            location: "مكتب الخبير - شارع الثورة، المنصورة",
            status: "تمت",
            notes: "تسليم التقرير الفني النهائي للمحكمة"
        },
        {
            clientId: 2,
            caseId: 2,
            expertName: "الأستاذ أحمد فؤاد خبير التقييم",
            sessionType: "تقييم عقاري",
            sessionDate: "2024-03-20",
            sessionTime: "11:00",
            location: "العقار محل التركة - أسيوط",
            status: "تمت",
            notes: "تقييم العقارات الداخلة في التركة"
        },
        {
            clientId: 2,
            caseId: 3,
            expertName: "الأستاذ سامي محمود المحاسب القانوني",
            sessionType: "خبرة محاسبية",
            sessionDate: "2024-04-10",
            sessionTime: "09:30",
            location: "مكتب الخبير - شارع الجلاء، أسيوط",
            status: "تمت",
            notes: "فحص الحسابات المصرفية المحجوزة"
        },
        {
            clientId: 3,
            caseId: 4,
            expertName: "الدكتور عمر سليمان استشاري الطب الشرعي",
            sessionType: "فحص طبي",
            sessionDate: "2024-04-05",
            sessionTime: "16:00",
            location: "مستشفى الإسكندرية الجامعي",
            status: "تمت",
            notes: "فحص الإصابات وتحديد نسبة العجز"
        },
        {
            clientId: 3,
            caseId: 4,
            expertName: "المهندس خالد رشاد خبير السيارات",
            sessionType: "فحص تقني",
            sessionDate: "2024-04-12",
            sessionTime: "13:00",
            location: "موقع الحادث - طريق الإسكندرية الصحراوي",
            status: "تمت",
            notes: "معاينة موقع الحادث وفحص السيارات"
        },
        {
            clientId: 4,
            caseId: 5,
            expertName: "الأستاذ محمد علي الخبير الاجتماعي",
            sessionType: "بحث اجتماعي",
            sessionDate: "2024-04-18",
            sessionTime: "15:00",
            location: "منزل الأسرة - طنطا",
            status: "تمت",
            notes: "بحث الحالة الاجتماعية للأطفال"
        },
        {
            clientId: 5,
            caseId: 6,
            expertName: "الأستاذ يوسف حسن المحاسب القانوني",
            sessionType: "خبرة محاسبية",
            sessionDate: "2024-05-20",
            sessionTime: "10:30",
            location: "مقر شركة النور التجارية - الإسكندرية",
            status: "مجدولة",
            notes: "فحص الدفاتر التجارية وحساب الأضرار"
        },
        {
            clientId: 6,
            caseId: 7,
            expertName: "المهندس سامي عبد الرحمن خبير العقارات",
            sessionType: "معاينة عقار",
            sessionDate: "2024-05-22",
            sessionTime: "11:30",
            location: "العقار المؤجر - دمياط",
            status: "مجدولة",
            notes: "معاينة حالة العقار وتحديد الأضرار"
        },
        {
            clientId: 7,
            caseId: 8,
            expertName: "الدكتور أحمد صلاح خبير البضائع",
            sessionType: "فحص بضائع",
            sessionDate: "2024-06-15",
            sessionTime: "09:00",
            location: "مخازن الشركة - الزقازيق",
            status: "مجدولة",
            notes: "فحص جودة البضائع التالفة"
        },
        {
            clientId: 8,
            caseId: 9,
            expertName: "الأستاذ حسام الدين خبير العقارات",
            sessionType: "تقييم عقار",
            sessionDate: "2024-06-25",
            sessionTime: "14:30",
            location: "المحل التجاري - بنها",
            status: "مجدولة",
            notes: "تقييم قيمة المحل الإيجارية"
        }
    ]
};

// دالة لإضافة البيانات التجريبية
async function addSampleData() {
    try {
        // إضافة الموكلين
        for (const client of sampleData.clients) {
            await addClient(client);
        }
        
        // إضافة الخصوم
        for (const opponent of sampleData.opponents) {
            await addOpponent(opponent);
        }
        
        // إضافة القضايا
        for (const caseData of sampleData.cases) {
            await addCase(caseData);
        }
        
        // إضافة الجلسات
        for (const session of sampleData.sessions) {
            await addRecord('sessions', session);
        }
        
        // إضافة الحسابات
        for (const account of sampleData.accounts) {
            await addRecord('accounts', account);
        }
        
        // إضافة الأعمال الإدارية
        for (const work of sampleData.administrative) {
            await addRecord('administrative', work);
        }
        
        // إضافة أوراق المحضرين
        for (const paper of sampleData.clerkPapers) {
            await addRecord('clerkPapers', paper);
        }
        
        // إضافة جلسات الخبراء
        for (const session of sampleData.expertSessions) {
            await addRecord('expertSessions', session);
        }
        
        await updateCountersInHeader();
        
        if (typeof showToast === 'function') {
            showToast('تم إضافة البيانات التجريبية بنجاح!', 'success');
        } else {
            alert('تم إضافة البيانات التجريبية بنجاح!');
        }
        
    } catch (error) {
        console.error('خطأ في إضافة البيانات:', error);
        if (typeof showToast === 'function') {
            showToast('حدث خطأ في إضافة البيانات', 'error');
        }
    }
}

// دالة لحذف جميع البيانات
async function clearAllData() {
    try {
        const stores = ['clients', 'opponents', 'cases', 'sessions', 'accounts', 'administrative', 'clerkPapers', 'expertSessions'];
        
        for (const storeName of stores) {
            const transaction = db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            await new Promise((resolve, reject) => {
                const request = store.clear();
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        }
        
        await updateCountersInHeader();
        
        if (typeof showToast === 'function') {
            showToast('تم حذف جميع البيانات بنجاح', 'success');
        }
        
    } catch (error) {
        console.error('خطأ في حذف البيانات:', error);
    }
}