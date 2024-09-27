import { ConfigModule } from '@nestjs/config';
// import CryptoJS from 'crypto-js';

export function loadConfig() {
  return ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: process.env.NODE_ENV,
  });
}

// const secretKey = 'your-secret-key'; // Khóa bí mật của bạn
// const iv = CryptoJS.lib.WordArray.random(16); // Vector khởi tạo ngẫu nhiên (IV)

// // Hàm mã hóa
// export const encrypt = (text) => {
//   const encrypted = CryptoJS.AES.encrypt(
//     text,
//     CryptoJS.enc.Utf8.parse(secretKey),
//     {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     },
//   );

//   // Kết hợp IV và ciphertext để gửi cho frontend
//   return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
// };

// // Hàm giải mã
// export const decrypt = (cipherText) => {
//   // Chuyển từ Base64 sang WordArray
//   const cipherParams = CryptoJS.enc.Base64.parse(cipherText);

//   // Tách IV và dữ liệu đã mã hóa
//   const iv = CryptoJS.lib.WordArray.create(cipherParams.words.slice(0, 4)); // 16 byte IV
//   const encryptedText = CryptoJS.lib.WordArray.create(
//     cipherParams.words.slice(4),
//   );

//   const decrypted = CryptoJS.AES.decrypt(
//     { ciphertext: encryptedText },
//     CryptoJS.enc.Utf8.parse(secretKey),
//     {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     },
//   );

//   return decrypted.toString(CryptoJS.enc.Utf8);
// };
