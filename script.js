document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efecto 3D Card Dinámico y Glow Interno
    // Reducimos ligeramente la intensidad para que la lectura del texto completo sea cómoda.
    const cards = document.querySelectorAll('.3d-card');
    const isDesktop = window.matchMedia("(pointer: fine)").matches;
    
    cards.forEach(card => {
        if (!isDesktop) return; 

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Inclinación muy sutil (2 grados máximo) para no marear al leer textos largos
            const rotateX = ((y - centerY) / centerY) * -2; 
            const rotateY = ((x - centerX) / centerX) * 2;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            setTimeout(() => { card.style.transition = 'transform 0.1s'; }, 500);
        });
    });

    // 2. Sistema de Reveal atado al Scroll Snap
    const container = document.querySelector('.snap-container');
    const slides = document.querySelectorAll('.snap-slide');
    
    const observerOptions = {
        root: container,
        threshold: 0.5 
    };

    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const animatableElements = entry.target.querySelectorAll('.transform-up');
            
            if (entry.isIntersecting) {
                animatableElements.forEach(el => el.classList.add('active'));
            } else {
                animatableElements.forEach(el => el.classList.remove('active'));
            }
        });
    }, observerOptions);

    slides.forEach(slide => slideObserver.observe(slide));
    
    setTimeout(() => {
        const firstElements = slides[0].querySelectorAll('.transform-up');
        firstElements.forEach(el => el.classList.add('active'));
    }, 200);

});
