const HexWidth = 200;
const HexHeight = 173;
const MidHeight = 87;

// const points = "100,0 50,87 -50,87 -100,0 -50,-87 50,-87";
const points = "98,0 48,85 -48,85 -98,0 -48,-85 48,-85";

class Hive {
  rotate: string = "0";
  pieces: Piece[] = [];
  selected: string | null = null;
  moves: string[] = [];

  constructor() {
    this.pieces = Piece.init();
  }

  get targets(): Hex[] {
    if (!this.selected) {
      console.error("Piece not selected yet!");
      return [];
    }
    const piece = this.pieces.find((p) => p.id === this.selected);
    if (!piece) {
      console.error("Can't find piece!");
      return [];
    }
    // If split the hive => can't move;
    // If just move => can't move;
    // If can't slide out => can't move;
    // Can move oppoment's piece if there's a Pillbug nearby;
    return [];
  }

  get viewBox() {
    let left = Infinity;
    let right = -Infinity;
    let up = Infinity;
    let down = -Infinity;
    if (this.rotate == "flat") {
      this.pieces.forEach((p) => {
        const x = p.hex.x;
        if (x < left) left = x;
        if (x > right) right = x;
        const minus = p.hex.y - p.hex.z;
        if (minus < up) up = minus;
        if (minus > down) down = minus;
      });
      const x = left * HexWidth * 0.75 - HexWidth * 1.25;
      const y = up * MidHeight - HexHeight * 1.5;
      const width = (right - left + 1) * HexWidth * 0.75 + HexWidth * 1.75;
      const height = (down - up + 1) * MidHeight + HexHeight * 2.5;
      return `${x} ${y} ${width} ${height}`;
    }
    // pointy
    else {
      this.pieces.forEach((p) => {
        const minus = p.hex.x - p.hex.z;
        if (minus < left) left = minus;
        if (minus > right) right = minus;
        const y = p.hex.y;
        if (y < up) up = y;
        if (y > down) down = y;
      });
      const x = left * MidHeight - HexHeight * 1.5;
      const y = up * HexWidth * 0.75 - HexWidth * 1.25;
      const width = (right - left + 1) * MidHeight + HexHeight * 2.5;
      const height = (down - up + 1) * HexWidth * 0.75 + HexWidth * 1.75;
      return `${x} ${y} ${width} ${height}`;
    }
  }
}

class Piece {
  id: string; // <<w b>> <<A B G L M P Q S>> <<1 2 3 null>>
  hex: Hex;
  inBattle: boolean;

  constructor(id: string, hex: Hex, inBattle: boolean = false) {
    this.id = id;
    this.hex = hex;
    this.inBattle = inBattle;
  }

  static init(): Piece[] {
    return [
      new Piece("wA1", new Hex(0, 0, 0)),
      new Piece("wA2", new Hex(1, -1, 0)),
      new Piece("wA3", new Hex(1, 0, -1)),
      new Piece("wB1", new Hex(-1, 1, 0)),
      new Piece("wB2", new Hex(-1, 0, 1)),
      new Piece("wG1", new Hex(0, 1, -1)),
      new Piece("wG2", new Hex(0, -1, 1)),
      new Piece("wG3", new Hex(2, 0, -2)),
      new Piece("wL", new Hex(3, 0, -3)),
      new Piece("wM", new Hex(3, 1, -4)),
      // new Piece("wP", new Hex(0, 0, 0)),
      // new Piece("wQ", new Hex(0, 0, 0)),
      // new Piece("wS1", new Hex(0, 0, 0)),
      // new Piece("wS2", new Hex(0, 0, 0)),
      // new Piece("wA3", new Hex(0, 0, 0)),
    ];
  }
}

class Hex {
  x: number;
  y: number;
  z: number;
  tX: number;
  tY: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.tX = x * HexWidth * 0.75;
    this.tY = (y - z) * MidHeight;
  }

  compare(hex: Hex): boolean {
    return this.x === hex.x && this.y === hex.y && this.z === hex.z;
  }
}

export default Hive;
export { points };
