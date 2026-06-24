const header = document.querySelector("[data-header]");
const burger = document.querySelector("[data-burger]");
const nav = document.querySelector("[data-nav]");
const revealItems = document.querySelectorAll(".reveal");

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (burger && header && nav) {
  burger.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-menu-open");
    document.body.classList.toggle("is-menu-open", isOpen);
    burger.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      header.classList.remove("is-menu-open");
      document.body.classList.remove("is-menu-open");
      burger.setAttribute("aria-label", "Открыть меню");
    }
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -60px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));
