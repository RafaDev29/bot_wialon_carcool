import { CarcoolPosition } from '../../domain/entities/CarcoolPosition';

export class WialonToCarcoolMapper {
    static map(item: any): CarcoolPosition | null {
        if (!item || !item.uid || !item.pos) {
            return null;
        }

        const pos = item.pos;
        const params = item.lmsg?.p ?? {};

        const plate = (item.nm ?? 'SINPLA').substring(0, 6);

        const odometer = params.io_16 !== undefined
            ? Number(params.io_16)
            : 0;

        const engine = params.io_239 === 1 ? 1 : 0;

        const rawFuel = params.io_270 !== undefined
            ? Number(params.io_270)
            : 0;

        const levelFuel = Math.max(0, Math.min(100, rawFuel));


        return new CarcoolPosition(
            Number(pos.x),
            Number(pos.y),
            String(item.uid),
            plate,
            Number(pos.s ?? 0),
            Number(pos.z ?? 0),
            Number(pos.c ?? 0),
            odometer,
            levelFuel,   
            rawFuel,     
            engine,
            Number(pos.t)
        );

    }
}
