import { Scene } from "phaser";

export function positionText(scene: Scene, name: string, {
  containerWidth,
  containerHeight,
}: {
  containerWidth: number;
  containerHeight: number;
}) {
  const text = scene.make.text({
    text: "x: -, y: -",
    padding: {
      y: 3 / scene.cameras.main.zoom,
    },
    style: {
      align: "center",
      fixedWidth: containerWidth,
      fixedHeight: containerHeight,
      fontSize: `${10 / scene.cameras.main.zoom}px`,
    },
  });

  return text;
}
