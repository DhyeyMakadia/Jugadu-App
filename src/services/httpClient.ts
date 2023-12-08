import axios, { AxiosResponse } from "axios";
import environment from "src/environment";
import Cookies from "js-cookie";
import { StatusCode } from "src/utils/constants";

const httpClient = axios.create({
  baseURL: environment.apiUrl, // url = base url + request url
  timeout: 12400000,
  responseType: "json",
});

let requests: string[] = [];
let conflictRequest: string = "";

function showLoader() {
  document.body.classList.add("loader-open");
}

function hideLoader() {
  document.body.classList.remove("loader-open");
}

function signOut() {
  Cookies.remove("auth_token");
  window.location.reload();
}

// Request interceptors Customize based on your need
httpClient.interceptors.request.use(
  async (config) => {
    if (config.headers && !config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    // config.headers["ngrok-skip-browser-warning"] = "69420";

    if (config?.url) {
      requests.push(config?.url);
      showLoader();
    }

    const authToken = Cookies.get("auth_token");

    if (authToken && config.headers) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptors Customize based on your need
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    removeRequest(response?.config?.url as string);
    if (data?.code && data?.code !== StatusCode.Success) {
      return Promise.reject(new Error(data.message || "Error"));
    } else {
      return Promise.resolve(response);
    }
  },
  async (error) => {
    removeRequest(error?.config?.url);
    switch (error?.response?.status) {
      // Authorization Failed Response can add other status codes here to manage error Logging
      case StatusCode.Forbidden:
        break;
      case StatusCode.Unauthorized:
        if (error?.config?.url !== "auth/login") {
          signOut();
        }
        break;
      case StatusCode.Conflict: // conflicts with existing record.
        conflictRequest = error.response.config.url;
        return Promise.resolve(error.response);
      case StatusCode.BadRequest:
        return Promise.resolve(error.response);
      case StatusCode.InternalServer:
        return Promise.resolve(error.response);
      default:
        break;
    }
    return Promise.reject(error);
  }
);

// remove completed request
function removeRequest(req: string) {
  const i = requests.indexOf(req);
  if (i >= 0) {
    requests.splice(i, 1);
  }
  if (requests.length > 0) {
    showLoader();
  } else {
    hideLoader();
  }
  if (req === conflictRequest) {
    conflictRequest = "";
    requests = requests.filter((request) => request !== req);
  }
}

export default httpClient;
