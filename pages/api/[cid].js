import { connectToDatabase,insertDocument,getAllComments } from '../../utility/db-util'
const commentHandler=async(req,res)=>{
    const {cid}=req.query
    if (req.method==="POST") {
        const comments={
            eventId:cid,
            email:req.body.email,
            name:req.body.name,
            comment:req.body.comment
        }
        if (!comments.email || !comments.email.includes("@") || !comments.comment || !comments.name || comments.name.trim()==='' || comments.comment.trim()==='' ) {
            res.status(422).json({error:"All inputs are required"})
        }
        let client;
        try {
         client = await connectToDatabase('comments')
        } catch (error) {
            res.status(500).json({"message":"Connecting to database failed"})
            return
        }
        try {
            await insertDocument(client,"usercomments",comments)
            client.close()
        } catch (error) {
            res.status(500).json({"message":"Inserting data failed!"})
            return
        }
        res.status(200).json({comment:comments})
    }
    if (req.method==="GET") {
        let client
        try {
            client = await connectToDatabase('comments')
        } catch (error) {
            res.status(500).json({"message":"Connecting to database failed"})
            return
        }
        let documents
        try {
            documents =await getAllComments(client,"usercomments")
            client.close();
        } catch (error) {
            res.status(500).json({"message":"Getting data failed!"})
            return
        }
        const filteredDocs = documents.filter((document)=>{return document.eventId===cid})
        console.log(filteredDocs)
        res.status(200).json(filteredDocs)

    }


    

}
export default commentHandler