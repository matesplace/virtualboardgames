import { CatanCoordinate, CatanIntersectionCoordinate, CatanPathCoordinate } from '../state';

export class HexCoordinate {
  static TOLERANCE: number = .001;
  constructor(public x: number, public y: number, public z: number) { }
  cartesianX() {
    return (-0.5) * this.x + this.y + (-0.5) * this.z;
  }
  cartesianY() {
    return -(Math.sqrt(3) / 2) * this.x + (Math.sqrt(3) / 2) * this.z;
  }
  equals(other: HexCoordinate) {
    if (this == other) {
      return true;
    }
    if (!(Math.abs(this.cartesianX() - other.cartesianX()) < HexCoordinate.TOLERANCE)) {
      return false;
    }
    if (!(Math.abs(this.cartesianY() - other.cartesianY()) < HexCoordinate.TOLERANCE)) {
      return false;
    }
    return true;
  }
  toString() {
    return `${this.x}${this.y}${this.z}`;
  }
  static fromJson(catanCoordinate: CatanCoordinate) {
    return new HexCoordinate(catanCoordinate.x, catanCoordinate.y, catanCoordinate.z);
  }
  toJson(): CatanCoordinate {
    return {
      x: this.x,
      y: this.y,
      z: this.z
    }
  }
}

export class IntersectionCoordinate {
  constructor(public coord1: HexCoordinate, public coord2: HexCoordinate, public coord3: HexCoordinate) { }
  getCenter() {
    const x = (this.coord1.x + this.coord2.x + this.coord3.x) / 3;
    const y = (this.coord1.y + this.coord2.y + this.coord3.y) / 3;
    const z = (this.coord1.z + this.coord2.z + this.coord3.z) / 3;
    return new HexCoordinate(x, y, z);
  }
  getAverageX() {
    return (this.coord1.cartesianX() + this.coord2.cartesianX() + this.coord3.cartesianX()) / 3.0;
  }
  getAverageY() {
    return (this.coord1.cartesianY() + this.coord2.cartesianY() + this.coord3.cartesianY()) / 3.0;
  }
  equals(other: IntersectionCoordinate) {
    if (this == other) {
      return true;
    }
    if (this.coord1.equals(other.coord1)
      && this.coord2.equals(other.coord2)
      && this.coord3.equals(other.coord3)) {
      return true;
    }
    if (this.coord1.equals(other.coord1)
      && this.coord2.equals(other.coord3)
      && this.coord3.equals(other.coord2)) {
      return true;
    }
    if (this.coord1.equals(other.coord2)
      && this.coord2.equals(other.coord1)
      && this.coord3.equals(other.coord3)) {
      return true;
    }
    if (this.coord1.equals(other.coord3)
      && this.coord2.equals(other.coord2)
      && this.coord3.equals(other.coord1)) {
      return true;
    }
    if (this.coord1.equals(other.coord3)
      && this.coord2.equals(other.coord1)
      && this.coord3.equals(other.coord2)) {
      return true;
    }
    if (this.coord1.equals(other.coord2)
      && this.coord2.equals(other.coord3)
      && this.coord3.equals(other.coord1)) {
      return true;
    }
    return false;
  }
  toString() {
    return `${this.coord1.toString()}${this.coord2.toString()}${this.coord3.toString()}`;
  }
  static fromJson(catanIntersection: CatanIntersectionCoordinate) {
    return new IntersectionCoordinate(
      HexCoordinate.fromJson(catanIntersection.coord1),
      HexCoordinate.fromJson(catanIntersection.coord2),
      HexCoordinate.fromJson(catanIntersection.coord3))
  }
  toJson(): CatanIntersectionCoordinate {
    return {
      coord1: this.coord1.toJson(),
      coord2: this.coord2.toJson(),
      coord3: this.coord3.toJson(),
    }
  }
}

export class PathCoordinate {
  constructor(public startCoord: IntersectionCoordinate, public endCoord: IntersectionCoordinate) { }
  equals(other: PathCoordinate) {
    if (this == other) {
      return true;
    }
    if (this.startCoord.equals(other.startCoord)
      && this.endCoord.equals(other.endCoord)) {
      return true;
    }
    if (this.startCoord.equals(other.endCoord)
      && this.endCoord.equals(other.startCoord)) {
      return true;
    }
    return false;
  }
  toString() {
    return `${this.startCoord.toString()}${this.endCoord.toString()}`;
  }
  static fromJson(catanPath: CatanPathCoordinate) {
    return new PathCoordinate(
      IntersectionCoordinate.fromJson(catanPath.startCoord),
      IntersectionCoordinate.fromJson(catanPath.endCoord));
  }
  toJson(): CatanPathCoordinate {
    return {
      startCoord: this.startCoord.toJson(),
      endCoord: this.endCoord.toJson(),
    }
  }
}
