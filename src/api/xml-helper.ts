import { parseStringPromise, Builder } from 'xml2js';
import { AadeBookInvoiceType } from '../models/invoice.model';
import { IncomeClassificationsDoc } from '../models/incomeClassification.model';
import { ExpensesClassificationsDoc } from '../models/expensesClassification.model';
import { PaymentMethodsDoc } from '../models/paymentMethods.model';

// Date/Time Formatting Helpers
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export function formatDatesInObject(obj: any): any {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return obj;
  if (Array.isArray(obj)) return obj.map(formatDatesInObject);

  const newObj: { [key: string]: any } = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value instanceof Date) {
        if (
          key === 'issueDate' ||
          key === 'dispatchDate' ||
          key === 'applicationDate' ||
          key === 'cancellationDate' ||
          key === 'IssueDate'
        ) {
          newObj[key] = formatDate(value);
        } else if (key === 'dispatchTime') {
          newObj[key] = formatTime(value);
        } else {
          newObj[key] = formatDate(value);
          console.warn(
            `Unhandled Date object for key: ${key}. Formatting as YYYY-MM-DD.`
          );
        }
      } else {
        newObj[key] = formatDatesInObject(value);
      }
    }
  }
  return newObj;
}

export class XmlHelper {
  private builderOptions = {
    xmldec: { version: '1.0', encoding: 'UTF-8' },
    renderOpts: { pretty: false },
    headless: false
  };

  async parseXml<T = any>(xml: string): Promise<T> {
    try {
      const result = await parseStringPromise(xml, {
        explicitArray: false,
        mergeAttrs: true,
        explicitRoot: true
      });
      return result as T;
    } catch (error: any) {
      // console.error('XML Parsing Error:', error);
      throw new Error(`Failed to parse XML: ${error.message}`);
    }
  }

  buildInvoicesDocXml(invoices: AadeBookInvoiceType[]): string {
    const invoicesDoc = { invoice: invoices };
    const formattedDoc = formatDatesInObject(invoicesDoc);
    const rootObject = {
      InvoicesDoc: {
        $: {
          xmlns: 'http://www.aade.gr/myDATA/invoice/v1.0',
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          'xsi:schemaLocation':
            'http://www.aade.gr/myDATA/invoice/v1.0/InvoicesDoc-v1.0.10.xsd',
          'xmlns:icls': 'https://www.aade.gr/myDATA/incomeClassificaton/v1.0',
          'xmlns:ecls': 'https://www.aade.gr/myDATA/expensesClassificaton/v1.0'
        },
        invoice: formattedDoc.invoice
      }
    };

    const builder = new Builder(this.builderOptions);
    let xml = builder.buildObject(rootObject);
    xml = this.applyInvoiceNamespacePrefixes(xml);
    return xml;
  }

  buildIncomeClassificationXml(
    classificationsDoc: IncomeClassificationsDoc
  ): string {
    const formattedDoc = formatDatesInObject(classificationsDoc);
    const rootObject = {
      'icls:IncomeClassificationsDoc': {
        $: {
          'xmlns:icls': 'https://www.aade.gr/myDATA/incomeClassification/v1.0',
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
        },
        'icls:incomeInvoiceClassification':
          formattedDoc.incomeInvoiceClassification
      }
    };
    const builder = new Builder(this.builderOptions);
    let xml = builder.buildObject(rootObject);
    xml = this.applyIncomeClassificationPrefixes(xml);
    return xml;
  }

  buildExpensesClassificationXml(
    classificationsDoc: ExpensesClassificationsDoc
  ): string {
    const formattedDoc = formatDatesInObject(classificationsDoc);
    const rootObject = {
      'ecls:ExpensesClassificationsDoc': {
        $: {
          'xmlns:ecls':
            'https://www.aade.gr/myDATA/expensesClassification/v1.0',
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
        },
        'ecls:expensesInvoiceClassification':
          formattedDoc.expensesInvoiceClassification
      }
    };
    const builder = new Builder(this.builderOptions);
    let xml = builder.buildObject(rootObject);
    xml = this.applyExpenseClassificationPrefixes(xml);
    return xml;
  }

  buildPaymentMethodsXml(paymentsDoc: PaymentMethodsDoc): string {
    const formattedDoc = formatDatesInObject(paymentsDoc);
    const rootObject = {
      'pmt:PaymentMethodsDoc': {
        $: {
          'xmlns:pmt': 'https://www.aade.gr/myDATA/paymentMethod/v1.0',
          'xmlns:inv': 'http://www.aade.gr/myDATA/invoice/v1.0',
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
        },
        'pmt:payment': formattedDoc.payment
      }
    };
    const builder = new Builder(this.builderOptions);
    let xml = builder.buildObject(rootObject);
    xml = this.applyPaymentMethodPrefixes(xml);
    return xml;
  }

  private applyInvoiceNamespacePrefixes(xml: string): string {
    // let result = xml.replace(
    //   new RegExp(
    //     '<(/?)(issuer|counterpart|invoiceHeader|paymentMethods|paymentMethodDetails|invoiceDetails|taxesTotals|taxes|invoiceSummary|otherTransportDetails)',
    //     'g'
    //   ),
    //   '<$1inv:$2'
    // );
    let result = xml.replace(
      new RegExp(
        '<incomeClassification>([\\s\\S]*?)<\\/incomeClassification>',
        'g'
      ),
      (match: string) =>
        match.replace(
          new RegExp(
            '<(/?)(classificationType|classificationCategory|amount|id)',
            'g'
          ),
          '<$1icls:$2'
        )
    );
    result = result.replace(
      new RegExp(
        '<expensesClassification>([\\s\\S]*?)<\\/expensesClassification>',
        'g'
      ),
      (match: string) =>
        match.replace(
          new RegExp(
            '<(/?)(classificationType|classificationCategory|amount|vatAmount|vatCategory|vatExemptionCategory|id)',
            'g'
          ),
          '<$1ecls:$2'
        )
    );
    return result;
  }

  private applyIncomeClassificationPrefixes(xml: string): string {
    return xml.replace(
      new RegExp(
        '<(/?)(invoiceMark|classificationMark|entityVatNumber|transactionMode|invoicesIncomeClassificationDetails|lineNumber|incomeClassificationDetailData|classificationType|classificationCategory|amount|id)',
        'g'
      ),
      '<$1icls:$2'
    );
  }

  private applyExpenseClassificationPrefixes(xml: string): string {
    return xml.replace(
      new RegExp(
        '<(/?)(invoiceMark|classificationMark|entityVatNumber|transactionMode|invoicesExpensesClassificationDetails|lineNumber|expensesClassificationDetailData|classificationType|classificationCategory|amount|vatAmount|vatCategory|vatExemptionCategory|id|classificationPostMode)',
        'g'
      ),
      '<$1ecls:$2'
    );
  }

  private applyPaymentMethodPrefixes(xml: string): string {
    let result = xml.replace(
      new RegExp(
        '<(/?)(invoiceMark|paymentMethodMark|entityVatNumber|paymentMethodDetails)',
        'g'
      ),
      '<$1pmt:$2'
    );
    result = result.replace(
      new RegExp(
        '<pmt:paymentMethodDetails>([\\s\\S]*?)<\\/pmt:paymentMethodDetails>',
        'g'
      ),
      (match: string) =>
        match.replace(
          new RegExp(
            '<(/?)(type|amount|paymentMethodInfo|tipAmount|transactionId|tid|ProvidersSignature|ECRToken|SigningAuthor|Signature|SessionNumber)',
            'g'
          ),
          '<$1inv:$2'
        )
    );
    return result;
  }
}
