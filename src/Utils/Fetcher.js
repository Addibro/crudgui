import servers from "./serversMock.json";
const baseURL = "http://10.210.59.20";
const webserverURL = "http://10.210.59.20:10086/web/services/webserv";
const swaggerDirURL = "http://10.210.59.20:10086/swaggers/";

const Fetcher = () => {
  const authorize = (username, password) =>
    fetch(`${webserverURL}/validate/${username}/${password}`);

  const getWebservers = () =>
    fetch(`${webserverURL}/getAll`).then(res => res.json());

  const getWebserverInfo = webserver =>
    fetch(`${webserverURL}/${webserver}`).then(res => res.json());

  const getWebservices = webserver =>
    fetch(`${webserverURL}/services/${webserver}`).then(res => res.json());

  const prepareSwagger = (webserver, webservice) =>
    fetch(`${webserverURL}/meta/${webserver}/${webservice}`).then(res =>
      res.json()
    );

  const getSwagger = (webserver, webservice) =>
    fetch(`${swaggerDirURL}${webserver}_${webservice}.json`).then(res =>
      res.json()
    );

  const doGetMethod = (url, signal) => fetch(url, { signal: signal });

  const doPostMethod = (url, signal) => {
    return Promise.reject("Not implemented");
  };
  const doPutMethod = () => {
    return Promise.reject("Not implemented");
  };
  const doDelMethod = () => {
    return Promise.reject("Not implemented");
  };

  return {
    getWebservers: getWebservers,
    getWebserverInfo: getWebserverInfo,
    getWebservices: getWebservices,
    getSwagger: getSwagger,
    authorize: authorize,
    prepareSwagger: prepareSwagger,
    AbortController: AbortController,
    doGetMethod: doGetMethod,
    doPutMethod: doPutMethod,
    doPostMethod: doPostMethod,
    doDelMethod: doDelMethod,
    baseURL: baseURL
  };
};

export default Fetcher();
