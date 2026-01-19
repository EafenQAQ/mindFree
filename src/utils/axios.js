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

const callProxy = axios.create({
  baseURL: "/.netlify/functions/get-data",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { callARK, callProxy };
