export const drawImages = (files = [], ctx, canvasWidth, height, inchInPixels = 0.0) => {
    let actualX = 0, actualY = 0, maxY = 0;

    if (files != null && files.length > 0) {
        files.forEach(file => {
            const image = file.image;
            const scale = file.scale;

            const imageWidth = image.width * scale;
            const imageHeight = image.height * scale;

            ctx.drawImage(image, actualX, actualY, imageWidth, imageHeight);

            const coordinates = nextCoordinates(actualX, actualY, canvasWidth, imageWidth, imageHeight, maxY);
            actualX = coordinates.x;
            actualY = coordinates.y;
            maxY = coordinates.maxY;

            // Calcula inches reales de la imagen
            const horizontalInches = (imageWidth / inchInPixels).toFixed(2);
            const verticalInches = (imageHeight / inchInPixels).toFixed(2);

            file.widthInches = parseFloat(horizontalInches);
            file.heightInches = parseFloat(verticalInches);
        });
    }

};

const nextCoordinates = (actualX = 0, actualY = 0, canvasWidth = 0, imageW, imageH, maxY) => {
    const margin = 5;
    const adjustedCanvasWidth = canvasWidth - 120;

    let newX = actualX + margin + imageW;
    let newY = actualY;
    let newMaxY = maxY;

    if (newX <= adjustedCanvasWidth) {
        // Se mantiene en el mismo renglon porque cabe
    } else if (actualX === 0 && newX > adjustedCanvasWidth) {
        // Para dispositivos chicos, se pasa a nuevo renglon
        newX = 0;
        newY += imageH + margin;
    } else if (newX > adjustedCanvasWidth) {
        // Se pasa a nuevo renglon en x = 0
        newX = 0;
        newY += newMaxY + margin;
    }

    // Definir maxima altura, basado en la altura de imagen y Y actual
    if ((imageH + newY) > maxY) newMaxY = (imageH + newY);

    return {
        x: newX,
        y: newY,
        maxY: newMaxY,
    };
}