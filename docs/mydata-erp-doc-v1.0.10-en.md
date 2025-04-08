**IAPR**
Independent Authority
for Public Revenue

---

# myDATA

# AADE Electronic Books

## Technical description of REST API interfaces for data transmission & retrieval for ERP users

**Version 1.0.10 – December 2024**

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [1 Introduction](#1-introduction)
- [2 Purpose](#2-purpose)
- [3 Technological requirements for invoicing software](#3-technological-requirements-for-invoicing-software)
- [4 Description of the REST API](#4-description-of-the-rest-api)
  - [4.1 Description of interface operation](#41-description-of-interface-operation)
    - [4.1.1 User Registration](#411-user-registration)
    - [4.1.2 Required Headers](#412-required-headers)
  - [4.2 Description of functions](#42-description-of-functions)
    - [4.2.1 SendInvoices](#421-sendinvoices)
    - [4.2.2 SendIncomeClassification](#422-sendincomeclassification)
    - [4.2.3 SendExpensesClassification](#423-sendexpensesclassification)
    - [4.2.4 SendPaymentsMethod](#424-sendpaymentsmethod)
    - [4.2.5 CancelInvoice](#425-cancelinvoice)
    - [4.2.6 RequestDocs](#426-requestdocs)
    - [4.2.7 RequestTransmittedDocs](#427-requesttransmitteddocs)
    - [4.2.8 RequestMyIncome](#428-requestmyincome)
    - [4.2.9 RequestMyExpenses](#429-requestmyexpenses)
    - [4.2.10 RequestVatInfo](#4210-requestvatinfo)
    - [4.2.11 RequestE3Info](#4211-requeste3info)
- [5 Description of invoice schema](#5-description-of-invoice-schema)
  - [5.1 Entity details](#51-entity-details)
    - [5.1.1 Entity Address](#511-entity-address)
  - [5.2 Payment Method](#52-payment-method)
    - [5.2.1 Provider Payment Signature](#521-provider-payment-signature)
    - [5.2.2 Fiscal Device Payment Signature with software system (ERP)](#522-fiscal-device-payment-signature-with-software-system-erp)
  - [5.3 Invoice header](#53-invoice-header)
    - [5.3.1 Other Correlated Entities](#531-other-correlated-entities)
    - [5.3.2 Other General Delivery Details](#532-other-general-delivery-details)
  - [5.4 Invoice details](#54-invoice-details)
    - [5.4.1 Declaration of Activity (POL 1177/2018 Art. 27)](#541-declaration-of-activity-pol-11772018-art-27)
  - [5.5 Tax Totals](#55-tax-totals)
  - [5.6 Invoice summary](#56-invoice-summary)
  - [5.7 Information on Other Transport Means](#57-information-on-other-transport-means)
  - [5.8 Income Classification](#58-income-classification)
  - [5.9 Expenses Classification](#59-expenses-classification)
- [6 Description of Responses](#6-description-of-responses)
  - [6.1 Data Submission](#61-data-submission)
  - [6.2 Data Retrieval](#62-data-retrieval)
  - [6.3 Retrieval of Income - Expenses Data](#63-retrieval-of-income---expenses-data)
  - [6.4 Retrieval of Information for VAT Data](#64-retrieval-of-information-for-vat-data)
- [7 Errors](#7-errors)
  - [7.1 Technical Errors](#71-technical-errors)
  - [7.2 Business Errors](#72-business-errors)
- [8 Appendix](#8-appendix)
  - [8.1 Invoice Types](#81-invoice-types)
  - [8.2 VAT Category](#82-vat-category)
  - [8.3 VAT Exemption Reason Category](#83-vat-exemption-reason-category)
  - [8.4 Withheld Taxes Category](#84-withheld-taxes-category)
  - [8.5 Other Taxes Category](#85-other-taxes-category)
  - [8.6 Stamp Duty Rate Category](#86-stamp-duty-rate-category)
  - [8.7 Fees Category](#87-fees-category)
  - [8.8 Income Classification Category Code](#88-income-classification-category-code)
  - [8.9 Income Classification Type Code](#89-income-classification-type-code)
  - [8.10 Expenses Classification Category Code](#810-expenses-classification-category-code)
  - [8.11 Expenses Classification Type Code](#811-expenses-classification-type-code)
  - [8.12 Payment Methods](#812-payment-methods)
  - [8.13 Quantity Type](#813-quantity-type)
  - [8.14 Movement Purpose](#814-movement-purpose)
  - [8.15 Marking](#815-marking)
  - [8.16 Line Type](#816-line-type)
  - [8.17 Fuel Codes](#817-fuel-codes)
  - [8.18 Invoice Deviation Type](#818-invoice-deviation-type)
  - [8.19 Special Invoice Category](#819-special-invoice-category)
  - [8.20 Entity Category (EntityType)](#820-entity-category-entitytype)
- [9 Change History](#9-change-history)
  - [9.1 Version 0.5.1](#91-version-051)
  - [9.2 Version 0.6](#92-version-06)
  - [9.3 Version 0.6.1](#93-version-061)
  - [9.4 Version 1.0](#94-version-10)
  - [9.5 Version 1.0.1](#95-version-101)
  - [9.6 Version 1.0.2](#96-version-102)
  - [9.7 Version 1.0.3](#97-version-103)
  - [9.8 Version 1.0.4](#98-version-104)
  - [9.9 Version 1.0.5](#99-version-105)
  - [9.10 Version 1.0.6](#910-version-106)
  - [9.11 Version 1.0.7](#911-version-107)
  - [9.12 Version 1.0.8](#912-version-108)
  - [9.13 Version 1.0.9](#913-version-109)
  - [9.14 Version 1.0.10](#914-version-1010)

---

# 1 Introduction

`myDATA`, i.e., my Digital Accounting and Tax Application.

It is the name of the new electronic platform through which the IAPR (Independent Authority for Public Revenue) introduces electronic books into the daily operations of businesses.

AADE Electronic Books constitute a very significant step in the digital transformation of the Public Administration and businesses. Our goal is primarily to serve businesses by offering an innovative digital platform for fulfilling their tax obligations, which will lead to the automation of tax return completion and relieve them of current obligations, such as submitting Customer-Supplier Statements (MYF).

The `myDATA` electronic platform provides easy solutions for everyone. Both for businesses that have computerized accounting systems and will be able to transmit the necessary data in bulk and automatically, as well as for other businesses, which will be able to transmit data simply, through a special registration form on the IAPR website.

# 2 Purpose

For the needs of businesses and professionals who have computerized accounting systems, the IAPR provides a `REST API` interface on a public cloud infrastructure (Microsoft Azure). This allows `ERP` systems or other accounting-commercial systems to connect seamlessly and uninterruptedly with the IAPR for the exchange of relevant data.

More specifically, for a business using an information system that utilizes the relevant API, the offered automated connection functionalities are:

- Sending data for the invoices it issues.
- Sending income classifications related to the invoices it issues.
- Retrieving data of invoices issued for it that have been transmitted by the respective issuers to the IAPR.
- Sending expense classification data to the IAPR.

This document describes the above functionalities, as well as the necessary technical specifications for implementing the relevant calls of the offered `REST API` interfaces.

# 3 Technological requirements for invoicing software

The following technologies are used to implement communication between a software system and the interfaces:

- `HTTPS` – Secure HTTP
- `Webservice`
- `REST API` – REST interface required for the data reporting process
- `XML` – eXtensible Markup Language

The interfaces can be used by any software that can implement `HTTPS` calls and create `XML` documents compatible with the schema described in this document.

In addition to the relevant data, the software must be able to send, simultaneously and automatically, the necessary user identification information through the same `HTTPS` call.

# 4 Description of the REST API

In summary, the interface provides the following functions-methods:

- `/SendInvoices`: process for submitting one or more invoices, including corrected/amending ones
- `/RequestDocs`: process for retrieving one or more invoices, classifications, or invoice cancellations submitted by other users
- `/RequestTransmittedDocs`: process for retrieving one or more invoices, classifications, or invoice cancellations submitted by the user
- `/SendIncomeClassification`: process for submitting one or more income classifications, corresponding to already submitted invoices
- `/SendExpensesClassification`: process for submitting one or more expense classifications, corresponding to already submitted invoices
- `/SendPaymentsMethod`: process for submitting one or more payment methods, to be associated with already submitted invoices
- `/CancelInvoice`: process for cancelling an invoice, without simultaneously submitting a new one
- `/RequestMyIncome`: process for retrieving information regarding the user's income
- `/RequestMyExpenses`: process for retrieving information regarding the user's expenses
- `/RequestVatInfo`: process for retrieving information regarding VAT inflows – outflows

A detailed description of the functions is provided in a subsequent section of this document.

## 4.1 Description of interface operation

### 4.1.1 User Registration

Using the interface functionalities requires a user authentication process. Authentication is performed by sending, in each call, a username and a `subscription key` in the headers section. The `subscription key` is a string, unique per user, and is common to all interface functionalities.

To obtain the above credentials, a user must create an account in the interface registry through a special registration process offered by the myDATA electronic platform.

The registration process for the offered services of the myDATA REST API will be done through the application available at the URL of the myDATA platform:
[`https://www1.aade.gr/saadeapps2/bookkeeper-web`](https://www1.aade.gr/saadeapps2/bookkeeper-web)

Initially, the user is asked to log in with their taxisnet credentials, and then the following page appears:

_(Image: Screenshot of the myDATA platform initial page after Taxisnet login, showing various options like "Summary Book", "Special Registration Form", "Registration of Loss Invoices", etc.)_

On the above page, the user selects "Registration form for myDATA REST API" and on the page form that appears, selects "New user registration".

_(Image: Screenshot of the myDATA REST API user registration form showing existing users (if any) and a button "New user registration".)_

In the form that appears (see image below), after filling in the username, select "Add registration".

_(Image: Screenshot of the "New user registration" dialog with a field for "Username" and buttons "Add user" and "Close".)_

Then, in the next image, we click the "Add" button to complete the registration of the new user.

_(Image: Screenshot of a confirmation dialog asking "Do you wish to add the user?" with buttons "Add" and "Cancel".)_

Upon successful completion of the registration, the following image appears.

_(Image: Screenshot of a success message "User registration completed successfully" with a "Close" button.)_

In case of successful registration, the user is created in the relevant REST API registry, and a special `subscription key` is provided, which the user will use for authentication during calls to the interface services. The `subscription key` is the value in the "API Key" column of the screen below, which displays all the `subscription keys` created by the user.

The "Username" field can consist of Latin characters and numbers. If anything other than Latin characters or numbers is used, such as a special character (see image below), the application will return an error message as shown below.

_(Image: Screenshot of the "New user registration" dialog showing an error message "The username field can consist of Latin characters and numbers" below the username field.)_

If we wish to delete a user, we select the delete icon, and in the message that appears below, we select the "Delete" button.

_(Image: Screenshot of a confirmation dialog asking "Do you wish to delete the user TestUser;" with buttons "Delete" and "Cancel".)_

Upon successful completion of the deletion, the following image appears.

_(Image: Screenshot of a success message "The user has been deleted" with a "Close" button.)_

After the registration stage, the user will be able to log in to the interface portal with their account details, from where they can view and change the `subscription key`.

### 4.1.2 Required Headers

Using each interface function is done by sending an `HTTPS` call (`GET` or `POST`, depending on the function) to the corresponding URL link.

The call must contain the appropriate header, which will include information necessary for user identification, and a body in `XML` format, the structure of which will depend on the service being called. For each call, the user will receive a response with information about the outcome of their call, also in `XML` format.

In submission services (type `POST` call), the user can send one or more objects by embedding them in the call body in a special `XML` format (invoices/accounting entries or classifications). The response may contain, for each invoice, one or more error messages or a successful submission message. If an object is submitted again, having the same identifying elements as a previously sent object, the latter is kept in the Electronic Books database as valid, and correspondingly, the previous one is cancelled.

In retrieval or simple invoice cancellation services (`GET` type calls), the user will send as parameters the unique numbers of the invoices they are interested in during the call.

**_Note:_** For the development and testing phase, the registration process for the offered services of the myDATA REST API will be done through the application available at the URL: [`https://mydata-dev-register.azurewebsites.net`](https://mydata-dev-register.azurewebsites.net)

Each call must contain the following headers in key-value pair format, which are necessary for user identification. In case of incorrect details, the user will receive an error message.

| KEY                         | Data Type | VALUE                | DESCRIPTION                 |
| :-------------------------- | :-------- | :------------------- | :-------------------------- |
| `aade-user-id`              | String    | `{Username}`         | The username of the account |
| `ocp-apim-subscription-key` | String    | `{Subscription Key}` | The user's subscription key |

Through user identification via the headers, the interface will also gain access to the VAT number the user declared during registration, so it is not necessary to enter this element again in every service call.

## 4.2 Description of functions

### 4.2.1 SendInvoices

Calling the `SendInvoices` method is available via the following URL:
[`https://mydatapi.aade.gr/myDATA/SendInvoices`](https://mydatapi.aade.gr/myDATA/SendInvoices)

The call has the following characteristics:

- `/SendInvoices`, `POST` method
- Has `headers` as mentioned in section: 4.1.2
- `Body` which is in `xml` format and contains the `InvoicesDoc` element, which contains one or more invoices. The structure of the element is described by the type `AadeBookInvoiceType` and is analyzed in chapter: 5.

```
InvoicesDoc (AADE Invoices) ----> inv:invoice [1..∞] (Type AadeBookInvoiceType)
```

**_Note:_** For the development and testing phase, the method is available at the URL: [`https://mydataapidev.aade.gr/SendInvoices`](https://mydataapidev.aade.gr/SendInvoices).

### 4.2.2 SendIncomeClassification

Calling the `SendIncomeClassification` method is available via the following URL:
[`https://mydatapi.aade.gr/myDATA/SendIncomeClassification`](https://mydatapi.aade.gr/myDATA/SendIncomeClassification)

The call has the following characteristics:

- `/SendIncomeClassification`, `POST` method
- `Headers` as mentioned in section: 4.1.2
- `Body` consisting of one or more `InvoiceIncomeClassificationType` elements. The type is described below:

```xml
<!-- Root: IncomeClassificationsDoc (AADE Observations) -->
<icls:IncomeClassificationsDoc xmlns:icls="https://www.aade.gr/myDATA/incomeClassificaton/v1.0">
    <!-- [1..∞] -->
    <icls:incomeInvoiceClassification> <!-- Type: IncomeClassificationType -->
        <icls:invoiceMark>...</icls:invoiceMark> <!-- xs:long -->
        <icls:classificationMark>...</icls:classificationMark> <!-- xs:long, Optional -->
        <!-- Optional -->
        <icls:entityVatNumber>...</icls:entityVatNumber> <!-- xs:string -->

        <!-- Choice: Start -->
        <!-- Option 1: transactionMode -->
        <icls:transactionMode>...</icls:transactionMode> <!-- xs:int -->
        <!-- Option 2: List of incomeClassificationDetailData -->
        <!-- [1..∞] -->
        <icls:incomeClassificationDetailData> <!-- Type: IncomeClassificationDetailType -->
            <icls:lineNumber>...</icls:lineNumber> <!-- xs:int -->
            <!-- [1..∞] -->
            <icls:incomeClassificationDetails> <!-- Type: IncomeClassificationType -->
                <!-- ... fields from IncomeClassificationType (nested) ... -->
            </icls:incomeClassificationDetails>
        </icls:incomeClassificationDetailData>
        <!-- Choice: End -->
    </icls:incomeInvoiceClassification>
</icls:IncomeClassificationsDoc>
```

| Field                            | Type                       | Mandatory    | Description                               | Accepted Values             |
| :------------------------------- | :------------------------- | :----------- | :---------------------------------------- | :-------------------------- |
| `invoiceMark`                    | `xs:long`                  | Yes          | Unique Invoice Registration Number (MARK) |                             |
| `classificationMark`             | `xs:long`                  | No           | Unique Classification Registration Number |                             |
| `entityVatNumber`                | `xs:string`                | No           | Reference Entity VAT Number               |                             |
| `transactionMode`                | `xs:int`                   | Yes (choice) | Transaction Type                          | 1 = Reject<br>2 = Deviation |
| `lineNumber`                     | `xs:int`                   | Yes (choice) | Line Number                               |                             |
| `incomeClassificationDetailData` | `IncomeClassificationType` | Yes (choice) | Income classification details per line    |                             |

**Remarks:**

1.  The `classificationMark` field is populated by the service.
2.  When the `transactionMode` field takes the value 1, it indicates rejection of the invoice due to disagreement; when it takes the value 2, it signifies a deviation in amounts.
3.  The user can include either the `transactionMode` element or a list of `invoicesIncomeClassificationDetails` elements.
4.  Each `invoicesIncomeClassificationDetails` element contains a `lineNumber` and a list of `invoiceIncomeClassificationDetailData` elements.
5.  The `lineNumber` field refers to the corresponding line number of the original invoice with the Unique Registration Number (MARK) specified in the `invoiceMark` field.
6.  Only in the case where the method is called by a third party (such as a legal entity representative or accountant), the VAT number of the entity to which the invoice classification refers is sent via the `entityVatNumber` field; otherwise, this field remains empty.

**_Note:_** For the development and testing phase, the method is available at the URL: [`https://mydataapidev.aade.gr/SendIncomeClassification`](https://mydataapidev.aade.gr/SendIncomeClassification)

### 4.2.3 SendExpensesClassification

Calling the `SendExpensesClassification` method is available via the following URL:
[`https://mydatapi.aade.gr/myDATA/SendExpensesClassification`](https://mydatapi.aade.gr/myDATA/SendExpensesClassification)

The call has the following characteristics:

- `/SendExpensesClassification`, `POST` method
- `Headers` as mentioned in section: 4.1.2
- `Body` consisting of one or more `InvoiceExpensesClassificationType` elements. The type is described by the diagram below:

```xml
<!-- Root: ExpensesClassificationsDoc (AADE Exp. Classif.) -->
<ecls:ExpensesClassificationsDoc xmlns:ecls="https://www.aade.gr/myDATA/expensesClassificaton/v1.0">
    <!-- [1..∞] -->
    <ecls:expensesInvoiceClassification> <!-- Type: ExpensesClassificationType -->
        <ecls:invoiceMark>...</ecls:invoiceMark> <!-- xs:long -->
        <ecls:classificationMark>...</ecls:classificationMark> <!-- xs:long, Optional -->
         <!-- Optional -->
        <ecls:entityVatNumber>...</ecls:entityVatNumber> <!-- xs:string -->

        <!-- Choice: Start -->
        <!-- Option 1: transactionMode -->
        <ecls:transactionMode>...</ecls:transactionMode> <!-- xs:int -->
        <!-- Option 2: List of expensesClassificationDetailData -->
         <!-- [1..∞] -->
        <ecls:expensesClassificationDetailData> <!-- Type: ExpensesClassificationDetailType -->
            <ecls:lineNumber>...</ecls:lineNumber> <!-- xs:int -->
            <!-- [1..∞] -->
            <ecls:expensesClassificationDetails> <!-- Type: ExpensesClassificationType -->
                 <!-- ... fields from ExpensesClassificationType (nested) ... -->
            </ecls:expensesClassificationDetails>
        </ecls:expensesClassificationDetailData>
         <!-- Choice: End -->

         <!-- Optional -->
         <ecls:postPerInvoice>...</ecls:postPerInvoice> <!-- xs:boolean -->
    </ecls:expensesInvoiceClassification>
</ecls:ExpensesClassificationsDoc>
```

| Field                              | Type                         | Mandatory    | Description                               | Accepted Values             |
| :--------------------------------- | :--------------------------- | :----------- | :---------------------------------------- | :-------------------------- |
| `invoiceMark`                      | `xs:long`                    | Yes          | Unique Invoice Registration Number (MARK) |                             |
| `classificationMark`               | `xs:long`                    | No           | Unique Classification Registration Number |                             |
| `entityVatNumber`                  | `xs:string`                  | No           | Reference Entity VAT Number               | `entityVatNumber`           |
| `transactionMode`                  | `xs:int`                     | Yes (choice) | Transaction Type                          | 1 = Reject<br>2 = Deviation |
| `lineNumber`                       | `xs:int`                     | Yes (choice) | Line Number                               |                             |
| `expensesClassificationDetailData` | `ExpensesClassificationType` | Yes (choice) | Expense classification details per line   |                             |
| `postPerInvoice`                   | `xs:boolean`                 | No           | Method of classification submission       |                             |

**Remarks:**

1.  The `classificationMark` field is populated by the service.
2.  When the `transactionMode` field takes the value 1, it indicates rejection of the invoice due to disagreement; when it takes the value 2, it signifies a deviation in amounts.
3.  The user can include either the `transactionMode` element or a list of `invoicesExpensesClassificationDetails` elements.
4.  Each `invoicesExpensesClassificationDetails` element contains a `lineNumber` and a list of `expensesClassificationDetailData` elements.
5.  The `lineNumber` field refers to the corresponding line number of the original invoice with the Unique Registration Number (MARK) specified in the `invoiceMark` field.
6.  Only in the case where the method is called by a third party (such as a legal entity representative or accountant), the VAT number of the entity to which the invoice classification refers is sent via the `entityVatNumber` field; otherwise, this field remains empty.
7.  When the `postPerInvoice` parameter is called with the value `true`, it means that the expense classifications are submitted at the invoice level and not per line. More information at the link: [`https://www.aade.gr/sites/default/files/2023-07/SendExpensesClassificationPostPerInvoiceGuidelines.pdf`](https://www.aade.gr/sites/default/files/2023-07/SendExpensesClassificationPostPerInvoiceGuidelines.pdf)

**_Note:_** For the development and testing phase, the method is available at the URL: [`https://mydataapidev.aade.gr/SendExpensesClassification`](https://mydataapidev.aade.gr/SendExpensesClassification)

### 4.2.4 SendPaymentsMethod

Calling the `SendPaymentsMethod` method is available via the following URL:
[`https://mydatapi.aade.gr/myDATA/SendPaymentsMethod`](https://mydatapi.aade.gr/myDATA/SendPaymentsMethod)

The call has the following characteristics:

- `/SendPaymentsMethod`, `POST` method
- `Headers` as mentioned in section: 4.1.2
- `Body` consisting of one or more `PaymentMethodType` elements. The type is described by the diagram below:

```xml
<!-- Root: PaymentMethodsDoc -->
<pmt:PaymentMethodsDoc xmlns:pmt="https://www.aade.gr/myDATA/paymentMethod/v1.0">
    <!-- [1..∞] -->
    <pmt:payment> <!-- Type: PaymentMethodType -->
        <pmt:invoiceMark>...</pmt:invoiceMark> <!-- xs:long -->
        <pmt:paymentMethodMark>...</pmt:paymentMethodMark> <!-- xs:long, Optional -->
        <!-- Optional -->
        <pmt:entityVatNumber>...</pmt:entityVatNumber> <!-- xs:string -->
        <!-- [1..∞] -->
        <pmt:paymentMethodDetails> <!-- Type: PaymentMethodDetailType -->
           <!-- ... fields from PaymentMethodDetailType ... -->
        </pmt:paymentMethodDetails>
    </pmt:payment>
</pmt:PaymentMethodsDoc>
```

| Field                  | Type                      | Mandatory | Description                               | Accepted Values |
| :--------------------- | :------------------------ | :-------- | :---------------------------------------- | :-------------- |
| `invoiceMark`          | `xs:long`                 | Yes       | Unique Invoice Registration Number (MARK) |                 |
| `paymentMethodMark`    | `xs:long`                 | No        | Unique Payment Method Registration Number |                 |
| `entityVatNumber`      | `xs:string`               | No        | Reference Entity VAT Number               |                 |
| `paymentMethodDetails` | `PaymentMethodDetailType` | Yes       | Payment Methods                           |                 |

**Remarks:**

1.  The `paymentMethodMark` field is populated by the service.
2.  When the method is called by a third party (e.g., provider), the reference VAT number is sent via the `entityVatNumber` field; otherwise, this field remains empty.
3.  The `PaymentMethodDetailType` object is analyzed in detail in section 5.2.
4.  When using the method, at least one `PaymentMethodDetailType` object per invoice must be of type POS.
5.  The total of the `amount` values per `PaymentMethodType` object must equal the `totalGrossValue` of the invoice corresponding to the `invoiceMark`.

**_Note:_** For the development and testing phase, the method is available at the URL: [`https://mydataapidev.aade.gr/SendPaymentsMethod`](https://mydataapidev.aade.gr/SendPaymentsMethod)

### 4.2.5 CancelInvoice

This `POST` method is used to cancel an invoice without resubmitting a new one. The user calls it by submitting the `mark` of the invoice they want to cancel as a parameter. Only in the case where the method is called by a third party (such as a legal entity representative or accountant), the VAT number of the entity that issued the invoice to be cancelled is sent via the `entityVatNumber` parameter; otherwise, this parameter does not need to be sent. No `xml body` needs to be sent.

URL: `https://mydatapi.aade.gr/myDATA/CancelInvoice?mark={mark}[&entityVatNumber]`

| Parameter Name    | Mandatory | Description                                               | Remarks |
| :---------------- | :-------- | :-------------------------------------------------------- | :------ |
| `mark`            | Yes       | Unique registration number of the invoice to be cancelled |         |
| `entityVatNumber` | No        | Entity VAT number                                         |         |

In case of success, the cancellation as an action receives its own mark, which is returned to the user, and the invoice is considered cancelled. In case of failure, the corresponding error message is returned.

**_Note:_** For the development and testing phase, the method is available at the URL: [`https://mydataapidev.aade.gr/CancelInvoice?mark={mark}[&entityVatNumber]`](https://mydataapidev.aade.gr/CancelInvoice?mark={mark}[&entityVatNumber])

### 4.2.6 RequestDocs

With this method, the user retrieves invoices, classifications, and invoice cancellations that have been submitted by other users and concern them, as well as information on whether one of their invoices has been rejected by the counterparty through the distinct call of the expense classification submission method (`transactionMode` field). Only in the case where the method is called by a third party (such as a legal entity representative or accountant), the VAT number of the entity for which the search is performed is sent via the `entityVatNumber` parameter; otherwise, this parameter does not need to be sent.

This is done via an `HTTP GET` call of the method, with the following parameters acting as search criteria.

URL: `https://mydatapi.aade.gr/myDATA/RequestDocs?mark={mark}[&dateFrom][&dateTo][&entityVatNumber][&counterVatNumber][&invType][&maxMark][&nextPartitionKey][&nextRowKey]`

| Parameter Name      | Mandatory | Description                                   |
| :------------------ | :-------- | :-------------------------------------------- |
| `mark`              | Yes       | Unique registration number                    |
| `entityVatNumber`   | No        | Entity VAT number                             |
| `dateFrom`          | No        | Start of search time range for the issue date |
| `dateTo`            | No        | End of search time range for the issue date   |
| `receiverVatNumber` | No        | Counterparty VAT number                       |
| `invType`           | No        | Invoice type                                  |
| `maxMark`           | No        | Maximum MARK Number                           |
| `nextPartitionKey`  | No        | Parameter for paginated retrieval of results  |
| `nextRowKey`        | No        | Parameter for paginated retrieval of results  |

The call returns records concerning the user that have a Unique Registration Number identifier greater than the parameter value.

**Remarks:**

1.  If the search results exceed the maximum allowed size limit, the user will receive them in parts (pagination). The `nextPartitionKey` and `nextRowKey` fields will be included in each part of the results and will be used as parameters in the call to retrieve the next part of the results.
2.  If any of the above parameters have no value, the search is performed for all possible values of that field, as before.
3.  If only one of `dateFrom` or `dateTo` is omitted, the search will be performed only for the date provided in the other parameter. If both parameters have values, the search will be performed for the period from `dateFrom` to `dateTo`.
4.  If a value is assigned to the `maxMark` parameter, records with a MARK less than or equal to this value will be returned.
5.  The values of the `receiverVatNumber` and `invType` parameters are always applied with the equality operator (`equal operator`).
6.  For the `invType` parameter, the value given is the number corresponding to the specific type according to table 8.1 of the Appendix.

**_Note:_** For the development and testing phase, the method is available at the URL: [`https://mydataapidev.aade.gr/RequestDocs?mark={mark}[&dateFrom][&dateTo][&entityVatNumber][&counterVatNumber][&invType][&maxMark][&nextPartitionKey][&nextRowKey]`](https://mydataapidev.aade.gr/RequestDocs?mark={mark}[&dateFrom][&dateTo][&entityVatNumber][&counterVatNumber][&invType][&maxMark][&nextPartitionKey][&nextRowKey])

### 4.2.7 RequestTransmittedDocs

With this method, the user retrieves invoices, classifications, and invoice cancellations that **they have submitted themselves** and concern them. Only in the case where the method is called by a third party (such as a legal entity representative or accountant), the VAT number of the entity for which the search is performed is sent via the `entityVatNumber` parameter; otherwise, this parameter does not need to be sent.

This is done via an `HTTP GET` call of the method, with the following parameters acting as search criteria.

URL: `https://mydatapi.aade.gr/myDATA/RequestTransmittedDocs?mark={mark}[&dateFrom][&dateTo][&entityVatNumber][&counterVatNumber][&invType][&maxMark][&nextPartitionKey][&nextRowKey]`

| Parameter Name      | Mandatory | Description                                   |
| :------------------ | :-------- | :-------------------------------------------- |
| `mark`              | Yes       | Unique registration number                    |
| `entityVatNumber`   | No        | Entity VAT number                             |
| `dateFrom`          | No        | Start of search time range for the issue date |
| `dateTo`            | No        | End of search time range for the issue date   |
| `receiverVatNumber` | No        | Counterparty VAT number                       |
| `invType`           | No        | Invoice type                                  |
| `maxMark`           | No        | Maximum MARK Number                           |
| `nextPartitionKey`  | No        | Parameter for paginated retrieval of results  |
| `nextRowKey`        | No        | Parameter for paginated retrieval of results  |

The call returns records concerning the user that have a Unique Registration Number identifier greater than the parameter value.

**Remarks:**

1.  If the search results exceed the maximum allowed size limit, the user will receive them in parts (pagination). The `nextPartitionKey` and `nextRowKey` fields will be included in each part of the results and will be used as parameters in the call to retrieve the next part of the results.
2.  If any of the above parameters have no value, the search is performed for all possible values of that field, as before.
3.  If only one of `dateFrom` or `dateTo` is omitted, the search will be performed only for the date provided in the other parameter. If both parameters have values, the search will be performed for the period from `dateFrom` to `dateTo`.
4.  If a value is assigned to the `maxMark` parameter, records with a MARK less than or equal to this value will be returned.
5.  The values of the `receiverVatNumber` and `invType` parameters are always applied with the equality operator (`equal operator`).
6.  For the `invType` parameter, the value given is the number corresponding to the specific type according to table 8.1 of the Appendix.

**_Note:_** For the development and testing phase, the method is available at the URL: [`https://mydataapidev.aade.gr/RequestTransmittedDocs?mark={mark}[&dateFrom][&dateTo][&entityVatNumber][&counterVatNumber][&invType][&maxMark][&nextPartitionKey][&nextRowKey]`](https://mydataapidev.aade.gr/RequestTransmittedDocs?mark={mark}[&dateFrom][&dateTo][&entityVatNumber][&counterVatNumber][&invType][&maxMark][&nextPartitionKey][&nextRowKey])

### 4.2.8 RequestMyIncome

With this method, the user retrieves information about their income for a specific time period. This is done via an `HTTP GET` call of the method, with the following parameters as search criteria.

URL: `https://mydatapi.aade.gr/myDATA/RequestMyIncome?[dateFrom]&[dateTo]&[counterVatNumber]&[entityVatNumber]&[invType]&[nextPartitionKey]&[nextRowKey]`

| Parameter Name     | Mandatory | Description                                  |
| :----------------- | :-------- | :------------------------------------------- |
| `dateFrom`         | Yes       | Date From                                    |
| `dateTo`           | Yes       | Date To                                      |
| `counterVatNumber` | No        | Counterparty VAT number                      |
| `entityVatNumber`  | No        | Reference VAT number                         |
| `invType`          | No        | Invoice Type                                 |
| `nextPartitionKey` | No        | Parameter for paginated retrieval of results |
| `nextRowKey`       | No        | Parameter for paginated retrieval of results |

The call returns lines with information about the user's income for a specific closed calendar period defined by the values of the `dateFrom` and `dateTo` parameters. Optionally, the search can be performed with additional filters for a specific counterparty VAT number and a specific invoice type.

**Remarks:**

1.  If the `entityVatNumber` parameter has a value, the search will be performed for this VAT number; otherwise, for the VAT number of the user calling the method.
2.  The date parameters must be entered in `dd/MM/yyyy` format.
3.  When an optional parameter is not entered, the search is performed for all possible values that this field could have.
4.  If the search results exceed the maximum allowed size limit, the user will receive them in parts (pagination). The `nextPartitionKey` and `nextRowKey` fields will be included in each part of the results and will be used as parameters in the call to retrieve the next part of the results.

**_Note:_** For the development and testing phase, the method is available at the URL: [`https://mydataapidev.aade.gr/RequestMyIncome?[dateFrom]&[dateTo]&[counterVatNumber]&[entityVatNumber]&[invType]&[nextPartitionKey]&[nextRowKey]`](https://mydataapidev.aade.gr/RequestMyIncome?[dateFrom]&[dateTo]&[counterVatNumber]&[entityVatNumber]&[invType]&[nextPartitionKey]&[nextRowKey])

### 4.2.9 RequestMyExpenses

For this method, exactly the same applies as for the `RequestMyIncome` method (see section 4.2.8), except that the user retrieves information about their expenses.

**_Note:_** For the development and testing phase, the method is available at the URL: [`https://mydataapidev.aade.gr/RequestMyExpenses?[dateFrom]&[dateTo]&[counterVatNumber]&[entityVatNumber]&[invType]&[nextPartitionKey]&[nextRowKey]`](https://mydataapidev.aade.gr/RequestMyExpenses?[dateFrom]&[dateTo]&[counterVatNumber]&[entityVatNumber]&[invType]&[nextPartitionKey]&[nextRowKey])

### 4.2.10 RequestVatInfo

This method allows the user to retrieve detailed information about the VAT data associated with an entity's VAT number for a specific time period. The method can be used to retrieve information about the VAT records of a person or business, either per invoice or per day, depending on the parameters provided.

Communication is done via an `HTTP GET` call of the method, with the following parameters acting as search criteria.

URL: `https://mydatapi.aade.gr/myDATA/RequestVatInfo?[entityVatNumber]&[dateFrom]&[dateTo]&[GroupedPerDay]&[nextPartitionKey]&[nextRowKey]`

| Parameter Name     | Mandatory | Description                                                                                          |
| :----------------- | :-------- | :--------------------------------------------------------------------------------------------------- |
| `entityVatNumber`  | No        | Entity VAT number                                                                                    |
| `dateFrom`         | Yes       | Start of search time range for the issue date (format `dd/MM/yyyy`)                                  |
| `dateTo`           | Yes       | End of search time range for the issue date (format `dd/MM/yyyy`)                                    |
| `GroupedPerDay`    | No        | Parameter indicating whether results should be grouped per day. Accepts values `"true"` or `"false"` |
| `nextPartitionKey` | No        | Parameter for paginated retrieval of results, when `GroupedPerDay=false`                             |
| `nextRowKey`       | No        | Parameter for paginated retrieval of results, when `GroupedPerDay=false`                             |

The method's response will include VAT details based on the defined search criteria.

**Remarks:**

1.  If the search results exceed the maximum allowed limit, the user will receive them in parts. The `nextPartitionKey` and `nextRowKey` fields will be provided in each response and should be used as parameters to retrieve the next set of results. It is important to note that if the `GroupedPerDay` parameter has the value `false`, then the `nextPartitionKey` and `nextRowKey` parameters are not required and, if provided, will not be considered for retrieving results.
2.  If the `entityVatNumber` parameter is not provided, the search will be based on the VAT number of the user making the call.
3.  The `dateFrom` and `dateTo` parameters are mandatory and must be provided in the correct format (`dd/MM/yyyy`).

**_Note:_** For the development and testing phase, the method is available at the URL: [`https://mydataapidev.aade.gr/RequestVatInfo?[entityVatNumber]&[dateFrom]&[dateTo]&[GroupedPerDay]&[nextPartitionKey]&[nextRowKey]`](https://mydataapidev.aade.gr/RequestVatInfo?[entityVatNumber]&[dateFrom]&[dateTo]&[GroupedPerDay]&[nextPartitionKey]&[nextRowKey])

### 4.2.11 RequestE3Info

This method allows the user to retrieve detailed information about the E3 data associated with an entity's VAT number for a specific time period. The method can be used to retrieve information about the E3 records of a person or business, either per invoice or per day, depending on the parameters provided.

Communication is done via an `HTTP GET` call of the method, with the following parameters acting as search criteria.

URL: `https://mydatapi.aade.gr/myDATA/RequestE3Info?[entityVatNumber]&[dateFrom]&[dateTo]&[GroupedPerDay]&[nextPartitionKey]&[nextRowKey]`

| Parameter Name     | Mandatory | Description                                                                                          |
| :----------------- | :-------- | :--------------------------------------------------------------------------------------------------- |
| `entityVatNumber`  | No        | Entity VAT number                                                                                    |
| `dateFrom`         | Yes       | Start of search time range for the issue date (format `dd/MM/yyyy`)                                  |
| `dateTo`           | Yes       | End of search time range for the issue date (format `dd/MM/yyyy`)                                    |
| `GroupedPerDay`    | No        | Parameter indicating whether results should be grouped per day. Accepts values `"true"` or `"false"` |
| `nextPartitionKey` | No        | Parameter for paginated retrieval of results, when `GroupedPerDay=false`                             |
| `nextRowKey`       | No        | Parameter for paginated retrieval of results, when `GroupedPerDay=false`                             |

The method's response will include E3 details based on the defined search criteria.

**Remarks:**

1.  If the search results exceed the maximum allowed limit, the user will receive them in parts. The `nextPartitionKey` and `nextRowKey` fields will be provided in each response and should be used as parameters to retrieve the next set of results. It is important to note that if the `GroupedPerDay` parameter has the value `false`, then the `nextPartitionKey` and `nextRowKey` parameters are not required and, if provided, will not be considered for retrieving results.
2.  If the `entityVatNumber` parameter is not provided, the search will be based on the VAT number of the user making the call.
3.  The `dateFrom` and `dateTo` parameters are mandatory and must be provided in the correct format (`dd/MM/yyyy`).

**_Note:_** For the development and testing phase, the method is available at the URL: [`https://mydataapidev.aade.gr/RequestE3Info?[entityVatNumber]&[dateFrom]&[dateTo]&[GroupedPerDay]&[nextPartitionKey]&[nextRowKey]`](https://mydataapidev.aade.gr/RequestE3Info?[entityVatNumber]&[dateFrom]&[dateTo]&[GroupedPerDay]&[nextPartitionKey]&[nextRowKey])

# 5 Description of invoice schema

This section describes in detail the content of the invoice (type `AadeBookInvoiceType`). Its structure is described below:

```xml
<!-- Root: InvoicesDoc (AADE Invoices) -->
<inv:InvoicesDoc xmlns:inv="https://www.aade.gr/myDATA/invoice/v1.0"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:schemaLocation="https://www.aade.gr/myDATA/invoice/v1.0/InvoicesDoc-v1.0.xsd">
    <!-- [1..∞] -->
    <inv:invoice> <!-- Type: AadeBookInvoiceType -->
        <!-- Optional -->
        <inv:uid>...</inv:uid> <!-- xs:string, Length=40, Populated by Service -->
        <!-- Optional -->
        <inv:mark>...</inv:mark> <!-- xs:long, Populated by Service -->
        <!-- Optional -->
        <inv:cancelledByMark>...</inv:cancelledByMark> <!-- xs:long, Populated by Service -->
        <!-- Optional, Populated only by providers -->
        <inv:authenticationCode>...</inv:authenticationCode> <!-- xs:string -->
        <!-- Optional -->
        <inv:transmissionFailure>...</inv:transmissionFailure> <!-- xs:byte, {1, 2} only by providers, {3} only by ERP -->
        <!-- Optional -->
        <inv:issuer>...</inv:issuer> <!-- Type: PartyType -->
        <!-- Optional -->
        <inv:counterpart>...</inv:counterpart> <!-- Type: PartyType -->
        <!-- Optional, [0..∞] -->
        <inv:paymentMethods>...</inv:paymentMethods> <!-- Type: PaymentMethodDetailType -->
        <inv:invoiceHeader>...</inv:invoiceHeader> <!-- Type: InvoiceHeaderType -->
        <!-- [1..∞] -->
        <inv:invoiceDetails>...</inv:invoiceDetails> <!-- Type: InvoiceRowType -->
        <!-- Optional -->
        <inv:taxesTotals>...</inv:taxesTotals> <!-- Type: TaxTotalsType -->
        <inv:invoiceSummary>...</inv:invoiceSummary> <!-- Type: InvoiceSummaryType -->
         <!-- Optional, Populated by Service (for transmissions via erp) -->
        <inv:qrCodeUrl>...</inv:qrCodeUrl> <!-- xs:string -->
        <!-- Optional, [0..∞] -->
        <inv:otherTransportDetails>...</inv:otherTransportDetails> <!-- Type: TransportDetailType -->
    </inv:invoice>
</inv:InvoicesDoc>
```

| Field                   | Type                      | Mandatory | Description                                                     | Accepted Values                                                                                                                                                                                                                                                                                                                                                                                          |
| :---------------------- | :------------------------ | :-------- | :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `uid`                   | `xs:string`               | No        | Invoice Identifier                                              | Length= 40<br>Populated by the Service                                                                                                                                                                                                                                                                                                                                                                   |
| `mark`                  | `xs:long`                 | No        | Unique Invoice Registration Number (MARK)                       | Populated by the Service                                                                                                                                                                                                                                                                                                                                                                                 |
| `cancelledByMark`       | `xs:long`                 | No        | Unique Cancellation Registration Number                         | Populated by the Service                                                                                                                                                                                                                                                                                                                                                                                 |
| `authenticationCode`    | `xs:string`               | No        | Authentication String                                           | Populated by the Service only if the submission is from providers                                                                                                                                                                                                                                                                                                                                        |
| `transmissionFailure`   | `xs:byte`                 | No        | Provider Communication Failure or ERP Data Transmission Failure | Allowed values {1,4}.<br>Values {1,2} are allowed **only for submissions from providers**:<br>1 : In case of communication failure between entity and provider during invoice issuance/transmission<br>2 : In case of communication failure between provider and myDATA during invoice issuance/transmission,<br>while value {3} is allowed **only for submissions from ERP**:<br>3 : Loss of connection |
| `issuer`                | `PartyType`               | No        | Invoice Issuer                                                  |                                                                                                                                                                                                                                                                                                                                                                                                          |
| `counterpart`           | `PartyType`               | No        | Invoice Recipient (Counterpart)                                 |                                                                                                                                                                                                                                                                                                                                                                                                          |
| `paymentMethods`        | `PaymentMethodDetailType` | No        | Payment Methods                                                 |                                                                                                                                                                                                                                                                                                                                                                                                          |
| `invoiceHeader`         | `InvoiceHeaderType`       | Yes       | Invoice Header                                                  |                                                                                                                                                                                                                                                                                                                                                                                                          |
| `invoiceDetails`        | `InvoiceRowType`          | Yes       | Invoice Lines                                                   |                                                                                                                                                                                                                                                                                                                                                                                                          |
| `taxesTotals`           | `TaxesType`               | No        | Tax Totals                                                      |                                                                                                                                                                                                                                                                                                                                                                                                          |
| `invoiceSummary`        | `InvoiceSummaryType`      | Yes       | Summary                                                         |                                                                                                                                                                                                                                                                                                                                                                                                          |
| `qrCodeUrl`             | `xs:string`               | No        | Encoded alphanumeric string for generating a URL-type QR Code   | Populated by the Service (currently only for transmissions via ERP)                                                                                                                                                                                                                                                                                                                                      |
| `otherTransportDetails` | `TransportDetailType`     | No        | Other Delivery Details (Definition - Change of Transport Means) |                                                                                                                                                                                                                                                                                                                                                                                                          |

**Remarks:**

1.  The `uid` serves as the identifier for each invoice and is populated by the Service. Generally, it is calculated from the `SHA-1` hash of the following invoice fields:

    - Issuer VAT Number
    - Issue Date
    - Installation Number in the Taxis Registry
    - Invoice Type
    - Series
    - AA (Sequential Number)
    - Invoice Deviation Type (if present)

    Specifically for invoices of categories B1 (Non-Counterpart Domestic/Foreign Recipient Invoices) and B2 (Counterpart Domestic/Foreign Recipient Invoices)¹, the recipient's VAT number also participates in the `uid` calculation.
    The `SHA-1` algorithm uses `ISO-8859-7` encoding.

2.  The `mark` is the Unique Invoice Registration Number (M.AΡ.Κ - MARK).
3.  The `taxesTotals` element will include taxes of all categories, except VAT, which apply to the entire invoice as a whole. If the user uses this element, they cannot enter taxes other than VAT on each invoice line separately.
4.  The structure of the types `PartyType`, `PaymentMethodDetailType`, `InvoiceHeaderType`, `InvoiceRowType`, `TaxTotalsType`, `InvoiceSummaryType` is described below.
5.  The Unique Cancellation Registration Number (`cancelledByMark`) appears during retrieval only if the invoice in question has been cancelled and is populated with the MARK of the cancellation.
6.  The `authenticationCode` is the authentication string for each invoice and is populated by the Service when the submission is made via an E-Invoicing Provider. It is calculated from the `SHA-1` hash of 8 invoice fields:
    - Issuer VAT Number
    - Issue Date
    - Installation Number in the Taxis Registry
    - Invoice Type
    - Series
    - AA (Sequential Number)
    - Invoice MARK
    - Total Invoice Value
    - Total Invoice VAT Value
    - Recipient VAT Number
7.  The `qrCodeUrl` field contains a URL whose query string is encoded, to be used by applications for generating/inserting URL-type QR Codes into invoices, which will lead (upon scanning) to a Service page for viewing the invoice.
8.  The `otherTransportDetails` (Other Delivery Details) field is a list of type `TransportDetailType`.
9.  The structure of `otherTransportDetails` is described below.

¹ The invoice types of categories B1 and B2 are: 13.1, 13.2, 13.3, 13.4, 13.30, 13.31, 14.1, 14.2, 14.3, 14.4, 14.5, 14.30, 14.31, 15.1, 16.1

## 5.1 Entity details

The issuer and the recipient of the invoice are elements of type `PartyType` and their structure is described below:

```xml
<inv:PartyType>
    <inv:vatNumber>...</inv:vatNumber> <!-- xs:string -->
    <inv:country>...</inv:country> <!-- xs:string -->
    <inv:branch>...</inv:branch> <!-- xs:int -->
    <!-- Optional -->
    <inv:name>...</inv:name> <!-- xs:string -->
    <!-- Optional -->
    <inv:address>...</inv:address> <!-- Type: AddressType -->
    <!-- Optional -->
    <inv:documentIdNo>...</inv:documentIdNo> <!-- xs:string -->
    <!-- Optional -->
    <inv:supplyAccountNo>...</inv:supplyAccountNo> <!-- xs:string -->
     <!-- Optional -->
    <inv:countryDocumentId>...</inv:countryDocumentId> <!-- xs:string -->
</inv:PartyType>
```

| Field               | Type          | Mandatory | Description                         | Accepted Values                                                                                                   |
| :------------------ | :------------ | :-------- | :---------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| `vatNumber`         | `xs:string`   | Yes       | VAT Number                          | Any valid VAT number                                                                                              |
| `country`           | `xs:string`   | Yes       | Country Code                        | Country codes (ISO 3166)                                                                                          |
| `branch`            | `xs:int`      | Yes       | Branch No.                          | Minimum value = 0                                                                                                 |
| `name`              | `xs:string`   | No        | Name                                | (Accepted only for issuer/recipient outside Greece)                                                               |
| `address`           | `AddressType` | No        | Address                             | (Accepted only for issuer/recipient outside Greece)                                                               |
| `documentIdNo`      | `xs:string`   | No        | Official document number            | Max length 100.<br>Valid only for tax-free invoices (`specialInvoiceCategory` = 4)                                |
| `supplyAccountNo`   | `xs:string`   | No        | Electricity Supply Account No.      | Max length 100.<br>Valid only for fuel invoices (`fuelInvoice` = true)                                            |
| `countryDocumentId` | `xs:string`   | No        | Country Code of Official Doc. Issue | Country codes (ISO 3166).<br>Valid only for tax-free (`specialInvoiceCategory` = 4) and if `documentIdNo` exists. |

**Remarks:**

1.  The country code consists of two characters and comes from the corresponding list of countries as described in `ISO 3166`.
2.  If the issuer's branch is the headquarters or does not exist, the `branch` field must have the value 0.
3.  For the **issuer**, the Name (`name`) and Address (`address`) details are not accepted if they concern an entity within Greece (GR). For the **recipient**, the Name (`name`) detail is not accepted if it concerns an entity within Greece (GR).
4.  The official document number (`documentIdNo`) is allowed only for the transmission of invoices belonging to the Special Invoice Category Tax-free (the `specialInvoiceCategory` field in the invoice header has the value 4), and can be any official identification document (e.g., passport number) of the invoice recipient.
5.  The Electricity Supply Account Number (`supplyAccountNo`) is allowed only for the transmission of fuel invoices (the `fuelInvoice` field in the invoice header has the value `true`) and is information about the invoice recipient.
6.  The country code of issuance of the official document (`countryDocumentId`) (e.g., passport) is allowed only for the transmission of invoices belonging to the Special Invoice Category Tax-free (the `specialInvoiceCategory` field in the invoice header has the value 4), provided that the official document number field (`documentIdNo`) has been filled in and concerns the invoice recipient.

### 5.1.1 Entity Address

The address of the issuer (or recipient) is an element of type `AddressType` and its structure is described below:

```xml
<inv:AddressType>
    <!-- Optional -->
    <inv:street>...</inv:street> <!-- xs:string -->
    <!-- Optional -->
    <inv:number>...</inv:number> <!-- xs:string -->
    <inv:postalCode>...</inv:postalCode> <!-- xs:string -->
    <inv:city>...</inv:city> <!-- xs:string -->
</inv:AddressType>
```

| Field        | Type        | Mandatory | Description |
| :----------- | :---------- | :-------- | :---------- |
| `street`     | `xs:string` | No        | Street      |
| `number`     | `xs:string` | No        | Number      |
| `postalCode` | `xs:string` | Yes       | Postal Code |
| `city`       | `xs:string` | Yes       | City        |

## 5.2 Payment Method

The payment method is an element of type `PaymentMethodDetailType` and its structure is described below:

```xml
<inv:PaymentMethodDetailType>
    <inv:type>...</inv:type> <!-- xs:int -->
    <inv:amount>...</inv:amount> <!-- xs:decimal -->
    <!-- Optional -->
    <inv:paymentMethodInfo>...</inv:paymentMethodInfo> <!-- xs:string -->
    <!-- Optional -->
    <inv:tipAmount>...</inv:tipAmount> <!-- xs:decimal -->
    <!-- Optional -->
    <inv:transactionId>...</inv:transactionId> <!-- xs:string -->
    <!-- Optional -->
    <inv:tid>...</inv:tid> <!-- xs:string, Max Length 200 -->
    <!-- Optional, Choice: ProvidersSignature or ECRToken -->
    <inv:ProvidersSignature>...</inv:ProvidersSignature> <!-- Type: ProviderSignatureType -->
    <inv:ECRToken>...</inv:ECRToken> <!-- Type: ECRTokenType -->
</inv:PaymentMethodDetailType>
```

| Field                | Type                    | Mandatory | Description                                         | Accepted Values                                        |
| :------------------- | :---------------------- | :-------- | :-------------------------------------------------- | :----------------------------------------------------- |
| `type`               | `xs:int`                | Yes       | Payment Type                                        | Min value = 1<br>Max value = 5 (See Table 8.12)        |
| `amount`             | `xs:decimal`            | Yes       | Payment Amount                                      | Min value = 0<br>Decimal places = 2                    |
| `paymentMethodInfo`  | `xs:string`             | No        | Information                                         | (e.g., Bank Account No.)                               |
| `tipAmount`          | `xs:decimal`            | No        | Tip amount                                          | Min value = 0<br>Decimal places = 2                    |
| `transactionId`      | `xs:string`             | No        | Unique Identifier                                   | Valid only for type = 7                                |
| `tid`                | `xs:string`             | No        | POS tid code                                        | Max length 200                                         |
| `ProvidersSignature` | `ProviderSignatureType` | No        | Provider Payment Signature                          | Valid only for type = 7 and transmission from provider |
| `ECRToken`           | `ECRTokenType`          | No        | Fiscal Device Payment Signature with software (ERP) | Valid only for type = 7 and transmission from ERP      |

**Remarks:**

1.  The values of the `type` field are described in the corresponding table of the appendix (8.12).
2.  The `amount` field may correspond to a part of the total value of the invoice.
3.  The `paymentMethodInfo` (Information) field can contain additional information regarding the specific type (e.g., Bank Account No.).
4.  The `transactionId` field is transmitted in case of payments with type = 7.
5.  The `ProvidersSignature` field is of type `ProviderSignatureType`, which is described in a subsequent paragraph (5.2.1), and is transmitted in case of payments with type = 7 and when transmission is via the provider channel.
6.  The `ECRToken` field is of type `ECRTokenType`, which is described in a subsequent paragraph (5.2.2), and is transmitted in case of payments with type = 7 and when transmission is from ERP.
7.  The `tid` field is the tid of the POS.

### 5.2.1 Provider Payment Signature

The `ProvidersSignature` field is an element of type `ProviderSignatureType` and its structure is described below:

```xml
<inv:ProviderSignatureType>
    <inv:SigningAuthor>...</inv:SigningAuthor> <!-- xs:string -->
    <inv:Signature>...</inv:Signature> <!-- xs:string -->
</inv:ProviderSignatureType>
```

| Field           | Type        | Mandatory | Description                     | Remarks                                                                                     |
| :-------------- | :---------- | :-------- | :------------------------------ | :------------------------------------------------------------------------------------------ |
| `SigningAuthor` | `xs:string` | Yes       | YPAHES approval Decision Number | Max length 20                                                                               |
| `Signature`     | `xs:string` | Yes       | Provider Signature              | Details in Decision No. A. 1155/09-10-2023 (Gov. Gazette 5992 B'/13.10.2023), as applicable |

_(Note: YPAHES refers to the Ministry of Digital Governance agency responsible for approving e-invoicing providers)_

### 5.2.2 Fiscal Device Payment Signature with software system (ERP)

The `ECRToken` field is an element of type `ECRTokenType` and its structure is described below:

```xml
<inv:ECRTokenType>
    <inv:SigningAuthor>...</inv:SigningAuthor> <!-- xs:string -->
    <inv:SessionNumber>...</inv:SessionNumber> <!-- xs:string -->
    <inv:Signature>...</inv:Signature> <!-- xs:string -->
</inv:ECRTokenType>
```

| Field           | Type        | Mandatory | Description                                        | Remarks                                                                                     |
| :-------------- | :---------- | :-------- | :------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| `SigningAuthor` | `xs:string` | Yes       | ECR id: Registry number of the fiscal mechanism    | Max length 20                                                                               |
| `SessionNumber` | `xs:string` | Yes       | Unique 8-digit code generated for each transaction |                                                                                             |
| `Signature`     | `xs:string` | Yes       | Signature                                          | Details in Decision No. A. 1155/09-10-2023 (Gov. Gazette 5992 B'/13.10.2023), as applicable |

## 5.3 Invoice header

The invoice header is an element of type `InvoiceHeaderType` and its structure is described here:

```xml
<inv:invoiceHeader> <!-- Type: InvoiceHeaderType -->
    <inv:series>...</inv:series> <!-- xs:string -->
    <inv:aa>...</inv:aa> <!-- xs:string -->
    <inv:issueDate>...</inv:issueDate> <!-- xs:date -->
    <inv:invoiceType>...</inv:invoiceType> <!-- xs:string -->
    <!-- Optional -->
    <inv:vatPaymentSuspension>...</inv:vatPaymentSuspension> <!-- xs:boolean -->
    <!-- Optional -->
    <inv:currency>...</inv:currency> <!-- xs:string -->
    <!-- Optional -->
    <inv:exchangeRate>...</inv:exchangeRate> <!-- xs:decimal -->
    <!-- Optional, [0..∞] -->
    <inv:correlatedInvoices>...</inv:correlatedInvoices> <!-- xs:long -->
    <!-- Optional -->
    <inv:selfPricing>...</inv:selfPricing> <!-- xs:boolean -->
    <!-- Optional -->
    <inv:dispatchDate>...</inv:dispatchDate> <!-- xs:date -->
    <!-- Optional -->
    <inv:dispatchTime>...</inv:dispatchTime> <!-- xs:time -->
    <!-- Optional -->
    <inv:vehicleNumber>...</inv:vehicleNumber> <!-- xs:string -->
    <!-- Optional -->
    <inv:movePurpose>...</inv:movePurpose> <!-- xs:int -->
    <!-- Optional -->
    <inv:fuelInvoice>...</inv:fuelInvoice> <!-- xs:boolean -->
    <!-- Optional -->
    <inv:specialInvoiceCategory>...</inv:specialInvoiceCategory> <!-- xs:int -->
    <!-- Optional -->
    <inv:invoiceVariationType>...</inv:invoiceVariationType> <!-- xs:int -->
    <!-- Optional, [0..∞] -->
    <inv:otherCorrelatedEntities>...</inv:otherCorrelatedEntities> <!-- Type: EntityType -->
    <!-- Optional -->
    <inv:otherDeliveryNoteHeader>...</inv:otherDeliveryNoteHeader> <!-- Type: OtherDeliveryNoteHeaderType -->
    <!-- Optional -->
    <inv:isDeliveryNote>...</inv:isDeliveryNote> <!-- xs:boolean -->
    <!-- Optional -->
    <inv:otherMovePurposeTitle>...</inv:otherMovePurposeTitle> <!-- xs:string -->
     <!-- Optional -->
    <inv:thirdPartyCollection>...</inv:thirdPartyCollection> <!-- xs:boolean -->
    <!-- Optional, [0..∞] -->
    <inv:multipleConnectedMarks>...</inv:multipleConnectedMarks> <!-- xs:long -->
    <!-- Optional -->
    <inv:tableAA>...</inv:tableAA> <!-- xs:string -->
     <!-- Optional -->
    <inv:totalCancelDeliveryOrders>...</inv:totalCancelDeliveryOrders> <!-- xs:boolean -->
</inv:invoiceHeader>
```

| Field                       | Type                          | Mandatory | Description                                     | Accepted Values                                                                                                                                                                                                                                                                                                                                                        |
| :-------------------------- | :---------------------------- | :-------- | :---------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `series`                    | `xs:string`                   | Yes       | Invoice Series                                  | Max length 50                                                                                                                                                                                                                                                                                                                                                          |
| `aa`                        | `xs:string`                   | Yes       | Invoice Sequential Number (AA)                  | Max length 50                                                                                                                                                                                                                                                                                                                                                          |
| `issueDate`                 | `xs:date`                     | Yes       | Invoice Issue Date                              |                                                                                                                                                                                                                                                                                                                                                                        |
| `invoiceType`               | `xs:string`                   | Yes       | Invoice Type                                    | Value list: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 4, 5.1, 5.2, 6.1, 6.2, 7.1, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 9.3, 11.1, 11.2, 11.3, 11.4, 11.5, 12, 13.1, 13.2, 13.3, 13.4, 13.30, 13.31, 14.1, 14.2, 14.3, 14.4, 14.5, 14.30, 14.31, 15.1, 16.1, 17.1, 17.2, 17.3, 17.4, 17.5, 17.6.<br>[For providers, **only values 1.1 to 11.5** are allowed] |
| `vatPaymentSuspension`      | `xs:boolean`                  | No        | VAT Payment Suspension                          |                                                                                                                                                                                                                                                                                                                                                                        |
| `currency`                  | `xs:string`                   | No        | Currency                                        | Currency codes (ISO 4217)                                                                                                                                                                                                                                                                                                                                              |
| `exchangeRate`              | `xs:decimal`                  | No        | Exchange Rate                                   | Min value = 0<br>Decimal places = 5                                                                                                                                                                                                                                                                                                                                    |
| `correlatedInvoices`        | `xs:long`                     | No        | Correlated Invoices                             | (List of MARKs)                                                                                                                                                                                                                                                                                                                                                        |
| `selfPricing`               | `xs:boolean`                  | No        | Self-Pricing Indication                         |                                                                                                                                                                                                                                                                                                                                                                        |
| `dispatchDate`              | `xs:date`                     | No        | Dispatch Start Date                             |                                                                                                                                                                                                                                                                                                                                                                        |
| `dispatchTime`              | `xs:time`                     | No        | Dispatch Start Time                             |                                                                                                                                                                                                                                                                                                                                                                        |
| `vehicleNumber`             | `xs:string`                   | No        | Transport Means Number                          |                                                                                                                                                                                                                                                                                                                                                                        |
| `movePurpose`               | `xs:int`                      | No        | Movement Purpose                                | Min value = 1<br>Max value = 19 (See Table 8.14)                                                                                                                                                                                                                                                                                                                       |
| `fuelInvoice`               | `xs:boolean`                  | No        | Fuel invoice (indication)                       |                                                                                                                                                                                                                                                                                                                                                                        |
| `specialInvoiceCategory`    | `xs:int`                      | No        | Special Invoice Category                        | Min value = 1<br>Max value = 10 (See Table 8.19)                                                                                                                                                                                                                                                                                                                       |
| `invoiceVariationType`      | `xs:int`                      | No        | Invoice Variation (Deviation) Type              | Min value = 1<br>Max value = 4 (See Table 8.18)<br>(Not allowed for submission via providers)                                                                                                                                                                                                                                                                          |
| `otherCorrelatedEntities`   | `EntityType`                  | No        | Other correlated entities                       | (List of type EntityType)                                                                                                                                                                                                                                                                                                                                              |
| `otherDeliveryNoteHeader`   | `OtherDeliveryNoteHeaderType` | No        | Other General Delivery Details                  |                                                                                                                                                                                                                                                                                                                                                                        |
| `isDeliveryNote`            | `xs:boolean`                  | No        | Delivery Note Indication                        |                                                                                                                                                                                                                                                                                                                                                                        |
| `otherMovePurposeTitle`     | `xs:string`                   | No        | Title of Other Movement Purpose                 | Accepted only if `movePurpose` = 19 (Other Movements)                                                                                                                                                                                                                                                                                                                  |
| `thirdPartyCollection`      | `xs:Boolean`                  | No        | Third-Party Collection Indication               | Accepted only for invoice types 8.4 and 8.5                                                                                                                                                                                                                                                                                                                            |
| `multipleConnectedMarks`    | `xs:long`                     | No        | Multiple Connected MARKs                        | Not accepted for invoice types 1.6, 2.4, and 5.1                                                                                                                                                                                                                                                                                                                       |
| `tableAA`                   | `xs:string`                   | Yes       | Table AA (Sequential Number)                    | Accepted only for invoice type 8.6 - Max length 50                                                                                                                                                                                                                                                                                                                     |
| `totalCancelDeliveryOrders` | `xs:Boolean`                  | No        | Indication of total cancellation of Order Slips | Accepted only for invoice type 8.6                                                                                                                                                                                                                                                                                                                                     |

**Remarks:**

1.  The `exchangeRate` field is the exchange rate of the currency relative to the Euro. It must be filled only when the currency does not have the value EUR.
2.  The currency code comes from the corresponding list according to the `ISO 4217` standard.
3.  The `correlatedInvoices` element is a list and contains the MARKs of the correlated invoices.
4.  If no invoice series is issued, the `series` field must have the value 0.
5.  The `selfPricing` field indicates whether it is a Self-Billing Invoice.
6.  The possible values for the `movePurpose` and `invoiceType` fields are described in detail in the corresponding tables of the Appendix.
7.  The `fuelInvoice` field indicates whether it is an invoice for the sale of liquid fuels.
8.  The possible values for the `specialInvoiceCategory` field are described in detail in the corresponding table of the Appendix.
9.  The possible values for the `invoiceVariationType` field are described in detail in the corresponding table of the Appendix. Also, details regarding their usage from a business perspective are described in the relevant business document.
10. The `otherCorrelatedEntities` (Other correlated entities) field is a list of type `EntityType`.
11. The structure of the `otherCorrelatedEntities` type is described below (5.3.1).
12. The structure of the `otherDeliveryNoteHeader` type is described below (5.3.2).
13. The `isDeliveryNote` field indicates whether it is an invoice that also serves as a delivery note (e.g., invoice type 1.1 - Sales Invoice, if it has the indication `isDeliveryNote = true`, then it is also a delivery note and additional delivery details must be sent).
14. The `otherMovePurposeTitle` field is filled when `movePurpose = 19` (Other Movements) has been selected and defines the title of the other movement.
15. The `thirdPartyCollection` field indicates whether the business using Payment Means as a user of payment services collects on behalf of third parties (case of invoice 8.4 - POS Receipt) or returns transaction amounts on behalf of third parties (case of invoice 8.5 - POS Return Receipt).
16. The `multipleConnectedMarks` field is a list containing multiple connected MARKs (e.g., can be used when issuing an invoice/receipt for multiple restaurant order slips).
17. The `totalCancelDeliveryOrders` field is valid only for invoice type 8.6 (restaurant order slip) and indicates whether the invoice totally cancels the MARKs of the restaurant order slips declared in the `multipleConnectedMarks` field (in this case, the `multipleConnectedMarks` field must contain MARKs of the restaurant order slips – type 8.6 – for which total cancellation will occur). In this case, the invoice must be transmitted with only one line with zero values and VAT category 8 (Entries without VAT).

### 5.3.1 Other Correlated Entities

Other Correlated Entities are elements of type `EntityType` and their structure is described below:

```xml
<inv:EntityType>
    <inv:type>...</inv:type> <!-- xs:int -->
    <inv:entityData>...</inv:entityData> <!-- Type: PartyType -->
</inv:EntityType>
```

| Field        | Type        | Mandatory | Description             | Accepted Values       |
| :----------- | :---------- | :-------- | :---------------------- | :-------------------- |
| `type`       | `xs:int`    | Yes       | Entity Category         | Appendix Table (8.20) |
| `entityData` | `PartyType` | Yes       | Entity (Person) Details |                       |

**Remarks:**

1.  The possible values for the `type` field are described in the corresponding table of the appendix (8.20).
2.  The `entityData` (entity (person) details) field is of type `PartyType`, which is analyzed in a previous corresponding paragraph (5.1 Entity Details).

### 5.3.2 Other General Delivery Details

Other General Delivery Details are elements of type `OtherDeliveryNoteHeaderType` and their structure is described below:

```xml
<inv:OtherDeliveryNoteHeaderType>
    <inv:loadingAddress>...</inv:loadingAddress> <!-- Type: AddressType -->
    <inv:deliveryAddress>...</inv:deliveryAddress> <!-- Type: AddressType -->
    <!-- Optional -->
    <inv:startShippingBranch>...</inv:startShippingBranch> <!-- xs:int -->
    <!-- Optional -->
    <inv:completeShippingBranch>...</inv:completeShippingBranch> <!-- xs:int -->
</inv:OtherDeliveryNoteHeaderType>
```

| Field                    | Type          | Mandatory | Description                               | Accepted Values                                                                                                 |
| :----------------------- | :------------ | :-------- | :---------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `loadingAddress`         | `AddressType` | Yes       | Loading Address                           | Filled for documents that are delivery notes (e.g., 9.3) or invoice and delivery note (`isDeliveryNote = true`) |
| `deliveryAddress`        | `AddressType` | Yes       | Delivery Address                          | Filled for documents that are delivery notes (e.g., 9.3) or invoice and delivery note (`isDeliveryNote = true`) |
| `startShippingBranch`    | `xs:int`      | No        | Start of delivery branch (Issuer)         | Filled for documents that are delivery notes (e.g., 9.3) or invoice and delivery note (`isDeliveryNote = true`) |
| `completeShippingBranch` | `xs:int`      | No        | Completion of delivery branch (Recipient) | Filled for documents that are delivery notes (e.g., 9.3) or invoice and delivery note (`isDeliveryNote = true`) |

**Remarks:**

1.  The `loadingAddress` field is of type `AddressType`, which is analyzed in a previous corresponding paragraph (5.1.1).
2.  The `deliveryAddress` field is of type `AddressType`, which is analyzed in a previous corresponding paragraph (5.1.1).
3.  The `startShippingBranch` field defines the branch from which the delivery started, in case the delivery starts from a branch (installation) of the document issuer, which is different from the issuer's branch on the note.
4.  The `completeShippingBranch` field defines the branch where the delivery will be completed, in case the delivery will be completed at a branch (installation) of the document recipient, which is different from the recipient's branch on the note.

## 5.4 Invoice details

The invoice details are elements of type `InvoiceRowType` and are described below:

```xml
<inv:invoiceDetails> <!-- Type: InvoiceRowType -->
    <inv:lineNumber>...</inv:lineNumber> <!-- xs:int -->
    <!-- Optional -->
    <inv:recType>...</inv:recType> <!-- xs:int -->
    <!-- Optional -->
    <inv:fuelCode>...</inv:fuelCode> <!-- Type: FuelCodes -->
    <!-- Optional -->
    <inv:quantity>...</inv:quantity> <!-- xs:decimal -->
    <!-- Optional -->
    <inv:measurementUnit>...</inv:measurementUnit> <!-- xs:int -->
    <!-- Optional -->
    <inv:invoiceDetailType>...</inv:invoiceDetailType> <!-- xs:int -->
    <inv:netValue>...</inv:netValue> <!-- xs:decimal -->
    <inv:vatCategory>...</inv:vatCategory> <!-- xs:int -->
    <inv:vatAmount>...</inv:vatAmount> <!-- xs:decimal -->
    <!-- Optional -->
    <inv:vatExemptionCategory>...</inv:vatExemptionCategory> <!-- xs:int -->
    <!-- Optional -->
    <inv:dienergia>...</inv:dienergia> <!-- Type: ShipType -->
    <!-- Optional -->
    <inv:discountOption>...</inv:discountOption> <!-- xs:boolean -->
    <!-- Optional -->
    <inv:withheldAmount>...</inv:withheldAmount> <!-- xs:decimal -->
    <!-- Optional -->
    <inv:withheldPercentCategory>...</inv:withheldPercentCategory> <!-- xs:int -->
    <!-- Optional -->
    <inv:stampDutyAmount>...</inv:stampDutyAmount> <!-- xs:decimal -->
    <!-- Optional -->
    <inv:stampDutyPercentCategory>...</inv:stampDutyPercentCategory> <!-- xs:int -->
    <!-- Optional -->
    <inv:feesAmount>...</inv:feesAmount> <!-- xs:decimal -->
    <!-- Optional -->
    <inv:feesPercentCategory>...</inv:feesPercentCategory> <!-- xs:int -->
    <!-- Optional -->
    <inv:otherTaxesPercentCategory>...</inv:otherTaxesPercentCategory> <!-- xs:int -->
    <!-- Optional -->
    <inv:otherTaxesAmount>...</inv:otherTaxesAmount> <!-- xs:decimal -->
    <!-- Optional -->
    <inv:deductionsAmount>...</inv:deductionsAmount> <!-- xs:decimal -->
    <!-- Optional -->
    <inv:lineComments>...</inv:lineComments> <!-- xs:string -->
    <!-- Optional, [0..∞] -->
    <inv:incomeClassification>...</inv:incomeClassification> <!-- Type: IncomeClassificationType -->
    <!-- Optional, [0..∞] -->
    <inv:expensesClassification>...</inv:expensesClassification> <!-- Type: ExpensesClassificationType -->
     <!-- Optional -->
    <inv:quantity15>...</inv:quantity15> <!-- xs:decimal -->
     <!-- Optional -->
    <inv:itemDescr>...</inv:itemDescr> <!-- xs:string -->
    <!-- Optional -->
    <inv:TaricNo>...</inv:TaricNo> <!-- xs:string -->
    <!-- Optional -->
    <inv:itemCode>...</inv:itemCode> <!-- xs:string -->
    <!-- Optional -->
    <inv:otherMeasurementUnitQuantity>...</inv:otherMeasurementUnitQuantity> <!-- xs:int -->
    <!-- Optional -->
    <inv:otherMeasurementUnitTitle>...</inv:otherMeasurementUnitTitle> <!-- xs:string -->
     <!-- Optional -->
    <inv:notVAT195>...</inv:notVAT195> <!-- xs:boolean -->
</inv:invoiceDetails>
```

| Field                          | Type                         | Mandatory | Description                                                 | Accepted Values                                                                                                                                                        |
| :----------------------------- | :--------------------------- | :-------- | :---------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lineNumber`                   | `xs:int`                     | Yes       | Line AA (Sequential Number)                                 | Min value = 1                                                                                                                                                          |
| `recType`                      | `xs:int`                     | No        | Line Type                                                   | Min value = 1<br>Max value = 7 (See Table 8.16)<br>**Note:** In the current version, values 1, 4, and 5 cannot be used – they are reserved in the model for future use |
| `fuelCode`                     | `FuelCodes`                  | No        | Fuel Code                                                   | Fuel Codes (Value list – details in corresponding appendix 8.17)<br>Accepted only if the invoice is a fuel invoice (`fuelInvoice`=true)                                |
| `quantity`                     | `xs:decimal`                 | No        | Quantity                                                    | Min value = 0                                                                                                                                                          |
| `measurementUnit`              | `xs:int`                     | No        | Quantity Type                                               | Value list: See relevant appendix for details (8.13)                                                                                                                   |
| `invoiceDetailType`            | `xs:int`                     | No        | Marking                                                     | Value list: 1,2 (See Table 8.15)                                                                                                                                       |
| `netValue`                     | `xs:decimal`                 | Yes       | Net value                                                   | Min value = 0<br>Decimal places = 2                                                                                                                                    |
| `vatCategory`                  | `xs:int`                     | Yes       | VAT Category                                                | Value list: See relevant appendix for details (8.2)                                                                                                                    |
| `vatAmount`                    | `xs:decimal`                 | Yes       | VAT Amount                                                  | Min value = 0<br>Decimal places = 2                                                                                                                                    |
| `vatExemptionCategory`         | `xs:int`                     | No        | VAT Exemption Reason Category                               | Value list: See relevant appendix for details (8.3)                                                                                                                    |
| `dienergia`                    | `ShipType`                   | No        | POL 1177/2018 Art. 27                                       |                                                                                                                                                                        |
| `discountOption`               | `xs:boolean`                 | No        | Discount Right                                              | False / True                                                                                                                                                           |
| `withheldAmount`               | `xs:decimal`                 | No        | Withheld Amount                                             | Min value = 0<br>Decimal places = 2                                                                                                                                    |
| `withheldPercentCategory`      | `xs:int`                     | No        | Withheld Tax Rate Category                                  | Value list: See relevant appendix for details (8.4)                                                                                                                    |
| `stampDutyAmount`              | `xs:decimal`                 | No        | Stamp Duty Amount                                           | Min value = 0<br>Decimal places = 2                                                                                                                                    |
| `stampDutyPercentCategory`     | `xs:int`                     | No        | Stamp Duty Rate Category                                    | Value list: See relevant appendix for details (8.6)                                                                                                                    |
| `feesAmount`                   | `xs:decimal`                 | No        | Fees Amount                                                 | Min value = 0<br>Decimal places = 2                                                                                                                                    |
| `feesPercentCategory`          | `xs:int`                     | No        | Fees Rate Category                                          | Value list: See relevant appendix for details (8.7)                                                                                                                    |
| `otherTaxesPercentCategory`    | `xs:int`                     | No        | Other Taxes Rate Category                                   | Value list: See relevant appendix for details (8.5)                                                                                                                    |
| `otherTaxesAmount`             | `xs:decimal`                 | No        | Other Taxes Amount                                          | Min value = 0<br>Decimal places = 2                                                                                                                                    |
| `deductionsAmount`             | `xs:decimal`                 | No        | Deductions Amount                                           | Min value = 0<br>Decimal places = 2                                                                                                                                    |
| `lineComments`                 | `xs:string`                  | No        | Line Comments                                               |                                                                                                                                                                        |
| `incomeClassification`         | `IncomeClassificationType`   | No        | Income Classifications                                      | (List)                                                                                                                                                                 |
| `expensesClassification`       | `ExpensesClassificationType` | No        | Expenses Classifications                                    | (List)                                                                                                                                                                 |
| `quantity15`                   | `xs:decimal`                 | No        | Quantity at 15 degrees Celsius                              | Min value = 0.<br>Accepted only for submission by providers and if the invoice is a fuel invoice                                                                       |
| `itemDescr`                    | `xs:string`                  | No        | Item Description                                            | Max length 300.<br>Accepted only for tax-free invoices or invoices that are also delivery notes or simple delivery notes (e.g., 9.3)                                   |
| `TaricNo`                      | `xs:string`                  | No        | Taric Code                                                  | Mandatory length 10.<br>Accepted only for invoices that are also delivery notes or simple delivery notes (e.g., 9.3)                                                   |
| `itemCode`                     | `xs:string`                  | No        | Item Code                                                   | Max length 50.<br>Accepted only for invoices that are also delivery notes or simple delivery notes (e.g., 9.3)                                                         |
| `otherMeasurementUnitQuantity` | `xs:int`                     | No        | Quantity of Other Pieces Measurement Unit                   | Accepted only if `measurementUnit` = 7 (Pieces_Other Cases)                                                                                                            |
| `otherMeasurementUnitTitle`    | `xs:string`                  | No        | Title of Other Pieces Measurement Unit                      | Accepted only if `measurementUnit` = 7 (Pieces_Other Cases)                                                                                                            |
| `notVAT195`                    | `xs:boolean`                 | No        | Indication of non-participation in VAT (revenue – outflows) | Accepted only for revenue invoices of types between 1.1 – 11.5                                                                                                         |

**Remarks:**

1.  The possible values for the fields `measurementUnit`, `invoiceDetailType`, `vatCategory`, `vatExemptionCategory`, `withheldPercentCategory`, `stampDutyPercentCategory`, `feesPercentCategory`, and `otherTaxesPercentCategory` are described in detail in the corresponding tables of the Appendix.
2.  In all cases, regardless of the value of the corresponding category field, the relevant amount is always filled in the corresponding `amount` field.
3.  The `vatExemptionCategory` field is necessary if the `vatCategory` indicates a 0% VAT rate category.
4.  For accounting entries where VAT does not apply, the `vatCategory` field will have the value 8.
5.  The line comments (`lineComments`) are filled by the user and are used for informational purposes for the service.
6.  Classifications concerning the submitter (issuer – income, recipient – expenses) are submitted along with the invoice using the corresponding `incomeClassification` – `expensesClassification` fields.
7.  a) When submitting lines with `recType = 2` (Fee line with VAT) and/or `recType = 3` (Other Taxes line with VAT), it will also be permissible, if desired, to send withheld taxes / fees / other taxes / stamp duty / deductions at the invoice level and not necessarily per invoice summary line. In the cases of these lines, the amounts corresponding to fees with VAT (`recType = 2`) or other taxes (`recType = 3`) respectively, will be sent in the line's net value field (`netValue`), while the corresponding fee amount (`feesAmount`) or other taxes amount (`otherTaxesAmount`) fields will not be filled. Also, on these lines, sending other types of taxes/fees/deductions/stamp duty is not allowed (e.g., on a line with `recType = 2`, sending other taxes/deductions/withheld taxes/stamp duty on that line is not allowed).
    b) Submission with `recType = 7` (negative value sign) is allowed only when transmitting invoices 17.3, 17.4, 17.5, and 17.6, and it indicates that the line's values are negative (in the corresponding value fields, the values are written as their absolute/positive values). Note that in the value totals in the Invoice Summary section (`InvoiceSummaryType`), the sums of the absolute values of the corresponding line values will be transmitted, regardless of whether there are lines marked with `recType = 7` or not.
8.  The possible values for the `fuelCode` (fuel code) field are described in detail in the corresponding table of the Appendix. Its submission is allowed only if it is a fuel invoice (`invoiceHeaderType.fuelInvoice = true`). The value 999 is used when, in addition to fuel, there is a need to invoice other charges on an invoice. Only one line with this code is allowed per invoice, and the net value of this line must be less than or equal to the sum of the net values of the other fuel codes on the invoice.
9.  The `otherMeasurementUnitQuantity` and `otherMeasurementUnitTitle` fields must be filled if `measurementUnit = 7` (Pieces_Other Cases) has been selected. By selecting `measurementUnit = 7` (Pieces_Other Cases) as the unit of measure for delivery documents, it is possible to transmit measurement unit information not included in the available list values, with a numerical representation of the quantity (`otherMeasurementUnitQuantity`) corresponding to the type of packaging and a brief description of the packaging type in the text field (`otherMeasurementUnitTitle`), e.g., 3_Pallets. Note that the `quantity` field always corresponds to the number of items being moved and not the number of packaging items.
10. By filling the indication of the `notVAT195` field (with the value `true`), the amounts of the invoice lines do not participate in the VAT return (outflows). It is accepted only for revenue invoices of types between 1.1 – 11.5.

#### 5.4.1 Declaration of Activity (POL 1177/2018 Art. 27)

The Declaration of Activity is an element of type `ShipType` and its structure is described below:

```xml
<inv:ShipType>
    <inv:applicationId>...</inv:applicationId> <!-- xs:string -->
    <inv:applicationDate>...</inv:applicationDate> <!-- xs:date -->
    <!-- Optional -->
    <inv:doy>...</inv:doy> <!-- xs:string -->
    <inv:shipID>...</inv:shipID> <!-- xs:string -->
</inv:ShipType>
```

| Field             | Type        | Mandatory | Description                  |
| :---------------- | :---------- | :-------- | :--------------------------- |
| `applicationId`   | `xs:string` | Yes       | Activity Declaration Number  |
| `applicationDate` | `xs:date`   | Yes       | Declaration Date             |
| `doy`             | `xs:string` | No        | Declaration Tax Office (DOY) |
| `shipID`          | `xs:string` | Yes       | Ship Details                 |

## 5.5 Tax Totals

The Tax Totals type (`TaxTotalsType`) describes the structure of taxes that apply to the entire invoice and is described below:

```xml
<inv:TaxTotalsType>
    <inv:taxType>...</inv:taxType> <!-- xs:byte -->
    <!-- Optional -->
    <inv:taxCategory>...</inv:taxCategory> <!-- xs:byte -->
    <!-- Optional -->
    <inv:underlyingValue>...</inv:underlyingValue> <!-- xs:decimal -->
    <inv:taxAmount>...</inv:taxAmount> <!-- xs:decimal -->
     <!-- Optional -->
    <inv:id>...</inv:id> <!-- xs:byte -->
</inv:TaxTotalsType>
```

| Field             | Type         | Mandatory | Description            | Accepted Values                                                                                                    |
| :---------------- | :----------- | :-------- | :--------------------- | :----------------------------------------------------------------------------------------------------------------- |
| `taxType`         | `xs:byte`    | Yes       | Tax Type               | Value list:<br>1 = Withheld Tax<br>2 = Fees<br>3 = Other Taxes<br>4 = Stamp Duty<br>5 = Deductions (See Table 8.5) |
| `taxCategory`     | `xs:byte`    | No        | Tax Category           | Min value = 1 (See corresponding Tables 8.4, 8.6, 8.7)                                                             |
| `underlyingValue` | `xs:decimal` | No        | Underlying Value       | Min value = 0<br>Decimal places = 2                                                                                |
| `taxAmount`       | `xs:decimal` | Yes       | Tax Amount             | Min value = 0<br>Decimal places = 2                                                                                |
| `id`              | `xs:byte`    | No        | Line sequential number |                                                                                                                    |

**Remarks:**

1.  The `taxCategory` field can take any value from the corresponding Appendix table for the tax mentioned in the `taxType` field.
2.  The `underlyingValue` field indicates the value to which the specific tax applies.

## 5.6 Invoice summary

The invoice summary is of type `InvoiceSummaryType` and is described below:

```xml
<inv:invoiceSummary> <!-- Type: InvoiceSummaryType -->
    <inv:totalNetValue>...</inv:totalNetValue> <!-- xs:decimal -->
    <inv:totalVatAmount>...</inv:totalVatAmount> <!-- xs:decimal -->
    <inv:totalWithheldAmount>...</inv:totalWithheldAmount> <!-- xs:decimal -->
    <inv:totalFeesAmount>...</inv:totalFeesAmount> <!-- xs:decimal -->
    <inv:totalStampDutyamount>...</inv:totalStampDutyamount> <!-- xs:decimal -->
    <inv:totalOtherTaxesAmount>...</inv:totalOtherTaxesAmount> <!-- xs:decimal -->
    <inv:totalDeductionsAmount>...</inv:totalDeductionsAmount> <!-- xs:decimal -->
    <inv:totalGrossValue>...</inv:totalGrossValue> <!-- xs:decimal -->
    <!-- Optional, [0..∞] -->
    <inv:incomeClassification>...</inv:incomeClassification> <!-- Type: IncomeClassificationType -->
    <!-- Optional, [0..∞] -->
    <inv:expensesClassification>...</inv:expensesClassification> <!-- Type: ExpensesClassificationType -->
</inv:invoiceSummary>
```

| Field                    | Type                         | Mandatory | Description              | Accepted Values                     |
| :----------------------- | :--------------------------- | :-------- | :----------------------- | :---------------------------------- |
| `totalNetValue`          | `xs:decimal`                 | Yes       | Total Net Value          | Min value = 0<br>Decimal places = 2 |
| `totalVatAmount`         | `xs:decimal`                 | Yes       | Total VAT Amount         | Min value = 0<br>Decimal places = 2 |
| `totalWithheldAmount`    | `xs:decimal`                 | Yes       | Total Withheld Taxes     | Min value = 0<br>Decimal places = 2 |
| `totalFeesAmount`        | `xs:decimal`                 | Yes       | Total Fees Amount        | Min value = 0<br>Decimal places = 2 |
| `totalStampDutyamount`   | `xs:decimal`                 | Yes       | Total Stamp Duty Amount  | Min value = 0<br>Decimal places = 2 |
| `totalOtherTaxesAmount`  | `xs:decimal`                 | Yes       | Total Other Taxes Amount | Min value = 0<br>Decimal places = 2 |
| `totalDeductionsAmount`  | `xs:decimal`                 | Yes       | Total Deductions Amount  | Min value = 0<br>Decimal places = 2 |
| `totalGrossValue`        | `xs:decimal`                 | Yes       | Total Gross Value        | Min value = 0<br>Decimal places = 2 |
| `incomeClassification`   | `IncomeClassificationType`   | No        | Income Classifications   | (List)                              |
| `expensesClassification` | `ExpensesClassificationType` | No        | Expenses Classifications | (List)                              |

**Remarks:**

1.  The `incomeClassification` and `expensesClassification` elements contain the sums for each combination of `classificationType` and `classificationCategory` field values found in the invoice lines.
2.  All tax total fields except `totalVatAmount` will contain either the sums of the corresponding taxes from the invoice lines or the sums of the corresponding taxes contained in the `taxesTotals` element.

## 5.7 Information on Other Transport Means

Information on Other Transport Means (`otherTransportDetails`) are elements of type `TransportDetailType` and their structure is described below:

```xml
<inv:TransportDetailType>
    <inv:vehicleNumber>...</inv:vehicleNumber> <!-- xs:string -->
</inv:TransportDetailType>
```

| Field           | Type        | Mandatory | Description            | Accepted Values |
| :-------------- | :---------- | :-------- | :--------------------- | :-------------- |
| `vehicleNumber` | `xs:string` | Yes       | Transport Means Number | Max length 50   |

## 5.8 Income Classification

The `IncomeClassificationType` (described below) is the basic structure for Income Classification and is included either in each invoice line separately (line classification), or in the invoice summary (sum of classifications per type - category), or in the `InvoiceIncomeClassificationType` object when income classifications are submitted separately (see paragraph 4.2.2).

```xml
<inv:IncomeClassificationType>
    <!-- Optional -->
    <inv:classificationType>...</inv:classificationType> <!-- xs:string -->
    <inv:classificationCategory>...</inv:classificationCategory> <!-- xs:string -->
    <inv:amount>...</inv:amount> <!-- xs:decimal -->
    <!-- Optional -->
    <inv:id>...</inv:id> <!-- xs:byte -->
</inv:IncomeClassificationType>
```

| Field                    | Type         | Mandatory | Description                  | Accepted Values                                     |
| :----------------------- | :----------- | :-------- | :--------------------------- | :-------------------------------------------------- |
| `classificationType`     | `xs:string`  | No        | Classification Code          | Value list: See relevant appendix for details (8.9) |
| `classificationCategory` | `xs:string`  | Yes       | Classification Category      | Value list: See relevant appendix for details (8.8) |
| `amount`                 | `xs:decimal` | Yes       | Amount                       | Min value = 0<br>Decimal places = 2                 |
| `id`                     | `xs:byte`    | No        | Classification Serial Number |                                                     |

**Remarks:**

1.  The values of the `classificationType` and `classificationCategory` fields (for income classifications) are described in detail in the corresponding tables of the Appendix.
2.  The `id` field is provided for sequential numbering (1, 2, 3… etc.) of classifications within a line.

## 5.9 Expenses Classification

The `ExpensesClassificationType` (described below) is the basic structure for Expenses Classification and is included either in each invoice line separately (line classification), or in the invoice summary (sum of classifications per type - category), or in the `InvoiceExpensesClassificationType` object when expense classifications are submitted separately (see paragraph 4.2.3).

```xml
<inv:ExpensesClassificationType>
    <!-- Optional -->
    <inv:classificationType>...</inv:classificationType> <!-- xs:string -->
    <inv:classificationCategory>...</inv:classificationCategory> <!-- xs:string -->
    <inv:amount>...</inv:amount> <!-- xs:decimal -->
    <!-- Optional -->
    <inv:vatAmount>...</inv:vatAmount> <!-- xs:decimal -->
    <!-- Optional -->
    <inv:vatCategory>...</inv:vatCategory> <!-- xs:byte -->
    <!-- Optional -->
    <inv:vatExemptionCategory>...</inv:vatExemptionCategory> <!-- xs:byte -->
    <!-- Optional -->
    <inv:id>...</inv:id> <!-- xs:byte -->
</inv:ExpensesClassificationType>
```

| Field                    | Type         | Mandatory | Description                  | Values                                               |
| :----------------------- | :----------- | :-------- | :--------------------------- | :--------------------------------------------------- |
| `classificationType`     | `xs:string`  | No        | Classification Code          | Value list: See relevant appendix for details (8.11) |
| `classificationCategory` | `xs:string`  | No        | Classification Category      | Value list: See relevant appendix for details (8.10) |
| `amount`                 | `xs:decimal` | Yes       | Amount                       | Min value = 0<br>Decimal places = 2                  |
| `vatAmount`              | `xs:decimal` | No        | VAT Amount                   | Min value = 0<br>Decimal places = 2                  |
| `vatCategory`            | `xs:byte`    | No        | VAT Category                 | Value list: See relevant appendix for details (8.2)  |
| `vatExemptionCategory`   | `xs:byte`    | No        | VAT Exemption Category       | Value list: See relevant appendix for details (8.3)  |
| `id`                     | `xs:byte`    | No        | Classification Serial Number |                                                      |

**Remarks:**

1.  The values of the `classificationType`, `classificationCategory`, `vatCategory`, `vatExemptionCategory` fields are described in detail in the corresponding tables of the Appendix.
2.  The `id` field is provided for sequential numbering (1, 2, 3… etc.) of classifications within a line.
3.  The `vatAmount`, `vatCategory`, `vatExemptionCategory` fields are used only for VAT expense classifications; otherwise, they are ignored.
4.  The `classificationCategory` field is used only for E3 expense classifications; otherwise, it is ignored.

# 6 Description of Responses

## 6.1 Data Submission

When the user uses a data submission or cancellation method (`SendInvoices`, `SendIncomeClassification`, `SendExpensesClassification`, `CancelInvoice`), they will receive a `ResponseDoc` object in XML format as a response. The object includes a list of `response` type elements, one for each submitted entity.

```xml
<!-- Root: ResponseDoc -->
<res:ResponseDoc xmlns:res="https://www.aade.gr/myDATA/response/v1.0">
    <!-- [1..∞] -->
    <res:response> <!-- Type: ResponseType -->
        <res:index>...</res:index> <!-- xs:int -->
        <res:statusCode>...</res:statusCode> <!-- xs:string -->
        <!-- Optional -->
        <res:invoiceUid>...</res:invoiceUid> <!-- xs:string -->
        <!-- Optional -->
        <res:invoiceMark>...</res:invoiceMark> <!-- xs:long -->
        <!-- Optional -->
        <res:classificationMark>...</res:classificationMark> <!-- xs:long -->
         <!-- Optional -->
        <res:authenticationCode>...</res:authenticationCode> <!-- xs:string -->
        <!-- Optional -->
        <res:cancellationMark>...</res:cancellationMark> <!-- xs:long -->
         <!-- Optional -->
        <res:qrUrl>...</res:qrUrl> <!-- xs:string -->
        <!-- Optional, Choice: errors or nothing -->
         <!-- [1..∞] -->
        <res:errors> <!-- Type: ErrorType -->
           <!-- ... fields from ErrorType ... -->
        </res:errors>
    </res:response>
</res:ResponseDoc>
```

| Field                | Type        | Mandatory    | Description                                            | Values                                                           |
| :------------------- | :---------- | :----------- | :----------------------------------------------------- | :--------------------------------------------------------------- |
| `index`              | `xs:int`    | No           | Sequence Number of the Entity within the submitted XML |                                                                  |
| `statusCode`         | `xs:string` | Yes          | Result Code                                            | `Success`, `ValidationError`, `TechnicalError`, `XMLSyntaxError` |
| `invoiceUid`         | `xs:string` | No           | Invoice Identifier                                     | Length = 40                                                      |
| `invoiceMark`        | `xs:long`   | No           | Unique Invoice Registration Number (MARK)              |                                                                  |
| `classificationMark` | `xs:long`   | No           | Unique Classification Receipt Number                   |                                                                  |
| `authenticationCode` | `xs:string` | No           | Authentication String                                  |                                                                  |
| `cancellationMark`   | `xs:long`   | No           | Unique Cancellation Number                             |                                                                  |
| `qrUrl`              | `xs:string` | No           | Encoded alphanumeric                                   | Used by programs to generate URL-type QR Code                    |
| `errors`             | `ErrorType` | Yes (choice) | List of Errors                                         | (List of type ErrorType)                                         |

**Remarks:**

1.  The type of response (successful or failed process) is determined by the value of the `statusCode` field.
2.  In case of success, the `statusCode` field has the value `Success`, and the response includes the corresponding values for the fields `invoiceUid`, `invoiceMark`, `classificationMark`, and `cancellationMark`, depending on the entity submitted.
3.  In case of failure, the `statusCode` field has a value corresponding to the type of error, and the response includes a list of error elements of type `ErrorType` for each entity whose submission failed. All error elements per entity must belong to the same category that characterizes the response.
4.  The `invoiceUid` field is returned only if the submission concerned an invoice.
5.  The `classificationMark` field is returned only if the submission concerned a classification.
6.  The `authenticationCode` field is returned if the submission was made via a provider.
7.  The `cancellationMark` field is returned only if the submission concerned an invoice cancellation.
8.  The `invoiceMark` field contains the mark of the submitted invoice if invoices were submitted, and the mark of the invoice to which the submitted classifications referred, in the case of classification submission.
9.  The `qrUrl` field is returned only for submissions of invoice types from 1.1 to 11.5.

## 6.2 Data Retrieval

When the user calls one of the two data retrieval methods (`RequestDocs`, `RequestTransmittedDocs`), as described in a previous paragraph, they will receive a `RequestedDoc` object in XML format. The object will include lists of invoices, income-expense classifications, and invoice cancellations which have a `mark` greater than the one entered as a parameter, as well as the `continuationToken` element, in case the data volume exceeds the permissible limit and their retrieval is done in parts (pagination).

```xml
<!-- Root: RequestedDoc -->
<req:RequestedDoc xmlns:req="https://www.aade.gr/myDATA/requestedDoc/v1.0">
    <!-- Optional -->
    <req:continuationToken> <!-- Type: continuationTokenType -->
        <req:nextPartitionKey>...</req:nextPartitionKey> <!-- xs:string -->
        <req:nextRowKey>...</req:nextRowKey> <!-- xs:string -->
    </req:continuationToken>
    <!-- Optional, [0..∞] -->
    <req:invoicesDoc>...</req:invoicesDoc> <!-- Type: AadeBookInvoiceType -->
    <!-- Optional, [0..∞] -->
    <req:cancelledInvoicesDoc> <!-- Type: CancelledInvoiceType -->
        <req:invoiceMark>...</req:invoiceMark> <!-- xs:long -->
        <req:cancellationMark>...</req:cancellationMark> <!-- xs:long -->
        <req:cancellationDate>...</req:cancellationDate> <!-- xs:date -->
    </req:cancelledInvoicesDoc>
    <!-- Optional, [0..∞] -->
    <req:incomeClassificationsDoc>...</req:incomeClassificationsDoc> <!-- Type: InvoiceIncomeClassificationType -->
    <!-- Optional, [0..∞] -->
    <req:expensesClassificationsDoc>...</req:expensesClassificationsDoc> <!-- Type: InvoiceExpensesClassificationType -->
     <!-- Optional, [0..∞] -->
    <req:paymentMethodsDoc>...</req:paymentMethodsDoc> <!-- Type: PaymentMethodType -->
</req:RequestedDoc>
```

| Field                        | Type                                | Mandatory | Description                      |
| :--------------------------- | :---------------------------------- | :-------- | :------------------------------- |
| `continuationToken`          | `continuationTokenType`             | No        | Element for paginated retrieval  |
| `invoicesDoc`                | `AadeBookInvoiceType`               | No        | List of Invoices                 |
| `cancelledInvoicesDoc`       | `CancelledInvoiceType`              | No        | List of cancellations            |
| `invoiceMark`                | `xs:long`                           | Yes       | MARK of the cancelled invoice    |
| `cancellationMark`           | `xs:long`                           | Yes       | Cancellation MARK                |
| `cancellationDate`           | `xs:date`                           | Yes       | Cancellation Date                |
| `incomeClassificationsDoc`   | `InvoiceIncomeClassificationType`   | No        | List of Income Classifications   |
| `expensesClassificationsDoc` | `InvoiceExpensesClassificationType` | No        | List of Expenses Classifications |
| `paymentMethodsDoc`          | `PaymentMethodType`                 | No        | List of Payment Methods          |
| `nextPartitionKey`           | `xs:string`                         | Yes       | Parameter for next call          |
| `nextRowKey`                 | `xs:string`                         | Yes       | Parameter for next call          |

**Remarks:**

1.  If the `continuationToken` element is returned, the `nextPartitionKey` and `nextRowKey` fields will be populated by the service and are used in the next call of the same method that was called by the user.
2.  The types `AadeBookInvoiceType`, `InvoiceIncomeClassificationType`, `InvoiceExpensesClassificationType`, and `PaymentMethodType` are described in previous paragraphs.

## 6.3 Retrieval of Income - Expenses Data

When the user calls one of the two methods for retrieving income-expenses data (`RequestMyIncome`, `RequestMyExpenses`), as described in a previous paragraph, they will receive a `RequestedBookInfo` object in XML format. The object will include a list of income-expenses elements and invoice cancellations which have a `mark` greater than the one entered as a parameter, as well as the `continuationToken` element, in case the data volume exceeds the permissible limit and their retrieval is done in parts (pagination).

```xml
<!-- Root: RequestedBookInfo -->
<reqbi:RequestedBookInfo xmlns:reqbi="https://www.aade.gr/myDATA/requestedBookInfo/v1.0">
    <!-- Optional -->
    <reqbi:continuationToken> <!-- Type: continuationTokenType -->
        <reqbi:nextPartitionKey>...</reqbi:nextPartitionKey> <!-- xs:string -->
        <reqbi:nextRowKey>...</reqbi:nextRowKey> <!-- xs:string -->
    </reqbi:continuationToken>
    <!-- [0..∞] -->
    <reqbi:bookInfo> <!-- Type: BookInfoType -->
        <reqbi:counterVatNumber>...</reqbi:counterVatNumber> <!-- xs:string -->
        <reqbi:issueDate>...</reqbi:issueDate> <!-- xs:date -->
        <reqbi:invType>...</reqbi:invType> <!-- xs:string -->
        <!-- Optional -->
        <reqbi:selfPricing>...</reqbi:selfPricing> <!-- xs:bool -->
        <!-- Optional -->
        <reqbi:invoiceDetailType>...</reqbi:invoiceDetailType> <!-- xs:int -->
        <reqbi:netValue>...</reqbi:netValue> <!-- xs:double -->
        <reqbi:vatAmount>...</reqbi:vatAmount> <!-- xs:double -->
        <reqbi:withheldAmount>...</reqbi:withheldAmount> <!-- xs:double -->
        <reqbi:otherTaxesAmount>...</reqbi:otherTaxesAmount> <!-- xs:double -->
        <reqbi:stampDutyAmount>...</reqbi:stampDutyAmount> <!-- xs:double -->
        <reqbi:feesAmount>...</reqbi:feesAmount> <!-- xs:double -->
        <reqbi:deductionsAmount>...</reqbi:deductionsAmount> <!-- xs:double -->
        <reqbi:thirdPartyAmount>...</reqbi:thirdPartyAmount> <!-- xs:double -->
        <reqbi:grossValue>...</reqbi:grossValue> <!-- xs:double -->
        <reqbi:count>...</reqbi:count> <!-- xs:int -->
        <reqbi:minMark>...</reqbi:minMark> <!-- xs:string -->
        <reqbi:maxMark>...</reqbi:maxMark> <!-- xs:string -->
    </reqbi:bookInfo>
</reqbi:RequestedBookInfo>
```

| Field               | Type                    | Mandatory | Description                     |
| :------------------ | :---------------------- | :-------- | :------------------------------ |
| `continuationToken` | `continuationTokenType` | No        | Element for paginated retrieval |
| `counterVatNumber`  | `xs:string`             | No        | Recipient VAT number            |
| `issueDate`         | `xs:date`               | Yes       | Invoice Issue Date              |
| `invType`           | `xs:string`             | Yes       | Invoice Type                    |
| `selfpricing`       | `xs:bool`               | No        | Self-billing                    |
| `invoiceDetailType` | `xs:int`                | No        | Marking                         |
| `netValue`          | `xs:double`             | No        | Net value                       |
| `vatAmount`         | `xs:double`             | No        | VAT Amount                      |
| `withheldAmount`    | `xs:double`             | No        | Withheld Tax Amount             |
| `otherTaxesAmount`  | `xs:double`             | No        | Other Taxes Amount              |
| `stampDutyAmount`   | `xs:double`             | No        | Stamp Duty Amount               |
| `feesAmount`        | `xs:double`             | No        | Fees Amount                     |
| `deductionsAmount`  | `xs:double`             | No        | Deductions Amount               |
| `thirdPartyAmount`  | `xs:double`             | No        | Third Party Amount              |
| `grossValue`        | `xs:double`             | No        | Total Value                     |
| `count`             | `xs:int`                | Yes       | Count                           |
| `minMark`           | `xs:string`             | No        | Minimum MARK of the count       |
| `maxMark`           | `xs:string`             | No        | Maximum MARK of the count       |

**Remarks:**

1.  If the `continuationToken` element is returned, the `nextPartitionKey` and `nextRowKey` fields will be populated by the service and are used in the next call of the same method that was called by the user.
2.  Each line corresponds to a unique set of values for the fields `counterVatNumber`, `issueDate`, `invType`, and the reference VAT number.
3.  The `minMark` and `maxMark` parameters correspond to the minimum and maximum mark comprising the set of invoices for the specific line.
4.  Invoices with self-billing are retrieved on a separate line, with the corresponding value in the specific field.
5.  The lines of invoices 1.5 (Settlement - Third Party Fee) are retrieved on separate lines, with the corresponding value in the specific field.

## 6.4 Retrieval of Information for VAT Data

When the user calls the method for retrieving information on VAT data (`RequestVatInfo`), as described in a previous paragraph, they will receive a `RequestedVatInfo` object in XML format. The object will include a list of inflow and outflow elements per invoice (`VatInfo`) for the VAT number entered as a parameter, as well as the `continuationToken` element, in case the data volume exceeds the permissible limit and their retrieval is done in parts (pagination).

```xml
<!-- Root: RequestedVatInfo -->
<reqvi:RequestedVatInfo xmlns:reqvi="https://www.aade.gr/myDATA/requestedVatInfo/v1.0">
    <!-- Optional -->
    <reqvi:continuationToken> <!-- Type: continuationTokenType -->
        <reqvi:nextPartitionKey>...</reqvi:nextPartitionKey> <!-- xs:string -->
        <reqvi:nextRowKey>...</reqvi:nextRowKey> <!-- xs:string -->
    </reqvi:continuationToken>
    <!-- [0..∞] -->
    <reqvi:vatInfo> <!-- Type: InvoiceVatDetailType -->
        <reqvi:Mark>...</reqvi:Mark> <!-- xs:string -->
        <reqvi:IsCancelled>...</reqvi:IsCancelled> <!-- xs:boolean -->
        <reqvi:IssueDate>...</reqvi:IssueDate> <!-- xs:dateTime -->
        <reqvi:Vat301>...</reqvi:Vat301> <!-- xs:decimal -->
        <reqvi:Vat302>...</reqvi:Vat302> <!-- xs:decimal -->
        <reqvi:Vat303>...</reqvi:Vat303> <!-- xs:decimal -->
        <reqvi:Vat304>...</reqvi:Vat304> <!-- xs:decimal -->
        <reqvi:Vat305>...</reqvi:Vat305> <!-- xs:decimal -->
        <reqvi:Vat306>...</reqvi:Vat306> <!-- xs:decimal -->
        <reqvi:Vat331>...</reqvi:Vat331> <!-- xs:decimal -->
        <reqvi:Vat332>...</reqvi:Vat332> <!-- xs:decimal -->
        <reqvi:Vat333>...</reqvi:Vat333> <!-- xs:decimal -->
        <reqvi:Vat334>...</reqvi:Vat334> <!-- xs:decimal -->
        <reqvi:Vat335>...</reqvi:Vat335> <!-- xs:decimal -->
        <reqvi:Vat336>...</reqvi:Vat336> <!-- xs:decimal -->
        <reqvi:Vat361>...</reqvi:Vat361> <!-- xs:decimal -->
        <reqvi:Vat362>...</reqvi:Vat362> <!-- xs:decimal -->
        <reqvi:Vat363>...</reqvi:Vat363> <!-- xs:decimal -->
        <reqvi:Vat364>...</reqvi:Vat364> <!-- xs:decimal -->
        <reqvi:Vat365>...</reqvi:Vat365> <!-- xs:decimal -->
        <reqvi:Vat366>...</reqvi:Vat366> <!-- xs:decimal -->
        <reqvi:Vat381>...</reqvi:Vat381> <!-- xs:decimal -->
        <reqvi:Vat382>...</reqvi:Vat382> <!-- xs:decimal -->
        <reqvi:Vat383>...</reqvi:Vat383> <!-- xs:decimal -->
        <reqvi:Vat384>...</reqvi:Vat384> <!-- xs:decimal -->
        <reqvi:Vat385>...</reqvi:Vat385> <!-- xs:decimal -->
        <reqvi:Vat386>...</reqvi:Vat386> <!-- xs:decimal -->
        <reqvi:Vat342>...</reqvi:Vat342> <!-- xs:decimal -->
        <reqvi:Vat345>...</reqvi:Vat345> <!-- xs:decimal -->
        <reqvi:Vat348>...</reqvi:Vat348> <!-- xs:decimal -->
        <reqvi:Vat349>...</reqvi:Vat349> <!-- xs:decimal -->
        <reqvi:Vat310>...</reqvi:Vat310> <!-- xs:decimal -->
        <reqvi:Vat402>...</reqvi:Vat402> <!-- xs:decimal -->
        <reqvi:Vat407>...</reqvi:Vat407> <!-- xs:decimal -->
        <reqvi:Vat411>...</reqvi:Vat411> <!-- xs:decimal -->
        <reqvi:Vat423>...</reqvi:Vat423> <!-- xs:decimal -->
        <reqvi:Vat422>...</reqvi:Vat422> <!-- xs:decimal -->
        <reqvi:VatUnclassified361>...</reqvi:VatUnclassified361> <!-- xs:decimal -->
        <reqvi:VatUnclassified381>...</reqvi:VatUnclassified381> <!-- xs:decimal -->
    </reqvi:vatInfo>
</reqvi:RequestedVatInfo>
```

_(Note: The XML structure above includes placeholders for all VatXXX fields from Vat301 to Vat422 and the Unclassified fields, as present in the Greek original.)_

| Field                | Type                    | Mandatory | Description                                |
| :------------------- | :---------------------- | :-------- | :----------------------------------------- |
| `continuationToken`  | `continuationTokenType` | No        | Element for paginated retrieval of results |
| `Mark`               | `xs:string`             | No        | The MARK of the invoice                    |
| `IsCancelled`        | `xs:boolean`            | No        | If the invoice is cancelled                |
| `IssueDate`          | `xs:dateTime`           | Yes       | Invoice issue date                         |
| `Vat301`             | `xs:decimal`            | No        | VAT amount for field 301                   |
| `Vat302`             | `xs:decimal`            | No        | VAT amount for field 302                   |
| `Vat303`             | `xs:decimal`            | No        | VAT amount for field 303                   |
| `Vat304`             | `xs:decimal`            | No        | VAT amount for field 304                   |
| `Vat305`             | `xs:decimal`            | No        | VAT amount for field 305                   |
| `Vat306`             | `xs:decimal`            | No        | VAT amount for field 306                   |
| `Vat331`             | `xs:decimal`            | No        | VAT amount for field 331                   |
| `Vat332`             | `xs:decimal`            | No        | VAT amount for field 332                   |
| `Vat333`             | `xs:decimal`            | No        | VAT amount for field 333                   |
| `Vat334`             | `xs:decimal`            | No        | VAT amount for field 334                   |
| `Vat335`             | `xs:decimal`            | No        | VAT amount for field 335                   |
| `Vat336`             | `xs:decimal`            | No        | VAT amount for field 336                   |
| `Vat361`             | `xs:decimal`            | No        | VAT amount for field 361                   |
| `Vat362`             | `xs:decimal`            | No        | VAT amount for field 362                   |
| `Vat363`             | `xs:decimal`            | No        | VAT amount for field 363                   |
| `Vat364`             | `xs:decimal`            | No        | VAT amount for field 364                   |
| `Vat365`             | `xs:decimal`            | No        | VAT amount for field 365                   |
| `Vat366`             | `xs:decimal`            | No        | VAT amount for field 366                   |
| `Vat381`             | `xs:decimal`            | No        | VAT amount for field 381                   |
| `Vat382`             | `xs:decimal`            | No        | VAT amount for field 382                   |
| `Vat383`             | `xs:decimal`            | No        | VAT amount for field 383                   |
| `Vat384`             | `xs:decimal`            | No        | VAT amount for field 384                   |
| `Vat385`             | `xs:decimal`            | No        | VAT amount for field 385                   |
| `Vat386`             | `xs:decimal`            | No        | VAT amount for field 386                   |
| `Vat342`             | `xs:decimal`            | No        | VAT amount for field 342                   |
| `Vat345`             | `xs:decimal`            | No        | VAT amount for field 345                   |
| `Vat348`             | `xs:decimal`            | No        | VAT amount for field 348                   |
| `Vat349`             | `xs:decimal`            | No        | VAT amount for field 349                   |
| `Vat310`             | `xs:decimal`            | No        | VAT amount for field 310                   |
| `Vat402`             | `xs:decimal`            | No        | VAT amount for field 402                   |
| `Vat407`             | `xs:decimal`            | No        | VAT amount for field 407                   |
| `Vat411`             | `xs:decimal`            | No        | VAT amount for field 411                   |
| `Vat423`             | `xs:decimal`            | No        | VAT amount for field 423                   |
| `Vat422`             | `xs:decimal`            | No        | VAT amount for field 422                   |
| `VatUnclassified361` | `xs:decimal`            | No        | Unclassified VAT amount for field 361      |
| `VatUnclassified381` | `xs:decimal`            | No        | Unclassified VAT amount for field 381      |

**Remarks:**

1.  Each `VatXXX` field contains the VAT amount corresponding to the respective field in the VAT inflows-outflows table.
2.  The `Mark` field is returned only when the results are per invoice and not per day.

# 7 Errors

Errors are elements of `ErrorType` and are described below:

```xml
<res:ErrorType>
    <res:message>...</res:message> <!-- xs:string -->
    <res:code>...</res:code> <!-- xs:string -->
</res:ErrorType>
```

Each error element concerning an entity consists of a message describing the error and an error code.

| Field     | Type        | Mandatory | Description   |
| :-------- | :---------- | :-------- | :------------ |
| `message` | `xs:string` | Yes       | Error Message |
| `code`    | `xs:string` | Yes       | Error Code    |

## 7.1 Technical Errors

Technical errors characterize the call as unsuccessful and return a standard `.NET HttpResponseMessage` instead of the `ErrorType` described in paragraph 7. Therefore, they do not have a specific error code, are not accompanied by a `statusCode` from the `ResponseType` element, and are identified by the corresponding `HttpStatusCode`.

| #   | HTTP Response         | Description (GR)                                                                | Description (ENG)                                  |
| :-- | :-------------------- | :------------------------------------------------------------------------------ | :------------------------------------------------- |
| 1   | HTTP 401 UNAUTHORIZED | Λείπει η κεφαλίδα `Aade-user-id`                                                | `Aade-user-id` header is missing                   |
| 2   | HTTP 401 UNAUTHORIZED | Το κλειδί πρόσβασης δεν αντιστοιχεί στο δεδομένο αναγνωριστικό χρήστη (User Id) | Access Key does not correspond to given User Id    |
| 3   | HTTP 400 BAD_REQUEST  | Περάστε το MARK στις παραμέτρους ή στο σώμα του http αιτήματος                  | Please pass mark in the request parameters or body |
| 4   | HTTP 400 BAD_REQUEST  | Γενικό Σφάλμα Εξαίρεσης                                                         | General Exception Error                            |

## 7.2 Business Errors

Business errors are of type `ErrorType` (see Par. 7) and occur when business rule checks fail. In these cases, the call is considered technically successful (HTTP Response 200).

_(The original document contains a long table listing specific business error codes (101-408), descriptions in Greek and English, the relevant element (Application, Invoice, Classification, Payment), and the associated `statusCode`. This table spans pages 64-78 in the PDF. Below are example rows; refer to the original PDF for the complete list.)_

_Example Rows from the Business Errors Table:_

| HTTP Response | statusCode      | Code | Element        | Description (GR)                                                                 | Description (ENG)                                                                  |
| :------------ | :-------------- | :--- | :------------- | :------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| HTTP 200 OK   | XMLSyntaxError  | 101  | Application    | Σφάλμα επικύρωσης σύνταξης XML                                                   | XML Syntax Validation Error                                                        |
| HTTP 200 OK   | ValidationError | 102  | Application    | Ο ΑΦΜ {ΑΦΜ} δεν ανήκει σε ενεργή εταιρεία                                        | Vat number {vatNumber} does not belong to active corporation                       |
| HTTP 200 OK   | ValidationError | 201  | Invoice        | Ο ΑΦΜ χρήστη {ΑΦΜ} δεν είναι εξουσιοδοτημένος να εκτελέσει αυτήν τη μέθοδο       | User VAT number {vatNumber} is not authorized to execute this method               |
| HTTP 200 OK   | ValidationError | 203  | Invoice        | Η Ακαθάριστη Αξία δεν ταιριάζει με το άθροισμα της καθαρής αξίας συν τους φόρους | Gross Value doesn't match with sum of net value plus taxes                         |
| ...           | ...             | ...  | ...            | ...                                                                              | ...                                                                                |
| HTTP 200 OK   | ValidationError | 301  | Classification | Τα τιμολόγια με MARK {mark} δεν βρέθηκαν                                         | Invoices with ΜΑΡΚ {mark} requested not found                                      |
| HTTP 200 OK   | ValidationError | 306  | Classification | Το άθροισμα των ταξινομήσεων δεν είναι ίσο με την καθαρή αξία της γραμμής        | Sum of classifications are not equal to line's net value                           |
| ...           | ...             | ...  | ...            | ...                                                                              | ...                                                                                |
| HTTP 200 OK   | ValidationError | 402  | Payment        | Τουλάχιστον ένα στοιχείο τρόπου πληρωμής πρέπει να είναι τύπου POS               | At least one payment method detail must be of POS type                             |
| HTTP 200 OK   | ValidationError | 408  | Payment        | Τιμολόγιο με MARK {mark_τιμολογίου}: Δεν είναι δυνατή η εκ νέου αποστολή...      | Invoice with ΜΑΡΚ {invoice_mark}: Payment Methods cannot be resent for invoices... |
| HTTP 200 OK   | TechnicalError  | -    | -              | Μη αναμενόμενο σφάλμα συνθήκης                                                   | Unexpected condition error                                                         |

_(Please refer to pages 64 through 78 of the original PDF for the complete list of business errors.)_

# 8 Appendix

## 8.1 Invoice Types

| Counterpart Invoices Issuer Domestic / Foreign            | Code  | Description                                                                  |
| :-------------------------------------------------------- | :---- | :--------------------------------------------------------------------------- |
| **Sales Invoice**                                         |       |                                                                              |
|                                                           | 1.1   | Sales Invoice                                                                |
|                                                           | 1.2   | Sales Invoice / Intra-Community Supplies                                     |
|                                                           | 1.3   | Sales Invoice / Third Country Supplies                                       |
|                                                           | 1.4   | Sales Invoice / Sale on Behalf of Third Parties                              |
|                                                           | 1.5   | Sales Invoice / Third Party Sales Settlement - Fee from Third Party Sales    |
|                                                           | 1.6   | Sales Invoice / Supplementary Document                                       |
| **Services Rendered Invoice**                             |       |                                                                              |
|                                                           | 2.1   | Services Rendered Invoice                                                    |
|                                                           | 2.2   | Services Rendered Invoice / Intra-Community Provision of Services            |
|                                                           | 2.3   | Services Rendered Invoice / Provision of Services to Third Country Recipient |
|                                                           | 2.4   | Services Rendered Invoice / Supplementary Document                           |
| **Acquisition Title**                                     |       |                                                                              |
|                                                           | 3.1   | Acquisition Title (non-liable Issuer)                                        |
|                                                           | 3.2   | Acquisition Title (refusal of issuance by liable Issuer)                     |
| **Credit Invoice**                                        |       |                                                                              |
|                                                           | 5.1   | Credit Invoice / Correlated                                                  |
|                                                           | 5.2   | Credit Invoice / Non-Correlated                                              |
| **Self-Delivery - Own Use Document**                      |       |                                                                              |
|                                                           | 6.1   | Self-Delivery Document                                                       |
|                                                           | 6.2   | Own Use Document                                                             |
| **Contract - Revenue**                                    |       |                                                                              |
|                                                           | 7.1   | Contract - Revenue                                                           |
| **Special Document (Revenue) – Receipt**                  |       |                                                                              |
|                                                           | 8.1   | Rents - Revenue                                                              |
|                                                           | 8.2   | Climate crisis resilience fee                                                |
|                                                           | 8.4   | POS Receipt                                                                  |
|                                                           | 8.5   | POS Return Receipt                                                           |
| **Order Slip**                                            |       |                                                                              |
|                                                           | 8.6   | Restaurant Order Slip                                                        |
| **Delivery Documents**                                    |       |                                                                              |
|                                                           | 9.3   | Delivery Note                                                                |
| **Retail Documents**                                      |       |                                                                              |
|                                                           | 11.1  | RSR (Retail Sales Receipt)                                                   |
|                                                           | 11.2  | RSR (Retail Service Receipt)                                                 |
|                                                           | 11.3  | Simplified Invoice                                                           |
|                                                           | 11.4  | Retail Credit Note                                                           |
|                                                           | 11.5  | Retail Sales Receipt on Behalf of Third Parties                              |
| **For Future Use**                                        | 12    |                                                                              |
| **Non-Counterpart Invoices Recipient Domestic / Foreign** |       |                                                                              |
| **Receipt of Retail Documents**                           |       |                                                                              |
|                                                           | 13.1  | Expenses - Purchases of Retail Transactions domestic / foreign               |
|                                                           | 13.2  | Provision of Retail Transactions domestic / foreign                          |
|                                                           | 13.3  | Shared Expenses (Utilities etc.)                                             |
|                                                           | 13.4  | Subscriptions                                                                |
|                                                           | 13.30 | Entity Documents as Recorded by the Entity itself (Dynamic)                  |
|                                                           | 13.31 | Retail Credit Note domestic / foreign                                        |
| **Docs from Exempt Entities Domestic / Foreign**          |       |                                                                              |
|                                                           | 14.1  | Invoice / Intra-Community Acquisitions                                       |
|                                                           | 14.2  | Invoice / Third Country Acquisitions                                         |
|                                                           | 14.3  | Invoice / Intra-Community Receipt of Services                                |
|                                                           | 14.4  | Invoice / Receipt of Services from Third Countries                           |
|                                                           | 14.5  | EFKA and other Insurance Organizations                                       |
|                                                           | 14.30 | Entity Documents as Recorded by the Entity itself (Dynamic)                  |
|                                                           | 14.31 | Credit Note domestic / foreign                                               |
| **Contract - Expense**                                    |       |                                                                              |
|                                                           | 15.1  | Contract - Expense                                                           |
| **Special Document (Expense) – Payment Receipt**          |       |                                                                              |
|                                                           | 16.1  | Rent Expense                                                                 |
| **Revenue-Expense Adjustment Entries**                    |       |                                                                              |
| **Entity Entries**                                        |       |                                                                              |
|                                                           | 17.1  | Payroll                                                                      |
|                                                           | 17.2  | Depreciation                                                                 |
|                                                           | 17.3  | Other Revenue Adjustment Entries - Accounting Basis                          |
|                                                           | 17.4  | Other Revenue Adjustment Entries - Tax Basis                                 |
|                                                           | 17.5  | Other Expense Adjustment Entries - Accounting Basis                          |
|                                                           | 17.6  | Other Expense Adjustment Entries - Tax Basis                                 |

## 8.2 VAT Category

| Code | VAT % Cases                                       | % VAT |
| :--- | :------------------------------------------------ | :---- |
| 1    | VAT rate 24%                                      | 24%   |
| 2    | VAT rate 13%                                      | 13%   |
| 3    | VAT rate 6%                                       | 6%    |
| 4    | VAT rate 17%                                      | 17%   |
| 5    | VAT rate 9%                                       | 9%    |
| 6    | VAT rate 4%                                       | 4%    |
| 7    | Without VAT                                       | 0%    |
| 8    | Entries without VAT (e.g., Payroll, Depreciation) | -     |
| 9    | VAT rate 3% (Art. 31 Law 5057/2023)               | 3%    |
| 10   | VAT rate 4% (Art. 31 Law 5057/2023)               | 4%    |

## 8.3 VAT Exemption Reason Category

| Code | Description                                      | Code | Description                                       |
| :--- | :----------------------------------------------- | :--- | :------------------------------------------------ |
| 1    | Without VAT – Article 2 and 3 of the VAT Code    | 13   | Without VAT - Article 27.1.c - Open Sea Vessels   |
| 2    | Without VAT - Article 5 of the VAT Code          | 14   | Without VAT - Article 28 of the VAT Code          |
| 3    | Without VAT - Article 13 of the VAT Code         | 15   | Without VAT - Article 39 of the VAT Code          |
| 4    | Without VAT - Article 14 of the VAT Code         | 16   | Without VAT - Article 39a of the VAT Code         |
| 5    | Without VAT - Article 16 of the VAT Code         | 17   | Without VAT - Article 40 of the VAT Code          |
| 6    | Without VAT - Article 19 of the VAT Code         | 18   | Without VAT - Article 41 of the VAT Code          |
| 7    | Without VAT - Article 22 of the VAT Code         | 19   | Without VAT - Article 47 of the VAT Code          |
| 8    | Without VAT - Article 24 of the VAT Code         | 20   | VAT included - Article 43 of the VAT Code         |
| 9    | Without VAT - Article 25 of the VAT Code         | 21   | VAT included - Article 44 of the VAT Code         |
| 10   | Without VAT - Article 26 of the VAT Code         | 22   | VAT included - Article 45 of the VAT Code         |
| 11   | Without VAT - Article 27 of the VAT Code         | 23   | VAT included - Article 46 of the VAT Code         |
| 12   | Without VAT - Article 27 - Open Sea Vessels      | 24   | Without VAT - Article 6 of the VAT Code           |
| 25   | Without VAT - POL.1029/1995                      | 26   | Without VAT - POL.1167/2015                       |
| 27   | Other VAT Exemptions                             | 28   | Without VAT – Article 24 par.1 case b' (Tax Free) |
| 29   | Without VAT – Article 47b (OSS non-Union scheme) | 30   | Without VAT – Article 47c (OSS Union scheme)      |
| 31   | Without VAT – Article 47d (IOSS)                 |      |                                                   |

## 8.4 Withheld Taxes Category

| Code | % Withholding Cases - Advance Tax Payment                                                                   | % Withh. Tax |
| :--- | :---------------------------------------------------------------------------------------------------------- | :----------- |
| 1    | Case b’ - Interest - 15%                                                                                    | 15%          |
| 2    | Case c’ - Royalties - 20%                                                                                   | 20%          |
| 3    | Case d’ - Management Consulting Fees - 20%                                                                  | 20%          |
| 4    | Case d’ - Technical Works - 3%                                                                              | 3%           |
| 5    | Liquid fuels and tobacco products 1%                                                                        | 1%           |
| 6    | Other Goods 4%                                                                                              | 4%           |
| 7    | Provision of Services 8%                                                                                    | 8%           |
| 8    | Advance Tax for Architects and Engineers on Contractual Fees, for Study and Design Elaboration 4%           | 4%           |
| 9    | Advance Tax for Architects and Engineers on Contractual Fees, related to any other type of work 10%         | 10%          |
| 10   | Advance Tax on Lawyers' Fees 15%                                                                            | 15%          |
| 11   | Withholding Tax on Employment Services par. 1 art. 15 Law 4172/2013                                         | amount       |
| 12   | Withholding Tax on Employment Services par. 2 art. 15 Law 4172/2013 - Merchant Marine Officers              | 15%          |
| 13   | Withholding Tax on Employment Services par. 2 art. 15 Law 4172/2013 - Merchant Marine Lower Crew            | 10%          |
| 14   | Withholding of Special Solidarity Contribution                                                              | amount       |
| 15   | Withholding Tax on Severance Pay due to Termination of Employment Relationship par. 3 art. 15 Law 4172/2013 | amount       |
| 16   | Withholdings on foreign transactions based on double taxation avoidance treaties (D.T.A.T.)                 | amount       |
| 17   | Other Tax Withholdings                                                                                      | amount       |
| 18   | Withholding Tax on Dividends case a par. 1 art. 64 Law 4172/2013                                            | 5%           |

## 8.5 Other Taxes Category

| Code | % Other Taxes Cases                                                                                              | % Other taxes | Remarks                                                                |
| :--- | :--------------------------------------------------------------------------------------------------------------- | :------------ | :--------------------------------------------------------------------- |
| 1    | a1) fire insurance premiums 20%                                                                                  | 15%           | Sending with this value will not be possible from the current version. |
| 2    | a2) fire insurance premiums 20%                                                                                  | 5%            | Sending with this value will not be possible from the current version. |
| 3    | b) life insurance premiums 4%                                                                                    | 4%            |                                                                        |
| 4    | c) other branch insurance premiums 15%.                                                                          | 15%           |                                                                        |
| 5    | d) exempt from insurance premium tax 0%.                                                                         | 0%            |                                                                        |
| 6    | 1-2 star Hotels €0.50                                                                                            | amount        |                                                                        |
| 7    | 3 star Hotels €1.50                                                                                              | amount        |                                                                        |
| 8    | 4 star Hotels €3.00                                                                                              | amount        |                                                                        |
| 9    | 5 star Hotels €4.00                                                                                              | amount        |                                                                        |
| 10   | Rented - furnished rooms - apartments €0.50                                                                      | amount        |                                                                        |
| 11   | Special Tax on television advertisements (EFTD) 5%                                                               | 5%            |                                                                        |
| 12   | 3.1 Luxury tax 10% on the taxable value for intra-community acquired and imported goods from third countries 10% | 10%           |                                                                        |
| 13   | 3.2 Luxury tax 10% on the selling price before VAT for domestically produced items 10%                           | 10%           |                                                                        |
| 14   | State's right on casino tickets (80% of the ticket price)                                                        | 80%           |                                                                        |
| 15   | fire insurance premiums 20%                                                                                      | 20%           |                                                                        |
| 16   | Other Customs Duties-Taxes                                                                                       | amount        |                                                                        |
| 17   | Other Taxes                                                                                                      | amount        |                                                                        |
| 18   | Other Taxes Charges                                                                                              | amount        |                                                                        |
| 19   | Special Consumption Tax (EFK)                                                                                    | amount        |                                                                        |
| 20   | 1-2 star Hotels €1.50 (per Room/Apt.)                                                                            | amount        |                                                                        |
| 21   | 3 star Hotels €3.00 (per Room/Apt.)                                                                              | amount        |                                                                        |
| 22   | 4 star Hotels €7.00 (per Room/Apt.)                                                                              | amount        |                                                                        |
| 23   | 5 star Hotels €10.00 (per Room/Apt.)                                                                             | amount        |                                                                        |
| 24   | Rented furnished rooms – apartments €1.50 (per Room/Apt.)                                                        | amount        |                                                                        |
| 25   | Short-term lease properties €1.50                                                                                | amount        |                                                                        |
| 26   | Short-term lease properties detached houses over 80 sq.m. €10.00                                                 | amount        |                                                                        |
| 27   | Self-catering accommodations – tourist furnished villas €10.00                                                   | amount        |                                                                        |
| 28   | Short-term lease properties €0.50                                                                                | amount        |                                                                        |
| 29   | Short-term lease properties detached houses over 80 sq.m. €4.00                                                  | amount        |                                                                        |
| 30   | Self-catering accommodations – tourist furnished villas €4.00                                                    | amount        |                                                                        |

## 8.6 Stamp Duty Rate Category

| Code | % Stamp Duty Cases     | % Stamp Duty |
| :--- | :--------------------- | :----------- |
| 1    | Rate 1.2 %             | 1.20%        |
| 2    | Rate 2.4 %             | 2.40%        |
| 3    | Rate 3.6 %             | 3.60%        |
| 4    | Other Stamp Duty cases | amount       |

## 8.7 Fees Category

| Code | % Fees Cases                                                                                         | % Fees |
| :--- | :--------------------------------------------------------------------------------------------------- | :----- |
| 1    | For monthly bill up to €50: 12%                                                                      | 12.00% |
| 2    | For monthly bill from €50.01 up to €100: 15%                                                         | 15.00% |
| 3    | For monthly bill from €100.01 up to €150: 18%                                                        | 18.00% |
| 4    | For monthly bill from €150.01 and above: 20%                                                         | 20.00% |
| 5    | Prepaid mobile telephony fee on the value of airtime (12%)                                           | 12.00% |
| 6    | Pay-TV subscription fee 10%                                                                          | 10.00% |
| 7    | Fixed telephony subscriber fee 5%                                                                    | 5.00%  |
| 8    | Environmental Fee & plastic bag Law 2339/2001 art. 6a €0.07 per piece                                | amount |
| 9    | Olive fruit fly control contribution 2%                                                              | 2.00%  |
| 10   | Other fees                                                                                           | amount |
| 11   | Other Taxes Fees                                                                                     | Amount |
| 12   | Olive fruit fly control contribution                                                                 | Amount |
| 13   | For monthly bill per connection (10%)                                                                | 10%    |
| 14   | Prepaid mobile telephony fee on the value of airtime (10%)                                           | 10%    |
| 15   | Mobile and prepaid mobile telephony fee for individuals aged 15 to 29 (0%)                           | 0%     |
| 16   | Environmental protection contribution for plastic products €0.04 per piece [Article 4 Law 4736/2020] | amount |
| 17   | Recycling fee €0.08 per piece [Article 80 Law 4819/2021]                                             | Amount |
| 18   | Temporary resident stay fee                                                                          | Amount |
| 19   | Fee on gross revenues of restaurants and related establishments                                      | Amount |
| 20   | Fee on gross revenues of entertainment centers                                                       | Amount |
| 21   | Fee on gross revenues of casinos                                                                     | Amount |
| 22   | Other fees on gross revenues                                                                         | Amount |

## 8.8 Income Classification Category Code

| Code         | Description                                  |
| :----------- | :------------------------------------------- |
| category1_1  | Revenue from Sale of Goods (+) / (-)         |
| category1_2  | Revenue from Sale of Products (+) / (-)      |
| category1_3  | Revenue from Provision of Services (+) / (-) |
| category1_4  | Revenue from Sale of Fixed Assets (+) / (-)  |
| category1_5  | Other Revenue/ Gains (+) / (-)               |
| category1_6  | Self-Deliveries / Own Use (+) / (-)          |
| category1_7  | Revenue on behalf of third parties (+) / (-) |
| category1_8  | Revenue from previous years (+)/ (-)         |
| category1_9  | Revenue for subsequent years (+) / (-)       |
| category1_10 | Other Revenue Adjustment Entries (+) / (-)   |
| category1_95 | Other Informational Revenue Data (+) / (-)   |
| category3    | Delivery/Movement                            |

## 8.9 Income Classification Type Code

| Code       | Description                                                                                                   |
| :--------- | :------------------------------------------------------------------------------------------------------------ |
| E3_106     | Own production of fixed assets - Self-deliveries - Destruction of inventory/Goods                             |
| E3_205     | Own production of fixed assets - Self-deliveries - Destruction of inventory/Raw materials and other materials |
| E3_210     | Own production of fixed assets - Self-deliveries - Destruction of inventory/Products and work in progress     |
| E3_305     | Own production of fixed assets - Self-deliveries - Destruction of inventory/Raw materials and other materials |
| E3_310     | Own production of fixed assets - Self-deliveries - Destruction of inventory/Products and work in progress     |
| E3_318     | Own production of fixed assets - Self-deliveries - Destruction of inventory/Production expenses               |
| E3_561_001 | Sales of goods and services Wholesale - Professionals                                                         |
| E3_561_002 | Sales of goods and services Wholesale based on Article 39a par. 5 of the VAT Code (Law 2859/2000)             |
| E3_561_003 | Sales of goods and services Retail - Private Customers                                                        |
| E3_561_004 | Sales of goods and services Retail based on Article 39a par. 5 of the VAT Code (Law 2859/2000)                |
| E3_561_005 | Sales of goods and services Abroad Intra-Community                                                            |
| E3_561_006 | Sales of goods and services Abroad Third Countries                                                            |
| E3_561_007 | Sales of goods and services Other                                                                             |
| E3_562     | Other ordinary revenue                                                                                        |
| E3_563     | Credit interest and similar income                                                                            |
| E3_564     | Credit exchange differences                                                                                   |
| E3_565     | Income from participations                                                                                    |
| E3_566     | Gains from disposal of non-current assets                                                                     |
| E3_567     | Gains from reversal of provisions and impairments                                                             |
| E3_568     | Gains from measurement at fair value                                                                          |
| E3_570     | Extraordinary income and gains                                                                                |
| E3_595     | Expenses in own production                                                                                    |
| E3_596     | Subsidies - Grants                                                                                            |
| E3_597     | Subsidies - Grants for investment purposes - coverage of expenses                                             |
| E3_880_001 | Sales of Fixed Assets Wholesale                                                                               |
| E3_880_002 | Sales of Fixed Assets Retail                                                                                  |
| E3_880_003 | Sales of Fixed Assets Abroad Intra-Community                                                                  |
| E3_880_004 | Sales of Fixed Assets Abroad Third Countries                                                                  |
| E3_881_001 | Sales on behalf of Third Parties Wholesale                                                                    |
| E3_881_002 | Sales on behalf of Third Parties Retail                                                                       |
| E3_881_003 | Sales on behalf of Third Parties Abroad Intra-Community                                                       |
| E3_881_004 | Sales on behalf of Third Parties Abroad Third Countries                                                       |
| E3_598_001 | Sales of goods subject to Special Consumption Tax (EFK)                                                       |
| E3_598_003 | Sales on behalf of farmers through agricultural cooperative etc.                                              |

## 8.10 Expenses Classification Category Code

| Code         | Description                                            |
| :----------- | :----------------------------------------------------- |
| category2_1  | Purchases of Goods (-) / (+)                           |
| category2_2  | Purchases of Raw Materials (-) / (+)                   |
| category2_3  | Receipt of Services (-) / (+)                          |
| category2_4  | General Expenses with right to deduct VAT (-) / (+)    |
| category2_5  | General Expenses without right to deduct VAT (-) / (+) |
| category2_6  | Employee Compensation and Benefits (-) / (+)           |
| category2_7  | Purchases of Fixed Assets (-) / (+)                    |
| category2_8  | Depreciation of Fixed Assets (-) / (+)                 |
| category2_9  | Expenses on behalf of third parties (-) / (+)          |
| category2_10 | Expenses from previous years (-) / (+)                 |
| category2_11 | Expenses for subsequent years (-) / (+)                |
| category2_12 | Other Expense Adjustment Entries (-) / (+)             |
| category2_13 | Beginning Inventory (-) / (+)                          |
| category2_14 | Ending Inventory (-) / (+)                             |
| category2_95 | Other Informational Expense Data (-) / (+)             |

## 8.11 Expenses Classification Type Code

| Code        | Description                                                                                                    |
| :---------- | :------------------------------------------------------------------------------------------------------------- |
| E3_101      | Beginning inventory of goods                                                                                   |
| E3_102_001  | Purchases of goods during the year (net amount)/Wholesale                                                      |
| E3_102_002  | Purchases of goods during the year (net amount)/Retail                                                         |
| E3_102_003  | Purchases of goods during the year (net amount)/Goods under Article 39a par. 5 of the VAT Code (Law 2859/2000) |
| E3_102_004  | Purchases of goods during the year (net amount)/Abroad Intra-Community                                         |
| E3_102_005  | Purchases of goods during the year (net amount)/Abroad Third Countries                                         |
| E3_102_006  | Purchases of goods during the year (net amount) Other                                                          |
| E3_104      | Ending inventory of goods                                                                                      |
| E3_201      | Beginning inventory of raw materials and materials/Production                                                  |
| E3_202_001  | Purchases of raw materials and materials during the year (net amount)/Wholesale                                |
| E3_202_002  | Purchases of raw materials and materials during the year (net amount)/Retail                                   |
| E3_202_003  | Purchases of raw materials and materials during the year (net amount)/Abroad Intra-Community                   |
| E3_202_004  | Purchases of raw materials and materials during the year (net amount)/Abroad Third Countries                   |
| E3_202_005  | Purchases of raw materials and materials during the year (net amount)/Other                                    |
| E3_204      | Ending inventory of raw materials and materials/Production                                                     |
| E3_207      | Beginning inventory of products and work in progress/Production                                                |
| E3_209      | Ending inventory of products and work in progress/Production                                                   |
| E3_301      | Beginning inventory of raw materials and materials/Agriculture                                                 |
| E3_302_001  | Purchases of raw materials and materials during the year (net amount)/Wholesale                                |
| E3_302_002  | Purchases of raw materials and materials during the year (net amount)/Retail                                   |
| E3_302_003  | Purchases of raw materials and materials during the year (net amount)/Abroad Intra-Community                   |
| E3_302_004  | Purchases of raw materials and materials during the year (net amount)/Abroad Third Countries                   |
| E3_302_005  | Purchases of raw materials and materials during the year (net amount)/Other                                    |
| E3_304      | Ending inventory of raw materials and materials/Agriculture                                                    |
| E3_307      | Beginning inventory of products and work in progress/Agriculture                                               |
| E3_309      | Ending inventory of products and work in progress/Agriculture                                                  |
| E3_312      | Beginning inventory (animals - plants)                                                                         |
| E3_313_001  | Purchases of animals - plants (net amount)/Wholesale                                                           |
| E3_313_002  | Purchases of animals - plants (net amount)/Retail                                                              |
| E3_313_003  | Purchases of animals - plants (net amount)/Abroad Intra-Community                                              |
| E3_313_004  | Purchases of animals - plants (net amount)/Abroad Third Countries                                              |
| E3_313_005  | Purchases of animals - plants (net amount)/Other                                                               |
| E3_315      | Ending inventory (animals - plants)/Agriculture                                                                |
| E3_581_001  | Employee benefits/Gross salaries                                                                               |
| E3_581_002  | Employee benefits/Employer contributions                                                                       |
| E3_581_003  | Employee benefits/Other benefits                                                                               |
| E3_582      | Losses from measurement of assets                                                                              |
| E3_583      | Debit exchange differences                                                                                     |
| E3_584      | Losses from disposal-withdrawal of non-current assets                                                          |
| E3_585_001  | Management fees domestic - foreign                                                                             |
| E3_585_002  | Expenses from related companies                                                                                |
| E3_585_003  | Expenses from non-cooperating states or states with preferential tax regimes                                   |
| E3_585_004  | Expenses for informational seminars                                                                            |
| E3_585_005  | Reception and hospitality expenses                                                                             |
| E3_585_006  | Travel expenses                                                                                                |
| E3_585_007  | Self-employed Social Security Contributions                                                                    |
| E3_585_008  | Agent's expenses and commissions on behalf of farmers                                                          |
| E3_585_009  | Other Fees for domestic services                                                                               |
| E3_585_010  | Other Fees for foreign services                                                                                |
| E3_585_011  | Energy                                                                                                         |
| E3_585_012  | Water Supply                                                                                                   |
| E3_585_013  | Telecommunications                                                                                             |
| E3_585_014  | Rents                                                                                                          |
| E3_585_015  | Advertising and promotion                                                                                      |
| E3_585_016  | Other expenses                                                                                                 |
| E3_585_017  | Various operating expenses Z2 (Used in specific Greek Accounting Plan context)                                 |
| E3_586      | Debit interest and similar expenses                                                                            |
| E3_587      | Depreciation                                                                                                   |
| E3_588      | Extraordinary expenses, losses, and fines                                                                      |
| E3_589      | Provisions (excluding provisions for personnel)                                                                |
| E3_882_001  | Purchases of tangible fixed assets during the year/Wholesale                                                   |
| E3_882_002  | Purchases of tangible fixed assets during the year/Retail                                                      |
| E3_882_003  | Purchases of tangible fixed assets during the year/Abroad Intra-Community                                      |
| E3_882_004  | Purchases of tangible fixed assets during the year/Abroad Third Countries                                      |
| E3_883_001  | Purchases of intangible fixed assets during the year/Wholesale                                                 |
| E3_883_002  | Purchases of intangible fixed assets during the year/Retail                                                    |
| E3_883_003  | Purchases of intangible fixed assets during the year/Abroad Intra-Community                                    |
| E3_883_004  | Purchases of intangible fixed assets during the year/Abroad Third Countries                                    |
| VAT_361     | Purchases & expenses within the country                                                                        |
| VAT_362     | Purchases & imports of investment goods (fixed assets)                                                         |
| VAT_363     | Other imports excluding investment goods (fixed assets)                                                        |
| VAT_364     | Intra-community acquisitions of goods                                                                          |
| VAT_365     | Intra-community receipts of services Art. 14.2.a                                                               |
| VAT_366     | Other recipient transactions                                                                                   |
| E3_103      | Impairment of goods                                                                                            |
| E3_203      | Impairment of raw materials and materials                                                                      |
| E3_303      | Impairment of raw materials and materials                                                                      |
| E3_208      | Impairment of products and work in progress                                                                    |
| E3_308      | Impairment of products and work in progress                                                                    |
| E3_314      | Impairment of animals - plants - goods                                                                         |
| E3_106      | Own production of fixed assets - Self-deliveries - Destruction of inventory                                    |
| E3_205      | Own production of fixed assets - Self-deliveries - Destruction of inventory                                    |
| E3_305      | Own production of fixed assets - Self-deliveries - Destruction of inventory                                    |
| E3_210      | Own production of fixed assets - Self-deliveries - Destruction of inventory                                    |
| E3_310      | Own production of fixed assets - Self-deliveries - Destruction of inventory                                    |
| E3_318      | Own production of fixed assets - Self-deliveries - Destruction of inventory                                    |
| E3_598_002  | Purchases of goods subject to Special Consumption Tax (EFK)                                                    |
| NOT_VAT_295 | Non-participation in VAT (expenses – inflows F2)                                                               |

## 8.12 Payment Methods

| Code | Description                       |
| :--- | :-------------------------------- |
| 1    | Domestic Business Payment Account |
| 2    | Foreign Business Payment Account  |
| 3    | Cash                              |
| 4    | Cheque                            |
| 5    | On Credit                         |
| 6    | Web Banking                       |
| 7    | POS / e-POS                       |
| 8    | IRIS Instant Payments             |

## 8.13 Quantity Type

| Code | Description        |
| :--- | :----------------- |
| 1    | Pieces             |
| 2    | Kilograms          |
| 3    | Liters             |
| 4    | Meters             |
| 5    | Square Meters      |
| 6    | Cubic Meters       |
| 7    | Pieces_Other Cases |

## 8.14 Movement Purpose

| Code | Description                               |
| :--- | :---------------------------------------- |
| 1    | Sale                                      |
| 2    | Sale on Behalf of Third Parties           |
| 3    | Sampling                                  |
| 4    | Exhibition                                |
| 5    | Return                                    |
| 6    | Storage                                   |
| 7    | Processing Assembly                       |
| 8    | Between Entity's Premises                 |
| 9    | Purchase                                  |
| 10   | Supply of ships and aircraft              |
| 11   | Free distribution                         |
| 12   | Warranty                                  |
| 13   | Loan for use (Commodatum)                 |
| 14   | Storage at Third Parties                  |
| 15   | Return from Storage                       |
| 16   | Recycling                                 |
| 17   | Destruction of unusable material          |
| 18   | Movement of Fixed Assets (Intra-movement) |
| 19   | Other Movements                           |

## 8.15 Marking

| Code | Description                  |
| :--- | :--------------------------- |
| 1    | Third Party Sales Settlement |
| 2    | Fee from Third Party Sales   |

## 8.16 Line Type

| Code | Description                     | Remarks                                                                                                             |
| :--- | :------------------------------ | :------------------------------------------------------------------------------------------------------------------ |
| 1    | Special Line for Withheld Taxes | Inactive - for future use                                                                                           |
| 2    | Fee Line with VAT               |                                                                                                                     |
| 3    | Other Taxes Line with VAT       |                                                                                                                     |
| 4    | Special Line for Stamp Duty     | Inactive - for future use                                                                                           |
| 5    | Special Line for Deductions     | Inactive - for future use                                                                                           |
| 6    | Gift Voucher                    |                                                                                                                     |
| 7    | Negative value sign             | Valid only for invoices 17.3, 17.4, 17.5, and 17.6 and indicates that the amounts of the line's values are negative |

## 8.17 Fuel Codes

| Code | Description                                                       | Remarks                                                                          |
| :--- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| 10   | Benzine 95RON                                                     |                                                                                  |
| 11   | Benzine 95RON+                                                    |                                                                                  |
| 12   | Benzine 100RON                                                    |                                                                                  |
| 13   | Benzine LRP                                                       |                                                                                  |
| 14   | Aviation gasoline                                                 |                                                                                  |
| 15   | Special jet fuel                                                  |                                                                                  |
| 20   | Diesel                                                            |                                                                                  |
| 21   | Diesel premium                                                    |                                                                                  |
| 30   | Diesel Heating                                                    |                                                                                  |
| 31   | Diesel Heat premium                                               |                                                                                  |
| 32   | Diesel Light                                                      |                                                                                  |
| 33   | Diesel other uses                                                 |                                                                                  |
| 34   | Marine diesel                                                     |                                                                                  |
| 35   | Kerosene JP1                                                      |                                                                                  |
| 36   | Kerosene other uses                                               |                                                                                  |
| 37   | Mazut (Heavy Fuel Oil)                                            |                                                                                  |
| 38   | Marine Mazut (Heavy Fuel Oil)                                     |                                                                                  |
| 40   | LPG (Liquefied Petroleum Gas)                                     |                                                                                  |
| 41   | LPG and methane industrial / commercial engine use (bulk)         |                                                                                  |
| 42   | LPG and methane heating and other uses (bulk)                     |                                                                                  |
| 43   | LPG and methane industrial / commercial engine use (in cylinders) |                                                                                  |
| 44   | LPG and methane heating and other uses (in cylinders)             |                                                                                  |
| 50   | CNG (Compressed Natural Gas)                                      |                                                                                  |
| 60   | Aromatic Hydrocarbons Tariff Class 2707                           |                                                                                  |
| 61   | Cyclic Hydrocarbons Tariff Class 2902                             |                                                                                  |
| 70   | Light oil (WHITE SPIRIT)                                          |                                                                                  |
| 71   | Light oils                                                        |                                                                                  |
| 72   | Biodiesel                                                         |                                                                                  |
| 999  | Other service charges                                             | Used when an invoice, besides fuel, needs to include other minor service charges |

## 8.18 Invoice Deviation Type

| Code | Description                         | Remarks                                                                                                                                                                                                                                                                                                      |
| :--- | :---------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Transmission Omission by Recipient  | This value is used for Data Transmission by the Recipient due to the Issuer's Omission of Transmission.<br>**Allowed invoice types:** 1.1, 1.6, 2.1, 2.4, 5.2, 8.1 and 8.2                                                                                                                                   |
| 2    | Transmission Omission by Issuer     | This value is used for Data Transmission by the Issuer, if they agree with the Recipient's marking regarding transmission omission by the issuer.<br>**Allowed invoice types:** 11.3, 11.4, 13.1, and 13.31                                                                                                  |
| 3    | Transmission Deviation by Recipient | This value is used for Data Transmission (non-counterpart invoices) by the Recipient due to Deviation in Data Transmission by the Issuer.<br>**Allowed invoice types:** 11.3, 11.4, 13.1, and 13.31<br>**(Specifically and exclusively for invoices issued within 2021, the allowed types are 1.1 and 5.2)** |
| 4    | Transmission Deviation by Issuer    | This value is used for Data Transmission by the Issuer, if they agree with the Recipient's marking "Transmission Deviation" on the counterpart Invoice Type A1 that they had transmitted to the Recipient.<br>**Allowed invoice types:** 11.3, 11.4, 13.1, and 13.31                                         |

## 8.19 Special Invoice Category

| Code | Description                                                                                | Remarks                                                                         |
| :--- | :----------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 1    | Subsidies - Grants                                                                         |                                                                                 |
| 2    | Retail Revenue Hotels – Room Charges                                                       |                                                                                 |
| 3    | Accounting Entry                                                                           |                                                                                 |
| 4    | Tax Free                                                                                   | Valid value only for transmission via ERP or issuance via provider or timologio |
| 5    | Complex domestic – foreign transactions                                                    |                                                                                 |
| 6    | Beneficiaries of article 3 of joint ministerial decision 139818 EX2022/28.09.2022 (B’5083) |                                                                                 |
| 7    | Purchase of agricultural goods/services Article 41 of the VAT Code                         |                                                                                 |
| 8    | Retail Revenue AADE Fiscal Devices_1                                                       | Read-only – not a valid value for submission via ERP / Provider                 |
| 9    | Retail Revenue AADE Fiscal Devices_2                                                       | Read-only – not a valid value for submission via ERP / Provider                 |
| 10   | Retail Revenue Business Fiscal Devices Deviation                                           |                                                                                 |
| 11   | Heating Allowance                                                                          |                                                                                 |
| 12   | Restaurant Transactions                                                                    |                                                                                 |

## 8.20 Entity Category (EntityType)

| Code | Description                  | Remarks |
| :--- | :--------------------------- | :------ |
| 1    | Tax Representative           |         |
| 2    | Intermediary                 |         |
| 3    | Transporter                  |         |
| 4    | Recipient of Sender (Seller) |         |
| 5    | Sender (Seller)              |         |
| 6    | Other Correlated Entities    |         |

# 9 Change History

## 9.1 Version 0.5.1

Changes up to 10/10/2019

- **Additions**
  - Par. 5.2: Field explanations
  - Par. 6.2: Response format for Invoice Retrieval
  - Par. 7.1: Error Descriptions
  - Appendix: Value Tables 8.10, 8.12
- **Updates**
  - Par. 4.3.2, 4.3.3: Classification element models
  - Par. 4.3.2, 4.3.3, 5, 5.1, 5.1.1, 5.2, 5.3, 5.4, 6.1, 6.2: Field definitions as non-Mandatory
  - Par. 4.3.4: Invoice Retrieval Method Call Method
  - Par. 8.1: Code changes in Sales Invoices

## 9.2 Version 0.6

Changes up to 20/03/2020

- **Additions**
  - Par. 4.3.4: `CancelInvoice` Method
  - Par. 4.3.6: `RequestTransmittedDocs` Method
  - Par. 5.3, 5.5, 5.7, 5.8: Type additions
  - Par. 5.4: Field additions
  - Par. 7.2: Error message additions
  - Appendix table 8.12: Payment Methods
- **Updates**
  - Par. 4.3.2: `SendIncomeClassification` Method – Model changes
  - Par. 4.3.3: `SendExpensesClassification` Method – Model changes
  - Par. 4.3.5: `RequestDocs` Method – Name change and operation mode
  - Par. 5, 5.2, 5.2.1, 5.4, 5.6, 6.1, 6.2: Field additions and changes
  - Par. 7.2: Addition of error codes
  - Appendix tables 8.1, 8.2, 8.8, 8.9, 8.10, 8.11: Value additions and changes
  - Par. 5.6: Changes in `taxType`, `taxCategory` fields
  - Par. 4.3.3: `SendExpensesClassification` Method – Model changes
  - Par. 5.3: Change of AA field type
  - Par. 5.4: Removal of deductions percentage field
  - Table 8.12: Changes in Payment Method descriptions

## 9.3 Version 0.6.1

Changes up to 10/07/2020

- **Additions**
  - Par. 4.2: Description of Provider Functions
  - Par. 4.5.7: `RequestTransmittedDocs` Method (providers)
  - Par. 6.2.1: Data Retrieval Case for Users other than E-Invoicing Providers
  - Par. 6.2.2: Data Retrieval Case for E-Invoicing Providers via the `RequestedTransmittedDocs` method
- **Updates**
  - Par. 4: API Description
  - Par. 4.5.1: `SendInvoice` Method
  - Par. 7.2: Addition of error codes and change in message description for code 202
  - Par. 5: Addition of field (`transmissionFailure`)
  - Par. 5.3: Max allowed length (50) for `series` and `aa` fields
  - Par. 6.1: Addition of field (`authenticationCode`)

## 9.4 Version 1.0

Changes up to 20/07/2020

- **Updates**
  - Par. 4.2: Removal of Provider Functions
  - Par. 4.5.7: Removal of `RequestTransmittedDocs` method (providers)
  - Par. 5.7: Income Classification (`classificationType` became optional)
  - Par. 6.2.1: Removal of Data Retrieval Case for Users other than E-Invoicing Providers
  - Par. 6.2.2: Removal of Data Retrieval Case for E-Invoicing Providers via the `RequestedTransmittedDocs` method

## 9.5 Version 1.0.1

Changes up to 01/10/2020

- **Additions**
  - Par. 4.3: Addition of production environment method call URLs
  - Par. 7.2: Addition of business error codes
- **Updates**
  - Par. 4.2.1: Update of user registration process in the production environment

## 9.6 Version 1.0.2

Changes up to 11/11/2020

- **Additions**
  - Par. 4.3.2, 4.3.3: Addition of new field (`entityVatNumber` – Reference Entity VAT Number)
  - Par. 5.4: Addition of new field (`recType` – Line Type) and explanation in the "Remarks" of the paragraph regarding how to send lines with fees or other taxes with VAT
  - Par. 7.2: Addition of business error codes
  - Par. 8.3: Addition of VAT exemption reason category (Without VAT - Article 6 of the VAT Code)
  - Par. 8: Addition of new table 8.16 – Line Type
- **Updates**
  - Par. 7.2: Change in the description of error code 215
  - Par. 8.3: Renaming of VAT exemption reason category "Without VAT - Article 2 of the VAT Code" to "Without VAT - Article 2 and 3 of the VAT Code"
  - Par. 4.3.4: Change in the calling method of `CancelInvoice`, via parameter addition
  - Par. 5: Update on how Invoice UID is generated

## 9.7 Version 1.0.3

Changes up to 01/06/2021

- **Additions**
  - Par. 5.3: Addition of new field (`fuelInvoice` – fuel invoice indicator) and explanation in the "Remarks" of the paragraph regarding how to send this field (valid only for providers)
  - Par. 5.4: Addition of new field (`fuelCode` – Fuel Code) and explanation in the "Remarks" of the paragraph for this field (valid only for providers and for fuel invoices, `fuelInvoice = true`)
  - Par. 7.2: Addition of business error codes
  - Par. 8.3: Addition of VAT exemption reason categories
  - Par. 8.4: Addition of withheld tax categories
  - Par. 8.5: Addition of other tax categories
  - Par. 8.6: Addition of stamp duty category
  - Par. 8.7: Addition of fees categories
  - Par. 8: Addition of new table 8.17 – Fuel Codes
- **Updates**
  - Par. 8.5: Addition of the Remarks column to the table and note that sending other taxes with the values:
    | Code | % Other Taxes Cases | % Other taxes |
    | :--- | :-------------------------- | :------------ |
    | 1 | a1) fire insurance premiums 20% | 15% |
    | 2 | a2) fire insurance premiums 20% | 5% |
    are no longer allowed.

## 9.8 Version 1.0.4

A) Changes up to 20/11/2021

- **Additions**
  - Par. 7.2: Addition of business error codes
  - Par. 8.7: Addition of fees categories
  - Par. 8.11: Addition of expense classification type codes
  - Par. 8.12: Addition of payment methods
- **Updates**
  - Par. 4.3.2, 4.3.3: Change in value range for `transactionMode` field

B) Changes up to 13/12/2021

- **Additions**
  - Par. 7.2: Addition of business error codes
  - Par. 8.9: Addition of income classification type codes
  - Par. 8.12: Addition of payment methods
- **Updates**
  - Par. 8.11: Removal of expense classification type codes (E3_598_001, E3_598_003)

## 9.9 Version 1.0.5

Changes up to 18/02/2022

- **Additions**
  - Par. 8.17: Addition of fuel codes

## 9.10 Version 1.0.6

Changes up to 28/06/2022

- **Additions**
  - Par. 4.3.7: Addition of method for retrieving income data (`RequestMyIncome`)
  - Par 4.3.8: Addition of method for retrieving expense data (`RequestMyExpenses`)
  - Par. 5.1: Addition of new field (`documentIdNo` – Official document number) and explanation in the "Remarks" of the paragraph
  - Par. 5.1: Addition of new field (`supplyAccountNo` – Electricity Supply Account No.) and explanation in the "Remarks" of the paragraph
  - Par. 5.3: Addition of new field (`specialInvoiceCategory` – Special Invoice Category)
  - Par. 5.3: Addition of new field (`invoiceVariationType` – Invoice Deviation Type)
  - Par. 5.4: Addition of new field (`quantity15` – Quantity at 15 degrees Celsius)
  - Par. 5.4: Addition of new field (`itemDescr` – Item Description)
  - Par. 6.3: Addition of response for retrieving income - expense data (`RequestedBookInfo`)
  - Par. 8.3: Addition of VAT exemption reason categories
  - Par. 8.4: Addition of withheld tax categories
  - Par. 8.5: Addition of other tax categories
  - Par. 8.7: Addition of fees categories
  - Par. 8.17: Addition of fuel code
  - Par. 8.18: Addition of value table: Special Invoice Category (title should change to 8.19)
  - Par. 8.19: Addition of value table: Deviation (Differentiation) Type (title should change to 8.18)
- **Updates**
  - Par. 4.3.5: Addition of parameters to the invoice search method by the recipient (`RequestDocs`)
  - Par. 4.3.6: Addition of parameters to the invoice search method by the transmitter (`RequestTransmittedDocs`)
  - Par. 5: The `transmissionFailure` field is valid for transmission from both providers and ERP depending on the value – value range of the field also changed
  - Par. 5.4: `recType` value range changed – new max value 7 (negative value sign) and explanation in Remarks on its usage
  - Par. 7.2: Change in error text for code 309
  - Par. 8.5: Modification of the description Customs Duties-Taxes to Other Customs Duties-Taxes

## 9.11 Version 1.0.7

Changes up to 17/10/2023

- **Additions**
  - Par. 5.1: Addition of new field (`countryDocumentId` – Country Code of Official Document Issuance) and explanation in the "Remarks" of the paragraph
  - Par. 5.3: Addition of new field (`otherCorrelatedEntities` – Other correlated entities, type `EntityType`)
  - Par. 5.3.1: Addition of new type `EntityType`
  - Par. 5: Addition of new field (`otherTransportDetails` – Other Delivery Details, type `TransportDetailType`)
  - Par. 5.7: Addition of new type `TransportDetailType`
  - Par. 8.19: Addition of Special Invoice Category values (`SpecialInvoiceCategoryType`)
  - Par. 8.20: Addition of value table: Categories of Correlated Entities
- **Updates**
  - Par. 4.2.3: New way to call the method (`SendExpensesClassification` with `postPerInvoice`)
  - Par. 4.2.6: Enrichment of the information returned via the `RequestDocs` method call for the case where a counterparty rejected an invoice using the distinct expense classification submission method
  - Par. 8.19: Modification of the description Retail Revenue Hotels – Room Charges to Retail Revenue Hotels

## 9.12 Version 1.0.8

Changes up to 12/2/2024

- **Additions**
  - Par. 4.2.4: Addition of `SendPaymentsMethod` method
  - Par. 5.2.1: Addition of new type `ProviderSignatureType` (Provider Payment Signature)
  - Par. 5.2.2: Addition of new type `ECRTokenType` (Fiscal Device Payment Signature with software system (ERP))
  - Par. 5.1: Addition of new field (`countryDocumentId` – Country Code of Official Document Issuance) and explanation in the "Remarks" of the paragraph (Moved from version 1.0.7)
  - Par. 5.3: Addition of new field (`otherDeliveryNoteHeader` – Other General Delivery Details, type `OtherDeliveryNoteHeaderType`)
  - Par. 5.3: Addition of new field (`isDeliveryNote` – Delivery Note Indication) and explanation in the "Remarks" of the paragraph
  - Par. 5.3: Addition of new field (`otherMovePurposeTitle` – Title of Other Movement Purpose) and explanation in the "Remarks" of the paragraph
  - Par. 5.3: Addition of new field (`thirdPartyCollection` – Third-Party Collection Indication) and explanation in the "Remarks" of the paragraph
  - Par. 5.3.2: Addition of new type `OtherDeliveryNoteHeaderType`
  - Par. 5.4: Addition of new fields (`TaricNo`, `itemCode`, `otherMeasurementUnitQuantity`, `otherMeasurementUnitTitle`)
  - Par. 6.4: Addition of Method for Retrieving Information for VAT Data (`RequestVatInfo`)
  - Par. 7.2: Addition of business error codes
  - Par. 8.1: Addition of invoice types (kinds) (8.4, 8.5, 8.6 and 9.3)
  - Par. 8.2: Addition of VAT Category value (3%)
  - Par. 8.8: Addition of income classification category code (`category3`)
  - Par. 8.13: Addition of measurement unit values (Meters, Square Meters, Cubic Meters, Pieces_Other Cases)
  - Par. 8.14: Addition of movement purpose values (values 9 to 19)
  - Par. 8.19: Addition of Special Invoice Category values (`SpecialInvoiceCategoryType`)
  - Par. 8.20: Addition of value table: Categories of Correlated Entities
- **Updates**
  - Par. 4.2.6: Enrichment of the information returned via the `RequestDocs` method call for the case where a counterparty rejected an invoice using the distinct expense classification submission method
  - Par. 5: Update regarding UID fields
  - Par. 5.2 Payment Method: addition of new fields
  - Par. 7.2: Change in text for business errors 403, 404, 405, 406

## 9.13 Version 1.0.9

Changes up to 11/7/2024

- **Additions**
  - Par. 5.2: Addition of new field `tid` (POS tid Code) and explanation in the "Remarks" of the paragraph
  - Par. 5.3: Addition of fields `multipleConnectedMarks` (Multiple Connected MARKs), `tableAA` (Table AA), `totalCancelDeliveryOrders` (Indication of total cancellation of Order Slips) and explanation in the "Remarks" of the paragraph
  - Par. 5.4: Addition of field `notVAT195` (Indication of non-participation in VAT (revenue – outflows)) and explanation in the "Remarks" of the paragraph
  - Par. 7.2: Addition of business error codes (Code 280 and code 341)
  - Par. 8.2: Addition of VAT Category value (rate 4% - art.31 Law 5057/2023)
  - Par. 8.5: Addition of other tax categories (new codes from 19 to 30)
  - Par. 8.11: Addition of expense classification type code (NOT_VAT_295)
  - Par. 8.12: Addition of payment method (IRIS Instant Payments)
- **Updates**
  - Par. 8.1: Renaming of invoice type 8.2
  - Par. 8.2: Completion of the name for VAT code 9 (rate 3% - art.31 Law 5057/2023)

## 9.14 Version 1.0.10

Changes up to 23/12/2024

- **Updates**
  - Par. 5.1: In case 5), `fuelInvoice = true` is allowed also for submissions via ERP (deletion of the text: “ – accepted only for transmission from providers”)
  - Par. 5.3: Deletion of the text: “Accepted only in case of submission from providers.” from the Accepted Values column for the `fuelInvoice` row in the table
  - Par. 5.3: Deletion of the text: “and submission is allowed only for the case of providers” from Remark 7) (reference to the `fuelInvoice` field)
  - Par. 5.4: Deletion of the text: “in case of submission from providers and” from the Accepted Values column for the `fuelCode` row in the table
  - Par. 5.4: Deletion of the text: “ for the case of providers and ” from Remark 8) (reference to the `fuelCode` field)
