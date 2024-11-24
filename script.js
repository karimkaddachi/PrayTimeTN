    const delegationsByGovernorate = {
    Tunis: ["باب بحر", "باب سويقة", "المرسى", "باردو", "الكرم", "المنزه", "حلق الوادي", "سيدي البشير", "سيدي حسين", "جبل الجلود"],
    Ariana: ["أريانة المدينة", "سكرة", "رواد", "قلعة الأندلس", "التضامن", "المنيهلة"],
    "Ben Arous": ["بن عروس", "حمام الأنف", "حمام الشط", "فوشانة", "مقرين", "المغيرة", "بومهل", "المحمدية", "رادس"],
    Manouba: ["منوبة", "طبربة", "دوار هيشر", "الجديدة", "البطان", "برج العامري", "وادي الليل"],
    Nabeul: ["نابل", "دار شعبان", "الحمامات", "قليبية", "قربة", "الميدة", "منزل تميم", "تاكلسة", "سليمان", "بني خلاد", "بني خيار", "الهوارية"],
    Zaghouan: ["زغوان", "الفحص", "الناظور", "صواف", "بئر مشارقة", "جبل الوسط"],
    Bizerte: ["بنزرت", "منزل بورقيبة", "رأس الجبل", "العالية", "جرزونة", "ماطر", "أوتيك", "غار الملح", "تينجة"],
    Beja: ["باجة", "عمدون", "نفزة", "تبرسق", "تستور", "مجاز الباب", "قبلاط", "تيبار"],
    Jendouba: ["جندوبة", "فرنانة", "عين دراهم", "طبرقة", "بوسالم", "بلطة بوعوان", "غار الدماء", "وادي مليز"],
    Kef: ["الكاف", "الدهماني", "القصور", "ساقية سيدي يوسف", "تاجروين", "قلعة سنان", "قلعة السنان", "نبر"],
    Siliana: ["سليانة", "الكريب", "بورويس", "مكثر", "قعفور", "الروحية", "برقو", "كسرى"],
    Sousse: ["سوسة", "القلعة الكبرى", "القلعة الصغرى", "أكودة", "الزاوية", "النفيضة", "بوفيشة", "حمام سوسة", "هرقلة", "سيدي بوعلي"],
    Monastir: ["المنستير", "جمال", "قصر هلال", "زرمدين", "المكنين", "طبلبة", "صقانس", "صيادة", "بنبلة"],
    Mahdia: ["المهدية", "الجم", "الشابة", "قصور الساف", "ملولش", "سيدي علوان", "هبة", "شربان"],
    Sfax: ["صفاقس المدينة", "صفاقس الغربية", "صفاقس الجنوبية", "طينة", "قرقنة", "عقارب", "الغريبة", "المحرس", "جبنيانة", "الحنشة", "الصخيرة"],
    Kairouan: ["القيروان", "حاجب العيون", "الوسلاتية", "الشبيكة", "نصر الله", "عين جلولة", "السبيخة", "بئر الحفي"],
    Kasserine: ["القصرين", "تالة", "فوسانة", "حيدرة", "فريانة", "سبيبة", "سبيطلة", "جدليان"],
    "Sidi Bouzid": ["سيدي بوزيد", "الرقاب", "جلمة", "المزونة", "السوق الجديد", "أولاد حفوز", "بئر الحفي"],
    Gabes: ["قابس", "مارث", "الحامة", "مطماطة", "شنني", "غنوش", "وذرف"],
    Medenine: ["مدنين", "جربة حومة السوق", "جربة ميدون", "جربة أجيم", "بن قردان", "جرجيس", "بني خداش"],
    Tataouine: ["تطاوين", "غمراسن", "ذهيبة", "البئر الأحمر", "رمادة"],
    Gafsa: ["قفصة", "القطار", "المظيلة", "أم العرائس", "رديف", "السند"],
    Tozeur: ["توزر", "نفطة", "دقاش", "حزوة"],
    Kebili: ["قبلي", "دوز", "سوق الأحد"]
};


        // تحديث قائمة المعتمديات عند اختيار الولاية
        function updateDelegations() {
            const governorate = document.getElementById("governorate").value;
            const delegationSelect = document.getElementById("delegation");

            // تنظيف الخيارات السابقة
            delegationSelect.innerHTML = "<option value=''>يرجى اختيار معتمدية</option>";

            if (governorate && delegationsByGovernorate[governorate]) {
                delegationsByGovernorate[governorate].forEach(delegation => {
                    const option = document.createElement("option");
                    option.value = delegation;
                    option.textContent = delegation;
                    delegationSelect.appendChild(option);
                });
            }
        }

        // جلب أوقات الصلاة
        async function fetchPrayerTimes() {
            const governorate = document.getElementById("governorate").value;
            const country = "Tunisia";
            const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${governorate}&country=${country}&method=2`;
        
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
        
                const timings = data.data.timings;
        
                // نملأ القائمة بأوقات الصلاة مع الشروق والغروب
                const timesList = document.getElementById("times-list");
                timesList.innerHTML = `
                    <li>الفجر: ${timings.Fajr}</li>
                    <li>الشروق: ${timings.Sunrise}</li>
                    <li>الظهر: ${timings.Dhuhr}</li>
                    <li>العصر: ${timings.Asr}</li>
                    <li>المغرب: ${timings.Maghrib}</li>
                    <li>العشاء: ${timings.Isha}</li>
                    
                `;
            } catch (error) {
                console.error("خطأ في جلب أوقات الصلاة:", error);
                document.getElementById("times-list").innerHTML = `<li>تعذر تحميل الأوقات. حاول مرة أخرى.</li>`;
            }
        }
        

        document.addEventListener("wheel", (event) => {
            event.preventDefault(); // منع السلوك الافتراضي للتمرير
            const halfScreenHeight = window.innerHeight / 2;
        
            // تحديد اتجاه التمرير
            const direction = event.deltaY > 0 ? 1 : -1;
        
            // تنفيذ التمرير بمقدار نصف الشاشة
            window.scrollBy({
                top: halfScreenHeight * direction,
                behavior: "smooth", // تمرير سلس
            });
        }, { passive: false }); // تحديد 'passive' بـ 'false' للسماح بمنع السلوك الافتراضي
        function updateTime() {
            const options = {
                timeZone: 'Africa/Tunis',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
        
            const time = new Date().toLocaleTimeString('ar-TN', options);
            document.getElementById('current-time').textContent = `الوقت بتوقيت تونس: ${time}`;
        }
        
        // تحديث الوقت كل ثانية
        setInterval(updateTime, 1000);
        let progress = 0;
function updateProgress() {
    if (progress < 100) {
        progress++;
        document.getElementById('progressBar').style.width = progress + '%';
    }
}
setInterval(updateProgress, 50);
function calculateRamadanCountdown() {
    // تاريخ بداية شهر رمضان المتوقع
    const ramadanDate = new Date('2025-02-28T00:00:00'); // قم بتعديل التاريخ إذا لزم الأمر

    // الوقت الحالي
    const now = new Date();

    // الفرق بالميلي ثانية
    const difference = ramadanDate - now;

    if (difference <= 0) {
        document.getElementById("countdown-timer").innerText = "رمضان مبارك!";
        return;
    }

    // حساب الأيام والساعات والدقائق والثواني المتبقية
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // عرض العد التنازلي
    document.getElementById("countdown-timer").innerText =
        `${days} يوم، ${hours} ساعة، ${minutes} دقيقة، ${seconds} ثانية`;

    // تحديث العد كل ثانية
    setTimeout(calculateRamadanCountdown, 1000);
}

// تشغيل الدالة عند تحميل الصفحة
calculateRamadanCountdown();
document.addEventListener("DOMContentLoaded", function () {
    const prayTimes = new PrayTimes('MWL'); // طريقة الحساب وفق "الرابطة العالمية الإسلامية"

    // الإحداثيات الجغرافية لتونس (تعديل إذا كنت في منطقة أخرى)
    const latitude = 36.8065;
    const longitude = 10.1815;
    const timezone = 1; // التوقيت الصيفي CET+1

    // جلب تاريخ اليوم
    const now = new Date();
    const times = prayTimes.getTimes(now, [latitude, longitude], timezone);

    // تحديث الأوقات في الموقع
    document.getElementById('fajr').innerText = `الفجر: ${times.fajr}`;
    document.getElementById('dhuhr').innerText = `الظهر: ${times.dhuhr}`;
    document.getElementById('asr').innerText = `العصر: ${times.asr}`;
    document.getElementById('maghrib').innerText = `المغرب: ${times.maghrib}`;
    document.getElementById('isha').innerText = `العشاء: ${times.isha}`;
});
document.getElementById('sunrise').innerText = `الشروق: ${times.sunrise}`;
