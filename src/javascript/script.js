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
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1)');
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 70;
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        });

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
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
});