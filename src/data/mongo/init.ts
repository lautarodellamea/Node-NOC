// https://mongoosejs.com/docs/index.html

import mongoose from "mongoose"

interface ConectionOptions {
  mongoUrl: string
  dbName: string
}


export class MongoDatabase {

  static async connect(options: ConectionOptions) {
    const { mongoUrl, dbName } = options


    try {

      await mongoose.connect(mongoUrl, {
        dbName: dbName,
      })

      console.log('Mongo connected')


    } catch (error) {
      console.log('Mongo conection error')
      throw error
    }

  }





}