class Cells {
  private remainingCells: string[] = [
    '.cell-0-0','.cell-0-1','.cell-0-2',
    '.cell-1-0','.cell-1-1','.cell-1-2',
    '.cell-2-0','.cell-2-1','.cell-2-2',
  ];

  public random = (): string => {
    const number = Math.floor(Math.random() * this.remainingCells.length);
    const randomCell = this.remainingCells[number];
    this.remove(number);
    return randomCell;
  }

  private remove = (position: number) => {
    this.remainingCells = this.remainingCells.filter((e, index) => index !== position);
  }

  public hasCells = (): boolean => {
    return !!this.remainingCells && this.remainingCells.length > 0;
  }
}

export default Cells;