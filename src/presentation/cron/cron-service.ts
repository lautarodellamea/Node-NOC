import { CronJob } from "cron";

// fernando usa interfaces cuando manejamos objetos con propiedaedes
// cuando queremos crear un tipo de dato usamos types
type CronTime = string | Date;
type OnTick = () => void

export class CronService {

  public static createJob(cronTime: CronTime, onTick: OnTick): CronJob {

    const job = new CronJob(cronTime, onTick);

    job.start();

    return job
  }
}