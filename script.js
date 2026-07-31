document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => { observer.observe(element); });

    setTimeout(() => {
        const firstSlideElements = document.querySelectorAll('.slide:first-child .fade-up, .slide:first-child .fade-left, .slide:first-child .fade-right');
        firstSlideElements.forEach(el => el.classList.add('in-view'));
    }, 100);
});
