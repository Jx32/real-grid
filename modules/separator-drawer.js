import { convertUnitToPixels } from "./utils.js";

const minimalSeparators = 10;

export const drawSeparators = (ctx, width, height, distance, measureUnit, ppi, resizeRatio = 1) => {
        

        const originalDistancePx = convertUnitToPixels(distance, measureUnit, ppi);
        const distancePx = parseInt(originalDistancePx * resizeRatio);
        
        const totalSeparatorsX = parseInt(width / distancePx);
        const totalSeparatorsY = parseInt(height / distancePx);

        console.log(totalSeparatorsX, width)

        // Draw horizontal separators
        let accumulatedX = distancePx;
        let accumulatedXOriginal = originalDistancePx;
        for (let index = 0; index <= totalSeparatorsX; index++) {
            console.log(accumulatedX)

            ctx.beginPath();
            ctx.moveTo(accumulatedX, 0);
            ctx.lineTo(accumulatedX, 20);
            ctx.stroke();
            
            ctx.fillText(`${accumulatedXOriginal} ${measureUnit}`, accumulatedX - 25, 40);

            accumulatedX += distancePx;
            accumulatedXOriginal += originalDistancePx;
        }
};