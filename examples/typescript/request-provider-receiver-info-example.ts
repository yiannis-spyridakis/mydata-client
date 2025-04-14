import dotenv from 'dotenv';
import { MyDataClient } from '../../src';

// Load environment variables from .env file
dotenv.config();

async function requestProviderReceiverInfoExample() {
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

  // Example VAT number
  const vatNumber = process.env.MYDATA_RECEIVER_VAT!;

  try {
    console.log(`Requesting receiver info for VAT number: ${vatNumber}...`);
    const response = await myDataClient.requestProviderReceiverInfo(vatNumber);

    console.log('Response from myDATA:', JSON.stringify(response, null, 2));

    if (response) {
      console.log('Receiver info retrieved successfully.');
    }
  } catch (error) {
    console.error('Error requesting receiver info:', error);
  }
}

// Run the example
requestProviderReceiverInfoExample().catch(console.error);
