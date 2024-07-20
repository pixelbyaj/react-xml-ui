import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UtilityService as utility, parseXml } from "../services";

interface XmlMessageProps {
  xmlString: string;
}

const ReactXmlUI: React.FC<XmlMessageProps> = ({ xmlString }) => {
  const [xmlTree, setXmlTree] = useState<any>(null);

  // Parse XML string into a tree structure
  const parseXmlString = (xml: string) => {
    const parsedXml = parseXml(xml);
    setXmlTree(parsedXml);
  };

  // Render the parsed XML tree
  const renderXmlTree = () => {
    if (!xmlTree) return null;
    const nodeKeys = utility.getKeys(xmlTree);
    return nodeKeys.map((key: any) => renderComponents(xmlTree[key], key, key));
  };

  // Trigger parsing on component mount
  React.useEffect(() => {
    parseXmlString(xmlString);
  }, [xmlString]);

  // Function to render components based on XML tree
  const renderComponents = (node: any, key: string, xpath: string) => {
    if (node.xmlns) return;
    if (utility.isArray(node)) {
      return node.map((childNode: any, index: number) =>
        renderComponents(childNode, key, `${xpath}_${key}_${index}`)
      );
    } else if (utility.isObject(node)) {
      return (
        <Accordion key={`${xpath}_${key}`} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} key={`${xpath}_${key}_summary`}>
            <Typography key={`${xpath}_${key}_type`}>
             {key} {node._attributes && node._attributes?.xmlns
                ? ` - ${node._attributes.xmlns}`
                : ""}
            </Typography>
          </AccordionSummary>
          <AccordionDetails key={`${xpath}_${key}_details`}>
            {node._attributes === undefined || node._attributes.xmlns
              ? utility
                  .getKeys(node)
                  .map((childKey: any) =>
                    renderComponents(
                      node[childKey],
                      childKey,
                      `${xpath}_${childKey}`
                    )
                  )
              : utility
                  .getKeys(node._attributes)
                  .map((attr: any, index: number) => (
                    <>
                      <TextField
                        key={`${xpath}_${attr}_${index}`}
                        id="outlined-basic"
                        label={attr}
                        variant="outlined"
                        defaultValue={node._attributes[attr]}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        key={`${xpath}_${attr}_value_${index}`}
                        id="outlined-basic"
                        label={key}
                        variant="outlined"
                        defaultValue={node.value}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </>
                  ))}
          </AccordionDetails>
        </Accordion>
      );
    } else if (!utility.isObject(node) && key !== "xmlns") {
      return (
        <TextField
          key={`field_${xpath}`}
          id="outlined-basic"
          label={key}
          variant="outlined"
          defaultValue={node}
          InputProps={{
            readOnly: true,
          }}
        />
      );
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      {renderXmlTree()}
    </Box>
  );
};

export default ReactXmlUI;