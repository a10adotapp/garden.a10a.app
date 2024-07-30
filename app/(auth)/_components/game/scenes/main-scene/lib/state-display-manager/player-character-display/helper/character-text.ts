import { Scene } from "phaser";
import { Registry } from "../../../registry";

export function characterText(scene: Scene, name: string, {
  containerWidth,
  containerHeight,
}: {
  containerWidth: number;
  containerHeight: number;
}) {
  const text = scene.make.text({
    padding: {
      x: 4 / scene.cameras.main.zoom,
      y: 4 / scene.cameras.main.zoom,
    },
    style: {
      fixedWidth: containerWidth,
      fixedHeight: containerHeight,
      fontSize: `${10 / scene.cameras.main.zoom}px`,
    },
  });

  const playerCharacter = Registry.getPlayer(scene);

  if (playerCharacter) {
    text.setText([
      playerCharacter.name,
      `VIT: ${playerCharacter.vitality}`,
      `STR: ${playerCharacter.strength}`,
      `AGI: ${playerCharacter.agility}`,
      `LUC: ${playerCharacter.luck}`,
      `~\\(ツ)/~`,
    ]);
  }

  return text;
}
