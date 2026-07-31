document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const currentSlideSpan = document.getElementById('current-slide');
    const totalSlidesSpan = document.getElementById('total-slides');
    const progressBar = document.getElementById('progress-bar');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentSlide = 0;

    // Inicializar contadores
    totalSlidesSpan.textContent = totalSlides;
    updateUI();

    function updateUI() {
        // Remover clase activa de todas las diapositivas
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Añadir clase activa a la diapositiva actual
        slides[currentSlide].classList.add('active');

        // Actualizar contador numérico
        currentSlideSpan.textContent = currentSlide + 1;

        // Actualizar barra de progreso
        const progress = ((currentSlide) / (totalSlides - 1)) * 100;
        progressBar.style.width = `${progress}%`;

        // Estado de los botones
        prevBtn.style.opacity = currentSlide === 0 ? '0.3' : '1';
        prevBtn.style.cursor = currentSlide === 0 ? 'default' : 'pointer';
        
        nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.3' : '1';
        nextBtn.style.cursor = currentSlide === totalSlides - 1 ? 'default' : 'pointer';
    }

    function goToNextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateUI();
        }
    }

    function goToPrevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateUI();
        }
    }

    // Event Listeners para botones
    nextBtn.addEventListener('click', goToNextSlide);
    prevBtn.addEventListener('click', goToPrevSlide);

    // Event Listener para navegación con teclado (Flechas y Espacio)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            goToNextSlide();
        } else if (e.key === 'ArrowLeft') {
            goToPrevSlide();
        }
    });

    // Soporte para gestos táctiles (Swipe) en móviles
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
        const threshold = 50; // Mínima distancia para considerar un swipe
        if (touchEndX < touchStartX - threshold) {
            goToNextSlide(); // Swipe Izquierda -> Siguiente
        }
        if (touchEndX > touchStartX + threshold) {
            goToPrevSlide(); // Swipe Derecha -> Anterior
        }
    }
});
