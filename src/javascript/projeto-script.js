$(document).ready(function() {
    // Alterna o menu no mobile
    $('#mobile_btn').on('click', function() {
        $('#nav_list').toggleClass('active');
        $(this).find('i').toggleClass('fa-x fa-bars');
    });

    // Fecha o menu ao clicar em um link
    $('#nav_list .nav-item a').on('click', function() {
        $('#nav_list').removeClass('active');
        $('#mobile_btn').find('i').removeClass('fa-x');
    });

    // Navegação suave para âncoras internas
    $('#nav_list a[href^="#"]').on('click', function(e) {
        e.preventDefault();

        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70 // Ajuste para a altura do header
            }, 800);
        }
    });

    // Ativação do menu conforme scroll (específico para página de projeto)
    const projectSections = [
        'project-detail',
        'sobre-projeto',
        'funcionalidades',
        'telas-aplicativo',
        'processo-desenvolvimento'
    ];

    const navItems = $('.nav-item');

    $(window).on('scroll', function() {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() + 100;

        // Sombra no header quando scrollar
        if (scrollPosition > 50) {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1)');
        } else {
            header.css('box-shadow', 'none');
        }

        // Ativação das seções do projeto
        let currentSection = '';

        projectSections.forEach(sectionId => {
            const section = $(`#${sectionId}`);
            if (section.length) {
                const sectionTop = section.offset().top - 100;
                const sectionBottom = sectionTop + section.outerHeight();

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSection = sectionId;
                }
            }
        });

        navItems.removeClass('active');

        if (currentSection) {
            $(`#nav_list .nav-item a[href="#${currentSection}"]`)
                .parent()
                .addClass('active');
        }
    });

    // Adiciona IDs às seções do projeto
    function initProjectSections() {
        // Remove IDs existentes para evitar conflitos
        $('.project-about, .project-features, .app-screens-detailed, .project-process')
            .removeAttr('id');

        // Adiciona novos IDs
        $('.project-about').attr('id', 'sobre-projeto');
        $('.project-features').attr('id', 'funcionalidades');
        $('.app-screens-detailed').attr('id', 'telas-aplicativo');
        $('.project-process').attr('id', 'processo-desenvolvimento');
        // O project-detail já tem ID no HTML
    }

    // Simula navegação entre as telas do mockup
    function initScreenInteractions() {
        // Navegação da galeria para detalhes
        $('.review-card').on('click', function() {
            alert('Navegando para os detalhes completos da avaliação...');
        });

        // Filtros da galeria
        $('.reviews-filter span').on('click', function() {
            $('.reviews-filter span').removeClass('filter-active');
            $(this).addClass('filter-active');
        });

        // Filtros do catálogo
        $('.filter-pill').on('click', function() {
            if (!$(this).hasClass('active')) {
                $('.filter-pill').removeClass('active');
                $(this).addClass('active');
            }
        });
    }

    // Inicializa todas as funções
    initProjectSections();
    initScreenInteractions();
});

// Animações específicas para a página do projeto
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal('.feature-card', {
        origin: 'bottom',
        duration: 1000,
        distance: '30px',
        delay: 200,
        interval: 200
    });

    ScrollReveal().reveal('.screen-item', {
        duration: 1000,
        distance: '50px',
        delay: 300
    });

    ScrollReveal().reveal('.process-step', {
        origin: 'right',
        duration: 1000,
        distance: '30px',
        delay: 200,
        interval: 200
    });
}
