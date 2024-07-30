import { GameObjects, Scene } from "phaser";
import { Character } from "../../models/character";
import { helper } from "./helper";

export class PlayerCharacterDisplay {
  scene: Scene;

  text?: GameObjects.Text;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  init(layer: GameObjects.Layer) {
    const container = helper.container(this.scene, "PlayerCharacterDisplay.container");

    layer.add(container);

    const background = helper.background(this.scene, "PlayerCharacterDisplay.background", {
      containerWidth: container.width,
      containerHeight: container.height,
    });

    container.add(background);

    this.text = helper.characterText(this.scene, "PlayerCharacterDisplay.characterText", {
      containerWidth: container.width,
      containerHeight: container.height,
    });

    container.add(this.text);
  }

  updateText(playerCharacter: Character | null) {
    if (playerCharacter) {
      this.text?.setText([
        playerCharacter.name,
        `VIT: ${playerCharacter.vitality}`,
        `STR: ${playerCharacter.strength}`,
        `AGI: ${playerCharacter.agility}`,
        `LUC: ${playerCharacter.luck}`,
        `~\\(ツ)/~`,
      ]);
    } else {
      this.text?.setText([]);
    }
  }
}
