// Using browser-native fetch API and URLSearchParams

import {
  MYDATA_ERP_BASE_URL,
  MYDATA_PROVIDER_BASE_URL,
  MYDATA_DEV_ERP_BASE_URL,
  MYDATA_DEV_PROVIDER_BASE_URL
} from '../constants';
import { XmlHelper } from './internal/xml-helper';

// --- Import ALL necessary models ---
import { AadeBookInvoiceType } from '../models/invoice.model';
import { ResponseDoc } from '../models/response.model';
import { IncomeClassificationsDoc } from '../models/incomeClassification.model';
import { ExpensesClassificationsDoc } from '../models/expensesClassification.model';
import { PaymentMethodsDoc } from '../models/paymentMethods.model';
import { RequestedDoc } from '../models/requestedDoc.model';
import { RequestedProviderDoc } from '../models/requestedProviderDoc.model';
import { ReceiverInfoDoc } from '../models/receiverInfoDoc.model';
import { RequestedBookInfo } from '../models/requestedBookInfo.model';
import { RequestedVatInfo } from '../models/requestVatInfoResponse.model';
import { RequestedE3Info } from '../models/requestE3InfoResponse.model';
import { requestParamsToUrlParams } from './internal/utils';
import {
  RequestDocParams,
  RequestMyDataParams,
  RequestVatE3Params
} from '../models/request-params.model';
import { request } from 'http';

export interface MyDataClientConfig {
  userId: string;
  subscriptionKey: string;
  production: boolean;
}

/**
 * MyDATA API Service (Browser & Node.js compatible)
 *
 * This service provides functions for interacting with the Greek myDATA API for both ERP and Provider users.
 */
export class MyDataClient {
  private _xmlService = new XmlHelper();
  private _userId: string;
  private _subscriptionKey: string;
  private _production = false;

  private get erpBaseUrl() {
    return this._production ? MYDATA_ERP_BASE_URL : MYDATA_DEV_ERP_BASE_URL;
  }

  private get providerBaseUrl() {
    return this._production
      ? MYDATA_PROVIDER_BASE_URL
      : MYDATA_DEV_PROVIDER_BASE_URL;
  }

  constructor(initConfig: MyDataClientConfig) {
    this._userId = initConfig.userId;
    this._subscriptionKey = initConfig.subscriptionKey;
    this._production = !!initConfig.production;

    if (!this._userId || !this._subscriptionKey) {
      throw new Error(
        'userId and subscriptionKey must be provided in the config'
      );
    }
  }

  private getHeaders(isXmlContent: boolean = true): Headers {
    const headers = new Headers();
    headers.set('aade-user-id', this._userId);
    headers.set('ocp-apim-subscription-key', this._subscriptionKey);
    if (isXmlContent) {
      headers.set('Content-Type', 'application/xml');
    }
    return headers;
  }

  private async handleResponse<T>(
    response: globalThis.Response,
    context: string
  ): Promise<T> {
    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `myDATA API Error (${context}): ${response.status} ${response.statusText}\n${errorText}`
      );
      throw new Error(
        `Failed during ${context}: ${response.status} ${response.statusText}`
      );
    }
    const xmlResponse = await response.text();
    const jsResponse: T = await this._xmlService.parseXml<T>(xmlResponse);
    return jsResponse;
  }

  /**
   * [ERP] Sends one or more invoices, including corrected/amending ones.
   * @param invoices Array of invoice objects
   * @returns The full ResponseDoc from myDATA
   */
  async sendErpInvoices(invoices: AadeBookInvoiceType[]): Promise<ResponseDoc> {
    const xml = this._xmlService.buildInvoicesDocXml(invoices);

    console.log('[ERP] Sending Invoices...');
    const response = await fetch(`${this.erpBaseUrl}/SendInvoices`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: xml
    });

    return this.handleResponse<ResponseDoc>(response, 'sendErpInvoices');
  }

  /**
   * [ERP] Sends one or more income classifications, corresponding to already submitted invoices.
   * @param classificationsDoc Object containing income classifications
   * @returns The full ResponseDoc from myDATA
   */
  async sendErpIncomeClassification(
    classificationsDoc: IncomeClassificationsDoc
  ): Promise<ResponseDoc> {
    const xml =
      this._xmlService.buildIncomeClassificationXml(classificationsDoc);

    console.log('[ERP] Sending Income Classifications...');
    const response = await fetch(
      `${this.erpBaseUrl}/SendIncomeClassification`,
      {
        method: 'POST',
        headers: this.getHeaders(),
        body: xml
      }
    );
    return this.handleResponse<ResponseDoc>(
      response,
      'sendErpIncomeClassification'
    );
  }

  /**
   * [ERP] Sends one or more expense classifications.
   * @param classificationsDoc Object containing classifications
   * @returns The full ResponseDoc from myDATA
   */
  async sendErpExpensesClassification(
    classificationsDoc: ExpensesClassificationsDoc
  ): Promise<ResponseDoc> {
    const xml =
      this._xmlService.buildExpensesClassificationXml(classificationsDoc);

    console.log('[ERP] Sending Expense Classifications...');
    const response = await fetch(
      `${this.erpBaseUrl}/SendExpensesClassification`,
      {
        method: 'POST',
        headers: this.getHeaders(),
        body: xml
      }
    );
    return this.handleResponse<ResponseDoc>(
      response,
      'sendErpExpensesClassification'
    );
  }

  /**
   * [ERP] Sends payment methods for an invoice.
   * @param paymentsDoc Object containing payment methods
   * @returns The full ResponseDoc from myDATA
   */
  async sendErpPaymentsMethod(
    paymentsDoc: PaymentMethodsDoc
  ): Promise<ResponseDoc> {
    const xml = this._xmlService.buildPaymentMethodsXml(paymentsDoc);

    console.log('[ERP] Sending Payment Methods...');
    const response = await fetch(`${this.erpBaseUrl}/SendPaymentsMethod`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: xml
    });
    return this.handleResponse<ResponseDoc>(response, 'sendErpPaymentsMethod');
  }

  /**
   * [ERP] Cancels a previously transmitted invoice.
   * @param mark The MARK of the invoice to cancel
   * @param entityVatNumber Optional: VAT of the entity if called by a representative
   * @returns The full ResponseDoc from myDATA (containing cancellationMark on success)
   */
  async cancelErpInvoice(
    mark: number,
    entityVatNumber?: string
  ): Promise<ResponseDoc> {
    const params = requestParamsToUrlParams({
      mark,
      entityVatNumber
    });

    const url = `${this.erpBaseUrl}/CancelInvoice?${params.toString()}`;
    console.log(`[ERP] Cancelling Invoice MARK: ${mark}...`);

    const response = await fetch(url, {
      method: 'POST', // API Doc specifies POST, even with query params
      headers: this.getHeaders(false), // No XML body
      body: undefined // Send no body
    });

    return this.handleResponse<ResponseDoc>(response, 'cancelErpInvoice');
  }

  /**
   * [ERP] Requests documents (invoices, classifications, cancellations) received from others.
   * @param params Search parameters
   * @returns Parsed RequestedDoc object
   */
  async requestErpDocs(params: RequestDocParams): Promise<RequestedDoc> {
    const queryParams = requestParamsToUrlParams(params);

    const url = `${this.erpBaseUrl}/RequestDocs?${queryParams.toString()}`;
    console.log('[ERP] Requesting Received Docs...');

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(false)
    });

    // TODO: Ensure XmlService.parseXml handles <req:RequestedDoc> root
    return this.handleResponse<RequestedDoc>(response, 'requestErpDocs');
  }

  /**
   * [ERP] Requests documents (invoices, classifications, cancellations) previously transmitted by the user.
   * @param params Search parameters
   * @returns Parsed RequestedDoc object
   */
  async requestErpTransmittedDocs(
    params: RequestDocParams
  ): Promise<RequestedDoc> {
    const queryParams = requestParamsToUrlParams(params);

    const url = `${
      this.erpBaseUrl
    }/RequestTransmittedDocs?${queryParams.toString()}`;
    console.log('[ERP] Requesting Transmitted Docs...', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(false)
    });

    // TODO: Ensure XmlService.parseXml handles <req:RequestedDoc> root
    return this.handleResponse<RequestedDoc>(
      response,
      'requestErpTransmittedDocs'
    );
  }

  /**
   * [ERP] Requests aggregated income data for a period.
   * @param params Search parameters (dateFrom, dateTo required)
   * @returns Parsed RequestedBookInfo object
   */
  async requestErpMyIncome(
    params: RequestMyDataParams
  ): Promise<RequestedBookInfo> {
    const queryParams = requestParamsToUrlParams(params);

    const url = `${this.erpBaseUrl}/RequestMyIncome?${queryParams.toString()}`;
    console.log('[ERP] Requesting MyIncome...');

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(false)
    });

    // TODO: Ensure XmlService.parseXml handles <reqbi:RequestedBookInfo> root
    return this.handleResponse<RequestedBookInfo>(
      response,
      'requestErpMyIncome'
    );
  }

  /**
   * [ERP] Requests aggregated expense data for a period.
   * @param params Search parameters (dateFrom, dateTo required)
   * @returns Parsed RequestedBookInfo object
   */
  async requestErpMyExpenses(
    params: RequestMyDataParams
  ): Promise<RequestedBookInfo> {
    const queryParams = requestParamsToUrlParams(params);

    const url = `${
      this.erpBaseUrl
    }/RequestMyExpenses?${queryParams.toString()}`;
    console.log('[ERP] Requesting MyExpenses...');

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(false)
    });

    // TODO: Ensure XmlService.parseXml handles <reqbi:RequestedBookInfo> root
    return this.handleResponse<RequestedBookInfo>(
      response,
      'requestErpMyExpenses'
    );
  }

  /**
   * [ERP] Requests VAT related data for a period.
   * @param params Search parameters (dateFrom, dateTo required)
   * @returns Parsed RequestedVatInfo object
   */
  async requestErpVatInfo(
    params: RequestVatE3Params
  ): Promise<RequestedVatInfo> {
    const queryParams = requestParamsToUrlParams(params);

    const url = `${this.erpBaseUrl}/RequestVatInfo?${queryParams.toString()}`;
    console.log('[ERP] Requesting VatInfo...');

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(false)
    });

    // TODO: Ensure XmlService.parseXml handles <reqvi:RequestedVatInfo> root
    return this.handleResponse<RequestedVatInfo>(response, 'requestErpVatInfo');
  }

  /**
   * [ERP] Requests E3 related data for a period.
   * @param params Search parameters (dateFrom, dateTo required)
   * @returns Parsed RequestedE3Info object
   */
  async requestErpE3Info(params: RequestVatE3Params): Promise<RequestedE3Info> {
    const queryParams = requestParamsToUrlParams(params);

    const url = `${this.erpBaseUrl}/RequestE3Info?${queryParams.toString()}`;
    console.log('[ERP] Requesting E3Info...');

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(false)
    });

    // TODO: Ensure XmlService.parseXml handles <RequestedE3Info> root
    return this.handleResponse<RequestedE3Info>(response, 'requestErpE3Info');
  }

  // --- Provider User Methods ---

  /**
   * [Provider] Sends one or more invoices.
   * @param invoices Array of invoice objects
   * @returns The full ResponseDoc from myDATA
   */
  async sendProviderInvoices(
    invoices: AadeBookInvoiceType[]
  ): Promise<ResponseDoc> {
    const xml = this._xmlService.buildInvoicesDocXml(invoices); // Reuses ERP version
    // console.log('[Provider] Sending Invoices...', xml);

    const response = await fetch(`${this.providerBaseUrl}/SendInvoices`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: xml
    });

    return this.handleResponse<ResponseDoc>(response, 'sendProviderInvoices');
  }

  /**
   * [Provider] Sends one or more invoices pending issuance (unsigned).
   * @param invoices Array of invoice objects
   * @returns The full ResponseDoc from myDATA
   */
  async sendProviderUnsignedInvoices(
    invoices: AadeBookInvoiceType[]
  ): Promise<ResponseDoc> {
    const xml = this._xmlService.buildInvoicesDocXml(invoices);

    console.log('[Provider] Sending Unsigned Invoices...');
    const response = await fetch(
      `${this.providerBaseUrl}/SendUnsignedInvoices`,
      {
        method: 'POST',
        headers: this.getHeaders(),
        body: xml
      }
    );

    return this.handleResponse<ResponseDoc>(
      response,
      'sendProviderUnsignedInvoices'
    );
  }

  /**
   * [Provider] Sends payment methods for an invoice.
   * @param paymentsDoc Object containing payment methods
   * @returns The full ResponseDoc from myDATA
   */
  async sendProviderPaymentsMethod(
    paymentsDoc: PaymentMethodsDoc
  ): Promise<ResponseDoc> {
    const xml = this._xmlService.buildPaymentMethodsXml(paymentsDoc);

    console.log('[Provider] Sending Payment Methods...');
    const response = await fetch(`${this.providerBaseUrl}/SendPaymentsMethod`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: xml
    });
    return this.handleResponse<ResponseDoc>(
      response,
      'sendProviderPaymentsMethod'
    );
  }

  /**
   * [Provider] Requests summaries of documents previously transmitted by the provider for a specific issuer.
   * @param issuerVat The VAT number of the issuer whose invoices were sent
   * @param mark The minimum MARK to retrieve (exclusive)
   * @param nextPartitionKey Optional key for pagination
   * @param nextRowKey Optional key for pagination
   * @returns Parsed RequestedProviderDoc object
   */
  async requestProviderTransmittedDocs(
    issuerVat: string,
    mark: number,
    nextPartitionKey?: string,
    nextRowKey?: string
  ): Promise<RequestedProviderDoc> {
    const params = requestParamsToUrlParams({
      issuerVat,
      mark,
      nextPartitionKey,
      nextRowKey
    });

    const url = `${
      this.providerBaseUrl
    }/RequestTransmittedDocs?${params.toString()}`;
    console.log(
      `[Provider] Requesting Transmitted Docs for VAT ${issuerVat}... url=${url}`
    );

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(false)
    });

    // TODO: Ensure XmlService.parseXml handles <RequestedProviderDoc> root
    return this.handleResponse<RequestedProviderDoc>(
      response,
      'requestProviderTransmittedDocs'
    );
  }

  /**
   * [Provider] Requests information about a recipient's registered providers and emails.
   * @param vatNumber The VAT number of the recipient entity to query
   * @returns Parsed ReceiverInfoDoc object
   */
  async requestProviderReceiverInfo(
    vatNumber: string
  ): Promise<ReceiverInfoDoc> {
    const params = requestParamsToUrlParams({
      vatNumber
    });

    const url = `${
      this.providerBaseUrl
    }/RequestReceiverInfo?${params.toString()}`;
    console.log(`[Provider] Requesting Receiver Info for VAT ${vatNumber}...`);

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(false)
    });

    // TODO: Ensure XmlService.parseXml handles <ReceiverInfoDoc> root
    return this.handleResponse<ReceiverInfoDoc>(
      response,
      'requestProviderReceiverInfo'
    );
  }
}
