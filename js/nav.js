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


  generateNavAnimation("navLogo", true)
  generateNavAnimation("navToggle")

});

document.addEventListener("scroll", (e) => {
  if (window.scrollY > 10) {
    document.getElementById("nav").classList.add("darkBGNav")
  } else {
    document.getElementById("nav").classList.remove("darkBGNav")

  }
})
