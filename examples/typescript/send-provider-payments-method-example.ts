import dotenv from 'dotenv';
import { MyDataClient } from '../../src';

// Load environment variables from .env file
dotenv.config();

async function sendProviderPaymentsMethodExample() {
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

  // Example payment method data
  const paymentsMethod = {
    payment: [
      {
        invoiceMark: 1234567890,
        paymentMethodDetails: [
          {
            type: 3, // Cash
            amount: 500
          },
          {
            type: 6, // Web Banking
            amount: 1500
          }
        ]
      }
    ]
  };

  try {
    console.log('Sending provider payments method...');
    const response = await myDataClient.sendProviderPaymentsMethod(
      paymentsMethod
    );

    console.log('Response from myDATA:', JSON.stringify(response, null, 2));

    if (response) {
      console.log('Provider payments method sent successfully.');
    }
  } catch (error) {
    console.error('Error sending provider payments method:', error);
  }
}

// Run the example
sendProviderPaymentsMethodExample().catch(console.error);
