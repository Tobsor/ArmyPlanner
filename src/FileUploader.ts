import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: process.env.APP_AWS_REGION,
  accessKeyId: process.env.APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.APP_AWS_SECRET_KEY,
  signatureVersion: "v4",
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb"
    }
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== "POST"){
    return res.status(405).json({message: "Method not allowerd"});
  }


  try{
    let {name, type} = req.body;

    const fileParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: name,
      Expires: 600,
      ContentType: type,
      ACL: "public-read",
    }

    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    res.status(200).json({ url });
  } catch(err) {
    console.error(err);
    res.status(400).json({ message: err });
  }
}