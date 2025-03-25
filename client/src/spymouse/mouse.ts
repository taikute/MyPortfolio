import spriteUrl from "@/assets/mouse_sprite.png";
import type { Point } from "./types";

class Mouse {
	x = 0;
	y = 0;
	private readonly width = 200;
	private readonly height = 150;
	private readonly totalFrames = 10;
	private readonly frameSpeed = 400; // ms
	private readonly speed = 60; // px/s
	private frameIndex = 0;
	private sprite = new Image();
	private elapsedTime = 0;

	private path: Point[] = [];

	constructor() {
		this.sprite.src = spriteUrl;
	}

	dispose() {
		this.sprite.src = "";
	}

	update(delta: number) {
		this.elapsedTime += delta;
		if (this.elapsedTime >= this.frameSpeed) {
			this.frameIndex = (this.frameIndex + 1) % this.totalFrames;
			this.elapsedTime = 0;
		}
	}

	render(ctx: CanvasRenderingContext2D) {
		if (!this.sprite.complete) return;
		ctx.save();
		ctx.translate(this.x + this.width, this.y);
		ctx.scale(-1, 1);
		ctx.drawImage(this.sprite, this.frameIndex * this.width, 0, this.width, this.height, 0, 0, this.width, this.height);
		ctx.restore();
	}
}

export default Mouse;
