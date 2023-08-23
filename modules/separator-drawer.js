import { convertUnitToPixels } from "./utils.js";
let startY = 0;
export const drawSeparators = (ctx, width, height, distance, measureUnit, ppi, scrollY) => {
    const maxSeparators = Math.floor(25/distance); // max. width (in) / separation distance (in)
    const quantityToAcummulate = width / maxSeparators;

    drawVerticalSeparators(ctx, height, distance, measureUnit, ppi, scrollY);
    drawHorizontalSeparators(ctx, distance, maxSeparators, quantityToAcummulate);
};

const drawHorizontalSeparators = (ctx, distance, maxSeparators, quantityToAcummulate) => {
    // Draw horizontal separators
    let accumulated = quantityToAcummulate;
    let accumulatedOriginal = distance;

    for (let index = 0; index <= maxSeparators; index++) {
        ctx.beginPath();
        ctx.moveTo(accumulated, 0);
        ctx.lineTo(accumulated, 30);
        ctx.stroke();

        ctx.fillText(`${accumulatedOriginal}"`, accumulated - 30, 15);

        accumulated += quantityToAcummulate;
        accumulatedOriginal += distance;
    }
}

const drawVerticalSeparators = (ctx, height, distance, measureUnit, ppi) => {
    const originalDistancePx = convertUnitToPixels(1, measureUnit, ppi);
    const distancePx = parseInt(originalDistancePx * 2);

   const totalSeparatorsY = parseInt(height / distancePx);

    // Draw vertical separators
    let accumulatedY = distancePx + scrollY * distancePx;
    let accumulatedYOriginal = distance;

    for (let index = 0; index <= totalSeparatorsY  ; index++) {
        ctx.beginPath();
        ctx.moveTo(0, accumulatedY);
        ctx.lineTo(30, accumulatedY);
        ctx.stroke();

        ctx.fillText(`${accumulatedYOriginal}"`, 25, accumulatedY + 16);

        accumulatedY += distancePx;
        accumulatedYOriginal += distance;

        if (accumulatedYOriginal >= 100) {
            break; // Stop when we reach 100 inches
        }
    }
}