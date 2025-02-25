import type { Color, PieceId } from "./types";

abstract class Piece {
  readonly id: PieceId;
  private layer: number = 1;

  get color(): Color {
    return this.id[0] as Color;
  }

  constructor(id: PieceId) {
    this.id = id;
  }

  abstract getTargets(pieces: PieceRecord): Coord[];
}

type PieceRecord = Record<PieceId, Piece>;

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

class Hex {
  readonly coord: Coord;
  readonly stack: PieceId[];
  constructor(coord: Coord, pieceId: PieceId) {
    this.coord = coord;
    this.stack = [pieceId];
  }

  get id() {
    return this.coord.id;
  }
}

class Coord {
  readonly id: string;
  constructor(readonly q: number, readonly r: number, readonly s: number) {
    if (q + r + s !== 0) {
      throw new Error("Invalid coordinates: q + r + s must equal 0");
    }
    this.id = `${q},${r},${s}`;
  }
}

class Hive {
  private readonly hexs: Map<string, Hex> = new Map();
  move(move: Move) {
    // remove piece from
    {
      if (move.from !== null) {
        const id = move.from.id;
        const hex = this.hexs.get(id);
        if (!hex) {
          throw new Error("Hex should be exists");
        }
        hex.stack.pop();
        if (hex.stack.length === 0) {
          this.hexs.delete(id);
        }
      }
    }
    // Add piece to
    {
      const id = move.to.id;
      const hex = this.hexs.get(id);
      if (hex) {
        hex.stack.push(move.pieceId);
      } else {
        this.hexs.set(id, new Hex(move.to, move.pieceId));
      }
    }
  }
}

// class Hive {
//   selected: PieceId | null = null;
//   private readonly pieces: PieceRecord = { wA1: new Ant("wA1") };
//   private readonly moves: Move[] = [];

//   getTurnColor(): Color {
//     return this.moves.length % 2 === 0 ? "w" : "b";
//   }

//   getTargets() {
//     if (this.selected === null) {
//       throw new Error("No piece selected");
//     }
//     const piece = this.pieces[this.selected];
//     // First move
//     if (this.moves.length === 0) {
//       if (piece.color === "w") {
//         return [new Coord(0, 0, 0)];
//       }
//       return [];
//     }
//     // Next move
//     const lastMove = this.moves.at(-1)!;
//     const turnColor = this.getTurnColor();
//     // If piece just move => can't move
//     if (lastMove.pieceId === this.selected) {
//       return [];
//     }
//     // If piece move split the hive => can't move

//     const coords: Coord[] = [];
//   }

//   move(pieceId: PieceId, from: Coord | null, to: Coord) {
//     mo;
//   }
// }

// class Ant extends Piece {
//   getTargets(pieces: PieceRecord): Coord[] {
//     throw new Error("Method not implemented.");
//   }
// }

// class Bettle extends Piece {
//   layer: number = 0;
//   getTargets(pieces: PieceRecord): Coord[] {
//     throw new Error("Method not implemented.");
//   }
// }
