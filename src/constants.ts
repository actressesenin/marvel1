import axios, { InternalAxiosRequestConfig } from "axios";
import md5 from "md5";

export const publicApiKey = "b97b93d96f81fd5e16b3787a5684990f";
export const privateApiKey = "f8b7cadcfcfbef2e0cb258925b9c1268dba5a1bd";
export const baseURL = "/api";

export const api = axios.create({
  baseURL,
});

const getHash = (timestamp: number) => md5(timestamp + privateApiKey + publicApiKey);

api.interceptors.request.use((configuration: InternalAxiosRequestConfig) => {
  const params = configuration.params;
  const timestamp = new Date().getTime();

  return {
    ...configuration,
    params: {
      ...params,
      apikey: publicApiKey,
      hash: getHash(timestamp),
      ts: timestamp,
    },
  };
});
