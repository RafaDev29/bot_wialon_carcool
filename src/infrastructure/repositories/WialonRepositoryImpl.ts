import { WialonRepository } from '../../domain/ports/WialonRepository';
import { Telemetry } from '../../domain/entities/Telemetry';
import { wialonHttp } from '../http/wialon.http';

export class WialonRepositoryImpl implements WialonRepository {

  async login(): Promise<string> {
    const response = await wialonHttp.get('', {
      params: {
        svc: 'token/login',
        params: JSON.stringify({
          token: process.env.WIALON_TOKEN,
          fl: 2
        })
      }
    });

    if (!response.data?.eid) {
      throw new Error('No se pudo obtener SID de Wialon');
    }

    return response.data.eid;
  }

  async getTelemetry(sid: string): Promise<Telemetry[]> {
    const response = await wialonHttp.get('', {
      params: {
        svc: 'core/search_items',
        sid,
        params: JSON.stringify({
          spec: {
            itemsType: 'avl_unit',
            propName: 'sys_name',
            propValueMask: '*',
            sortType: 'sys_name',
            propType: 'propitemname'
          },
          force: 1,
          flags: 1825,
          from: 0,
          to: 0
        })
      }
    });

    const items = response.data?.items ?? [];

    return items
      .filter((i: any) => i.pos)
      .map((i: any) =>
        new Telemetry(
          i.id,
          i.nm,
          i.pos.y,       // lat
          i.pos.x,       // lon
          i.pos.s,       // speed
          i.pos.c,       // course
          i.pos.z,       // altitude
          i.pos.t        // timestamp
        )
      );
  }
}
