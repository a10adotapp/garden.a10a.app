import { Scene } from "phaser";

export class MainScene extends Scene {
  constructor () {
    super("MainScene");
  }

  preload() {
    this.load.image("tiles", "assets/tiles.1.png");
  }

  create () {
    this.add.text(0, 0, "Text 1", {
      fontSize: `10px`,
    });

    this.add.text(0, 20, "Text 2", {
      fontSize: `10px`,
    });
  }
}
