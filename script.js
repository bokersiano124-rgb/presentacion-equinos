/**
 * Lógica de animación mejorada y a prueba de fallos.
 * Primero oculta los elementos SOLO si el JavaScript funciona,
 * lo que evita cualquier riesgo de que la página se quede en negro.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleccionar todos los elementos a animar
    const revealElements = document.querySelectorAll('.reveal');

    // 1. Preparar elementos (ocultarlos inicialmente por JS)
    // De esta forma, si JS falla, el CSS los mantiene 100% visibles.
    revealElements.forEach(el => {
        el.classList.add('js-hidden');
    });

    // 2. Configurar el observador de scroll estándar
    const observerOptions = {
        root: null, // Vigila el scroll estándar de la ventana (mucho más estable)
        rootMargin: '0px',
        threshold: 0.2 // Se activa cuando el 20% del elemento es visible
    };

    // 3. Callback para cuando el usuario hace scroll
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Al entrar en pantalla, quitamos la clase oculta
                entry.target.classList.remove('js-hidden');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 4. Iniciar la observación
    revealElements.forEach(el => {
        observer.observe(el);
    });
});
