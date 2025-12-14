import 'dotenv/config';
import { WialonRepositoryImpl } from './infrastructure/repositories/WialonRepositoryImpl';
import { PollWialonTelemetry } from './application/use-cases/PollWialonTelemetry';

const INTERVAL_MS = 60_000;

const wialonRepo = new WialonRepositoryImpl();
const poller = new PollWialonTelemetry(wialonRepo);

(async () => {
  console.log('🚀 Bot Wialon iniciado');

  await poller.execute();

  setInterval(async () => {
    try {
      await poller.execute();
    } catch (err) {
      console.error('❌ Error en intervalo:', err);
    }
  }, INTERVAL_MS);
})();
