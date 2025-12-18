// ========================================
// LIGHTBOX MELHORADO - Versão 2.0
// Galeria de imagens com todas melhorias
// ========================================

function initScreenshotLightbox() {
    // Verifica se já existe o lightbox para não duplicar
    if (document.querySelector('.screenshot-lightbox')) {
        return;
    }

    // Cria o lightbox com estrutura melhorada
    const lightbox = document.createElement('div');
    lightbox.className = 'screenshot-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Galeria de imagens');
    lightbox.innerHTML = `
        <div class="lightbox-container">
            <!-- Loading Spinner -->
            <div class="lightbox-loading">
                <i class="fa-solid fa-spinner fa-spin"></i>
            </div>
            
            <!-- Imagem -->
            <img src="" alt="" class="lightbox-image">
            
            <!-- Botão Fechar -->
            <button class="lightbox-close" aria-label="Fechar galeria (ESC)">
                <i class="fa-solid fa-xmark"></i>
            </button>
            
            <!-- Navegação -->
            <button class="lightbox-prev" aria-label="Imagem anterior (←)">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button class="lightbox-next" aria-label="Próxima imagem (→)">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
            
            <!-- Contador de imagens -->
            <div class="lightbox-counter" aria-live="polite">
                <span class="current">1</span> / <span class="total">1</span>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Elementos do lightbox
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxLoading = lightbox.querySelector('.lightbox-loading');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    const currentCounter = lightbox.querySelector('.current');
    const totalCounter = lightbox.querySelector('.total');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    // Todas as screenshots da página
    const screenshots = document.querySelectorAll('.real-screenshot');
    let currentIndex = 0;
    let isOpen = false;

    // Atualiza total de imagens
    totalCounter.textContent = screenshots.length;

    // ========== ABRIR LIGHTBOX ==========
    screenshots.forEach((screenshot, index) => {
        screenshot.addEventListener('click', function(e) {
            e.preventDefault();
            openLightbox(index);
        });
        
        // Acessibilidade: Enter/Space também abre
        screenshot.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
    });

    function openLightbox(index) {
        currentIndex = index;
        isOpen = true;
        
        // Mostra lightbox
        lightbox.classList.add('active');
        
        // BLOQUEIA SCROLL DO BODY
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = getScrollbarWidth() + 'px'; // Previne "jump"
        
        // Carrega imagem
        showImage(currentIndex);
        
        // Focus no botão fechar (acessibilidade)
        closeBtn.focus();
    }

    // ========== FECHAR LIGHTBOX ==========
    function closeLightbox() {
        if (!isOpen) return;
        
        lightbox.classList.remove('active');
        isOpen = false;
        
        // RESTAURA SCROLL DO BODY
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        
        // Retorna focus para a imagem que estava aberta
        if (screenshots[currentIndex]) {
            screenshots[currentIndex].focus();
        }
    }

    // Clique no X
    closeBtn.addEventListener('click', closeLightbox);

    // Clique no fundo escuro (fora da imagem)
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // ========== NAVEGAÇÃO ==========
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentIndex > 0) {
            currentIndex--;
            showImage(currentIndex);
        }
    });

    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentIndex < screenshots.length - 1) {
            currentIndex++;
            showImage(currentIndex);
        }
    });

    // ========== TECLADO ==========
    document.addEventListener('keydown', function(e) {
        if (!isOpen) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                if (currentIndex > 0) {
                    currentIndex--;
                    showImage(currentIndex);
                }
                break;
            case 'ArrowRight':
                if (currentIndex < screenshots.length - 1) {
                    currentIndex++;
                    showImage(currentIndex);
                }
                break;
        }
    });

    // ========== MOSTRAR IMAGEM COM FADE ==========
    function showImage(index) {
        const imgSrc = screenshots[index].querySelector('img').src;
        const imgAlt = screenshots[index].querySelector('img').alt;
        
        // Mostra loading
        lightboxLoading.style.display = 'flex';
        
        // Fade out imagem atual
        lightboxImg.style.opacity = '0';
        
        // Cria nova imagem para preload
        const tempImg = new Image();
        
        tempImg.onload = function() {
            // Espera fade out completar
            setTimeout(() => {
                lightboxImg.src = imgSrc;
                lightboxImg.alt = imgAlt;
                
                // Esconde loading
                lightboxLoading.style.display = 'none';
                
                // Fade in nova imagem
                lightboxImg.style.opacity = '1';
                
                // Atualiza contador
                currentCounter.textContent = index + 1;
                
                // Atualiza botões de navegação
                updateNavigation();
            }, 200);
        };
        
        tempImg.onerror = function() {
            console.error('Erro ao carregar imagem:', imgSrc);
            lightboxLoading.style.display = 'none';
            lightboxImg.style.opacity = '1';
        };
        
        // Inicia carregamento
        tempImg.src = imgSrc;
    }

    // ========== ATUALIZAR NAVEGAÇÃO ==========
    function updateNavigation() {
        // Esconde botão prev se for primeira imagem
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
        prevBtn.disabled = currentIndex === 0;
        
        // Esconde botão next se for última imagem
        nextBtn.style.display = currentIndex === screenshots.length - 1 ? 'none' : 'flex';
        nextBtn.disabled = currentIndex === screenshots.length - 1;
    }

    // ========== UTILITÁRIOS ==========
    
    // Calcula largura da scrollbar (previne "jump" ao bloquear scroll)
    function getScrollbarWidth() {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        document.body.appendChild(outer);
        
        const inner = document.createElement('div');
        outer.appendChild(inner);
        
        const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
        
        outer.parentNode.removeChild(outer);
        
        return scrollbarWidth;
    }

    // ========== TOUCH/SWIPE (Mobile) ==========
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left (próxima)
            if (currentIndex < screenshots.length - 1) {
                currentIndex++;
                showImage(currentIndex);
            }
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right (anterior)
            if (currentIndex > 0) {
                currentIndex--;
                showImage(currentIndex);
            }
        }
    }
}

// ========== INICIALIZAÇÃO ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScreenshotLightbox);
} else {
    initScreenshotLightbox();
}