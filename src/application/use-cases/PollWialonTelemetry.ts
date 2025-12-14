import { WialonRepository } from '../../domain/ports/WialonRepository';
import { WialonToCarcoolMapper } from '../mappers/WialonToCarcool.mapper';
import { CarcoolPosition } from '../../domain/entities/CarcoolPosition';
import { CarcoolRepositoryImpl } from '../../infrastructure/repositories/CarcoolRepositoryImpl';

export class PollWialonTelemetry {
  private readonly carcoolRepo = new CarcoolRepositoryImpl();

  constructor(
    private readonly wialonRepo: WialonRepository
  ) {}

  async execute(): Promise<void> {
    try {
      const sid = await this.wialonRepo.login();
      const items = await this.wialonRepo.getRawItems(sid);

      const batch: CarcoolPosition[] = [];

      for (const item of items) {
        const mapped = WialonToCarcoolMapper.map(item);
        if (mapped) batch.push(mapped);
      }

      if (batch.length === 0) {
        console.warn('⚠️ No hay tramas válidas');
        return;
      }

      // 🔥 ENVÍO REAL A CARCOOL
      await this.carcoolRepo.sendBatch(batch);

      console.log(`✅ Enviado a Carcool (${batch.length} tramas)`);

    } catch (error) {
      console.error('❌ Error en PollWialonTelemetry:', error);
    }
  }
}
