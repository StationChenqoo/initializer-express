var CryptoJS = require("crypto-js");
var nanoid = require("nanoid");

class StringUtils {
  /**
   * 定义加密函数
   * http://tool.chacuo.net/cryptaes
   * @param {string} data - 需要加密的数据, 传过来前先进行 JSON.stringify(data);
   * @param {string} key - 加密使用的 key，必须是 128->16位 | 192->24位 | 256->32位
   */
  static encode = (data) => {
    /**
     * CipherOption, 加密的一些选项:
     *   mode: 加密模式, 可取值(CBC, CFB, CTR, CTRGladman, OFB, ECB), 都在 CryptoJS.mode 对象下
     *   padding: 填充方式, 可取值(Pkcs7, AnsiX923, Iso10126, Iso97971, ZeroPadding, NoPadding), 都在 CryptoJS.pad 对象下
     *   iv: 偏移量, mode === ECB 时, 不需要 iv
     * 返回的是一个加密对象
     */

    // return CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key ?? AES_KEY), {
    //   mode: CryptoJS.mode.ECB,
    //   padding: CryptoJS.pad.Pkcs7,
    // }).ciphertext.toString(CryptoJS.enc.Base64);
    return CryptoJS.AES.encrypt(
      data,
      CryptoJS.enc.Utf8.parse("@net.cctv3.xAPIs"),
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    ).ciphertext.toString(CryptoJS.enc.Base64);
  };

  /**
   * 定义解密函数
   * @param {string} encrypted - 加密的数据;
   * @param {string} key - 加密使用的 key
   */
  static decode = (encrypted) => {
    // 这里 mode, padding, iv 一定要跟加密的时候完全一样
    // 返回的是一个解密后的对象
    const decipher = CryptoJS.AES.decrypt(
      encrypted,
      CryptoJS.enc.Utf8.parse("@net.cctv3.xAPIs"),
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    // 将解密对象转换成 UTF8 的字符串
    return CryptoJS.enc.Utf8.stringify(decipher);
  };

  /**
   * 是否有效手机号
   * @param {*} s
   * @returns
   */
  static isPhone = (s) => /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(s);

  /**
   * 短信验证码
   * @param {*} s
   */
  static buildSmsCode = () =>
    Array.from({ length: 6 }, (_, i) => Math.floor(Math.random() * 9)).join("");

  /**
   * ID ...
   * @returns
   */
  static buildNanoid = () => nanoid.nanoid();
}

module.exports = {
  StringUtils,
};
