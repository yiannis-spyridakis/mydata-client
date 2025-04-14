import dotenv from 'dotenv';
import { MyDataClient } from '../../src';
import { subMonths } from 'date-fns';

// Load environment variables from .env file
dotenv.config();

async function requestVatInfoExample() {
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
    console.log(`Requesting VAT info from ${dateFrom} to ${dateTo}...`);
    const response = await myDataClient.requestErpVatInfo({
      dateFrom,
      dateTo
      // Optional parameters:
      // entityVatNumber: '123456789', // Only needed for representatives
      // GroupedPerDay: 'true', // Group results by day
      // nextPartitionKey: '...', // For pagination
      // nextRowKey: '...' // For pagination
    });

    console.log('Response from myDATA:', JSON.stringify(response, null, 2));

    if (response) {
      console.log('VAT info retrieved successfully.');
    }
  } catch (error) {
    console.error('Error requesting VAT info:', error);
  }
}

// Run the example
requestVatInfoExample().catch(console.error);
