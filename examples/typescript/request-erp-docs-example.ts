import dotenv from 'dotenv';
import { MyDataClient } from '../../src';
import { format, subMonths } from 'date-fns';

// Load environment variables from .env file
dotenv.config();

async function requestDocsExample() {
  // Validate environment variables
  if (!process.env.MYDATA_USR || !process.env.MYDATA_KEY) {
    throw new Error(
      'Missing required environment variables MYDATA_USR and MYDATA_KEY'
    );
  }

  if (!process.env.MYDATA_PRODUCTION) {
    throw new Error('Missing required environment variable MYDATA_PRODUCTION');
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
    console.log(`Requesting documents from ${dateFrom} to ${dateTo}...`);
    const response = await myDataClient.requestErpDocs({
      mark: 0, // Start from beginning (minimum MARK)
      dateFrom,
      dateTo
      // Optional parameters:
      // entityVatNumber: '123456789', // Only needed for representatives
      // nextPartitionKey: '...', // For pagination
      // nextRowKey: '...' // For pagination
    });

    console.log('Response from myDATA:', JSON.stringify(response, null, 2));

    if (response.invoicesDoc?.invoice) {
      console.log(`Found ${response.invoicesDoc.invoice.length} invoices`);
    }
  } catch (error) {
    console.error('Error requesting documents:', error);
  }
}

// Run the example
requestDocsExample().catch(console.error);
