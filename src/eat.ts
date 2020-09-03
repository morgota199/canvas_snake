export interface IEat {
    x: number,
    y: number,
    rad: number
}

export class Eat {
    count: number = Math.floor(Math.random() * 100) + 1
    eat: IEat[] = []

    constructor() {
        for(let i = 0; i < this.count; i++) {
            this.eat.push(this.generator())
        }
    }

    generator() {
        return {
            x: Math.floor(Math.random() * window.innerWidth) + 1,
            y: Math.floor(Math.random() * window.innerHeight) + 1,
            rad: 10 + Math.floor(Math.random() * (30 - 10 + 1)),
        }
    }

    randomBetween (min: number, max: number) {
        return min + Math.floor(Math.random() * (max - min + 1))
    }

    draw(canvas: CanvasRenderingContext2D) {
        for(const eat of this.eat) {
            const r = this.randomBetween(0, 255);
            const g = this.randomBetween(0, 255);
            const b = this.randomBetween(0, 255);
            const rgb = `rgb(${r},${g},${b})`;

            canvas.beginPath();
            canvas.fillStyle = rgb
            canvas.arc(eat.x, eat.y, eat.rad, 0,2 * Math.PI )
            canvas.fill()
            canvas.stroke()
        }
    }

    update(canvas: CanvasRenderingContext2D) {
        this.draw(canvas)
    }
}