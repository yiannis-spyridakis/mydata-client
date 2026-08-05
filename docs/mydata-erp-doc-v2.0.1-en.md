# myDATA REST API — ERP users (v2.0.1)

## 4.2.2 SendIncomeClassification

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `invoiceMark` | `xs:long` | Yes | Μοναδικός Number Καταχώρησης Invoice |  |
| `classificationMark` | `xs:long` | No | Μοναδικός Number Καταχώρησης Classification |  |
| `entityVatNumber` | `xs: string` | No | VAT Number Entity Αναφοράς |  |
| `transactionMode` | `xs:int` | Yes (choice) | Item Συναλλαγής | 1 = Reject 2 = Deviation |
| `lineNumber` | `xs:int` | Yes (choice) | Number Line |  |
| `incomeClassificationDetailData` | `IncomeClassificationType` | Yes (choice) |  |  |

## 4.2.3 SendExpensesClassification

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `invoiceMark` | `xs:long` | Yes | Μοναδικός Number Καταχώρησης Invoice |  |
| `classificationMark` | `xs:long` |  | No | Μοναδικός Number Καταχώρησης Classification |
| `entityVatNumber` | `xs: string` |  | No | VAT Number Entity Αναφοράς |
| `transactionMode` | `xs:int` |  | Yes (choice) | Item Συναλλαγής 2 = Deviation |
| `lineNumber` | `xs:int` |  | Yes (choice) | Number Line |
| `expensesClassificationDetailData` | `ExpensesClassificationType` |  | Yes (choice) |  |
| `postPerInvoice` | `xs:boolean` |  | No | Τρόπος υποβολής χαρακτηρισμού |

## 4.2.4 SendPaymentsMethod

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `invoiceMark` | `xs:long` | Yes | Μοναδικός Number Καταχώρησης Invoice |  |
| `paymentMethodMark` | `xs:long` | No | Μοναδικός Number Καταχώρησης Τρόπου Payment |  |
| `entityVatNumber` | `xs: string` | No | VAT Number Entity Αναφοράς |  |
| `paymentMethodDetails` | `PaymentMethodDetailType` | Yes | Τρόποι Payment |  |

## 5 Schema description invoice

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `uid` | `xs:string` | No | Identifier Invoice την Service | Length= 40 Συμπληρώνεται |
| `mark` | `xs:long` | No | Μοναδικός Number Καταχώρησης Invoice | Συμπληρώνεται από την Service |
| `cancelledByMark` | `xs:long` | No | Μοναδικός Καταχώρησης Ακυρωτικού | Number την Service |
| `authenticationCode` | `xs:string` | No | Συμβολοσειρά Αυθεντικοποίησης in the case που η αποστολή γίνεται από παρόχους | Συμπληρώνεται την Service only |
| `transmissionFailure` | `xs:byte` | No | Αδυναμία Επικοινωνίας Παρόχου Οι τιμές {1,2,4} είναι ή Διαβίβασης Δεδομένων από ERP 1 : Στην case αδυναμίας επικοινωνίας οντότητας με τον πάροχο κατά την έκδοση/διαβίβαση invoice 2 : Στην case αδυναμίας επικοινωνίας του παρόχου με το myDATA κατά την έκδοση/ διαβίβαση invoice, 4 : Στην case invoices οντοτήτων της περ. γ’ της παρ. 2 του άρθρου 5 του ν. 1138/2020 (οντότητες παροχής ηλεκτρικής ενέργειας και φυσικού αερίου (Δ.Ε.Η. και λοιποί πάροχοι), η Ε.Υ.Δ.Α.Π, κλπ…), ενώ η τιμή {3} είναι επιτρεπτή only για case αποστολής από ERP: 3 : Απώλεια διασύνδεσης | Επιτρεπτές τιμές {1,4}. Αδυναμία επιτρεπτές only για case αποστολής από παρόχους: |
| `issuer` | `PartyType` | No | Issuer Invoice |  |
| `counterpart` | `PartyType` | No | Counterpart Invoice |  |
| `paymentMethods` | `PaymentMethodDetailType` | No | Τρόποι Payment |  |
| `invoiceHeader` | `InvoiceHeaderType` | Yes | Header Invoice |  |
| `invoiceDetails` | `InvoiceRowType` | Yes | Lines Invoice |  |
| `taxesTotals` | `TaxesType` | No | Totals Taxes |  |
| `invoiceSummary` | `InvoiceSummaryType` | Yes | Summary Invoice |  |
| `qrCodeUrl` | `xs:string` | No | Κωδικοποιημένο αλφαριθμητικό για να χρησιμοποιηθεί από τα προγράμματα για τη δημιουργία QR Code τύπου Url | Συμπληρώνεται την Service |
| `downloadingInvoiceUrl xs:string` |  | No | • url όπου ο λήπτης του invoice με κλήση ορισμό παραμέτρου θα μπορεί να λαμβάνει το invoice • αυτό το url θα πρέπει να χρησιμοποιείται για τη δημιουργία του QR | Έγκυρο only in the case διαβίβασης αυτού |

## 5.1 Details οντότητας

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `vatNumber` | `xs:string` | Yes | VAT Number έγκυρος VAT Number | Οποιοσδήποτε |
| `country` | `xs:string` | Yes | Code Χώρας | Κωδικοί χωρών |
| `branch` | `xs:int` | Yes | Αρ. Εγκατάστασης | Min value = 0 |
| `name` | `xs:string` | No | Επωνυμία |  |
| `address` | `AddressType No` | Address |  |  |
| `documentIdNo` | `xs:string` | No | Number επίσημου εγγράφου case invoice tax free (specialInvoiceCategory = 4) | Maximum length 100. Έγκυρο only |
| `supplyAccountNo` | `xs:string` | No | Αρ. Παροχής Maximum Ηλ. Ρεύματος length 100. Έγκυρο only case invoices καυσίμων | allowed in the |
| `countryDocumentId` | `xs:string` | No | Κωδ. Χώρας Κωδικοί χωρών Έκδοσης Επίσημου Εγγράφου |  |

## 5.1.1 Address Entity

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `street` | `xs:string` | No | Street |  |
| `number` | `xs:string` | No | Number |  |
| `postalCode` | `xs:string` | Yes | ΤΚ |  |
| `city` | `xs:string` | Yes | City |  |

## 5.2 Payment Method

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `type` | `xs:int` | Yes | Type Payment | Min value = 1 Max value = 5 |
| `amount` | `xs:decimal` | Yes | Amount Payment Minimum | τιμή = 0 Decimal places = 2 |
| `paymentMethodInfo` | `xs:string` | No | Information |  |
| `tipAmount` | `xs:decimal` | No | Amount φιλοδωρήματος τιμή = 0 | Minimum Decimal places = 2 |
| `transactionId` | `xs:string` | No | Μοναδική Ταυτότητα Payment |  |
| `tid` | `xs:string` | No | Code POS | tid allowed length 200 |
| `ProvidersSignature` | `ProviderSignatureType No` |  | Payment Signature Παρόχου |  |
| `ECRToken` | `ECRTokenType` | No | Payment Signature ΦΗΜ με σύστημα λογισμικού (ERP) |  |

## 5.2.1 Payment Signature Παρόχου

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `SigningAuthor` | `xs:string Yes` |  | Number Απόφασης έγκρισης ΥΠΑΗΕΣ Παρόχου | Max length 20 |
| `Signature` | `xs:string Yes` |  | Signature | Λεπτομέρειες in the αριθμ. 1155/09-102023 απόφαση (ΦΕΚ Β΄/13.10.2023), όπως ισχύει |
| `EndToEndReferenceID xs:string No` |  |  | Το μοναδικό αναγνωριστικό αιτήματος πληρωμής (για πληρωμές IRIS) |  |

## 5.2.2 Payment Signature ΦΗΜ με σύστημα λογισμικού (ERP)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `SigningAuthor xs:string` |  | Yes | ECR id: Number Maximum μητρώου του allowed φορολογικού μηχανισμού | length 20 |
| `Signature` | `xs:string` | Yes | Signature | Λεπτομέρειες in the υπ’ αριθμ. Α. 1155/09-102023 απόφαση (ΦΕΚ Β΄/13.10.2023), όπως ισχύει |

## 5.3 Header invoice

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `series` | `xs:string` | Yes | Series invoice length 50 | Maximum allowed |
| `aa` | `xs:string` | Yes | ΑΑ Invoice allowed length 50 | Maximum |
| `issueDate` | `xs:date` | Yes | Ημ. Έκδοσης Invoice |  |
| `invoiceType` | `xs:string` | Yes | Item Invoice 1.4, 1.5, 1.6, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 4, 5.1, 5.2, 6.1, 6.2, 7.1, 8.1, 8.2,8.3, 8.4, 8.5, 8.6, 9.1, 9.2, 9.3, 10.1, 11.1, 11.3, 11.5, 13.1, 13.3, 13.30, 13.31, 14.1, 14.3, 14.5, 14.30, 14.31, 15.1, 16.1, 17.2, 17.4, 17.6. [Για case των παρόχων only οι τιμές | Value list: 1.1, 1.2, 1.3, 10.2, 11.2, 11.4, 12, 13.2, 13.4, 14.2, 14.4, 17.1, 17.3, 17.5, την |

## 5.3.1 Other Συσχετιζόμενες Οντότητες

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `type` | `xs:int` | Yes | Category Entity | Πίνακας Παραρτήματος |
| `entityData` | `PartyType` | Yes | Details Entity (Προσώπου) |  |

## 5.3.2 Λοιπά Γενικά Details Movement

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `loadingAddress` | `AddressType` | Yes | Address Φόρτωσης | Συμπληρώνεται για invoices που είναι δελτία αποστολής (π.χ 9.3) ή τιμολόγιο και αποστολής (isDeliveryNote = true) |
| `deliveryAddress` | `AddρessType Yes` |  | Address Παράδοσης | Συμπληρώνεται για invoices που είναι δελτία αποστολής (π.χ 9.3) ή τιμολόγιο και αποστολής (isDeliveryNote = true) |
| `startShippingBranch` | `xs:int` | No | Branch έναρξης διακίνησης (Εκδότη) | Συμπληρώνεται για invoices που είναι δελτία αποστολής (π.χ 9.3) ή τιμολόγιο και αποστολής (isDeliveryNote = true) |
| `completeShippingBranch xs:int` |  | No | Branch ολοκλήρωσης διακίνησης (Λήπτη) | Συμπληρώνεται για invoices που είναι δελτία αποστολής (π.χ 9.3) ή τιμολόγιο και αποστολής (isDeliveryNote = true) |

## 5.4 Details invoice

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `lineNumber` | `xs:int` | Yes | ΑΑ γραμμής | Min value = 1 |
| `recType` | `xs:int` | No | Item Line | Min value = 1 Max value = 7 Σημείωση: παρούσα έκδοση οι τιμές 1, 4 και 5 δεν θα χρησιμοποιηθούν – έχουν δεσμευτεί στο μοντέλο μελλοντική χρήση |
| `fuelCode` | `FuelCodes` | No | Code Καυσίμου | Κωδικοί (List αναλυτικά οι τιμές στο παράρτημα) Accepted only για την case που το invoice είναι invoice καυσίμων |
| `quantity` | `xs:decimal` | No | Quantity | Min value = 0 |
| `measurementUnit` | `xs:int` | No | Item Quantity | Value list: Στο παράτημα λεπτομέρειες |
| `invoiceDetailType` | `xs:int` | No | Επισήμανση | Value list: 1,2 |
| `netValue` | `xs:decimal` | Yes | Καθαρή αξία | Min value = 0 Decimal places = 2 |
| `vatCategory` | `xs:int` | Yes | Category VAT | Value list: Στο παράτημα λεπτομέρειες |
| `vatAmount` | `xs:decimal` | Yes | Amount VAT | Min value = 0 Decimal places = 2 |
| `vatExemptionCategory` | `xs:int` | No | Category Reason Εξαίρεσης VAT | Value list: Στο παράτημα λεπτομέρειες |
| `dienergia` | `ShipType` | No | ΠΟΛ 1177/2018 Αρ. 27 |  |
| `discountOption` | `xs:boolean` | No | Δικαίωμα Έκπτωσης | False / True |
| `withheldAmount` | `xs:decimal` |  | No Παρακράτησης Φόρου | Amount Decimal places = 2 |
| `withheldPercentCategory` | `xs:int` |  | No Συντελεστή Παρακράτησης Φόρου | Category Στο παράτημα λεπτομέρειες |
| `stampDutyAmount` | `xs: decimal` |  | No Τέλους συναλλαγής | Amount Ψηφιακού Decimal places = 2 |
| `stampDutyPercentCategory` | `xs:int` |  | No Συντελεστή Ψηφιακού Τέλους συναλλαγής | Category Στο παράτημα λεπτομέρειες |
| `feesAmount` | `xs:decimal` |  | No | Amount Τελών Decimal places = 2 |
| `feesPercentCategory` | `xs:int` |  | No Συντελεστή Τελών | Category Στο παράτημα λεπτομέρειες |
| `otherTaxesPercentCategory` | `xs:int` |  | No Συντελεστή Other Taxes | Category Στο παράτημα λεπτομέρειες |
| `otherTaxesAmount` | `xs:decimal` |  | No Taxes | Amount Other Decimal places = 2 |
| `deductionsAmount` | `xs:decimal` |  | No | Amount Κρατήσεων Decimal places = 2 |
| `lineComments` | `xs:string` |  | No | Comments Line |
| `incomeClassification` | `IncomeClassificationType` |  | No Income | Classifications |
| `expensesClassification` | `ExpensesClassificationType` |  | No Expenses | Classifications |
| `quantity15` | `xs:decimal` |  | No Θερμοκρασίας 15 βαθμών | Quantity Accepted only in the case αποστολής παρόχους και για την case που το invoice invoice καυσίμων |
| `itemDescr` | `xs:string` |  | No Item tax free ή που είναι τιμολόγια και δελτία αποστολής ή απλά δελτία (π.χ 9.3) | Description length 300. Accepted only in the case invoices ειδικής κατηγορίας διακίνησης |
| `TaricNo` | `xs:string` | No | Code Taric | Mandatory length 10. Accepted only in the case invoices που είναι τιμολόγια και δελτία αποστολής ή απλά διακίνησης (π.χ 9.3) |
| `itemCode` | `xs:string` | No | Item Code | Max length 50. Accepted only in the case invoices που είναι τιμολόγια και δελτία αποστολής ή απλά διακίνησης (π.χ 9.3) |
| `otherMeasurementUnitQuantity xs:int` |  | No Measurement Pieces Άλλα | Πλήθος Unit Accepted only in the case measurementUnit = 7 (Pieces_Other Cases) | που |
| `otherMeasurementUnitTitle` | `xs:string` | No Measurement Pieces Άλλα | Τίτλος Unit Accepted only in the case measurementUnit = 7 (Pieces_Other Cases) | που |
| `notVAT195` | `xs:boolean` | No | Indication μη συμμετοχής στο VAT (έσοδα – εκροές) | Accepted only για invoices εσόδων μεταξύ των τύπων 1.1 – 11.5 |
| `movePurposeLine` | `xs:int` | No | Movement Purpose Line | Value list: Στο παράτημα λεπτομέρειες (Σκοποί Movement) |
| `otherMovePurposeLineTitle` | `xs:string` | No Reason Movement Line | Τίτλος της Λοιπής |  |

## 5.4.1 Statement Activity (ΠΟΛ 1177/2018 Αρ. 27)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `applicationId` | `xs:string` | Yes | Number Δήλωσης Activity Δραστηριότητας |  |
| `applicationDate` | `xs:date` | Yes | Ημερομηνία Δήλωσης |  |
| `doy` | `xs:string` | No | ΔΟΥ Δήλωσης |  |
| `shipID` | `xs:string` | Yes | Details Πλοίου |  |

## 5.5 Totals Taxes

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `taxType` | `xs:byte` | Yes | Item Φόρου 1 = Παρακρατούμενος Φόρος 2 = Fees 3 = Other Taxes 4 = Ψηφιακού Τέλος συναλλαγής 5 = Deductions | Value list: |
| `taxCategory` | `xs:byte` | No | Category Φόρου | Min value = 1 |
| `underlyingValue` | `xs:decimal` | No | Υποκείμενη Value Decimal places = 2 | Min value = 0 |
| `taxAmount` | `xs:decimal` | Yes | Amount Φόρου Decimal places = 2 | Min value = 0 |
| `id` | `xs:byte` | No | Αύξων αριθμός γραμμής |  |

## 5.6 Summary invoice

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `totalNetValue` | `xs:decimal` | Yes | Total Καθαρής Value | Min value = 0 Decimal places = 2 |
| `totalVatAmount` | `xs:decimal` | Yes | Total VAT | Min value = 0 Decimal places = 2 |
| `totalWithheldAmount` | `xs:decimal` | Yes | Total Παρακρατήσεων Taxes | Min value = 0 Decimal places = 2 |
| `totalFeesAmount` | `xs:decimal` | Yes | Total Τελών | Min value = 0 Decimal places = 2 |
| `totalStampDutyamount` | `xs:decimal` | Yes | Total Ψηφιακού Τέλους συναλλαγής | Min value = 0 Decimal places = 2 |
| `totalOtherTaxesAmount` | `xs:decimal` | Yes | Total Other Taxes | Min value = 0 Decimal places = 2 |
| `totalDeductionsAmount` | `xs:decimal` | Yes | Total Κρατήσεων | Min value = 0 Decimal places = 2 |
| `totalGrossValue` | `xs:decimal` | Yes | Total Value | Min value = 0 Decimal places = 2 |
| `incomeClassification` | `IncomeClassificationType` | No | Classifications Income |  |
| `expensesClassification` | `ExpensesClassificationType` | No | Classifications Expenses |  |

## 5.7 Information Other Μεταφορικών Μέσων (Καταργήθηκε)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `vehicleNumber` | `xs:string` | Yes | Number Μεταφορικού Μέσου | Max length 50 |

## 5.8 Classification Income

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `classificationType` | `xs: string` | No | Code Classification | Value list: Στο σχετικό παράτημα λεπτομέρειες |
| `classificationCategory` | `xs: string` | Yes | Category Classification | Value list: Στο σχετικό παράτημα λεπτομέρειες |
| `amount` | `xs:decimal` | Yes | Amount | Min value = 0 Decimal places = 2 |
| `id` | `xs:byte` | No | Αύξων αριθμός Classification |  |

## 5.9 Classification Expenses

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `classificationType` | `xs: string` | No | Code Classification | Value list: Στο σχετικό παράτημα λεπτομέρειες |
| `classificationCategory` | `xs: string` | No | Category Classification | Value list: Στο σχετικό παράτημα λεπτομέρειες |
| `amount` | `xs:decimal` | Yes | Amount | Min value = 0 Decimal places = 2 |
| `vatAmount` | `xs:decimal` | No | Amount VAT | Min value = 0 Decimal places = 2 |
| `vatCategory` | `xs:byte` | No | Category VAT | Value list: Στο σχετικό παράτημα λεπτομέρειες |
| `vatExemptionCategory xs:byte` |  | No | Category Εξαίρεσης VAT | Value list: Στο σχετικό παράτημα λεπτομέρειες |
| `id` | `xs:byte` | No | Αύξων αριθμός Classification |  |

## 5.10.1 Information Packaging (PackagingDetailType)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `packagingType` | `xs:int` | Yes | Item Packaging | Value list: Στο παράτημα λεπτομέρειες |
| `quantity` | `xs:int` | Yes | Πλήθος |  |
| `otherPackagingTypeTitle xs: string` |  | No | Τίτλος για Λοιπά Maximum allowed Είδη Packaging | length 150 |

## 6.1 Υποβολή Δεδομένων

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `index` | `xs: int` | No | Entity Row Number εντός του υποβληθέντος xml |  |
| `statusCode` | `xs: string` | Yes | Result Code | Success, ValidationError, TechnicalError, XMLSyntaxError |
| `invoiceUid` | `xs: string` | No | Identifier Invoice | Length = 40 |
| `invoiceMark` | `xs: long` | No | Μοναδικός Number Καταχώρησης Invoice |  |
| `classificationMark` | `xs: long` | No | Μοναδικός Number Παραλαβής Classification |  |
| `authenticationCode xs: string` |  | No | Συμβολοσειρά Αυθεντικοποίησης |  |
| `cancellationMark` | `xs: long` | No | Μοναδικός Number Ακύρωσης |  |
| `qrUrl` | `xs: string` | No | Κωδικοποιημένο αλφαριθμητικό | Χρησιμοποιείται από τα προγράμματα για τη δημιουργία QR |

## 6.2 Λήψη Δεδομένων

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `continuationToken` | `continuationTokenType` | No | Στοιχείο για την τμηματική λήψη αποτελεσμάτων |  |
| `invoicesDoc` | `AadeBookInvoiceType` | No | List Invoices |  |
| `cancelledInvoicesDoc` | `CancelledInvoiceType` | No | List ακυρώσεων |  |
| `invoiceMark` | `xs:long` | Yes | ΜΑΡΚ ακυρώθηκε | invoice που |
| `cancellationMark` | `xs:long` | Yes | ΜΑΡΚ ακύρωσης |  |
| `cancellationDate` | `xs:date` | Yes | Ημερομηνία ακύρωσης |  |
| `incomeClassificationsDoc` | `InvoiceIncomeClassificationType` | No | List Χαρακτηρισμών Income |  |
| `expensesClassificationsDoc` | `InvoiceExpensesClassificationType` | No | List Χαρακτηρισμών Expenses |  |
| `paymentMethodsDoc` | `PaymentMethodType` | No | List Τρόπων Payment |  |
| `nextPartitionKey` | `xs:string` | Yes | Παράμετρος κλήση λήψης | για |
| `nextRowKey` | `xs:string` | Yes | Παράμετρος κλήση λήψης | για |

## 6.3 Λήψη Στοιχείων Income - Expenses

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `continuationTokencontinuationTokenType No` |  | Στοιχείο για την τμηματική λήψη αποτελεσμάτων |  |  |
| `counterVatNumber xs:string` |  | No | VAT Number λήπτη |  |
| `issueDate` | `xs:date` | Yes Invoice | Ημερομηνία έκδοσης |  |
| `invType` | `xs:string` | Yes | Type Invoice |  |
| `selfpricing` | `xs:bool` | No | Αυτοτιμολόγηση |  |
| `invoiceDetailType` | `xs:int` | No | Επισήμανση |  |
| `netValue` | `xs:double` | No | Καθαρή αξία |  |
| `vatAmount` | `xs:double` | No | Amount VAT |  |
| `withheldAmount` | `xs:double` | No | Amount Παρακράτησης Φόρου |  |
| `otherTaxesAmount` | `xs:double` | No | Amount Other Taxes |  |
| `stampDutyAmount` | `xs:double` | No συναλλαγής | Amount Ψηφιακού Τέλους |  |
| `feesAmount` | `xs:double` | No | Amount Τελών |  |
| `deductionsAmount` | `xs:double` | No | Amount Κρατήσεων |  |
| `thirdPartyAmount` | `xs:double` | No | Amount Περί Τρίτων |  |
| `grossValue` | `xs:double` | No | Total Value |  |
| `count` | `xs:int` | Yes | Πλήθος |  |
| `minMark` | `xs:string` | No | Ελάχιστο ΜΑΡΚ πλήθους |  |
| `maxMark` | `xs:string` | No | Maximum ΜΑΡΚ πλήθους |  |

## 6.4 Λήψη Πληροφοριών για Details VAT

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `continuationToken` | `continuationTokenType No` | Στοιχείο για την τμηματική λήψη αποτελεσμάτων |  |  |
| `Mark` | `xs:string` | No | Το ΜΑΡΚ του invoice |  |
| `IsCancelled` | `xs:boolean` | No ακυρωμένο | Αν το invoice είναι |  |
| `IssueDate` | `xs:dateTime` | Yes invoice | Ημερομηνία έκδοσης |  |
| `Vat301` | `xs:decimal` | No | Amount VAT πεδίου 301 |  |
| `Vat302` | `xs:decimal` | No | Amount VAT πεδίου 302 |  |
| `Vat303` | `xs:decimal` | No | Amount VAT πεδίου 303 |  |
| `Vat304` | `xs:decimal` | No | Amount VAT πεδίου 304 |  |
| `Vat305` | `xs:decimal` | No | Amount VAT πεδίου 305 |  |
| `Vat306` | `xs:decimal` | No | Amount VAT πεδίου 306 |  |
| `Vat331` | `xs:decimal` | No | Amount VAT πεδίου 331 |  |
| `Vat332` | `xs:decimal` | No | Amount VAT πεδίου 332 |  |
| `Vat333` | `xs:decimal` | No | Amount VAT πεδίου 333 |  |
| `Vat334` | `xs:decimal` | No | Amount VAT πεδίου 334 |  |
| `Vat335` | `xs:decimal` | No | Amount VAT πεδίου 335 |  |
| `Vat336` | `xs:decimal` | No | Amount VAT πεδίου 336 |  |
| `Vat361` | `xs:decimal` | No | Amount VAT πεδίου 361 |  |
| `Vat362` | `xs:decimal` | No | Amount VAT πεδίου 362 |  |
| `Vat363` | `xs:decimal` | No | Amount VAT πεδίου 363 |  |
| `Vat364` | `xs:decimal` | No | Amount VAT πεδίου 364 |  |
| `Vat365` | `xs:decimal` | No | Amount VAT πεδίου 365 |  |
| `Vat366` | `xs:decimal` | No | Amount VAT πεδίου 366 |  |
| `Vat381` | `xs:decimal` | No | Amount VAT πεδίου 381 |  |
| `Vat382` | `xs:decimal` | No | Amount VAT πεδίου 382 |  |
| `Vat383` | `xs:decimal` | No | Amount VAT πεδίου 383 |  |
| `Vat384` | `xs:decimal` | No | Amount VAT πεδίου 384 |  |
| `Vat385` | `xs:decimal` | No | Amount VAT πεδίου 385 |  |
| `Vat386` | `xs:decimal` | No | Amount VAT πεδίου 386 |  |
| `Vat342` | `xs:decimal` | No | Amount VAT πεδίου 342 |  |
| `Vat345` | `xs:decimal` | No | Amount VAT πεδίου 345 |  |
| `Vat348` | `xs:decimal` | No | Amount VAT πεδίου 348 |  |
| `Vat349` | `xs:decimal` | No | Amount VAT πεδίου 349 |  |
| `Vat310` | `xs:decimal` | No | Amount VAT πεδίου 310 |  |
| `Vat402` | `xs:decimal` | No | Amount VAT πεδίου 402 |  |
| `Vat407` | `xs:decimal` | No | Amount VAT πεδίου 407 |  |
| `Vat411` | `xs:decimal` | No | Amount VAT πεδίου 411 |  |
| `Vat423` | `xs:decimal` | No | Amount VAT πεδίου 423 |  |
| `Vat422` | `xs:decimal` | No | Amount VAT πεδίου 422 |  |
| `VatUnclassified361 xs:decimal` |  | No χαρακτηρισμένα | Amount VAT πεδίου | 361 |
| `VatUnclassified381 xs:decimal` |  | No χαρακτηρισμένα | Amount VAT πεδίου | 381 |

## 7 Σφάλματα

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `message` | `xs: string` | Yes | Μήνυμα Σφάλματος |  |
| `code` | `xs: string` | Yes | Code Σφάλματος |  |

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `{'Amount Τελών', Category` | `{‘stampDutyAmount,` |  |  |  |
| `Ποσοστού Τελών'},` | `‘stampDutyPercentCategory’` |  |  |  |
| `{'Amount Ψηφιακού Τέλους` | `},` |  |  |  |
| `συναλλαγής,' Category` | `{‘withheldAmount’,` |  |  |  |
| `Ποσοστού Ψηφιακού Τέλους` | `‘withheldPercentCategory’}]` |  |  |  |
| `συναλλαγής},` |  |  |  |  |
| `{'Παρακρατηθέν Amount',` |  |  |  |  |
| `'Category` |  |  |  |  |
| `Παρακρατηθέντος` |  |  |  |  |
| `Ποσοστού'}]` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 228 | Invoice | Το {Field} δεν είναι έγκυρο |
| `[Πιθανές τιμές {Field}: {UID,` | `[Possible {Field} values: {UID,` |  |  |  |
| `Type Τιμολογίου}` | `InvoiceType}` |  |  |  |
| `[Αφορά only τους` | `[Αφορά` | only | τους |  |
| `παρόχους]` | `παρόχους]` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 229 | Invoice | Το {Field1} δεν είναι σωστό |
| `σύμφωνα με το δεδομένο:` | `according to the given:` |  |  |  |
| `{Field2} (γραμμή` | `{Field2}` | (invoice | line: |  |
| `τιμολογίου: {Number` | `{lineNumber})` |  |  |  |
| `Line})` | `[ Possible {Field1, Field2}` |  |  |  |
| `[Πιθανές τιμές {Field1,` | `values:` |  |  |  |
| `{'Amount Τελών', Category` | `feesPercentCategory’},` |  |  |  |
| `Ποσοστού Τελών'},` | `{‘stampDutyAmount,` |  |  |  |
| `{'Amount Ψηφιακού Τέλους` | `‘stampDutyPercentCategory’` |  |  |  |
| `συναλλαγής,' Category` | `},` |  |  |  |
| `Ποσοστού Ψηφιακού Τέλους` | `{‘withheldAmount’,` |  |  |  |
| `συναλλαγής},` | `‘withheldPercentCategory’}]` |  |  |  |
| `{'Παρακρατηθέν Amount',` | `[Αφορά` | only | τους |  |
| `'Category` | `παρόχους]` |  |  |  |
| `Παρακρατηθέντος` |  |  |  |  |
| `Ποσοστού'}]` |  |  |  |  |
| `[Αφορά only τους` |  |  |  |  |
| `παρόχους]` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 230 | Invoice | Το {Field} είναι |
| `υποχρεωτικό για στοιχεία` | `invoice detail (number}` |  |  |  |
| `τιμολογίου (αριθμός}` | `[Possible {Field} values: {E3` |  |  |  |
| `[Πιθανές τιμές {Field} :` | `classifications,` | VAT |  |  |
| `{Ταξινομήσεις E3,` | `classifications}` |  |  |  |
| `ταξινομήσεις VAT}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 231 | Invoice | Το {Field} απαγορεύεται |
| `για στοιχεία τιμολογίου` | `invoice detail (number}` |  |  |  |
| `(αριθμός}` | `[Possible {Field} values: {E3` |  |  |  |
| `[Πιθανές τιμές {Field} :` | `classifications,` | VAT |  |  |
| `{Ταξινομήσεις E3,` | `classifications}` |  |  |  |
| `ταξινομήσεις VAT}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 233 | Invoice | UID: Το " + {uid} + " έχει ήδη |
| `σταλεί [Αφορά only τους` | `been` | sent |  |  |
| `παρόχους]` | `[Αφορά παρόχους]` | only | τους |  |
| `HTTP 200 OK` | `ValidationError` | 234 | Invoice | Οι τιμές 7 ή 8 δεν |
| `επιτρέπονται για την` | `allowed for Vat Category for` |  |  |  |
| `κατηγορία VAT για αυτόν` | `this invoice type` |  |  |  |
| `τον τύπο τιμολογίου` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 235 | Invoice | Ο εκδότης πρέπει να είναι |
| `διαφορετικός από τον` | `from counterpart` |  |  |  |
| `αντίστοιχο` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 236 | Invoice | Ο Αποστολέας (VAT Number): " + |
| `{VAT Number} + " πρέπει να είναι` | `{afm} + " must be different` |  |  |  |
| `διαφορετικός από τον` | `from the issuer (vatnumber)` |  |  |  |
| `εκδότη (VAT Number)` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 237 | Invoice | Η υποκείμενη αξία(εις) των |
| `φόρων δεν μπορεί να είναι` | `cannot be greater than the` |  |  |  |
| `μεγαλύτερη από τη` | `total net value of invoice` |  |  |  |
| `συνολική καθαρή αξία του` |  |  |  |  |
| `τιμολογίου` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 239 | Invoice | Ο φόρος (α) των φόρων δεν |
| `μπορεί να είναι` | `cannot be greater than the` |  |  |  |
| `μεγαλύτερος από τη` | `total net value of invoice` |  |  |  |
| `συνολική καθαρή αξία του` |  |  |  |  |
| `τιμολογίου` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 240 | Invoice | Amount Φόρου {Amount Φόρου} |
| `της Line Φόρου: Το` | `taxline: {A/A} cannot be` |  |  |  |
| `{A/A} δεν μπορεί να είναι` | `greater` | than | the |  |
| `μεγαλύτερο από την` | `corresponding` | underlying |  |  |
| `αντίστοιχη υποκείμενη αξία` | `value` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 241 | Invoice | Το {Field1} δεν μπορεί να |
| `είναι μεγαλύτερο από την` | `than the corresponding` |  |  |  |
| `αντίστοιχη καθαρή αξία` | `invoiceline net value (invoice` |  |  |  |
| `γραμμής τιμολογίου` | `line: + {linenumber} )` |  |  |  |
| `(Line Τιμολογίου: +` | `[ Possible {Field1} values:` |  |  |  |
| `{αριθμός γραμμής})` | `{‘feesAmount’,` |  |  |  |
| `[Πιθανές τιμές {Field1}:` | `‘otherTaxesPercentAmount’,` |  |  |  |
| `{'Amount Τελών', 'Amount` | `‘stampDutyAmount,` |  |  |  |
| `Ποσοστού Other Taxes',` | `‘withheldAmount’}]` |  |  |  |
| `'Amount Τέλους Ψηφιακού` |  |  |  |  |
| `Τέλους συναλλαγής,` |  |  |  |  |
| `'Παρακρατηθέν Amount'}]` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 242 | Invoice | Η χώρα του {Field} για |
| `αυτόν τον τύπο τιμολογίου` | `invoice type must be Greece` |  |  |  |
| `πρέπει να είναι η Ελλάδα` | `[Possible {Field} values:` |  |  |  |
| `[Πιθανές τιμές {Field}:` | `{Issuer, Counterpart}` |  |  |  |
| `{Issuer,` |  |  |  |  |
| `Counterpart}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 243 | Invoice | Η χώρα του {Field} για |
| `αυτόν τον τύπο τιμολογίου` | `invoice type must be in` |  |  |  |
| `πρέπει να είναι in the` | `Europe but not Greece` |  |  |  |
| `Ευρώπη αλλά όχι in the` | `[Possible {Field} values:` |  |  |  |
| `Ελλάδα` | `{Issuer, Counterpart}` |  |  |  |
| `[Πιθανές τιμές {Field}:` |  |  |  |  |
| `{Issuer,` |  |  |  |  |
| `Counterpart}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 244 | Invoice | Η χώρα του {Field} για |
| `αυτόν τον τύπο τιμολογίου` | `invoice type must not be in` |  |  |  |
| `δεν πρέπει να είναι in the ΕΕ` | `EU` |  |  |  |
| `[Πιθανές τιμές {Field}:` | `[Possible {Field} values:` |  |  |  |
| `{Issuer,` | `{Issuer, Counterpart}` |  |  |  |
| `Counterpart}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 245 | Invoice | Ο πάροχος δεν είναι |
| `εξουσιοδοτημένος να` | `issue` | Invoices | for: |  |
| `εκδίδει τιμολόγια για:` | `{vatNumber}` |  |  |  |
| `{VAT Number}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 246 | Invoice | Το τιμολόγιο τύπου 1.5 |
| `πρέπει να έχει τουλάχιστον` | `have at least one line with` |  |  |  |
| `μία γραμμή με: Type` | `detailtype = 1 and one with` |  |  |  |
| `Στοιχείου = 1 και μία με:` | `detail type=2` |  |  |  |
| `Type Στοιχείου = 2` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 247 | Invoice | Line τιμολογίου: |
| `{Number Line}. Το` | `{Field} is forbidden.` |  |  |  |
| `{Field} είναι` | `[Possible {Field} values:` |  |  |  |
| `απαγορευμένο.` | `{recType=1,` | recType=4, |  |  |
| `[Πιθανές τιμές {Field}:` | `recType=5}` |  |  |  |
| `{Type rec =1, Type rec =4,` |  |  |  |  |
| `Type rec =5}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 248 | Invoice | Το τιμολόγιο με MARK |
| `{mark} δεν μπορεί να` | `cannot be cancelled because` |  |  |  |
| `ακυρωθεί επειδή δεν` | `was not posted by VAT` |  |  |  |
| `δημοσιεύτηκε από τον VAT Number` | `number {vat}` |  |  |  |
| `{VAT Number}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 249 | Invoice | Το τιμολόγιο με MARK |
| `{mark} δεν μπορεί να` | `cannot be cancelled because` |  |  |  |
| `ακυρωθεί λόγω` | `of being posted by provider` |  |  |  |
| `δημοσίευσης από τον` |  |  |  |  |
| `πάροχο` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 250 | Invoice | Το τιμολόγιο με MARK |
| `{mark} δεν μπορεί να` | `cannot be cancelled because` |  |  |  |
| `ακυρωθεί επειδή` | `of being posted by myDATA` |  |  |  |
| `δημοσιεύτηκε από την` | `Invoicing` |  |  |  |
| `τιμολόγηση myDATA` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 251 | Invoice | Το τιμολόγιο με MARK |
| `{mark} δεν μπορεί να` | `cannot be cancelled because` |  |  |  |
| `ακυρωθεί επειδή έχει ήδη` | `of being already cancelled` |  |  |  |
| `ακυρωθεί` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 252 | Invoice | Η εγγραφή με MARK {mark} |
| `δεν είναι έγκυρο τιμολόγιο` | `not a valid Invoice` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 253 | Invoice | Η Issue Date δεν |
| `είναι έγκυρη, πρέπει να` | `be greater or equal than` |  |  |  |
| `είναι μεγαλύτερη ή ίση με` | `{date} and less or equal than` |  |  |  |
| `{ημερομηνία} και μικρότερη` | `current date` |  |  |  |
| `ή ίση με την τρέχουσα` | `[Δεν αφορά τους παρόχους]` |  |  |  |
| `ημερομηνία` |  |  |  |  |
| `[Δεν αφορά τους παρόχους]` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 254 | Invoice | Line Φόρου (Totals |
| `Φόρου): + {Number Line` | `{taxlinenumber} . {field +` |  |  |  |
| `Φόρου}. Το {Field +` | `fieldData} is forbidden` |  |  |  |
| `Δεδομένα Πεδίου}` |  |  |  |  |
| `απαγορεύεται` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 255 | Invoice | Το τιμολόγιο με MARK |
| `{mark} δεν μπορεί να` | `cannot be cancelled because` |  |  |  |
| `ακυρωθεί επειδή είναι` | `it is connected with active` |  |  |  |
| `συνδεδεμένο με ενεργό` | `invoice with MARK {mark1}` |  |  |  |
| `τιμολόγιο με MARK {mark1}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 256 | Invoice | Το τιμολόγιο με MARK |
| `{mark} δεν μπορεί να` | `cannot be classified because` |  |  |  |
| `ταξινομηθεί επειδή έχει ήδη` | `of being already cancelled` |  |  |  |
| `ακυρωθεί` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 257 | Invoice | Το τιμολόγιο με MARK |
| `{mark} δεν μπορεί να` | `cannot be cancelled because` |  |  |  |
| `ακυρωθεί επειδή έχει` | `of` | being | posted | by |
| `αναρτηθεί από το` | `TaxRegister` |  |  |  |
| `Φορολογικό Μητρώο` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 258 | Invoice | Όλες οι σειρές τιμολογίων |
| `πρέπει να έχουν {Field}` | `{Field}` |  |  |  |
| `[Πιθανές τιμές {Field}:` | `[Possible {Field} values:` |  |  |  |
| `{Type rec =3}` | `{recType=3}` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 259 | Invoice | Το τιμολόγιο δεν μπορεί να |
| `αναρτηθεί επειδή` | `because it replaces invoice` |  |  |  |
| `αντικαθιστά το τιμολόγιο με` | `with MARK {mark} having` |  |  |  |
| `MARK {mark} που έχει το` | `same UID and is still` |  |  |  |
| `ίδιο UID και εξακολουθεί να` | `connected` | with | active |  |
| `συνδέεται με ενεργά` | `invoices` |  |  |  |
| `τιμολόγια` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 260 | Invoice | Η Issue Date δεν |
| `είναι έγκυρη, πρέπει να` | `be less or equal than current` |  |  |  |
| `είναι μικρότερη ή ίση με την` | `date` |  |  |  |
| `τρέχουσα ημερομηνία` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 261 | Invoice | Κάθε σειρά τιμολογίου |
| `πρέπει να έχει μοναδικό` | `unique line number` |  |  |  |
| `αριθμό γραμμής` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 262 | Invoice | Το length {Field} πρέπει να |
| `είναι μικρότερο ή ίσο από το` | `equal than {number}` |  |  |  |
| `{αριθμός}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 263 | Invoice | Το τιμολόγιο με Τύπο |
| `Τροποποίησης Τιμολογίου` | `invoiceVariationType {field}` |  |  |  |
| `{Field} και Ημερομηνία` | `and IssueDate {issueDate}` |  |  |  |
| `Έκδοσης {Ημερομηνία` | `cannot be sent earlier than {` |  |  |  |
| `Έκδοσης} δεν μπορεί να` | `date}` |  |  |  |
| `σταλεί νωρίτερα από` | `[Possible` | {field} | values: |  |
| `{ημερομηνία}` | `{invoiceVariationType=1,2,3,4}` |  |  |  |
| `[Πιθανές τιμές {Field}:` |  |  |  |  |
| `{Type Τροποποίησης` |  |  |  |  |
| `Τιμολογίου =1,2,3,4}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 264 | Invoice | Το τιμολόγιο με Τύπο |
| `Τροποποίησης Τιμολογίου` | `invoiceVariationType {field}` |  |  |  |
| `{Field} δεν μπορεί να` | `cannot` | be | sent | for |
| `σταλεί για έτος` | `issueDate's year earlier than` |  |  |  |
| `Ημερομηνίας Έκδοσης` | `2021` |  |  |  |
| `νωρίτερα από το 2021` | `[Possible` | {field} | values: |  |
| `[Πιθανές τιμές {Field}:` | `{invoiceVariationType=1,2,3,` |  |  |  |
| `{Type Τροποποίησης` | `4}` |  |  |  |
| `Τιμολογίου=1,2,3,4}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 265 | Invoice | Ο μέγιστος επιτρεπόμενος |
| `αριθμός τιμολογίων που` | `number` | of | invoices |  |
| `περιέχονται σε ένα μήνυμα` | `contained in one message is` |  |  |  |
| `είναι 5000` | `5000` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 266 | Invoice | Το {msg11} είναι |
| `απαγορευμένο {msg2}` | `[Possible {msg1} values:` |  |  |  |
| `[Πιθανές τιμές {msg1}:` | `{‘Invoice with` |  |  |  |
| `{'Invoice με πεδίο Type` | `SpecialInvoiceCategoryType` |  |  |  |
| `Ειδικής Category` | `field with value 4 (taxfree invoice)’}` |  |  |  |
| `Τιμολογίου με τιμή 4` | `[Possible {msg2} values: {‘for` |  |  |  |
| `(αφορολόγητο τιμολόγιο)'}` | `invoices sent by provider` |  |  |  |
| `[Πιθανές τιμές {msg2}: {'για` | `channel’}` |  |  |  |
| `τιμολόγια που` |  |  |  |  |
| `αποστέλλονται από το` |  |  |  |  |
| `κανάλι παρόχου'}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 267 | Invoice | Το {msg11} επιτρέπεται |
| `{msg2}` | `[Possible {msg1} values:` |  |  |  |
| `[Πιθανές τιμές {msg1}:` | `{‘Invoice with` |  |  |  |
| `{'Invoice με πεδίο Type` | `SpecialInvoiceCategoryType` |  |  |  |
| `Ειδικής Category` | `field with value 4 (taxfree invoice)’}` |  |  |  |
| `Τιμολογίου με τιμή 4` | `[Possible {msg2} values: {‘only` |  |  |  |
| `(αφορολόγητο τιμολόγιο)'}` | `for invoices sent by erp or` |  |  |  |
| `[Πιθανές τιμές {msg2}:` | `timologio channel’}` |  |  |  |
| `{'only για τιμολόγια που` |  |  |  |  |
| `αποστέλλονται από κανάλι` |  |  |  |  |
| `erp ή timologio'}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 268 | Invoice | Στην case του |
| `Τιμολογίου Καυσίμων,` | `least one line must have` |  |  |  |
| `τουλάχιστον μία γραμμή` | `fuelCode different from 999` |  |  |  |
| `πρέπει να έχει Κωδικό` |  |  |  |  |
| `Καυσίμων διαφορετικό από το 999` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 269 | Invoice | Στην case του |
| `Τιμολογίου Καυσίμων, η` | `net value of the invoice line` |  |  |  |
| `καθαρή αξία της γραμμής` | `with fuelCode 999 must be` |  |  |  |
| `τιμολογίου με τον Κωδικό` | `less or equal than sum of net` |  |  |  |
| `Καυσίμων 999 πρέπει να` | `values of the other invoice` |  |  |  |
| `είναι μικρότερη ή ίση από το` | `lines` |  |  |  |
| `άθροισμα των καθαρών` |  |  |  |  |
| `αξιών των άλλων γραμμών` |  |  |  |  |
| `τιμολογίων` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 270 | Invoice | Στην case του |
| `Τιμολογίου Καυσίμων, only` | `one line can have fuelCode` |  |  |  |
| `μία γραμμή μπορεί να έχει` | `equal with 999` |  |  |  |
| `Κωδικό Καυσίμων ίσο με` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 271 | Invoice | Number γραμμής |
| `τιμολογίου: {αριθμός` | `{linenumber}.` |  |  |  |
| `γραμμής}. Το πεδίο` | `VatExemptionCategory field` |  |  |  |
| `Category Απαλλαγής VAT` | `is used only in case of` |  |  |  |
| `χρησιμοποιείται only in the` | `vatCategory = 7` |  |  |  |
| `case Category VAT =7` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 272 | Invoice | Το {Field} είναι |
| `υποχρεωτικό +` | `{moreInfo}` |  |  |  |
| `{Περισσότερες` | `[{moreInfo} μπορεί να είναι` |  |  |  |
| `Information}` | `null]` |  |  |  |
| `[{Περισσότερες` |  |  |  |  |
| `Information} μπορεί να` |  |  |  |  |
| `είναι κενό]` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 273 | Invoice | Το {Field} δεν επιτρέπεται + |
| `{Περισσότερες` | `{moreInfo}` |  |  |  |
| `Information}` | `[{moreInfo} μπορεί να είναι` |  |  |  |
| `[{περισσότερες` | `null]` |  |  |  |
| `πληροφορίες} μπορεί να` |  |  |  |  |
| `είναι κενό]` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 274 | Invoice | Το {Field} είναι |
| `υποχρεωτικό για αυτόν τον` | `invoicetype + {moreInfo}` |  |  |  |
| `τύπο τιμολογίου +` | `[{moreInfo} μπορεί να είναι` |  |  |  |
| `{Περισσότερες` | `null]` |  |  |  |
| `Information}` |  |  |  |  |
| `[{περισσότερες` |  |  |  |  |
| `πληροφορίες} μπορεί να` |  |  |  |  |
| `είναι κενό]` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 275 | Invoice | Το μήνυμα δεν μπορεί να |
| `περιέχει τιμολόγια και` | `invoices` | and |  |  |
| `τιμολόγια/δελτία αποστολής` | `invoices/consignment notes` |  |  |  |
| `με το ίδιο uid` | `with the same uid` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 276 | Invoice | Το length του {Field} πρέπει |
| `να είναι ίσο με τον` | `with {number}` |  |  |  |
| `{αριθμός}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 277 | Invoice | Το μήνυμα δεν μπορεί να |
| `περιέχει τιμολόγια τύπου:` | `invoices` | of | type: |  |
| `{Type Τιμολογίου} με το` | `{invoiceType} with the same` |  |  |  |
| `ίδιο uid` | `uid` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 278 | Invoice | Η Issue Date δεν |
| `είναι έγκυρη, πρέπει να` | `be greater or equal with` |  |  |  |
| `είναι μεγαλύτερη ή ίση με` | `current date` |  |  |  |
| `την τρέχουσα ημερομηνία` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 279 | Invoice | Το τιμολόγιο με MARK |
| `{mark} δεν μπορεί να` | `cannot be cancelled +` |  |  |  |
| `ακυρωθεί + {Περισσότερες` | `{moreInfo}` |  |  |  |
| `Information}` | `[{moreInfo} μπορεί να είναι` |  |  |  |
| `[{περισσότερες` | `null]` |  |  |  |
| `πληροφορίες} μπορεί να` |  |  |  |  |
| `είναι κενό]` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 280 | Invoice | Η Ημερομηνία Αποστολής |
| `δεν είναι έγκυρη, πρέπει να` | `must be greater or equal` |  |  |  |
| `είναι μεγαλύτερη ή ίση με` | `with current date` |  |  |  |
| `την τρέχουσα ημερομηνία` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 281 | Invoice | Invoice τύπου 8.6 με |
| `totalCancelDeliveryOrders =` | `totalCancelDeliveryOrders =` |  |  |  |
| `αληθής, πρέπει να έχει only` | `true, must have only one` |  |  |  |
| `μία σειρά. Η καθαρή αξία` | `row. The net value and vat` |  |  |  |
| `και το ποσό του VAT αυτής` | `amount of this row must be` |  |  |  |
| `της σειράς πρέπει να είναι` | `equal with 0 and its vat` |  |  |  |
| `ίσα με 0 και η κατηγορία του` | `category must have value 8` |  |  |  |
| `VAT πρέπει να έχει τιμή 8` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 282 | Invoice | Το {msg1} πρέπει να έχει |
| `τιμή μεγαλύτερη ή ίση του` | `greater or equal than 0 for` |  |  |  |
| `μηδενός για αυτό΄ν τον τύπο` | `this invoice type` |  |  |  |
| `του invoice` | `[Possible {msg1} values:` |  |  |  |
| `[Πιθανές {msg1} τιμές: {‘Η` | `{‘NetValue per line, which have` |  |  |  |
| `καθαρή αξία κάθε γραμμής,με` | `recType = 6,’}` |  |  |  |
| `recType = 6,’}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 283 | Invoice | Το invoice με ΜΑΡΚ |
| `{mark} είναι {invoicetype` | `{invoiceType Value} invoice` |  |  |  |
| `value}.` | `Με` | την | type. | With |
| `CancelDeliveryNote μέθοδο` | `CancelDeliveryNote method` |  |  |  |
| `only` | `9.3` | invoices | only 9.3 invoice type can be |  |
| `μπορούν να ακυρωθούν` | `cancelled.` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 284 | Invoice | Περάστε το VAT Number οντότητας |
| `στις παραμέτρους σώμα του` | `entityVatNumber in the` |  |  |  |
| `http αιτήματος` | `request parameters` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 285 | Invoice | Ο πάροχος με {VAT Number |
| `Παρόχου}` | `δεν` | είναι | {vatNumber} | is |
| `εξουσιοδοτημένος` | `να` | authorised to execute this |  |  |
| `εκτελεί αυτή τη μέθοδο για:` | `method` | for: |  |  |
| `{VAT Number Entity}` | `{entityVatNumber}` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 286 | Invoice | Ο εκδότης πρέπει να είναι |
| `ίδιος με τον λήπτη` | `counterpart` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 287 | Invoice | Η χώρα του {Field} για |
| `αυτόν τον τύπο τιμολογίου` | `invoice type must not be` |  |  |  |
| `δεν πρέπει να είναι η` | `Greece` |  |  |  |
| `Ελλάδα` | `[Possible {Field} values:` |  |  |  |
| `[Πιθανές τιμές {Field}:` | `{Issuer, Counterpart}` |  |  |  |
| `{Issuer,` |  |  |  |  |
| `Counterpart}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 288 | Invoice | Η υποβολή τιμολογίου |
| `επιτρέπεται εντός δύο` | `allowed within two days` |  |  |  |
| `ημερών από την ημερομηνία` | `from the issue date when` |  |  |  |
| `έκδοσης όταν το` | `TransmissionFlag = 4` |  |  |  |
| `TransmissionFlag = 4` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 289 | Invoice | Το VAT Number του {Field} πρέπει |
| `να είναι 000000000` | `000000000` |  |  |  |
| `[Πιθανές τιμές {Field}:` | `[Possible {Field} values:` |  |  |  |
| `{Issuer,` | `{Issuer’s, Counterpart’s}` |  |  |  |
| `Counterpart}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 301 | Classification | Τα τιμολόγια με MARK |
| `{mark} δεν βρέθηκαν` | `requested not found` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 302 | Classification | Διπλότυπος αριθμός |
| `γραμμής ταξινόμησης` | `number {lineNumber}` |  |  |  |
| `{Number Line}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 303 | Classification | Ο αριθμός γραμμής |
| `{Number Line} δεν` | `not found in invoice with` |  |  |  |
| `βρέθηκε στο τιμολόγιο με MARK {mark}` | `MARK {mark}` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 304 | Classification | Όλες οι σειρές τιμολογίων ή |
| `καμία θα πρέπει να περιλαμβάνουν ταξινομήσεις` | `should have classifications included` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 305 | Classification | Line τιμολογίου: |
| `{Number Line}. Διπλότυπος τύπος` | `Duplicate classification type {classificationType}` |  |  |  |
| `ταξινόμησης {Type` | `category{classificationCateg` |  |  |  |
| `Ταξινόμησης} και κατηγορία` | `ory}` |  |  |  |
| `{Category Ταξινόμησης}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 306 | Classification | Line τιμολογίου: |
| `{Number Line}. Το` | `Sum of classifications are not` |  |  |  |
| `άθροισμα των ταξινομήσεων` | `equal to line's net value` |  |  |  |
| `δεν είναι ίσο με την καθαρή αξία της γραμμής` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 307 | Classification | Ο τύπος ταξινόμησης {Type |
| `Ταξινόμησης} απαγορεύεται για την κατηγορία` | `{classificationType} forbidden for Classification` | is |  |  |
| `ταξινόμησης {Category Ταξινόμησης}` | `category {classificationCategory}` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 308 | Classification | Η κατηγορία ταξινόμησης |
| `{Category Ταξινόμησης}` | `{classificationCategory}` | is |  |  |
| `απαγορεύεται για τον τύπο` | `forbidden for Invoice type` |  |  |  |
| `τιμολογίου {Type Ταξινόμησης}` | `{classificationType}` |  |  |  |
| `HTTP 200 OK` | `ValidationError Ταξινόμησης}` | 309 classifications are forbidden | Classification | Ταξινομήσεις {Τρόπος |
| `απαγορεύονται για` | `for invoice with mark {mark}` |  |  |  |
| `τιμολόγιο με σήμα {mark}` | `on behalf of vat number` |  |  |  |
| `για λογαριασμό του VAT Number` | `{vatNumber} for invoice row` |  |  |  |
| `{VAT Number} για σειρά τιμολογίου` | `with detail type {detailType}` |  |  |  |
| `με τύπο στοιχείου {Type Στοιχείου}` |  |  |  |  |
| `HTTP 200 OK` | `TechnicalError` | 310 | Classification | Όλες οι ταξινομήσεις |
| `τιμολογίων ή καμία θα` | `or none should have` |  |  |  |
| `πρέπει να έχουν τιμή` | `category` | value |  |  |
| `κατηγορίας {Category Ταξινόμησης}` | `{classificationCategory}` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 311 | Classification | Ταξινόμηση με τύπο {Type |
| `Ταξινόμησης} και κατηγορία` | `{classificationType}` | and |  |  |
| `" {Category Ταξινόμησης}` | `category` | " |  |  |
| `δεν βρέθηκε in the περίληψη τιμολογίων` | `{classificationCategory} not found in invoice summary` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 312 | Classification | Άθροισμα ταξινομήσεων με |
| `τύπο {Type Ταξινόμησης}` | `type {classificationType} and` |  |  |  |
| `και κατηγορία {Category` | `category` |  |  |  |
| `Ταξινόμησης} που δεν` | `{classificationCategory} not` |  |  |  |
| `ταιριάζει με το σχετικό` | `matching with related total` |  |  |  |
| `σύνολο in the περίληψη τιμολογίων` | `in invoice summary` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 313 | Classification | Ο τύπος ταξινόμησης {Type |
| `Ταξινόμησης} απαγορεύεται για την κατηγορία` | `{classificationType} forbidden for Classification` | is |  |  |
| `ταξινόμησης {Category` | `category` |  |  |  |
| `Ταξινόμησης} σε συνδυασμό` | `{classificationCategory}` |  |  |  |
| `με τον τύπο τιμολογίου` | `combined with invoice type` |  |  |  |
| `{Type Τιμολογίου}` | `{invoiceType}` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 314 | Classification | Όλα τα τιμολόγια πρέπει να |
| `περιέχουν είτε την ενότητα` | `either income or expenses` |  |  |  |
| `ταξινομήσεων εσόδων ή` | `classifications section, not` |  |  |  |
| `εξόδων, όχι και τις δύο ή καμία` | `both or none` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 315 | Classification | Οι χαρακτηρισμοί |
| `(ταξινομήσεις) VAT δεν` | `category` |  |  |  |
| `έχουν κατηγορία` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError χαρακτηρισμοί` | 316 allowed in case of VAT | Classification | Δεν επιτρέπονται |
| `(ταξινομήσεις) VAT σε` | `exemption` |  |  |  |
| `case απαλλαγής από τον VAT` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 317 | Classification | Details τιμολογίου |
| `{Number Line}: Η` | `: VAT classification must be` |  |  |  |
| `ταξινόμηση VAT πρέπει να` | `of type 366 in case` |  |  |  |
| `είναι τύπου 366 σε` | `vatExemptionCategory = 16` |  |  |  |
| `case Category` |  |  |  |  |
| `Απαλλαγής VAT = 16` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 318 | Invoice | Το στοιχείο {Field} πρέπει |
| `να έχει την ίδια τιμή με το συσχετισμένο` | `same value with correlated's one` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 319 | Invoice | Η καθαρή αξία του |
| `συσχετισμένου τιμολογίου` | `invoice already exceeded by` |  |  |  |
| `έχει ήδη υπερβεί το` | `sum of net values of invoices` |  |  |  |
| `άθροισμα των καθαρών` | `correlated to it` |  |  |  |
| `αξιών των τιμολογίων που` |  |  |  |  |
| `σχετίζονται με αυτό` |  |  |  |  |

## 8.2 Category Φ.Π.Α.

| Code | Description |
| :--- | :--- |
| 1 | VAT συντελεστής 24% — 24% |
| 2 | VAT συντελεστής 13% — 13% |
| 3 | VAT συντελεστής 6% — 6% |
| 4 | VAT συντελεστής 17% — 17% |
| 5 | VAT συντελεστής 9% — 9% |
| 6 | VAT συντελεστής 4% — 4% |
| 7 | Άνευ Φ.Π.Α. Εγγραφές χωρίς VAT — 0% |
| 8 | (πχ Payroll, Depreciation) VAT συντελεστής 3% (αρ.31 — - |
| 9 | ν.5057/2023) VAT συντελεστής 4% (αρ.31 — 3% |
| 10 | ν.5057/2023) — 4% |

## 8.4 Category Παρακρατούμενων Taxes

| Code | Description |
| :--- | :--- |
| 1 | Περιπτ. β’- Τόκοι - 15% — 15% |
| 2 | Περιπτ. γ’ - Δικαιώματα - 20% — 20% |
| 3 | Περιπτ. δ’ - Αμοιβές Συμβουλών Διοίκησης - 20% — 20% |
| 4 | Περιπτ. δ’ - Τεχνικά Έργα - 3% — 3% |
| 5 | Υγρά καύσιμα και προϊόντα καπνοβιομηχανίας 1% — 1% |
| 6 | Λοιπά Αγαθά 4% — 4% |
| 7 | Παροχή Υπηρεσιών 8% — 8% |
| 8 | Προκαταβλητέος Φόρος Αρχιτεκτόνων και Μηχανικών επί Συμβατικών Αμοιβών, για Εκπόνηση Μελετών και Σχεδίων 4% — 4% |
| 9 | Προκαταβλητέος Φόρος Αρχιτεκτόνων και Μηχανικών επί Συμβατικών Αμοιβών, που αφορούν οποιασδήποτε άλλης φύσης έργα 10% — 10% |
| 10 | Προκαταβλητέος Φόρος στις Αμοιβές Δικηγόρων 15% — 15% |
| 11 | Withholding Φόρου Μισθωτών Υπηρεσιών παρ. 1 αρ. 15 ν. 4172/2013 — ποσό |
| 12 | Withholding Φόρου Μισθωτών Υπηρεσιών παρ. 2 αρ. 15 ν. 4172/2013 Αξιωματικών Εμπορικού Ναυτικού — 15% |
| 13 | Withholding Φόρου Μισθωτών Υπηρεσιών παρ. 2 αρ. 15 ν. 4172/2013 Κατώτερο Πλήρωμα Εμπορικού Ναυτικού — 10% |
| 14 | Withholding Ειδικής Εισφοράς Αλληλεγγύης — ποσό |
| 15 | Withholding Φόρου Αποζημίωσης λόγω Διακοπής Σχέσης Εργασίας παρ. — ποσό |
| 16 | Παρακρατήσεις συναλλαγών αλλοδαπής βάσει συμβάσεων αποφυγής διπλής φορολογίας (Σ.Α.Δ.Φ.) — ποσό |
| 17 | Other Παρακρατήσεις Φόρου — ποσό |
| 18 | Withholding Φόρου Μερίσματα περ.α παρ. 1 αρ. 64 ν. 4172/2013 — 5% |

## 8.5 Category Other Taxes

| Code | Description |
| :--- | :--- |
| 1 α1) ασφάλιστρα κλάδου πυρός 20% | 15% — Από την έκδοση 1.0.3 είναι δυνατή η αποστολή με αυτή την τιμή. |
| 2 α2) ασφάλιστρα κλάδου πυρός 20% | 5% — Από την έκδοση 1.0.3 είναι δυνατή η αποστολή με αυτή την τιμή. |
| 3 | β) ασφάλιστρα κλάδου ζωής 4% — 4% |
| 4 | γ) ασφάλιστρα λοιπών κλάδων 15%. — 15% |
| 5 | δ) απαλλασσόμενα φόρου ασφαλίστρων 0%. — 0% |
| 6 | Ξενοδοχεία 1-2 αστέρων 0,50 € — ποσό |
| 7 | Ξενοδοχεία 3 αστέρων 1,50 € — ποσό |
| 8 | Ξενοδοχεία 4 αστέρων 3,00 € — ποσό |
| 9 | Ξενοδοχεία 4 αστέρων 4,00 € — ποσό |
| 10 διαμερίσματα 0,50 € | Ενοικιαζόμενα - επιπλωμένα δωμάτια ποσό — |
| 11 προβάλλονται από την τηλεόραση (ΕΦΤΔ) 5% | Ειδικός Φόρος στις διαφημίσεις που 5% — |
| 12 αξίας για τα ενδοκοινοτικώς αποκτούμενα και εισαγόμενα από τρίτες χώρες 10% | 3.1 Φόρος πολυτελείας 10% επί της φορολογητέας 10% — |
| 13 πώλησης προ Φ.Π.Α. για τα εγχωρίως παραγόμενα είδη 10% | 3.2 Φόρος πολυτελείας 10% επί της τιμής 10% — |
| 14 (80% επί του εισιτηρίου) | Δικαίωμα του Δημοσίου στα εισιτήρια των καζίνο 80% — |
| 15 | ασφάλιστρα κλάδου πυρός 20% — 20% |
| 16 | Λοιποί Τελωνειακοί Δασμοί-Φόροι — ποσό |
| 17 | Other Taxes — ποσό |
| 18 | Επιβαρύνσεις Other Taxes — ποσό |
| 19 | ΕΦΚ — ποσό |
| 20 | Ξενοδοχεία 1-2 αστέρων 1,50€ (ανά Δωμ./Διαμ.) — ποσό |
| 21 | Ξενοδοχεία 3 αστέρων 3,00€ (ανά Δωμ./Διαμ.) — ποσό |
| 22 | Ξενοδοχεία 4 αστέρων 7,00€ (ανά Δωμ./Διαμ.) — ποσό |
| 23 | Ξενοδοχεία 5 αστέρων 10,00€ (ανά Δωμ./Διαμ.) — ποσό |
| 24 διαμερίσματα 1,50€ (ανά Δωμ./Διαμ.) | Ενοικιαζόμενα επιπλωμένα δωμάτια – ποσό — |
| 25 | Ακίνητα βραχυχρόνιας μίσθωσης 1,50€ — ποσό |
| 26 άνω των 80 τ.μ. 10,00€ | Ακίνητα βραχυχρόνιας μίσθωσης μονοκατοικίες ποσό — |
| 27 επιπλωμένες επαύλεις (βίλες) 10,00€ | Αυτοεξυπηρετούμενα καταλύματα – τουριστικές ποσό — |
| 28 | Ακίνητα βραχυχρόνιας μίσθωσης 0,50€ — ποσό |
| 29 άνω των 80 τ.μ. 4,00€ | Ακίνητα βραχυχρόνιας μίσθωσης μονοκατοικίες ποσό — |
| 30 επιπλωμένες επαύλεις (βίλες) 4,00€ | Αυτοεξυπηρετούμενα καταλύματα – τουριστικές ποσό — |

## 8.6 Category Συντελεστή Ψηφιακού Τέλους συναλλαγής

| Code | Description |
| :--- | :--- |
| 1 | Συντελεστής 1,2 % — 1,20% |
| 2 | Συντελεστής 2,4 % — 2,40% |
| 3 | Συντελεστής 3,6 % — 3,60% |
| 4 | Other cases — ποσό |

## 8.7 Category Τελών

| Code | Description |
| :--- | :--- |
| 1 | Για μηνιαίο λογαριασμό μέχρι και 50 ευρώ 12% — 12,00% |
| 2 | Για μηνιαίο λογαριασμό από 50,01 μέχρι και 100 ευρώ 15% — 15,00% |
| 3 | Για μηνιαίο λογαριασμό από 100,01 μέχρι και 150 ευρώ 18% — 18,00% |
| 4 | Για μηνιαίο λογαριασμό από 150,01 ευρώ και άνω 20% — 20,00% |
| 5 | Τέλος καρτοκινητής επί της αξίας του χρόνου ομιλίας (12%) — 12,00% |
| 6 | Τέλος στη συνδρομητική τηλεόραση 10% — 10,00% |
| 7 | Τέλος συνδρομητών σταθερής τηλεφωνίας 5% — 5,00% |
| 8 | Περιβαλλοντικό Τέλος & πλαστικής σακούλας ν. 2339/2001 αρ. 6α 0,07 ευρώ ανά τεμάχιο — ποσό |
| 9 | Εισφορά δακοκτονίας 2% — 2,00% |
| 10 | Λοιπά τέλη — ποσό |
| 11 | Fees Other Taxes — Amount |
| 12 | Εισφορά δακοκτονίας — Amount |
| 13 | Για μηνιαίο λογαριασμό κάθε σύνδεσης (10%) — 10% |
| 14 | Τέλος καρτοκινητής επί της αξίας του χρόνου ομιλίας (10%) — 10% |
| 15 | Τέλος κινητής και καρτοκινητής για φυσικά πρόσωπα ηλικίας 15 έως και 29 ετών (0%) — 0% |
| 16 | Εισφορά προστασίας περιβάλλοντος πλαστικών προϊόντων 0,04 λεπτά ανά τεμάχιο [άρθρο 4 ν. 4736/2020] — ποσό |
| 17 | Τέλος ανακύκλωσης 0,08 λεπτά ανά τεμάχιο [άρθρο 80 ν. 4819/2021] — Amount |
| 18 | Τέλος διαμονής παρεπιδημούντων — Amount |
| 19 | Τέλος επί των ακαθάριστων εσόδων των εστιατορίων και συναφών καταστημάτων — Amount |
| 20 | Τέλος επί των ακαθάριστων εσόδων των κέντρων διασκέδασης — Amount |
| 21 | Τέλος επί των ακαθάριστων εσόδων των καζίνο — Amount |
| 22 | Λοιπά τέλη επί των ακαθάριστων εσόδων — Amount |

## 8.12 Τρόποι Payment

| Code | Description |
| :--- | :--- |
| 1 | Επαγ. Λογαριασμός Πληρωμών Ημεδαπής |
| 2 | Επαγ. Λογαριασμός Πληρωμών Αλλοδαπής |
| 3 | Μετρητά |
| 4 | Επιταγή |
| 5 | Επί Πιστώσει |
| 6 | Web Banking |
| 7 | POS / e-POS |
| 8 | Άμεσες Πληρωμές IRIS |

## 8.13 Item Quantity

| Code | Description |
| :--- | :--- |
| 1 | Pieces |
| 2 | Kilograms |
| 3 | Liters |
| 4 | Meters |
| 5 | Square Meters |
| 6 | Cubic Meters |
| 7 | Pieces_Other Cases |

## 8.14 Movement Purpose

| Code | Description |
| :--- | :--- |
| 1 | Sale — |
| 2 | Sale για Λογαριασμό Τρίτων — |
| 3 | Sampling — |
| 4 | Exhibition — |
| 5 | Return — Από την τρέχουσα έκδοση δεν θα |
| 6 | Storage — είναι δυνατή η αποστολή με αυτή την τιμή. |
| 7 | Επεξεργασία Συναρμολόγηση — |
| 8 | Μεταξύ Εγκαταστάσεων Entity — |
| 9 | Αγορά Εφοδιασμός πλοίων και αεροσκαφών — |
| 11 | Δωρεάν διάθεση — |
| 12 | Εγγύηση — |
| 13 | Χρησιδανεισμός — |
| 14 | Αποθήκευση σε Τρίτους — |
| 15 | Return από Storage — Από την τρέχουσα έκδοση δεν θα είναι δυνατή η αποστολή με αυτή την τιμή. Από την τρέχουσα έκδοση δεν θα |
| 16 | Ανακύκλωση — είναι δυνατή η αποστολή με αυτή την τιμή. Από την τρέχουσα έκδοση δεν θα |
| 17 | Καταστροφή άχρηστου υλικού — είναι δυνατή η αποστολή με αυτή την τιμή. Από την τρέχουσα έκδοση δεν θα |
| 18 | Movement Παγίων (Intra-entity Movement) — είναι δυνατή η αποστολή με αυτή την τιμή. |
| 19 | Other Διακινήσεις — |
| 20 | Μεταφορές - Ταχυμεταφορές — |

## 8.15 Επισήμανση

| Code | Description |
| :--- | :--- |
| 1 | Εκκαθάριση Πωλήσεων Τρίτων |
| 2 | Αμοιβή από Πωλήσεις Τρίτων |

## 8.16 Item Line

| Code | Description |
| :--- | :--- |
| 1 | Ειδική Line Παρακρατούμενων Taxes — Ανενεργός - για μελλοντική χρήση |
| 2 | Line Τέλους με Φ.Π.Α. — |
| 3 | Line Other Taxes με Φ.Π.Α. — |
| 4 | Ειδική Line Ψηφιακού Τέλους συναλλαγής — Ανενεργός - για μελλοντική χρήση |
| 5 | Ειδική Line Κρατήσεων — Ανενεργός - για μελλοντική χρήση |
| 6 | Δωροεπιταγή — Έγκυρο only στις cases των invoices 17.3, 17.4, |
| 7 | Αρνητικό πρόσημο αξιών — 17.5 και 17.6 και υποδηλώνει ότι τα ποσά των αξιών της γραμμής είναι αρνητικά |

## 8.17 Κωδικοί Καυσίμων

| Code | Description |
| :--- | :--- |
| 10 | Benzine 95RON — |
| 11 | Benzine 95RON+ — |
| 12 | Benzine 100RON — |
| 13 | Benzine LRP — |
| 14 | Βενζίνη αεροπλάνων — |
| 15 | Ειδικό καύσιμο αεριωθουμένων — |
| 20 | Diesel — |
| 21 | Diesel premium — |
| 30 | Diesel Heatnn — |
| 31 | Diesel Heat premium — |
| 32 | Diesel Light — |
| 33 | Diesel άλλων χρήσεων — |
| 34 | Diesel ναυτιλίας — |
| 35 | Κηροζίνη JP1 — |
| 36 | Κηροζίνη άλλων χρήσεων — |
| 37 | Μαζούτ — |
| 38 | Μαζούτ ναυτιλίας — |
| 40 | LPG (υγραέριο) — |
| 41 βιομηχανικό /εμπορικό κινητήρων | Υγραέριο (LPG) και μεθάνιο (χύδην) — |
| 42 | Υγραέριο (LPG) και μεθάνιο θέρμανσης και λοιπών χρήσεων (χύδην) — |
| 43 βιομηχανικό /εμπορικό κινητήρων (σε | Υγραέριο (LPG) και μεθάνιο φιάλες) — |
| 44 θέρμανσης και λοιπών χρήσεων (σε | Υγραέριο (LPG) και μεθάνιο φιάλες) — |
| 50 | CNG (πεπιεσμένο φυσικό αέριο) — |
| 60 | Αρωματικοί Υδρογονάνθρακες Δασμολογικής Κλάσης 2707 — |
| 61 | Κυκλικοί Υδρογονάνθρακες Δασμολογικής Κλάσης 2902 — |
| 70 | Ελαφρύ πετρέλαιο (WHITE SPIRIT) — |
| 71 | Ελαφριά λάδια — |
| 72 | Βιοντίζελ — |
| 999 | Other χρεώσεις υπηρεσιών — Χρησιμοποιείται στις cases που σε ένα invoice εκτός από καύσιμα υπάρχει η ανάγκη να τιμολογούνται και λοιπές χρεώσεις μικρών ποσών |

## 8.18 Type Απόκλισης Invoice

| Code | Description |
| :--- | :--- |
| 1 | Διαβίβαση Παράλειψης από Λήπτη — από τον Λήπτη λόγω Παράλειψης Διαβίβασης του Εκδότη. Επιτρεπτοί τύποι invoices: 1.1, 1.6, 2.1, 2.4, 5.2, 8.1 και |
| 2 | Διαβίβαση Παράλειψης από Εκδότη — περί παράλειψης διαβίβασης από μέρους του (εκδότη) Επιτρεπτοί τύποι invoices: 11.3, 11.4, 13.1, και 13.31 Χρησιμοποιείται αυτή η τιμή για Διαβίβαση Δεδομένων (μη αντικριζόμενα invoices) από τον Λήπτη λόγω Απόκλισης Διαβίβασης Δεδομένων από τον Εκδότη |
| 3 | Διαβίβαση Απόκλισης από Λήπτη — Επιτρεπτοί τύποι invoices: 11.3, 11.4, 13.1, και 13.31 (Ειδικά και αποκλειστικά για invoices που εκδόθηκαν εντός του 2021 οι επιτρεπτοί τύποι είναι οι 1.1 και 5.2) Χρησιμοποιείται αυτή η τιμή για Διαβίβαση Δεδομένων από τον Εκδότη, in the case που συμφωνεί με την επισήμανση του Λήπτη «Απόκλιση Διαβίβασης» στον |
| 4 | Διαβίβαση Απόκλισης από Εκδότη — αντικριζόμενο Τύπο Invoice Α1 που είχε διαβιβάσει στον Λήπτη Επιτρεπτοί τύποι invoices: 11.3, 11.4, 13.1, και 13.31 |

## 8.19 Ειδική Category Invoice

| Code | Description |
| :--- | :--- |
| 1 | Επιδοτήσεις – Επιχορηγήσεις Income Λιανικής Ξενοδοχείων – Χρεώσεις Δωματίου — |
| 3 | Λογιστική Εγγραφή — Έγκυρη τιμή only για |
| 4 Δικαιούχοι του άρθρου 3 της υπό στοιχεία | Tax Free Σύνθετες συναλλαγές ημεδαπής – αλλοδαπής — διαβίβαση μέσω erp ή έκδοση μέσω παρόχου ή timologio |
| 6 | 139818 ΕΞ2022/28.09.2022 (Β’5083) κοινής υπουργικής απόφασης Αγορά αγροτικών αγαθών υπηρεσιών Άρθρο 41 του Κώδικα VAT — Μόνο για ανάγνωση – μη |
| 8 | Income Λιανικών ΦΗΜ ΑΑΔΕ_1 — έγκυρη τιμή για αποστολή μέσω ERP / Πάροχο Μόνο για ανάγνωση – μη |
| 9 | Income Λιανικών ΦΗΜ ΑΑΔΕ_2 Income Λιανικών ΦΗΜ Επιχείρησης Απόκλιση — έγκυρη τιμή για αποστολή μέσω ERP / Πάροχο |
| 11 | Επίδομα Θέρμανσης — |
| 12 | Συναλλαγές εστίασης — Έγκυρη τιμή only για τύπους |
| 13 | Indication Δυσχέρεια Συσχέτισης — invoices 11.4 και 14.30 |

## 8.20 Category Entity (EntityType)

| Code | Description |
| :--- | :--- |
| 1 | Φορολογικός Εκπρόσωπος — |
| 2 | Διαμεσολαβητής — |
| 3 | Μεταφορέας — |
| 4 | Counterpart του Αποστολέα (Πωλητή) — |
| 5 | Αποστολέας (Πωλητής) — |
| 6 | Other Συσχετιζόμενες Οντότητες — |

## 8.21 Reason Έκδοσης Αντίστροφης Movement

| Code | Description |
| :--- | :--- |
| 1 | ΜΗ ΥΠΟΧΡΕΟΣ ΕΚΔΟΣΗΣ |
| 2 | ΑΡΝΗΣΗ ΕΚΔΟΣΗΣ/ΕΚ ΠΑΡΑΔΡΟΜΗΣ ΜΗ ΕΚΔΟΣΗ |
| 3 | ΕΝΔΟΚΟΙΝΟΤΙΚΗ ΑΠΟΚΤΗΣΗ |
| 4 | ΑΠΟΚΤΗΣΗ ΤΡΙΤΗ ΧΩΡΑ |
| 5 | ΑΝΤΙΣΤΡΟΦΗ ΥΠΟΧΡΕΩΣΗΣ |

## 9.7 Έκδοση 1.0.3

| Code | Description |
| :--- | :--- |
| 1 | α1) ασφάλιστρα κλάδου πυρός 20% — 15% |
| 2 δεν επιτρέπονται πλέον. | α2) ασφάλιστρα κλάδου πυρός 20% — 5% |
