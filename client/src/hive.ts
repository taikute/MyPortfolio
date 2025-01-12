const HexWidth = 200;
const HexHeight = 174;

class Hive {
  hexs: Hex[];
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  constructor() {
    this.hexs = [
      new Hex(0, 0, 0),
      new Hex(1, 0, -1),
      new Hex(1, -1, 0),
      new Hex(0, -1, 1),
      new Hex(-1, 0, 1),
      new Hex(-1, 1, 0),
      new Hex(0, 1, -1),
      new Hex(2, 0, -2),
      new Hex(2, -1, -1),
      new Hex(2, -2, 0),
      new Hex(1, -2, 1),
      new Hex(0, -2, 2),
      new Hex(-1, -1, 2),
      new Hex(-2, 0, 2),
      new Hex(-2, 1, 1),
      new Hex(-2, 2, 0),
      new Hex(-1, 2, -1),
      new Hex(0, 2, -2),
      new Hex(1, 1, -2),
    ];
    this.update();
  }

  add(hex: Hex) {
    if (this.hexs.find((h) => h.x === hex.x && h.y === hex.y && h.z === hex.z)) {
      console.log("hex already exists");
      return;
    }

    this.hexs.push(hex);
    this.update();
  }

  addRandom() {
    this.add(new Hex(3, 0, -3));
    this.add(new Hex(0, 3, -3));
    this.add(new Hex(0, -3, 3));
    this.add(new Hex(-3, 0, 3));
  }

  addAll(hexs: Hex[]) {
    this.hexs = this.hexs.concat(hexs);
    this.update();
  }

  update() {
    const minTX = Math.min(...this.hexs.map((hex) => hex.tX));
    const maxTX = Math.max(...this.hexs.map((hex) => hex.tX));
    const minTY = Math.min(...this.hexs.map((hex) => hex.tY));
    const maxTY = Math.max(...this.hexs.map((hex) => hex.tY));

    console.log(minTX, maxTX, minTY, maxTY);

    this.x = minTX - HexWidth * 1.5;
    this.y = minTY - HexHeight * 1.5;
    this.width = maxTX - minTX + HexWidth * 3;
    this.height = maxTY - minTY + HexHeight * 3;
  }

  get viewBox() {
    return `${this.x} ${this.y} ${this.width} ${this.height}`;
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
    this.tY = (y - z) * HexHeight * 0.5;
  }
}

export default Hive;
