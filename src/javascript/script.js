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

        // Efeito de blur e sombra no header - MELHORIA QUE TÍNHAMOS FEITO
        if (scrollPosition > 100) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }

        // Navegação ativa - FUNCIONALIDADE COMPLETA
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
    });

    // Animações com ScrollReveal - TODAS AS ANIMAÇÕES ORIGINAIS
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
            setTimeout(type, 60); // Velocidade média
        }
    }
    
    // Iniciar com um pequeno delay
    setTimeout(type, 2000);
}

// Chamar quando a página carregar
$(document).ready(function(){
    typeWriterSlogan();
});

// Controle inteligente da setinha
function handleScrollIndicator() {
    const scrollIndicator = $('.scroll-indicator');
    const scrollPosition = $(window).scrollTop();
    
    // Se rolou mais que 100px, esconde a setinha
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

// Atualizar ao rolar
$(window).on('scroll', function() {
    handleScrollIndicator();
});

// Chamar quando carregar
$(document).ready(function(){
    handleScrollIndicator();
});

    // FILTROS DE PROJETOS - VERSÃO MELHORADA
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

        // VERSÃO ALTERNATIVA - MAIS ROBUSTA
    $(document).ready(function(){
        // Botão Voltar ao Topo
        $('#back-to-top').on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
        
        // Mostrar/ocultar botão
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 300) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
        });
        
        // Esconder botão no carregamento
        $('#back-to-top').hide();
    });