import btoa from "btoa";
import serverInfo from "./serverInfoMock.json";
import webservers from "./serversMock.json";
const webserverURL = "http://10.210.59.20:10086/web/services/webserv";
let auth;

const Fetcher = () => {
  const validate = (username, password) => {};

  const getWebservers = () => fetch(`${webserverURL}/getAll`);

  const getWebserverInfo = webserver => fetch(`${webserverURL}/${webserver}`);

  const getWebservices = webserver =>
    fetch(`${webserverURL}/services/${webserver}`);

  const getMeta = (webserver, webservice) =>
    fetch(`${webserverURL}/meta/${webserver}/${webservice}`);

  const setAuth = (username, password) =>
    (auth = {
      method: "GET",
      headers: { Authorization: "Basic " + btoa(`${username}:${password}`) }
    });

  return {
    getWebservers: getWebservers,
    getWebserverInfo: getWebserverInfo,
    getWebservices: getWebservices,
    validate: validate,
    getMeta: getMeta,
    setAuth: setAuth
  };
};

export default Fetcher();
