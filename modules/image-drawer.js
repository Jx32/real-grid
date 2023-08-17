import { MeasureUnit } from "./enums.js";
import { convertUnitToPixels } from "./utils.js";

export const drawImages = (images = [], ctx, width, height) => {
    images.forEach(image => {
        const scale = 1;
        const x = 0;
        const y = 0;
        const realWidth = convertUnitToPixels(image.width, MeasureUnit.INCHES, 96);
        const realHeight = convertUnitToPixels(image.height, MeasureUnit.INCHES, 96);
        const width = image.width * scale;
        const height = image.height * scale;

        ctx.drawImage(image, x, y, width, height);
    });
};