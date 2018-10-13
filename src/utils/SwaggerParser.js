const SwaggerParser = () => {
  const getDefinitions = swagger => {
    return Object.keys(swagger.definitions).map(def => {
      let obj = {};
      obj.definition = def;
      let properties = swagger.definitions[def].properties;
      obj.properties = Object.keys(properties).map(prop => {
        let propObj = {};
        propObj.name = prop;
        let keys = Object.keys(properties[prop]);
        let values = Object.values(properties[prop]);
        keys.forEach((key, k) => (propObj[key] = values[k]));
        return propObj;
      });
      return obj;
    });
  };

  const getPaths = swagger => {
    return Object.keys(swagger.paths).map(path => {
      let obj = {};
      obj.path = path;
      let method = Object.keys(swagger.paths[path]).toString();
      obj.method = method;
      obj.parameters = swagger.paths[path][method].parameters;
      obj.reference = swagger.paths[path][method].responses[200].schema
        ? swagger.paths[path][method].responses[200].schema.$ref.slice(14)
        : undefined;
      if (obj.parameters.length) {
        obj.query = swagger.paths[path][method].parameters[0].in === "query";
      } else {
        obj.query = false;
      }
      obj.name = swagger.paths[path][method].operationId;
      return obj;
    });
  };

  // const getDefinitionProperties = def => {
  //   return Object.keys(def.properties).map(prop => {
  //     let propObj = {};
  //     propObj.name = prop;
  //     propObj.type = def.properties[prop].type;
  //     propObj.maxLength = def.properties[prop].maxLength;
  //     propObj.reference = def.properties[prop].$ref
  //       ? def.properties[prop].$ref.slice(14)
  //       : undefined;
  //     propObj.maxItems = def.properties[prop].maxItems;
  //     propObj.itemsReference = def.properties[prop].items
  //       ? def.properties[prop].items.$ref.slice(14)
  //       : undefined;
  //     return propObj;
  //   });
  // };

  const resultOfGet = (reference, definitions) => {
    const firstRefProps = definitions.filter(
      def => def.definition === reference
    )[0].properties[0];
    const type = firstRefProps.type ? firstRefProps.type : undefined;
    let resultObj = {};
    resultObj.objectName = firstRefProps.name;
    resultObj.type = type;
    if (resultObj.type === "array") {
      resultObj.maxItems = firstRefProps.maxItems;
      const nextReference = firstRefProps.items.$ref.slice(14);
      const nextRefProps = definitions.filter(
        def => def.definition === nextReference
      )[0].properties;
      resultObj.properties = nextRefProps;
    } else if (resultObj.type === "string") {
      resultObj.maxLength = firstRefProps.maxLength;
    } else if (!type) {
      const nextReference = firstRefProps.$ref.slice(14);
      const nextRefProps = definitions.filter(
        def => def.definition === nextReference
      )[0].properties;
      resultObj.properties = nextRefProps;
    }

    return [resultObj];
  };

  return {
    getDefinitions: getDefinitions,
    getPaths: getPaths,
    // getDefinitionProperties: getDefinitionProperties,
    resultOfGet: resultOfGet
  };
};

export default SwaggerParser();
