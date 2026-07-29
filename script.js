document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal observer configuration
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Elements will trigger when 15% visible
    };

    // Intersection Observer to handle the trigger
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger the CSS transition
                entry.target.classList.add('is-visible');
                // Unobserve so animation happens only once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target elements mapped with '.fade-in' or '.slide-up' classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll offset functionality for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                // Calculate position considering fixed header height (approx 80px)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
