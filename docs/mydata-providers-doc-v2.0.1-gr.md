# myDATA REST API — e-Invoicing providers (v2.0.1)

## 4.2.7 SendStatement

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `statementId` | `xs:long` | Όχι | Μοναδικός Αριθμός Καταχώρησης Δήλωσης | Συμπληρώνεται από την υπηρεσία |
| `submissionDateTime` | `xs:dateTime` | Όχι | Ημερομηνία υποβολής Δήλωσης | Συμπληρώνεται από την υπηρεσία |
| `entityVatNumber` | `xs:string` | Ναι | ΑΦΜ Υπόχρεης Οντότητας |  |
| `liableUserCategory` | `xs:int` | Ναι | Κατηγορία Υπόχρεης Οντότητας | 1= Πάροχος 2= ΙδιοΠάροχος |
| `providerType` | `xs:int` | Ναι | Τύπος Παρόχου | 1= Πάροχος 2= ΙδιοΠάροχος |
| `isB2BTransactions` | `xs:boolean` | Όχι | Συναλλαγές B2B |  |
| `isB2CTransactions` | `xs:boolean` | Όχι | Συναλλαγές B2C |  |
| `isB2GTransactions` | `xs:boolean` | Όχι | Συναλλαγές B2G |  |
| `providerVatNumber` | `xs:string` | Ναι | ΑΦΜ Παρόχου |  |
| `providerLicenceNumber` | `xs:string` | Ναι | Αριθμός Αδείας Παρόχου |  |
| `providerContractNumber` | `xs:string` | Ναι | Αριθμός Σύμβασης Παρόχου |  |
| `providerContractConclusionDate` | `xs:dateTime` | Ναι | Ημερομηνία σύναψης σύμβασης οντότητας με τον Πάροχο | Το πεδίο πρέπει να είναι σε UTC μορφή. παράδειγμα: yyyy-MMddTHH:mm:ssZ |
| `providerContractActivationDate` | `xs:dateTime` | Ναι | Ημερομηνία έναρξης ισχύος της σύμβασης | Το πεδίο πρέπει να είναι σε UTC μορφή. παράδειγμα: yyyy-MMddTHH:mm:ssZ |
| `issueStartDate` | `xs:date` | Όχι | Ημερομηνία έναρξης έκδοσης στοιχείων για συναλλαγές | Το πεδίο πρέπει να έχει την ακόλουθη μορφή : YYYYMM-DD |
| `issueStopDate` | `xs:date` | Όχι | Ημερομηνία διακοπής έκδοσης στοιχείων για συναλλαγές | Το πεδίο πρέπει να έχει την ακόλουθη μορφή : YYYYMM-DD |
| `internetProvider` | `xs:string` | Όχι | Πάροχος Διαδικτύου Οντότητας-Εκδότη |  |
| `internetProviderContractNumber xs:string` |  |  | Όχι | Αριθμός Σύμβασης Οντότητας-Εκδότη με Πάροχο Διαδικτύου |
| `internetProviderContractDate` | `xs:dateTime` |  | Όχι | Ημερομηνία Σύμβασης Οντότητας-Εκδότη με Πάροχο Διαδικτύου ddTHH:mm:ssZ |

## 0 έως πολλά αντικείμενα requestedStatement σε xml μορφή.

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `statement` | `Statement` | Δεδομένα δήλωσης έκδοσης στοιχείων μέσω Παρόχου ή ΙδιοΠαρόχου |  |  |
| `acceptVatNumber` | `xs:string` | ΑΦΜ αποδοχής δήλωσης (αφορά Υπόχρεη Επιχείρηση) |  |  |
| `acceptDate` | `xs:dateTime` | Ημερομηνία αποδοχής δήλωσης από Υπόχρεη Επιχείρηση. |  |  |
| `recallStatement` | `RecalledStatementType` | Δεδομένα ανάκλησης δήλωσης |  |  |

## 6.1 Υποβολή Δεδομένων

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `index` | `xs: int` | Όχι | Αριθμός Οντότητας εντός του υποβληθέντος xml | Σειράς |
| `statusCode` | `xs: string` | Ναι | Κωδικός Αποτελέσματος TechnicalError, XMLSyntaxError | Success, ValidationError, |
| `invoiceUid` | `xs: string` | Όχι | Αναγνωριστικό Παραστατικού | Μήκος = 40 |
| `invoiceMark` | `xs: long` | Όχι | Μοναδικός Αριθμός Καταχώρησης Παραστατικού |  |
| `classificationMark` | `xs: long` | Όχι | Μοναδικός Αριθμός Παραλαβής Χαρακτηρισμού χρηστών ERP | Δεν αφορά την περίπτωση παρόχων – μόνο για την περίπτωση |
| `authenticationCode` | `xs: string` | Όχι | Συμβολοσειρά Αυθεντικοποίησης |  |
| `cancellationMark` | `xs: long` | Όχι | Μοναδικός Αριθμός Ακύρωσης για την περίπτωση χρηστών ERP | Δεν αφορά την περίπτωση παρόχων – μόνο |
| `errors` | `ErrorType` | Ναι (choice) | Λίστα Σφαλμάτων |  |
| `receptionsProviders receptionsProviders` |  | Όχι | Λίστα Παρόχων |  |
| `receptionsEmails` | `ReceptionsEmailsType Όχι` |  | Λίστα παραλαβής | Email |
| `qrUrl` | `xs: string` | Ναι | Κωδικοποιημένο αλφαριθμητικό για τη δημιουργία QR Code τύπου Url, παραπέμπει σελίδα της ΑΑΔΕ | Μπορεί χρησιμοποιηθεί που σε |

## 6.2 Λήψη Δεδομένων

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `continuationToken` | `continuationTokenType` | Όχι | Στοιχείο για την τμηματική λήψη αποτελεσμάτων |  |
| `InvoiceProviderType` | `InvoiceProviderType` | Όχι | Λίστα Στοιχείων Παραστατικών |  |
| `issuerVAT` | `xs:string` |  | Α.Φ.Μ. Εκδότη Παραστατικού |  |
| `invoiceProviderMark` | `xs:long` | Ναι | ΜΑΡΚ παραστατικού |  |
| `invoiceUid` | `xs:string` | Ναι | Αναγνωριστικό Παραστατικού |  |
| `authenticationCode` | `xs:string` | Ναι | Συμβολοσειρά Αυθεντικοποίησης Παραστατικού Παρόχου |  |
| `nextPartitionKey` | `xs:string` | Ναι | Παράμετρος κλήση λήψης | για |
| `nextRowKey` | `xs:string` | Ναι | Παράμετρος κλήση λήψης | για |

## 6.3 Λήψη Πληροφοριών σχετικά με Ηλεκτρονική Τιμολόγηση

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `receptionsProviders` | `ReceptionsProvidersType` | Όχι | Λίστα Παρόχων |  |
| `ProviderInfo` | `ProviderInfoType` | Ναι | Πληροφορίες Παρόχου |  |
| `VATNumber` | `xs:string` | Ναι | ΑΦΜ Παρόχου |  |
| `receptionsEmails` | `ReceptionsEmailsType` | Όχι | Λίστα Email παραλαβής |  |
| `email` | `xs:string` | Ναι | Email παραλαβής |  |

## 7 Σφάλματα

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `message` | `xs: string` | Ναι | Μήνυμα Σφάλματος |  |
| `code` | `xs: string` | Ναι | Κωδικός Σφάλματος |  |
