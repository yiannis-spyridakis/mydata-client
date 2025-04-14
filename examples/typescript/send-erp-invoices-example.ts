import dotenv from 'dotenv';
import { MyDataClient } from '../../src';
import { AadeBookInvoiceType } from '../../src/models/invoice.model';
import { InvoiceType } from '../../src/models/simple-types.model';

// Load environment variables from .env file
dotenv.config();

/**
 * Creates sample invoice data
 */
function createSampleInvoices(): AadeBookInvoiceType[] {
  return [
    {
      invoiceHeader: {
        series: 'TEST',
        aa: '1',
        issueDate: new Date(),
        invoiceType: InvoiceType.SALES_INVOICE // Retail Sales Invoice
      },
      invoiceDetails: [
        {
          lineNumber: 1,
          netValue: 100,
          vatCategory: 1, // 24% VAT
          vatAmount: 24
        }
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
}

async function sendInvoicesExample() {
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

  const invoices = createSampleInvoices();

  try {
    console.log('Sending invoices...');
    const response = await myDataClient.sendErpInvoices(invoices);
    console.log('Response from myDATA:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error sending invoices:', error);
  }
}

// Run the example
sendInvoicesExample().catch(console.error);
