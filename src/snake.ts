enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

export interface IBlock {
    x: number
    y: number
    rad: number
}

export class Snake {
    private start_x: number = Math.floor(Math.random() * window.innerWidth) + 1
    private start_y: number = Math.floor(Math.random() * window.innerHeight) + 1
    private dir: boolean[] = [false, false, false, false]
    private direction: {x: number, y: number} = {x: 0, y: 0}
    private gravitation: number = 0.9
    private speed: number = 7
    body: IBlock[] = [
        {x: this.start_x, y: this.start_y, rad: 7},
        {x: this.start_x - 5, y: this.start_y, rad: 5},
        {x: this.start_x - 10, y: this.start_y, rad: 5},
        {x: this.start_x - 15, y: this.start_y, rad: 5},
        {x: this.start_x - 20, y: this.start_y, rad: 5},
        {x: this.start_x - 25, y: this.start_y, rad: 5},
        {x: this.start_x - 30, y: this.start_y, rad: 5},
        {x: this.start_x - 35, y: this.start_y, rad: 5},
        {x: this.start_x - 40, y: this.start_y, rad: 5},
        {x: this.start_x - 45, y: this.start_y, rad: 5},
        {x: this.start_x - 50, y: this.start_y, rad: 5}
    ]

    constructor() {
        this.key_down()
        this.key_up()
    }

    draw(canvas: CanvasRenderingContext2D) {
        for(const block of this.body) {
            canvas.beginPath();
            canvas.fillStyle = "#000000"
            canvas.arc(block.x, block.y, block.rad, 0,2 * Math.PI )
            canvas.fill()
            canvas.stroke()
        }
    }

    update(canvas: CanvasRenderingContext2D) {
        this.move()
        this.draw(canvas)
    }

    key_down() {
        window.addEventListener("keydown", (event: KeyboardEvent) => {
            if(event.key === "ArrowUp")    this.dir[Direction.UP]    = true
            if(event.key === "ArrowDown")  this.dir[Direction.DOWN]  = true
            if(event.key === "ArrowLeft")  this.dir[Direction.LEFT]  = true
            if(event.key === "ArrowRight") this.dir[Direction.RIGHT] = true
        })
    }

    key_up() {
        window.addEventListener("keyup", (event: KeyboardEvent) => {
            if(event.key === "ArrowUp")    this.dir[Direction.UP]    = false
            if(event.key === "ArrowDown")  this.dir[Direction.DOWN]  = false
            if(event.key === "ArrowLeft")  this.dir[Direction.LEFT]  = false
            if(event.key === "ArrowRight") this.dir[Direction.RIGHT] = false
        })
    }

    move() {
        if(this.dir[Direction.UP]) this.direction.y = -1
        if(this.dir[Direction.DOWN]) this.direction.y = 1
        if(this.dir[Direction.LEFT]) this.direction.x = -1
        if(this.dir[Direction.RIGHT]) this.direction.x = 1

        if(!this.dir.some((d: boolean) => d === true))
            return

        this.direction.x *= this.gravitation
        this.direction.y *= this.gravitation

        const head_block: IBlock = {
            x: this.body[0].x + this.direction.x * this.speed,
            y: this.body[0].y + this.direction.y * this.speed,
            rad: 7
        }

        this.body.pop()
        this.body.unshift(head_block)
        this.body.map((block: IBlock) => block.rad = 5)
        this.body[0].rad = 7
    }
}