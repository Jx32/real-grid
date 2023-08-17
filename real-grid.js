import { MeasureUnit } from "./modules/enums.js";
import { drawImages } from "./modules/image-drawer.js";
import { drawSeparators } from "./modules/separator-drawer.js";

export class GridImage {
    file;
    originalWidth;
    originalHeight;
}

export class RealGrid {
    canvasHtmlObject;
    context;
    measureUnit = MeasureUnit.INCHES;
    separationDistance = 0.0;
    files = [];
    ppi = 0;
    
    addingImageCallbackFn; // Callback called every an image is rendered

    /**
     * Initialize grid.
     * 
     * @param {Object} options Real grid options
     */
    constructor(options) {
        this.measureUnit = options.measureUnit;
        this.separationDistance = options.separationDistance;
        this.canvasHtmlObject = options.canvasHtmlObject;
        this.context = this.canvasHtmlObject.getContext("2d");
        this.ppi = options.ppi || 96;

        if (options.addingImageCallbackFn) {
            this.addingImageCallbackFn = options.addingImageCallbackFn;
        }

        this.initializeCanvaLook(options.canvaLookOptions);
        this.refreshGrid();
    }

    initializeCanvaLook(canvaLookOptions) {
        if (!canvaLookOptions) {
            canvaLookOptions = {separator: {}};
        }

        this.context.lineWidth = canvaLookOptions.separator.lineWidth || 5;
        this.context.strokeStyle = canvaLookOptions.separator.strokeStyle || "#ff0000";
        this.context.font = canvaLookOptions.separator.font || "14px Arial";
        this.context.fillStyle = canvaLookOptions.separator.fillStyle || "red";
    }

    clearGrid() {
        this.context.clearRect(0, 0, this.canvasHtmlObject.width, this.canvasHtmlObject.height);
    }

    refreshGrid() {
        this.clearGrid();

        const width = this.canvasHtmlObject.width;
        const height = this.canvasHtmlObject.height;
        const images = this.files.map(file => file.image);

        drawImages(images, this.context, width, height);
        
        drawSeparators(
            this.context, 
            width, 
            height, 
            this.separationDistance, 
            this.measureUnit,
            this.ppi);
    }

    drawImages(files = []) {
        this.files = files;
        this.refreshGrid();
    }

    /* Getter's and setter's */
    getImages() {
        return this.images;
    }
}