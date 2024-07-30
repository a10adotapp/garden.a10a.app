"use server";

import { Character } from "../../models/character";

export async function listNonplayer(): Promise<Character[]> {
  try {
    return [
      {
        nonplayerId: "nonplayer-1",
        name: "Rabbit",
        image: "rabbit",
        vitality: 1,
        strength: 1,
        agility: 1,
        luck: 1,
        exp: 1,
        position: {
          x: 49,
          y: 49,
        },
      },
      {
        nonplayerId: "nonplayer-2",
        name: "Koala",
        image: "koala",
        vitality: 1,
        strength: 2,
        agility: 1,
        luck: 1,
        exp: 1,
        position: {
          x: 49,
          y: 50,
        },
      },
      {
        nonplayerId: "nonplayer-2",
        name: "Koala",
        image: "koala",
        vitality: 1,
        strength: 2,
        agility: 1,
        luck: 1,
        exp: 1,
        position: {
          x: 49,
          y: 50,
        },
      },
      {
        nonplayerId: "nonplayer-3",
        name: "Fox",
        image: "fox",
        vitality: 1,
        strength: 1,
        agility: 2,
        luck: 1,
        exp: 1,
        position: {
          x: 49,
          y: 51,
        },
      },
    ];
  } catch (err) {
    throw new Error("failed to list nonplayer");
  }
}
