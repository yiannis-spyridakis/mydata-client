# myDATA REST API — Digital Delivery Note (v2.0.1)

## 3.2.1 RegisterTransfer

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `transferMark` | `xs:long` | Yes του Συμπληρώνεται υπηρεσία. | Μοναδικός Number Καταχώρησης γεγονότος από |  |
| `qrUrl` | `xs:string` | Yes Αποστολής ή του Ομαδικού QR | Το URL του QR code του Δελτίου |  |

## 3.2.2 ConfirmDeliveryOutcome

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `qrUrl` | `xs:string` | Yes | Το URL του QR code του Αποστολής ή του Ομαδικού QR Code. |  |
| `outcome` | `DeliveryOutcomeType` | Yes | Το αποτέλεσμα της παράδοσης. Accepted Values : FULL, PARTIAL, NONE |  |
| `deliveredWithoutRecipient` | `xs:boolean` | No | Η τιμή είναι true αν η παράδοση χωρίς την παρουσία του παραλήπτη. |  |
| `deliveredPackaging` | `PackagingDetailType` | No | List συσκευασίες και τις ποσότητες παραδόθηκαν. | με που |

## 3.2.3 RejectDeliveryNote

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `qrUrl` | `xs:string Yes (choice) Το URL του QR code του Δελτίου Αποστολής ή` | του Ομαδικού QR Code. Θα |  |  |
| `invoiceMark` | `Xs:long Yes (choice)` | Το ΜΑΡΚ του invoice διακίνησης |  |  |
| `rejectionReason xs:string No` |  | Description του λόγου απόρριψης. |  |  |

## 3.2.5 GenerateGroupQRCode

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `qrUrls` | `QrUrlsType Yes` | List με τα ομαδοποίηση. | URL | των |
| `QrUrlsType xs:string` |  | Yes |  |  |

## 3.2.6 RequestGroupQRDetails

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `groupId xs:string` |  | Yes |  |  |

## 4.1 Σχήμα DeliveryEventType (Ιστορικό Γεγονότων Movement)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `eventType` | `xs:string` | Yes τιμές: RegisterTransfer, ConfirmOutcome, Rejection. | Ο | τύπος |
| `eventTimestamp xs:dateTime` |  | Yes | Η χρονική σήμανση (timestamp) του γεγονότος. |  |
| `actorVat` | `xs:string` | Yes | VAT Number Χρήστη που δημιούργησε το συμβάν. |  |
| `mark` | `xs:long` | No (παράγεται από το myDATA). | Μοναδικός Number Καταχώρησης Συμβάντος |  |
| `transportDetails` | `TransportDetailType` | No (choice) | Details μεταφοράς. |  |
| `outcomeDetails` | `OutcomeDetailsType` | No (choice) | Λεπτομέρειες για το αποτέλεσμα της παράδοσης. |  |
| `rejectionDetails` | `RejectionDetailsType No (choice)` | Λεπτομέρειες για την απόρριψη. |  |  |

## 4.2 Σχήμα TransportDetailType (Λεπτομέρειες Μεταφοράς)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `vehicleNumber` | `xs:string` | Yes | Number Μεταφορικού Μέσου (Number κυκλοφορίας/Όνομα μέσου/Code πτήσης/Movement άνευ Μεταφορικού Μέσου) |  |
| `transportType` | `xs:int` | Yes | Item Μεταφορικού Μέσου. Accepted Values: List Values, λεπτομέρειες στον σχετικό πίνακα του παραρτήματος |  |
| `timeStamp` | `xs:dateTime` | No | Χρονοσφραγίδα |  |
| `carrierVatNumber` | `xs:string` | Yes | VAT Number Μεταφορικής Εταιρείας |  |
| `pNumber` | `xs:string` | No | Number κυκλοφορίας "Ρ" (αριθμός κυκλοφορίας επικαθήμενου/ρυμουλκούμενου οχήματος) |  |
| `location` | `LocationType` | No | Τοποθεσία Μεταφόρτωσης |  |
| `longitude` | `xs:decimal` | Yes | Γεωγραφικό Length |  |
| `latitude` | `xs:decimal` | Yes | Γεωγραφικό Πλάτος |  |

## 4.3 Σχήμα   OutcomeDetailsType                (Λεπτομέρειες       Αποτελέσματος

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `outcome` | `DeliveryOutcomeType Yes` | Το παράδοσης (FULL, PARTIAL, NONE). | αποτέλεσμα | της |
| `deliveredWithoutRecipient xs:boolean` |  | No παράδοση έγινε χωρίς την παραλήπτη. | Έχει τιμή true αν η παρουσία |  |
| `deliveredPackaging` | `PackagingDetailType No` | List παραδοθείσες συσκευασίες. | με | τις |

## 4.4 Σχήμα PackagingDetailType (Information Packaging)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `packagingType` | `xs:int` | Yes | Item Packaging | Επιτρεπτές τιμές {1,6}. |
| `quantity` | `xs:int` | Yes | Πλήθος |  |
| `otherPackagingTypeTitle` | `xs:string` | No | Τίτλος για Λοιπά Είδη Packaging |  |

## 4.5 Σχήμα RejectionDetailsType (Λεπτομέρειες Απόρριψης)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `reason` | `xs:string` | No απόρριψης | Προαιρετική | αιτιολογία |

## 5.1 Υποβολή Δεδομένων

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `index` | `xs:int` | No | Entity Row Number εντός του υποβληθέντος xml |  |
| `statusCode` | `xs:string` | Yes | Result Code ValidationError, TechnicalError, XMLSyntaxError | Success, |
| `transferMark` | `xs:long` | No | Μοναδικός Number Εκκίνησης/Μεταφόρτωσης Movement |  |
| `rejectMark` | `xs:long` | No | Μοναδικός Απόρριψης Movement | Number |
| `deliveryOutcomeMark xs:long` |  | No Αποτελέσματος Παράδοσης Movement | Μοναδικός | Number |
| `errors` | `ErrorType` | Yes (choice) List Σφαλμάτων |  |  |

## 5.2 Λήψη Κατάστασης (DeliveryNoteStatusResponse)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `invoiceMark` | `xs:string` | Yes | Το Mark του Invoice Movement |  |
| `status` | `xs:string` | Yes | Τρέχουσα Invoice Movement (περιγράφονται στον παρατήματος Καταστάσεις Invoice Movement) | Status List πίνακα |
| `dispatchTimestamp xs:dateTime` |  | Yes Εκκίνησης/Μεταφόρτωσης Movement | Ημερομηνία και Ώρα |  |
| `lifecycleHistory` | `DeliveryEventType No` | Ιστορικό Movement | Γεγονότων |  |

## 5.3 Δημιουργίας Ομαδικού QR (GenerateGroupQRCodeResponse)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `groupQrUrl` | `xs:string` | Yes | Το νέο, ομαδικό URL του QR Code. |  |
| `qrUrlsCount` | `xs:int` | Yes | Το πλήθος των ΔΑ που περιλαμβάνονται ομάδα. |  |
| `expiresAt` | `xs:string` | Yes | Η ημερομηνία και ώρα λήξης του ομαδικού QR |  |

## 6 Σφάλματα

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `message` | `xs:string` | Yes | Μήνυμα Σφάλματος |  |
| `code` | `xs:string` | Yes | Code Σφάλματος |  |

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

## 7.3 Τύποι Packaging (PackagingType)

| Code | Description |
| :--- | :--- |
| 1 | Παλέτα |
| 2 | Κούτα |
| 3 | Κιβώτιο |
| 4 | Βαρέλι |
| 5 | Σάκος |
| 6 | Λοιπά |

## 7.4 Item Μεταφορικού Μέσου (transportType)

| Code | Description |
| :--- | :--- |
| 1 | Φορτηγό Δημόσιας Χρήσης |
| 2 | Φορτηγό Ιδιωτικής Χρήσης |
| 3 | Πλοίο |
| 4 | Τρένο |
| 5 | Αεροπλάνο |
| 6 | Λοιπά Μεταφορικά Μέσα (π.χ Δίκυκλα, ..) |
| 7 | Άνευ |
