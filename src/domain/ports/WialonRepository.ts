import { Telemetry } from '../entities/Telemetry';

export interface WialonRepository {
  login(): Promise<string>; // retorna sid (eid)
  getTelemetry(sid: string): Promise<Telemetry[]>;
}
