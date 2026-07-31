/**
 * Lógica para las animaciones suaves (Scroll Reveal)
 * Inspirado en las páginas de productos premium donde 
 * el contenido aparece elegantemente a medida que el usuario hace scroll.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los elementos con la clase .reveal
    const reveals = document.querySelectorAll('.reveal');

    // Configuración del Intersection Observer para el rendimiento fluido
    const revealOptions = {
        threshold: 0.15, // Ejecuta la animación cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Añade la clase active para disparar el CSS (Fade In & Slide Up)
                entry.target.classList.add('active');
                
                // Dejar de observar el elemento una vez animado para mejor rendimiento
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Aplicar el observador a cada elemento .reveal
    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
    
    // Activar inmediatamente los elementos que ya están en el viewport al cargar la página
    setTimeout(() => {
        reveals.forEach(reveal => {
            const rect = reveal.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                reveal.classList.add('active');
            }
        });
    }, 100);
});
