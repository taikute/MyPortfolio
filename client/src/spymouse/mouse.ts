import spriteUrl from "@/assets/mouse_sprite.png";
class Mouse {
	sprite: HTMLImageElement;
	constructor() {
		this.sprite = new Image();
		this.sprite.src = spriteUrl;
	}
}
