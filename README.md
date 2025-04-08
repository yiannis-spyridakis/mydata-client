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

- `sendErpInvoices(invoices: AadeBookInvoiceType[]): Promise<ResponseDoc>`
- `sendErpIncomeClassification(classifications: IncomeClassificationsDoc): Promise<ResponseDoc>`
- `sendErpExpensesClassification(classifications: ExpensesClassificationsDoc): Promise<ResponseDoc>`
- `sendErpPaymentsMethod(payments: PaymentMethodsDoc): Promise<ResponseDoc>`
- `cancelErpInvoice(markToCancel: number, entityVatNumber?: string): Promise<ResponseDoc>`
- `requestErpDocs(params: RequestDocParams): Promise<RequestedDoc>`
- `requestErpTransmittedDocs(params: RequestDocParams): Promise<RequestedDoc>`
- `requestErpMyIncome(params: RequestMyDataParams): Promise<RequestedBookInfo>`
- `requestErpMyExpenses(params: RequestMyDataParams): Promise<RequestedBookInfo>`
- `requestErpVatInfo(params: RequestVatE3Params): Promise<RequestedVatInfo>`
- `requestErpE3Info(params: RequestVatE3Params): Promise<RequestedE3Info>`

#### Provider User Methods

- `sendProviderInvoices(invoices: AadeBookInvoiceType[], validate?: boolean): Promise<ResponseDoc>`
- `sendProviderUnsignedInvoices(invoices: AadeBookInvoiceType[]): Promise<ResponseDoc>`
- `sendProviderPaymentsMethod(payments: PaymentMethodsDoc): Promise<ResponseDoc>`
- `requestProviderTransmittedDocs(issuerVat: string, mark: number, nextPartitionKey?: string, nextRowKey?: string): Promise<RequestedProviderDoc>`
- `requestProviderReceiverInfo(vatNumber: string): Promise<ReceiverInfoDoc>`

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
