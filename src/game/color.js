export class TileColor {
    static getColor(value) {
        const hue = (value * 137.508) % 360;

        const saturationLow = 50;
        const saturationHigh = 100;
        const minValue = 2;
        const maxValue = 2048;
        // Saturation goes from saturationLow to saturationHigh as value goes from minValue to maxValue
        let saturation = (value - minValue) / (maxValue - minValue) * (saturationHigh - saturationLow) + saturationLow;
        saturation = Math.min(saturation, 100);
        
        return `hsl(${hue}, ${saturation}%, 60%)`;
    }
    
}
