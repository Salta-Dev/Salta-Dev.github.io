document.addEventListener("DOMContentLoaded", (event) => {

  const navLogo = document.getElementById("navLogo");

  const timeline = gsap.timeline({
    paused: true,

  }).to("#navLogo .notHover", {
    scale: 0,
    transform: "translateY(5vh)",
    duration: 0.25,
    ease: "sine.inOut"
  }).to("#navLogo .inHover", {
    scale: 1,
    transform: "translateY(-5vh)",
    duration: 0.35,
    rotate: "360deg",
    ease: "sine.inOut"
  })

  navLogo.addEventListener("mouseenter", (e) => {
    for (let i = 0; i < 10; i++) {
      createParticle(e.clientX, e.clientY);
    }
    timeline.play()

  });

  navLogo.addEventListener("mouseleave", (e) => {

    timeline.reverse()
  })

  function createParticle(x, y) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    document.body.appendChild(particle);

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const particleWith = (Math.random() + 1) * 2

    particle.style.width = particleWith + "vh"
    particle.style.height = particleWith + "vh"
    particle.style.backgroundColor = Math.random() * 100 < 75 ? "rgb(148, 64, 60)" : "white"


    // Animamos la partícula con GSAP
    gsap.to(particle, {
      duration: 2.5,
      x: (Math.random() - 0.5) * 200, // Movimiento aleatorio
      y: (Math.random() - 0.5) * 200,
      scale: 0,
      opacity: 0,
      ease: "power2.out",
      onComplete: () => particle.remove(),
    });
  }
});