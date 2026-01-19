import axios from "axios";
import { API_KEY } from "../api/ARK_API";

const callARK = axios.create({
  baseURL: "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
  timeout: 40000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const call_big_model = axios.create({
  baseURL: "https://open.bigmodel.cn/api/paas/v4/",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export { callARK, call_big_model };
