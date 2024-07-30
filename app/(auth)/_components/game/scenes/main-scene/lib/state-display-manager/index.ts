import { GameObjects, Scene } from "phaser";
import { NonplayersManager, NonplayersManagerState } from "../character-manager";
import { FieldManager, FieldManagerState } from "../field-manager";
import { Character } from "../models/character";
import { Registry } from "../registry";
import { PlayerCharacterDisplay } from "./player-character-display";
import { SelectedCharacterDisplay } from "./selected-character-display";
import { SelectedTileDisplay } from "./selected-tile-display";

export class StateDisplayManager {
  scene: Scene;

  layer?: GameObjects.Layer;

  selectedTileDisplay: SelectedTileDisplay;

  playerCharacterDisplay: PlayerCharacterDisplay;

  selectedCharacterDisplay: SelectedCharacterDisplay;

  constructor(scene: Scene) {
    this.scene = scene;

    this.selectedTileDisplay = new SelectedTileDisplay(scene);

    this.playerCharacterDisplay = new PlayerCharacterDisplay(scene);

    this.selectedCharacterDisplay = new SelectedCharacterDisplay(scene);
  }

  init() {
    this.layer = this.scene.add.layer();

    this.selectedTileDisplay.init(this.layer);

    this.playerCharacterDisplay.init(this.layer);

    this.selectedCharacterDisplay.init(this.layer);

    this.scene.events.on(Registry.Events.PLAYER_SET, this.onRegistryPlayerSet, this);
    this.scene.events.on(FieldManager.Events.STATE_UPDATED, this.onFieldManagerStateUpdated, this);
    this.scene.events.on(NonplayersManager.Events.STATE_UPDATED, this.onCharacterManagerStateUpdated, this);
  }

  onRegistryPlayerSet({
    player,
  }: {
    player: Character;
  }) {
    this.playerCharacterDisplay.updateText(player);
  }

  onFieldManagerStateUpdated({
    trigger,
    state,
  }: {
    trigger: string;
    state: FieldManagerState;
  }) {
    this.selectedTileDisplay.updateText(state.selectedTile.current);
  }

  onCharacterManagerStateUpdated({
    trigger,
    state,
  }: {
    trigger: string;
    state: NonplayersManagerState;
  }) {
    this.selectedCharacterDisplay.updateText(state.selectedCharacter);
  }
}
