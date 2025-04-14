import dotenv from 'dotenv';
import { CountryType, InvoiceType, MyDataClient } from '../../src';

// Load environment variables from .env file
dotenv.config();

async function sendProviderInvoicesExample() {
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

  // Example invoice data
  const invoices = [
    {
      issuer: { vatNumber: '123456789', country: CountryType.GR, branch: 0 },
      counterparty: {
        vatNumber: '987654321',
        country: CountryType.GR,
        branch: 0
      },
      invoiceHeader: {
        series: 'A',
        aa: '1',
        issueDate: new Date('2025-01-01'),
        invoiceType: InvoiceType.SALES_INVOICE
      },
      invoiceDetails: [
        { lineNumber: 1, netValue: 100, vatCategory: 1, vatAmount: 24 }
      ],
      invoiceSummary: {
        totalNetValue: 100,
        totalVatAmount: 24,
        totalWithheldAmount: 0,
        totalFeesAmount: 0,
        totalStampDutyAmount: 0,
        totalOtherTaxesAmount: 0,
        totalDeductionsAmount: 0,
        totalGrossValue: 124
      }
    }
  ];

  try {
    console.log('Sending provider invoices...');
    const response = await myDataClient.sendProviderInvoices(invoices);

    console.log('Response from myDATA:', JSON.stringify(response, null, 2));

    if (response) {
      console.log('Provider invoices sent successfully.');
    }
  } catch (error) {
    console.error('Error sending provider invoices:', error);
  }
}

// Run the example
sendProviderInvoicesExample().catch(console.error);
