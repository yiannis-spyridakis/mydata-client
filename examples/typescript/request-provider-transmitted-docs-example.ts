import dotenv from 'dotenv';
import { MyDataClient } from '../../src';
import { subMonths } from 'date-fns';

// Load environment variables from .env file
dotenv.config();

async function requestProviderTransmittedDocsExample() {
  // Validate environment variables
  if (!process.env.MYDATA_USR || !process.env.MYDATA_KEY) {
    throw new Error(
      'Missing required environment variables MYDATA_USR and MYDATA_KEY'
    );
  }

  if (!process.env.MYDATA_PRODUCTION) {
    throw new Error('Missing required environment variable MYDATA_PRODUCTION');
  }
  if (!process.env.MYDATA_ISSUER_VAT) {
    throw new Error('Missing required environment variable MYDATA_ISSUER_VAT');
  }

  const myDataClient = new MyDataClient({
    userId: process.env.MYDATA_USR,
    subscriptionKey: process.env.MYDATA_KEY,
    production: process.env.MYDATA_PRODUCTION === 'true'
  });

  // Set up date range (last month)
  const dateTo = new Date();
  const dateFrom = subMonths(dateTo, 1);

  try {
    console.log(
      process.env.MYDATA_ISSUER_VAT! // issuerVat
    );
    const response = await myDataClient.requestProviderTransmittedDocs(
      process.env.MYDATA_ISSUER_VAT, // issuerVat
      1000000000, // mark
      undefined, // nextPartitionKey (optional)
      undefined // nextRowKey (optional)
    );

    console.log('Response from myDATA:', JSON.stringify(response, null, 2));

    if (response) {
      console.log('Provider transmitted docs retrieved successfully.');
    }
  } catch (error) {
    console.error('Error requesting provider transmitted docs:', error);
  }
}

// Run the example
requestProviderTransmittedDocsExample().catch(console.error);
