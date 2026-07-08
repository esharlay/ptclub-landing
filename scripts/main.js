const header = document.querySelector("[data-header]");
const burger = document.querySelector("[data-burger]");
const nav = document.querySelector("[data-nav]");
const revealItems = document.querySelectorAll(".reveal");
const courtSlider = document.querySelector("[data-court-slider]");

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

if (courtSlider) {
  const slides = [...courtSlider.querySelectorAll("[data-court-slide]")];
  const dots = [...courtSlider.querySelectorAll("[data-court-dot]")];
  const prevButton = courtSlider.querySelector("[data-court-prev]");
  const nextButton = courtSlider.querySelector("[data-court-next]");
  let activeIndex = 0;
  let autoShuffleId;

  const renderCourtSlider = (nextIndex) => {
    const previousIndex = activeIndex;
    activeIndex = (nextIndex + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === activeIndex);
      slide.classList.toggle("is-leaving", index === previousIndex && index !== activeIndex);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
    });

    window.setTimeout(() => {
      slides.forEach((slide) => slide.classList.remove("is-leaving"));
    }, 560);
  };

  const startAutoShuffle = () => {
    autoShuffleId = window.setInterval(() => {
      renderCourtSlider(activeIndex + 1);
    }, 4200);
  };

  const resetAutoShuffle = () => {
    window.clearInterval(autoShuffleId);
    startAutoShuffle();
  };

  prevButton?.addEventListener("click", () => {
    renderCourtSlider(activeIndex - 1);
    resetAutoShuffle();
  });

  nextButton?.addEventListener("click", () => {
    renderCourtSlider(activeIndex + 1);
    resetAutoShuffle();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      renderCourtSlider(Number(dot.dataset.courtDot));
      resetAutoShuffle();
    });
  });

  courtSlider.addEventListener("mouseenter", () => window.clearInterval(autoShuffleId));
  courtSlider.addEventListener("mouseleave", startAutoShuffle);
  startAutoShuffle();
}
