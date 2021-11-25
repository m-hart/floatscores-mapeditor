
export abstract class Source {
  protected name: string;


  constructor(name: string) {
    this.name = name;
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  /**
   * Converts the source to a string.
   */
  public abstract serialise(): string;
}
