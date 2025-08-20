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
            address: "56 شارع الشهداء، ا��منيا",
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
            address: "45 شارع الصناعة، العاشر من رم��ان",
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
            capacity: "بصف��ها شركة تأمين",
            address: "برج النيل، الدقي، الجيزة",
            phone: "0233445566"
        },
        {
            name: "مصطفى أحمد الجندي",
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
            appealNumber: "567",
            appealYear: "2024",
            cassationNumber: "890",
            cassationYear: "2024",
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
            appealNumber: "234",
            appealYear: "2024",
            cassationNumber: "456",
            cassationYear: "2024",
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
            appealNumber: "789",
            appealYear: "2024",
            cassationNumber: "123",
            cassationYear: "2024",
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
            appealNumber: "345",
            appealYear: "2024",
            cassationNumber: "678",
            cassationYear: "2024",
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
            appealNumber: "901",
            appealYear: "2024",
            cassationNumber: "234",
            cassationYear: "2024",
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
            appealNumber: "456",
            appealYear: "2024",
            cassationNumber: "789",
            cassationYear: "2024",
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
            appealNumber: "112",
            appealYear: "2024",
            cassationNumber: "334",
            cassationYear: "2024",
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
            appealNumber: "556",
            appealYear: "2024",
            cassationNumber: "778",
            cassationYear: "2024",
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
            appealNumber: "990",
            appealYear: "2024",
            cassationNumber: "112",
            cassationYear: "2025",
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
            appealNumber: "334",
            appealYear: "2024",
            cassationNumber: "556",
            cassationYear: "2025",
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
            appealNumber: "778",
            appealYear: "2024",
            cassationNumber: "990",
            cassationYear: "2025",
            notes: "دعوى تعويض أضرار في أعمال البناء"
        }
    ,
        {
            clientId: 11,
            opponentId: 7,
            caseNumber: "9911",
            caseYear: "2024",
            court: "محكمة بني سويف الابتدائية",
            caseType: "مدني",
            subject: "مطالبة بقيمة عقد مقاولة",
            caseStatus: "جاري النظر",
            poaNumber: "POA-2024-013",
            poaDate: "2024-08-01",
            appealNumber: "112",
            appealYear: "2025",
            cassationNumber: "223",
            cassationYear: "2025",
            notes: "دعوى مطالبة بمستحقات مقاولات"
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
            roll: "12",
            inventoryNumber: "456",
            inventoryYear: "2024",
            decision: "تأجيل الجلسة لجلسة 15/5/2024 لسماع الشهود",
            notes: "جلسة مرافعة أولى"
        },
        {
            clientId: 2,
            caseId: 2,
            sessionDate: "2024-04-20",
            sessionTime: "11:30",
            court: "محكمة أسيوط الابتدائية",
            sessionType: "مرافعة",
            roll: "8",
            inventoryNumber: "789",
            inventoryYear: "2024",
            decision: "قبول الدعوى شكلا وموضوعا وتأجيل لجلسة 20/5/2024",
            notes: "جلسة مناقشة تقرير الخبير"
        },
        {
            clientId: 2,
            caseId: 2,
            sessionDate: "2024-05-20",
            sessionTime: "10:00",
            court: "محكمة أسيوط الابتدائية",
            sessionType: "خبرة",
            roll: "8",
            inventoryNumber: "789",
            inventoryYear: "2024",
            decision: "تعيين خبير تقييم عقاري وتأجيل لجلسة 20/6/2024",
            notes: "جلسة تعيين خبير التقييم"
        },
        {
            clientId: 2,
            caseId: 2,
            sessionDate: "2024-06-20",
            sessionTime: "11:00",
            court: "محكمة أسيوط الابتدائية",
            sessionType: "مناقشة تقرير",
            roll: "8",
            inventoryNumber: "789",
            inventoryYear: "2024",
            decision: "م��اقشة تقرير الخبير وتأجيل لجلسة 20/7/2024 للحكم",
            notes: "جلسة مناقشة تقرير الخبير"
        },
        {
            clientId: 2,
            caseId: 2,
            sessionDate: "2024-07-20",
            sessionTime: "09:30",
            court: "محكمة أسيوط الابتدائية",
            sessionType: "حكم",
            roll: "8",
            inventoryNumber: "789",
            inventoryYear: "2024",
            decision: "الحكم بقسمة التركة وفقا لتقرير الخبير",
            notes: "جلسة النطق بالحكم النهائي"
        },
        {
            clientId: 2,
            caseId: 3,
            sessionDate: "2024-04-10",
            sessionTime: "14:00",
            court: "محكمة أسيوط التجارية",
            sessionType: "مرافعة",
            roll: "15",
            inventoryNumber: "321",
            inventoryYear: "2024",
            decision: "تأجيل لجلسة 10/5/2024 لتقديم المستندات",
            notes: "جلسة مرافعة أولى"
        },
        {
            clientId: 2,
            caseId: 3,
            sessionDate: "2024-05-10",
            sessionTime: "13:30",
            court: "محكمة أس��وط التجارية",
            sessionType: "مستندات",
            roll: "15",
            inventoryNumber: "321",
            inventoryYear: "2024",
            decision: "تقديم المستندات وتأجيل لجلسة 10/6/2024",
            notes: "جلسة تقديم المستندات المطلوبة"
        },
        {
            clientId: 2,
            caseId: 3,
            sessionDate: "2024-06-10",
            sessionTime: "12:00",
            court: "محكمة أسيوط التجارية",
            sessionType: "مرافعة",
            roll: "15",
            inventoryNumber: "321",
            inventoryYear: "2024",
            decision: "مرافعة نهائية وتأجيل لجلسة 10/7/2024 للحكم",
            notes: "جلسة المرافعة النهائية"
        },
        {
            clientId: 2,
            caseId: 3,
            sessionDate: "2024-07-10",
            sessionTime: "11:30",
            court: "محكمة أسيوط التجارية",
            sessionType: "حكم",
            roll: "15",
            inventoryNumber: "321",
            inventoryYear: "2024",
            decision: "الحكم بإلغاء الحجز التحفظي",
            notes: "جلسة النطق بالحكم"
        },
        {
            clientId: 3,
            caseId: 4,
            sessionDate: "2024-04-25",
            sessionTime: "09:00",
            court: "محكمة الإسكندرية الابتدائية",
            sessionType: "شهود",
            roll: "15",
            inventoryNumber: "123",
            inventoryYear: "2024",
            decision: "سماع شهود المدعي وتأجيل لجلسة 25/5/2024",
            notes: "جلسة سماع شهود الحادث"
        },
        {
            clientId: 4,
            caseId: 5,
            sessionDate: "2024-05-05",
            sessionTime: "14:00",
            court: "محكمة طنطا الابتدائية",
            sessionType: "مرافعة",
            roll: "22",
            inventoryNumber: "345",
            inventoryYear: "2024",
            decision: "الحكم بالنفقة 2000 جنيه شهريا وحضانة الأطفال للأم",
            notes: "جلسة مناقشة البحث الاجتماعي"
        },
        {
            clientId: 5,
            caseId: 6,
            sessionDate: "2024-05-10",
            sessionTime: "10:30",
            court: "محكمة الإسكندرية التجارية",
            sessionType: "خبرة",
            roll: "5",
            inventoryNumber: "567",
            inventoryYear: "2024",
            decision: "تعيين خبير محاسبي وتأجيل لجلسة 10/6/2024",
            notes: "جلسة تعيين خبير محاسبي"
        },
        {
            clientId: 6,
            caseId: 7,
            sessionDate: "2024-05-15",
            sessionTime: "12:00",
            court: "محكمة دمياط الابتدائية",
            sessionType: "معاينة",
            roll: "18",
            inventoryNumber: "890",
            inventoryYear: "2024",
            decision: "معاينة العقار وتأجيل لجلسة 15/6/2024 للحكم",
            notes: "جلسة معاينة العقار"
        },
        {
            clientId: 1,
            caseId: 1,
            sessionDate: "2024-06-05",
            sessionTime: "10:15",
            court: "محكمة المنصورة الابتدائية",
            sessionType: "حكم",
            roll: "12",
            inventoryNumber: "456",
            inventoryYear: "2024",
            decision: "الحكم بإلزام المدعى عليه بتسليم الشقة للمدعي",
            notes: "جلسة النطق بالحكم"
        },
        {
            clientId: 7,
            caseId: 8,
            sessionDate: "2025-08-21",
            sessionTime: "09:30",
            court: "محكمة الزقازيق الابتدائية",
            sessionType: "مرافعة",
            roll: "25",
            inventoryNumber: "234",
            inventoryYear: "2025",
            decision: "تأجيل لجلسة 18/9/2025 لتقديم المستندات",
            notes: "جلسة مرافعة نهائية"
        },
        {
            clientId: 8,
            caseId: 9,
            sessionDate: "2025-08-21",
            sessionTime: "11:00",
            court: "محكمة بنها الابتدائية",
            sessionType: "صلح",
            roll: "7",
            inventoryNumber: "678",
            inventoryYear: "2025",
            decision: "فشل الصلح وتأجيل لجلسة 18/9/2025 للمرافعة",
            notes: "جلسة محاولة صلح"
        },
        {
            clientId: 9,
            caseId: 10,
            sessionDate: "2025-08-21",
            sessionTime: "13:30",
            court: "محكمة أسوان الابتدائية",
            sessionType: "مرافعة",
            roll: "14",
            inventoryNumber: "901",
            inventoryYear: "2025",
            decision: "تأجيل لجلسة 18/9/2025 لمناقشة تقرير الخبير",
            notes: "جلسة مناقشة المستندات"
        },
        {
            clientId: 10,
            caseId: 11,
            sessionDate: "2025-08-18",
            sessionTime: "10:15",
            court: "محكمة المنيا الابتدائية",
            sessionType: "خبرة",
            roll: "31",
            inventoryNumber: "123",
            inventoryYear: "2025",
            decision: "تعيين خبير هندسي وتأجيل لجلسة 18/10/2025",
            notes: "جلسة تعيين خبير هندسي"
        }
    ,
        {
            clientId: 11,
            caseId: 12,
            sessionDate: "2024-09-05",
            sessionTime: "10:30",
            court: "محكمة بني سويف الابتدائية",
            sessionType: "مرافعة",
            roll: "9",
            inventoryNumber: "345",
            inventoryYear: "2024",
            decision: "تأجيل لجلسة 05/10/2024 لتقديم مستندات",
            notes: "جلسة أولى"
        },
        {
            clientId: 11,
            caseId: 12,
            sessionDate: "2024-10-05",
            sessionTime: "11:00",
            court: "محكمة بني سويف الابتدائية",
            sessionType: "مستندات",
            roll: "9",
            inventoryNumber: "345",
            inventoryYear: "2024",
            decision: "ضم المستندات وتأجيل للمرافعة",
            notes: "جلسة مستندات"
        }
    ],
    accounts: [
        {
            clientId: 1,
            caseId: 1,
            amount: 5000,
            description: "أتعاب القضية - دفعة موحدة",
            paidFees: 5000,
            expenses: 500,
            remaining: 1000,
            paymentDate: "2024-01-20",
            createdAt: "2024-01-20T00:00:00Z",
            notes: "تم الدفع نقداً في المكتب"
        },
        {
            clientId: 2,
            caseId: 2,
            amount: 2500,
            description: "دفعة أتعاب بعد تعيين الخبير",
            paidFees: 2500,
            expenses: 200,
            remaining: 300,
            paymentDate: "2024-03-25",
            createdAt: "2024-03-25T00:00:00Z",
            notes: "تم الدفع بحوالة بنكية"
        },
        {
            clientId: 3,
            caseId: 4,
            amount: -700,
            description: "مصروفات خبراء وتقارير",
            paidFees: 200,
            expenses: 700,
            remaining: 150,
            paymentDate: "2024-04-15",
            createdAt: "2024-04-15T00:00:00Z",
            notes: "سداد من الموكل للمصروفات"
        },
        {
            clientId: 4,
            caseId: 5,
            amount: 3000,
            description: "دفعة أتعاب مبدئية",
            paidFees: 3000,
            expenses: 300,
            remaining: 700,
            paymentDate: "2024-04-05",
            createdAt: "2024-04-05T00:00:00Z",
            notes: "تم الدفع بشيك"
        },
        {
            clientId: 5,
            caseId: 6,
            amount: -450,
            description: "رسوم إدارية وأختام",
            paidFees: 100,
            expenses: 450,
            remaining: 100,
            paymentDate: "2024-05-18",
            createdAt: "2024-05-18T00:00:00Z",
            notes: "سداد رسوم بالخزينة"
        },
        {
            clientId: 6,
            caseId: 7,
            amount: 3500,
            description: "دفعة أتعاب نهائية",
            paidFees: 3500,
            expenses: 250,
            remaining: 500,
            paymentDate: "2024-05-15",
            createdAt: "2024-05-15T00:00:00Z",
            notes: "تم الدفع نقداً"
        },
        {
            clientId: 7,
            caseId: 8,
            amount: 2200,
            description: "دفعة أتعاب تجارية",
            paidFees: 2200,
            expenses: 200,
            remaining: 400,
            paymentDate: "2024-06-05",
            createdAt: "2024-06-05T00:00:00Z",
            notes: "دفعة بشيك من الشركة"
        },
        {
            clientId: 8,
            caseId: 9,
            amount: -350,
            description: "رسوم إعلان ومحضر",
            paidFees: 150,
            expenses: 350,
            remaining: 50,
            paymentDate: "2024-06-25",
            createdAt: "2024-06-25T00:00:00Z",
            notes: "سداد رسوم إعلان"
        },
        {
            clientId: 9,
            caseId: 10,
            amount: 4000,
            description: "دفعة أتعاب تحصيل",
            paidFees: 4000,
            expenses: 300,
            remaining: 800,
            paymentDate: "2024-07-05",
            createdAt: "2024-07-05T00:00:00Z",
            notes: "تم الدفع من إدارة الشركة"
        },
        {
            clientId: 10,
            caseId: 11,
            amount: -900,
            description: "رسوم خبير هندسي",
            paidFees: 250,
            expenses: 900,
            remaining: 200,
            paymentDate: "2024-08-15",
            createdAt: "2024-08-15T00:00:00Z",
            notes: "سداد أتعاب خبير"
        },
        {
            clientId: 11,
            caseId: 12,
            amount: 1500,
            description: "استشارة قانونية عامة",
            paidFees: 1500,
            expenses: 100,
            remaining: 250,
            paymentDate: "2024-08-01",
            createdAt: "2024-08-01T00:00:00Z",
            notes: "استشارة مكتبية"
        }
    ],
    administrative: [
        {
            clientId: 1,
            task: "إعداد مذكرة دفاع في قضية تسليم الشقة",
            dueDate: "2024-02-05",
            completed: true,
            location: "مكتب المحاماة",
            notes: "تم إعداد المذكرة وتقديمها للمحكمة"
        },
        {
            clientId: 2,
            task: "جمع مستندات التركة والوثائق المطلوبة",
            dueDate: "2024-02-20",
            completed: true,
            location: "مكتب الشهر العقاري",
            notes: "تم جمع جميع المستندات المطلوبة"
        },
        {
            clientId: 2,
            task: "إعداد مذكرة دفاع في قضية إلغاء الحجز التحفظي",
            dueDate: "2024-03-15",
            completed: true,
            location: "مكتب المحاماة",
            notes: "تم إعداد المذكرة وتقديمها للمحكمة التجارية"
        },
        {
            clientId: 2,
            task: "متابعة تقرير خبير التقييم العقاري",
            dueDate: "2024-05-25",
            completed: false,
            location: "مكتب الخبير",
            notes: "جاري انتظار تقرير الخبير النهائي"
        },
        {
            clientId: 2,
            task: "تحضير المستندات المطلوبة للمحكمة التجارية",
            dueDate: "2024-05-05",
            completed: true,
            location: "مكتب المحاماة",
            notes: "تم تحضير وتقديم جميع المستندات"
        },
        {
            clientId: 3,
            task: "متابعة إعداد التقرير الطبي للحادث",
            dueDate: "2024-04-10",
            completed: true,
            location: "مستشفى الإسكندرية الجامعي",
            notes: "تم الحصول على التقرير الطبي النهائي"
        },
        {
            clientId: 4,
            task: "متابعة إجراء البحث الاجتماعي للأطفال",
            dueDate: "2024-04-25",
            completed: true,
            location: "مكتب الشؤون الاجتماعية",
            notes: "تم إنجاز البحث الاجتماعي"
        },
        {
            clientId: 5,
            task: "مراجعة العقود التجارية المتنازع عليها",
            dueDate: "2024-05-20",
            completed: false,
            location: "مكتب المحاماة",
            notes: "جاري مراجعة العقود"
        },
        {
            clientId: 6,
            task: "إعداد إنذار بالإخلاء للمستأجر",
            dueDate: "2024-05-30",
            completed: true,
            location: "مكتب المحضر",
            notes: "تم إعداد وتوجيه الإنذار"
        },
        {
            clientId: 7,
            task: "تقييم الأضرار في البضائع التالفة",
            dueDate: "2025-08-21",
            completed: false,
            location: "مخازن الشركة",
            notes: "جاري التقييم مع الخبير"
        },
        {
            clientId: 8,
            task: "مراجعة بنود عقد الإيجار المتنازع عليه",
            dueDate: "2025-08-21",
            completed: false,
            location: "مكتب المحاماة",
            notes: "جاري مراجعة بنود العقد"
        },
        {
            clientId: 9,
            task: "حصر الديون المستحقة للشركة",
            dueDate: "2025-08-21",
            completed: false,
            location: "مقر الشركة",
            notes: "جاري حصر الديون"
        },
        {
            clientId: 10,
            task: "فحص مواصفات أعمال البناء المنجزة",
            dueDate: "2025-08-25",
            completed: false,
            location: "موقع البناء",
            notes: "جاري الفحص مع المهندس"
        },
        {
            clientId: 1,
            task: "تحضير مستندات الاستئناف",
            dueDate: "2024-07-01",
            completed: true,
            location: "مكتب المحاماة",
            notes: "تم تحضير مستندات الاستئناف"
        },
        {
            clientId: 3,
            task: "متابعة تنفيذ الحكم",
            dueDate: "2024-08-15",
            completed: false,
            location: "محكمة التنفيذ",
            notes: "جاري متابعة إجراءات التنفيذ"
        },
        {
            clientId: null,
            task: "تجديد رخصة مزاولة المهنة",
            dueDate: "2024-12-31",
            completed: false,
            location: "نقابة المحامين",
            notes: "يجب تجديد الرخصة قبل نهاية العام"
        },
        {
            clientId: null,
            task: "حضور دورة تدريبية في القانون الجديد",
            dueDate: "2024-09-15",
            completed: true,
            location: "معهد التدريب القانوني",
            notes: "تم حضور الدورة والحصول على الشهادة"
        },
        {
            clientId: 4,
            task: "إعداد عقد توكيل جديد",
            dueDate: "2024-08-20",
            completed: true,
            location: "مكتب المحاماة",
            notes: "تم إعداد العقد وتوقيعه"
        },
        {
            clientId: 5,
            task: "مراجعة الأوراق القانونية للشركة",
            dueDate: "2024-09-01",
            completed: false,
            location: "مقر الشركة",
            notes: "جاري مراجعة العقود والوثائق"
        }
    ,
        {
            clientId: 11,
            task: "إعداد مذكرة بدفاع الموكل في دعوى المقاولات",
            dueDate: "2024-08-20",
            completed: true,
            location: "مكتب المحاماة",
            notes: "تم إعداد المذكرة"
        },
        {
            clientId: 11,
            task: "متابعة ملف القضية بالمحكمة",
            dueDate: "2024-09-10",
            completed: false,
            location: "محكمة بني سويف الابتدائية",
            notes: "بانتظار تحديد جلسة المرافعة"
        }
    ],
    clerkPapers: [
        {
            clientId: 1,
            caseId: 1,
            clerkOffice: "قلم محضري محكمة المنصورة الابتدائية",
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
            clerkOffice: "قلم محضري محكمة طنطا الابتدائية",
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
    ,
        {
            clientId: 11,
            caseId: 12,
            clerkOffice: "قلم محضري محكمة بني سويف الابتدائية",
            paperType: "إعلان",
            paperNumber: "2024/1112",
            deliveryDate: "2024-08-15",
            receiptDate: "2024-08-17",
            notes: "إعلان بصحيفة الدعوى"
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
            status: "تمت",
            outgoingNumber: "OUT-2024-001",
            incomingNumber: "IN-2024-001",
            notes: "تم معاينة الشقة وتحديد حالتها الفنية"
        },
        {
            clientId: 1,
            caseId: 1,
            expertName: "المهندس محمد حسن الخبير",
            sessionType: "تقرير فني",
            sessionDate: "2024-04-25",
            sessionTime: "14:00",
            status: "تمت",
            outgoingNumber: "OUT-2024-002",
            incomingNumber: "IN-2024-002",
            notes: "تسليم التقرير الفني النهائي للمحكمة"
        },
        {
            clientId: 2,
            caseId: 2,
            expertName: "الأستاذ أحمد فؤاد خبير التقييم",
            sessionType: "تقييم عقاري",
            sessionDate: "2024-03-20",
            sessionTime: "11:00",
            status: "تمت",
            outgoingNumber: "OUT-2024-003",
            incomingNumber: "IN-2024-003",
            notes: "تقييم العقارات الداخلة في التركة"
        },
        {
            clientId: 2,
            caseId: 3,
            expertName: "الأستاذ سامي محم��د المحاسب القانوني",
            sessionType: "خبرة محاسبية",
            sessionDate: "2024-04-10",
            sessionTime: "09:30",
            status: "تمت",
            outgoingNumber: "OUT-2024-004",
            incomingNumber: "IN-2024-004",
            notes: "فحص الحسابات المصرفية المحجوزة"
        },
        {
            clientId: 3,
            caseId: 4,
            expertName: "الدكتور عمر سليمان استشاري الطب الشرعي",
            sessionType: "فحص طبي",
            sessionDate: "2024-04-05",
            sessionTime: "16:00",
            status: "تمت",
            outgoingNumber: "OUT-2024-005",
            incomingNumber: "IN-2024-005",
            notes: "فحص الإصابات وتحديد نسبة العجز"
        },
        {
            clientId: 3,
            caseId: 4,
            expertName: "المهندس خالد رشاد خبير السيارات",
            sessionType: "فحص تقني",
            sessionDate: "2024-04-12",
            sessionTime: "13:00",
            status: "تمت",
            outgoingNumber: "OUT-2024-006",
            incomingNumber: "IN-2024-006",
            notes: "معاينة موقع الحادث وفحص السيارات"
        },
        {
            clientId: 4,
            caseId: 5,
            expertName: "الأستاذ محمد علي الخبير ال��جتماعي",
            sessionType: "بحث اجتماعي",
            sessionDate: "2024-04-18",
            sessionTime: "15:00",
            status: "تمت",
            outgoingNumber: "OUT-2024-007",
            incomingNumber: "IN-2024-007",
            notes: "بحث الحالة الاجتماعية للأطفال"
        },
        {
            clientId: 5,
            caseId: 6,
            expertName: "الأستاذ يوسف حسن المحاسب القانوني",
            sessionType: "خبرة محاسبية",
            sessionDate: "2024-05-20",
            sessionTime: "10:30",
            status: "مجدولة",
            outgoingNumber: "OUT-2024-008",
            incomingNumber: "IN-2024-008",
            notes: "فحص الدفاتر التجارية وحساب الأضرار"
        },
        {
            clientId: 6,
            caseId: 7,
            expertName: "المهندس سامي عبد الرحمن خبير العقارات",
            sessionType: "معاينة عقار",
            sessionDate: "2024-05-22",
            sessionTime: "11:30",
            status: "مجدولة",
            outgoingNumber: "OUT-2024-009",
            incomingNumber: "IN-2024-009",
            notes: "معاينة حالة العقار وتحديد الأضرار"
        },
        {
            clientId: 7,
            caseId: 8,
            expertName: "الدكتور أحمد صلاح خبير البضائع",
            sessionType: "فحص بضائع",
            sessionDate: "2024-06-15",
            sessionTime: "09:00",
            status: "مجدولة",
            outgoingNumber: "OUT-2024-010",
            incomingNumber: "IN-2024-010",
            notes: "فحص جودة البضائع التالفة"
        },
        {
            clientId: 8,
            caseId: 9,
            expertName: "الأستاذ حسام الدين خبير العقارات",
            sessionType: "تقييم عقار",
            sessionDate: "2024-06-25",
            sessionTime: "14:30",
            status: "مجدولة",
            outgoingNumber: "OUT-2024-011",
            incomingNumber: "IN-2024-011",
            notes: "تقييم قيمة المحل الإيجارية"
        }
    ,
        {
            clientId: 11,
            caseId: 12,
            expertName: "المهندس وليد عبد الرحمن",
            sessionType: "تقييم أعمال",
            sessionDate: "2024-09-15",
            sessionTime: "12:00",
            status: "مجدولة",
            outgoingNumber: "OUT-2024-012",
            incomingNumber: "IN-2024-012",
            notes: "تقييم أعمال ومطابقة المواصفات"
        }
    ]
};

// دالة لإضافة البيانات التجريبية
async function addSampleData() {
    try {
        // إضافة الموكلين وحفظ IDs الحقيقية
        const clientIds = [];
        for (const client of sampleData.clients) {
            const clientId = await addClient(client);
            clientIds.push(clientId);
        }
        
        // إضافة الخصوم وحفظ IDs الحقيقية
        const opponentIds = [];
        for (const opponent of sampleData.opponents) {
            const opponentId = await addOpponent(opponent);
            opponentIds.push(opponentId);
        }
        
        // إضافة القضايا وحفظ IDs الحقيقية
        const caseIds = [];
        for (let i = 0; i < sampleData.cases.length; i++) {
            const caseData = { ...sampleData.cases[i] };
            // تحديث clientId و opponentId بالقيم الحقيقية
            caseData.clientId = clientIds[caseData.clientId - 1];
            caseData.opponentId = opponentIds[caseData.opponentId - 1];
            const caseId = await addCase(caseData);
            caseIds.push(caseId);
        }
        
        // إضافة الجلسات مع تحديث IDs
        for (const session of sampleData.sessions) {
            const sessionData = { ...session };
            sessionData.clientId = clientIds[session.clientId - 1];
            sessionData.caseId = caseIds[session.caseId - 1];
            await addRecord('sessions', sessionData);
        }
        
        // إضافة الحسابات مع تحديث IDs
        for (const account of sampleData.accounts) {
            const accountData = { ...account };
            if (account.clientId && account.clientId <= clientIds.length) {
                accountData.clientId = clientIds[account.clientId - 1];
            }
            if (account.caseId && account.caseId <= caseIds.length) {
                accountData.caseId = caseIds[account.caseId - 1];
            }
            if (accountData.paidFees === undefined && accountData.expenses === undefined && accountData.remaining === undefined) {
                if (typeof accountData.amount === 'number') {
                    if (accountData.amount >= 0) {
                        accountData.paidFees = accountData.amount;
                        accountData.expenses = 0;
                    } else {
                        accountData.paidFees = 0;
                        accountData.expenses = Math.abs(accountData.amount);
                    }
                } else {
                    accountData.paidFees = 0;
                    accountData.expenses = 0;
                }
                accountData.remaining = 0;
            }
            accountData.paidFees = Number(accountData.paidFees ?? 0);
            accountData.expenses = Number(accountData.expenses ?? 0);
            accountData.remaining = Number(accountData.remaining ?? 0);
            if (!accountData.createdAt) {
                accountData.createdAt = (accountData.paymentDate ? new Date(accountData.paymentDate + 'T00:00:00Z') : new Date()).toISOString();
            }
            await addRecord('accounts', accountData);
        }
        
        // إضافة الأعمال الإدارية مع تحديث IDs
        for (const work of sampleData.administrative) {
            const workData = { ...work };
            if (work.clientId && work.clientId <= clientIds.length) {
                workData.clientId = clientIds[work.clientId - 1];
            }
            await addRecord('administrative', workData);
        }
        
        // إضافة أوراق المحضرين مع تحديث IDs
        for (const paper of sampleData.clerkPapers) {
            const paperData = { ...paper };
            paperData.clientId = clientIds[paper.clientId - 1];
            paperData.caseId = caseIds[paper.caseId - 1];
            await addRecord('clerkPapers', paperData);
        }
        
        // إضافة جلسات الخبراء مع تحديث IDs
        for (const session of sampleData.expertSessions) {
            const sessionData = { ...session };
            sessionData.clientId = clientIds[session.clientId - 1];
            sessionData.caseId = caseIds[session.caseId - 1];
            await addRecord('expertSessions', sessionData);
        }
        
        // تطبيع بيانات الحسابات لضمان اكتمال الحقول في نافذة التعديل
        try {
            const allAccounts = await getAll('accounts');
            for (const acc of allAccounts) {
                const patch = {};
                const amt = typeof acc.amount === 'number' ? acc.amount : null;
                if (acc.paidFees === undefined) {
                    patch.paidFees = amt !== null && amt >= 0 ? amt : 0;
                }
                if (acc.expenses === undefined) {
                    patch.expenses = amt !== null && amt < 0 ? Math.abs(amt) : 0;
                }
                if (acc.remaining === undefined) {
                    patch.remaining = 0;
                }
                if (!acc.paymentDate) {
                    const d = acc.createdAt ? new Date(acc.createdAt) : new Date();
                    patch.paymentDate = d.toISOString().slice(0, 10);
                }
                if (!acc.createdAt) {
                    const day = (patch.paymentDate || acc.paymentDate || new Date().toISOString().slice(0,10)) + 'T00:00:00Z';
                    patch.createdAt = new Date(day).toISOString();
                }
                if (acc.notes === undefined) {
                    patch.notes = '';
                }
                if (patch.paidFees !== undefined) patch.paidFees = Number(patch.paidFees || 0);
                if (patch.expenses !== undefined) patch.expenses = Number(patch.expenses || 0);
                if (patch.remaining !== undefined) patch.remaining = Number(patch.remaining || 0);
                
                if (Object.keys(patch).length > 0) {
                    await updateAccount({ ...acc, ...patch });
                }
            }
        } catch (e) {}
        
        await updateCountersInHeader();
        
        if (typeof showToast === 'function') {
            showToast('تم إضافة البيانات التجريبية بنجاح!', 'success');
        } else {
            alert('تم إضافة البيانات التجريبية بنجاح!');
        }
        
    } catch (error) {
        console.error('خطأ في إضافة البي��نات:', error);
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
        console.error('خطأ في حذ�� البيانات:', error);
    }
}