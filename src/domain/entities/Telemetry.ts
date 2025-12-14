export class Telemetry {
  constructor(
    public readonly unitId: number,
    public readonly unitName: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly speed: number,
    public readonly course: number,
    public readonly altitude: number,
    public readonly timestamp: number
  ) {}
}
