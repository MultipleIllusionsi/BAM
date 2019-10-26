document.addEventListener("DOMContentLoaded", appInit);

window.onload = function() {
  console.log("got onload");
};

const main = document.querySelector("menu");
const wordWrappers = main.querySelectorAll(".word-wrapper");

function appInit() {
  addTransformToContent();
}

function addTransformToContent() {
  window.onmousemove = function(e) {
    let X = e.clientX;
    let Y = e.clientY;

    main.style.transform = `translate(-${X / 30}px, -${Y / 30}px)`;

    for (const wrapper of wordWrappers) {
      wrapper.style.transform = `translate(-${50 - X / 100}%, -${50 -
        Y / 100}%)`;
    }
  };
}
