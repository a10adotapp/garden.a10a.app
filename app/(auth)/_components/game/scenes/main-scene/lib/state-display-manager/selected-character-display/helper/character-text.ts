import { Scene } from "phaser";

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

  return text;
}
