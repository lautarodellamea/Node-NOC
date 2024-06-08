// el dia de mañana podremos copiar este archivo pegarlo en otro proyecto, hacer la configuracion de gmail y queda andando

import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
// import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[];
}

interface Attachments {
  filename: string;
  path: string;
}


// tendremos un servicios para poder enviar correos y a la vez mi patron adaptador para evitar que NodeMailer ande flotando por toda la aplicacion
export class EmailService {

  // este objeto es el que va a terminar mandando el correo
  private transoprter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  })

  // vamos a querer monitorear si mandamos un mail, vamos a inyectar una dependencia
  // no lo usamos mas ya que el caso de uno hace todoe sto, este servicio solo envia el email
  // constructor(
  //   private readonly logRepository: LogRepository
  // ) {

  // }

  async sendEmail(options: SendMailOptions): Promise<boolean> {

    const { to, subject, htmlBody, attachments = [] } = options

    try {


      // podriamos usar este sentInformation para ver la info y borrar personas a las que no se les pudo enviar el email por ejemplo
      const sentInformation = await this.transoprter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments
      })

      // console.log(sentInformation)
      const log = new LogEntity({ message: `Email sent`, level: LogSeverityLevel.low, origin: "email.service.ts" })
      // this.logRepository.saveLog(log)



      return true
    } catch (error) {

      const log = new LogEntity({ message: `Email not sent`, level: LogSeverityLevel.high, origin: "email.service.ts" })
      // this.logRepository.saveLog(log)

      return false
    }

  }



  async sendEmailWithFilesSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.<p>
            <p>Ver logs adjuntos</p>
         `

    const attachments: Attachments[] = [

      { filename: "logs-all.log", path: "./logs/logs-all.log" },
      { filename: "logs-high.log", path: "./logs/logs-high.log" },
      { filename: "logs-medium.log", path: "./logs/logs-medium.log" },

    ]


    return this.sendEmail({ to, subject, htmlBody, attachments })


  }


}