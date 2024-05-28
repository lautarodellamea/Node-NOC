import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";


// creamos las instancias que puedan requerir dicho repositorio
const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()

  // podremos cambiar esto por:
  // new postgresSQLDatasource()
  // new mongoDBDatasource()
  // new oracleDBDatasource()

)

// o podriamos querer grabar tambien en amazonWebservices por ejemplo, entonces podriamos crear nuevas instancias de esos repositorios y podemos tener trabajando muchas formas que trabajen iguales solo que con destinos diferentes
// const amazonWebServicesRepository = new LogRepositoryImpl(
//   new FileSystemDatasource()
// )


export class Server {

  public static start() {
    console.log("Starting server...");

    CronService.createJob("*/5 * * * * *", () => {

      // const url = "https://google.com"
      const url = "http://localhost:3000/"
      new CheckService(fileSystemLogRepository, () => console.log(`${url} is ok`), (error) => console.log(error)).execute(url)
      // los argumentos que le pasamos al CheckService son funciones callback que se ejecutaran de acuerdo lo defini en el caso de uso,
      // es una inyeccion de dependencias
      // tambien debo pasar el repositorio

      // si no quisieramos pasara los dos argumentos finales
      // new CheckService(fileSystemLogRepository, undefined, undefined).execute(url)
    });

  }

}