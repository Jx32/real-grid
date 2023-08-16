import { RealGrid } from "../../real-grid.js";

let canvasHtmlObject;
let realGrid;

window.onload = () => {
    // Get the canvas object from DOM
    canvasHtmlObject = document.getElementsByTagName("canvas").item(0);

    // Fire resizing event to adjust canvas
    resizeCanvas(canvasHtmlObject);

    // Instance the options for Real Grid instance
    const options = {
        measureUnit: "in", // Measure unit will be Inches when rendering canvas
        canvasHtmlObject: canvasHtmlObject,
        separationDistance: 9.5, // Indicates separator lines distance
        addingImageCallbackFn: imageRenderingCallback,
        canvaLookOptions: {
            separator: {
                lineWidth: 2,
                strokeStyle: "black",
                fillStyle: "black"
            }
        },
        ppi: 96 // For web is 96, mobile devices TBD
    };

    // Initialize grid
    realGrid = new RealGrid(options);
}

window.onresize = () => resizeCanvas(canvasHtmlObject);

const resizeCanvas = canvas => {
    // Update canva width/height taking window dimensions
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 100;

    // Update on-screen metrics
    document.getElementById("widthLbl").innerText = canvas.width;
    document.getElementById("heightLbl").innerText = canvas.height;
}

const imageRenderingCallback = event => {
    console.log(event);
}