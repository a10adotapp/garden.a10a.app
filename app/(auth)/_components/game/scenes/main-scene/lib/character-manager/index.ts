import { GameObjects, Scene } from "phaser";
import { FieldManager, FieldManagerState } from "../field-manager";
import { Character } from "../models/character";

export type CharacterManagerState = {
  characters: Character[];
  characterByPosition: {
    [y in number]: {
      [x in number]: Character;
    };
  };
  selectedCharacter: Character | null;
};

export class CharacterManager {
  static Events = {
    STATE_UPDATED: "CharacterManager.stateUpdated",
  };

  scene: Scene;

  layer?: GameObjects.Layer;

  fieldManager: FieldManager;

  state: CharacterManagerState;

  constructor(scene: Scene, fieldManager: FieldManager) {
    this.scene = scene;
    this.fieldManager = fieldManager;

    this.state = {
      characters: [],
      characterByPosition: {},
      selectedCharacter: null,
    };
  }

  init() {
    this.resetState();

    this.layer = this.scene.add.layer();

    this.initCharacters();

    this.scene.events.on(FieldManager.Events.STATE_UPDATED, this.onFieldManagerStateUpdated, this);
  }

  initCharacters() {
    this.state.characters = [
      new Character({
        playerId: "player",
        name: "Arakaki",
        image: "himiko",
        position: {
          x: 50,
          y: 50,
        },
      }),
    ];

    for (const character of this.state.characters) {
      const tile = this.fieldManager.getTile(character.position);

      if (tile) {
        const image = this.scene.add.image(tile.getCenterX(), tile.getCenterY(), character.image);

        this.layer?.add(image);

        if (!this.state.characterByPosition[tile.y]) {
          this.state.characterByPosition[tile.y] = {};
        }

        this.state.characterByPosition[tile.y][tile.x] = character;
      }
    }

    this.scene.events.emit(CharacterManager.Events.STATE_UPDATED, {
      trigger: "initCharacters",
      state: this.state,
    });
  }

  onFieldManagerStateUpdated({
    state,
  }: {
    state: FieldManagerState,
  }) {
    this.state.selectedCharacter = null;

    if (state.selectedTile.current) {
      this.state.selectedCharacter = this.state.characterByPosition[state.selectedTile.current.y]?.[state.selectedTile.current.x];
    }

    this.scene.events.emit(CharacterManager.Events.STATE_UPDATED, {
      trigger: "onFieldManagerStateUpdated",
      state: this.state,
    });
  }

  resetState() {
    this.state = {
      characters: [],
      characterByPosition: {},
      selectedCharacter: null,
    };

    this.scene.events.emit(CharacterManager.Events.STATE_UPDATED, {
      trigger: "resetState",
      state: this.state,
    });
  }
}
