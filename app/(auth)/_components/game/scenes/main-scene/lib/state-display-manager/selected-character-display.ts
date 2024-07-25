import { GameObjects, Scene } from "phaser";
import { Character } from "../models/character";

export class SelectedCharacterDisplay {
  scene: Scene;

  text?: GameObjects.Text;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  init(layer: GameObjects.Layer) {
    const containerWidth = 1000 / this.scene.cameras.main.zoom;
    const containerHeight = 200 / this.scene.cameras.main.zoom;
    const x = this.scene.cameras.main.centerX + (this.scene.cameras.main.displayWidth / 2) - containerWidth;
    const y = this.scene.cameras.main.centerY + (this.scene.cameras.main.displayHeight / 2) - containerHeight;

    const container = (() => {
      const container = this.scene.add.container(x, y)
        .setName("SelectedCharacterDisplay");

      container.setScrollFactor(0);

      return container;
    })();

    this.text = (() => {
      const text = this.scene.add.text(0, 0, [
        "a10a",
        "VIT: 0",
      ], {
        fixedWidth: containerWidth,
        fixedHeight: containerHeight,
        fontSize: `${100 / this.scene.cameras.main.zoom}px`,
      });

      return text;
    })();

    container.add(this.text);

    layer.add(container);
  }

  updateText(selectedCharacter: Character | null) {
    if (selectedCharacter) {
      this.text?.setText([
        selectedCharacter.name,
        `VIT: ${selectedCharacter.vitality}`,
      ]);
    } else {
      this.text?.setText([]);
    }
  }
}
