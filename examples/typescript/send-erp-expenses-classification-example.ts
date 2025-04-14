import dotenv from 'dotenv';
import { MyDataClient } from '../../src';
import {
  ExpensesClassificationsDoc,
  InvoiceExpensesClassificationType
} from '../../src/models/expensesClassification.model';
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
  // Example 1: Using transactionMode (Reject or Deviation)
  const classificationWithTransactionMode: InvoiceExpensesClassificationType = {
    invoiceMark: 123456789, // Example MARK from existing invoice
    entityVatNumber: process.env.MYDATA_ISSUER_VAT || '', // Get from .env
    transactionMode: 2 // Example: Deviation
  };

  // Example 2: Using detailed classifications per line (postPerInvoice = false)
  const classificationWithDetails: InvoiceExpensesClassificationType = {
    invoiceMark: 987654321, // Example MARK from another invoice
    entityVatNumber: process.env.MYDATA_ISSUER_VAT || '', // Get from .env
    invoicesExpensesClassificationDetails: [
      {
        lineNumber: 1,
        expensesClassificationDetailData: [
          {
            classificationType:
              ExpensesClassificationValueType.PURCHASES_GOODS_WHOLESALE,
            classificationCategory:
              ExpensesClassificationCategoryType.PURCHASES_OF_GOODS,
            amount: 500.0 // Amount in EUR
          }
        ]
      },
      {
        lineNumber: 2,
        expensesClassificationDetailData: [
          {
            classificationType: ExpensesClassificationValueType.RENT_EXPENSES,
            classificationCategory:
              ExpensesClassificationCategoryType.GENERAL_EXPENSES_NO_VAT_DEDUCTIBLE,
            amount: 150.0
          }
        ]
      }
    ]
    // classificationPostMode: 0 // Optional, defaults to per-line if not provided
  };

  // Example 3: Using detailed classifications per invoice (postPerInvoice = true)
  const classificationPostPerInvoice: InvoiceExpensesClassificationType = {
    invoiceMark: 112233445, // Example MARK from another invoice
    entityVatNumber: process.env.MYDATA_ISSUER_VAT || '', // Get from .env
    classificationPostMode: 1, // Indicate classification is per invoice
    invoicesExpensesClassificationDetails: [
      // Still need this wrapper, but lineNumber is ignored
      {
        lineNumber: 1, // Line number is ignored when classificationPostMode = 1
        expensesClassificationDetailData: [
          {
            classificationType:
              ExpensesClassificationValueType.PURCHASES_GOODS_WHOLESALE,
            classificationCategory:
              ExpensesClassificationCategoryType.PURCHASES_OF_GOODS,
            amount: 600.0
          },
          {
            classificationType: ExpensesClassificationValueType.OTHER_EXPENSES,
            classificationCategory:
              ExpensesClassificationCategoryType.GENERAL_EXPENSES_VAT_DEDUCTIBLE,
            amount: 50.0
          }
        ]
      }
    ]
  };

  return {
    // Choose which example(s) to send
    expensesInvoiceClassification: [
      // classificationWithTransactionMode,
      classificationWithDetails
      // classificationPostPerInvoice
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
