import { carcoolHttp } from '../http/carcool.http';
import { CarcoolPosition } from '../../domain/entities/CarcoolPosition';

export class CarcoolRepositoryImpl {
  async sendBatch(data: CarcoolPosition[]): Promise<void> {
    await carcoolHttp.post('/gps-tracker-batch', {
      data
    });
  }
}
