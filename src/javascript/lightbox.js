// Lightbox para Screenshots - Arquivo Separado
function initScreenshotLightbox() {
    // Verifica se já existe o lightbox para não duplicar
    if (document.querySelector('.screenshot-lightbox')) {
        return;
    }

    // Cria o lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'screenshot-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-container">
            <img src="" alt="" class="lightbox-image">
            <button class="lightbox-close">
                <i class="fa-solid fa-times"></i>
            </button>
            <button class="lightbox-prev">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button class="lightbox-next">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    `;
    document.body.appendChild(lightbox);

    const screenshots = document.querySelectorAll('.real-screenshot');
    let currentIndex = 0;

    // Abre o lightbox
    screenshots.forEach((screenshot, index) => {
        screenshot.addEventListener('click', function(e) {
            e.preventDefault();
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            
            lightbox.querySelector('.lightbox-image').src = imgSrc;
            lightbox.querySelector('.lightbox-image').alt = imgAlt;
            lightbox.classList.add('active');
            currentIndex = index;
            
            // Esconde setas se for a primeira/última imagem
            updateNavigation();
        });
    });

    // Fecha o lightbox
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.closest('.lightbox-close')) {
            lightbox.classList.remove('active');
        }
    });

    // Navegação entre imagens
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentIndex > 0) {
            currentIndex--;
            showImage(currentIndex);
        }
    });

    lightbox.querySelector('.lightbox-next').addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentIndex < screenshots.length - 1) {
            currentIndex++;
            showImage(currentIndex);
        }
    });

    // Navegação com teclado
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            showImage(currentIndex);
        } else if (e.key === 'ArrowRight' && currentIndex < screenshots.length - 1) {
            currentIndex++;
            showImage(currentIndex);
        }
    });

    function showImage(index) {
        const imgSrc = screenshots[index].querySelector('img').src;
        const imgAlt = screenshots[index].querySelector('img').alt;
        
        lightbox.querySelector('.lightbox-image').src = imgSrc;
        lightbox.querySelector('.lightbox-image').alt = imgAlt;
        updateNavigation();
    }

    function updateNavigation() {
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
        nextBtn.style.display = currentIndex === screenshots.length - 1 ? 'none' : 'flex';
    }
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScreenshotLightbox);
} else {
    initScreenshotLightbox();
}