document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.querySelector(':root');

    // Theme toggle Logic
    themeToggle.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'light') {
            document.body.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.body.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // Language switching logic
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('portfolioLang') || 'en'; // Restore from storage

    const updateLanguage = () => {
        document.querySelectorAll('[data-en]').forEach(el => {
            const text = el.getAttribute(`data-${currentLang}`);
            
            // Si l'élément a des enfants, on utilise innerHTML (pour conserver <strong>, <i/>)
            if (el.children.length > 0 || text.includes('<')) {
                el.innerHTML = text;
            } else {
                el.textContent = text;
            }
        });
        
        // Update language button text specifically so it shows the toggle intent
        if(langToggle) {
            langToggle.textContent = currentLang === 'fr' ? 'EN / FR' : 'FR / EN';
        }

        // Persist language choice
        localStorage.setItem('portfolioLang', currentLang);
    };

    // Apply saved language on load
    updateLanguage();

    if(langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'fr' ? 'en' : 'fr';
            updateLanguage();
        });
    }

    // Image Modal functionality
    const imgModal = document.getElementById('image-modal');
    const expandedImg = document.getElementById('expanded-img');
    const imgCaption = document.getElementById('img-caption');
    const closeImgBtn = document.querySelector('.close-img');
    const pictures = document.querySelectorAll('.project-carousel img, .project-hero-img');

    pictures.forEach(img => {
        img.addEventListener('click', () => {
            if(imgModal) imgModal.style.display = 'block';
            if(expandedImg) expandedImg.src = img.src;
            if(imgCaption) imgCaption.textContent = img.alt;
        });
    });

    if(closeImgBtn) {
        closeImgBtn.addEventListener('click', () => {
            imgModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === imgModal) {
            imgModal.style.display = 'none';
        }
    });

    // Pending Build Logic
    const pendingBuilds = document.querySelectorAll('.pending-build');
    pendingBuilds.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const msg = currentLang === 'fr' 
                ? "Ce build n'est pas encore disponible publiquement. Merci de patienter, il arrive bientôt !" 
                : "This build is not yet publicly available. Please be patient, it's coming soon!";
            alert(msg);
        });
    });
});