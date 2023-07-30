// aws3.js
const S3 = require('aws-sdk/clients/s3')

const fs = require('fs')

const uploadParams = { Bucket: process.env.BACKET, Key: '', Body: '' } // <--- заменить

const s3 = new S3({
  accessKeyId: process.env.ACCESS_KEY_ID, // <--- заменить
  secretAccessKey: process.env.SECRET_ACCESS_KEY, // <--- заменить
  endpoint: 'https://s3.timeweb.com',
  s3ForcePathStyle: true,
  region: 'ru-1',
  apiVersion: 'latest',
})


const fileUploadCustom = async (fileName) => {

    const stream = fs.createReadStream('static/' + fileName);

    uploadParams.Body = stream 
    uploadParams.Key = fileName
    const data = await s3.upload(uploadParams).promise()
    return data.Location;

}

module.exports = { fileUploadCustom };






/// Controller to upload image to s3 bucket
 const img = req.files.img;
        const imgName = req.files.img.name;
        const fileName = uuid.v4() + '_' + imgName ;
        await img.mv(path.resolve(__dirname, "..", "static", fileName));
        let fileLocation;
        try{
            fileLocation = await fileUploadCustom(fileName);
        }catch(e){
            return next(
                ApiError.internal(
                    `ERROR:S3_backet ${e.code} + ${e.message}`
                )
            );
        }
        fs.unlink("static/" + fileName, (err => {
            if (err) console.log(err);
            else {
              console.log("\nDeleted file: example_file.txt");
            }}));

            ///