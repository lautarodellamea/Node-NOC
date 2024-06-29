import { LogEntity, LogSeverityLevel } from "../entities/log.entity";


// creo una clase abtracta para no poder instanciarla
// la usaremos para obligar el comportamiento de esta clase sobre otras
export abstract class LogDatasource {

  abstract saveLog(log: LogEntity): Promise<void>
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>

  // si quisieramos implementar un nuevo metodo en mi datasource simplemente lo implementamos de esta manera
  // por ejemplo getLogById..
  // todos los que tengan la implementacion de nuestro datasouce van a presentar el mismo problema, pero esto es lo que queremos, para saber donde tenemos qu ir a modificar y agregar esa funcionalidad. Si no estuvieramos en TS esto seria una labor muy dificil de hacer en JS ya que determinar todos los lugares donde cambiar esto sera durisimo

}

// Esta es la regla de negocio para los datasources, es como establecer un contrato en el cual todos mis datasources tienen que cumplirlo sino lo cumplen no seran un origen de datos propio para nuestro logs.

// establece las reglas para que cualquier objeto que nosotros querramos pueda ser considerado un datasource/origen de datos para nuestro logs

// esto lo vemos implementado en infrastructure/datasources/mongo-log.datasource.ts y infrastructure/datasources/file-system.datasource.ts