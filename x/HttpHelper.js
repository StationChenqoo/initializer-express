const fetch = require("node-fetch");

/**
 * Http Get 请求
 * @param {*} url
 */
const useHttpGet = async (url, params) => {
  const paramsString = (_params) => {
    return Object.keys(_params)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(_params[key])}`
      )
      .join("&");
  };
  let request = await fetch(params ? `${url}?${paramsString(params)}` : url, {
    method: "GET",
  });
  return await request.json();
};

/**
 * Http Post 请求
 * @param url
 * @param body 请事先 JSON.stringify() 转成字符串
 * @returns
 */
const useHttpPost = async (url, body) => {
  let request = await fetch(url, {
    method: "POST",
    body,
  });

  return await request.json();
};

module.exports = {
  useHttpGet,
  useHttpPost,
};
