// Countdown Logic
const launchDate = new Date("Dec 1, 2025 00:00:00").getTime();

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = launchDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days < 10 ? '0' + days : days;
    document.getElementById("hours").textContent = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").textContent = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").textContent = seconds < 10 ? '0' + seconds : seconds;

    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("countdown").innerHTML = "<h3>We’re Live!</h3>";
    }
}, 1000);

// FOOTER AND FAQ

document.addEventListener("DOMContentLoaded", () => {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            // Toggle the clicked FAQ
            question.classList.toggle("active");

            let answer = question.nextElementSibling;
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }

            // Close other FAQs (optional)
            faqQuestions.forEach(other => {
                if (other !== question) {
                    other.classList.remove("active");
                    other.nextElementSibling.style.maxHeight = null;
                }
            });
        });
    });
});

// ABOUT SECTION ANIMATION

// ---------- GSAP scroll animations for About section ----------
document.addEventListener('DOMContentLoaded', () => {
  try {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.error('GSAP or ScrollTrigger not found. Make sure these scripts are loaded before main.js:\nhttps://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js\nhttps://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    console.log('GSAP + ScrollTrigger initialized for About animations');

    // Helper to decide horizontal start offset
    function getImageOffset(block, img) {
      // Priority: explicit class on image (.slide-left / .slide-right) -> block.reverse -> default left
      if (img && img.classList.contains('slide-left')) return -140;
      if (img && img.classList.contains('slide-right')) return 140;
      if (block && block.classList.contains('reverse')) return 140;
      return -140;
    }

    // Animate each about-block
    gsap.utils.toArray('.about-block').forEach((block) => {
      const text = block.querySelector('.about-text');
      const image = block.querySelector('.about-image');

      if (text) {
        gsap.fromTo(text,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse', // play when enter, reverse when leave
              //markers: true
            }
          }
        );
      }

      if (image) {
        const xStart = getImageOffset(block, image);
        gsap.fromTo(image,
          { x: xStart, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 1.05,
            ease: 'back.out(1.6)', // quick bounce
            scrollTrigger: {
              trigger: block,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
              //markers: true
            }
          }
        );
      }
    });

  } catch (err) {
    console.error('Error initializing about animations:', err);
  }
});

// Initialize AOS animations
AOS.init({
  duration: 800,
  once: true
});

// GSAP hover pulse effect for step numbers
document.querySelectorAll(".step").forEach(step => {
  step.addEventListener("mouseenter", () => {
    gsap.to(step.querySelector(".step-number"), {
      scale: 1.2,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  step.addEventListener("mouseleave", () => {
    gsap.to(step.querySelector(".step-number"), {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  });
});
