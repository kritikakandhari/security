import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// Lenis
const lenis = new Lenis()

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Fade Up
const fadeUps = document.querySelectorAll('.gsap-fade-up')
fadeUps.forEach((elem) => {
    gsap.from(elem, {
        scrollTrigger: elem,
        y: 30,
        opacity: 0,
        duration: 1
    })
})

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
