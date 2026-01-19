const ARK_url = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";
const API_KEY = import.meta.env.VITE_LLM_API_KEY;
const modelID = "ep-20250228235752-vn47c"; // ds-r1轻量模型
const modelID_dsR1 = "ep-20250211234356-5f5xr"; // ds-r1满血模型
const doubaoID_lite = "ep-20250413170759-9zgsl"; //豆包
const glm_model = "ep-20260119234415-cd6tr"; //GLM-4.7

export {
  // 选择模型
  glm_model,
  // 选择url
  ARK_url,
  // 选择apiKey
  API_KEY,
};
