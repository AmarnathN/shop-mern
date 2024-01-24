const aws = require("aws-sdk");
const fs = require("fs");
const moment = require("moment");
const setAwsConfig = () => {
  aws.config.setPromisesDependency();
  aws.config.update({
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    accessKeyId: process.env.MY_AWS_ACCESS_KEY,
    region: process.env.MY_REGION,
    signatureVersion: "v4",
  });
};

const getS3Object = () => {
  setAwsConfig();
  return new aws.S3();
};

const s3FileUpload = (req, res) => {
  let key = `${req.filePathPrefix}/${moment().format("MMDDYYYY_hhmmSSSS_")}${req.file.originalname}`;
  const params = {
    Bucket: `${process.env.AWS_BUCKET_NAME}`,
    Key: key,
    Body: req.file.buffer,
    Expires: 100,
    ACL: "public-read",
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

const s3GetSignedUrl = async (fileName) => {
  const splitByString = ".amazonaws.com/";
  try {
    return new Promise((resolve, reject) => {
      let uploadedFileName = fileName.split(splitByString)[1];
      const params = {
        Bucket: `${process.env.AWS_BUCKET_NAME}`,
        Key: uploadedFileName,
        Expires: Number.parseInt(process.env.SIGNED_URL_TIMEOUT),
      };
      getS3Object().getSignedUrl("getObject", params, (err, url) => {
        if (err) {
          reject(err);
        }
        resolve(url);
      });
    });
  } catch (err) {
    return Promise.reject(err.message);
  }
};

const s3FileDelete = (req, res) => {
  // expecting common S3 file naming format would be "https://shop-mern-staging.s3.amazonaws.com/.*
  const splitByString = ".amazonaws.com/";
  try {
    let deleteFileName = req.deleteFileName.split(splitByString)[1];
    const params = {
      Bucket: `${process.env.AWS_BUCKET_NAME}`,
      Key: deleteFileName,
    };

    return getS3Object()
      .deleteObject(params)
      .promise()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return Promise.reject(err.message);
      });
  } catch (err) {
    return Promise.reject(err.message);
  }
};
module.exports = { s3FileUpload, s3FileDelete, s3GetSignedUrl };
