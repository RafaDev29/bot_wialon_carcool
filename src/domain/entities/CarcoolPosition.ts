export class CarcoolPosition {
  constructor(
    public lng: number,
    public lat: number,
    public imei: string,
    public plate: string,
    public velocity: number,
    public altitude: number,
    public angle: number,
    public odometer: number,
    public level_fuel: number,
    public fuel_tank: number,
    public engine: number,
    public device_timestamp: number
  ) {}
}
