import { Intersection } from "./Intersection";
import { IntersectionCoordinate, HexCoordinate, PathCoordinate } from "./Coordinates";
import { Path } from "./Path";
import { Port } from './Port';
import { ResourceType } from "./ResourceType";

export class Tile {
  public intersections: Intersection[];
  public portLocations: IntersectionCoordinate[];
  public portType?: ResourceType;
  public id: string;
  constructor(public rollNum: number, public coordinate: HexCoordinate,
    intersections: Map<IntersectionCoordinate, Intersection>, paths: Map<PathCoordinate, Path>,
    public tileType: ResourceType, public hasRobber?: boolean) {
    this.intersections = [];
    this.portLocations = [];
    if (tileType != ResourceType.SEA) {
      this.fillEdges(intersections, paths);
    } else {
      // Sea tile
      this.fillSeaTile(intersections);
    }

    this.id = "tile-x-" + coordinate.x + "y-" + coordinate.y + "z-" + coordinate.z;
  }
  private fillEdges(intersections: Map<IntersectionCoordinate, Intersection>, paths: Map<PathCoordinate, Path>) {
    const upLeftTile = new HexCoordinate(this.coordinate.x,
      this.coordinate.y, this.coordinate.z + 1);
    const upRightTile = new HexCoordinate(this.coordinate.x,
      this.coordinate.y + 1, this.coordinate.z + 1);
    const rightTile = new HexCoordinate(this.coordinate.x,
      this.coordinate.y + 1, this.coordinate.z);
    const lowerRightTile = new HexCoordinate(this.coordinate.x + 1,
      this.coordinate.y + 1, this.coordinate.z);
    const lowerLeftTile = new HexCoordinate(this.coordinate.x + 1,
      this.coordinate.y, this.coordinate.z);
    const leftTile = new HexCoordinate(this.coordinate.x + 1,
      this.coordinate.y, this.coordinate.z + 1);

    const top = new IntersectionCoordinate(this.coordinate,
      upLeftTile, upRightTile);
    const upRight = new IntersectionCoordinate(this.coordinate,
      upRightTile, rightTile);
    const lowerRight = new IntersectionCoordinate(this.coordinate,
      rightTile, lowerRightTile);
    const bottom = new IntersectionCoordinate(this.coordinate,
      lowerRightTile, lowerLeftTile);
    const lowerLeft = new IntersectionCoordinate(this.coordinate,
      lowerLeftTile, leftTile);
    const upLeft = new IntersectionCoordinate(this.coordinate,
      leftTile, upLeftTile);

    this.fillIntersections(intersections, top);
    this.fillIntersections(intersections, upRight);
    this.fillIntersections(intersections, lowerRight);
    this.fillIntersections(intersections, bottom);
    this.fillIntersections(intersections, lowerLeft);
    this.fillIntersections(intersections, upLeft);

    this.fillPaths(this.getIntersection(intersections, top)!, this.getIntersection(intersections, upRight)!, paths);
    this.fillPaths(this.getIntersection(intersections, upRight)!, this.getIntersection(intersections, lowerRight)!, paths);
    this.fillPaths(this.getIntersection(intersections, lowerRight)!, this.getIntersection(intersections, bottom)!, paths);
    this.fillPaths(this.getIntersection(intersections, bottom)!, this.getIntersection(intersections, lowerLeft)!, paths);
    this.fillPaths(this.getIntersection(intersections, lowerLeft)!, this.getIntersection(intersections, upLeft)!, paths);
    this.fillPaths(this.getIntersection(intersections, upLeft)!, this.getIntersection(intersections, top)!, paths);
  }
  fillSeaTile(intersections: Map<IntersectionCoordinate, Intersection>) {
    let closestIntersections: IntersectionCoordinate[] = [];

    const upLeftTile = new HexCoordinate(this.coordinate.x,
      this.coordinate.y, this.coordinate.z + 1);
    const upRightTile = new HexCoordinate(this.coordinate.x,
      this.coordinate.y + 1, this.coordinate.z + 1);
    const rightTile = new HexCoordinate(this.coordinate.x,
      this.coordinate.y + 1, this.coordinate.z);
    const lowerRightTile = new HexCoordinate(this.coordinate.x + 1,
      this.coordinate.y + 1, this.coordinate.z);
    const lowerLeftTile = new HexCoordinate(this.coordinate.x + 1,
      this.coordinate.y, this.coordinate.z);
    const leftTile = new HexCoordinate(this.coordinate.x + 1,
      this.coordinate.y, this.coordinate.z + 1);

    closestIntersections.push(new IntersectionCoordinate(this.coordinate,
      upLeftTile, upRightTile));
    closestIntersections.push(new IntersectionCoordinate(this.coordinate,
      upRightTile, rightTile));
    closestIntersections.push(new IntersectionCoordinate(this.coordinate,
      rightTile, lowerRightTile));
    closestIntersections.push(new IntersectionCoordinate(this.coordinate,
      lowerRightTile, lowerLeftTile));
    closestIntersections.push(new IntersectionCoordinate(this.coordinate,
      lowerLeftTile, leftTile));
    closestIntersections.push(new IntersectionCoordinate(this.coordinate,
      leftTile, upLeftTile));

    // Sort
    closestIntersections = closestIntersections.sort((o1, o2) => {
      const o1X = o1.getAverageX();
      const o2X = o2.getAverageX();
      const o1Y = o1.getAverageY();
      const o2Y = o2.getAverageY();

      return (Math.pow(o1X, 2) + Math.pow(o1Y, 2)) -
        (Math.pow(o2X, 2) + Math.pow(o2Y, 2));
    });

    // Add the two intersections closest to the origin
    const first = this.getIntersection(intersections, closestIntersections[0]);
    if (first) {
      this.intersections.push(first);
    }

    const second = this.getIntersection(intersections, closestIntersections[1]);
    if (second) {
      this.intersections.push(second);
    }
  }
  private getIntersection(intersections: Map<IntersectionCoordinate, Intersection>,
    coord: IntersectionCoordinate) {
    const keys = Array.from(intersections.keys());
    for (const key of keys) {
      if (key.equals(coord)) {
        return intersections.get(key);
      }
    }
    return null;
  }
  fillIntersections(intersections: Map<IntersectionCoordinate, Intersection>,
    coord: IntersectionCoordinate) {
    if (this.getIntersection(intersections, coord) != null) {
      this.intersections.push(intersections.get(coord)!);
    } else {
      const newIntersect = new Intersection(coord);
      intersections.set(coord, newIntersect);
      this.intersections.push(newIntersect);
    }
  }
  fillPaths(start: Intersection, end: Intersection, paths: Map<PathCoordinate, Path>) {
    const path = new PathCoordinate(start.position, end.position);
    let pathExists = false;
    paths.forEach((_, searchPath: PathCoordinate) => {
      pathExists = pathExists || searchPath.equals(path);
    })
    if (!pathExists) {
      paths.set(path, new Path(start, end));
    }
  }
  setPort(port: Port) {
    this.intersections.forEach(intersection => {
      intersection.setPort(port);
      this.portLocations.push(intersection.position);
    })
    this.portType = port.resource;
  }
  setRobber(place: boolean) {
    this.hasRobber = place;
  }
}
