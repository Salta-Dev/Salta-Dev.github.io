document.addEventListener("DOMContentLoaded", (event) => {

  const rightSide = document.getElementById("rightSide");



  function generateNavAnimation(genTag, animateOnHover) {
    const navLogo = document.getElementById(genTag);
    const timeline = gsap.timeline({
      paused: true,

    }).to(`#${genTag} .notHover`, {
      scale: 0,
      transform: "translateY(5vh)",
      duration: 0.25,
      ease: "sine.inOut"
    }).to(`#${genTag} .inHover`, {
      scale: 1,
      transform: "translateY(-5vh)",
      duration: 0.35,
      rotate: "360deg",
      ease: "sine.inOut"
    })

    if (animateOnHover) {
      navLogo.addEventListener("mouseenter", (e) => {
        for (let i = 0; i < 10; i++) {
          createParticle(e.clientX, e.clientY);
        }
        timeline.play()

      });

      navLogo.addEventListener("mouseleave", (e) => {

        timeline.reverse()
      })
    } else {
      let condition = false
      navLogo.addEventListener("click", (e) => {

        for (let i = 0; i < 10; i++) {
          createParticle(e.clientX, e.clientY);
        }
        if (!condition) {
          timeline.play()

        } else {
          timeline.reverse()
        }
        rightSide.classList.toggle("openNav")
        document.getElementsByTagName("nav")[0].classList.toggle("darkBG")
        condition = !condition


      });


    }


  }

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
  }


  generateNavAnimation("navLogo", true)
  generateNavAnimation("navToggle")

});
