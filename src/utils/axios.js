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

export default callARK;
