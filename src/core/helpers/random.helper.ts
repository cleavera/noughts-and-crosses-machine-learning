export function $random(upperLimit: number, lowerLimit: number = 0): number {
    return Math.floor((Math.random() * ((++upperLimit) - lowerLimit)) + lowerLimit);
}
