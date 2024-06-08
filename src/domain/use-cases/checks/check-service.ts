// este caso de uso lo diseñe para definir que hacer en caso de que todo vaya bien o en casod e algun error.
// estamos chequeando el servicio

import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"

// ´pr ejemplo podrioamos hacer que en caso de que falle 3 veces envie un correo electronico avisando

// esto sera algo que debe implementar la clase
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>
}


// aca decimos que informacion espera, o pueden inyectar
type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined

export class CheckService implements CheckServiceUseCase {


  // inyeccion de dependencias
  // por ejemplo aca diremos que quiero hacer si el caso de uso falla o sucede exitosamente
  constructor(

    // inyectamos un repositorio
    private readonly logRepository: LogRepository,

    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) { }




  // no le pongo static porque si voy a generar una instancia
  public async execute(url: string): Promise<boolean> {

    try {

      const req = await fetch(url)

      if (!req.ok) {
        throw new Error(`Error on check service: ${url}`)
      }


      const log = new LogEntity({ message: `Service ${url} ok`, level: LogSeverityLevel.low, origin: "check-service.ts" })
      this.logRepository.saveLog(log)

      // llamamos a la funcion de exito que me mandaron en la inyeccion de dependencias
      this.successCallback && this.successCallback()

      return true

    } catch (error) {

      const errorMessage = `${url} is not ok. ${error}`
      const log = new LogEntity({ message: errorMessage, level: LogSeverityLevel.high, origin: "check-service.ts" })
      this.logRepository.saveLog(log)

      this.errorCallback && this.errorCallback(errorMessage)

      return false
    }




  }
}