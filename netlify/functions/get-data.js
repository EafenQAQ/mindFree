const axios = require("axios");

exports.handler = async (event, context) => {
  // 1. 直接从环境变量读取密钥，这些变量在前端是不可见的
  const apiKey = process.env.API_KEY;
  const url = process.env.API_URL;
  // 2. 获取前端要转发的数据
  const requestBody = JSON.parse(event.body);
  try {
    // 3. 代理转发
    const res = await axios.post(url, requestBody, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
