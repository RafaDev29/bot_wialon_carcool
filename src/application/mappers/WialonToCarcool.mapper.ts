import { CarcoolPosition } from '../../domain/entities/CarcoolPosition';

export class WialonToCarcoolMapper {
    static map(item: any): CarcoolPosition | null {
        if (!item || !item.uid || !item.pos) {
            return null;
        }

        const pos = item.pos;
        const params = item.lmsg?.p ?? {};
        const plate = (item.nm ?? 'SINPLA').substring(0, 6);

        return new CarcoolPosition(
            pos.x,                       // lng
            pos.y,                       // lat
            item.uid,                    // IMEI
            plate,      // plate
            pos.s ?? 0,                  // velocity
            pos.z ?? 0,                  // altitude
            pos.c ?? 0,                  // angle
            params.io_16 ?? 0,           // odometer
            params.io_270 ?? 0,          // level_fuel
            params.io_270 ?? 0,          // fuel_tank
            params.io_239 === 1 ? 1 : 0, // engine
            pos.t                        // 🔴 timestamp REAL del GPS
        );
    }
}
