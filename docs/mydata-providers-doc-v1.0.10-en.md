# AADE

**Independent Authority for Public Revenue**

# myDATA

## AADE Electronic Books

---

**Technical description of REST API interfaces for transmitting & receiving data from Electronic Invoicing Providers**

**Version 1.0.10 – December 2024**

---

## Contents

- [Contents](#contents)
- [1 Introduction](#1-introduction)
- [2 Purpose](#2-purpose)
- [3 Technological requirements for invoicing software](#3-technological-requirements-for-invoicing-software)
- [4 REST API Description](#4-rest-api-description)
  - [4.1 Description of interface operation](#41-description-of-interface-operation)
    - [4.1.1 Provider Registration as a REST API User](#411-provider-registration-as-a-rest-api-user)
    - [4.1.2 Required Headers](#412-required-headers)
  - [4.2 Description of functions](#42-description-of-functions)
    - [4.2.1 SendInvoices](#421-sendinvoices)
    - [4.2.2 RequestTransmittedDocs](#422-requesttransmitteddocs)
    - [4.2.3 RequestReceiverInfo](#423-requestreceiverinfo)
    - [4.2.4 SendUnsignedInvoices](#424-sendunsignedinvoices)
    - [4.2.5 SendPaymentsMethod](#425-sendpaymentsmethod)
- [5 Description of the invoice schema](#5-description-of-the-invoice-schema)
  - [5.1 Entity details](#51-entity-details)
  - [5.2 Payment Method](#52-payment-method)
  - [5.3 Invoice header](#53-invoice-header)
  - [5.4 Invoice details](#54-invoice-details)
  - [5.5 Tax Totals](#55-tax-totals)
  - [5.6 Invoice summary](#56-invoice-summary)
  - [5.7 Income Classification](#57-income-classification)
  - [5.8 Expenses Classification](#58-expenses-classification)
- [6 Description of Responses](#6-description-of-responses)
  - [6.1 Data Submission](#61-data-submission)
  - [6.2 Data Retrieval](#62-data-retrieval)
  - [6.3 Retrieval of Information regarding Electronic Invoicing](#63-retrieval-of-information-regarding-electronic-invoicing)
- [7 Errors](#7-errors)
  - [7.1 Technical Errors](#71-technical-errors)
  - [7.2 Business Errors](#72-business-errors)
- [8 Appendix](#8-appendix)
  - [8.1 Invoice types](#81-invoice-types)
  - [8.2 VAT Category](#82-vat-category)
  - [8.3 VAT Exemption Reason Category](#83-vat-exemption-reason-category)
  - [8.4 Withholding Taxes Category](#84-withholding-taxes-category)
  - [8.5 Other Taxes Category](#85-other-taxes-category)
  - [8.6 Stamp Duty Rate Category](#86-stamp-duty-rate-category)
  - [8.7 Fees Category](#87-fees-category)
  - [8.8 Income Classification Category Code](#88-income-classification-category-code)
  - [8.9 Income Classification Type Code](#89-income-classification-type-code)
  - [8.10 Expenses Classification Category Code](#810-expenses-classification-category-code)
  - [8.11 Expenses Classification Type Code](#811-expenses-classification-type-code)
  - [8.12 Payment Methods](#812-payment-methods)
  - [8.13 Measurement Unit](#813-measurement-unit)
  - [8.14 Movement Purpose](#814-movement-purpose)
  - [8.15 Special Invoice Marking](#815-special-invoice-marking)
  - [8.16 Line Item Type](#816-line-item-type)
  - [8.17 Fuel Codes](#817-fuel-codes)
- [9 Change History](#9-change-history)
  - [9.1 Version 1.0.3](#91-version-103)
  - [9.2 Version 1.0.4](#92-version-104)
  - [9.3 Version 1.0.5](#93-version-105)
  - [9.4 Version 1.0.6](#94-version-106)
  - [9.5 Version 1.0.7](#95-version-107)
  - [9.6 Version 1.0.8](#96-version-108)
  - [9.7 Version 1.0.9](#97-version-109)
  - [9.8 Version 1.0.10](#98-version-1010)

---

## 1 Introduction

**myDATA**, meaning my Digital Accounting and Tax Application.

It is the name of the new electronic platform with which AADE introduces electronic books into the daily life of businesses.

AADE Electronic Books constitute a very important step in the digital transformation of the Public sector and businesses. Our goal is primarily to serve businesses by offering an innovative digital platform for fulfilling their tax obligations, which will lead to the automation of tax return completion and relieve them of obligations they currently have, such as submitting Customer-Supplier Statements (MYF).

The myDATA electronic platform provides easy solutions for everyone. Both for businesses that have computerized accounting systems and will be able to transmit the necessary data massively and automatedly, as well as for other businesses, which will be able to transmit data simply, through a special registration form on the AADE website.

## 2 Purpose

For businesses providing electronic invoicing services, AADE provides a REST API interface on a public cloud infrastructure (Microsoft Azure), aiming for their uninterrupted and seamless connection with AADE for data exchange.

More specifically for an electronic invoicing provider utilizing the relevant API, the offered automated interconnection functions are:

- Sending data for the invoices issued by its clients through it.
- Receiving data for invoices that have been issued by it and transmitted to AADE.

This document describes the above functions, as well as the necessary technical specifications for implementing the relevant calls of the offered REST API interfaces.

## 3 Technological requirements for invoicing software

To implement the communication of a software system with the interfaces, the following technologies are used:

- HTTPS – Secure HTTP
- Webservice
- REST API – REST interface required for the data reporting process
- XML – eXtensible Markup Language

The interfaces can be used by any software that can implement HTTPS calls and create XML documents compatible with the schema described in this document.
Besides the relevant data, the software must be able to simultaneously and automatedly send the necessary user identification information through the same HTTPS call.

## 4 REST API Description

In summary, the interface provides the following functions-methods:

- **/SendInvoices**: process for submitting one or more invoices
- **/RequestTransmittedDocs**: process for receiving information about one or more invoices submitted by the provider for a specific entity
- **/RequestReceiverInfo**: process for receiving information related to the receipt of invoices for a specific entity
- **/SendUnsignedInvoices**: process for submitting one or more invoices pending issuance

A detailed description of the functions is provided in a subsequent section of this document.

### 4.1 Description of interface operation

#### 4.1.1 Provider Registration as a REST API User

Using the interface functions requires a user authentication process. Authentication is performed by sending a username and a subscription key in the headers section with each call. The subscription key is a string, unique per user, and is common to all interface functions.

To obtain the above credentials, a user must create an account in the interface registry through a special registration process offered by the myDATA electronic platform.

The registration process for the offered services of the myDATA REST API will be done through the application available at the URL of the myDATA platform:
<https://www1.aade.gr/saadeapps2/bookkeeper-web>

Initially, the user is asked to log in with their taxisnet credentials, and then the following page appears:

_(Image Description: Screenshot of the myDATA platform welcome screen, showing options like "Summary Book", "Invoice Entry", "Search Invoices", and "myDATA REST API Registration Form")_

On the above page, the user selects "myDATA REST API Registration Form" and on the form of the page that appears, selects New Registration. On the form that appears, after filling in the username, password, and email, they select "Add registration". In case of successful registration, the user is created in the relevant REST API registry, and a special subscription key is provided, which the user will use for their authentication during calls to the interface services. The subscription key is the value in the "API Key" column of the screen below, which displays all subscription keys created by the user.

_(Image Description: Screenshot of the myDATA REST API registration management screen. It shows a table with columns for "API Key" (API Key/Subscription Key), "Username", "email", "Registration Date", "Status", and "Delete". A "New registration" button is visible.)_

After the registration stage, the user will be able to log in to the interface portal with their account details, from where they can view and change the subscription key.

Using each interface function is done by sending an HTTPS call (GET or POST, depending on the function) to the corresponding URL link.

The call must include the appropriate header which will contain information necessary for user authentication and a body in XML format, the structure of which will depend on the service being called. For each call, the user will receive a response with information about the outcome of their call, also in XML format.

In submission services (POST type call), the user can send one or many objects, embedding them in the body of the call in a special XML format (invoices/accounting entries or classifications). The response may contain, for each invoice, one or more error messages or a successful submission message.

In invoice retrieval services (GET type calls), the user will send the unique numbers of the invoices they are interested in as parameters during the call.

#### 4.1.2 Required Headers

Each call must contain the following headers as key-value pairs, which are necessary for user authentication. In case of incorrect details, the user will receive an error message.

| KEY                       | Data Type | VALUE              | DESCRIPTION                 |
| :------------------------ | :-------- | :----------------- | :-------------------------- |
| aade-user-id              | String    | {Username}         | The username of the account |
| ocp-apim-subscription-key | String    | {Subscription Key} | The user's subscription key |

Through user authentication via headers, the interface will also gain access to the VAT number that the user declared during registration, so it is not necessary to enter this information again in each service call.

### 4.2 Description of functions

#### 4.2.1 SendInvoices

Calling the SendInvoices method is available only for **certified** providers via the following URL:

<https://mydatapi.aade.gr/myDataProvider/SendInvoices>

The call has the following characteristics:

- `/SendInvoices`, POST method
- Has headers as mentioned in paragraph: 4.1.2
- Body is in xml format and contains the `InvoicesDoc` element, which contains one or more invoices. The structure of the element is described by the `AadeBookInvoiceType` type and is analyzed in chapter: 5

_(Diagram Description: A simple diagram showing `InvoicesDoc` (AADE Invoice) containing 1 to many `inv:invoice` elements)_

**\*Note:** For the development and testing phase for prospective providers, the method is available at the URL: <https://mydataapidev.aade.gr/myDataProvider/SendInvoices>\*

#### 4.2.2 RequestTransmittedDocs

With this method, the provider user receives information about the summaries of the invoices they had transmitted.

This is done through an HTTP GET call of the method, with the following parameters which function as search criteria:

`https://mydatapi.aade.gr/myDataProvider/RequestTransmittedDocs[?issuervat][&mark]&[nextPartitionKey]&[nextRowKey]`

| Parameter Name   | Type      | Mandatory | Description                                        |
| :--------------- | :-------- | :-------- | :------------------------------------------------- |
| issuervat        | xs:string | Yes       | Entity VAT number                                  |
| Mark             | xs:long   | Yes       | Unique Registration Number (MARK)                  |
| nextPartitionKey | xs:string | No        | Parameter for retrieving results in parts (paging) |
| nextRowKey       | xs:string | No        | Parameter for retrieving results in parts (paging) |

Specifically, the call returns information for invoices concerning a specific entity and having a Unique Registration Number identifier greater than the parameter value.

**Observation:** If the search results exceed the maximum allowed size limit, the user will receive them in parts. The `nextPartitionKey` and `nextRowKey` fields will be included in each part of the results and will be used as parameters in the call to retrieve the next part of the results.

The format of the results for each invoice is described in a subsequent paragraph.

**\*Note:** For the development and testing phase for prospective providers, the method is available at the URL: <https://mydataapidev.aade.gr/myDATAProvider/RequestTransmittedDocs[?issuervat][&mark]&[nextPartitionKey]&[nextRowKey]>\*

#### 4.2.3 RequestReceiverInfo

With this method, the user receives the following information for a specific entity:

- The VAT numbers of the providers through which the entity invoices
- The emails at which the entity has declared it can receive invoices from the electronic invoicing process

The method is used via the following HTTP GET call:
`https://mydatapi.aade.gr/myDATAProvider/RequestReceiverInfo[?vatNumber]`

| Parameter Name | Type      | Mandatory | Description       |
| :------------- | :-------- | :-------- | :---------------- |
| vatNumber      | xs:string | Yes       | Entity VAT Number |

The format of the results for each invoice is described in a subsequent paragraph.

**\*Note:** For the development and testing phase for prospective providers, the method is available at the URL: <https://mydataapidev.aade.gr/myDATAProvider/RequestReceiverInfo[?vatNumber]>\*

#### 4.2.4 SendUnsignedInvoices

This method is identical to SendInvoices from a technical perspective, and its use concerns invoices pending issuance, as described in decision A.1170/2023.

The method is used for transmitting provider signatures in cases where the invoice is ultimately not issued and no MARK is assigned.

#### 4.2.5 SendPaymentsMethod

Calling the SendPaymentsMethod method is available only for **certified** providers via the following URL:

<https://mydatapi.aade.gr/myDataProvider/SendPaymentsMethod>

The call has the following characteristics:

- `/SendPaymentsMethod`, POST method
- Has headers as mentioned in paragraph: 4.1.2
- Body is in xml format and contains the `PaymentMethodsDoc` element, which contains one or more payment methods. The structure of the element is described by the `PaymentMethodType` type and is analyzed in chapter: 5

_(Diagram Description: A simple diagram showing `PaymentMethodsDoc` (Expense Classifications / Standard AADE Invoices) containing 1 to many `paymentMethods` elements)_

**\*Note:** For the development and testing phase for prospective providers, the method is available at the URL: <https://mydataapidev.aade.gr/SendPaymentsMethod>\*

## 5 Description of the invoice schema

The structure and schema of the invoice type `AadeBookInvoiceType` as well as all types and entities mentioned therein are similar to those described and analyzed in the technical documentation document for ERP users.

<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 5.1 Entity details

The issuer and the recipient of the invoice are elements of type `PartyType`.

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 5.2 Payment Method

The payment method is an element of type `PaymentMethodDetailType`.

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 5.3 Invoice header

The invoice header is an element of type `InvoiceHeaderType`.

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 5.4 Invoice details

The invoice details are elements of type `InvoiceRowType`.

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 5.5 Tax Totals

The Tax Totals type (`TaxTotalsType`) describes the structure of the taxes concerning the entire invoice.

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 5.6 Invoice summary

The invoice summary is of type `InvoiceSummaryType`.

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 5.7 Income Classification

The `IncomeClassificationType` type (described below) constitutes the basic structure of Income Classification and is included either in each line of the invoice separately (line classification), or in the invoice summary (sum of classifications per type - category), or in the `InvoiceIncomeClassificationType` object when income classifications are submitted separately.

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 5.8 Expenses Classification

The `ExpensesClassificationType` type (described below) constitutes the basic structure of Expenses Classification and is included either in each line of the invoice separately (line classification), or in the invoice summary (sum of classifications per type - category), or in the `InvoiceExpensesClassificationType` object when expense classifications are submitted separately.

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

## 6 Description of Responses

### 6.1 Data Submission

When calling `SendInvoices`, an object of type `ResponseDoc` in xml format is received as a response. The object includes a list of elements of type `response`, one for each submitted entity. The format of `ResponseDoc` is the same as in the case of ERP users:

_(Diagram Description: A diagram showing the structure of `ResponseDoc`. `ResponseDoc` contains 1 to many `response` elements. Each `response` element (type `ResponseType`) contains fields: `index` (Entity line sequence number), `invoiceUid` (Entity identifier), `invoiceMark` (Invoice Unique Registration Number), `classificationMark` (Classification Unique Receipt Number), `cancellationMark` (Unique Cancellation Number), `authenticationCode` (Provider Authentication String), `receptionProviders` (Recipient Providers), `receptionEmails` (Receipt Emails), and `errors` (List of Errors). The `ResponseDoc` also directly contains `statusCode` (Result code).)_

| Field      | Type       | Mandatory | Description                                            | Values                                                           |
| :--------- | :--------- | :-------- | :----------------------------------------------------- | :--------------------------------------------------------------- |
| index      | xs: int    | No        | Sequence Number of the Entity within the submitted xml |                                                                  |
| statusCode | xs: string | Yes       | Result Code                                            | `Success`, `ValidationError`, `TechnicalError`, `XMLSyntaxError` |

**Fields within the `response` element:**

| Field               | Type                    | Mandatory    | Description                               | Remarks                                           |
| :------------------ | :---------------------- | :----------- | :---------------------------------------- | :------------------------------------------------ |
| invoiceUid          | xs: string              | No           | Invoice Identifier                        | Length = 40                                       |
| invoiceMark         | xs: long                | No           | Invoice Unique Registration Number (MARK) |                                                   |
| classificationMark  | xs: long                | No           | Unique Classification Receipt Number      | Not applicable for providers – only for ERP users |
| authenticationCode  | xs: string              | No           | Authentication String                     |                                                   |
| cancellationMark    | xs: long                | No           | Unique Cancellation Number                | Not applicable for providers – only for ERP users |
| errors              | ErrorType               | Yes (choice) | List of Errors                            |                                                   |
| receptionsProviders | ReceptionsProvidersType | No           | List of Providers                         |                                                   |
| receptionsEmails    | ReceptionsEmailsType    | No           | List of receipt emails                    |                                                   |

**Remarks:**

1.  The type of response (successful or failed process) is determined by the value of the `statusCode` field.
2.  In case of success, the `statusCode` field has the value `Success` and the response includes the corresponding values for the fields `invoiceUid`, `invoiceMark`, `classificationMark`, and `cancellationMark`, depending on the submitted entity. If the submission was made via a provider, the response also includes a value for the `authenticationCode` field.
3.  In case of failure, the `statusCode` field has a value corresponding to the type of error and the response includes a list of error elements of type `ErrorType` for each entity whose submission failed. All error elements per entity must belong to the same category that characterizes the response.
4.  The `invoiceUid` field is returned only if the submission concerned an invoice.
5.  The `invoiceMark` field contains the MARK of the submitted invoice if invoices were submitted.
6.  `ReceptionsProvidersType` and `ProviderInfoType` are described in the next paragraph.

### 6.2 Data Retrieval

If the Electronic Invoicing Provider calls the data retrieval method (`RequestTransmittedDocs`), as described in a previous paragraph, they will receive a `RequestedProviderDoc` object in xml format. The object will include lists of elements of the invoices they have transmitted, which have an `issuervat` (Issuer's VAT No.) equal to the one entered as a parameter, a `mark` greater than the one entered as a parameter, as well as the `continuationToken` element, in case the volume of data exceeds the permissible limit and their retrieval is done in parts.

_(Diagram Description: Structure of `RequestedProviderDoc`. It contains 0 to many `InvoiceProviderType` elements and optionally a `continuationToken` element (type `continuationTokenType`). The `continuationToken` contains `nextPartitionKey` and `nextRowKey`. The `InvoiceProviderType` contains `issuerVAT` (Issuer VAT No.), `invoiceProviderMark` (Provider Invoice Unique Registration Number), `invoiceUid` (Entity Identifier), and `authenticationCode` (Provider Authentication String).)_

| Field               | Type                  | Mandatory | Description                                      |
| :------------------ | :-------------------- | :-------- | :----------------------------------------------- |
| continuationToken   | continuationTokenType | No        | Element for retrieving results in parts (paging) |
| InvoiceProviderType | InvoiceProviderType   | No        | List of Invoice Elements                         |
| issuerVAT           | xs:string             | Yes       | Invoice Issuer VAT No.                           |
| invoiceProviderMark | xs:long               | Yes       | Invoice MARK                                     |
| invoiceUid          | xs:string             | Yes       | Invoice Identifier                               |
| authenticationCode  | xs:string             | Yes       | Provider Invoice Authentication String           |
| nextPartitionKey    | xs:string             | Yes       | Parameter for the next retrieval call            |
| nextRowKey          | xs:string             | Yes       | Parameter for the next retrieval call            |

**Remarks:**

1.  If the `continuationToken` element is returned, the `nextPartitionKey` and `nextRowKey` fields will be populated by the service and are used in the next call of the **same method** that was called by the user.

### 6.3 Retrieval of Information regarding Electronic Invoicing

If the Electronic Invoicing Provider calls the retrieval method `RequestReceiverInfo`, as described in a previous paragraph, they will receive a `ReceiverInfoDoc` object in xml format. The object will include a list of the VAT numbers of the entity's providers and a list of the emails at which the entity has declared it accepts invoices via electronic invoicing.

_(Diagram Description: Structure of `ReceiverInfoDoc`. It contains 0 to many `receptionProviders` elements (type `ReceptionProvidersType`) and 0 to many `receptionEmails` elements (type `ReceptionEmailsType`). `ReceptionProvidersType` contains 0 to many `ProviderInfo` elements (type `ProviderInfoType`). `ProviderInfoType` contains `VATNumber` (VAT No.). `ReceptionEmailsType` contains 0 to many `email` elements.)_

| Field               | Type                    | Mandatory | Description            |
| :------------------ | :---------------------- | :-------- | :--------------------- |
| receptionsProviders | ReceptionsProvidersType | No        | List of Providers      |
| ProviderInfo        | ProviderInfoType        | Yes       | Provider Information   |
| VATNumber           | xs:string               | Yes       | Provider VAT Number    |
| receptionsEmails    | ReceptionsEmailsType    | No        | List of Receipt Emails |
| email               | xs:string               | Yes       | Receipt Email          |

## 7 Errors

Errors are elements of `ErrorType` and are described below:

_(Diagram Description: Structure of `ErrorType`. It contains `message` (Error Message) and `code` (Error Code).)_

Each error element concerning an entity consists of a message describing the error and an error code.

| Field   | Type       | Mandatory | Description   |
| :------ | :--------- | :-------- | :------------ |
| message | xs: string | Yes       | Error Message |
| code    | xs: string | Yes       | Error Code    |

### 7.1 Technical Errors

Technical errors mark the call as unsuccessful and return a standard .NET `HttpResponseMessage` instead of the `ErrorType` described in paragraph 7. Therefore, they do not have a specific error code, are not accompanied by any `statusCode` of the `ResponseType` element, and are identified by the corresponding `HttpStatusCode`.

The codes for technical errors, as well as details, are in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 7.2 Business Errors

Business errors are of type `ErrorType` (see Par. 7) and arise during the failure of business rules checks. In their case, the call is considered technically successful (HTTP Response 200).

Business errors are similar to those in the case of ERP users, as reflected in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

**In addition to the following which apply specifically to providers:**

**ADDITIONAL BUSINESS ERRORS SPECIFIC TO ELECTRONIC INVOICING PROVIDERS**

| #   | HTTP Response | StatusCode      | Code | Element | Description (Greek translated to English)                                                                                                                                                                                                                                        | Description ENG (Original/Refined English)                                                                                                                                                                                                                                    |
| :-- | :------------ | :-------------- | :--- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | HTTP 200 OK   | ValidationError | 228  | Invoice | {Field} is not valid. {Field1} <br/> [Possible {Field} values: {UID, Invoice Type}] <br/> [Possible {Field1} values: {It has already been sent for another invoice (MARK: MARK), It exists for another invoice contained in the same request}] <br/> [Applies only to providers] | {Field} is invalid. {Field1} <br/> [Possible {Field} values: {UID, InvoiceType}] <br/> [Possible {Field1} values: {It has already been sent for another invoice (MARK: mark), It exists for another invoice contained in the same request}] <br/> [Applies only to providers] |
| 3   | HTTP 200 OK   | ValidationError | 236  | Invoice | The Sender's (VAT Number): " + {VAT Number} + " must be different from the issuer's (VAT Number)                                                                                                                                                                                 | The Sender (vatnumber): " + {afm} + " must be different from the issuer (vatnumber)                                                                                                                                                                                           |
| 4   | HTTP 200 OK   | ValidationError | 238  | Invoice | Issue Date is not valid, it must be the same as the current date <br/> [Applies only to providers]                                                                                                                                                                               | IssueDate is invalid, it must be equal with current date <br/> [Applies only to providers]                                                                                                                                                                                    |
| 5   | HTTP 200 OK   | ValidationError | 245  | Invoice | 245/Validation Error - The provider is not authorized to issue invoices for: " +{Field} <br/> [Possible {Field} values: {Issuer VAT Number}] <br/> [Applies only to providers]                                                                                                   | 245/ValidationError - Provider is not authorised to issue Invoices for: " +{Field} <br/> [Possible {Field} values: {Issuer VatNumber}] <br/> [Applies only to providers]                                                                                                      |

## 8 Appendix

### 8.1 Invoice types

For providers, the following invoice types are allowed:

| Domestic / Foreign Issuer Invoices (B2B/B2G)              | Code | Description                                                                       |
| :-------------------------------------------------------- | :--- | :-------------------------------------------------------------------------------- |
| **Sales Invoice**                                         |      |                                                                                   |
|                                                           | 1.1  | Sales Invoice                                                                     |
|                                                           | 1.2  | Sales Invoice / Intra-community Supplies                                          |
|                                                           | 1.3  | Sales Invoice / Third Country Supplies                                            |
|                                                           | 1.4  | Sales Invoice / Sale on Behalf of Third Parties                                   |
|                                                           | 1.5  | Sales Invoice / Third Party Sales Liquidation - Commission from Third Party Sales |
|                                                           | 1.6  | Sales Invoice / Supplementary Document                                            |
| **Services Rendered Invoice**                             |      |                                                                                   |
|                                                           | 2.1  | Services Rendered Invoice                                                         |
|                                                           | 2.2  | Services Rendered Invoice / Intra-community Provision of Services                 |
|                                                           | 2.3  | Services Rendered Invoice / Provision of Services to Third Country Recipient      |
|                                                           | 2.4  | Services Rendered Invoice / Supplementary Document                                |
| **Acquisition Document (Self-Billing)**                   |      |                                                                                   |
|                                                           | 3.1  | Acquisition Document (Non-liable Issuer)                                          |
|                                                           | 3.2  | Acquisition Document (refusal to issue by liable Issuer)                          |
| **For Future Use**                                        |      |                                                                                   |
| **Credit Invoice**                                        |      |                                                                                   |
|                                                           | 5.1  | Credit Invoice / Correlated                                                       |
|                                                           | 5.2  | Credit Invoice / Non-Correlated                                                   |
| **Self-Delivery - Own Use Document**                      |      |                                                                                   |
|                                                           | 6.1  | Self-Delivery Document                                                            |
|                                                           | 6.2  | Own Use Document                                                                  |
| **Contract - Income**                                     |      |                                                                                   |
|                                                           | 7.1  | Contract - Income                                                                 |
| **Special Document (Income) – Receipt**                   |      |                                                                                   |
|                                                           | 8.1  | Rents - Income                                                                    |
|                                                           | 8.2  | Climate crisis resilience fee                                                     |
|                                                           | 8.4  | POS Receipt                                                                       |
|                                                           | 8.5  | POS Return Receipt                                                                |
| **Order Form**                                            |      |                                                                                   |
|                                                           | 8.6  | Catering Order Form                                                               |
| **Dispatch Documents**                                    |      |                                                                                   |
|                                                           | 9.3  | Dispatch Note                                                                     |
| **Non-Transmitted Invoices of Domestic / Foreign Issuer** |      |                                                                                   |
| **Retail Receipts**                                       |      |                                                                                   |
|                                                           | 11.1 | RSP (Retail Sales Receipt)                                                        |
|                                                           | 11.2 | RSR (Receipt for Services Rendered)                                               |
|                                                           | 11.3 | Simplified Invoice                                                                |
|                                                           | 11.4 | Retail Credit Note                                                                |
|                                                           | 11.5 | Retail Sales Receipt on behalf of Third Parties                                   |

### 8.2 VAT Category

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 8.3 VAT Exemption Reason Category

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 8.4 Withholding Taxes Category

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 8.5 Other Taxes Category

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 8.6 Stamp Duty Rate Category

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 8.7 Fees Category

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 8.8 Income Classification Category Code

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 8.9 Income Classification Type Code

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 8.10 Expenses Classification Category Code

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 8.11 Expenses Classification Type Code

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 8.12 Payment Methods

Details in the relevant section of the technical documentation document for ERP users: <https://www.aade.gr/myDATA/tehniki-tekmiriosi> (Link points to Greek documentation page)

### 8.13 Measurement Unit

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 8.14 Movement Purpose

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 8.15 Special Invoice Marking

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 8.16 Line Item Type

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 8.17 Fuel Codes

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

## 9 Change History

### 9.1 Version 1.0.3

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 9.2 Version 1.0.4

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 9.3 Version 1.0.5

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 9.4 Version 1.0.6

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 9.5 Version 1.0.7

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 9.6 Version 1.0.8

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

### 9.7 Version 1.0.9

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

- **Additions**
  - Par. 4.2.4 : Added SendUnsignedInvoices method
  - Par. 4.2.5 : Added SendPaymentsMethod method
- **Updates**
  - Par. 8.1: Renaming of invoice type 8.2

### 9.8 Version 1.0.10

Details in the relevant section of the technical documentation document for ERP users:
<https://www.aade.gr/epiheiriseis/mydata-ilektronika-biblia-aade/tehnikes-prodiagrafes-ekdoseis> (Link points to Greek documentation)

- **Additions**
  - Par. 8.1 : Added new invoice types: 8.4, 8.5, 8.6 and 9.3 (were inadvertently omitted from the previous document version 1.0.9)
