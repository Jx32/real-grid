import { drawImages } from "./modules/image-drawer.js";
import { drawSeparators } from "./modules/separator-drawer.js";

export class RealGrid {
    canvasHtmlObject;
    context;
    separationDistance = 0.0;
    files = [];
    ppi = 0;

    inchInPixels = 0.0; // Indica cuantos pixeles = 1 inch

    /**
     * Initialize grid.
     * 
     * @param {Object} options Real grid options
     */
    constructor(options) {
        this.separationDistance = options.separationDistance;
        this.canvasHtmlObject = options.canvasHtmlObject;
        this.context = this.canvasHtmlObject.getContext("2d");
        this.ppi = options.ppi || 96;

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

        const maxSeparators = Math.floor(25/this.separationDistance); // max. width (in) / separation distance (in)
        const quantityToAcummulate = width / maxSeparators;
        this.inchInPixels = quantityToAcummulate / this.separationDistance;

        drawImages(this.files, this.context, width, height, this.inchInPixels);
        
        this.inchInPixels = drawSeparators(
            this.context, 
            this.separationDistance,
            quantityToAcummulate,
            maxSeparators);
    }

    drawImages(files = []) {
        this.files = files;
        this.refreshGrid();
    }
}