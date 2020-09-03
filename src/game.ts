import {IBlock, Snake} from "./snake";
import {Eat, IEat} from "./eat";

export class Game {
    private game_over: boolean = false
    private eat: Eat = new Eat()
    private snake: Snake = new Snake()
    private map: CanvasRenderingContext2D
    private canvas: HTMLCanvasElement


    constructor() {
        this.canvas = document.getElementsByTagName("canvas")[0];
        this.map = this.canvas.getContext("2d")!
    }


    loop() {
        this.clear()
        this.update()

        requestAnimationFrame(this.loop.bind(this))
    }

    clear() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.map.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    update () {
        this.eat.update(this.map)
        this.snake.update(this.map)
        this.check_eat()
        this.is_game_over()
    }

    check_eat() {
        const snake_head: IBlock = this.snake.body[0]
        let new_eat: IEat[] = []
        let eaters: IEat[] = []
        for(const peath of this.eat.eat) {
            if(
                (peath.x + peath.rad) > snake_head.x && (peath.x - peath.rad) < snake_head.x
            &&
                (peath.y + peath.rad) > snake_head.y && (peath.y - peath.rad) < snake_head.y
            ) {
                eaters.push(peath)
                continue
            }

            new_eat.push(peath)
        }

        let sum_add = 0

        for(const eat of eaters)
            sum_add += eat.rad

        if(sum_add % 5) {
            while (sum_add > 0) {
                const new_block: IBlock = {
                    x: -1,
                    y: -1,
                    rad: 5
                }

                this.snake.body.push(new_block)
                sum_add -= 5
            }
        }
        this.eat.eat = new_eat
    }

    is_game_over () {
        if(this.eat.eat.length === 0){
            this.game_over = true
            alert("GAME OVER")
        }
    }
}