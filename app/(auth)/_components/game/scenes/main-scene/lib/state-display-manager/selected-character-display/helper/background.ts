import { Scene } from "phaser";

export function background(scene: Scene, name: string, {
  containerWidth,
  containerHeight,
}: {
  containerWidth: number;
  containerHeight: number;
}) {
  const graphics = scene.make.graphics();

  graphics.fillStyle(0x000000, 0.5);
  graphics.lineStyle(0, 0x000000, 0);
  graphics.fillRect(0, 0, containerWidth, containerHeight);

  const borderWidth = 1 / scene.cameras.main.zoom;
  const borderRectX = 1 / scene.cameras.main.zoom;
  const borderRectY = 1 / scene.cameras.main.zoom;

  const borderRectWidth = containerWidth - (borderRectX * 2);
  const borderRectHeight = containerHeight - (borderRectY * 2);

  graphics.fillStyle(0x000000, 0);
  graphics.lineStyle(borderWidth, 0xffffff, 1);
  graphics.strokeRect(borderRectX, borderRectY, borderRectWidth, borderRectHeight);

  return graphics
}
