import dotenv from 'dotenv';
import { CountryType, InvoiceType, MyDataClient } from '../../src';

// Load environment variables from .env file
dotenv.config();

async function sendProviderUnsignedInvoicesExample() {
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

  // Example unsigned invoice data
  const unsignedInvoices = [
    {
      issuer: { vatNumber: '123456789', country: CountryType.GR, branch: 0 },
      counterparty: {
        vatNumber: '987654321',
        country: CountryType.GR,
        branch: 0
      },
      invoiceHeader: {
        series: 'B',
        aa: '2',
        issueDate: new Date('2025-02-01'),
        invoiceType: InvoiceType.SALES_INVOICE
      },
      invoiceDetails: [
        { lineNumber: 1, netValue: 200, vatCategory: 1, vatAmount: 48 }
      ],
      invoiceSummary: {
        totalNetValue: 200,
        totalVatAmount: 48,
        totalWithheldAmount: 0,
        totalFeesAmount: 0,
        totalStampDutyAmount: 0,
        totalOtherTaxesAmount: 0,
        totalDeductionsAmount: 0,
        totalGrossValue: 248
      }
    }
  ];

  try {
    console.log('Sending provider unsigned invoices...');
    const response = await myDataClient.sendProviderUnsignedInvoices(
      unsignedInvoices
    );

    console.log('Response from myDATA:', JSON.stringify(response, null, 2));

    if (response) {
      console.log('Provider unsigned invoices sent successfully.');
    }
  } catch (error) {
    console.error('Error sending provider unsigned invoices:', error);
  }
}

// Run the example
sendProviderUnsignedInvoicesExample().catch(console.error);
