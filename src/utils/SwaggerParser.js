const SwaggerParser = () => {
  const getDefinitions = swagger => {
    return Object.keys(swagger.definitions).map(def => {
      let defObj = {};
      defObj.definition = def;
      let properties = swagger.definitions[def].properties;
      defObj.properties = Object.keys(properties).map(prop => {
        let propObj = {};
        propObj.name = prop;
        let keys = Object.keys(properties[prop]);
        let values = Object.values(properties[prop]);
        keys.forEach((key, k) => (propObj[key] = values[k]));
        return propObj;
      });
      return defObj;
    });
  };

  const getDefinitionProperties = (swagger, def) => {
    return Object.keys(def.properties).map(prop => {
      let definitions = Object.assign({}, swagger.definitions);
      let propObj = {};
      propObj.name = prop;
      if (def.properties[prop].$ref) {
        propObj.parameters = getDefinitionProperties(
          swagger,
          definitions[def.properties[prop].$ref.slice(14)]
        );
      }
      propObj.type = def.properties[prop].type;
      propObj.maxItems = def.properties[prop].maxItems;
      propObj.maxLength = def.properties[prop].maxLength;
      if (def.properties[prop].items) {
        propObj.parameters = getDefinitionProperties(
          swagger,
          definitions[def.properties[prop].items.$ref.slice(14)]
        );
      }
      return propObj;
    });
  };

  const getPaths = swagger => {
    return Object.keys(swagger.paths).map(path => {
      let pathCopy = Object.assign({}, swagger.paths[path]);
      let pathObj = {};
      pathObj.path = path; // "/{name}/{born}"
      let method = Object.keys(pathCopy).toString(); // "get"
      pathObj.method = method;
      pathObj.name = pathCopy[method].operationId; // "GETAGE"
      if (pathCopy[method].parameters.length) {
        pathObj.query = pathCopy[method].parameters[0].in; // "query"
        if (pathObj.query === "body") {
          let postReference = pathCopy[method].parameters[0].schema.$ref.slice(
            14
          );
          pathObj.parameters = getDefinitionProperties(
            swagger,
            swagger.definitions[postReference]
          );
        } else {
          pathObj.parameters = pathCopy[method].parameters;
        }
      } else {
        pathObj.parameters = [];
      }
      pathObj.reference = pathCopy[method].responses[200].schema
        ? pathCopy[method].responses[200].schema.$ref.slice(14)
        : undefined;
      return pathObj;
    });
  };

  const getResultSchema = (reference, definitions) => {
    if (!reference) return;
    return definitions
      .filter(def => def.definition === reference)[0]
      .properties.map(prop => {
        const type = prop.type ? prop.type : undefined;
        let resultObj = {};
        resultObj.objectName = prop.name;
        resultObj.type = type;
        if (resultObj.type === "array") {
          resultObj.maxItems = prop.maxItems;
          const nextReference = prop.items.$ref.slice(14);
          const nextRefProps = definitions.filter(
            def => def.definition === nextReference
          )[0].properties;
          resultObj.properties = nextRefProps;
        } else if (resultObj.type === "string") {
          resultObj.maxLength = prop.maxLength;
        } else if (!type) {
          const nextReference = prop.$ref.slice(14);
          const nextRefProps = definitions.filter(
            def => def.definition === nextReference
          )[0].properties;
          resultObj.properties = nextRefProps;
        }
        return resultObj;
      });
  };

  return {
    getDefinitions: getDefinitions,
    getPaths: getPaths,
    getResultSchema: getResultSchema,
    getDefinitionProperties: getDefinitionProperties
  };
};

export default SwaggerParser();
