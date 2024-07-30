import { Scene } from "phaser";

export function container(scene: Scene, name: string) {
  const container = scene.make.container({});

  container.width = 100 / scene.cameras.main.zoom;
  container.height = 16 / scene.cameras.main.zoom;
  container.x = scene.cameras.main.centerX - (scene.cameras.main.displayWidth / 2);
  container.y = scene.cameras.main.centerY + (scene.cameras.main.displayHeight / 2) - container.height;
  container.setName(name);
  container.setScrollFactor(0);

  return container;
}
