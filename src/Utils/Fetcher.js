import servers from "./serversMock.json";
const webserverURL = "http://10.210.59.20:10086/web/services/webserv";
const swaggerDirURL = "http://10.210.59.20:10086/swaggers/";

const Fetcher = () => {
  const AbortController = window.AbortController;

  const authorize = (username, password) =>
    fetch(`${webserverURL}/validate/${username}/${password}`);

  const getWebservers = () =>
    fetch(`${webserverURL}/getAll`, { signal: AbortController.signal }).then(
      response => response.json()
    );

  const getWebserverInfo = webserver =>
    fetch(`${webserverURL}/${webserver}`).then(response => response.json());

  const getWebservices = webserver =>
    fetch(`${webserverURL}/services/${webserver}`).then(response =>
      response.json()
    );

  const prepareSwagger = (webserver, webservice) =>
    fetch(`${webserverURL}/meta/${webserver}/${webservice}`).then(response =>
      response.json()
    );

  const getSwagger = (webserver, webservice) =>
    fetch(`${swaggerDirURL}${webserver}_${webservice}.json`).then(response =>
      response.json()
    );

  return {
    getWebservers: getWebservers,
    getWebserverInfo: getWebserverInfo,
    getWebservices: getWebservices,
    getSwagger: getSwagger,
    authorize: authorize,
    prepareSwagger: prepareSwagger,
    AbortController: AbortController
  };
};

export default Fetcher();
