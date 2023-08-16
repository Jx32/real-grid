import { convertUnitToPixels } from "./utils.js";

const minimalSeparators = 10;

export const drawSeparators = (ctx, width, height, distance, measureUnit, ppi, resizeRatio = 1) => {
        

        const originalDistancePx = convertUnitToPixels(distance, measureUnit, ppi);
        const distancePx = parseInt(originalDistancePx * resizeRatio);
        
        const totalSeparatorsX = parseInt(width / distancePx);
        const totalSeparatorsY = parseInt(height / distancePx);

        console.log(totalSeparatorsX, width)

        // Set the stroke color to red
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";

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
        // Draw vertical separators
        let accumulatedY = distancePx;
        let accumulatedYOriginal = originalDistancePx;
        for (let index = 0; index <= totalSeparatorsY; index++) {
            ctx.beginPath();
            ctx.moveTo(0, accumulatedY);
            ctx.lineTo(20, accumulatedY);
            ctx.stroke();
    
            ctx.fillText(`${accumulatedYOriginal} ${measureUnit}`, 30, accumulatedY + 5);
    
            accumulatedY += distancePx;
            accumulatedYOriginal += originalDistancePx;
        }
};