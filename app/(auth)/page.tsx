"use client";

import { ScreenSizeContextProvider } from "@/contexts/screen-size-context";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const Game = dynamic(() => import("./_components/game"), { ssr: false });

export default function Page() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const mainSceneUpdateEventHandler = (event: Event & {
      detail?: {
        log: string;
      };
    }) => {
      if (textareaRef.current) {
        textareaRef.current.value += (event.detail?.log || "") + "\n";
      }
    };

    window.addEventListener("MainScene.update", mainSceneUpdateEventHandler);

    return () => {
      window.removeEventListener("MainScene.update", mainSceneUpdateEventHandler);
    };
  }, []);

  return (
    <main>
      <ScreenSizeContextProvider>
        <Game />
      </ScreenSizeContextProvider>

      <textarea ref={textareaRef} rows={10} style={{
        width: "100%",
      }} />
    </main>
  );
}
