import { Scene } from "phaser";
import { NonplayersManager } from "../character-manager";
import { FieldManager } from "../field-manager";
import { Character } from "../models/character";
import { StateDisplayManager } from "../state-display-manager";

export class Registry {
  static Events = {
    PLAYER_SET: "Registry.playerSet",
  };

  static setPlayer(scene: Scene, character: Character) {
    scene.registry.set("player", character);

    scene.events.emit(Registry.Events.PLAYER_SET, {
      player: character,
    });
  }

  static getPlayer(scene: Scene): (Character | null) {
    const player = scene.registry.get("player");

    if (player instanceof Character) {
      return player;
    }

    return null;
  }

  static setFieldManager(scene: Scene, fieldManager: FieldManager) {
    scene.registry.set("fieldManager", fieldManager);
  }

  static getFieldManager(scene: Scene): FieldManager {
    const fieldManager = scene.registry.get("fieldManager");

    if (fieldManager instanceof FieldManager) {
      return fieldManager;
    }

    throw new Error("failed to get field manager");
  }

  static setNonplayerManager(scene: Scene, nonplayerManager: NonplayersManager) {
    scene.registry.set("nonplayerManager", nonplayerManager);
  }

  static getNonplayersManager(scene: Scene): NonplayersManager {
    const nonplayerManager = scene.registry.get("nonplayerManager");

    if (nonplayerManager instanceof NonplayersManager) {
      return nonplayerManager;
    }

    throw new Error("failed to get nonplayer manager");
  }

  static setStateDisplayManager(scene: Scene, stateDisplayManager: StateDisplayManager) {
    scene.registry.set("stateDisplayManager", stateDisplayManager);
  }

  static getStateDisplayManager(scene: Scene): StateDisplayManager {
    const stateDisplayManager = scene.registry.get("stateDisplayManager");

    if (stateDisplayManager instanceof StateDisplayManager) {
      return stateDisplayManager;
    }

    throw new Error("failed to get state display manager");
  }
}
