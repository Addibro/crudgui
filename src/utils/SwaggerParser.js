const SwaggerParser = () => {
  const getDefinitions = swagger => {};
  const getPaths = swagger => {
    const paths = Object.keys(swagger.paths);
    let pathsArray = [];
    for (let i = 0; i < paths.length; i++) {
      let obj = {};
      obj.path = paths[i];
      let method = Object.keys(swagger.paths[paths[i]]).toString();
      obj.method = method;
      obj.parameters = swagger.paths[paths[i]][method].parameters;
      pathsArray.push(obj);
    }
    return pathsArray;
  };
  return { getDefinitions: getDefinitions, getPaths: getPaths };
};

export default SwaggerParser();
