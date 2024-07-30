import { Input, Scene, Tilemaps } from "phaser";

export type FieldManagerState = {
  selectedTile: {
    prev: Phaser.Tilemaps.Tile | null;
    current: Phaser.Tilemaps.Tile | null;
  };
};

export class FieldManager {
  static Events = {
    STATE_UPDATED: "FieldManager.stateUpdated",
  };

  scene: Scene;

  tilemap!: Tilemaps.Tilemap;

  state: FieldManagerState;

  constructor(scene: Scene) {
    this.scene = scene;

    this.state = {
      selectedTile: {
        prev: null,
        current: null,
      },
    };
  }

  init() {
    this.resetState();

    this.initTilemap();

    this.scene.input.on(Input.Events.POINTER_UP, this.onPointerUp, this);
  }

  initTilemap() {
    this.tilemap = this.scene.make.tilemap({
      data: Array.from({ length: 100 }).map(() => {
        return Array.from({ length: 100 }).map(() => (3));
      }),
      tileWidth: 32,
      tileHeight: 32,
    });

    const tiles = this.tilemap.addTilesetImage("tiles");

    if (tiles) {
      this.tilemap?.createLayer(0, tiles);
    }
  }

  onPointerUp(pointer: Input.Pointer) {
    if (this.tilemap) {
      const tile = this.tilemap.getTileAtWorldXY(pointer.worldX, pointer.worldY);

      if (tile !== this.state.selectedTile.current) {
        this.updateState(tile);
      }
    }
  }

  updateState(tile: Tilemaps.Tile | null) {
    this.state.selectedTile.prev = this.state.selectedTile.current;

    this.state.selectedTile.prev?.setAlpha(1);

    this.state.selectedTile.current = tile;

    this.state.selectedTile.current?.setAlpha(0.5);

    this.scene.events.emit(FieldManager.Events.STATE_UPDATED, {
      trigger: "updateState",
      state: this.state,
    });
  }

  resetState() {
    this.state = {
      selectedTile: {
        prev: null,
        current: null,
      },
    };

    this.scene.events.emit(FieldManager.Events.STATE_UPDATED, {
      trigger: "resetState",
      state: this.state,
    });
  }

  getTile({
    x,
    y,
  }: {
    x: number,
    y: number,
  }): Phaser.Tilemaps.Tile | null {
    return this.tilemap?.getTileAt(x, y) || null;
  }
}
