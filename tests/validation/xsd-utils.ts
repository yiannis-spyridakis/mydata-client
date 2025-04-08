/**
 * Validate Sample XML against XSD Schema
 *
 * This script loads a sample XML file and validates it against the XSD schema.
 * It's used to troubleshoot validation errors with the XSD schema.
 */

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'path';
import { validateXML } from 'xmllint-wasm';
import { AadeBookInvoiceType } from '../../src/models';
import { XmlHelper } from '../../src/api/xml-helper';

/**
 * Resolves XSD imports and includes by creating a set of file paths
 * @param xsdPath Path to the XSD file
 * @param visitedFiles Set of already visited files to prevent infinite recursion
 * @returns A set of file paths for all dependencies
 */
async function resolveXsdDependencies(
  xsdPath: string,
  visitedFiles: Set<string> = new Set()
): Promise<Set<string>> {
  // If we've already visited this file, skip it to prevent infinite recursion
  if (visitedFiles.has(xsdPath)) {
    return visitedFiles;
  }

  // Add the current file to the set of visited files
  visitedFiles.add(xsdPath);

  const xsdContent = await fsp.readFile(xsdPath, 'utf8');
  const basePath = path.dirname(xsdPath);

  // Regular expression to match xs:import elements
  const importRegex =
    /<xs:import\s+namespace="([^"]+)"\s+schemaLocation="([^"]+)"\s*\/>/g;
  let importMatch;

  while ((importMatch = importRegex.exec(xsdContent)) !== null) {
    const schemaLocation = importMatch[2];
    const importPath = path.resolve(basePath, schemaLocation);
    // console.log(`Resolving import: ${schemaLocation} -> ${importPath}`);

    if (fs.existsSync(importPath)) {
      // Recursively resolve dependencies for the imported file
      resolveXsdDependencies(importPath, visitedFiles);
    } else {
      console.warn(`Import file not found: ${importPath}`);
    }
  }

  // Regular expression to match xs:include elements
  const includeRegex = /<xs:include\s+schemaLocation="([^"]+)"\s*\/>/g;
  let includeMatch;

  while ((includeMatch = includeRegex.exec(xsdContent)) !== null) {
    const schemaLocation = includeMatch[1];
    const includePath = path.resolve(basePath, schemaLocation);
    // console.log(`Resolving include: ${schemaLocation} -> ${includePath}`);

    if (fs.existsSync(includePath)) {
      // Recursively resolve dependencies for the included file
      resolveXsdDependencies(includePath, visitedFiles);
    } else {
      console.warn(`Include file not found: ${includePath}`);
    }
  }

  return visitedFiles;
}

/**
 * Compiles a list of XSD files to preload for XML validation
 * This function dynamically generates the array of objects needed for the preload parameter
 * @param xsdPath Path to the main XSD schema file
 * @returns Array of objects with fileName and contents properties for each dependency
 */
async function compileXsdPreloadList(
  xsdPath: string
): Promise<Array<{ fileName: string; contents: string }>> {
  // Use the new function to get a set of all dependency file paths
  const dependencyPaths = await resolveXsdDependencies(xsdPath);
  const preloadList: Array<{ fileName: string; contents: string }> = [];

  // Convert the set of file paths to an array of objects with fileName and contents properties
  for (const filePath of dependencyPaths) {
    // Skip the main schema file as it will be passed separately to validateXML
    if (filePath === xsdPath) {
      continue;
    }

    const fileName = path.basename(filePath);
    const contents = await fsp.readFile(filePath, 'utf8');

    preloadList.push({
      fileName,
      contents
    });
  }

  // console.log(`Compiled preload list with ${preloadList.length} dependencies`);
  return preloadList;
}

/**
 * Validates an XML file against an XSD schema
 * @param xmlPath Path to the XML file
 * @param xsdPath Path to the XSD schema file
 * @returns True if validation succeeds, false otherwise
 */
export async function validateXmlFile(
  xmlFilename: string,
  xmlContent: string,
  xsdPath: string
): Promise<boolean> {
  try {
    // Read XSD
    const xsdContent = await fsp.readFile(xsdPath, 'utf8');

    // Dynamically compile the preload list
    const preloadList = await compileXsdPreloadList(xsdPath);

    const result = await validateXML({
      xml: [{ fileName: xmlFilename, contents: xmlContent }],
      schema: xsdContent,
      preload: preloadList
    });

    return result.valid;
  } catch (error) {
    console.error('Error during validation:', error);
    return false;
  }
}

// Validation function
export async function validateInvoice(
  invoice: AadeBookInvoiceType
): Promise<boolean> {
  try {
    const xmlHelper = new XmlHelper();
    const xsdPath = 'schemas/InvoicesDoc-v1.0.10.xsd';

    // Convert invoice to XML
    const xmlContent = xmlHelper.buildInvoicesDocXml([invoice]);

    // Validate against XSD
    const isValid = await validateXmlFile(
      'generated-invoice.xml',
      xmlContent,
      xsdPath
    );

    console.log(
      `Invoice validation ${isValid ? '✅ successful' : '❌ failed'}`
    );
    return isValid;
  } catch (error) {
    console.error('Validation error:', error);
    return false;
  }
}
