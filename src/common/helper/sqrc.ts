/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-var */
const CryptoJS = require('crypto-js');
import { Base64 } from 'js-base64';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const EC = require('elliptic').ec;

export const PUBLIC_KEY =
  '04624666a95f14576337b808df707ed678a1fab0d43629f01b901efe4e820db97b31e65893b4c164670e22fa7b92882b80fd0a69c81be8fd921ade2371c75b8d8d';
export const PRIVATE_KEY =
  '37f47579fc9c270d24e87117a52aa3e79927e9085c41c55f663a0444cddbb17b';
export const SECRET_KEY =
  '8e6dd35dc0bc5b359af904e8f1c6a5a4d1ce349ebbc012e4dae3a614a49fe430';

// Hàm giải mã private data
const decryptPrivateData = (encryptedData) => {
  const decodedData = Base64.decode(encryptedData); // Giải mã base64
  const bytes = CryptoJS.AES.decrypt(decodedData, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8); // Trả về dữ liệu gốc
};

// Hàm xác thực chữ ký
const verifySignature = (
  publicData: string, // Đảm bảo rằng bạn đã định nghĩa đúng kiểu dữ liệu
  encryptedPrivateData: string,
  signature: string,
) => {
  const ec = new EC('secp256k1'); // Khởi tạo elliptic curve

  const key = ec.keyFromPublic(PUBLIC_KEY, 'hex'); // PUBLIC_KEY cần phải là một chuỗi hex hợp lệ
  const data = publicData + encryptedPrivateData; // Ghép publicData và encryptedPrivateData lại
  return key.verify(data, signature); // Xác thực chữ ký
};

// Hàm kiểm tra SQRC
export const validateSQRC = ({
  publicData,
  encryptedPrivateData,
  signature,
}: any) => {
  try {
    // Xác thực chữ ký số
    const isSignatureValid = verifySignature(
      publicData,
      encryptedPrivateData,
      signature,
    );
    if (!isSignatureValid) {
      return undefined;
    }

    // Giải mã private data
    const originalPrivateData = decryptPrivateData(encryptedPrivateData);

    return originalPrivateData;
  } catch (error) {
    console.log('Error validating SQRC', error);
  }
};
