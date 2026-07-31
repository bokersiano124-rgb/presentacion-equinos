document.addEventListener('DOMContentLoaded', () => {
    
    // Seleccionamos el contenedor que tiene el scroll
    const scrollContainer = document.querySelector('.presentation-container');
    
    // Configuración del observador
    const observerOptions = {
        root: scrollContainer, // Le indicamos que vigile el scroll interno, no la ventana principal
        rootMargin: '0px',
        threshold: 0.15 // Dispara la animación cuando el 15% del elemento es visible
    };

    // Callback que se ejecuta cuando los elementos entran en pantalla
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase active para mostrar el elemento
                entry.target.classList.add('active');
            } else {
                // Remueve la clase para que la animación se repita al volver a esa diapositiva
                entry.target.classList.remove('active');
            }
        });
    };

    // Inicializar el IntersectionObserver
    const revealObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Seleccionar todos los elementos a animar
    const revealElements = document.querySelectorAll('.reveal');

    // Observar cada elemento
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
});
