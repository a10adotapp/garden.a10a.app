import { Scene } from "phaser";
import { EventBus } from "../../event-bus";
import { CameraManager } from "./lib/camera-manager";
import { NonplayersManager } from "./lib/character-manager";
import { FieldManager } from "./lib/field-manager";
import { Registry } from "./lib/registry";
import { StateDisplayManager } from "./lib/state-display-manager";

export class MainScene extends Scene {
  cameraManager: CameraManager;

  fieldManager: FieldManager;

  nonplayerManager: NonplayersManager;

  stateDisplayManager: StateDisplayManager;

  constructor () {
    super("MainScene");

    this.cameraManager = new CameraManager(this);

    Registry.setFieldManager(this, new FieldManager(this));
    Registry.setNonplayerManager(this, new NonplayersManager(this));
    Registry.setStateDisplayManager(this, new StateDisplayManager(this));
  }

  preload() {
    this.load.image("tiles", "assets/tiles.1.png");

    this.load.image("himiko", "assets/character.himiko.gif");

    this.load.image("fox", "assets/character.fox.gif");
    this.load.image("koala", "assets/character.koala.gif");
    this.load.image("rabbit", "assets/character.rabbit.gif");
  }

  create () {
    this.cameraManager.init();

    Registry.getFieldManager(this)?.init();
    Registry.getNonplayersManager(this)?.init();
    Registry.getStateDisplayManager(this)?.init();

    EventBus.emit("current-scene-ready", this);
  }

  update(time: number, delta: number) {
  }
}
