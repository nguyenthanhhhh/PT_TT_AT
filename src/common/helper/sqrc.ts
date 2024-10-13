/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-var */
const CryptoJS = require('crypto-js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const EC = require('elliptic').ec;

// export const PRIVATE_KEY_BUYER =
//   '5a6fac6f1388753de21db08c51356d3f11e484d70d3d41f9ce6e8a2b1c25a5a6';
export const PUBLIC_KEY_BUYER =
  '04b0bdb1584c045a88abb0fd43b314e4b93d0bafb23c1b3a41ef8ea725bf42bc7d7c6d45f29aeeab03dcaf2f2a314a0c26dfaadcfb3f147fbc5e79f738f36b7965';

export const PRIVATE_KEY_MERCHANT =
  '674160e4cfc95956c40a4d514bf439d2ca873f2109480f312d66945795c9fa47';
export const PUBLIC_KEY_MERCHANT =
  '04c32dbe05bdd35cb1e0acf5d8612c21d20dd73bf0b77aa5fb5c1d12fe9ca86d7deb6797524f2ca5c9a5bee517574fc76f14e4edce025a4b50e63f4512b6d42d91';

// Hàm giải mã private data
// const decryptPrivateData = (encryptedData) => {
//   const decodedData = Base64.decode(encryptedData); // Giải mã base64
//   const bytes = CryptoJS.AES.decrypt(decodedData, SECRET_KEY);
//   return bytes.toString(CryptoJS.enc.Utf8); // Trả về dữ liệu gốc
// };

export const hashData = (data) => {
  const dataString = JSON.stringify(data);
  const dataMD = CryptoJS.SHA256(dataString).toString();
  return dataMD;
};

// Hàm xác thực chữ ký
const verifySignature = (
  data: { PIMD: string; OI_data: string },
  signature: string,
) => {
  const ec = new EC('secp256k1');
  const key = ec.keyFromPublic(PUBLIC_KEY_BUYER, 'hex');

  const dataString = typeof data === 'object' ? JSON.stringify(data) : data;
  const hashedData = hashData(dataString);

  return key.verify(hashedData, signature);
};

// Hàm kiểm tra tính toàn vẹn dữ liệu
export const validateData = ({ PIMD, OI, signature }: any) => {
  try {
    const H = {
      PIMD,
      OI_data: OI,
    };

    const isSignatureValid = verifySignature(H, signature);

    return isSignatureValid;
  } catch (error) {
    console.log('Error validating data', error);
  }
};

export const signData = (data: any) => {
  const ec = new EC('secp256k1');
  const key = ec.keyFromPrivate(PRIVATE_KEY_MERCHANT);

  const dataString = typeof data === 'object' ? JSON.stringify(data) : data;
  // Băm dữ liệu
  const hashedData = hashData(dataString);

  const signature = key.sign(hashedData).toDER('hex');
  return signature;
};
