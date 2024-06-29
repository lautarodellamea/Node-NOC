import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from '@prisma/client';

const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH
}

export class PostresLogDatasource implements LogDatasource {

  async saveLog(log: LogEntity): Promise<void> {

    const level = severityEnum[log.level]

    const newLog = await prismaClient.logModel.create({

      data: {
        ...log,
        level: level,
      }
    })

    console.log("Postgres saved")
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

    const level = severityEnum[severityLevel]

    const dbLogs = await prismaClient.logModel.findMany({
      where: {
        level: level
      }
    })

    // no puedo devolver dbLogs porque no es una entidad, y seria usar la implementacion propiamente de la base de datos
    return dbLogs.map(dbLog => LogEntity.fromObject(dbLog))



  }


}