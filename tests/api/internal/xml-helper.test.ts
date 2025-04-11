import { describe, it, expect } from '@jest/globals';
import { XmlHelper } from '../../../src/api/internal/xml-helper';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
  AadeBookInvoiceType,
  IncomeClassificationsDoc,
  ExpensesClassificationsDoc,
  PaymentMethodsDoc,
  AadeBookInvoiceDocType
} from '../../../src/models';

describe('XmlHelper', () => {
  const helper = new XmlHelper();
  const sampleXmlPath = join(
    __dirname,
    '../../../examples/xml/SampleXML_1.1_taxes_per_line (ΤΙΜ-ΠΩΛΗΣΗΣ).xml'
  );
  const sampleXml = readFileSync(sampleXmlPath, 'utf8');

  describe('parseXml', () => {
    it('should parse valid XML', async () => {
      const result = await helper.parseXml<AadeBookInvoiceDocType>(sampleXml);
      expect(result).toBeDefined();
      expect(result.InvoicesDoc).toBeDefined();
      expect(result.InvoicesDoc.invoice).toBeDefined();
    });

    it('should throw error for invalid XML', async () => {
      await expect(helper.parseXml('<invalid>xml')).rejects.toThrow();
    });
  });

  describe('buildInvoicesDocXml', () => {
    it('should build valid XML from invoice object', () => {
      const invoice: AadeBookInvoiceType = {
        invoiceHeader: {
          series: 'A',
          aa: '1',
          issueDate: new Date(2024, 0, 1),
          dispatchDate: new Date(2024, 0, 1),
          dispatchTime: new Date(2024, 0, 1, 12, 0, 0),
          invoiceType: '1.1' as any
        },
        invoiceDetails: [
          {
            lineNumber: 1,
            quantity: 1,
            netValue: 100,
            vatCategory: 1,
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
      };
      const xml = helper.buildInvoicesDocXml([invoice]);
      expect(xml).toContain('<InvoicesDoc');
      expect(xml).toContain('<invoiceHeader');
      expect(xml).toContain('<issueDate>2024-01-01</issueDate>');
      expect(xml).toContain('<dispatchTime>12:00:00</dispatchTime>');
    });
  });

  describe('buildIncomeClassificationXml', () => {
    it('should build valid classification XML', () => {
      const classification: IncomeClassificationsDoc = {
        incomeInvoiceClassification: [
          {
            invoiceMark: 123456,
            classificationMark: 1
          }
        ]
      };
      const xml = helper.buildIncomeClassificationXml(classification);
      expect(xml).toContain('<icls:IncomeClassificationsDoc');
      expect(xml).toContain('<icls:incomeInvoiceClassification');
    });
  });

  describe('buildExpensesClassificationXml', () => {
    it('should build valid expenses XML', () => {
      const expenses: ExpensesClassificationsDoc = {
        expensesInvoiceClassification: [
          {
            invoiceMark: 123456,
            classificationMark: 1
          }
        ]
      };
      const xml = helper.buildExpensesClassificationXml(expenses);
      expect(xml).toContain('<ecls:ExpensesClassificationsDoc');
      expect(xml).toContain('<ecls:expensesInvoiceClassification');
    });
  });

  describe('buildPaymentMethodsXml', () => {
    it('should build valid payment methods XML', () => {
      const payments: PaymentMethodsDoc = {
        payment: [
          {
            invoiceMark: 123456,
            paymentMethodMark: 1,
            paymentMethodDetails: [
              {
                type: 3,
                amount: 124,
                paymentMethodInfo: 'Bank transfer'
              }
            ]
          }
        ]
      };
      const xml = helper.buildPaymentMethodsXml(payments);
      expect(xml).toContain('<pmt:PaymentMethodsDoc');
      expect(xml).toContain('<pmt:payment');
    });
  });

  describe('error handling', () => {
    it('should handle empty input in build methods', () => {
      expect(() => helper.buildInvoicesDocXml([])).not.toThrow();
      expect(() =>
        helper.buildIncomeClassificationXml({ incomeInvoiceClassification: [] })
      ).not.toThrow();
    });
  });
});
