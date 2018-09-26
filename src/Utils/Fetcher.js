import axios from "axios";
const webserverURL = "http://10.210.59.20:10086/web/services/webserv";

const Fetcher = () => {
  const getWebservers = () => axios.get(`${webserverURL}/getAll`);

  const getWebserverInfo = webserver =>
    axios.get(`${webserverURL}/${webserver}`);

  const getWebservices = webserver =>
    axios.get(`${webserverURL}/services/${webserver}`);

  const getMeta = (webserver, webservice) =>
    axios.get(`${webserverURL}/meta/${webserver}/${webservice}`);

  return {
    getWebservers: getWebservers,
    getWebserverInfo: getWebserverInfo,
    getWebservices: getWebservices,
    getMeta: getMeta
  };
};

export default Fetcher;
