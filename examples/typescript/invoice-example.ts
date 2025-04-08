import dotenv from 'dotenv';
import {
  MyDataClient,
  CountryType,
  InvoiceType,
  CurrencyType,
  VatType,
  IncomeClassificationValueType,
  IncomeClassificationCategoryType,
  AadeBookInvoiceType
} from '../../src';
import { validateInvoice } from '../../tests/validation/xsd-utils';

// Load environment variables from .env file
dotenv.config();

// Example of creating a simple invoice using the mydata-client library
/**
 * Creates a sample invoice object
 * @returns A sample invoice object ready to be sent to myDATA
 */
function createSampleInvoice(): AadeBookInvoiceType {
  // Create invoice header
  const today = new Date();

  // Assemble the complete invoice
  // Note: paymentMethods should be placed after invoiceHeader according to the schema
  return {
    issuer: {
      vatNumber: process.env.MYDATA_ISSUER_VAT || '', // Get from .env
      country: CountryType.GR,
      branch: 0
      // name: 'My Company Name', // Optional
      // address: {
      //   street: 'My Street',
      //   number: '123',
      //   postalCode: '12345',
      //   city: 'Athens',
      // },
    },
    counterpart: {
      vatNumber: process.env.MYDATA_RECEIVER_VAT || '', // Get from .env
      country: CountryType.GR,
      branch: 0,
      // name: 'Customer Company Name', // Optional
      address: {
        street: 'Customer Street',
        number: '456',
        postalCode: '54321',
        city: 'Thessaloniki'
      }
    },
    invoiceHeader: {
      series: 'A',
      aa: '1', // Invoice number
      issueDate: today, // Use the Date object directly
      invoiceType: InvoiceType.SERVICE_INVOICE, // 2.1 - Service Invoice
      currency: CurrencyType.EUR
    },
    paymentMethods: {
      paymentMethodDetails: [
        {
          type: 3, // Bank payment
          amount: 1240.0, // Total amount
          paymentMethodInfo: 'Bank transfer' // Optional information
        }
      ]
    },
    invoiceDetails: [
      {
        lineNumber: 1,
        netValue: 1000.0, // Net amount
        vatCategory: VatType.VAT_24_PERCENT, // 24% VAT
        vatAmount: 240.0, // VAT amount
        // Note: itemDescr is not allowed in the schema, so we're removing it
        // quantity and measurementUnit are also not in the sample XML, so we're removing them
        // Income classification for this line
        incomeClassification: [
          {
            classificationType:
              IncomeClassificationValueType.WHOLESALE_SALES_GOODS_SERVICES_TRADERS,
            classificationCategory:
              IncomeClassificationCategoryType.REVENUE_PROVISION_OF_SERVICES,
            amount: 1000.0
          }
        ]
      }
    ],
    invoiceSummary: {
      totalNetValue: 1000.0,
      totalVatAmount: 240.0,
      totalWithheldAmount: 0.0,
      totalFeesAmount: 0.0,
      totalStampDutyAmount: 0.0,
      totalOtherTaxesAmount: 0.0,
      totalDeductionsAmount: 0.0,
      totalGrossValue: 1240.0,
      // Income classification for the entire invoice
      incomeClassification: [
        {
          classificationType:
            IncomeClassificationValueType.WHOLESALE_SALES_GOODS_SERVICES_TRADERS,
          classificationCategory:
            IncomeClassificationCategoryType.REVENUE_PROVISION_OF_SERVICES,
          amount: 1000.0
        }
      ]
    }
  };
}
async function createInvoiceExample() {
  // Create a sample invoice
  const invoice = createSampleInvoice();

  await validateInvoice(invoice);

  // Initialize the MyDataClient with credentials from .env
  if (!process.env.MYDATA_USR || !process.env.MYDATA_KEY) {
    throw new Error(
      'Missing required environment variables MYDATA_USR and MYDATA_KEY'
    );
  }

  if (!process.env.MYDATA_PRODUCTION) {
    throw new Error('Missing required environment variable MYDATA_PRODUCTION');
  }

  const myDataClient = new MyDataClient({
    userId: process.env.MYDATA_USR!,
    subscriptionKey: process.env.MYDATA_KEY!,
    production: process.env.MYDATA_PRODUCTION === 'true'
  });

  // Send the invoice to myDATA
  try {
    const response = await myDataClient.sendProviderInvoices([invoice], true);
    console.log('Response from myDATA:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error sending invoice to myDATA:', error);
  }
}

// Run the example
createInvoiceExample().catch(console.error);
