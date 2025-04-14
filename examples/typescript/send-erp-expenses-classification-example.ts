import dotenv from 'dotenv';
import { MyDataClient } from '../../src';
import { ExpensesClassificationsDoc } from '../../src/models/expensesClassification.model';
import {
  ExpensesClassificationCategoryType,
  ExpensesClassificationValueType
} from '../../src/models/simple-types.model';

// Load environment variables from .env file
dotenv.config();

/**
 * Creates sample expenses classification data
 */
function createSampleExpensesClassifications(): ExpensesClassificationsDoc {
  return {
    expensesInvoiceClassification: [
      {
        invoiceMark: 123456789, // Example MARK from existing invoice
        entityVatNumber: process.env.MYDATA_ISSUER_VAT || '', // Get from .env
        invoicesExpensesClassificationDetails: [
          {
            lineNumber: 1,
            expensesClassificationDetailData: [
              {
                classificationType:
                  ExpensesClassificationValueType.OTHER_EXPENSES,
                classificationCategory:
                  ExpensesClassificationCategoryType.PURCHASES_OF_GOODS,
                amount: 500.0 // Amount in EUR
              }
            ]
          }
        ]
      }
    ]
  };
}

async function sendExpensesClassificationExample() {
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

  const classifications = createSampleExpensesClassifications();

  try {
    console.log('Sending expenses classifications...');
    const response = await myDataClient.sendErpExpensesClassification(
      classifications
    );
    console.log('Response from myDATA:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error sending expenses classifications:', error);
  }
}

// Run the example
sendExpensesClassificationExample().catch(console.error);
