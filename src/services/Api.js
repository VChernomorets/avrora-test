import axios from "axios";
import store from '@/store'

const api = axios.create({
  baseURL: `${process.env.VUE_APP_API}/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const locale = 'ua';
  if(locale) {
    config.headers["Content-Language"] = locale;
  }

  if (token) {
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
  } else {
    delete config.headers["Authorization"];
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    let logout = false;

    if (!!error.config.url && error.config.url.indexOf("auth/logout") > -1) {
      logout = true;
    }

    if (!!error.response && !!error.response.status) {
      switch (error.response.status) {
        case 401:
          store.dispatch("clearToken");
          if (logout)
            document.location.href =
              process.env.NODE_ENV == "production"
                ? `${process.env.VUE_APP_PROD}`
                : `${process.env.VUE_APP_DEV}`;
          else {
            store.dispatch('goToAuthPage');
          }
          break;
        // case 500:
        //   console.log('500')
        //   break
        // case 404:
        //   console.log('404')
        //   break
      }
      return Promise.reject(error);
    }
  }
);

export default () => {
  return api;
};
