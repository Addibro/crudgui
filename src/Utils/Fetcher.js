import servers from "./serversMock.json";
const webserverURL = "http://10.210.59.20:10086/web/services/webserv";

const Fetcher = () => {
  const AbortController = window.AbortController;

  const authorize = (username, password) =>
    fetch(`${webserverURL}/validate/${username}/${password}`);

  const getWebservers = () =>
    fetch(`${webserverURL}/getAll`, { signal: AbortController.signal });

  const getWebserverInfo = webserver => fetch(`${webserverURL}/${webserver}`);

  const getWebservices = webserver =>
    fetch(`${webserverURL}/services/${webserver}`);

  const getMeta = (webserver, webservice) =>
    fetch(`${webserverURL}/meta/${webserver}/${webservice}`);

  const getJsonFromResponse = response => response.json();
  return {
    getWebservers: getWebservers,
    getWebserverInfo: getWebserverInfo,
    getWebservices: getWebservices,
    authorize: authorize,
    getMeta: getMeta,
    getJsonFromResponse: getJsonFromResponse,
    AbortController: AbortController
  };
};

export default Fetcher();
