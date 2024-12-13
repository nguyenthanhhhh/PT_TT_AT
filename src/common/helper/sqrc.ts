/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
/* eslint-disable no-var */
const CryptoJS = require('crypto-js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const EC = require('elliptic').ec;

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
  // Khởi tạo đối tượng elliptic curve (đường cong elip) sử dụng thuật toán 'secp256k1'
  const ec = new EC('secp256k1');

  // Lấy khóa công khai từ phía người mua để xác minh chữ ký
  const key = ec.keyFromPublic(process.env.PUBLIC_KEY_BUYER, 'hex');
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
  const key = ec.keyFromPrivate(process.env.PRIVATE_KEY_MERCHANT);

  const dataString = typeof data === 'object' ? JSON.stringify(data) : data;
  // Băm dữ liệu
  const hashedData = hashData(dataString);

  const signature = key.sign(hashedData).toDER('hex');
  return signature;
};

export function differenceInMinutes(date1: Date, date2: Date): number {
  const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime()); // Tính chênh lệch thời gian bằng milliseconds
  const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60); // Chuyển đổi sang phút
  return diffInMinutes;
}
