const canvas = document.querySelector("#js-canvas");
const colors = document.querySelectorAll(".color");
const ctx = canvas.getContext('2d');
const range = document.querySelector(".js-range");
const mode = document.querySelector("#js-fill");
const save = document.querySelector("#js-save");

let painting = false;

const INITIAL_COLOR = "#2c2c2c";
ctx.lineWidth = 2.5;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

// canvas를 js로 다루기 때문에 이 element에도 지정해줘야한다.
canvas.width = 600;
canvas.height = 600;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        // console.log("creating path in ", x, y);
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        //마우스를 움직이는 내내 발생
        // console.log("creating line in ", x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleRangeClick(event) {
    const stroke = event.target.value;
    ctx.lineWidth = stroke;
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor
    ctx.strokeStyle = color;

    ctx.fillStyle = color;
}

function handleModeClick(event) {
    if (mode.innerHTML === "Fill") {
        mode.innerHTML = "Paint";
    } else {
        mode.innerHTML = "Fill";
    }
}

function handleCanvasClick(event) {
    if (mode.innerHTML === "Fill") {
        // ctx.fillStyle은 handleColorClick에서 지정해줬음.
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function saveCanvasClick(event) {
    const image = canvas.toDataURL("image/jpeg"); // default값은 png
    const link = document.createElement("a");
    link.href = image; //다운로드할 형식
    link.download = "PaintJS[EXPORT]" //다운로드될 이름
    link.click();
}

function handleCM(event) {
    event.preventDefault();
}

function init() {
    if (canvas) {
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave", stopPainting);
        canvas.addEventListener("click", handleCanvasClick);
        canvas.addEventListener("contextmenu", handleCM) //마우스 우클릭에 관한 이벤트
    }
    if (colors) {
        colors.forEach(color => color.addEventListener("click", handleColorClick));
    }

    if (range) {
        range.addEventListener("input", handleRangeClick);
    }

    if (mode) {
        mode.addEventListener("click", handleModeClick);
    }

    if (save) {
        save.addEventListener("click", saveCanvasClick);
    }
}

init();