// las entidades las podemos ver como algo que ya va a terminar llegando a la base de datos, es algo que grabamos en base de datos pero no es en realidad la base de datos, esto es quien va a gobernar nuestra aplicacion cuando querramos trabajar con nuestras entidades.

export enum LogSeverityLevel { low = "low", medium = "medium", high = "high" }


export class LogEntity {

  public level: LogSeverityLevel; // Enum
  public message: string;
  public createdAt: Date;


  constructor(message: string, level: LogSeverityLevel) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(json);

    // if (!message) throw new Error("message is required");
    // if (!level) throw new Error("level is required");
    // if (!createdAt) throw new Error("createdAt is required");

    const log = new LogEntity(message, level);
    log.createdAt = new Date(createdAt);
    return log;


  }

}