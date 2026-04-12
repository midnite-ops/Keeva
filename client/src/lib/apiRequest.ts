import { BACKEND_URL } from "./constants";
import axios from "axios";

export async function apiRequest({ endpoint, method, data }: { endpoint: string; method: string; data?: any }): Promise<any> {
  const url = `${BACKEND_URL}/${endpoint}`;
  const response = await axios({
    url,
    method,
    data,
  })

  return response.data;
}
