# myDATA REST API — Digital Delivery Note (v2.0.1)

## 3.2.1 RegisterTransfer

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `transferMark` | `xs:long` | Ναι του Συμπληρώνεται υπηρεσία. | Μοναδικός Αριθμός Καταχώρησης γεγονότος από |  |
| `qrUrl` | `xs:string` | Ναι Αποστολής ή του Ομαδικού QR | Το URL του QR code του Δελτίου |  |

## 3.2.2 ConfirmDeliveryOutcome

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `qrUrl` | `xs:string` | Ναι | Το URL του QR code του Αποστολής ή του Ομαδικού QR Code. |  |
| `outcome` | `DeliveryOutcomeType` | Ναι | Το αποτέλεσμα της παράδοσης. Αποδεκτές τιμές : FULL, PARTIAL, NONE |  |
| `deliveredWithoutRecipient` | `xs:boolean` | Όχι | Η τιμή είναι true αν η παράδοση χωρίς την παρουσία του παραλήπτη. |  |
| `deliveredPackaging` | `PackagingDetailType` | Όχι | Λίστα συσκευασίες και τις ποσότητες παραδόθηκαν. | με που |

## 3.2.3 RejectDeliveryNote

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `qrUrl` | `xs:string Ναι (choice) Το URL του QR code του Δελτίου Αποστολής ή` | του Ομαδικού QR Code. Θα |  |  |
| `invoiceMark` | `Xs:long Ναι (choice)` | Το ΜΑΡΚ του παραστατικού διακίνησης |  |  |
| `rejectionReason xs:string Όχι` |  | Περιγραφή του λόγου απόρριψης. |  |  |

## 3.2.5 GenerateGroupQRCode

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `qrUrls` | `QrUrlsType Ναι` | Λίστα με τα ομαδοποίηση. | URL | των |
| `QrUrlsType xs:string` |  | Ναι |  |  |

## 3.2.6 RequestGroupQRDetails

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `groupId xs:string` |  | Ναι |  |  |

## 4.1 Σχήμα DeliveryEventType (Ιστορικό Γεγονότων Διακίνησης)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `eventType` | `xs:string` | Ναι τιμές: RegisterTransfer, ConfirmOutcome, Rejection. | Ο | τύπος |
| `eventTimestamp xs:dateTime` |  | Ναι | Η χρονική σήμανση (timestamp) του γεγονότος. |  |
| `actorVat` | `xs:string` | Ναι | ΑΦΜ Χρήστη που δημιούργησε το συμβάν. |  |
| `mark` | `xs:long` | Όχι (παράγεται από το myDATA). | Μοναδικός Αριθμός Καταχώρησης Συμβάντος |  |
| `transportDetails` | `TransportDetailType` | Όχι (choice) | Στοιχεία μεταφοράς. |  |
| `outcomeDetails` | `OutcomeDetailsType` | Όχι (choice) | Λεπτομέρειες για το αποτέλεσμα της παράδοσης. |  |
| `rejectionDetails` | `RejectionDetailsType Όχι (choice)` | Λεπτομέρειες για την απόρριψη. |  |  |

## 4.2 Σχήμα TransportDetailType (Λεπτομέρειες Μεταφοράς)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `vehicleNumber` | `xs:string` | Ναι | Αριθμός Μεταφορικού Μέσου (Αριθμός κυκλοφορίας/Όνομα μέσου/Κωδικός πτήσης/Διακίνηση άνευ Μεταφορικού Μέσου) |  |
| `transportType` | `xs:int` | Ναι | Είδος Μεταφορικού Μέσου. Αποδεκτές Τιμές: Λίστα Τιμών, λεπτομέρειες στον σχετικό πίνακα του παραρτήματος |  |
| `timeStamp` | `xs:dateTime` | Όχι | Χρονοσφραγίδα |  |
| `carrierVatNumber` | `xs:string` | Ναι | ΑΦΜ Μεταφορικής Εταιρείας |  |
| `pNumber` | `xs:string` | Όχι | Αριθμός κυκλοφορίας "Ρ" (αριθμός κυκλοφορίας επικαθήμενου/ρυμουλκούμενου οχήματος) |  |
| `location` | `LocationType` | Όχι | Τοποθεσία Μεταφόρτωσης |  |
| `longitude` | `xs:decimal` | Ναι | Γεωγραφικό Μήκος |  |
| `latitude` | `xs:decimal` | Ναι | Γεωγραφικό Πλάτος |  |

## 4.3 Σχήμα   OutcomeDetailsType                (Λεπτομέρειες       Αποτελέσματος

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `outcome` | `DeliveryOutcomeType Ναι` | Το παράδοσης (FULL, PARTIAL, NONE). | αποτέλεσμα | της |
| `deliveredWithoutRecipient xs:boolean` |  | Όχι παράδοση έγινε χωρίς την παραλήπτη. | Έχει τιμή true αν η παρουσία |  |
| `deliveredPackaging` | `PackagingDetailType Όχι` | Λίστα παραδοθείσες συσκευασίες. | με | τις |

## 4.4 Σχήμα PackagingDetailType (Πληροφορίες Συσκευασίας)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `packagingType` | `xs:int` | Ναι | Είδος Συσκευασίας | Επιτρεπτές τιμές {1,6}. |
| `quantity` | `xs:int` | Ναι | Πλήθος |  |
| `otherPackagingTypeTitle` | `xs:string` | Όχι | Τίτλος για Λοιπά Είδη Συσκευασίας |  |

## 4.5 Σχήμα RejectionDetailsType (Λεπτομέρειες Απόρριψης)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `reason` | `xs:string` | Όχι απόρριψης | Προαιρετική | αιτιολογία |

## 5.1 Υποβολή Δεδομένων

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `index` | `xs:int` | Όχι | Αριθμός Σειράς Οντότητας εντός του υποβληθέντος xml |  |
| `statusCode` | `xs:string` | Ναι | Κωδικός Αποτελέσματος ValidationError, TechnicalError, XMLSyntaxError | Success, |
| `transferMark` | `xs:long` | Όχι | Μοναδικός Αριθμός Εκκίνησης/Μεταφόρτωσης Διακίνησης |  |
| `rejectMark` | `xs:long` | Όχι | Μοναδικός Απόρριψης Διακίνησης | Αριθμός |
| `deliveryOutcomeMark xs:long` |  | Όχι Αποτελέσματος Παράδοσης Διακίνησης | Μοναδικός | Αριθμός |
| `errors` | `ErrorType` | Ναι (choice) Λίστα Σφαλμάτων |  |  |

## 5.2 Λήψη Κατάστασης (DeliveryNoteStatusResponse)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `invoiceMark` | `xs:string` | Ναι | Το Mark του Παραστατικού Διακίνησης |  |
| `status` | `xs:string` | Ναι | Τρέχουσα Παραστατικού Διακίνησης (περιγράφονται στον παρατήματος Καταστάσεις Παραστατικού Διακίνησης) | Κατάσταση Λίστα πίνακα |
| `dispatchTimestamp xs:dateTime` |  | Ναι Εκκίνησης/Μεταφόρτωσης Διακίνησης | Ημερομηνία και Ώρα |  |
| `lifecycleHistory` | `DeliveryEventType Όχι` | Ιστορικό Διακίνησης | Γεγονότων |  |

## 5.3 Δημιουργίας Ομαδικού QR (GenerateGroupQRCodeResponse)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `groupQrUrl` | `xs:string` | Ναι | Το νέο, ομαδικό URL του QR Code. |  |
| `qrUrlsCount` | `xs:int` | Ναι | Το πλήθος των ΔΑ που περιλαμβάνονται ομάδα. |  |
| `expiresAt` | `xs:string` | Ναι | Η ημερομηνία και ώρα λήξης του ομαδικού QR |  |

## 6 Σφάλματα

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `message` | `xs:string` | Ναι | Μήνυμα Σφάλματος |  |
| `code` | `xs:string` | Ναι | Κωδικός Σφάλματος |  |

## 7.1 Καταστάσεις Δελτίου Αποστολής (InvoiceDeliveryStatus)

| Code | Description |
| :--- | :--- |
| 1 | Registered — Ο εκδότης ακύρωσε το ΔΑ πριν την έναρξη της |
| 2 | Cancelled — διακίνησης. |
| 3 | InTransit — Η διακίνηση έχει ξεκινήσει. |
| 4 | Rejected — Ο λήπτης απέρριψε την παραλαβή. Ο μεταφορέας δήλωσε παράδοση (αναμονή |
| 5 | DeliveredByCarrier — επιβεβαίωσης από λήπτη B2B). |
| 7 | FailedDelivery — Ο μεταφορέας δήλωσε αποτυχία παράδοσης. Η διακίνηση ολοκληρώθηκε με επιτυχία. |
| 8 | Completed — |

## 7.3 Τύποι Συσκευασίας (PackagingType)

| Code | Description |
| :--- | :--- |
| 1 | Παλέτα |
| 2 | Κούτα |
| 3 | Κιβώτιο |
| 4 | Βαρέλι |
| 5 | Σάκος |
| 6 | Λοιπά |

## 7.4 Είδος Μεταφορικού Μέσου (transportType)

| Code | Description |
| :--- | :--- |
| 1 | Φορτηγό Δημόσιας Χρήσης |
| 2 | Φορτηγό Ιδιωτικής Χρήσης |
| 3 | Πλοίο |
| 4 | Τρένο |
| 5 | Αεροπλάνο |
| 6 | Λοιπά Μεταφορικά Μέσα (π.χ Δίκυκλα, ..) |
| 7 | Άνευ |
