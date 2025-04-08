import dotenv from 'dotenv';
import { MyDataClient } from '../../src';

// Load environment variables from .env file
dotenv.config();

/**
 * Example of retrieving transmitted documents from myDATA
 */
async function retrieveDocsExample() {
  // Validate environment variables
  if (!process.env.MYDATA_USR || !process.env.MYDATA_KEY) {
    throw new Error(
      'Missing required environment variables MYDATA_USR and MYDATA_KEY'
    );
  }

  // Initialize the MyDataClient
  if (!process.env.MYDATA_PRODUCTION) {
    throw new Error('Missing required environment variable MYDATA_PRODUCTION');
  }

  const myDataClient = new MyDataClient({
    userId: process.env.MYDATA_USR,
    subscriptionKey: process.env.MYDATA_KEY,
    production: process.env.MYDATA_PRODUCTION === 'true'
  });

  if (!process.env.MYDATA_ISSUER_VAT) {
    throw new Error('Missing required environment variable MYDATA_ISSUER_VAT');
  }
  const issuerVat = process.env.MYDATA_ISSUER_VAT;
  // Start from mark 0 to get all documents
  const mark = 0;

  try {
    console.log(
      `Retrieving documents for issuer VAT: ${issuerVat}, mark > ${mark}...`
    );

    // Request transmitted documents
    const response = await myDataClient.requestProviderTransmittedDocs(
      issuerVat,
      mark
    );
    console.log('Response from myDATA:', JSON.stringify(response, null, 2));

    // Process the response
    // Type guard to check response structure
    if (
      typeof response === 'object' &&
      response !== null &&
      'RequestedProviderDoc' in response
    ) {
      const doc = (response as any).RequestedProviderDoc;
      if (doc?.InvoiceProviderType) {
        const invoices = doc.InvoiceProviderType;
        console.log(`Retrieved ${invoices.length} invoices:`);

        invoices.forEach((invoice, index) => {
          console.log(`Invoice ${index + 1}:`);
          console.log(`  Mark: ${invoice.invoiceProviderMark}`);
          console.log(`  UID: ${invoice.invoiceUid}`);
          console.log(`  Authentication Code: ${invoice.authenticationCode}`);
        });

        // Check for continuation token if there are more documents
        if (doc.continuationToken) {
          const token = doc.continuationToken;
          console.log(
            'More documents available. Use these parameters for next request:'
          );
          console.log(`nextPartitionKey=${token.nextPartitionKey}`);
          console.log(`nextRowKey=${token.nextRowKey}`);
        }
      } else {
        console.log('No documents found or unexpected response format');
      }
    }
  } catch (error) {
    console.error('Error retrieving documents:', error);
  }
}

// Run the example
retrieveDocsExample().catch(console.error);
