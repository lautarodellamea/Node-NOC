import { LogEntity, LogSeverityLevel } from "../entities/log.entity";


// creo una clase abtracta para no poder instanciarla
// la usaremos para obligar el comportamiento de esta clase sobre otras
export abstract class LogDatasource {

  abstract saveLog(log: LogEntity): Promise<void>
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>

}

// Esta es la regla de negocio para los datasources, es como establecer un contrato en el cual todos mis datasources tienen que cumplirlo sino lo cumplen no seran un origen de datos propio para nuestro logs.