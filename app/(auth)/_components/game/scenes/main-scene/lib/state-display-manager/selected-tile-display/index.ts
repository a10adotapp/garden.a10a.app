import { GameObjects, Scene, Tilemaps } from "phaser";
import { helper } from "./helper";

export class SelectedTileDisplay {
  scene: Scene;

  text?: GameObjects.Text;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  init(layer: GameObjects.Layer) {
    const container = helper.container(this.scene, "SelectedTileDisplay.container");

    layer.add(container);

    const background = helper.background(this.scene, "SelectedTileDisplay.background", {
      containerWidth: container.width,
      containerHeight: container.height,
    });

    container.add(background);

    this.text = helper.positionText(this.scene, "SelectedTileDisplay.positionText", {
      containerWidth: container.width,
      containerHeight: container.height,
    });

    container.add(this.text);
  }

  updateText(selectedTile: Tilemaps.Tile | null) {
    if (selectedTile) {
      this.text?.setText(`x: ${selectedTile.x}, y: ${selectedTile.y}`);
    } else {
      this.text?.setText("x: -, y: -");
    }
  }
}
