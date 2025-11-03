const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { uuid } = require('uuidv4');

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

exports.getUploadUrl = async (fileType) => {
  const key = `products/${uuid()}.${fileType}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    ContentType: `image/${fileType}`,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 mins

  return { url, key };
};
