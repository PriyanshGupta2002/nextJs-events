import {MongoClient} from 'mongodb'

export const connectToDatabase=async(db)=>{
    const client = await MongoClient.connect(`mongodb+srv://PriyanshGupta:UKtVmqc3vEPIzuJz@cluster0.iv9bk.mongodb.net/${db}?retryWrites=true&w=majority`)
    return client
  }
  export const insertDocument=async(client,collections,document)=>{
    const db =  client.db()
 await db.collection(collections).insertOne(document)
  }
  export const getAllComments=async(client,collections)=>{
    const db = client.db()
    const documents =await db.collection(collections).find().sort({_id:-1}).toArray()
    console.log(documents)
    return documents
  }