class Pozicija {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  dodiruje(other) {
    if (
      this.x < other.x + other.w &&
      other.x < this.x + this.w  &&
      this.y < other.y + other.h &&
      other.y < this.y + this.h 
    )
      return 1;
    return 0;
  }
  prosao(other) {
    if (this.x < other.x + 2 && other.x - 1 < this.x) return 1;
    return 0;
  }
}