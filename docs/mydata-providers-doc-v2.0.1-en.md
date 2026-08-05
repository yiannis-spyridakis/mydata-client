# myDATA REST API — e-Invoicing providers (v2.0.1)

## 4.2.7 SendStatement

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `statementId` | `xs:long` | No | Μοναδικός Number Καταχώρησης Δήλωσης | Συμπληρώνεται από την υπηρεσία |
| `submissionDateTime` | `xs:dateTime` | No | Ημερομηνία υποβολής Δήλωσης | Συμπληρώνεται από την υπηρεσία |
| `entityVatNumber` | `xs:string` | Yes | VAT Number Υπόχρεης Entity |  |
| `liableUserCategory` | `xs:int` | Yes | Category Υπόχρεης Entity | 1= Provider 2= ΙδιοΠάροχος |
| `providerType` | `xs:int` | Yes | Type Παρόχου | 1= Provider 2= ΙδιοΠάροχος |
| `isB2BTransactions` | `xs:boolean` | No | Συναλλαγές B2B |  |
| `isB2CTransactions` | `xs:boolean` | No | Συναλλαγές B2C |  |
| `isB2GTransactions` | `xs:boolean` | No | Συναλλαγές B2G |  |
| `providerVatNumber` | `xs:string` | Yes | VAT Number Παρόχου |  |
| `providerLicenceNumber` | `xs:string` | Yes | Number Αδείας Παρόχου |  |
| `providerContractNumber` | `xs:string` | Yes | Number Σύμβασης Παρόχου |  |
| `providerContractConclusionDate` | `xs:dateTime` | Yes | Ημερομηνία σύναψης σύμβασης οντότητας με τον Πάροχο | Το πεδίο πρέπει να είναι σε UTC μορφή. παράδειγμα: yyyy-MMddTHH:mm:ssZ |
| `providerContractActivationDate` | `xs:dateTime` | Yes | Ημερομηνία έναρξης ισχύος της σύμβασης | Το πεδίο πρέπει να είναι σε UTC μορφή. παράδειγμα: yyyy-MMddTHH:mm:ssZ |
| `issueStartDate` | `xs:date` | No | Ημερομηνία έναρξης έκδοσης στοιχείων για συναλλαγές | Το πεδίο πρέπει να έχει την ακόλουθη μορφή : YYYYMM-DD |
| `issueStopDate` | `xs:date` | No | Ημερομηνία διακοπής έκδοσης στοιχείων για συναλλαγές | Το πεδίο πρέπει να έχει την ακόλουθη μορφή : YYYYMM-DD |
| `internetProvider` | `xs:string` | No | Provider Διαδικτύου Entity-Εκδότη |  |
| `internetProviderContractNumber xs:string` |  |  | No | Number Σύμβασης Entity-Εκδότη με Πάροχο Διαδικτύου |
| `internetProviderContractDate` | `xs:dateTime` |  | No | Ημερομηνία Σύμβασης Entity-Εκδότη με Πάροχο Διαδικτύου ddTHH:mm:ssZ |

## 0 έως πολλά αντικείμενα requestedStatement σε xml μορφή.

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `statement` | `Statement` | Δεδομένα δήλωσης έκδοσης στοιχείων μέσω Παρόχου ή ΙδιοΠαρόχου |  |  |
| `acceptVatNumber` | `xs:string` | VAT Number αποδοχής δήλωσης (αφορά Υπόχρεη Επιχείρηση) |  |  |
| `acceptDate` | `xs:dateTime` | Ημερομηνία αποδοχής δήλωσης από Υπόχρεη Επιχείρηση. |  |  |
| `recallStatement` | `RecalledStatementType` | Δεδομένα ανάκλησης δήλωσης |  |  |

## 6.1 Υποβολή Δεδομένων

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `index` | `xs: int` | No | Number Entity εντός του υποβληθέντος xml | Σειράς |
| `statusCode` | `xs: string` | Yes | Result Code TechnicalError, XMLSyntaxError | Success, ValidationError, |
| `invoiceUid` | `xs: string` | No | Identifier Invoice | Length = 40 |
| `invoiceMark` | `xs: long` | No | Μοναδικός Number Καταχώρησης Invoice |  |
| `classificationMark` | `xs: long` | No | Μοναδικός Number Παραλαβής Classification χρηστών ERP | Δεν αφορά την case παρόχων – only για την case |
| `authenticationCode` | `xs: string` | No | Συμβολοσειρά Αυθεντικοποίησης |  |
| `cancellationMark` | `xs: long` | No | Μοναδικός Number Ακύρωσης για την case χρηστών ERP | Δεν αφορά την case παρόχων – only |
| `errors` | `ErrorType` | Yes (choice) | List Σφαλμάτων |  |
| `receptionsProviders receptionsProviders` |  | No | List Παρόχων |  |
| `receptionsEmails` | `ReceptionsEmailsType No` |  | List παραλαβής | Email |
| `qrUrl` | `xs: string` | Yes | Κωδικοποιημένο αλφαριθμητικό για τη δημιουργία QR Code τύπου Url, παραπέμπει σελίδα της ΑΑΔΕ | Μπορεί χρησιμοποιηθεί που σε |

## 6.2 Λήψη Δεδομένων

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `continuationToken` | `continuationTokenType` | No | Στοιχείο για την τμηματική λήψη αποτελεσμάτων |  |
| `InvoiceProviderType` | `InvoiceProviderType` | No | List Στοιχείων Invoices |  |
| `issuerVAT` | `xs:string` |  | Α.Φ.Μ. Εκδότη Invoice |  |
| `invoiceProviderMark` | `xs:long` | Yes | ΜΑΡΚ invoice |  |
| `invoiceUid` | `xs:string` | Yes | Identifier Invoice |  |
| `authenticationCode` | `xs:string` | Yes | Συμβολοσειρά Αυθεντικοποίησης Invoice Παρόχου |  |
| `nextPartitionKey` | `xs:string` | Yes | Παράμετρος κλήση λήψης | για |
| `nextRowKey` | `xs:string` | Yes | Παράμετρος κλήση λήψης | για |

## 6.3 Λήψη Πληροφοριών σχετικά με Ηλεκτρονική Τιμολόγηση

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `receptionsProviders` | `ReceptionsProvidersType` | No | List Παρόχων |  |
| `ProviderInfo` | `ProviderInfoType` | Yes | Information Παρόχου |  |
| `VATNumber` | `xs:string` | Yes | VAT Number Παρόχου |  |
| `receptionsEmails` | `ReceptionsEmailsType` | No | List Email παραλαβής |  |
| `email` | `xs:string` | Yes | Email παραλαβής |  |

## 7 Σφάλματα

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `message` | `xs: string` | Yes | Μήνυμα Σφάλματος |  |
| `code` | `xs: string` | Yes | Code Σφάλματος |  |
