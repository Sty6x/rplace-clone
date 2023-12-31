const contentBg = document.getElementById("content-bg");
const pixelBoard = document.getElementById("pixel-board-container");
const pickedColorDiv = document.getElementById("current-color");
let isMouseDown = false;
let scale = 1;

function translatePixelContainer(e) {
  const pixelBoardStyle = window.getComputedStyle(pixelBoard);
  const matrix = new WebKitCSSMatrix(pixelBoardStyle.transform);
  e.stopPropagation();
  const target = e.target;

  const newMatrix = new DOMMatrix(matrix);
  newMatrix.m41 += e.movementX;
  newMatrix.m42 += e.movementY;
  if (isMouseDown) {
    if (target.classList.contains("cell")) {
      pixelBoard.style.transform = newMatrix.toString();
    }
    pixelBoard.style.transform = newMatrix.toString();
  }
}

function scalePixelContainer(e) {
  const target = e.target;
  console.log(e.deltaY);
  if (!target.id === "chat-box") {
    return;
  }
  if (e.ctrlKey) {
    e.preventDefault();
    scale += e.deltaY * -0.005;
    scale = Math.min(Math.max(0.5, scale), 5);
    pixelBoard.style.transform = `scale(${scale})`;
    return;
  }
}

function currentColorFollowMousePos(e) {
  const target = e.target;
  const mousePos = {
    x: e.clientX,
    y: e.clientY,
  };
  pickedColorDiv.style.top = `${30 + mousePos.y}px`;
  pickedColorDiv.style.left = `${30 + mousePos.x}px`;
}

contentBg.addEventListener("mousedown", (e) => {
  if (e.button === 1) {
    contentBg.style.cursor = "grabbing";
    isMouseDown = true;
  }
});

contentBg.addEventListener("mouseup", (e) => {
  isMouseDown = false;
  contentBg.style.cursor = "default";
});

contentBg.addEventListener(
  "mousemove",
  (e) => {
    translatePixelContainer(e);
    currentColorFollowMousePos(e);
  },
  true
);

contentBg.addEventListener("mouseleave", () => {
  console.log("leave");
  isMouseDown = false;
  contentBg.style.cursor = "default";
});

contentBg.addEventListener("wheel", scalePixelContainer, { passive: false });
