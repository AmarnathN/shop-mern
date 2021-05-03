const aws = require("aws-sdk");
const fs = require("fs");

const setAwsConfig = () => {
  aws.config.setPromisesDependency();
  aws.config.update({
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.REGION,
  });
};

const getS3Object = () => {
  setAwsConfig();
  return new aws.S3();
};

const s3FileUpload = (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `productImages/${req.file.originalname}`,
    Body: req.file.buffer,
  };

  return getS3Object()
    .upload(params)
    .promise()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

module.exports = s3FileUpload;
