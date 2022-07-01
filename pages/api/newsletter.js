import { insertDocument,connectToDatabase } from "../../utility/db-util"

const newsletter=async(req,res)=>{
  if (req.method==="POST") {
    const newInputNewsletter= {
      "email":req.body.email    
    }
    if (!newInputNewsletter.email || !newInputNewsletter.email.includes("@")) {
      res.status(422).json({error:"Invalid email"})
      return
    }
    let client
    try {
      client =await connectToDatabase("newsletter")
    } catch (error) {
      res.status(500).json({"message":"Connecting to database failed"})
      return
    }

    try {
      await insertDocument(client,"emails",newInputNewsletter)
      client.close()
    } catch (error) {
      res.status(500).json({"message":"Inserting data failed!"})
      return
    }
    res.status(200).json({"success":"Successfully signed up"})
  }
}
export default newsletter