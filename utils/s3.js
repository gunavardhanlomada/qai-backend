const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');



exports.getUploadUrl = async (req, res) => {
  const { filename } = req.query;

  try {

    const s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
      ContentType: 'image/jpeg'
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

    res.json({ url: signedUrl });
  } catch (err) {
    console.error("S3 error:", err);
    res.status(500).json({ error: "Failed to generate upload URL" });
  }
};
