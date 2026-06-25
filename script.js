document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Kaydırma Tetikli Görünme Animasyonları (Scroll Reveal)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.08
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-anim');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up, .reveal-zoom').forEach(el => observer.observe(el));

    // 2. Premium Navbar Cam Efekti Kontrolü
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 15, 22, 0.98)';
            navbar.style.boxShadow = '0 5px 25px rgba(0,0,0,0.8)';
            navbar.style.padding = '5px 0';
        } else {
            navbar.style.background = 'rgba(10, 15, 22, 0.85)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '0';
        }
    });

    // 3. Sıfır Hatalı Mobil Drawer Menü Yönetimi
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const menuItems = document.querySelectorAll('.nav-item, .nav-btn');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.className = 'fas fa-times';
            hamburger.style.transform = 'rotate(90deg)';
        } else {
            icon.className = 'fas fa-bars';
            hamburger.style.transform = 'rotate(0deg)';
        }
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').className = 'fas fa-bars';
            hamburger.style.transform = 'rotate(0deg)';
        });
    });

    // 4. Premium Müşteri Yorumları Havuzu
    const reviews = [
        { name: "Ahmet Y.", type: "Villa Sahibi", text: "İnşaat sonrası evime girmeye korkuyordum. Ekip sabah geldi, akşama anahtar teslim pırıl pırıl yaptılar. İşlerini çok iyi biliyorlar." },
        { name: "Selin K.", type: "Ajans Yöneticisi", text: "Ofis temizliğinde uzun süredir onlarla çalışıyoruz. Her sabah masama oturduğumda hissettiğim o ferahlık paha biçilemez." },
        { name: "Murat D.", type: "Site Yönetimi", text: "5 bloklu sitemizin kapalı otoparkını yıkadılar, zemin ilk günkü rengine döndü. Kesinlikle herkese tavsiye ederim." },
        { name: "Ayşe N.", type: "Ev Hanımı", text: "Koltuklar ve halılar için özel ekipleri var. Leke falan kalmadı, üstelik kullandıkları ürünler çok güzel kokuyor." },
        { name: "Burak C.", type: "Mağaza Müdürü", text: "Dış cephe cam temizliğinde tek geçerim. Mağazanın vitrinleri kristal gibi parladı, müşteri çekişimiz bile etkilendi." },
        { name: "Zeynep T.", type: "Mimar", text: "Teslimat öncesi yaptığımız tadilatların tüm pisliğini sıfırlıyorlar. İşimi çok kolaylaştırıyorlar." },
        { name: "Kemal S.", type: "Fabrika Sahibi", text: "Endüstriyel zemin temizliğinde sanayi makineleriyle efsane iş çıkardılar. Yağ lekelerinden eser kalmadı." },
        { name: "Elif B.", type: "Kafe İşletmecisi", text: "Mekan temizliğinde bu kadar titiz bir ekip görmedim. Mutfak baştan yaratıldı adeta." },
        { name: "Canan R.", type: "Yazlık Sahibi", text: "Yazlık sezon açılışı için çağırdık, dip bucak girdiler. Gönül rahatlığıyla oturduk." },
        { name: "Hakan M.", type: "Plaza Yöneticisi", text: "Kurumsal yaklaşımları ve iş ciddiyetleri çok iyi. Söz verdikleri saatte başlayıp bitirdiler." }
    ];

    const track = document.getElementById('reviews-track');
    let reviewHTML = "";
    
    for(let i = 0; i < 3; i++) {
        reviews.forEach(review => {
            let initial = review.name.charAt(0);
            reviewHTML += `
                <div class="review-card">
                    <div class="stars">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    </div>
                    <p>"${review.text}"</p>
                    <div class="review-author">
                        <div class="author-avatar">${initial}</div>
                        <div class="author-info">
                            <h5>${review.name}</h5>
                            <span>${review.type}</span>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    track.innerHTML = reviewHTML + reviewHTML;

    // 5. İstatistik Sayaç Mekanizması
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const counterObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const increment = target / (duration / 16);
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if(current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.3 });

    const statsSection = document.getElementById('stats');
    if(statsSection) counterObserver.observe(statsSection);

});