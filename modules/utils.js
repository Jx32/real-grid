import { MeasureUnit } from "./enums.js";

export const convertUnitToPixels = (number, unit, ppi = 96) => {
    if (unit === MeasureUnit.INCHES) {
        return number * ppi;
    } else {
        throw new Error("Unsupported conversion unit");
    }
};