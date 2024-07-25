import { GameObjects, Scene } from "phaser";
import { CharacterManager, CharacterManagerState } from "../character-manager";
import { FieldManager, FieldManagerState } from "../field-manager";
import { SelectedCharacterDisplay } from "./selected-character-display";
import { SelectedTileDisplay } from "./selected-tile-display";

export class StateDisplayManager {
  scene: Scene;

  layer?: GameObjects.Layer;

  selectedTileDisplay: SelectedTileDisplay;

  selectedCharacterDisplay: SelectedCharacterDisplay;

  constructor(scene: Scene) {
    this.scene = scene;

    this.selectedTileDisplay = new SelectedTileDisplay(scene);

    this.selectedCharacterDisplay = new SelectedCharacterDisplay(scene);
  }

  init() {
    this.layer = this.scene.add.layer();

    this.selectedTileDisplay.init(this.layer);

    this.selectedCharacterDisplay.init(this.layer);

    this.scene.events.on(FieldManager.Events.STATE_UPDATED, this.onFieldManagerStateUpdated, this);
    this.scene.events.on(CharacterManager.Events.STATE_UPDATED, this.onCharacterManagerStateUpdated, this);
  }

  onFieldManagerStateUpdated({
    trigger,
    state,
  }: {
    trigger: string;
    state: FieldManagerState;
  }) {
    console.log({arguments});
    this.selectedTileDisplay.updateText(state.selectedTile.current);
  }

  onCharacterManagerStateUpdated({
    trigger,
    state,
  }: {
    trigger: string;
    state: CharacterManagerState;
  }) {
    this.selectedCharacterDisplay.updateText(state.selectedCharacter);
  }
}
