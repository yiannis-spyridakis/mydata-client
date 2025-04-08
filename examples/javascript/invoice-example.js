// JavaScript example for using the mydata-client library
// IMPORTANT: Run 'npm run build' first to compile the TypeScript code
require('dotenv').config(); // Load environment variables from .env file
const { MyDataClient } = require('../../dist'); // Import MyDataClient from compiled output

// Example of creating a simple invoice using the mydata-client library
/**
 * Creates a sample invoice object
 * @returns A sample invoice object ready to be sent to myDATA
 */
function createSampleInvoice() {
  // Create invoice header
  const today = new Date();

  // Assemble the complete invoice
  // Note: paymentMethods should be placed after invoiceHeader according to the schema
  return {
    issuer: {
      vatNumber: process.env.MYDATA_ISSUER_VAT || '', // Get from .env
      country: 'GR', // Use string literal for country code
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
      country: 'GR', // Use string literal for country code
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
      invoiceType: '2.1',
      currency: 'EUR' // Use string literal for CurrencyType
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
        vatCategory: 1, // Use number literal for VatType (1 = 24%)
        vatAmount: 240.0, // VAT amount
        // Note: itemDescr is not allowed in the schema, so we're removing it
        // quantity and measurementUnit are also not in the sample XML, so we're removing them
        // Income classification for this line
        incomeClassification: [
          {
            classificationType: 'E3_561_001', // Use string literal
            classificationCategory: 'category1_3', // Use string literal
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
          classificationType: 'E3_561_001', // Use string literal
          classificationCategory: 'category1_3', // Use string literal
          amount: 1000.0
        }
      ]
    }
  };
}

// Example of creating a simple invoice using the mydata-client library
async function createInvoiceExample() {
  // Create a sample invoice
  const invoice = createSampleInvoice();

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
    userId: process.env.MYDATA_USR,
    subscriptionKey: process.env.MYDATA_KEY,
    production: process.env.MYDATA_PRODUCTION === 'true'
  });

  try {
    console.log('Sending invoice to MyDATA...');
    const response = await myDataClient.sendProviderInvoices([invoice], true); // Validate XML
    console.log('Invoice sent successfully. Response:', response);
  } catch (error) {
    console.error('Error sending invoice:', error.message || error);
    if (error.response) {
      // Log API error details if available
      console.error('API Response Status:', error.response.status);
      console.error('API Response Body:', await error.response.text());
    }
  }
}

// Run the example
createInvoiceExample();
