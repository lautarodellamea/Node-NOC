import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDatasource {
  // ctrl + . (implementa los metodos del LogDatasource)
  async saveLog(log: LogEntity): Promise<void> {

    const newLog = await LogModel.create(log)
    await newLog.save()
    console.log("Mongo Log created: ", newLog.id)


  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

    const logs = await LogModel.find({
      level: severityLevel
    })

    // creamos la funcion "fromObject" de la clase LogEntity para convertir un objeto de mongo en un objeto de LogEntity
    return logs.map(mongoLog => LogEntity.fromObject(mongoLog))




  }

}