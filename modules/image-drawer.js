export const drawImages = (files = [], ctx, canvasWidth, height, inchInPixels = 0.0) => {
    let actualX = 0, actualY = 0, maxY = 0, maxX = 0, margin = 5;
    let lastImageW = 0;
    let firstDraw = true;

    if (files != null && files.length > 0) {
        files.forEach(file => {
            const image = file.image;
            const scale = file.scale;

            const imageWidth = image.width * scale;
            const imageHeight = image.height * scale;

            if (!firstDraw) {
                const coordinates = nextCoordinates(actualX, actualY, canvasWidth, 
                                                imageWidth, imageHeight, maxY, maxX,
                                                margin, lastImageW);
                actualX = coordinates.x;
                actualY = coordinates.y;
                maxY = coordinates.maxY;
                maxX = coordinates.maxX;
            }

            ctx.drawImage(image, actualX, actualY, imageWidth, imageHeight);

            // First draw doesn't calculate next coordinates
            if (firstDraw) {
                firstDraw = false;
                maxY = imageHeight + margin;
                maxX = imageWidth + margin;
            }

            lastImageW = imageWidth;

            // Calcula inches reales de la imagen
            const horizontalInches = (imageWidth / inchInPixels).toFixed(2);
            const verticalInches = (imageHeight / inchInPixels).toFixed(2);

            file.widthInches = parseFloat(horizontalInches);
            file.heightInches = parseFloat(verticalInches);
        });

        return {
            actualCanvaHeight: maxY,
            actualCanvaWidth: maxX,
        };
    }

};

const nextCoordinates = (actualX = 0, actualY = 0, canvasWidth = 0, imageW, imageH, maxY, maxX, margin = 5, lastImageW = 0) => {
    let newX = actualX;
    let newY = actualY;
    let newMaxY = maxY;
    let newMaxX = maxX;

    if ((newX + margin + imageW + lastImageW) > canvasWidth) {
        // Se pasa a nuevo renglon en x = 0
        newX = 0;
        newY = newMaxY;
    } else if ((newX + margin + imageW + lastImageW) <= canvasWidth) {
        // Se mantiene en el mismo renglon porque cabe
        newX += margin + lastImageW;
    }

    // Definir maxima altura, basado en la altura de imagen y Y actual
    if ((newY + imageH + margin) > maxY) {
        newMaxY = newY + imageH + margin;
        //console.log(`New max Y: ${newY} + ${imageH} + ${margin} = ${newMaxY} (actualY + imageH + margin)`);
    }

    // Define maxima anchura
    if (newX + imageW > maxX) {
        newMaxX = newX + imageW;
    }

    return {
        x: newX,
        y: newY,
        maxY: newMaxY,
        maxX: newMaxX
    };
}