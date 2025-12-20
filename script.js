if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("pageshow", e => {
  if (e.persisted || performance.getEntriesByType("navigation")[0].type === "reload") {
    window.scrollTo(0, 0);
  }
});

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
  if (document.activeElement) document.activeElement.blur();
});

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth"
        });
      }
    });

    link.addEventListener("mouseenter", () => {
      link.classList.add("nav-glow");
    });

    link.addEventListener("mouseleave", () => {
      link.classList.remove("nav-glow");
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove("active"));
        const active = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );
        if (active) active.classList.add("active");
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => observer.observe(section));
});
