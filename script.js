document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const currentCountEl = document.getElementById('currentCount');
    const totalCountEl = document.getElementById('totalCount');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Inicializar controles
    totalCountEl.textContent = totalSlides;
    updateUI();

    // Navegación con botones
    prevBtn.addEventListener('click', () => changeSlide(-1));
    nextBtn.addEventListener('click', () => changeSlide(1));

    // Navegación con teclado (Flechas)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight' || e.key === ' ') changeSlide(1);
    });

    // Navegación Táctil (Swipe para móviles)
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const minSwipeDistance = 50; // distancia mínima para considerar swipe
        if (touchEndX < touchStartX - minSwipeDistance) changeSlide(1); // Swipe Izquierda (Siguiente)
        if (touchEndX > touchStartX + minSwipeDistance) changeSlide(-1); // Swipe Derecha (Anterior)
    }

    // Función principal para cambiar diapositivas
    function changeSlide(direction) {
        slides[currentSlide].classList.remove('active');
        
        currentSlide += direction;
        
        // Límites
        if (currentSlide < 0) currentSlide = 0;
        if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;
        
        slides[currentSlide].classList.add('active');
        updateUI();
    }

    // Actualiza el progreso, el contador y el estado de los botones
    function updateUI() {
        // Actualizar número actual
        currentCountEl.textContent = currentSlide + 1;
        
        // Actualizar barra de progreso
        const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Habilitar / deshabilitar botones
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
    }
});