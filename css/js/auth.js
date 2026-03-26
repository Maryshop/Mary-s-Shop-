// المستخدمين المسجلين
let users = JSON.parse(localStorage.getItem('users')) || [];

// مستخدم افتراضي
if (users.length === 0) {
    users.push({
        id: 1,
        name: 'Admin',
        email: 'admin@maryshop.com',
        password: '106bbh106',
        role: 'admin'
    });
    localStorage.setItem('users', JSON.stringify(users));
}

// تسجيل الدخول
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        alert('تم تسجيل الدخول بنجاح!');
        
        if (user.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'index.html';
        }
    } else {
        alert('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
});

// إنشاء حساب جديد
document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    // التحقق من وجود البريد الإلكتروني
    if (users.find(u => u.email === email)) {
        alert('البريد الإلكتروني موجود بالفعل');
        return;
    }
    
    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        password: password,
        role: 'user'
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن');
    
    // تبديل إلى نموذج تسجيل الدخول
    document.querySelector('.register-card').style.display = 'none';
    document.querySelector('.login-card').style.display = 'block';
});

// تبديل بين نماذج تسجيل الدخول والتسجيل
document.getElementById('show-register')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.login-card').style.display = 'none';
    document.querySelector('.register-card').style.display = 'block';
});

document.getElementById('show-login')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.register-card').style.display = 'none';
    document.querySelector('.login-card').style.display = 'block';
});
