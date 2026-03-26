// إظهار شاشة التحميل
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loading-screen';
    loader.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.remove();
    }, 2000);
});

// تأثيرات التمرير
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
    }
});

// معالجة نموذج التواصل
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
        contactForm.reset();
    });
}

// وظيفة نسخ الكود
function copyCode() {
    const code = document.querySelector('.code-display span').innerText;
    navigator.clipboard.writeText(code);
    alert('تم نسخ الكود بنجاح!');
}

// تأثيرات التمرير السلس للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// إضافة تأثيرات الحركة عند التمرير
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .account-card, .service-card, .post-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});
