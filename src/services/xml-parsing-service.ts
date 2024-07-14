const XmlParsingService = {
  parseXmlNode: (node: any) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const obj: Record<string, any> = {};
      obj[node.nodeName] = {};

      if (node.hasChildNodes()) {
        for (let childNode of Array.from(node.childNodes) as any) {
          const childObj = XmlParsingService.parseXmlNode(childNode);
          if (
            typeof childObj === "object" &&
            childNode.nodeType !== Node.TEXT_NODE &&
            Object.keys(childObj).length > 0
          ) {
            if (obj[node.nodeName][childNode.nodeName]) {
              obj[node.nodeName][childNode.nodeName] = [
                structuredClone(obj[node.nodeName][childNode.nodeName]),
              ];
              obj[node.nodeName][childNode.nodeName].push(
                childObj[childNode.nodeName]
              );
            } else {
              obj[node.nodeName][childNode.nodeName] = {};
              obj[node.nodeName][childNode.nodeName] =
                childObj[childNode.nodeName];
            }
          } else if (childObj && node.attributes && node.attributes.length) {
            obj[node.nodeName] = { value: childObj };
          } else if (childObj && Object.keys(childObj).length > 0) {
            obj[node.nodeName] = childObj;
          }
        }
      }

      if (node.attributes && node.attributes.length > 0) {
        obj[node.nodeName]["_attributes"] = {};
        for (const attribute of Array.from(node.attributes) as any) {
          obj[node.nodeName]["_attributes"][attribute.nodeName] =
            attribute.nodeValue;
        }
      }

      return obj;
    } else if (
      node.nodeType === Node.TEXT_NODE ||
      node.nodeType === Node.CDATA_SECTION_NODE
    ) {
      return node.nodeValue.trim();
    }

    return {};
  }
};
const parseXML = (xmlString: string) => {
  const parser: DOMParser = new DOMParser();
  const xmlDoc: Document = parser.parseFromString(xmlString, "text/xml");
  return XmlParsingService.parseXmlNode(xmlDoc.childNodes[0]);
};
export default parseXML;
