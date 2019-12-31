enum GridSpots {
  topLeft = '.cell-0-0',
  topCenter = '.cell-0-1',
  topRight = '.cell-0-2',
  middleLeft = '.cell-1-0',
  middleCenter = '.cell-1-1',
  middleRight = '.cell-1-2',
  bottomLeft = '.cell-2-0',
  bottomCenter = '.cell-2-1',
  bottomRight = '.cell-2-2'
};

class Grid {
  private remainingSpots: GridSpots[] = [
    GridSpots.topLeft, GridSpots.topCenter, GridSpots.topRight,
    GridSpots.middleLeft, GridSpots.middleCenter, GridSpots.middleRight,
    GridSpots.bottomLeft, GridSpots.bottomCenter, GridSpots.bottomRight
  ];

  public random = (): string => {
    const number = Math.floor(Math.random() * this.remainingSpots.length);
    const randomCell = this.remainingSpots[number];
    this.remove(randomCell);
    return randomCell;
  }

  private remove = (spot: GridSpots) => {
    this.remainingSpots = this.remainingSpots.filter((e) => e !== spot);
  }

  public hasSpotsAvailable = (): boolean => {
    return !!this.remainingSpots && this.remainingSpots.length > 0;
  }
}

export default Grid;