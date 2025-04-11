# mydata-client

A TypeScript/JavaScript client library for the Greek myDATA (AADE) API, supporting both ERP and Provider users. Works in both Node.js and browser environments.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
  - [TypeScript (Browser & Node.js)](#typescript-browser--nodejs)
  - [JavaScript (CommonJS)](#javascript-commonjs)
  - [JavaScript (ESM)](#javascript-esm)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Examples](#examples)
- [Official Documentation](#official-documentation)
- [License](#license)

## Installation

```bash
npm install @logismix/mydata-client
```

## Features

- Full TypeScript support with type definitions
- Support for all myDATA API endpoints for both ERP and Provider users
- XML generation compliant with official XSD schemas (v1.0.10)
- Works with both CommonJS and ESM module systems
- Browser and Node.js compatible
- Automatic XML parsing of API responses
- Comprehensive error handling

## Usage

### TypeScript (Browser & Node.js)

```typescript
import { MyDataClient } from '@logismix/mydata-client';

// Initialize client
const myDataClient = new MyDataClient({
  userId: 'your_aade_user_id', // Your AADE User ID
  subscriptionKey: 'your_aade_subscription_key', // Your AADE Subscription Key
  production: false // Set to true for production API
});

// Example invoice data
const invoice = {
  issuer: {
    vatNumber: process.env.MYDATA_ISSUER_VAT!,
    country: 'GR',
    branch: 0
  },
  counterpart: {
    vatNumber: process.env.MYDATA_RECEIVER_VAT!,
    country: 'GR',
    branch: 0
  },
  invoiceHeader: {
    series: 'A',
    aa: '1',
    issueDate: new Date(),
    invoiceType: '1.1',
    currency: 'EUR'
  }
  // ... rest of invoice structure
};

// Send invoice (Provider example)
myDataClient
  .sendProviderInvoices([invoice], true)
  .then(response => console.log('Success:', response))
  .catch(error => console.error('Error:', error));
```

### JavaScript (CommonJS)

```javascript
const { MyDataClient } = require('@logismix/mydata-client');
require('dotenv').config();

const myDataClient = new MyDataClient({
  userId: process.env.MYDATA_USR,
  subscriptionKey: process.env.MYDATA_KEY,
  production: process.env.MYDATA_PRODUCTION === 'true'
});

// ... rest of usage similar to TypeScript example
```

### JavaScript (ESM)

```javascript
import { MyDataClient } from '@logismix/mydata-client';
import dotenv from 'dotenv';

dotenv.config();

const myDataClient = new MyDataClient({
  userId: process.env.MYDATA_USR,
  subscriptionKey: process.env.MYDATA_KEY,
  production: process.env.MYDATA_PRODUCTION === 'true'
});

// ... rest of usage similar to TypeScript example
```

## Testing

For testing purposes, the library includes XSD validation capabilities and requires additional configuration:

1. Install testing dependencies:

```bash
npm install dotenv --save-dev
```

2. Create a `.env` file with your test credentials:

```
MYDATA_USR=your_aade_user_id
MYDATA_KEY=your_aade_subscription_key
MYDATA_PRODUCTION=false
MYDATA_ISSUER_VAT=your_vat_number
MYDATA_RECEIVER_VAT=customer_vat_number
```

3. The test suite validates XML against the official XSD schemas (v1.0.10) located in `/schemas`

## Official Documentation

The repository includes official myDATA API documentation in both English and Greek, as well as the original XSD schemas for validation:

### ERP Documentation

- [English Markdown](docs/mydata-erp-doc-v1.0.10-en.md)
- [Greek Markdown](docs/mydata-erp-doc-v1.0.10-gr.md)
- [Original Greek PDF](docs/myDATA%20API%20Documentation%20v1%20.0.10_official_erp.pdf)

### Providers Documentation

- [English Markdown](docs/mydata-providers-doc-v1.0.10-en.md)
- [Greek Markdown](docs/mydata-providers-doc-v1.0.10-gr.md)
- [Original Greek PDF](docs/myDATA%20API%20Documentation_Providers_v1%200%2010_official.pdf)

### XSD Schemas

All official XSD schemas (v1.0.10) for document validation are available in the `/schemas` directory.

Note: These documentation files and schemas are only available in the GitHub repository and are not included when installing the package via npm.

## API Documentation

### MyDataClient Class

The primary way to interact with the myDATA API is through the `MyDataClient` class.

#### Constructor

```typescript
new MyDataClient(config: {
  userId: string;
  subscriptionKey: string;
  production: boolean;
})
```

#### ERP User Methods

- `sendErpInvoices(invoices: AadeBookInvoiceType[]): Promise<ResponseDoc>` - Sends one or more invoices, including corrected/amending ones.
- `sendErpIncomeClassification(classifications: IncomeClassificationsDoc): Promise<ResponseDoc>` - Sends one or more income classifications, corresponding to already submitted invoices.
- `sendErpExpensesClassification(classifications: ExpensesClassificationsDoc): Promise<ResponseDoc>` - Sends one or more expense classifications.
- `sendErpPaymentsMethod(payments: PaymentMethodsDoc): Promise<ResponseDoc>` - Sends payment methods for an invoice.
- `cancelErpInvoice(markToCancel: number, entityVatNumber?: string): Promise<ResponseDoc>` - Cancels a previously transmitted invoice.
- `requestErpDocs(params: RequestDocParams): Promise<RequestedDoc>` - Requests documents (invoices, classifications, cancellations) received from others.
- `requestErpTransmittedDocs(params: RequestDocParams): Promise<RequestedDoc>` - Requests documents (invoices, classifications, cancellations) previously transmitted by the user.
- `requestErpMyIncome(params: RequestMyDataParams): Promise<RequestedBookInfo>` - Requests aggregated income data for a period.
- `requestErpMyExpenses(params: RequestMyDataParams): Promise<RequestedBookInfo>` - Requests aggregated expense data for a period.
- `requestErpVatInfo(params: RequestVatE3Params): Promise<RequestedVatInfo>` - Requests VAT related data for a period.
- `requestErpE3Info(params: RequestVatE3Params): Promise<RequestedE3Info>` - Requests E3 related data for a period.

#### Provider User Methods

- `sendProviderInvoices(invoices: AadeBookInvoiceType[], validate?: boolean): Promise<ResponseDoc>` - Sends one or more invoices.
- `sendProviderUnsignedInvoices(invoices: AadeBookInvoiceType[]): Promise<ResponseDoc>` - Sends one or more invoices pending issuance (unsigned).
- `sendProviderPaymentsMethod(payments: PaymentMethodsDoc): Promise<ResponseDoc>` - Sends payment methods for an invoice.
- `requestProviderTransmittedDocs(issuerVat: string, mark: number, nextPartitionKey?: string, nextRowKey?: string): Promise<RequestedProviderDoc>` - Requests summaries of documents previously transmitted by the provider for a specific issuer.
- `requestProviderReceiverInfo(vatNumber: string): Promise<ReceiverInfoDoc>` - Requests information about a recipient's registered providers and emails.

## Examples

The `/examples` directory contains complete usage examples for both TypeScript and JavaScript:

### TypeScript Examples

- `invoice-example.ts` - Sending an invoice
- `retrieve-docs-example.ts` - Retrieving documents
- `validate-sample-invoices.ts` - XML validation examples
- `validate-sample-invoice-xmls.ts` - Advanced XML validation

### JavaScript Examples

- `invoice-example.js` - Browser-compatible invoice example
- `retrieve-docs-example.js` - Browser-compatible document retrieval

## License

MIT License

Copyright (c) 2025 Logismix

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
