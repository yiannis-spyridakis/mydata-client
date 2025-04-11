import { describe, it, expect } from '@jest/globals';
import { XmlHelper } from '../../src/api/internal/xml-helper';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
  AadeBookInvoiceType,
  IncomeClassificationsDoc,
  ExpensesClassificationsDoc,
  PaymentMethodsDoc,
  AadeBookInvoiceDocType
} from '../../src/models';
import { formatDatesInObject } from '../../src/api/internal/utils';

describe('formatDatesInObject', () => {
  it('should format issueDate, dispatchDate, and applicationDate correctly', () => {
    const date = new Date(2024, 5, 15, 10, 30, 0); // June 15, 2024, 10:30:00
    const input = {
      invoiceHeader: {
        issueDate: date,
        dispatchDate: date,
        otherField: 'value'
      },
      shipInfo: {
        applicationDate: date
      }
    };
    const expected = {
      invoiceHeader: {
        issueDate: '2024-06-15',
        dispatchDate: '2024-06-15',
        otherField: 'value'
      },
      shipInfo: {
        applicationDate: '2024-06-15'
      }
    };
    expect(formatDatesInObject(input)).toEqual(expected);
  });

  it('should format dispatchTime correctly', () => {
    const date = new Date(2024, 5, 15, 14, 45, 30); // June 15, 2024, 14:45:30
    const input = {
      invoiceHeader: {
        dispatchTime: date,
        anotherField: 123
      }
    };
    const expected = {
      invoiceHeader: {
        dispatchTime: '14:45:30',
        anotherField: 123
      }
    };
    expect(formatDatesInObject(input)).toEqual(expected);
  });

  it('should handle nested objects', () => {
    const date1 = new Date(2023, 0, 1); // Jan 1, 2023
    const date2 = new Date(2023, 0, 1, 12, 0, 0); // Jan 1, 2023, 12:00:00
    const input = {
      level1: {
        issueDate: date1,
        level2: {
          dispatchTime: date2,
          text: 'hello'
        }
      }
    };
    const expected = {
      level1: {
        issueDate: '2023-01-01',
        level2: {
          dispatchTime: '12:00:00',
          text: 'hello'
        }
      }
    };
    expect(formatDatesInObject(input)).toEqual(expected);
  });

  it('should handle arrays of objects', () => {
    const date1 = new Date(2024, 1, 1); // Feb 1, 2024
    const date2 = new Date(2024, 1, 2); // Feb 2, 2024
    const input = {
      items: [
        { issueDate: date1, value: 1 },
        { issueDate: date2, value: 2 }
      ]
    };
    const expected = {
      items: [
        { issueDate: '2024-02-01', value: 1 },
        { issueDate: '2024-02-02', value: 2 }
      ]
    };
    expect(formatDatesInObject(input)).toEqual(expected);
  });

  it('should not modify non-date fields', () => {
    const input = {
      name: 'Test',
      count: 10,
      active: true,
      details: null
    };
    const expected = {
      name: 'Test',
      count: 10,
      active: true,
      details: null
    };
    expect(formatDatesInObject(input)).toEqual(expected);
  });

  it('should handle empty objects and arrays', () => {
    const input = {
      emptyObj: {},
      emptyArr: [],
      nested: { arr: [] }
    };
    const expected = {
      emptyObj: {},
      emptyArr: [],
      nested: { arr: [] }
    };
    expect(formatDatesInObject(input)).toEqual(expected);
  });

  it('should return primitives and null as is', () => {
    expect(formatDatesInObject(null)).toBeNull();
    expect(formatDatesInObject(undefined)).toBeUndefined();
    expect(formatDatesInObject(123)).toBe(123);
    expect(formatDatesInObject('string')).toBe('string');
    expect(formatDatesInObject(true)).toBe(true);
  });

  it('should handle objects created via JSON.parse(JSON.stringify(objWithDates))', () => {
    // Dates become strings after JSON stringify/parse
    const date = new Date(2024, 5, 15, 10, 30, 0);
    const original = {
      invoiceHeader: {
        issueDate: date,
        dispatchTime: date
      }
    };
    const input = JSON.parse(JSON.stringify(original)); // Dates are now ISO strings
    const expected = {
      invoiceHeader: {
        issueDate: date.toISOString(), // Should remain ISO string as it's not a Date instance
        dispatchTime: date.toISOString() // Should remain ISO string
      }
    };
    // formatDatesInObject should not modify strings, even if they look like dates
    expect(formatDatesInObject(input)).toEqual(expected);
  });
});

describe('XmlHelper', () => {
  const helper = new XmlHelper();
  const sampleXmlPath = join(
    __dirname,
    '../../examples/xml/SampleXML_1.1_taxes_per_line (ΤΙΜ-ΠΩΛΗΣΗΣ).xml'
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
