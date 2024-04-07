export class TileColor {
    static getColor(value) {
        const colorsPerHueCycle = 5;
        let index = Math.floor(Math.log2(value));
        index %= colorsPerHueCycle;
        // const hue = ((value << 4) * 137.508) % 360;
        const hue = (index / colorsPerHueCycle) * 360;
        const hueNoise = ((value << 7) % 100) / 100 * 2 * 90 / colorsPerHueCycle - 90 / colorsPerHueCycle;// Some noise from within the allowed range based on colrosPerHueCycle

        const saturationLow = 50;
        const saturationHigh = 100;
        const minValue = 2;
        const maxValue = 2048;
        // Saturation goes from saturationLow to saturationHigh as value goes from minValue to maxValue
        let saturation = (value - minValue) / (maxValue - minValue) * (saturationHigh - saturationLow) + saturationLow;
        saturation = Math.min(saturation, 100);
        
        return `hsl(${hue+hueNoise}, ${saturation}%, 60%)`;
    }
    
}
