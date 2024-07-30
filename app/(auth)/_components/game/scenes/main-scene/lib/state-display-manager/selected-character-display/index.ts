import { GameObjects, Scene } from "phaser";
import { Character } from "../../models/character";
import { helper } from "./helper";

export class SelectedCharacterDisplay {
  scene: Scene;

  text?: GameObjects.Text;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  init(layer: GameObjects.Layer) {
    const container = helper.container(this.scene, "SelectedCharacterDisplay.container");

    layer.add(container);

    const background = helper.background(this.scene, "SelectedCharacterDisplay.background", {
      containerWidth: container.width,
      containerHeight: container.height,
    });

    container.add(background);

    this.text = helper.characterText(this.scene, "SelectedCharacterDisplay.positionText", {
      containerWidth: container.width,
      containerHeight: container.height,
    });

    container.add(this.text);
  }

  updateText(selectedCharacter: Character | null) {
    if (selectedCharacter) {
      this.text?.setText([
        selectedCharacter.name,
        `VIT: ${selectedCharacter.vitality}`,
        `STR: ${selectedCharacter.strength}`,
        `AGI: ${selectedCharacter.agility}`,
        `LUC: ${selectedCharacter.luck}`,
        `~\\(ツ)/~`,
      ]);
    } else {
      this.text?.setText([]);
    }
  }
}
