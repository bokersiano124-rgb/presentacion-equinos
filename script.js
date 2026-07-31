document.addEventListener("DOMContentLoaded", () => {
    
    // Seleccionar todos los elementos que van a ser animados
    const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

    // Configuración del Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Se activa cuando el 20% del elemento es visible
    };

    // Crear el Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar clase para disparar la animación CSS
                entry.target.classList.add('in-view');
            } else {
                // Opcional: Quitar la clase si quieres que la animación se repita al volver a la diapositiva
                // Para una experiencia de Keynote, las animaciones suelen repetirse al navegar atrás y adelante.
                entry.target.classList.remove('in-view');
            }
        });
    }, observerOptions);

    // Observar cada elemento
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Pequeño hack para asegurar que la primera diapositiva se anime inmediatamente al cargar
    setTimeout(() => {
        const firstSlideElements = document.querySelectorAll('.slide:first-child .fade-up, .slide:first-child .fade-left, .slide:first-child .fade-right');
        firstSlideElements.forEach(el => el.classList.add('in-view'));
    }, 100);
});
