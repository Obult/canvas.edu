export class RGBA {
  constructor(color: Uint8ClampedArray) {
    this.r = color[0];
    this.g = color[1];
    this.b = color[2];
    this.a = color[3];
  }
  r: number;
  g: number;
  b: number;
  a: number;
}

export class PxlDataDto {
  constructor(x: number, y: number, color: RGBA) {
    this.color = color;
    this.x = x;
    this.y = y;
  }
  x: number;
  y: number;
  color: RGBA;
}
