
// nosotros no llegaremos directamente al datasource, sino que lo haremos mediante el repositorio
//  el logrepository me permitira llamar metodos que se encuentran dentro del datasource
// porque el repositorio tendra lo que es el datasource, basado en este podremos cambiarlo por el que querramos y asi no tendremos que cambiar casos de uso u otras cosas en el codigo.
// el datasource son las reglas de negocio de como queremos que funcione y el repositorio es quien me permite llamar al datasourse

import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogRepository {

  abstract saveLog(log: LogEntity): Promise<void>
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>

}

