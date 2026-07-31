/**
 * LÓGICA DE INTERACCIÓN PREMIUM (APPLE/NVIDIA STYLE)
 * - Efecto 3D Tilt Sincronizado.
 * - Brillo de Ratón (Glow).
 * - Animaciones Reveal atadas al Scroll Snap.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efecto Cursor Global (Sigue al ratón)
    const cursorGlow = document.querySelector('.cursor-glow');
    let isDesktop = window.matchMedia("(pointer: fine)").matches;

    if (isDesktop) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
            
            // Ocultar al salir de la pantalla
            if(e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
                cursorGlow.style.opacity = 0;
            } else {
                cursorGlow.style.opacity = 1;
            }
        });
    } else {
        cursorGlow.style.display = 'none';
    }

    // 2. Efecto 3D Card Dinámico y Glow Interno (Para mantener la simetría viva)
    const cards = document.querySelectorAll('.3d-card');
    
    cards.forEach(card => {
        if (!isDesktop) return; // En móvil se desactiva por rendimiento

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Posición X dentro de la tarjeta
            const y = e.clientY - rect.top;  // Posición Y dentro de la tarjeta
            
            // Actualizar variables CSS para el Glow Interno
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Algoritmo de Tilt 3D ultra suave
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Limitar la rotación para que no rompa la caja visualmente (Max 5 grados)
            const rotateX = ((y - centerY) / centerY) * -5; 
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            // Restaurar a la posición simétrica original
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            setTimeout(() => { card.style.transition = 'transform 0.1s'; }, 500);
        });
    });

    // 3. Sistema de Reveal atado al Scroll Snap
    // Como usamos scroll-snap, el Intersection Observer dispara animaciones de entrada.
    const container = document.querySelector('.snap-container');
    const slides = document.querySelectorAll('.snap-slide');
    
    const observerOptions = {
        root: container,
        threshold: 0.6 // Dispara cuando el 60% de la slide es visible (snap asegurado)
    };

    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const animatableElements = entry.target.querySelectorAll('.transform-up');
            
            if (entry.isIntersecting) {
                // Animar elementos dentro del slide activo
                animatableElements.forEach(el => el.classList.add('active'));
            } else {
                // (Opcional) Retirar clase para que se vuelva a animar al regresar
                animatableElements.forEach(el => el.classList.remove('active'));
            }
        });
    }, observerOptions);

    slides.forEach(slide => slideObserver.observe(slide));
    
    // Activar primera diapositiva inmediatamente
    setTimeout(() => {
        const firstElements = slides[0].querySelectorAll('.transform-up');
        firstElements.forEach(el => el.classList.add('active'));
    }, 200);

});
