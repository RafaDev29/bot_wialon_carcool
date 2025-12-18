import { carcoolHttp } from '../http/carcool.http';
import { CarcoolPosition } from '../../domain/entities/CarcoolPosition';

export class CarcoolRepositoryImpl {
  async sendBatch(data: CarcoolPosition[]): Promise<void> {
    console.log(data , "ga")
    try {
      const response = await carcoolHttp.post('/gps-tracker-batch', { data });

      console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Error enviando batch a Carcool:', error);
      throw error;
    }
  }
}

