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
}

const resizeCanvas = canvas => {
    // Update canva width/height taking window dimensions
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 150;

    // Update on-screen metrics
    document.getElementById("widthLbl").innerText = canvas.width;
    document.getElementById("heightLbl").innerText = canvas.height;
}

const imageRenderingCallback = event => {}

const onFileUpload = async event => {
    const files = await getFileArrayFromEvent(event.target.files);
    realGrid.drawImages(files);
}

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
                    imagesArray.push(file);

                    if (index === files.length) {
                        resolve(imagesArray);
                    }
                }
    
                img.src = fr.result;
            }
    
            fr.readAsDataURL(file);
        }
    });
}