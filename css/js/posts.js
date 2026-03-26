// تحميل المنشورات
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// إضافة منشورات افتراضية
if (posts.length === 0) {
    posts = [
        {
            id: 1,
            title: "🎉 عرض خاص على الجواهر 🎉",
            content: "احصل على 110 جوهرة بسعر مخفض! العرض ساري لمدة محدودة.",
            images: [],
            date: new Date().toISOString()
        },
        {
            id: 2,
            title: "✨ حسابات Free Fire مميزة ✨",
            content: "وصلتنا دفعة جديدة من الحسابات المميزة. للاستفسار تواصل معنا.",
            images: [],
            date: new Date().toISOString()
        }
    ];
    localStorage.setItem('posts', JSON.stringify(posts));
}

// عرض المنشورات
function displayPosts() {
    const container = document.getElementById('posts-container');
    const noPosts = document.getElementById('no-posts');
    
    if (!container) return;
    
    if (posts.length === 0) {
        container.style.display = 'none';
        noPosts.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    noPosts.style.display = 'none';
    
    container.innerHTML = posts.map(post => `
        <div class="post-card">
            <div class="post-images">
                ${post.images && post.images.length > 0 ? 
                    post.images.map(img => `<img src="${img}" alt="صورة المنشور">`).join('') : 
                    '<div style="text-align: center; padding: 2rem;">📸</div>'
                }
            </div>
            <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <p class="post-text">${post.content}</p>
                <div class="post-date">${new Date(post.date).toLocaleDateString('ar-SA')}</div>
            </div>
        </div>
    `).join('');
}

// تحويل الصور إلى Base64
function imagesToBase64(files) {
    return new Promise((resolve) => {
        const images = [];
        let count = 0;
        
        if (files.length === 0) {
            resolve([]);
            return;
        }
        
        for (let i = 0; i < files.length && i < 10; i++) {
            const reader = new FileReader();
            reader.onload = function(e) {
                images.push(e.target.result);
                count++;
                if (count === files.length || count === 10) {
                    resolve(images);
                }
            };
            reader.readAsDataURL(files[i]);
        }
    });
}

// إضافة منشور جديد
const addPostForm = document.getElementById('add-post-form');
if (addPostForm) {
    addPostForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const imageInput = document.querySelector('.post-image');
        const files = imageInput ? Array.from(imageInput.files) : [];
        
        const images = await imagesToBase64(files);
        
        const newPost = {
            id: Date.now(),
            title: title,
            content: content,
            images: images,
            date: new Date().toISOString()
        };
        
        posts.unshift(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
        
        alert('تم نشر المنشور بنجاح!');
        addPostForm.reset();
        
        if (window.location.pathname.includes('admin.html')) {
            displayAdminPosts();
        } else {
            displayPosts();
        }
    });
}

// عرض المنشورات في لوحة التحكم
function displayAdminPosts() {
    const container = document.getElementById('admin-posts-list');
    if (!container) return;
    
    if (posts.length === 0) {
        container.innerHTML = '<p>لا توجد منشورات حالياً</p>';
        return;
    }
    
    container.innerHTML = posts.map(post => `
        <div class="admin-post-item" style="border: 1px solid rgba(0,255,255,0.3); padding: 1rem; margin-bottom: 1rem; border-radius: 10px;">
            <h4>${post.title}</h4>
            <p>${post.content.substring(0, 100)}...</p>
            <small>${new Date(post.date).toLocaleDateString('ar-SA')}</small>
            <div style="margin-top: 0.5rem;">
                <button onclick="editPost(${post.id})" class="btn-secondary" style="padding: 0.3rem 1rem;">✏️ تعديل</button>
                <button onclick="deletePost(${post.id})" class="btn-secondary" style="padding: 0.3rem 1rem; background: rgba(255,0,0,0.2);">🗑️ حذف</button>
            </div>
        </div>
    `).join('');
}

// حذف منشور
function deletePost(id) {
    if (confirm('هل أنت متأكد من حذف هذا المنشور؟')) {
        posts = posts.filter(post => post.id !== id);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayAdminPosts();
        if (window.location.pathname.includes('posts.html')) {
            displayPosts();
        }
        alert('تم حذف المنشور بنجاح!');
    }
}

// تعديل منشور
function editPost(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        const newTitle = prompt('العنوان الجديد:', post.title);
        const newContent = prompt('المحتوى الجديد:', post.content);
        
        if (newTitle && newContent) {
            post.title = newTitle;
            post.content = newContent;
            localStorage.setItem('posts', JSON.stringify(posts));
            displayAdminPosts();
            alert('تم تعديل المنشور بنجاح!');
        }
    }
}

// تشغيل الدوال عند تحميل الصفحة
if (document.getElementById('posts-container')) {
    displayPosts();
}

if (document.getElementById('admin-posts-list')) {
    displayAdminPosts();
}
