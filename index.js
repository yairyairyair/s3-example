require('dotenv').config()
const AWS = require('aws-sdk');

const main = async () => {
    const s3 = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        endpoint: process.env.BUCKET_HOST,
        params: {
            Bucket: process.env.BUCKET_NAME,
        },
        s3ForcePathStyle: true,
    })

    const uploadedImage = await s3.upload({
        // this the filename on the bucket
        Key: 'example-text.txt',
        Body: 'some content, can be text or binary or whatever',
        // can add here content type, it should affect whether browser shows or downloads the object
        // can also take it from req.headers['Content-Type']
        ContentType: 'text/plain',
        // public or private access url
        ACL: 'public-read',
        // ACL: 'private',
    }).promise();

    console.log(uploadedImage.Location)
}

main();
