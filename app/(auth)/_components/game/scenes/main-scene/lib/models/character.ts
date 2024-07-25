
// https://hpgpixer.jp/image_icons/people/icon_ppj_kodai_muromachi.html

export class Character {
  playerId?: string;
  nonplayerId?: string;

  name: string = "";
  image: string = "";

  vitality: number = 0;
  strength: number = 0;
  agility: number = 0;
  luck: number = 0;

  exp: number = 0;

  position: {
    x: number;
    y: number;
  };

  constructor({
    playerId,
    nonplayerId,
    name,
    image,
    position,
  }: {
    playerId?: string;
    nonplayerId?: string;
    name: string;
    image: string;
    position: {
      x: number;
      y: number;
    };
  }) {
    this.playerId = playerId;
    this.nonplayerId = nonplayerId;

    this.name = name;
    this.image = image;

    this.position = position;
  }
}
