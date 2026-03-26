herelet timerInterval;
let selectedMethod = null;
let orders = JSON.parse(localStorage.getItem('orders')) || [];

document.querySelectorAll('.payment-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        selectedMethod = btn.dataset.method;
        document.getElementById('order-form').style.display = 'block';
        document.querySelector('.payment-buttons').style.display = 'none';
    });
});

document.getElementById('confirm-payment').addEventListener('click', () => {
    const playerId = document.getElementById('player-id').value;
    const playerName = document.getElementById('player-name').value;
    
    if (!playerId || !playerName) {
        alert('يرجى إدخال جميع البيانات');
        return;
    }
    
    // تسجيل الطلب
    const order = {
        id: Date.now(),
        type: 'diamonds',
        playerId: playerId,
        playerName: playerName,
        amount: 110,
        price: 2.99,
        method: selectedMethod,
        date: new Date().toISOString(),
        status: 'completed'
    };
    
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    document.getElementById('order-form').style.display = 'none';
    document.getElementById('timer-section').style.display = 'block';
    
    let timeLeft = 30;
    const countdownElement = document.getElementById('countdown');
    
    timerInterval = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById('timer-section').style.display = 'none';
            document.getElementById('code-section').style.display = 'block';
            
            // إنشاء كود عشوائي
            const code = generateRandomCode();
            document.getElementById('delivery-code').textContent = code;
        }
    }, 1000);
});

function generateRandomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        if (i < 3) code += '-';
    }
    return code;
}

// Webhook محاكي للتحقق من الدفع
function simulatePaymentWebhook() {
    // هنا يمكن إضافة API حقيقي للتحقق من الدفع
    console.log('Payment verified via webhook');
}

// منع تزوير الطلبات
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        const token = generateCSRFToken();
        if (!form.querySelector('[name="csrf_token"]')) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'csrf_token';
            input.value = token;
            form.appendChild(input);
        }
    });
});

function generateCSRFToken() {
    return Math.random().toString(36).substring(2);
}
