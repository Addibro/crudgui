const baseURL = "http://10.210.59.20";
const webserverURL = "http://10.210.59.20:10086/web/services/webserv";
const swaggerDirURL = "http://10.210.59.20:10086/swaggers/";

const Fetcher = () => {
  const authorize = (username, password) =>
    fetch(`${webserverURL}/validate/${username}/${password}`);

  const getWebservers = () => fetch(`${webserverURL}/getAll`);

  const getWebserverInfo = webserver =>
    fetch(`${webserverURL}/${webserver}`).then(res => res.json());

  const getWebservices = webserver =>
    fetch(`${webserverURL}/services/${webserver}`).then(res => res.json());

  const prepareSwagger = (webserver, webservice) =>
    fetch(`${webserverURL}/meta/${webserver}/${webservice}`).then(res =>
      res.json()
    );

  const getSwagger = (webserver, webservice) =>
    fetch(`${swaggerDirURL}${webserver}_${webservice}.json`);

  const doGetMethod = (url, signal) => fetch(url, { signal: signal });

  const doPostMethod = (url, signal, body) =>
    fetch(url, {
      signal: signal,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

  const doPutMethod = (url, signal, body) =>
    fetch(url, {
      signal: signal,
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

  const doDelMethod = (url, signal) =>
    fetch(url, {
      signal: signal,
      method: "DELETE"
    });

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
