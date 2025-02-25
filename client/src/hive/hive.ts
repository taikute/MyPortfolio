import type { PieceColor, PieceId } from "./types";

class Coord {
  readonly id: string;
  readonly tX: number;
  readonly tY: number;
  constructor(readonly q: number, readonly r: number, readonly s: number) {
    this.id = `${q},${r},${s}`;
    this.tX = q * 150;
    this.tY = (r - s) * 87;
  }
}

class Piece {
  private hex: Hex | null = null;
  readonly color: PieceColor;
  constructor(readonly id: PieceId) {
    this.color = id[0] as PieceColor;
  }
  get coord() {
    return this.hex ? this.hex.coord : null;
  }

  updateHex(newHex: Hex): boolean {
    if (this.hex !== null && !this.hex.remove(this)) {
      return false;
    }
    this.hex = newHex;
    this.hex.add(this);
    return true;
  }

  splitHive() {
    return false;
  }

  underStack(): boolean {
    return !this.hex || this.hex.stack.at(-1) === this;
  }

  nearPillbug() {}
}

class Hex {
  private readonly _stack: Piece[] = [];
  constructor(readonly coord: Coord) {}

  get stack() {
    return this._stack.slice();
  }

  get topId() {
    return;
  }

  /**DO NOT USE*/
  add(piece: Piece) {
    this._stack.push(piece);
  }

  /**DO NOT USE*/
  remove(piece: Piece): boolean {
    if (piece === this._stack.at(-1)) {
      this._stack.pop();
      return true;
    }
    return false;
  }
}

const hex = new Hex(new Coord(0, 0, 0));

interface Move {
  pieceId: PieceId;
  from: Coord | null;
  to: Coord;
}

class Hive {
  selected: PieceId | null = null;
  private readonly hexById: Record<string, Hex> = {};
  private readonly pieceById: Record<PieceId, Piece> = initPieces;
  private readonly moves: Move[] = [];

  get curColor(): PieceColor {
    return this.moves.length % 2 === 0 ? "w" : "b";
  }

  get pieceView() {
    return Object.values(this.hexById).slice();
  }

  get pieces() {
    return Object.values(this.pieceById).slice();
  }

  get coords() {
    return this.pieceView.map((h) => h.coord).slice();
  }

  move(target: Coord) {
    if (!this.selected) {
      throw new Error("No piece selected");
    }
    if (!(target.id in this.hexById)) {
      this.hexById[target.id] = new Hex(target);
    }
    const piece = this.pieceById[this.selected];
    // Add move and move piece
    if (!piece.updateHex(this.hexById[target.id])) {
      throw new Error("Can't move piece");
    }
    this.moves.push({ pieceId: this.selected, from: piece.coord, to: target });
  }

  get targets(): Coord[] {
    if (this.selected === null) return [];
    const piece = this.pieceById[this.selected];
    const lastMove = this.moves.at(-1);
    const isFriendly = piece.color !== this.curColor;
    // First move
    if (!lastMove) {
      if (!isFriendly) return [];
      return [new Coord(0, 0, 0)];
    }

    if (this.moves.length <= 7) {
    }
    if (piece.coord === null) {
      // Put
      return [];
    }

    // Just move => can't move
    if (lastMove.pieceId === this.selected) return [];
    if (!isFriendly) {
    }
    // No queen => can't move
    if (piece.coord !== null && this.pieceById[(piece.color + "Q") as PieceId].coord === null) return [];
    // Under stack => can't move
    if (piece.coord)
      if (piece.splitHive())
        // Split hive => can't move
        return [];
    if (!isFriendly) {
      // Can't put enemy piece
      if (piece.coord === null) return [];
      // Friendly PillBug nearby => can move enemy piece
      // ...
      return [];
    }
    // Return put coords
    if (piece.coord === null) return [];
    // Return move targets
    return [];
  }

  private splitHive(piece: Piece) {
    return false;
  }

  private getNeighbors(piece: Piece, hexes: Hex[]): Piece[] {
    return [];
  }
}

const initPieces: Record<PieceId, Piece> = {
  wA1: new Piece("wA1"),
  wA2: new Piece("wA2"),
  wA3: new Piece("wA3"),
  wB1: new Piece("wB1"),
  wB2: new Piece("wB2"),
  wG1: new Piece("wG1"),
  wG2: new Piece("wG2"),
  wG3: new Piece("wG3"),
  wL: new Piece("wL"),
  wM: new Piece("wM"),
  wP: new Piece("wP"),
  wQ: new Piece("wQ"),
  wS1: new Piece("wS1"),
  wS2: new Piece("wS2"),
  bA1: new Piece("bA1"),
  bA2: new Piece("bA2"),
  bA3: new Piece("bA3"),
  bB1: new Piece("bB1"),
  bB2: new Piece("bB2"),
  bG1: new Piece("bG1"),
  bG2: new Piece("bG2"),
  bG3: new Piece("bG3"),
  bL: new Piece("bL"),
  bM: new Piece("bM"),
  bP: new Piece("bP"),
  bQ: new Piece("bQ"),
  bS1: new Piece("bS1"),
  bS2: new Piece("bS2"),
};

export default Hive;
