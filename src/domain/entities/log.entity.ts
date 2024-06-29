// las entidades las podemos ver como algo que ya va a terminar llegando a la base de datos, es algo que grabamos en base de datos pero no es en realidad la base de datos, esto es quien va a gobernar nuestra aplicacion cuando querramos trabajar con nuestras entidades.

export enum LogSeverityLevel { low = "low", medium = "medium", high = "high" }


export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}


export class LogEntity {

  public level: LogSeverityLevel; // Enum
  public message: string;
  public createdAt: Date;
  public origin: string;

  // mas de 3 argumentos ya creamos un objeto por buena practica
  constructor(options: LogEntityOptions) {
    const { message, level, origin, createdAt = new Date() } = options;
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
    // esto para saber en que archivo llamamos el log
    this.origin = origin;

  }

  static fromJson = (json: string): LogEntity => {

    json = (json === "") ? "{}" : json


    const { message, level, createdAt, origin } = JSON.parse(json);

    // if (!message) throw new Error("message is required");
    // if (!level) throw new Error("level is required");
    // if (!createdAt) throw new Error("createdAt is required");

    const log = new LogEntity({
      message: message,
      level: level,
      createdAt: createdAt,
      origin: origin
    });
    log.createdAt = new Date(createdAt);
    return log;


  }



  static fromObject = (object: { [key: string]: any }): LogEntity => {

    const { message, level, createdAt, origin } = object

    const log = new LogEntity({
      message: message,
      level: level,
      createdAt: createdAt,
      origin: origin
    });


    return log;

  }

}