import {
  AadeBookInvoiceType,
  CountryType,
  CurrencyType,
  InvoiceType,
  QuantityType,
  ReverseDeliveryNotePurposeType,
  SpecialInvoiceCategoryType,
  VatType
} from '../../src/models';
import { validateInvoice } from './xsd-utils';

/**
 * Proves the v2.0.1 additions actually serialize into XML that the official
 * InvoicesDoc-v2.0.1.xsd accepts. Everything added in 2.0.1 is optional, so
 * these run against the real schema rather than a mock.
 */
describe('myDATA v2.0.1 additions', () => {
  const baseInvoice = (): AadeBookInvoiceType => ({
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
      series: 'A',
      aa: '1',
      issueDate: new Date('2026-08-06'),
      invoiceType: InvoiceType.SALES_INVOICE,
      currency: CurrencyType.EUR
    },
    // Field order matches the XSD sequence; the builder emits keys in order.
    invoiceDetails: [
      {
        lineNumber: 1,
        quantity: 1,
        measurementUnit: QuantityType.PIECES,
        netValue: 100,
        vatCategory: VatType.VAT_24_PERCENT,
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
  });

  it('accepts the new delivery-note header fields', async () => {
    const invoice = baseInvoice();
    invoice.invoiceHeader.invoiceType = InvoiceType.DELIVERY_NOTE;
    invoice.invoiceHeader.reverseDeliveryNote = true;
    invoice.invoiceHeader.reverseDeliveryNotePurpose =
      ReverseDeliveryNotePurposeType.REVERSE_CHARGE;
    invoice.invoiceHeader.toWeigh = true;

    await expect(validateInvoice(invoice)).resolves.toBe(true);
  });

  it('accepts per-line movement purpose', async () => {
    const invoice = baseInvoice();
    invoice.invoiceHeader.invoiceType = InvoiceType.DELIVERY_NOTE;
    invoice.invoiceDetails[0].movePurposeLine = 19;
    invoice.invoiceDetails[0].otherMovePurposeLineTitle = 'Internal transfer';

    await expect(validateInvoice(invoice)).resolves.toBe(true);
  });

  it('accepts the new delivery-note invoice types', async () => {
    for (const type of [
      InvoiceType.DELIVERY_NOTE_CORRELATED,
      InvoiceType.DELIVERY_NOTE_AGGREGATE,
      InvoiceType.QUANTITY_RECEIPT_NOTE_CORRELATED,
      InvoiceType.QUANTITY_RECEIPT_NOTE_NON_CORRELATED
    ]) {
      const invoice = baseInvoice();
      invoice.invoiceHeader.invoiceType = type;
      await expect(validateInvoice(invoice)).resolves.toBe(true);
    }
  });

  it('accepts special invoice category 13, added in v2.0.1', async () => {
    const invoice = baseInvoice();
    invoice.invoiceHeader.specialInvoiceCategory =
      SpecialInvoiceCategoryType.DIFFICULTY_CORRELATING_F2_E3;

    await expect(validateInvoice(invoice)).resolves.toBe(true);
  });

  it('still accepts an invoice using none of the new fields', async () => {
    await expect(validateInvoice(baseInvoice())).resolves.toBe(true);
  });
});
