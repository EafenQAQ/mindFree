import axios from "axios";
import { API_KEY, ARK_url } from "./chooseModel";

const callARK = axios.create({
  baseURL: ARK_url,
  timeout: 40000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export { callARK };
