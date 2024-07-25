"use client";

import dynamic from "next/dynamic";

const Game = dynamic(() => import("./_components/game"), { ssr: false });

export default function Page() {
  return (
    <main>
      <Game />
    </main>
  );
}
