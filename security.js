const crypto = require('crypto');

const secretKey = process.env.SECRET_KEY;
const accessKey = process.env.ACCESS_KEY;
const profileId = process.env.HCP_PROFILE_ID;

function sign(params) {
 
  const signedFieldNames = params.signed_field_names.split(',');
  const dataToSign = signedFieldNames.map(field => `${field}=${params[field]}`).join(',');
  return crypto.createHmac('sha256', secretKey).update(dataToSign).digest('base64');
}

function getAccessKey() {
  return accessKey;
}

function getProfileId() {
  return profileId;
}

function signData(data, secretKey) {
  return crypto.createHmac('sha256', secretKey).update(data).digest('base64');
}

function buildDataToSign(params) {
  if (!params.signed_field_names) {
    throw new Error('Missing signed_field_names in parameters');
  }
  const signedFieldNames = params.signed_field_names.split(',');
  return signedFieldNames.map(field => `${field}=${params[field]}`).join(',');
}

function commaSeparate(dataToSign) {
  return dataToSign.join(',');
}

function verifySignature(req, res, next) {
  // implement verification logic
  next();
}

module.exports = {
  sign,
  getAccessKey,
  getProfileId,
  signData,
  buildDataToSign,
  commaSeparate,
  verifySignature
};
