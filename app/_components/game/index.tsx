"use client";

import { CANVAS, Game as PhaserGame, Scale } from "phaser";
import { useEffect, useRef } from "react";
import { MainScene } from "./scenes/main-scene";

export function Game() {
  const game = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (game.current === null) {
      game.current = new PhaserGame({
        parent: "game-container",
        // If AUTO, it doesn't work on smartphone browser
        type: CANVAS,
        width: 100,
        height: 100,
        scale: {
          mode: Scale.ScaleModes.FIT,
        },
        backgroundColor: "#028af8",
        scene: [
          MainScene,
        ],
      });
    }

    return () => {
      if (game.current) {
        game.current.destroy(true);
        
        if (game.current !== null) {
          game.current = null;
        }
      }
    }
  }, []);

  return (
    <div id="game-container"></div>
  );
}

export default Game;
