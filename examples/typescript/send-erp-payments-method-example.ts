import dotenv from 'dotenv';
import { MyDataClient } from '../../src';
import { PaymentMethodsDoc } from '../../src/models/paymentMethods.model';

// Load environment variables from .env file
dotenv.config();

/**
 * Creates sample payment methods data
 */
function createSamplePaymentMethods(): PaymentMethodsDoc {
  return {
    payment: [
      {
        invoiceMark: 123456789, // Example MARK from existing invoice
        paymentMethodDetails: [
          {
            type: 1, // 1 = Cash
            amount: 100,
            paymentMethodInfo: 'Sample payment info'
          }
        ]
      }
    ]
  };
}

async function sendPaymentsMethodExample() {
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

  const paymentMethods = createSamplePaymentMethods();

  try {
    console.log('Sending payment methods...');
    const response = await myDataClient.sendErpPaymentsMethod(paymentMethods);
    console.log('Response from myDATA:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error sending payment methods:', error);
  }
}

// Run the example
sendPaymentsMethodExample().catch(console.error);
