import { AadeBookInvoiceType } from '../../src/models/invoice.model';
import {
  CountryType,
  CurrencyType,
  IncomeClassificationCategoryType,
  IncomeClassificationValueType,
  InvoiceType,
  VatType
} from '../../src/models/simple-types.model';
import { validateInvoice } from '../../tests/validation/xsd-utils';

// Sample invoice creation functions

function createServiceInvoice(): AadeBookInvoiceType {
  const today = new Date();
  return {
    issuer: {
      vatNumber: '123456789',
      country: CountryType.GR,
      branch: 0
    },
    counterpart: {
      vatNumber: '987654321',
      country: CountryType.GR,
      branch: 0,
      address: {
        street: 'Customer Street',
        number: '1',
        postalCode: '12345',
        city: 'Athens'
      }
    },
    invoiceHeader: {
      series: 'A',
      aa: '1001',
      issueDate: today,
      invoiceType: InvoiceType.SERVICE_INVOICE,
      currency: CurrencyType.EUR
    },
    paymentMethods: {
      paymentMethodDetails: [
        {
          type: 3,
          amount: 1240.0,
          paymentMethodInfo: 'Bank transfer'
        }
      ]
    },
    invoiceDetails: [
      {
        lineNumber: 1,
        netValue: 1000.0,
        vatCategory: VatType.VAT_24_PERCENT,
        vatAmount: 240.0,
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

function createGoodsInvoice(): AadeBookInvoiceType {
  const today = new Date();
  return {
    issuer: {
      vatNumber: '123456789',
      country: CountryType.GR,
      branch: 0
    },
    counterpart: {
      vatNumber: '987654321',
      country: CountryType.GR,
      branch: 0
    },
    invoiceHeader: {
      series: 'B',
      aa: '2001',
      issueDate: today,
      invoiceType: InvoiceType.SALES_INVOICE,
      currency: CurrencyType.EUR
    },
    paymentMethods: {
      paymentMethodDetails: [
        {
          type: 1,
          amount: 595.0,
          paymentMethodInfo: 'Cash'
        }
      ]
    },
    invoiceDetails: [
      {
        lineNumber: 1,
        netValue: 200.0,
        vatCategory: VatType.VAT_13_PERCENT,
        vatAmount: 26.0,
        incomeClassification: [
          {
            classificationType:
              IncomeClassificationValueType.WHOLESALE_SALES_GOODS_SERVICES_TRADERS,
            classificationCategory:
              IncomeClassificationCategoryType.REVENUE_SALE_OF_GOODS,
            amount: 200.0
          }
        ]
      },
      {
        lineNumber: 2,
        netValue: 300.0,
        vatCategory: VatType.VAT_24_PERCENT,
        vatAmount: 72.0,
        incomeClassification: [
          {
            classificationType:
              IncomeClassificationValueType.WHOLESALE_SALES_GOODS_SERVICES_TRADERS,
            classificationCategory:
              IncomeClassificationCategoryType.REVENUE_SALE_OF_GOODS,
            amount: 300.0
          }
        ]
      }
    ],
    invoiceSummary: {
      totalNetValue: 500.0,
      totalVatAmount: 98.0,
      totalWithheldAmount: 0.0,
      totalFeesAmount: 0.0,
      totalStampDutyAmount: 0.0,
      totalOtherTaxesAmount: 0.0,
      totalDeductionsAmount: 0.0,
      totalGrossValue: 598.0,
      incomeClassification: [
        {
          classificationType:
            IncomeClassificationValueType.WHOLESALE_SALES_GOODS_SERVICES_TRADERS,
          classificationCategory:
            IncomeClassificationCategoryType.REVENUE_SALE_OF_GOODS,
          amount: 500.0
        }
      ]
    }
  };
}

// Custom invoice example - simplified invoice for small amounts
function createSimplifiedInvoice(): AadeBookInvoiceType {
  const today = new Date();
  return {
    issuer: {
      vatNumber: '123456789',
      country: CountryType.GR,
      branch: 0
    },
    invoiceHeader: {
      series: 'S',
      aa: '3001',
      issueDate: today,
      invoiceType: InvoiceType.SIMPLIFIED_INVOICE,
      currency: CurrencyType.EUR
    },
    paymentMethods: {
      paymentMethodDetails: [
        {
          type: 1,
          amount: 24.8,
          paymentMethodInfo: 'Cash'
        }
      ]
    },
    invoiceDetails: [
      {
        lineNumber: 1,
        netValue: 20.0,
        vatCategory: VatType.VAT_24_PERCENT,
        vatAmount: 4.8
      }
    ],
    invoiceSummary: {
      totalNetValue: 20.0,
      totalVatAmount: 4.8,
      totalWithheldAmount: 0.0,
      totalFeesAmount: 0.0,
      totalStampDutyAmount: 0.0,
      totalOtherTaxesAmount: 0.0,
      totalDeductionsAmount: 0.0,
      totalGrossValue: 24.8
    }
  };
}

// Main execution
async function main() {
  console.log('=== Validating Sample Invoices ===');

  // Create and validate invoices
  const serviceInvoice = createServiceInvoice();
  console.log('\nValidating Service Invoice...');
  await validateInvoice(serviceInvoice);

  const goodsInvoice = createGoodsInvoice();
  console.log('\nValidating Goods Invoice...');
  await validateInvoice(goodsInvoice);

  const simplifiedInvoice = createSimplifiedInvoice();
  console.log('\nValidating Simplified Invoice...');
  await validateInvoice(simplifiedInvoice);
}

main().catch(console.error);
