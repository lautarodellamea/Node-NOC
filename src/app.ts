

import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";

import { Server } from "./presentation/server";


(() => {
  main()
})();



async function main() {

  // ######## MONGO ########
  // conexion a mongo database
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  })

  // Crear una coleccion = tables, documento = registro
  // const newLog = await LogModel.create({
  //   message: "Test message desde Mongo",
  //   origin: "app.ts",
  //   level: "low"
  // })
  // await newLog.save()
  // console.log(newLog)

  // traemos todos los logs
  // const logs = await LogModel.find()
  // console.log(logs)
  // console.log(logs[2].message)



  // ######## POSTGRES ########
  // const prisma = new PrismaClient()

  // crear un nuevo registro
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     message: "Test message desde Postgres",
  //     origin: "app.ts",
  //     level: "HIGH"
  //   }
  // })
  // console.log({ newLog })

  // traer todos los logs
  // const logs = await prisma.logModel.findMany()
  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: "HIGH"
  //   }
  // })
  // console.log({ logs })


  // ########## SERVER ########
  Server.start();


  // console.log(envs)
  // console.log(envs.PORT)


}