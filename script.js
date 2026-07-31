/**
 * Lógica Súper Limpia.
 * Sin scripts invasivos, sin efectos de ratón pesados.
 * Únicamente utilizamos IntersectionObserver para lograr
 * la elegante aparición de los elementos a medida que el usuario hace scroll.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Seleccionamos todas las secciones con la clase .fade-in
    const sections = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // El elemento aparecerá cuando el 15% sea visible en pantalla
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadimos la clase 'visible' para disparar la animación CSS
                entry.target.classList.add('visible');
                // Dejamos de observar el elemento para mejor rendimiento
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicar el observador a cada sección
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Asegurarnos de que el primer bloque (Hero) cargue de inmediato
    setTimeout(() => {
        if(sections[0]) {
            sections[0].classList.add('visible');
        }
    }, 100);

});
