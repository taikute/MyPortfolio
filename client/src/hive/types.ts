type PieceId =
  | "wA1"
  | "wA2"
  | "wA3"
  | "wB1"
  | "wB2"
  | "wG1"
  | "wG2"
  | "wG3"
  | "wL"
  | "wM"
  | "wP"
  | "wQ"
  | "wS1"
  | "wS2"
  | "bA1"
  | "bA2"
  | "bA3"
  | "bB1"
  | "bB2"
  | "bG1"
  | "bG2"
  | "bG3"
  | "bL"
  | "bM"
  | "bP"
  | "bQ"
  | "bS1"
  | "bS2";

type PieceColor = "w" | "b";

type PieceType = "A" | "B" | "G" | "L" | "M" | "P" | "Q" | "S";

type RotateType = "rotate-flat" | "rotate-pointy";

export type { PieceId, PieceColor, PieceType, RotateType };
