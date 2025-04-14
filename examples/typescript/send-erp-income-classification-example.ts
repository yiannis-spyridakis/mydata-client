import dotenv from 'dotenv';
import { MyDataClient } from '../../src';
import { IncomeClassificationsDoc } from '../../src/models/incomeClassification.model';
import {
  IncomeClassificationCategoryType,
  IncomeClassificationValueType
} from '../../src/models/simple-types.model';

// Load environment variables from .env file
dotenv.config();

/**
 * Creates sample income classification data
 */
function createSampleIncomeClassifications(): IncomeClassificationsDoc {
  return {
    incomeInvoiceClassification: [
      {
        invoiceMark: 123456789, // Example MARK from existing invoice
        invoicesIncomeClassificationDetails: [
          {
            lineNumber: 1,
            incomeClassificationDetailData: [
              {
                classificationType:
                  IncomeClassificationValueType.OTHER_SALES_GOODS_SERVICES,
                classificationCategory:
                  IncomeClassificationCategoryType.REVENUE_SALE_OF_GOODS,
                amount: 500.0
              }
            ]
          }
        ]
      }
    ]
  };
}

async function sendIncomeClassificationExample() {
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

  const classifications = createSampleIncomeClassifications();

  try {
    console.log('Sending income classifications...');
    const response = await myDataClient.sendErpIncomeClassification(
      classifications
    );
    console.log('Response from myDATA:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error sending income classifications:', error);
  }
}

// Run the example
sendIncomeClassificationExample().catch(console.error);
