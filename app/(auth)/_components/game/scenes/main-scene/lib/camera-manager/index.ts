import { Input, Scene } from "phaser";

export class CameraManager {
  scene: Scene;

  isTappingDown = false;

  prevPosition?: {
    x: number;
    y: number;
  };

  constructor(scene: Scene) {
    this.scene = scene;
  }

  init() {
    this.scene.cameras.main.zoom = 1;

    const { x, y } = this.scene.cameras.main.getScroll(1600 + 16, 1600 + 16);

    this.scene.cameras.main.setScroll(x, y);

    this.scene.input.on(Input.Events.POINTER_DOWN, this.onPointerDown, this);
    this.scene.input.on(Input.Events.POINTER_UP, this.onPointerUp, this);
    this.scene.input.on(Input.Events.POINTER_MOVE, this.onPointerMove, this);
  }

  onPointerDown() {
    this.isTappingDown = true;
  }

  onPointerUp() {
    this.isTappingDown = false;
    this.prevPosition = undefined;
  }

  onPointerMove(pointer: Input.Pointer) {
    if (this.isTappingDown) {
      if (this.prevPosition) {
        this.scene.cameras.main.scrollX -= (pointer.x - this.prevPosition.x) / this.scene.cameras.main.zoom;
        this.scene.cameras.main.scrollY -= (pointer.y - this.prevPosition.y) / this.scene.cameras.main.zoom;
      }

      this.prevPosition = {
        x: pointer.x,
        y: pointer.y,
      };
    }
  }
}
