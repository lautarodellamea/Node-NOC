import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from './email/email.service';
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";
import { LogRepository } from "../domain/repository/log.repository";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostresLogDatasource } from "../infrastructure/datasources/postgre-log.datasource";


// creamos las instancias que puedan requerir dicho repositorio
const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
  // new MongoLogDatasource()
  // new PostresLogDatasource()

  // podremos cambiar esto por:
  // new postgresSQLDatasource()
  // new mongoDBDatasource()
  // new oracleDBDatasource()

)

const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource()
)

const postgresLogRepository = new LogRepositoryImpl(
  new PostresLogDatasource()
)


// o podriamos querer grabar tambien en amazonWebservices por ejemplo, entonces podriamos crear nuevas instancias de esos repositorios y podemos tener trabajando muchas formas que trabajen iguales solo que con destinos diferentes
// const amazonWebServicesRepository = new LogRepositoryImpl(
//   new FileSystemDatasource()
// )

// creamos la instancia del servicio de mails, y lo enviamos mediante el caso de uso mas abajo
const emailService = new EmailService()

export class Server {

  public static async start() {
    console.log("Starting server...");

    // obtengo los logs por severity level, independientemente de la base de datos que estemos usando o file system
    // const logs = await logRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

    // #######################################################################################################

    // Mandar email
    // const emailService = new EmailService();

    // emailService.sendEmail({
    //   to: "lautarodm98@gmail.com",
    //   subject: "Logs de sistema",
    //   htmlBody: `
    //     <h3>Logs de sistema - NOC</h3>
    //     <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</p>
    //     <p>Ver logs adjuntos</p>
    //   `
    // })

    // enviamos archivos aldjuntos, en este caso osgs
    // const emailService = new EmailService()
    // emailService.sendEmailWithFilesSystemLogs(["lautarodm98@gmail.com", "lndmg98@gmail.com"],)

    // usamos la inyección de dependencias
    // const emailService = new EmailService(fileSystemLogRepository)
    // emailService.sendEmailWithFilesSystemLogs(["lautarodm98@gmail.com", "lndmg98@gmail.com"],)

    // aca ya no necesitamos el repository porque usamos el caso de uso, el email-service solo envia el correo electronico, la implementacion anterior ya deja de funcionar
    // new SendEmailLogs(
    //   emailService, fileSystemLogRepository
    // ).excecute(["lautarodm98@gmail.com", "lndmg98@gmail.com"])

    // #######################################################################################################

    CronService.createJob("*/5 * * * * *", () => {
      // console.log(envs.MAILER_SECRET_KEY, envs.MAILER_EMAIL)


      // const url = "http://localhost:3000/"

      const url = "https://google.com"
      // new CheckService(logRepository,
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository], // esto graba en todos lados
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url)

      // los argumentos que le pasamos al CheckService son funciones callback que se ejecutaran de acuerdo lo defini en el caso de uso,
      // es una inyeccion de dependencias
      // tambien debo pasar el repositorio

      // si no quisieramos pasara los dos argumentos finales
      // new CheckService(fileSystemLogRepository, undefined, undefined).execute(url)
    });

  }

}