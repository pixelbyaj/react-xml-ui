// src/components/XmlToMaterialUIComponent.tsx
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

interface XmlMaterialUIComponentProps {
  xmlString: string;
}

const XmlMaterialUIComponent: React.FC<XmlMaterialUIComponentProps> = ({
  xmlString,
}) => {
  const [xmlTree, setXmlTree] = useState<any>(null);

  // Parse XML string into a tree structure
  const parseXmlString = (xml: string) => {
    const parsedXml = parseXml(xml);
    setXmlTree(parsedXml);
  };

  // Function to render components based on XML tree
  const renderComponents = (node: any, key: string, index: number) => {
    if (node.xmlns) return;
    if (utility.isArray(node)) {
      return node.map((childNode: any, index: number) =>
        renderComponents(childNode, key, index)
      );
    } else if (utility.isObject(node)) {
      return (
        <Accordion key={`${key}_${index}`} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography key={`type_${key}_${index}`}>
              {key} {node._attributes ? ` - ${node._attributes?.xmlns}` : ""}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {node._attributes === undefined || node._attributes.xmlns
              ? utility
                  .getKeys(node)
                  .map((key: any, index: number) =>
                    renderComponents(node[key], key, index)
                  )
              : utility
                  .getKeys(node._attributes)
                  .map((attr: any, index: number) => (
                    <>
                      <TextField
                        key={`${key}_${attr}_${index}`}
                        id="outlined-basic"
                        label={attr}
                        variant="outlined"
                        defaultValue={node._attributes[attr]}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        key={`${key}_${attr}_value_${index}`}
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
          key={`field_${key}_${index}`}
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

  // Render the parsed XML tree
  const renderXmlTree = () => {
    if (!xmlTree) return null;
    const nodeKeys = utility.getKeys(xmlTree);
    return nodeKeys.map((key: any, index: number) =>
      renderComponents(xmlTree[key], key, index)
    );
  };

  // Trigger parsing on component mount
  React.useEffect(() => {
    parseXmlString(xmlString);
  }, [xmlString]);

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

export default XmlMaterialUIComponent;
