"use client";

import { useScreenSize } from "@/contexts/screen-size-context";
import { CANVAS, Game as PhaserGame, Scale } from "phaser";
import { useEffect, useRef } from "react";
import { MainScene } from "./scenes/main-scene";

export function Game() {
  const game = useRef<Phaser.Game | null>(null);

  const screenSize = useScreenSize();

  useEffect(() => {
    if ((game.current === null) && screenSize) {
      const aspectRatio = screenSize.width / screenSize.height;

      game.current = new PhaserGame({
        parent: "game-container",
        // If AUTO, it doesn't work on smartphone browser
        // type: AUTO,
        type: CANVAS,
        width: 320,
        height: 320 / (aspectRatio),
        scale: {
          mode: Scale.ScaleModes.FIT,
        },
        backgroundColor: "#028af8",
        scene: [
          MainScene,
        ],
        input: {
          activePointers: 2,
        },
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
  }, [screenSize]);

  return (
    <div id="game-container"></div>
  );
}

export default Game;
