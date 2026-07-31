/**
 * Intersección de Elementos (Scroll Reveal)
 * Funcionalidad inspirada en la suavidad de las presentaciones de Apple.
 * Detecta cuando un elemento con la clase '.reveal' entra en el viewport
 * y le añade la clase '.active' para disparar las animaciones CSS.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // Configuración del observador
    const observerOptions = {
        root: null, // Usa el viewport del navegador
        rootMargin: '0px',
        threshold: 0.15 // Dispara la animación cuando el 15% del elemento es visible
    };

    // Callback que se ejecuta cuando los elementos cruzan el umbral
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase active para iniciar la animación
                entry.target.classList.add('active');
                // Opcional: Descomentar la siguiente línea si quieres que la animación ocurra solo una vez
                // observer.unobserve(entry.target); 
            } else {
                // Remueve la clase si sale del viewport, permitiendo que la animación se repita al hacer scroll de vuelta
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
