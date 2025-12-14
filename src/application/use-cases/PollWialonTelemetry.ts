import { WialonRepository } from '../../domain/ports/WialonRepository';

export class PollWialonTelemetry {
  constructor(private readonly wialonRepo: WialonRepository) {}

  async execute(): Promise<void> {
    const sid = await this.wialonRepo.login();
    const telemetryList = await this.wialonRepo.getTelemetry(sid);

    telemetryList.forEach(t => {
      console.log('📡 POSICIÓN');
      console.log({
        unitId: t.unitId,
        unitName: t.unitName,
        lat: t.latitude,
        lon: t.longitude,
        speed: t.speed,
        course: t.course,
        altitude: t.altitude,
        timestamp: t.timestamp
      });
      console.log('-----------------------------');
    });
  }
}
