import btoa from "btoa";
const webserverURL = "http://10.210.59.20:10086/web/services/webserv";
let auth;

const Fetcher = () => {
  const getWebservers = () => fetch(`${webserverURL}/getAll`, auth);

  const getWebserverInfo = webserver =>
    fetch(`${webserverURL}/${webserver}`, auth);

  const getWebservices = webserver =>
    fetch(`${webserverURL}/services/${webserver}`, auth);

  const getMeta = (webserver, webservice) =>
    fetch(`${webserverURL}/meta/${webserver}/${webservice}`, auth);

  const setAuth = (username, password) =>
    (auth = {
      method: "GET",
      headers: { Authorization: "Basic " + btoa(`${username}:${password}`) }
    });

  return {
    getWebservers: getWebservers,
    getWebserverInfo: getWebserverInfo,
    getWebservices: getWebservices,
    getMeta: getMeta,
    setAuth: setAuth
  };
};

export default Fetcher();
