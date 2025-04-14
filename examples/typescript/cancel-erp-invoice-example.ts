import dotenv from 'dotenv';
import { MyDataClient } from '../../src';

// Load environment variables from .env file
dotenv.config();

async function cancelInvoiceExample() {
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

  const markToCancel = 123456789; // Example MARK of invoice to cancel
  const entityVatNumber = process.env.ENTITY_VAT_NUMBER; // Optional: Only needed for representatives

  try {
    console.log(`Cancelling invoice with MARK: ${markToCancel}...`);
    const response = await myDataClient.cancelErpInvoice(
      markToCancel,
      entityVatNumber
    );
    console.log('Response from myDATA:', JSON.stringify(response, null, 2));

    if (response.ResponseDoc?.response) {
      const responseData = Array.isArray(response.ResponseDoc.response)
        ? response.ResponseDoc.response[0]
        : response.ResponseDoc.response;

      if (responseData.cancellationMark) {
        console.log(
          `Success! Cancellation MARK: ${responseData.cancellationMark}`
        );
      }
    }
  } catch (error) {
    console.error('Error cancelling invoice:', error);
  }
}

// Run the example
cancelInvoiceExample().catch(console.error);
