const AWS = require('aws-sdk'); // eslint-disable-line

const s3 = new AWS.S3();
const Bucket = 'bspkfy-vocabulary';
const bucketUrl = `http://${Bucket}.s3.amazonaws.com`;

async function upload(name, buffer) {
  const params = {
    Bucket,
    Key: name,
    Body: buffer,
  };
  return new Promise((resolve, reject) => {
    s3.putObject(params, (err) => {
      if (err) {
        reject(err);
      }
      resolve(`${bucketUrl}/${name}`);
    });
  });
}

module.exports = { upload };