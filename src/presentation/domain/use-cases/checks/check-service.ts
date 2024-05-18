
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>
}

type SuccessCallback = () => void
type ErrorCallback = (error: string) => void

export class CheckService implements CheckServiceUseCase {


  // inyeccion de dependencias
  // por ejemplo aca diremos que quiero hacer si el casod e uso falla o sicede exitosamente
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) { }




  async execute(url: string): Promise<boolean> {

    try {

      const req = await fetch(url)

      if (!req.ok) {
        throw new Error(`Error on check service: ${url}`)
      }

      // llamamos a la funcion de exito que me mandaron en la inyeccion de dependencias
      this.successCallback()

      return true

    } catch (error) {

      console.log(`${error}`)
      this.errorCallback(`${error}`)

      return false
    }




  }
}