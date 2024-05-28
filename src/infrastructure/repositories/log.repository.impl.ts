import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";


// implementamos el datasource

export class LogRepositoryImpl implements LogRepository {

  // recibimos algun tipod e datasource
  // y llamamos sus metodos


  private logDatasource: LogDatasource

  constructor(
    // esto equivale a recibirlo como argumento aca y establecerlo a la propiedad
    // private readonly logDatasource: LogDatasource //el objetivo de esto es que yo pueda cambiar el datasource

    // igual lo hago de esta forma para mayor legibilidad
    logDatasource: LogDatasource

  ) {
    this.logDatasource = logDatasource
  }




  async saveLog(log: LogEntity): Promise<void> {
    return this.logDatasource.saveLog(log);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }
}