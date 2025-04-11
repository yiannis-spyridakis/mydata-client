import fs from 'node:fs';
import path from 'node:path';

import { AadeBookInvoiceDocType } from '../../src/models/invoice.model';
import { XmlHelper } from '../../src/api/internal/xml-helper';
import { validateXmlFile } from '../../tests/validation/xsd-utils';

async function validateAllSamples() {
  const samplesDir = path.resolve(process.cwd(), 'examples/xml');
  const files = fs.readdirSync(samplesDir);

  const xmlFiles = files.filter(file => file.endsWith('.xml'));
  console.log(`Found ${xmlFiles.length} XML files in examples/xml directory`);

  for (const file of xmlFiles) {
    const filePath = path.join(samplesDir, file);
    console.log(`\n=== Validating ${file} ===`);
    await validateInvoiceXml(filePath);
  }
}

async function validateInvoiceXml(xmlPath: string) {
  try {
    // Read the XML file
    const xmlContent = fs.readFileSync(xmlPath, 'utf8');
    const filename = path.basename(xmlPath);

    // Determine XSD schema based on XML version
    const xsdPath = path.resolve(
      process.cwd(),
      'schemas/InvoicesDoc-v1.0.10.xsd'
    );

    const xmlHelper = new XmlHelper();

    // Validate the original XML
    console.log(`Validating ${filename} against ${path.basename(xsdPath)}`);
    const isValid = await validateXmlFile(filename, xmlContent, xsdPath);

    if (isValid) {
      console.log('✅ Original XML validation successful');
    } else {
      console.error('❌ Original XML validation failed');
    }

    // Parse and validate the XML structure
    const parsed = await xmlHelper.parseXml<AadeBookInvoiceDocType>(xmlContent);
    // console.log('Parsed XML structure:');
    // console.dir(parsed, { depth: null, colors: true });

    // Rebuild and validate the XML
    const parsedXmlContent = xmlHelper.buildInvoicesDocXml(
      parsed.InvoicesDoc.invoice
    );
    // console.log('Rebuilt XML content:');
    // console.dir(parsedXmlContent, { depth: null, colors: true });

    const isParsedValid = await validateXmlFile(
      filename,
      parsedXmlContent,
      xsdPath
    );

    if (isParsedValid) {
      console.log('✅ Parsed XML validation successful');
    } else {
      console.error('❌ Parsed XML validation failed');
    }

    return isParsedValid;
  } catch (error) {
    console.error('Error during validation:', error);
    return false;
  }
}

// Example usage - validate all sample files
validateAllSamples().catch(console.error);
