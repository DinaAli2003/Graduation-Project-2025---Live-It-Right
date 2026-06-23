// العناصر من الصفحة
const addBtn = document.getElementById("add-btn"); // زر الإضافة
const removeBtn = document.getElementById("remove-btn"); // زر الحذف
const medNameInput = document.getElementById("medicine-name"); // حقل اسم الدواء
const medTimeInput = document.getElementById("medicine-time"); // حقل وقت الدواء
const medList = document.getElementById("medicine-list"); // قائمة المنبهات المعروضة
const successMsg = document.getElementById("success-message"); // رسالة نجاح الإضافة
const removeMsg = document.getElementById("remove-message"); // رسالة نجاح الحذف

let activeAlarms = {}; // كائن لتخزين المنبهات النشطة حالياً باسم الدواء كمفتاح

// تحميل المنبهات عند فتح الصفحة
window.onload = function () {
    loadAlarmsFromStorage(); // استرجاع المنبهات من localStorage وعرضها
};

// عند الضغط على زر الإضافة
addBtn.addEventListener("click", function () {
    let medName = medNameInput.value.trim(); // اسم الدواء بدون فراغات في البداية والنهاية
    let medTime = medTimeInput.value.trim(); // الوقت المدخل بنفس الطريقة

    if (medName !== "" && medTime !== "") { // تحقق إن الاتنين مش فاضيين
        if (!isValidTime(medTime)) { // تحقق من صحة الوقت بصيغة HH:MM
            alert("Please Select a valid Time!");
            return;
        }

        createReminderElement(medName, medTime); // إضافة العنصر للقائمة
        saveAlarmToStorage(medName, medTime);   // تخزينه في localStorage
        setAlarm(medTime, medName);             // تشغيل التنبيه للوقت ده

        medNameInput.value = ""; // تفريغ حقل الاسم
        medTimeInput.value = ""; // تفريغ حقل الوقت

        showSuccessMessage("Alarm added successfully✅"); // عرض رسالة مؤقتة
    } else {
        customAlert("Please enter the name of the Medicine and time!");
    }
});

// إنشاء عنصر في القائمة
function createReminderElement(medName, medTime) {
    medList.style.display = "block"; // إظهار القائمة لو كانت مخفية

    let li = document.createElement("li"); // إنشاء عنصر li جديد
    let checkbox = document.createElement("input"); // إنشاء مربع اختيار
    checkbox.type = "checkbox"; // تحديد نوعه كـ checkbox
    checkbox.classList.add("med-checkbox"); // إضافة كلاس لتحديده لاحقًا

    li.textContent = `${medName}   ${medTime}`; // نص العنصر هو اسم ووقت الدواء
    li.prepend(checkbox); // إدراج المربع في أول العنصر
    li.setAttribute("data-name", medName); // حفظ اسم الدواء في خصائص العنصر
    li.setAttribute("data-time", medTime); // حفظ الوقت كذلك

    medList.appendChild(li); // إضافة العنصر للقائمة
}

// ضبط التنبيه بصوت ونافذة تأكيد
function setAlarm(medTime, medName) {
    const alarmSound = document.getElementById("alarm-sound");

    let alarmTime = new Date();
    let [hours, minutes] = medTime.split(":");
    alarmTime.setHours(hours);
    alarmTime.setMinutes(minutes);
    alarmTime.setSeconds(0);

    const intervalId = setInterval(() => {
        const currentTime = new Date();
        if (
            currentTime.getHours() === parseInt(hours) &&
            currentTime.getMinutes() === parseInt(minutes)
        ) {
            alarmSound.play();

            let repeatId = setInterval(() => {
                alarmSound.play();
            }, 20000);

            activeAlarms[medName + "_repeat"] = repeatId;

            customAlert(`Time of taking Your Medicine ${medName}`, () => {
                // هنا بيتم تنفيذها بعد الضغط على OK
                clearInterval(repeatId);
                clearInterval(intervalId);
                delete activeAlarms[medName];
                delete activeAlarms[medName + "_repeat"];
            });

            clearInterval(intervalId);
        }
    }, 1000);

    activeAlarms[medName] = intervalId;
}

function customAlert(message, onOk) {
    const alertBox = document.getElementById("custom-alert");
    const alertMsg = document.getElementById("alert-message");
    const alertOkBtn = document.getElementById("alert-ok-btn");

    alertMsg.textContent = message;
    alertBox.classList.remove("hidden");

    // نوقف أي event سابق
    alertOkBtn.onclick = null;

    alertOkBtn.onclick = function () {
        alertBox.classList.add("hidden");
        if (typeof onOk === "function") {
            onOk(); // ننفذ الفنكشن اللي جت من setAlarm
        }
    };
}


// حذف العناصر المحددة
removeBtn.addEventListener("click", function () {
    let checkboxes = document.querySelectorAll(".med-checkbox:checked"); // كل العناصر المختارة

    if (checkboxes.length > 0) {
        checkboxes.forEach(checkbox => {
            let li = checkbox.parentElement; // العنصر الأب (li)
            let medName = li.getAttribute("data-name"); // جلب اسم الدواء

            medList.removeChild(li); // حذف العنصر من القائمة
            removeAlarmFromStorage(medName); // حذف من التخزين

            // إيقاف المنبه إن كان موجود
            if (activeAlarms[medName]) {
                clearInterval(activeAlarms[medName]);
                delete activeAlarms[medName];
            }
            if (activeAlarms[medName + "_repeat"]) {
                clearInterval(activeAlarms[medName + "_repeat"]);
                delete activeAlarms[medName + "_repeat"];
            }
        });
        showRemoveMessage("Selected alarms deleted successfully❌");
    } else {
        customAlert("Please select the items you want to delete!");
    }

    checkListVisibility(); // التأكد هل القائمة فارغة
});

// عرض رسالة نجاح مؤقتة
function showSuccessMessage(message) {
    successMsg.textContent = message;
    successMsg.style.display = "block"; // إظهارها
    setTimeout(() => successMsg.style.display = "none", 3000); // إخفاؤها بعد 3 ثواني
}

// عرض رسالة حذف مؤقتة
function showRemoveMessage(message) {
    removeMsg.textContent = message;
    removeMsg.style.display = "block";
    setTimeout(() => removeMsg.style.display = "none", 3000);
}

// إخفاء القائمة لو مفيش منبهات
function checkListVisibility() {
    if (medList.children.length === 0) {
        medList.style.display = "none";
    }
}

// التحقق من صحة الوقت
function isValidTime(time) {
    const regex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/; // من 00:00 إلى 23:59
    return regex.test(time); // يرجع true لو الوقت صحيح
}

// حفظ المنبهات باسم المستخدم
function saveAlarmToStorage(name, time) {
    const currentUser = localStorage.getItem("userName"); // اسم المستخدم الحالي
    if (!currentUser) return;

    let alarms = JSON.parse(localStorage.getItem(`alarms_${currentUser}`) || "[]"); // المنبهات الحالية
    alarms.push({ name, time }); // إضافة الجديد
    localStorage.setItem(`alarms_${currentUser}`, JSON.stringify(alarms)); // تحديث التخزين
}

// حذف منبه من التخزين الخاص بالمستخدم
function removeAlarmFromStorage(name) {
    const currentUser = localStorage.getItem("userName");
    if (!currentUser) return;

    let alarms = JSON.parse(localStorage.getItem(`alarms_${currentUser}`) || "[]");
    alarms = alarms.filter(alarm => alarm.name !== name); // حذف الدواء بالاسم
    localStorage.setItem(`alarms_${currentUser}`, JSON.stringify(alarms));
}

// تحميل المنبهات الخاصة بالمستخدم عند تشغيل الصفحة
function loadAlarmsFromStorage() {
    const currentUser = localStorage.getItem("userName");
    if (!currentUser) return;

    let alarms = JSON.parse(localStorage.getItem(`alarms_${currentUser}`) || "[]");
    alarms.forEach(alarm => {
        createReminderElement(alarm.name, alarm.time); // إظهارها في الصفحة
        setAlarm(alarm.time, alarm.name); // تفعيل المنبه من جديد
    });
}



document.addEventListener("DOMContentLoaded", function () {
    const loginLink = document.getElementById("login");
    const loginBtn = document.getElementById("Login-btn");
    const welcomeMsg = document.getElementById("welcome-msg");

    function updateUI() {
        const username = localStorage.getItem("username");
        const isLoggedIn = localStorage.getItem("loggedIn") === "true";

        if (isLoggedIn) {
            if (loginLink) loginLink.textContent = "Logout";
            if (loginBtn) loginBtn.textContent = "Logout";
            if (welcomeMsg) welcomeMsg.textContent = `Welcome, ${username}!`;
        } else {
            if (loginLink) loginLink.textContent = "Login";
            if (loginBtn) loginBtn.textContent = "Login";
            if (welcomeMsg) welcomeMsg.textContent = "";
        }
    }

    function handleLogout() {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");
        updateUI();
    }

    if (loginLink) {
        loginLink.addEventListener("click", function (e) {
            const isLoggedIn = localStorage.getItem("loggedIn") === "true";
            if (isLoggedIn) {
                e.preventDefault();
                handleLogout();
            }
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", function (e) {
            const isLoggedIn = localStorage.getItem("loggedIn") === "true";
            if (isLoggedIn) {
                e.preventDefault();
                handleLogout();
            }
        });
    }

    // أول ما تفتح الصفحة تحدث شكل الزر
    updateUI();

    // لو في صفحة تانية غيرت حالة الدخول/الخروج
    window.addEventListener("storage", function (event) {
        if (event.key === "loggedIn" || event.key === "username") {
            updateUI();
        }
    });
});

const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('visible'); 
});
window.addEventListener('scroll', () => {
    if (navbar.classList.contains('visible')) {
        navbar.classList.remove('visible');
    }
});


function customAlert(message) {
    const alertBox = document.getElementById("custom-alert");
    const alertMsg = document.getElementById("alert-message");
    const alertOkBtn = document.getElementById("alert-ok-btn");

    alertMsg.textContent = message;
    alertBox.classList.remove("hidden");

    alertOkBtn.onclick = function () {
        alertBox.classList.add("hidden");
    };
}




