
const USERS = [
    { name: "Kumush Karimova", password: "123456", phone: "+998901234567" }
];

let currentUser = null;


function openModal(id) {
    const modal = new bootstrap.Modal(document.getElementById(id));
    modal.show();
}

function closeModal(id) {
    const modal = bootstrap.Modal.getInstance(document.getElementById(id));
    if (modal) modal.hide();
}


function handleLogin() {
    const name = document.getElementById("loginName").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const errEl = document.getElementById("loginError");

    const user = USERS.find(u => u.name.toLowerCase() === name.toLowerCase() && u.password === password);

    if (user) {
        currentUser = user;
        errEl.style.display = "none";
        closeModal("loginModal");
        updateAuthZone();
        document.getElementById("loginName").value = "";
        document.getElementById("loginPassword").value = "";
    } else {
        errEl.style.display = "block";
    }
}

function handleRegister() {
    const name = document.getElementById("regName").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const errEl = document.getElementById("regError");
    const successEl = document.getElementById("regSuccess");

    errEl.style.display = "none";
    successEl.style.display = "none";

    if (!name || !phone || !password) {
        errEl.textContent = "❌ Barcha maydonlarni to'ldiring!";
        errEl.style.display = "block";
        return;
    }

    if (password.length < 6) {
        errEl.textContent = "❌ Parol kamida 6 ta belgidan iborat bo'lishi kerak!";
        errEl.style.display = "block";
        return;
    }

    const exists = USERS.find(u => u.name.toLowerCase() === name.toLowerCase());
    if (exists) {
        errEl.textContent = "❌ Bu foydalanuvchi allaqachon mavjud!";
        errEl.style.display = "block";
        return;
    }

    USERS.push({ name, phone, password });
    successEl.textContent = "✅ Muvaffaqiyatli ro'yxatdan o'tdingiz! Endi tizimga kirishingiz mumkin.";
    successEl.style.display = "block";

    document.getElementById("regName").value = "";
    document.getElementById("regPhone").value = "";
    document.getElementById("regPassword").value = "";

    setTimeout(() => {
        closeModal("registerModal");
        successEl.style.display = "none";
    }, 2000);
}

function handleUchrashuv() {
    const name = document.getElementById("uchName").value.trim();
    const phone = document.getElementById("uchPhone").value.trim();
    const errEl = document.getElementById("uchError");
    const successEl = document.getElementById("uchSuccess");

    errEl.style.display = "none";
    successEl.style.display = "none";

    if (!name || !phone) {
        errEl.textContent = "❌ Ism va telefon raqamni kiriting!";
        errEl.style.display = "block";
        return;
    }

    successEl.textContent = `✅ Hurmatli ${name}, uchrashuvga yozildingiz! Tez orada siz bilan bog'lanamiz.`;
    successEl.style.display = "block";

    document.getElementById("uchName").value = "";
    document.getElementById("uchPhone").value = "";

    setTimeout(() => {
        closeModal("uchrashuvModal");
        successEl.style.display = "none";
    }, 2500);
}

function updateAuthZone() {
    const authZone = document.getElementById("authZone");
    if (currentUser) {
        authZone.innerHTML = `
            <div id="userBadge">
                👤 <span>${currentUser.name}</span>
                <button onclick="handleLogout()" style="background:none;border:none;color:#fff;cursor:pointer;font-size:13px;margin-left:6px;" title="Chiqish">✖</button>
            </div>
        `;
    } else {
        authZone.innerHTML = `
            <button class="auth-btn" onclick="openModal('loginModal')">Kirish</button>
            <button class="auth-btn filled" onclick="openModal('registerModal')">Ro'yxatdan o'tish</button>
        `;
    }
}

function handleLogout() {
    currentUser = null;
    updateAuthZone();
}

function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById("themeToggle");
    if (body.classList.contains("light")) {
        body.classList.replace("light", "dark");
        btn.textContent = "☀️ Light";
    } else {
        body.classList.replace("dark", "light");
        btn.textContent = "🌙 Dark";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const xizmatlarSection = document.getElementById("xizmatlarSection");

    if (xizmatlarSection && typeof Xizmatlar !== "undefined") {
        Xizmatlar.forEach(item => {
            let col = document.createElement("div");
            col.classList.add("col-md-6", "col-lg-4");
            col.innerHTML = `
                <div style="cursor:pointer;" onclick="openXizmatModal(${item.id})">
                    <div class="card mb-3 dynamic-card" style="max-width: 540px; box-shadow: 0 4px 15px rgba(139,30,30,0.15); transition: transform 0.3s, box-shadow 0.3s; border-left: 3px solid brown;"
                        onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 10px 25px rgba(139,30,30,0.25)'"
                        onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(139,30,30,0.15)'">
                        <div class="row g-0">
                            <div class="col-4 d-flex align-items-center justify-content-center p-2">
                                <img src="${item.rasm}"
                                    style="width: 90px; height: 90px; object-fit: cover; border-radius: 10px;"
                                    alt="${item.xizmat}"
                                    onerror="this.src='https://img.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg'">
                            </div>
                            <div class="col-8">
                                <div class="card-body">
                                    <h5 class="card-title">${item.xizmat}</h5>
                                    <p class="card-text">${item.desc}</p>
                                    <p class="card-text">
                                        <small class="text-body-secondary">Narxi: <strong style="color: brown;">${item.narx}</strong></small>
                                    </p>
                                    <p class="card-text">
                                        <small style="color: brown; font-weight: 600;">Batafsil →</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            xizmatlarSection.append(col);
        });
    }
});

function openXizmatModal(id) {
    const item = Xizmatlar.find(x => x.id === id);
    if (!item) return;
    document.getElementById("xizmatModalImg").src = item.rasm;
    document.getElementById("xizmatModalImg").onerror = function() {
        this.src = 'https://img.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg';
    };
    document.getElementById("xizmatModalTitle").textContent = item.xizmat;
    document.getElementById("xizmatModalDesc").textContent = item.desc;
    document.getElementById("xizmatModalNarx").textContent = item.narx;
    const modal = new bootstrap.Modal(document.getElementById("xizmatDetailModal"));
    modal.show();
}

document.addEventListener("DOMContentLoaded", () => {
    const SabablarSection = document.getElementById("SabablarSection");

    if (SabablarSection && typeof Sabablar !== "undefined") {
        Sabablar.forEach(item => {
            let col = document.createElement("div");
            col.classList.add("col-md-6", "col-lg-4");
            col.innerHTML = `
   <div class="dynamic-card" style="border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 4px 20px rgba(139,30,30,0.12);transition:transform 0.3s,box-shadow 0.3s;margin-bottom:24px;border-top:4px solid brown;" onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 10px 30px rgba(139,30,30,0.22)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 20px rgba(139,30,30,0.12)'">
    <div style="width:100%;height:120px;overflow:hidden;">
        <img src="${item.rasm}" alt="..." style="width:100%;height:100%;object-fit:contain;display:block;padding:10px;background:#f9f0f0;">
    </div>
    <div style="padding:20px;">
        <p style="color:#333;font-size:15px;line-height:1.6;margin:0;">${item.izoh}</p>
    </div>
</div>
            `;
            SabablarSection.append(col);
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const ShifokorlarSection = document.getElementById("ShifokorlarSection");

    if (ShifokorlarSection && typeof Shifokorlar !== "undefined") {
        Shifokorlar.forEach(item => {
            let col = document.createElement("div");
            col.classList.add("col-md-6", "col-lg-4");
            col.innerHTML = `
<div class="dynamic-card" style="border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 4px 20px rgba(139,30,30,0.12);transition:transform 0.3s,box-shadow 0.3s;margin-bottom:24px;border-top:4px solid brown;" onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 10px 30px rgba(139,30,30,0.22)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 20px rgba(139,30,30,0.12)'">
    <div style="width:100%;height:400px;overflow:hidden;background:#f9f0f0;">
        <img src="${item.rasm}" alt="..." style="width:100%;height:100%;object-fit:contain;display:block;">
    </div>
    <div style="padding:20px;">
        <h5 style="color:brown;margin-bottom:8px;">${item.izoh}</h5>
        <p style="color:#333;font-size:15px;line-height:1.6;margin:0;">${item.doktor}</p>
    </div>
</div>
            `;
            ShifokorlarSection.append(col);
        });
    }
});
