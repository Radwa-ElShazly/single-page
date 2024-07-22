const carousels = document.querySelectorAll("[data-carousel]");

carousels.forEach(function (carousel) {
  const items = Array.from(carousel.querySelectorAll("[data-carousel-item]"));
  const dots = Array.from(carousel.querySelectorAll(".dot"));

  const observer = new IntersectionObserver(onIntersectionObserved, {
    root: carousel,
    rootMargin: "0px",
    threshold: 0.9
  });

  // observe each item
  items.forEach((item) => {
    observer.observe(item);
  });

  function onIntersectionObserved(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const intersectingIndex = items.indexOf(entry.target);
        activateIndicator(intersectingIndex);
      }
    });
  }

  // toggle an `active` class on the dots
  function activateIndicator(index) {
    dots.forEach((dot, i) => {
      dot.toggleAttribute("aria-current", i === index);
    });
  }

  // Handle prev/next controls
  const prev = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");

  if (prev) {
    prev.addEventListener("click", () => {
      if (
        !carousel.querySelector("[data-carousel-nav] > [aria-current]")
          .previousElementSibling
      ) {
        [
          ...carousel.querySelectorAll("[data-carousel-item]:last-child")
        ][0].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest"
        });
      } else {
        carousel
          .querySelector("[data-carousel-nav] > [aria-current]")
          .previousElementSibling.click();
      }
    });
  }

  if (next) {
    next.addEventListener("click", () => {
      if (
        !carousel.querySelector("[data-carousel-nav] > [aria-current]")
          .nextElementSibling
      ) {
        carousel.querySelector("[data-carousel-item]").scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest"
        });
      } else {
        carousel
          .querySelector("[data-carousel-nav] > [aria-current]")
          .nextElementSibling.click();
      }
    });
  }

  // Handle scroll snap dots click event
  dots.forEach(function (dot) {
    dot.addEventListener("click", function (e) {
      e.preventDefault();
      carousel
        .querySelector('[id="' + e.target.hash.replace("#", "") + '"]')
        .scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest"
        });
    });
  });
});