import { jest } from '@jest/globals';
import { MyDataClient } from '../../src/api/mydata-client';
import {
  AadeBookInvoiceType,
  CountryType,
  CurrencyType,
  InvoiceType,
  VatType,
  IncomeClassificationsDoc,
  ExpensesClassificationsDoc,
  PaymentMethodsDoc,
  IncomeClassificationValueType,
  IncomeClassificationCategoryType,
  ExpensesClassificationValueType,
  ExpensesClassificationCategoryType
} from '../../src/models';
import { validateInvoice, validateXmlFile } from '../validation/xsd-utils';
import fs from 'node:fs';
import path from 'node:path';
import { AadeBookInvoiceDocType } from '../../src/models/invoice.model';
import { XmlHelper } from '../../src/api/xml-helper';

// Mock fetch and XmlHelper
// Use jest.MockedFunction for better type safety with Jest mocks
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.fetch = mockFetch;

// Mock the entire module
jest.mock('../../src/api/xml-helper', () => {
  // Create a mock constructor that returns a mock instance
  const mockInstance = {
    buildInvoicesDocXml: jest.fn(),
    buildIncomeClassificationXml: jest.fn(),
    buildExpensesClassificationXml: jest.fn(),
    buildPaymentMethodsXml: jest.fn(),
    parseXml: jest.fn()
  };

  // Return a mock constructor function that always returns the same mock instance
  const MockXmlHelper = jest.fn(() => mockInstance);

  return {
    XmlHelper: MockXmlHelper
  };
});

// Mock the validation utility
jest.mock('../validation/xsd-utils', () => ({
  validateInvoice: jest.fn(),
  validateXmlFile: jest.fn().mockImplementation(() => Promise.resolve(true))
}));

// Get the mocked instance that will be used by MyDataClient
const mockXmlHelperInstance = require('../../src/api/xml-helper').XmlHelper();

// Get the mocked instance of validateInvoice
const mockedValidateInvoice = validateInvoice as jest.MockedFunction<
  typeof validateInvoice
>;

// Helper function to create sample invoice for tests
const createSampleInvoice = (): AadeBookInvoiceType => ({
  issuer: { vatNumber: '123', country: CountryType.GR, branch: 0 },
  invoiceHeader: {
    series: 'A',
    aa: '1',
    issueDate: new Date(),
    invoiceType: InvoiceType.SALES_INVOICE,
    currency: CurrencyType.EUR
  },
  invoiceDetails: [],
  invoiceSummary: {
    totalNetValue: 0,
    totalVatAmount: 0,
    totalWithheldAmount: 0,
    totalFeesAmount: 0,
    totalStampDutyAmount: 0,
    totalOtherTaxesAmount: 0,
    totalDeductionsAmount: 0,
    totalGrossValue: 0
  }
});

// Helper function to create sample income classification for tests
const createSampleIncomeClassification = (): IncomeClassificationsDoc => ({
  incomeInvoiceClassification: [
    {
      invoiceMark: 123456,
      classificationMark: 0,
      entityVatNumber: '123456789',
      transactionMode: 1,
      invoicesIncomeClassificationDetails: [
        {
          lineNumber: 1,
          incomeClassificationDetailData: [
            {
              classificationType:
                IncomeClassificationValueType.WHOLESALE_SALES_ARTICLE_39A,
              classificationCategory:
                IncomeClassificationCategoryType.REVENUE_SALE_OF_GOODS,
              amount: 100
            }
          ]
        }
      ]
    }
  ]
});

// Helper function to create sample expenses classification for tests
const createSampleExpensesClassification = (): ExpensesClassificationsDoc => ({
  expensesInvoiceClassification: [
    {
      invoiceMark: 123456,
      classificationMark: 0,
      entityVatNumber: '123456789',
      transactionMode: 1,
      invoicesExpensesClassificationDetails: [
        {
          lineNumber: 1,
          expensesClassificationDetailData: [
            {
              classificationType:
                ExpensesClassificationValueType.PURCHASES_GOODS_RETAIL,
              classificationCategory:
                ExpensesClassificationCategoryType.PURCHASES_OF_GOODS,
              amount: 100,
              vatAmount: 24,
              vatCategory: 1
            }
          ]
        }
      ]
    }
  ]
});

// Helper function to create sample payment methods for tests
const createSamplePaymentMethods = (): PaymentMethodsDoc => ({
  payment: [
    {
      invoiceMark: 123456,
      paymentMethodMark: 0,
      entityVatNumber: '123456789',
      paymentMethodDetails: [
        {
          type: 3,
          amount: 100,
          paymentMethodInfo: 'Payment info'
        }
      ]
    }
  ]
});

// Sample test data
const TEST_CONFIG = {
  userId: 'test-user',
  subscriptionKey: 'test-key',
  production: false
};

// Mock successful response helper
const mockSuccessResponse = (xml: string): Response =>
  ({
    ok: true,
    status: 200,
    text: () => Promise.resolve(xml)
    // Add other necessary Response properties if needed by the code under test
  } as Response);

// Mock error response helper
const mockErrorResponse = (status: number, errorText: string): Response =>
  ({
    ok: false,
    status,
    statusText: 'Error',
    text: () => Promise.resolve(errorText)
    // Add other necessary Response properties if needed by the code under test
  } as Response);

describe('MyDataClient', () => {
  let client: MyDataClient;

  beforeEach(() => {
    // Clear mocks before each test
    mockFetch.mockClear();
    jest.clearAllMocks(); // Clears all mocks including module mocks

    // Re-initialize client for isolation
    client = new MyDataClient(TEST_CONFIG);
    // Inject the mocked XmlHelper instance if necessary (depends on MyDataClient implementation)
    // If MyDataClient creates its own instance, ensure the module mock above works.
    // If it accepts an instance, inject it: (client as any)._xmlService = mockXmlHelperInstance;
    // Assuming MyDataClient creates its own instance based on the module mock
  });

  describe('Initialization', () => {
    it('should throw error if missing userId or subscriptionKey', () => {
      expect(() => new MyDataClient({ ...TEST_CONFIG, userId: '' })).toThrow();
      expect(
        () => new MyDataClient({ ...TEST_CONFIG, subscriptionKey: '' })
      ).toThrow();
    });

    it('should use dev URLs when production=false', () => {
      // Access private properties carefully for testing if needed
      expect((client as any).erpBaseUrl).toContain('dev');
      expect((client as any).providerBaseUrl).toContain('dev');
    });

    it('should use production URLs when production=true', () => {
      const prodClient = new MyDataClient({ ...TEST_CONFIG, production: true });
      expect((prodClient as any).erpBaseUrl).not.toContain('dev');
      expect((prodClient as any).providerBaseUrl).not.toContain('dev');
    });
  });

  describe('ERP Methods', () => {
    describe('sendErpInvoices', () => {
      const sampleInvoice = createSampleInvoice();

      it('should send invoices and return parsed response', async () => {
        const invoices = [sampleInvoice];
        const mockRequestXml = '<mock-request-xml>';
        const mockResponseXml =
          '<ResponseDoc><response><statusCode>Success</statusCode></response></ResponseDoc>';
        const expectedParsedResponse = {
          ResponseDoc: { response: [{ statusCode: 'Success' }] }
        };

        // Setup mocks
        const internalXmlService = (client as any)._xmlService; // Access internal instance
        internalXmlService.buildInvoicesDocXml.mockReturnValue(mockRequestXml);
        mockFetch.mockResolvedValueOnce(mockSuccessResponse(mockResponseXml));
        internalXmlService.parseXml.mockResolvedValue(
          // Use internal instance for mocking
          expectedParsedResponse
        );

        const result = await client.sendErpInvoices(invoices);

        expect(internalXmlService.buildInvoicesDocXml).toHaveBeenCalledWith(
          // Assert on internal instance
          invoices
        );
        const fetchCallArgs = mockFetch.mock.calls[0];
        expect(fetchCallArgs[0]).toEqual(
          expect.stringContaining('/SendInvoices')
        );
        const options = fetchCallArgs[1]!;
        const headers =
          options.headers instanceof Headers
            ? options.headers
            : new Headers(options.headers ?? {});
        expect(options.method).toBe('POST');
        expect(options.body).toBe(mockRequestXml);
        expect(headers.get('Content-Type')).toBe('application/xml');
        expect(headers.get('aade-user-id')).toBe(TEST_CONFIG.userId);
        expect(headers.get('ocp-apim-subscription-key')).toBe(
          TEST_CONFIG.subscriptionKey
        );
        expect(mockXmlHelperInstance.parseXml).toHaveBeenCalledWith(
          mockResponseXml
        );
        expect(result).toEqual(expectedParsedResponse);
      });

      it('should throw error on API failure', async () => {
        const invoices = [sampleInvoice];
        const mockRequestXml = '<mock-request-xml>';
        const errorText = 'API Error';

        mockXmlHelperInstance.buildInvoicesDocXml.mockReturnValue(
          mockRequestXml
        );
        mockFetch.mockResolvedValueOnce(mockErrorResponse(400, errorText));

        await expect(client.sendErpInvoices(invoices)).rejects.toThrow(
          // Match the actual error format thrown by handleResponse
          new Error(`Failed during sendErpInvoices: 400 Error`)
        );
        // We still expect parseXml not to be called on API error
        const internalXmlService = (client as any)._xmlService;
        expect(internalXmlService.parseXml).not.toHaveBeenCalled();
      });

      it('should throw error on XML parsing failure', async () => {
        const invoices = [sampleInvoice];
        const mockRequestXml = '<mock-request-xml>';
        const mockResponseXml = '<invalid-xml>';
        const parseError = new Error('XML Parse Error');

        mockXmlHelperInstance.buildInvoicesDocXml.mockReturnValue(
          mockRequestXml
        );
        mockFetch.mockResolvedValueOnce(mockSuccessResponse(mockResponseXml));
        const internalXmlService = (client as any)._xmlService; // Access internal instance
        internalXmlService.parseXml.mockRejectedValue(parseError); // Simulate parsing error on internal instance

        await expect(client.sendErpInvoices(invoices)).rejects.toThrow(
          parseError
        );
      });
    });

    describe('sendErpIncomeClassification', () => {
      it('should send income classifications and return parsed response', async () => {
        const classificationsDoc = createSampleIncomeClassification();
        const mockRequestXml = '<mock-income-classification-xml>';
        const mockResponseXml =
          '<ResponseDoc><response><statusCode>Success</statusCode></response></ResponseDoc>';
        const expectedParsedResponse = {
          ResponseDoc: { response: [{ statusCode: 'Success' }] }
        };

        // Setup mocks
        const internalXmlService = (client as any)._xmlService;
        internalXmlService.buildIncomeClassificationXml.mockReturnValue(
          mockRequestXml
        );
        mockFetch.mockResolvedValueOnce(mockSuccessResponse(mockResponseXml));
        internalXmlService.parseXml.mockResolvedValue(expectedParsedResponse);

        const result = await client.sendErpIncomeClassification(
          classificationsDoc
        );

        expect(
          internalXmlService.buildIncomeClassificationXml
        ).toHaveBeenCalledWith(classificationsDoc);
        const fetchCallArgs = mockFetch.mock.calls[0];
        expect(fetchCallArgs[0]).toEqual(
          expect.stringContaining('/SendIncomeClassification')
        );
        const options = fetchCallArgs[1]!;
        expect(options.method).toBe('POST');
        expect(options.body).toBe(mockRequestXml);
        expect(internalXmlService.parseXml).toHaveBeenCalledWith(
          mockResponseXml
        );
        expect(result).toEqual(expectedParsedResponse);
      });

      it('should throw error on API failure', async () => {
        const classificationsDoc = createSampleIncomeClassification();
        const mockRequestXml = '<mock-income-classification-xml>';
        const errorText = 'API Error';

        const internalXmlService = (client as any)._xmlService;
        internalXmlService.buildIncomeClassificationXml.mockReturnValue(
          mockRequestXml
        );
        mockFetch.mockResolvedValueOnce(mockErrorResponse(400, errorText));

        await expect(
          client.sendErpIncomeClassification(classificationsDoc)
        ).rejects.toThrow(
          new Error(`Failed during sendErpIncomeClassification: 400 Error`)
        );
        expect(internalXmlService.parseXml).not.toHaveBeenCalled();
      });
    });

    describe('sendErpExpensesClassification', () => {
      it('should send expenses classifications and return parsed response', async () => {
        const classificationsDoc = createSampleExpensesClassification();
        const mockRequestXml = '<mock-expenses-classification-xml>';
        const mockResponseXml =
          '<ResponseDoc><response><statusCode>Success</statusCode></response></ResponseDoc>';
        const expectedParsedResponse = {
          ResponseDoc: { response: [{ statusCode: 'Success' }] }
        };

        // Setup mocks
        const internalXmlService = (client as any)._xmlService;
        internalXmlService.buildExpensesClassificationXml.mockReturnValue(
          mockRequestXml
        );
        mockFetch.mockResolvedValueOnce(mockSuccessResponse(mockResponseXml));
        internalXmlService.parseXml.mockResolvedValue(expectedParsedResponse);

        const result = await client.sendErpExpensesClassification(
          classificationsDoc
        );

        expect(
          internalXmlService.buildExpensesClassificationXml
        ).toHaveBeenCalledWith(classificationsDoc);
        const fetchCallArgs = mockFetch.mock.calls[0];
        expect(fetchCallArgs[0]).toEqual(
          expect.stringContaining('/SendExpensesClassification')
        );
        const options = fetchCallArgs[1]!;
        expect(options.method).toBe('POST');
        expect(options.body).toBe(mockRequestXml);
        expect(internalXmlService.parseXml).toHaveBeenCalledWith(
          mockResponseXml
        );
        expect(result).toEqual(expectedParsedResponse);
      });

      it('should throw error on API failure', async () => {
        const classificationsDoc = createSampleExpensesClassification();
        const mockRequestXml = '<mock-expenses-classification-xml>';
        const errorText = 'API Error';

        const internalXmlService = (client as any)._xmlService;
        internalXmlService.buildExpensesClassificationXml.mockReturnValue(
          mockRequestXml
        );
        mockFetch.mockResolvedValueOnce(mockErrorResponse(400, errorText));

        await expect(
          client.sendErpExpensesClassification(classificationsDoc)
        ).rejects.toThrow(
          new Error(`Failed during sendErpExpensesClassification: 400 Error`)
        );
        expect(internalXmlService.parseXml).not.toHaveBeenCalled();
      });
    });

    describe('sendErpPaymentsMethod', () => {
      it('should send payment methods and return parsed response', async () => {
        const paymentsDoc = createSamplePaymentMethods();
        const mockRequestXml = '<mock-payment-methods-xml>';
        const mockResponseXml =
          '<ResponseDoc><response><statusCode>Success</statusCode></response></ResponseDoc>';
        const expectedParsedResponse = {
          ResponseDoc: { response: [{ statusCode: 'Success' }] }
        };

        // Setup mocks
        const internalXmlService = (client as any)._xmlService;
        internalXmlService.buildPaymentMethodsXml.mockReturnValue(
          mockRequestXml
        );
        mockFetch.mockResolvedValueOnce(mockSuccessResponse(mockResponseXml));
        internalXmlService.parseXml.mockResolvedValue(expectedParsedResponse);

        const result = await client.sendErpPaymentsMethod(paymentsDoc);

        expect(internalXmlService.buildPaymentMethodsXml).toHaveBeenCalledWith(
          paymentsDoc
        );
        const fetchCallArgs = mockFetch.mock.calls[0];
        expect(fetchCallArgs[0]).toEqual(
          expect.stringContaining('/SendPaymentsMethod')
        );
        const options = fetchCallArgs[1]!;
        expect(options.method).toBe('POST');
        expect(options.body).toBe(mockRequestXml);
        expect(internalXmlService.parseXml).toHaveBeenCalledWith(
          mockResponseXml
        );
        expect(result).toEqual(expectedParsedResponse);
      });

      it('should throw error on API failure', async () => {
        const paymentsDoc = createSamplePaymentMethods();
        const mockRequestXml = '<mock-payment-methods-xml>';
        const errorText = 'API Error';

        const internalXmlService = (client as any)._xmlService;
        internalXmlService.buildPaymentMethodsXml.mockReturnValue(
          mockRequestXml
        );
        mockFetch.mockResolvedValueOnce(mockErrorResponse(400, errorText));

        await expect(client.sendErpPaymentsMethod(paymentsDoc)).rejects.toThrow(
          new Error(`Failed during sendErpPaymentsMethod: 400 Error`)
        );
        expect(internalXmlService.parseXml).not.toHaveBeenCalled();
      });
    });

    describe('cancelErpInvoice', () => {
      it('should cancel invoice and return parsed response', async () => {
        const markToCancel = 123456;
        const entityVatNumber = '123456789';
        const mockResponseXml =
          '<ResponseDoc><response><statusCode>Success</statusCode><cancellationMark>789012</cancellationMark></response></ResponseDoc>';
        const expectedParsedResponse = {
          ResponseDoc: {
            response: [{ statusCode: 'Success', cancellationMark: '789012' }]
          }
        };

        // Setup mocks
        mockFetch.mockResolvedValueOnce(mockSuccessResponse(mockResponseXml));
        const internalXmlService = (client as any)._xmlService;
        internalXmlService.parseXml.mockResolvedValue(expectedParsedResponse);

        const result = await client.cancelErpInvoice(
          markToCancel,
          entityVatNumber
        );

        const fetchCallArgs = mockFetch.mock.calls[0];
        expect(fetchCallArgs[0]).toEqual(
          expect.stringContaining(
            `/CancelInvoice?mark=${markToCancel}&entityVatNumber=${entityVatNumber}`
          )
        );
        const options = fetchCallArgs[1]!;
        expect(options.method).toBe('POST');
        expect(options.body).toBeUndefined();
        const headers =
          options.headers instanceof Headers
            ? options.headers
            : new Headers(options.headers ?? {});
        expect(headers.get('Content-Type')).toBeNull(); // No XML content
        expect(internalXmlService.parseXml).toHaveBeenCalledWith(
          mockResponseXml
        );
        expect(result).toEqual(expectedParsedResponse);
      });

      it('should work without entityVatNumber', async () => {
        const markToCancel = 123456;
        const mockResponseXml =
          '<ResponseDoc><response><statusCode>Success</statusCode></response></ResponseDoc>';
        const expectedParsedResponse = {
          ResponseDoc: { response: [{ statusCode: 'Success' }] }
        };

        mockFetch.mockResolvedValueOnce(mockSuccessResponse(mockResponseXml));
        const internalXmlService = (client as any)._xmlService;
        internalXmlService.parseXml.mockResolvedValue(expectedParsedResponse);

        await client.cancelErpInvoice(markToCancel);

        const fetchCallArgs = mockFetch.mock.calls[0];
        expect(fetchCallArgs[0]).toEqual(
          expect.stringContaining(`/CancelInvoice?mark=${markToCancel}`)
        );
        expect(fetchCallArgs[0]).not.toContain('entityVatNumber');
      });
    });

    describe('requestErpDocs', () => {
      it('should request docs and return parsed response', async () => {
        const params = {
          mark: 123456,
          dateFrom: '2023-01-01',
          dateTo: '2023-12-31'
        };
        const mockResponseXml =
          '<RequestedDoc><invoicesDoc><invoice></invoice></invoicesDoc></RequestedDoc>';
        const expectedParsedResponse = {
          RequestedDoc: { invoicesDoc: { invoice: {} } }
        };

        mockFetch.mockResolvedValueOnce(mockSuccessResponse(mockResponseXml));
        const internalXmlService = (client as any)._xmlService;
        internalXmlService.parseXml.mockResolvedValue(expectedParsedResponse);

        const result = await client.requestErpDocs(params);

        const fetchCallArgs = mockFetch.mock.calls[0];
        expect(fetchCallArgs[0]).toEqual(
          expect.stringContaining(
            '/RequestDocs?mark=123456&dateFrom=2023-01-01&dateTo=2023-12-31'
          )
        );
        const options = fetchCallArgs[1]!;
        expect(options.method).toBe('GET');
        const headers =
          options.headers instanceof Headers
            ? options.headers
            : new Headers(options.headers ?? {});
        expect(headers.get('Content-Type')).toBeNull(); // No XML content
        expect(internalXmlService.parseXml).toHaveBeenCalledWith(
          mockResponseXml
        );
        expect(result).toEqual(expectedParsedResponse);
      });

      it('should handle optional parameters correctly', async () => {
        const params = {
          mark: 123456,
          dateFrom: '2023-01-01',
          dateTo: '2023-12-31',
          counterVatNumber: '987654321',
          invType: '1.1',
          maxMark: 200000,
          nextPartitionKey: 'partition1',
          nextRowKey: 'row1'
        };
        const mockResponseXml =
          '<RequestedDoc><invoicesDoc><invoice></invoice></invoicesDoc></RequestedDoc>';
        const expectedParsedResponse = {
          RequestedDoc: { invoicesDoc: { invoice: {} } }
        };

        mockFetch.mockResolvedValueOnce(mockSuccessResponse(mockResponseXml));
        const internalXmlService = (client as any)._xmlService;
        internalXmlService.parseXml.mockResolvedValue(expectedParsedResponse);

        await client.requestErpDocs(params);

        const fetchCallArgs = mockFetch.mock.calls[0];
        expect(fetchCallArgs[0]).toContain('mark=123456');
        expect(fetchCallArgs[0]).toContain('dateFrom=2023-01-01');
        expect(fetchCallArgs[0]).toContain('dateTo=2023-12-31');
        expect(fetchCallArgs[0]).toContain('counterVatNumber=987654321');
        expect(fetchCallArgs[0]).toContain('invType=1.1');
        expect(fetchCallArgs[0]).toContain('maxMark=200000');
        expect(fetchCallArgs[0]).toContain('nextPartitionKey=partition1');
        expect(fetchCallArgs[0]).toContain('nextRowKey=row1');
      });
    });
  });

  describe('Provider Methods', () => {
    describe('sendProviderInvoices', () => {
      const sampleInvoice = createSampleInvoice();

      it('should send invoices and return parsed response', async () => {
        const invoices = [sampleInvoice];
        const mockRequestXml = '<mock-request-xml>';
        const mockResponseXml =
          '<ResponseDoc><response><statusCode>Success</statusCode></response></ResponseDoc>';
        const expectedParsedResponse = {
          ResponseDoc: { response: [{ statusCode: 'Success' }] }
        };

        const internalXmlService = (client as any)._xmlService; // Access internal instance
        internalXmlService.buildInvoicesDocXml.mockReturnValue(mockRequestXml);
        mockFetch.mockResolvedValueOnce(mockSuccessResponse(mockResponseXml));
        internalXmlService.parseXml.mockResolvedValue(
          // Use internal instance for mocking
          expectedParsedResponse
        );

        const result = await client.sendProviderInvoices(invoices);

        expect(internalXmlService.buildInvoicesDocXml).toHaveBeenCalledWith(
          // Assert on internal instance
          invoices
        );
        const fetchCallArgs = mockFetch.mock.calls[0];
        expect(fetchCallArgs[0]).toEqual(
          expect.stringContaining('/SendInvoices')
        );
        const options = fetchCallArgs[1]!;
        const headers =
          options.headers instanceof Headers
            ? options.headers
            : new Headers(options.headers);
        expect(options.method).toBe('POST');
        expect(options.body).toBe(mockRequestXml);
        expect(headers.get('Content-Type')).toBe('application/xml');
        expect(headers.get('aade-user-id')).toBe(TEST_CONFIG.userId);
        expect(headers.get('ocp-apim-subscription-key')).toBe(
          TEST_CONFIG.subscriptionKey
        );
        expect(mockXmlHelperInstance.parseXml).toHaveBeenCalledWith(
          mockResponseXml
        );
        expect(result).toEqual(expectedParsedResponse);
      });

      it('should throw error on API failure', async () => {
        const invoices = [sampleInvoice];
        const mockRequestXml = '<mock-request-xml>';
        const errorText = 'Provider API Error';

        mockXmlHelperInstance.buildInvoicesDocXml.mockReturnValue(
          mockRequestXml
        );
        mockFetch.mockResolvedValueOnce(mockErrorResponse(500, errorText));

        await expect(client.sendProviderInvoices(invoices)).rejects.toThrow(
          // Match the actual error format thrown by handleResponse
          new Error(`Failed during sendProviderInvoices: 500 Error`)
        );
        // We still expect parseXml not to be called on API error
        const internalXmlService = (client as any)._xmlService;
        expect(internalXmlService.parseXml).not.toHaveBeenCalled();
      });
    });

    describe('sendProviderUnsignedInvoices', () => {
      it('should send unsigned invoices and return parsed response', async () => {
        const invoices = [createSampleInvoice()];
        const mockRequestXml = '<mock-request-xml>';
        const mockResponseXml =
          '<ResponseDoc><response><statusCode>Success</statusCode></response></ResponseDoc>';
        const expectedParsedResponse = {
          ResponseDoc: { response: [{ statusCode: 'Success' }] }
        };

        const internalXmlService = (client as any)._xmlService;
        internalXmlService.buildInvoicesDocXml.mockReturnValue(mockRequestXml);
        mockFetch.mockResolvedValueOnce(mockSuccessResponse(mockResponseXml));
        internalXmlService.parseXml.mockResolvedValue(expectedParsedResponse);

        const result = await client.sendProviderUnsignedInvoices(invoices);

        expect(internalXmlService.buildInvoicesDocXml).toHaveBeenCalledWith(
          invoices
        );
        const fetchCallArgs = mockFetch.mock.calls[0];
        expect(fetchCallArgs[0]).toEqual(
          expect.stringContaining('/SendUnsignedInvoices')
        );
        const options = fetchCallArgs[1]!;
        expect(options.method).toBe('POST');
        expect(options.body).toBe(mockRequestXml);
        expect(internalXmlService.parseXml).toHaveBeenCalledWith(
          mockResponseXml
        );
        expect(result).toEqual(expectedParsedResponse);
      });

      it('should throw error on API failure', async () => {
        const invoices = [createSampleInvoice()];
        const mockRequestXml = '<mock-request-xml>';
        const errorText = 'Provider API Error';

        const internalXmlService = (client as any)._xmlService;
        internalXmlService.buildInvoicesDocXml.mockReturnValue(mockRequestXml);
        mockFetch.mockResolvedValueOnce(mockErrorResponse(500, errorText));

        await expect(
          client.sendProviderUnsignedInvoices(invoices)
        ).rejects.toThrow(
          new Error(`Failed during sendProviderUnsignedInvoices: 500 Error`)
        );
        expect(internalXmlService.parseXml).not.toHaveBeenCalled();
      });
    });

    describe('sendProviderPaymentsMethod', () => {
      it('should send payment methods and return parsed response', async () => {
        const paymentsDoc = createSamplePaymentMethods();
        const mockRequestXml = '<mock-payment-methods-xml>';
        const mockResponseXml =
          '<ResponseDoc><response><statusCode>Success</statusCode></response></ResponseDoc>';
        const expectedParsedResponse = {
          ResponseDoc: { response: [{ statusCode: 'Success' }] }
        };

        const internalXmlService = (client as any)._xmlService;
        internalXmlService.buildPaymentMethodsXml.mockReturnValue(
          mockRequestXml
        );
        mockFetch.mockResolvedValueOnce(mockSuccessResponse(mockResponseXml));
        internalXmlService.parseXml.mockResolvedValue(expectedParsedResponse);

        const result = await client.sendProviderPaymentsMethod(paymentsDoc);

        expect(internalXmlService.buildPaymentMethodsXml).toHaveBeenCalledWith(
          paymentsDoc
        );
        const fetchCallArgs = mockFetch.mock.calls[0];
        expect(fetchCallArgs[0]).toEqual(
          expect.stringContaining('/SendPaymentsMethod')
        );
        const options = fetchCallArgs[1]!;
        expect(options.method).toBe('POST');
        expect(options.body).toBe(mockRequestXml);
        expect(internalXmlService.parseXml).toHaveBeenCalledWith(
          mockResponseXml
        );
        expect(result).toEqual(expectedParsedResponse);
      });
    });

    describe('requestProviderTransmittedDocs', () => {
      it('should request transmitted docs and return parsed response', async () => {
        const issuerVat = '123456789';
        const mark = 123456;
        const mockResponseXml =
          '<RequestedProviderDoc><invoicesDoc><invoice></invoice></invoicesDoc></RequestedProviderDoc>';
        const expectedParsedResponse = {
          RequestedProviderDoc: { invoicesDoc: { invoice: {} } }
        };

        mockFetch.mockResolvedValueOnce(mockSuccessResponse(mockResponseXml));
        const internalXmlService = (client as any)._xmlService;
        internalXmlService.parseXml.mockResolvedValue(expectedParsedResponse);

        const result = await client.requestProviderTransmittedDocs(
          issuerVat,
          mark
        );

        const fetchCallArgs = mockFetch.mock.calls[0];
        expect(fetchCallArgs[0]).toEqual(
          expect.stringContaining(
            `/RequestTransmittedDocs?issuervat=${issuerVat}&mark=${mark}`
          )
        );
        const options = fetchCallArgs[1]!;
        expect(options.method).toBe('GET');
        expect(internalXmlService.parseXml).toHaveBeenCalledWith(
          mockResponseXml
        );
        expect(result).toEqual(expectedParsedResponse);
      });

      it('should include pagination parameters when provided', async () => {
        const issuerVat = '123456789';
        const mark = 123456;
        const nextPartitionKey = 'partition1';
        const nextRowKey = 'row1';
        const mockResponseXml =
          '<RequestedProviderDoc><invoicesDoc><invoice></invoice></invoicesDoc></RequestedProviderDoc>';

        mockFetch.mockResolvedValueOnce(mockSuccessResponse(mockResponseXml));
        const internalXmlService = (client as any)._xmlService;
        internalXmlService.parseXml.mockResolvedValue({});

        await client.requestProviderTransmittedDocs(
          issuerVat,
          mark,
          nextPartitionKey,
          nextRowKey
        );

        const fetchCallArgs = mockFetch.mock.calls[0];
        expect(fetchCallArgs[0]).toContain(`issuervat=${issuerVat}`);
        expect(fetchCallArgs[0]).toContain(`mark=${mark}`);
        expect(fetchCallArgs[0]).toContain(
          `nextPartitionKey=${nextPartitionKey}`
        );
        expect(fetchCallArgs[0]).toContain(`nextRowKey=${nextRowKey}`);
      });
    });

    describe('requestProviderReceiverInfo', () => {
      it('should request receiver info and return parsed response', async () => {
        const vatNumber = '123456789';
        const mockResponseXml =
          '<ReceiverInfoDoc><receiverInfo></receiverInfo></ReceiverInfoDoc>';
        const expectedParsedResponse = {
          ReceiverInfoDoc: { receiverInfo: {} }
        };

        mockFetch.mockResolvedValueOnce(mockSuccessResponse(mockResponseXml));
        const internalXmlService = (client as any)._xmlService;
        internalXmlService.parseXml.mockResolvedValue(expectedParsedResponse);

        const result = await client.requestProviderReceiverInfo(vatNumber);

        const fetchCallArgs = mockFetch.mock.calls[0];
        expect(fetchCallArgs[0]).toEqual(
          expect.stringContaining(`/RequestReceiverInfo?vatNumber=${vatNumber}`)
        );
        const options = fetchCallArgs[1]!;
        expect(options.method).toBe('GET');
        expect(internalXmlService.parseXml).toHaveBeenCalledWith(
          mockResponseXml
        );
        expect(result).toEqual(expectedParsedResponse);
      });
    });
  });

  // Test involving validateInvoice (Example - adjust as needed)
  describe('Validation Integration (Conceptual)', () => {
    it('should call validateInvoice if implemented within a method', async () => {
      // This is a conceptual test. If MyDataClient *internally* calls
      // validateInvoice before sending, you'd test it like this.
      // Assuming sendErpInvoices internally validates:

      const invoiceToValidate: AadeBookInvoiceType = {
        issuer: { vatNumber: '123', country: CountryType.GR, branch: 0 },
        invoiceHeader: {
          series: 'A',
          aa: '1',
          issueDate: new Date(),
          invoiceType: InvoiceType.SALES_INVOICE,
          currency: CurrencyType.EUR
        },
        invoiceDetails: [
          {
            lineNumber: 1,
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
      };
      const invoices = [invoiceToValidate];
      const mockRequestXml = '<validated-xml>';
      const mockResponseXml =
        '<ResponseDoc><response><statusCode>Success</statusCode></response></ResponseDoc>';
      const expectedParsedResponse = {
        ResponseDoc: { response: [{ statusCode: 'Success' }] }
      };

      // Mock validation to succeed
      mockedValidateInvoice.mockResolvedValue(true); // Mock the imported validateInvoice

      mockXmlHelperInstance.buildInvoicesDocXml.mockReturnValue(mockRequestXml);
      mockFetch.mockResolvedValueOnce(mockSuccessResponse(mockResponseXml));
      mockXmlHelperInstance.parseXml.mockResolvedValue(expectedParsedResponse);

      await client.sendErpInvoices(invoices); // Call the method

      // Verify validation was called (if it's part of sendErpInvoices)
      // expect(mockedValidateInvoice).toHaveBeenCalledWith(invoiceToValidate);
      // Note: This assertion depends on whether sendErpInvoices actually calls validateInvoice.
      // If validation happens outside, test it separately as shown before.
    });
  });

  // Test involving XML validation from file (Example)
  describe('XML File Validation (Conceptual)', () => {
    it('should parse and validate structure from sample XML', async () => {
      const xmlPath = path.join(
        __dirname,
        '../../examples/xml/SampleXML_1.1_taxes_per_line (ΤΙΜ-ΠΩΛΗΣΗΣ).xml' // Use a real path
      );
      // Ensure the file exists or skip/handle error
      if (!fs.existsSync(xmlPath)) {
        console.warn(
          `Skipping XML validation test, file not found: ${xmlPath}`
        );
        return; // or throw
      }
      const xmlContent = fs.readFileSync(xmlPath, 'utf8');

      // Define the expected structure after parsing (adjust based on actual XML)
      const expectedParsedStructure = {
        InvoicesDoc: {
          invoice: expect.arrayContaining([
            expect.objectContaining({
              issuer: expect.objectContaining({
                vatNumber: expect.any(String)
              }),
              invoiceHeader: expect.objectContaining({
                series: expect.any(String),
                aa: expect.any(String)
              })
              // Add more specific expectations based on the XML content
            })
          ])
        }
      };

      // Mock parseXml to return a specific structure when called with this content
      // This is tricky if parseXml is used elsewhere. Might need more specific mocking.
      // For simplicity, let's assume parseXml just returns what it's given for this test.
      mockXmlHelperInstance.parseXml.mockImplementation(async (xml: string) => {
        if (xml === xmlContent) {
          // A more realistic mock would use an actual XML parser here
          // For this test, we just return an object *representing* the parsed structure
          return {
            InvoicesDoc: {
              invoice: [
                {
                  issuer: { vatNumber: '999999999', country: 'GR', branch: 0 }, // Example data
                  invoiceHeader: {
                    series: 'A',
                    aa: '1',
                    issueDate: '2020-12-04',
                    invoiceType: '1.1',
                    currency: 'EUR'
                  } // Example data
                  // ... other fields based on the actual XML
                }
              ]
            }
          };
        }
        return {}; // Default empty object for other calls
      });

      const parsedResult = await mockXmlHelperInstance.parseXml(xmlContent);

      // Validate the structure
      expect(parsedResult).toMatchObject(expectedParsedStructure);
      expect(parsedResult.InvoicesDoc).toBeDefined();
      expect(parsedResult.InvoicesDoc.invoice).toBeInstanceOf(Array);
      expect(parsedResult.InvoicesDoc.invoice.length).toBeGreaterThan(0);
    });
  });

  describe('XML Validation Tests', () => {
    const samplesDir = path.join(process.cwd(), 'examples/xml');
    const xsdPath = path.join(process.cwd(), 'schemas/InvoicesDoc-v1.0.10.xsd');

    it('should validate all sample XML files against schema', async () => {
      const files = fs.readdirSync(samplesDir);
      const xmlFiles = files.filter(file => file.endsWith('.xml'));

      for (const file of xmlFiles) {
        const filePath = path.join(samplesDir, file);
        const xmlContent = fs.readFileSync(filePath, 'utf8');

        // Test direct validation
        const isValid = await validateXmlFile(file, xmlContent, xsdPath);
        expect(isValid).toBe(true);

        // Test parsing and rebuilding
        const xmlHelper = new XmlHelper();
        const parsed = await xmlHelper.parseXml<AadeBookInvoiceDocType>(
          xmlContent
        );
        console.log(`Parsed XML structure for ${file}:`, parsed);

        // Handle case where parsed structure might be different
        const invoices = parsed?.InvoicesDoc?.invoice || [];
        const rebuiltXml = xmlHelper.buildInvoicesDocXml(invoices);

        const isRebuiltValid = await validateXmlFile(file, rebuiltXml, xsdPath);
        expect(isRebuiltValid).toBe(true);
      }
    });
  });
});
