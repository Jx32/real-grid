export const drawSeparators = (ctx, distance, scrollY, quantityToAcummulate, maxSeparators) => {
    drawHorizontalSeparators(ctx, distance, maxSeparators, quantityToAcummulate);
    drawVerticalSeparators(ctx, quantityToAcummulate, distance);
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

const drawVerticalSeparators = (ctx, quantityToAcummulate, distance, maxSeparators = 100) => {
    // Draw horizontal separators
    let accumulated = quantityToAcummulate;
    let accumulatedOriginal = distance;

    for (let index = 0; index <= maxSeparators; index++) {
        ctx.beginPath();
        ctx.moveTo(0, accumulated);
        ctx.lineTo(30, accumulated);
        ctx.stroke();

        ctx.fillText(`${accumulatedOriginal}"`, 5, accumulated - 5);

        accumulated += quantityToAcummulate;
        accumulatedOriginal += distance;
    }
}