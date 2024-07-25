import { Scene } from "phaser";
import { EventBus } from "../../event-bus";
import { CameraManager } from "./lib/camera-manager";
import { CharacterManager } from "./lib/character-manager";
import { FieldManager } from "./lib/field-manager";
import { StateDisplayManager } from "./lib/state-display-manager";

export class MainScene extends Scene {
  cameraManager: CameraManager;

  fieldManager: FieldManager;

  characterManager: CharacterManager;

  stateDisplayManager: StateDisplayManager;

  constructor () {
    super("MainScene");

    this.cameraManager = new CameraManager(this);

    this.fieldManager = new FieldManager(this);

    this.characterManager = new CharacterManager(this, this.fieldManager);

    this.stateDisplayManager = new StateDisplayManager(this);
  }

  preload() {
    this.load.image("tiles", "assets/tiles.1.png");
    this.load.image("himiko", "assets/character.himiko.gif");
  }

  create () {
    this.cameraManager.init();

    this.fieldManager.init();

    this.characterManager.init();

    this.stateDisplayManager.init();

    EventBus.emit("current-scene-ready", this);
  }

  update(time: number, delta: number) {
  }
}
