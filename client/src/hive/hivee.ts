import Hex from "@/models/hex";
import { HexWidth, MidHeight, HexHeight } from "@/hive/hexConstants";

interface Hive {}

class Hive implements Hive {
  private _rotate: string = "flat";
  private _pieces: Map<string, Piece>;
  private _selected: string | null = null;
  private _moves: string[] = [];

  setSelected(id: string) {
    this._selected = id;
  }

  removeSelected() {
    this._selected = null;
  }

  swapRotate() {
    if (this.rotate === "flat") {
      this._rotate = "pointy";
    } else {
      this._rotate = "flat";
    }
  }

  setHex(id: string, q: number, r: number, s: number) {
    this.getPieceById(id).hex = new Hex(q, r, s);
  }

  get rotate() {
    return this._rotate;
  }

  get pieces() {
    return this._pieces;
  }

  get selected() {
    return this._selected;
  }

  get viewBox() {
    let left = Infinity;
    let right = -Infinity;
    let up = Infinity;
    let down = -Infinity;
    if (this.rotate === "flat") {
      this.pieces.forEach((p) => {
        const q = p.hex.q;
        if (q < left) left = q;
        if (q > right) right = q;
        const minus = p.hex.r - p.hex.s;
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
        const minus = p.hex.q - p.hex.s;
        if (minus < left) left = minus;
        if (minus > right) right = minus;
        const r = p.hex.r;
        if (r < up) up = r;
        if (r > down) down = r;
      });
      const x = left * MidHeight - HexHeight * 1.5;
      const y = up * HexWidth * 0.75 - HexWidth * 1.25;
      const width = (right - left + 1) * MidHeight + HexHeight * 2.5;
      const height = (down - up + 1) * HexWidth * 0.75 + HexWidth * 1.75;
      return `${x} ${y} ${width} ${height}`;
    }
  }

  get targets(): Hex[] {
    if (this.selected === null) {
      throw new Error("Piece not selected yet!");
    }
    const piece = this.getPieceById(this.selected);
    const neighbors = this.getNeighbors(this.selected, piece.hex);
    // If split the hive => can't move;
    // If just move => can't move;
    // If can't slide out => can't move;
    // Can move opponent's piece if there's a Pillbug nearby;
    return [];
  }

  private getPieceById(id: string) {
    const piece = this._pieces.get(id);
    if (!piece) {
      throw new Error("Piece not exists!");
    }
    return piece;
  }

  private exists(hex: Hex) {
    this.pieces.forEach(() => {});
  }

  private getNeighbors(id: string, hex: Hex): Hex[] {
    const directions = [
      [1, -1, 0],
      [1, 0, -1],
      [0, 1, -1],
      [-1, 1, 0],
      [-1, 0, 1],
      [0, -1, 1],
    ];

    return [];
  }

  constructor() {
    this._pieces = Piece.init();
  }
}

class Piece {
  // <<w b>> <<A B G L M P Q S>> <<1 2 3 null>>
  hex: Hex;
  inBattle: boolean;

  constructor(q: number, r: number, s: number, inBattle: boolean = false) {
    this.hex = new Hex(q, r, s);
    this.inBattle = inBattle;
  }

  static init() {
    const pieces = new Map<string, Piece>();
    pieces.set("wA1", new Piece(0, 0, 0));
    pieces.set("wA2", new Piece(1, -1, 0));
    pieces.set("wA3", new Piece(1, 0, -1));
    pieces.set("wB1", new Piece(-1, 1, 0));
    pieces.set("wB2", new Piece(-1, 0, 1));
    pieces.set("wG1", new Piece(0, 1, -1));
    pieces.set("wG2", new Piece(0, -1, 1));
    pieces.set("wG3", new Piece(-2, 0, 2));
    pieces.set("wL", new Piece(-2, 1, 1));
    pieces.set("wM", new Piece(-2, 2, 0));
    pieces.set("wP", new Piece(-1, -1, 2));
    pieces.set("wQ", new Piece(-1, 2, -1));
    pieces.set("wS1", new Piece(0, -2, 2));
    pieces.set("wS2", new Piece(0, 2, -2));

    pieces.set("bA1", new Piece(1, -2, 1));
    pieces.set("bA2", new Piece(1, 1, -2));
    pieces.set("bA3", new Piece(2, -2, 0));
    pieces.set("bB1", new Piece(2, -1, -1));
    pieces.set("bB2", new Piece(2, 0, -2));
    // pieces.set("bG1", new Piece(0, 1, -1));
    // pieces.set("bG2", new Piece(0, -1, 1));
    // pieces.set("bG3", new Piece(2, -1, -1));
    // pieces.set("bL", new Piece(2, -2, 0));
    // pieces.set("bM", new Piece(2, 0, -2));
    // pieces.set("bP", new Piece(-2, 1, 1));
    // pieces.set("bQ", new Piece(-2, 2, 0));
    // pieces.set("bS1", new Piece(-2, 0, 2));
    // pieces.set("bS2", new Piece(-1, 2, -1));
    return pieces;
  }
}

export default Hive;
