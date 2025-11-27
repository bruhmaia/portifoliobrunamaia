$(document).ready(function(){
    // Alterna o menu no mobile
    $('#mobile_btn').on('click', function(){
        $('#nav_list').toggleClass('active');
        $(this).find('i').toggleClass('fa-x fa-bars');
    });

    $('#nav_list .nav-item a').on('click', function(){
        $('#nav_list').removeClass('active');
        $('#mobile_btn').find('i').removeClass('fa-x');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function() {
        const header = $('header');
        const scrollPosition = $(window).scrollTop();
        const headerHeight = header.outerHeight();

        // Efeito de blur e sombra no header
        if (scrollPosition > 100) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }

        // Navegação ativa
        let activeSectionIndex = 0;

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 100;
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        });

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');

        // BOTÃO VOLTAR AO TOPO - CORRIGIDO
        if (scrollPosition > 300) {
            $('#back-to-top').removeClass('hidden');
        } else {
            $('#back-to-top').addClass('hidden');
        }
    });

    // CLICK DO BOTÃO VOLTAR AO TOPO
    $('#back-to-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    // Animações com ScrollReveal
    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.project-card', {
        origin: 'left',
        duration: 1500,
        distance: '50px',
        interval: 200
    });

    ScrollReveal().reveal('#about', {
        origin: 'right',
        duration: 1500,
        distance: '50px'
    });

    ScrollReveal().reveal('.education-item', {
        origin: 'bottom',
        duration: 1200,
        distance: '30px',
        interval: 150
    });

    // Efeito de máquina de escrever apenas no slogan
    typeWriterSlogan();

    // Controle da setinha
    handleScrollIndicator();

    // FILTROS DE PROJETOS
    $('.filter-btn').on('click', function() {
        const filter = $(this).data('filter');
        
        // Ativar botão clicado
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        // Mostrar/ocultar projetos com animação
        if (filter === 'all') {
            $('.project-card').stop(true, true).fadeIn(300);
        } else {
            $('.project-card').stop(true, true).hide();
            $(`.project-card[data-categories*="${filter}"]`).fadeIn(300);
        }
    });

    // Clicar numa tag filtra automaticamente
    $('.project-tags span').on('click', function() {
        const filter = $(this).data('filter');
        $(`.filter-btn[data-filter="${filter}"]`).click();
    });
});

// Efeito de máquina de escrever apenas no slogan
function typeWriterSlogan() {
    const sloganElement = document.querySelector('#cta h3');
    if (!sloganElement) return;
    
    const originalText = sloganElement.textContent;
    
    let i = 0;
    sloganElement.textContent = '';
    
    function type() {
        if (i < originalText.length) {
            sloganElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, 60);
        }
    }
    
    setTimeout(type, 2000);
}

// Controle inteligente da setinha
function handleScrollIndicator() {
    const scrollIndicator = $('.scroll-indicator');
    const scrollPosition = $(window).scrollTop();
    
    if (scrollPosition > 100) {
        scrollIndicator.addClass('hidden');
    } else {
        scrollIndicator.removeClass('hidden');
    }
}

// Clique na setinha para rolar suave
$('.scroll-indicator').on('click', function() {
    $('html, body').animate({
        scrollTop: $('#about').offset().top
    }, 800);
});