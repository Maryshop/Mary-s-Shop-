// التحقق من تسجيل الدخول
function checkAdminAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const adminPassword = '106bbh106';
    
    if (!isLoggedIn && window.location.pathname.includes('admin.html')) {
        window.location.href = 'login.html';
    }
}

checkAdminAuth();

// تبديل التبويبات
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    });
});

// إدارة المنتجات
const addProductForm = document.getElementById('add-product-form');
if (addProductForm) {
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const product = {
            name: document.getElementById('product-name').value,
            price: document.getElementById('product-price').value,
            updatedAt: new Date().toISOString()
        };
        
        localStorage.setItem('productSettings', JSON.stringify(product));
        alert('تم تحديث المنتج بنجاح!');
    });
}

// عرض الطلبات
function displayOrders() {
    const ordersContainer = document.getElementById('orders-list');
    if (!ordersContainer) return;
    
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    if (orders.length === 0) {
        ordersContainer.innerHTML = '<p>لا توجد طلبات حتى الآن</p>';
        return;
    }
    
    ordersContainer.innerHTML = orders.map(order => `
        <div style="border: 1px solid rgba(0,255,255,0.3); padding: 1rem; margin-bottom: 1rem; border-radius: 10px;">
            <p><strong>رقم الطلب:</strong> ${order.id}</p>
            <p><strong>نوع الخدمة:</strong> ${order.type === 'diamonds' ? '💎 جواهر' : order.type}</p>
            <p><strong>المبلغ:</strong> $${order.price}</p>
            <p><strong>طريقة الدفع:</strong> ${order.method}</p>
            <p><strong>التاريخ:</strong> ${new Date(order.date).toLocaleString('ar-SA')}</p>
            <p><strong>الحالة:</strong> <span style="color: #00ff00;">${order.status}</span></p>
        </div>
    `).join('');
}

displayOrders();

// تسجيل الخروج
document.getElementById('logout-btn')?.addEventListener('click', () => {
    sessionStorage.removeItem('adminLoggedIn');
    window.location.href = 'login.html';
});
