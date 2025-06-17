import aws from 'aws-sdk'




export const uploadFile = async (file: Buffer, key: string): Promise<string> => {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  })

  const s3 = new aws.S3()
    const params = {
      Bucket: process.env.BUCKETNAME||'learnhubbucket',
      Key: key,
      Body: file,
      ACL: 'public-read'
    };

  try {
    const res = await s3.upload(params).promise();
    console.log('Uploaded in:', res.Location);
    return res.Location;
  } catch (err) {
    console.log('Failed to upload:', err);
    throw err;
  }
};
