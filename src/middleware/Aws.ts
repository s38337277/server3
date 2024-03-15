import { Router } from "express";
import multer from "multer";

import { uploadFileToS3 } from "../aws/s3";

const AWS_Route = Router()

const upload = multer()

AWS_Route.post('/put_object', upload.single('imagen'), async (req, res) => {

    try {

        
        if (req.file) {
            let {  mimetype, buffer,fieldname } = req.file
            const element =fieldname.concat(`_${new Date().toString()}`)

            let process = await uploadFileToS3(buffer, element, mimetype)

            return res.status(200).json(process)
        }

        throw "not files"

    } catch (error) {
        console.log(error)
        return res.status(400).json("https://i.pinimg.com/564x/48/8c/7f/488c7f0fb8f6b046889775edaa5a6fa1.jpg")
    }


})


export default AWS_Route