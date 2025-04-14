import dotenv from 'dotenv';
import { MyDataClient } from '../../src';
import { subMonths } from 'date-fns';

// Load environment variables from .env file
dotenv.config();

async function requestE3InfoExample() {
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
    console.log(`Requesting E3 info from ${dateFrom} to ${dateTo}...`);
    const response = await myDataClient.requestErpE3Info({
      dateFrom,
      dateTo
      // Optional parameters:
      // entityVatNumber: '123456789', // Only needed for representatives
      // nextPartitionKey: '...', // For pagination
      // nextRowKey: '...' // For pagination
    });

    console.log('Response from myDATA:', JSON.stringify(response, null, 2));

    if (response) {
      console.log('E3 info retrieved successfully.');
    }
  } catch (error) {
    console.error('Error requesting E3 info:', error);
  }
}

// Run the example
requestE3InfoExample().catch(console.error);
