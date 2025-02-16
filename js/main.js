function createParticle(x, y) {
  const particle = document.createElement("i");
  particle.classList.add("particle", "fa-solid", "fa-splotch");
  document.body.appendChild(particle);

  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  const particleWith = (Math.random() + 1) * 2

  // particle.style.width = particleWith + "vh"
  // particle.style.height = particleWith + "vh"
  // particle.style.backgroundColor = Math.random() * 100 < 75 ? "rgb(148, 64, 60)" : "white"

  particle.style.fontSize = particleWith + "vh"
  particle.style.color = Math.random() * 100 < 75 ? "rgb(148, 64, 60)" : "white"


  gsap.to(particle, {
    duration: 2.5,
    x: (Math.random() - 0.5) * 200,
    y: (Math.random() - 0.5) * 200,
    scale: 0,
    opacity: 0,
    ease: "power2.out",
    onComplete: () => particle.remove(),
  });
};

[...document.querySelectorAll("a")].forEach(e => {
  e.addEventListener("mouseenter", (e) => {
    for (let i = 0; i < 5; i++) {
      createParticle(e.clientX, e.clientY)

    }
  })
})