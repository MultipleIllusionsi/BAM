(function() {
  document.addEventListener("DOMContentLoaded", appInit);

  const main = document.querySelector("main");
  const collectionWord = document.querySelector(".collection-word");
  const preloader = document.querySelector(".preloader");

  const isTouchDevice = () => {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {
      return false;
    }
  };

  function appInit() {
    initPreloader();
    if (isTouchDevice() === false) {
      addTransformToContent();
    }
  }

  function initPreloader() {
    preloader.addEventListener("click", deletePreloadOnMouseClick);
    window.addEventListener("keydown", deletePreloadOnKeyClick);
    window.addEventListener("scroll", deletePreloadOnScroll);
  }

  function deletePreloadOnMouseClick() {
    preloader.style.opacity = 0;

    setTimeout(() => {
      preloader.remove();
    }, 500);

    preloader.removeEventListener("click", deletePreloadOnMouseClick);
  }

  function deletePreloadOnScroll() {
    if (window.scrollY > 295) {
      preloader.style.opacity = 0;

      setTimeout(() => {
        preloader.remove();
      }, 500);

      window.removeEventListener("scroll", deletePreloadOnScroll);
    }
  }

  function deletePreloadOnKeyClick(event) {
    if (event) {
      preloader.style.opacity = 0;
      setTimeout(() => {
        preloader.remove();
      }, 500);

      window.removeEventListener("keydown", deletePreloadOnKeyClick);
    }
  }

  function addTransformToContent() {
    window.onmousemove = function(e) {
      const X = e.clientX;
      const Y = e.clientY;
      main.style.transform = `translate(-${X / 30}px, -${Y / 30}px)`;

      const { dataset } = e.target;

      if (dataset.title) {
        const titleOfSection = dataset.title;
        collectionWord.innerHTML = titleOfSection;
      } else {
        collectionWord.innerHTML = "";
      }

      collectionWord.style.transform = `translate(-${50 -
        X / 200}%, -${50 - Y / 200}%)`;
    }.throttle(30);
  }

  /////// throttle
  Function.prototype.throttle = function(milliseconds, context) {
    const baseFunction = this;
    const limit = milliseconds;
    let lastEventTimestamp = null;

    return function() {
      const self = context || this;
      const args = arguments;
      const now = Date.now();

      if (!lastEventTimestamp || now - lastEventTimestamp >= limit) {
        lastEventTimestamp = now;
        baseFunction.apply(self, args);
      }
    };
  };
})();
