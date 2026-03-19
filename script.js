// Premium AG TECH - Interaction Logic

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const revealElements = document.querySelectorAll('.reveal');
    const leadForm = document.getElementById('leadForm');
    const formFeedback = document.getElementById('formFeedback');

    // 1. Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 1b. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 2. Reveal on Scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Form Submission Handling
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulating premium loading state
        const btn = leadForm.querySelector('button');
        const originalText = btn.innerText;
        btn.disabled = true;
        btn.innerText = 'Processing Diagnosis...';
        btn.classList.add('opacity-70');

        setTimeout(() => {
            leadForm.classList.add('opacity-0', 'transition-opacity', 'duration-500');
            setTimeout(() => {
                leadForm.classList.add('hidden');
                formFeedback.classList.remove('hidden');
                formFeedback.classList.add('animate-in', 'fade-in', 'slide-in-from-top-4', 'duration-700');
            }, 500);
        }, 1500);

        // Here you would normally send data to a backend (Supabase, etc.)
        const formData = new FormData(leadForm);
        console.log('Lead Captured:', Object.fromEntries(formData.entries()));
    });

    // 4. Smooth Anchor Scrolling (already handled by class="scroll-smooth")
    // But adding a small offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
