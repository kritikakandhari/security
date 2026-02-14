import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// Register ScrollTrigger
// This line is redundant as it's already registered above, but keeping it as per the provided snippet.
gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scroll (Lenis) - Kept largely same but ensured requestAnimationFrame
const lenis = new Lenis();

lenis.on('scroll', (e) => {
    // console.log(e); // Optional: Debug scroll
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// --- Animations ---

// 1. Navbar Scroll Effect (Glassmorphism on scroll)
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'var(--nav-bg)'; // Or transparent if at very top
            navbar.style.boxShadow = 'none';
        }
    });
}

// 2. Parallax Hero Effect
const parallaxBgs = document.querySelectorAll('.parallax-bg');
parallaxBgs.forEach(bg => {
    gsap.to(bg, {
        yPercent: 30, // Move background down slower than scroll
        ease: "none",
        scrollTrigger: {
            trigger: bg.parentElement, // specific hero section
            start: "top top", // start when top of section hits top of viewport
            end: "bottom top", // end when bottom of section hits top of viewport
            scrub: true
        }
    });
});

// 3. Fade Up Animations (Standard)
const fadeUpElements = document.querySelectorAll('.gsap-fade-up');
fadeUpElements.forEach(elem => {
    gsap.fromTo(elem,
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 85%", // Start animation when 85% down viewport
            }
        }
    );
});

// 4. Reveal Text Animation (for section titles)
const revealElements = document.querySelectorAll('.reveal-text');
revealElements.forEach(elem => {
    gsap.fromTo(elem,
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }, // Hidden (top down reveal)
        {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", // Fully visible
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 80%"
            }
        }
    );
});

// 5. Service Row Parallax (Image moves slightly different speed)
const serviceImages = document.querySelectorAll('.service-image img');
serviceImages.forEach(img => {
    gsap.fromTo(img,
        { scale: 1.1 }, // Start zoomed in slightly
        {
            scale: 1, // Zoom out to normal
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1 // Smooth scrub
            }
        }
    );
});


// Accordion
const accordions = document.querySelectorAll('.accordion-header')
accordions.forEach(acc => {
    acc.addEventListener('click', () => {
        acc.classList.toggle('active')
        const panel = acc.nextElementSibling
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px"
        }
    })
})

// Stats Counter
const stats = document.querySelectorAll('.stat-number')
stats.forEach(stat => {
    const rawTarget = stat.getAttribute('data-target')
    const target = +rawTarget // convert to number

    gsap.to(stat, {
        scrollTrigger: stat,
        innerHTML: target,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: "power1.out",
        onUpdate: function () {
            stat.innerHTML = Math.ceil(this.targets()[0].innerHTML) + (rawTarget.endsWith('+') ? '+' : '');
        }
    })
})
