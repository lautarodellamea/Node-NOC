import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

// aca ya hacemos la implementacion de nuestro datasource
// este sera el lugar donde lleguemos a la base de datos o file system

export class FileSystemDatasource implements LogDatasource {

  private readonly logPath = "logs/"
  private readonly allLogsPath = "logs/logs-all.log"
  private readonly mediumLogsPath = "logs/logs-medium.log"
  private readonly highLogsPath = "logs/logs-high.log"

  // en el momento que se cree la instancia de FileSystemDatasource llama al constructor y este verifica que tengamos todos esos archivos (esto se ejecuta una evz cuando la aplicacion se levanta), verifica que esoe sxista si no los crea
  constructor() {
    this.createLogsFile();
  }

  private createLogsFile = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [
      this.allLogsPath,
      this.mediumLogsPath,
      this.highLogsPath
    ].forEach((path) => {
      if (fs.existsSync(path)) return;

      // creamos el archivo sino existe
      fs.writeFileSync(path, "");
    });


  }

  async saveLog(newLog: LogEntity): Promise<void> {

    const logAsJson = `${JSON.stringify(newLog)}\n`

    fs.appendFileSync(this.allLogsPath, logAsJson)

    if (newLog.level === LogSeverityLevel.low) return;
    if (newLog.level === LogSeverityLevel.medium) {

      fs.appendFileSync(this.mediumLogsPath, logAsJson)

    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson)

    }


  }



  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");
    const logs = content.split("\n").map(log => LogEntity.fromJson(log));

    return logs;
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {

      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath)

      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath)

      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath)

      default:
        throw new Error(`${severityLevel} not implemented`)

    }
  }



}
