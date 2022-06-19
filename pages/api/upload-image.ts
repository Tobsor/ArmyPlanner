import aws from 'aws-sdk'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb"
    }
  }
}

export default async function handler(req, res) {
  try {
    const s3 = new aws.S3({
      region: process.env.APP_AWS_REGION,
      accessKeyId: process.env.APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.APP_AWS_SECRET_KEY,
      signatureVersion: "v4",
    });

    if(req.method !== "POST"){
      return res.status(405).json({message: "Method not allowerd"});
    }

    // 3. 
    const post = await s3.createPresignedPost({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Fields: {
        key: req.query.file,
      },
      Expires: 60, // seconds
    })

    // 4. 
    return res.status(200).json(post)
  } catch (error) {
    console.log(error)
  }
}