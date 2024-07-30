import { GameObjects, Scene } from "phaser";
import { FieldManager, FieldManagerState } from "../field-manager";
import { Character } from "../models/character";
import { Registry } from "../registry";
import { listNonplayer } from "./_actions/list-nonplayer";

export type NonplayersManagerState = {
  characters: Character[];
  selectedCharacter: Character | null;
};

export class NonplayersManager {
  static Events = {
    STATE_UPDATED: "NonPlayersManager.stateUpdated",
  };

  scene: Scene;

  layer!: GameObjects.Layer;

  state: NonplayersManagerState;

  constructor(scene: Scene) {
    this.scene = scene;

    this.state = {
      characters: [],
      selectedCharacter: null,
    };
  }

  init() {
    this.resetState();

    this.layer = this.scene.add.layer();

    this.initCharacters();

    this.scene.events.on(FieldManager.Events.STATE_UPDATED, this.onFieldManagerStateUpdated, this);
  }

  async initCharacters() {
    this.state.characters = await listNonplayer();

    const fieldManager = Registry.getFieldManager(this.scene);

    for (const character of this.state.characters) {
      const tile = fieldManager.getTile(character.position);

      if (tile) {
        const container = this.scene.make.container({
          x: tile.getCenterX(this.scene.cameras.main),
          y: tile.getCenterY(this.scene.cameras.main),
        });

        container.setName("Character.container");

        this.layer?.add(container);

        const image = this.scene.make.image({
          key: character.image,
        });

        container.add(image);
      }
    }

    this.scene.events.emit(NonplayersManager.Events.STATE_UPDATED, {
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
      this.state.selectedCharacter = this.state.characters.find((character) => {
        return (character.position.x === state.selectedTile.current!.x)
          && (character.position.y === state.selectedTile.current!.y);
      }) || null;
    }

    this.scene.events.emit(NonplayersManager.Events.STATE_UPDATED, {
      trigger: "onFieldManagerStateUpdated",
      state: this.state,
    });
  }

  resetState() {
    this.state = {
      characters: [],
      selectedCharacter: null,
    };

    this.scene.events.emit(NonplayersManager.Events.STATE_UPDATED, {
      trigger: "resetState",
      state: this.state,
    });
  }
}
