import { GameObjects, Scene, Tilemaps } from "phaser";

export class SelectedTileDisplay {
  scene: Scene;

  text?: GameObjects.Text;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  init(layer: GameObjects.Layer) {
    const containerWidth = 1000 / this.scene.cameras.main.zoom;
    const containerHeight = 200 / this.scene.cameras.main.zoom;
    const x = this.scene.cameras.main.centerX - (this.scene.cameras.main.displayWidth / 2);
    const y = this.scene.cameras.main.centerY + (this.scene.cameras.main.displayHeight / 2) - containerHeight;

    const container = (() => {
      const container = this.scene.add.container(x, y)
        .setName("SelectedTileDisplay");

      container.setScrollFactor(0);

      return container;
    })();

    this.text = (() => {
      const text = this.scene.add.text(0, 0, "x: -, y: -", {
        padding: {
          y: 50 / this.scene.cameras.main.zoom,
        },
        align: "center",
        fixedWidth: containerWidth,
        fixedHeight: containerHeight,
        fontSize: `${100 / this.scene.cameras.main.zoom}px`,
        lineSpacing: 0,
      });

      return text;
    })();

    container.add(this.text);

    layer.add(container);
  }

  updateText(selectedTile: Tilemaps.Tile | null) {
    if (selectedTile) {
      this.text?.setText(`x: ${selectedTile.x}, y: ${selectedTile.y}`);
    } else {
      this.text?.setText("x: -, y: -");
    }
  }
}
