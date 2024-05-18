import { CronService } from "./cron/cron-service";
import { CheckService } from "./domain/use-cases/checks/check-service";


export class Server {

  public static start() {
    console.log("Starting server...");

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com"
      new CheckService(() => console.log(`${url} is ok`), (error) => console.log(error)).execute(url)
      // new CheckService().execute("http://localhost:3000")
    });

  }

}