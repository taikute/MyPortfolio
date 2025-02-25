import type { PieceId, RotateType } from "./types";

class Hive {
  private readonly data: Data = initData;

  //#region public
  get rotateType() {
    return this.data.rotateType;
  }
  get placedIds(): { id: PieceId; coord: Coord }[] {
    return Object.entries(this.data.pieces)
      .filter(([_, coord]) => coord !== null)
      .map(([id, coord]) => ({ id: id as PieceId, coord: coord! }));
  }
  get unplaceIds(): { id: PieceId }[] {
    return Object.entries(this.data.pieces)
      .filter(([_, coord]) => coord !== null)
      .map(([id]) => ({ id: id as PieceId }));
  }
  get selectedId() {
    return this.data.selectedId;
  }
  set selectedId(id) {
    this.data.selectedId = id;
  }
  get moves(): Move[] {
    return Object.assign([], this.data.moves);
  }
  get lastMoveFrom(): Coord | null {
    const lastMove = this.data.moves.at(-1);
    return lastMove?.from || null;
  }
  get lastMoveTo(): Coord | null {
    const lastMove = this.data.moves.at(-1);
    return lastMove?.to || null;
  }
  get targets(): Coord[] {
    if (this.selectedId === null) {
      throw new Error("No piece selected");
    }
    // Check turn
    if (this.moves.length === 0) {
      if (this.selectedId[0] === "b") {
        return [];
      }
      return [{ q: 0, r: 0, s: 0 }];
    }
    console.log(this.moves.length);

    if (!this.connectedWithout(this.selectedId)) {
      return [];
    }
    // If split the hive => can't move;
    // If just move => can't move;
    // If can't slide out => can't move;
    // Can move opponent's piece if there's a Pillbug nearby;
    return [];
  }
  get viewBox(): string {
    const placedCoords = Object.entries(this.data.pieces)
      .filter(([_, coord]) => coord !== null)
      .map(([_, coord]) => coord!);
    let left = 0;
    let right = 0;
    let up = 0;
    let down = 0;
    if (this.rotateType === "rotate-flat") {
      placedCoords.forEach((coord) => {
        const q = coord.q;
        if (q < left) left = q;
        if (q > right) right = q;
        const minus = coord.r - coord.s;
        if (minus < up) up = minus;
        if (minus > down) down = minus;
      });
      const x = left * 150 - 100 - 150;
      const y = up * 87 - 87 - 174;
      const width = (right - left + 1) * 150 + 50 + 300;
      const height = (down - up + 1) * 87 + 87 + 174 * 2;
      return `${x} ${y} ${width} ${height}`;
    }
    // ELSE POINTY
    placedCoords.forEach((coord) => {
      const r = coord.r;
      if (r < up) up = r;
      if (r > down) down = r;
      const minus = coord.q - coord.s;
      if (minus < left) left = minus;
      if (minus > right) right = minus;
    });
    const x = left * 87 - 87 - 174;
    const y = up * 150 - 100 - 150;
    const width = (right - left + 1) * 87 + 87 + 174 * 2;
    const height = (down - up + 1) * 150 + 50 + 300;
    return `${x} ${y} ${width} ${height}`;
  }
  swapRotateType() {
    if (this.rotateType === "rotate-flat") {
      this.data.rotateType = "rotate-pointy";
    } else {
      this.data.rotateType = "rotate-flat";
    }
  }
  addMove(targetCoord: Coord) {
    if (this.selectedId === null) {
      throw new Error("No piece selected");
    }
    const pieceCoord = this.data.pieces[this.selectedId];
    this.data.moves.push({ pieceId: this.selectedId, from: pieceCoord, to: targetCoord });
    this.data.pieces[this.selectedId] = targetCoord;
  }
  removeSelectedId() {
    this.data.selectedId = null;
  }
  //#endregion

  private getNeighbors(pieceId: PieceId, excludeId?: PieceId): PieceId[] {
    const coord = this.data.pieces[pieceId];
    if (!coord) {
      throw new Error("Piece is not placed on the board");
    }
    const neighborCoords: Coord[] = [
      { q: coord.q + 1, r: coord.r, s: coord.s - 1 },
      { q: coord.q - 1, r: coord.r, s: coord.s + 1 },
      { q: coord.q, r: coord.r + 1, s: coord.s - 1 },
      { q: coord.q, r: coord.r - 1, s: coord.s + 1 },
      { q: coord.q + 1, r: coord.r - 1, s: coord.s },
      { q: coord.q - 1, r: coord.r + 1, s: coord.s },
    ];
    return Object.entries(this.data.pieces)
      .filter(
        ([id, coord]) =>
          coord !== null &&
          id !== excludeId &&
          neighborCoords.some((n) => n.q === coord.q && n.r === coord.r && n.s === coord.s)
      )
      .map(([id]) => id as PieceId);
  }
  private connectedWithout(excludeId: PieceId): boolean {
    const visited = new Set<PieceId>();
    const pieces = this.placedIds.filter((piece) => piece.id !== excludeId);
    if (pieces.length === 0) return true;
    const stack = [pieces[0].id];
    while (stack.length > 0) {
      const currentId = stack.pop()!;
      if (visited.has(currentId)) continue;
      visited.add(currentId);
      const neighbors = this.getNeighbors(currentId, excludeId);
      for (const id of neighbors) {
        if (!visited.has(id)) {
          stack.push(id);
        }
      }
    }
    return visited.size === pieces.length;
  }

  addRandomMove() {
    this.data.pieces.wA1 = { q: 0, r: 0, s: 0 };
  }
}

export default Hive;

//#region Data
interface Data {
  rotateType: RotateType;
  pieces: Record<PieceId, Coord | null>;
  selectedId: PieceId | null;
  moves: Move[];
}

class Move {
  pieceId: PieceId;
  from: Coord | null;
  to: Coord;

  constructor(pieceId: PieceId, from: Coord | null, to: Coord) {
    this.pieceId = pieceId;
    this.from = from;
    this.to = to;
  }
}

class Coord {
  readonly q: number;
  readonly r: number;
  readonly s: number;
  readonly tX: number;
  readonly tY: number;

  constructor(q: number, r: number, s: number) {
    this.q = q;
    this.r = r;
    this.s = s;
    this.tX = q * 150;
    this.tY = (r - s) * 87;
  }
}

const initData: Data = {
  rotateType: "rotate-flat",
  selectedId: "wA1",
  moves: [],
  pieces: {
    wA1: null,
    wA2: null,
    // wA1: { q: 0, r: 0, s: 0 },
    // wA2: { q: -1, r: 0, s: 1 },
    wA3: null,
    wB1: null,
    wB2: null,
    wG1: null,
    wG2: null,
    wG3: null,
    wL: null,
    wM: null,
    wP: null,
    wQ: null,
    wS1: null,
    wS2: null,

    bA1: null,
    bA2: null,
    bA3: null,
    bB1: null,
    bB2: null,
    bG1: null,
    bG2: null,
    bG3: null,
    bL: null,
    bM: null,
    bP: null,
    bQ: null,
    bS1: null,
    bS2: null,
  },
};
//#endregion

// Test
const hive = new Hive();
console.log(hive.targets);

class GameManager {
  private readonly pieces: Piece[] = [];
  private readonly moves: Move[] = [];

  addPiece(piece: Piece) {
    if (this.pieces.some((p) => p.id === piece.id)) {
      throw new Error("Piece already exists");
    }
    this.pieces.push(piece);
  }

  addMove(move: Move) {
    this.moves.push(move);
  }

  getPieces(): Piece[] {
    return this.pieces.slice();
  }

  getMoves() {
    return this.moves.slice();
  }

  getLastMove() {
    return this.moves.at(-1);
  }

  getTurn(): "w" | "b" {
    return this.moves.length % 2 === 0 ? "w" : "b";
  }

  constructor() {
    this.pieces.push(new Ant("wA1", this), new Ant("wA2", this));
  }
}

abstract class Piece {
  readonly id: PieceId;
  readonly manager: GameManager;
  private coord: Coord | null = null;

  move(target: Coord): void {
    this.coord = target;
    this.manager.addMove(new Move(this.id, this.coord, target));
  }

  constructor(id: PieceId, manager: GameManager) {
    this.id = id;
    this.manager = manager;
    this.manager.addPiece(this);
  }

  getTargets(): Coord[] {
    if (this.justMove() || this.splitHive()) return [];

    const coords: Coord[] = [];
    const turnColor = this.manager.getTurn();
    if (turnColor !== this.id[0]) {
      // if near a pillBug with the same color => can move
      return [];
    }
    coords.push(...this.ownTargets());
    return coords;
  }

  protected abstract ownTargets(): Coord[];

  private justMove(): boolean {
    const lastMove = this.manager.getLastMove();
    return lastMove ? lastMove.pieceId === this.id : false;
  }
  private splitHive(): boolean {
    return false;
  }
}

class Ant extends Piece {
  ownTargets(): Coord[] {
    throw new Error("Method not implemented.");
  }
}

const gameManager = new GameManager();

const initPieces: Piece[] = [new Ant("wA1", gameManager)];

