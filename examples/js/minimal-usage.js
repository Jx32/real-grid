import { RealGrid } from "../../real-grid.js";

let canvasHtmlObject;
let realGrid;
let storedImages = [];

window.onload = () => {
    // Get the canvas object from DOM
    canvasHtmlObject = document.getElementsByTagName("canvas").item(0);
    
    // Fire resizing event to adjust canvas
    resizeCanvas(canvasHtmlObject);

    // Instance the options for Real Grid instance
    const options = {
        measureUnit: "in", // Measure unit will be Inches when rendering canvas
        canvasHtmlObject: canvasHtmlObject,
        separationDistance: 2.5, // Indicates separator lines distance
        addingImageCallbackFn: imageRenderingCallback,
        canvaLookOptions: {
            separator: {
                lineWidth: 3,
                strokeStyle: "red",
                fillStyle: "red"
            }
        },
        ppi: 96 // For web is 96, mobile devices TBD
    };

    // Initialize grid
    realGrid = new RealGrid(options);

    // Add listeners
    document.getElementById("image").addEventListener("change", onFileUpload);
    document.getElementById("deleteImageBtn").addEventListener("click", () => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
    
        // Clear the canvas 
        realGrid.files.forEach(imageData => {
            ctx.clearRect(imageData.x, imageData.y, imageData.width, imageData.height);
        });
        
        //Clear the array
        realGrid.files.length = 0;
        if (realGrid.files.length === 0) {
            document.getElementById("deleteImageBtn").style.display = "none"; // Hide the delete button
        }
        //redraw the grid
        realGrid.refreshGrid();
    });
    
}

const resizeCanvas = canvas => {
    // Update canva width/height taking window dimensions
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight + 1000;

    // Update on-screen metrics
    document.getElementById("widthLbl").innerText = canvas.width;
    document.getElementById("heightLbl").innerText = canvas.height;
}

const imageRenderingCallback = event => {}

const onFileUpload = async event => {
    const files = await getFileArrayFromEvent(event.target.files);
    
    if (files != null && files.length > 0) {
        realGrid.drawImages(files);
        document.getElementById("deleteImageBtn").style.display = "block"; // Show the delete button
    }
}

/*
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let startY = 0;

canvas.addEventListener("wheel", (event) => {
    startY -= event.deltaY / 20; // Ajusta la velocidad de desplazamiento según sea necesario
    startY = Math.min(startY, 0);
    canvas.style.transform = `translateY(${startY}px)`;
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    realGrid.refreshGrid();
});
*/

const getFileArrayFromEvent = files => {
    return new Promise((resolve, reject) => {
        let imagesArray = [];

        for (let index = 1; index <= files.length; index++) {
            const file = files[index-1];
            const fr = new FileReader;
            
            fr.onload = () => {
                const img = new Image;
    
                img.onload = () => {
                    file.image = img;
                    file.scale = 0.5; // Define escala inicial
                    imagesArray.push(file);

                    if (imagesArray.length === files.length) {
                        resolve(imagesArray);
                    }
                }
    
                img.src = fr.result;
            }
    
            fr.readAsDataURL(file);
        }
    });
}