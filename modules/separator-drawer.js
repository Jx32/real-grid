import { convertUnitToPixels } from "./utils.js";

export const drawSeparators = (ctx, width, height, distance, measureUnit, ppi) => {
    const maxSeparators = Math.floor(25/distance); // max. width (in) / separation distance (in)
    const quantityToAcummulate = width / maxSeparators;

    //drawVerticalSeparators(ctx, height, distance, measureUnit, ppi, resizeRatio);
    drawHorizontalSeparators(ctx, distance, maxSeparators, quantityToAcummulate);
};

const drawHorizontalSeparators = (ctx, distance, maxSeparators, quantityToAcummulate) => {
    // Draw horizontal separators
    let accumulated = quantityToAcummulate;
    let accumulatedOriginal = distance;

    for (let index = 0; index <= maxSeparators; index++) {
        ctx.beginPath();
        ctx.moveTo(accumulated, 0);
        ctx.lineTo(accumulated, 20);
        ctx.stroke();

        ctx.fillText(`${accumulatedOriginal}"`, accumulated - 30, 15);

        accumulated += quantityToAcummulate;
        accumulatedOriginal += distance;
    }
}

const drawVerticalSeparators = (ctx, height, distance, measureUnit, ppi) => {
    const originalDistancePx = convertUnitToPixels(distance, measureUnit, ppi);
    const distancePx = parseInt(originalDistancePx * 1);

    const totalSeparatorsY = parseInt(height / distancePx);

    // Draw vertical separators
    let accumulatedY = distancePx;
    let accumulatedYOriginal = distance;

    for (let index = 0; index <= totalSeparatorsY; index++) {
        ctx.beginPath();
        ctx.moveTo(0, accumulatedY);
        ctx.lineTo(20, accumulatedY);
        ctx.stroke();

        ctx.fillText(`${accumulatedYOriginal}"`, 25, accumulatedY + 5);

        accumulatedY += distancePx;
        accumulatedYOriginal += distance;
    }
}