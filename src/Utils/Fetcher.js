import servers from "./serversMock.json";
const baseURL = "http://10.210.59.20";
const webserverURL = "http://10.210.59.20:10086/web/services/webserv";
const swaggerDirURL = "http://10.210.59.20:10086/swaggers/";

const Fetcher = () => {
  const AbortController = window.AbortController;

  const authorize = (username, password) =>
    fetch(`${webserverURL}/validate/${username}/${password}`);

  const getWebservers = () =>
    fetch(`${webserverURL}/getAll`, { signal: AbortController.signal }).then(
      res => res.json()
    );

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

  const doGetMethod = (port, basePath, template, parameters, reference) =>
    // TODO correct path
    fetch(`${baseURL}:${port}${basePath}/select/999/0/a`).then(res =>
      res.json()
    );

  const doPostMethod = () => {
    return new Promise.reject("Not implemented");
  };
  const doPutMethod = () => {
    return new Promise.reject("Not implemented");
  };
  const doDelMethod = () => {
    return new Promise.reject("Not implemented");
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
    doDelMethod: doDelMethod
  };
};

export default Fetcher();
