import { WialonRepository } from '../../domain/ports/WialonRepository';
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

  async getRawItems(sid: string): Promise<any[]> {
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
          force: 2,
          flags: 1285,
          from: 0,
          to: 0
        })
      }
    });

    return response.data?.items ?? [];
  }
}
