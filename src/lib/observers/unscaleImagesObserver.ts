const unscaleImagesObserverOptions = {
  rootMargin: "100px",
  threshold: 0.5,
};

const unscaleImagesObserverCallback = (
  entries: IntersectionObserverEntry[],
) => {
  entries.forEach((entry) => {
    const entryTarget = entry.target as HTMLElement;
    if (!entryTarget) return;
    const unscaleTo = entryTarget.dataset.unscaleTo ?? 1;
    if (entry.isIntersecting) {
      entryTarget.style.transform = `scale(${unscaleTo})`;
      return;
    }
    entryTarget.style.transform = "";
  });
};

const unscaleImagesObserver = new IntersectionObserver(
  unscaleImagesObserverCallback,
  unscaleImagesObserverOptions,
);
const imagesToUnscale = document.querySelectorAll(
  "img[data-id='unscale-image']",
);
imagesToUnscale.forEach((image) => {
  unscaleImagesObserver.observe(image);
});
