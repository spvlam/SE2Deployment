const multer = require("multer")
const  { initializeApp } = require("firebase/app")
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage")
const {giveCurrentDateTime} = require('../../utils/helper')
const {appFB} = require('../../config/StorageCloud/firebase')

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(appFB);
// Setting up multer as a middleware to grab photo uploads
const Product = require('../../model/productTable')
class ProductCloudController{
    async  uploadImage(req,res,next) {
        try {
          
            const dateTime = giveCurrentDateTime();
            const storageRef = ref(storage, `files/${req.file.originalname + "" + dateTime}`);
            // Create file metadata including the content type
            const metadata = {
                contentType: req.file.mimetype,
            };
            // Upload the file in the bucket storage
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
            //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
    
            // Grab the public url
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log('File successfully uploaded.');
            let  [affectedRows]  = await Product.update({image:downloadURL}, { where: { id: req.body.id }})
            return res.status(200).send({
                message: 'file uploaded to firebase storage',
                name: req.file.originalname,
                type: req.file.mimetype,
                downloadURL: downloadURL
            })
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }
}

module.exports = new ProductCloudController()