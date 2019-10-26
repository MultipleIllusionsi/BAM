document.addEventListener("DOMContentLoaded", appInit);

window.onload = function() {
  console.log("got onload");
};

const main = document.querySelector("menu");
const collectionWord = document.querySelector(".collection-word");

function appInit() {
  addTransformToContent();
}

function addTransformToContent() {
  window.onmousemove = function(e) {
    const X = e.clientX;
    const Y = e.clientY;
    main.style.transform = `translate(-${X / 30}px, -${Y / 30}px)`;

    const { dataset, parentNode } = e.target.parentNode;

    if (dataset.title || parentNode.dataset.title) {
      const titleOfSection =
        dataset.title || parentNode.dataset.title;
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
