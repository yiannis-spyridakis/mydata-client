# myDATA REST API — ERP users (v2.0.1)

## 4.2.2 SendIncomeClassification

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `invoiceMark` | `xs:long` | Ναι | Μοναδικός Αριθμός Καταχώρησης Παραστατικού |  |
| `classificationMark` | `xs:long` | Όχι | Μοναδικός Αριθμός Καταχώρησης Χαρακτηρισμού |  |
| `entityVatNumber` | `xs: string` | Όχι | ΑΦΜ Οντότητας Αναφοράς |  |
| `transactionMode` | `xs:int` | Ναι (choice) | Είδος Συναλλαγής | 1 = Reject 2 = Deviation |
| `lineNumber` | `xs:int` | Ναι (choice) | Αριθμός Γραμμής |  |
| `incomeClassificationDetailData` | `IncomeClassificationType` | Ναι (choice) |  |  |

## 4.2.3 SendExpensesClassification

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `invoiceMark` | `xs:long` | Ναι | Μοναδικός Αριθμός Καταχώρησης Παραστατικού |  |
| `classificationMark` | `xs:long` |  | Όχι | Μοναδικός Αριθμός Καταχώρησης Χαρακτηρισμού |
| `entityVatNumber` | `xs: string` |  | Όχι | ΑΦΜ Οντότητας Αναφοράς |
| `transactionMode` | `xs:int` |  | Ναι (choice) | Είδος Συναλλαγής 2 = Deviation |
| `lineNumber` | `xs:int` |  | Ναι (choice) | Αριθμός Γραμμής |
| `expensesClassificationDetailData` | `ExpensesClassificationType` |  | Ναι (choice) |  |
| `postPerInvoice` | `xs:boolean` |  | Όχι | Τρόπος υποβολής χαρακτηρισμού |

## 4.2.4 SendPaymentsMethod

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `invoiceMark` | `xs:long` | Ναι | Μοναδικός Αριθμός Καταχώρησης Παραστατικού |  |
| `paymentMethodMark` | `xs:long` | Όχι | Μοναδικός Αριθμός Καταχώρησης Τρόπου Πληρωμής |  |
| `entityVatNumber` | `xs: string` | Όχι | ΑΦΜ Οντότητας Αναφοράς |  |
| `paymentMethodDetails` | `PaymentMethodDetailType` | Ναι | Τρόποι Πληρωμής |  |

## 5 Περιγραφή σχήματος παραστατικού

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `uid` | `xs:string` | Όχι | Αναγνωριστικό Παραστατικού την Υπηρεσία | Μήκος= 40 Συμπληρώνεται |
| `mark` | `xs:long` | Όχι | Μοναδικός Αριθμός Καταχώρησης Παραστατικού | Συμπληρώνεται από την Υπηρεσία |
| `cancelledByMark` | `xs:long` | Όχι | Μοναδικός Καταχώρησης Ακυρωτικού | Αριθμός την Υπηρεσία |
| `authenticationCode` | `xs:string` | Όχι | Συμβολοσειρά Αυθεντικοποίησης στην περίπτωση που η αποστολή γίνεται από παρόχους | Συμπληρώνεται την Υπηρεσία μόνο |
| `transmissionFailure` | `xs:byte` | Όχι | Αδυναμία Επικοινωνίας Παρόχου Οι τιμές {1,2,4} είναι ή Διαβίβασης Δεδομένων από ERP 1 : Στην περίπτωση αδυναμίας επικοινωνίας οντότητας με τον πάροχο κατά την έκδοση/διαβίβαση παραστατικού 2 : Στην περίπτωση αδυναμίας επικοινωνίας του παρόχου με το myDATA κατά την έκδοση/ διαβίβαση παραστατικού, 4 : Στην περίπτωση παραστατικών οντοτήτων της περ. γ’ της παρ. 2 του άρθρου 5 του ν. 1138/2020 (οντότητες παροχής ηλεκτρικής ενέργειας και φυσικού αερίου (Δ.Ε.Η. και λοιποί πάροχοι), η Ε.Υ.Δ.Α.Π, κλπ…), ενώ η τιμή {3} είναι επιτρεπτή μόνο για περίπτωση αποστολής από ERP: 3 : Απώλεια διασύνδεσης | Επιτρεπτές τιμές {1,4}. Αδυναμία επιτρεπτές μόνο για περίπτωση αποστολής από παρόχους: |
| `issuer` | `PartyType` | Όχι | Εκδότης Παραστατικού |  |
| `counterpart` | `PartyType` | Όχι | Λήπτης Παραστατικού |  |
| `paymentMethods` | `PaymentMethodDetailType` | Όχι | Τρόποι Πληρωμής |  |
| `invoiceHeader` | `InvoiceHeaderType` | Ναι | Επικεφαλίδα Παραστατικού |  |
| `invoiceDetails` | `InvoiceRowType` | Ναι | Γραμμές Παραστατικού |  |
| `taxesTotals` | `TaxesType` | Όχι | Σύνολα Φόρων |  |
| `invoiceSummary` | `InvoiceSummaryType` | Ναι | Περίληψη Παραστατικού |  |
| `qrCodeUrl` | `xs:string` | Όχι | Κωδικοποιημένο αλφαριθμητικό για να χρησιμοποιηθεί από τα προγράμματα για τη δημιουργία QR Code τύπου Url | Συμπληρώνεται την Υπηρεσία |
| `downloadingInvoiceUrl xs:string` |  | Όχι | • url όπου ο λήπτης του παραστατικού με κλήση ορισμό παραμέτρου θα μπορεί να λαμβάνει το παραστατικό • αυτό το url θα πρέπει να χρησιμοποιείται για τη δημιουργία του QR | Έγκυρο μόνο στην περίπτωση διαβίβασης αυτού |

## 5.1 Στοιχεία οντότητας

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `vatNumber` | `xs:string` | Ναι | ΑΦΜ έγκυρος ΑΦΜ | Οποιοσδήποτε |
| `country` | `xs:string` | Ναι | Κωδικός Χώρας | Κωδικοί χωρών |
| `branch` | `xs:int` | Ναι | Αρ. Εγκατάστασης | Ελάχιστη τιμή = 0 |
| `name` | `xs:string` | Όχι | Επωνυμία |  |
| `address` | `AddressType Όχι` | Διεύθυνση |  |  |
| `documentIdNo` | `xs:string` | Όχι | Αριθμός επίσημου εγγράφου περίπτωση παραστατικού tax free (specialInvoiceCategory = 4) | Μέγιστο μήκος 100. Έγκυρο μόνο |
| `supplyAccountNo` | `xs:string` | Όχι | Αρ. Παροχής Μέγιστο Ηλ. Ρεύματος μήκος 100. Έγκυρο μόνο περίπτωση παραστατικών καυσίμων | επιτρεπτό στην |
| `countryDocumentId` | `xs:string` | Όχι | Κωδ. Χώρας Κωδικοί χωρών Έκδοσης Επίσημου Εγγράφου |  |

## 5.1.1 Διεύθυνση Οντότητας

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `street` | `xs:string` | Όχι | Οδός |  |
| `number` | `xs:string` | Όχι | Αριθμός |  |
| `postalCode` | `xs:string` | Ναι | ΤΚ |  |
| `city` | `xs:string` | Ναι | Πόλη |  |

## 5.2 Τρόπος Πληρωμής

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `type` | `xs:int` | Ναι | Τύπος Πληρωμής | Ελάχιστη τιμή = 1 Μέγιστη τιμή = 5 |
| `amount` | `xs:decimal` | Ναι | Ποσό Πληρωμής Ελάχιστη | τιμή = 0 Δεκαδικά ψηφία = 2 |
| `paymentMethodInfo` | `xs:string` | Όχι | Πληροφορίες |  |
| `tipAmount` | `xs:decimal` | Όχι | Ποσό φιλοδωρήματος τιμή = 0 | Ελάχιστη Δεκαδικά ψηφία = 2 |
| `transactionId` | `xs:string` | Όχι | Μοναδική Ταυτότητα Πληρωμής |  |
| `tid` | `xs:string` | Όχι | Κωδικός POS | tid επιτρεπτό μήκος 200 |
| `ProvidersSignature` | `ProviderSignatureType Όχι` |  | Υπογραφή Πληρωμής Παρόχου |  |
| `ECRToken` | `ECRTokenType` | Όχι | Υπογραφή Πληρωμής ΦΗΜ με σύστημα λογισμικού (ERP) |  |

## 5.2.1 Υπογραφή Πληρωμής Παρόχου

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `SigningAuthor` | `xs:string Ναι` |  | Αριθμός Απόφασης έγκρισης ΥΠΑΗΕΣ Παρόχου | Μέγιστο επιτρεπτό μήκος 20 |
| `Signature` | `xs:string Ναι` |  | Υπογραφή | Λεπτομέρειες στην αριθμ. 1155/09-102023 απόφαση (ΦΕΚ Β΄/13.10.2023), όπως ισχύει |
| `EndToEndReferenceID xs:string Όχι` |  |  | Το μοναδικό αναγνωριστικό αιτήματος πληρωμής (για πληρωμές IRIS) |  |

## 5.2.2 Υπογραφή Πληρωμής ΦΗΜ με σύστημα λογισμικού (ERP)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `SigningAuthor xs:string` |  | Ναι | ECR id: Αριθμός Μέγιστο μητρώου του επιτρεπτό φορολογικού μηχανισμού | μήκος 20 |
| `Signature` | `xs:string` | Ναι | Υπογραφή | Λεπτομέρειες στην υπ’ αριθμ. Α. 1155/09-102023 απόφαση (ΦΕΚ Β΄/13.10.2023), όπως ισχύει |

## 5.3 Επικεφαλίδα παραστατικού

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `series` | `xs:string` | Ναι | Σειρά παραστατικού μήκος 50 | Μέγιστο επιτρεπτό |
| `aa` | `xs:string` | Ναι | ΑΑ Παραστατικού επιτρεπτό μήκος 50 | Μέγιστο |
| `issueDate` | `xs:date` | Ναι | Ημ. Έκδοσης Παραστατικού |  |
| `invoiceType` | `xs:string` | Ναι | Είδος Παραστατικού 1.4, 1.5, 1.6, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 4, 5.1, 5.2, 6.1, 6.2, 7.1, 8.1, 8.2,8.3, 8.4, 8.5, 8.6, 9.1, 9.2, 9.3, 10.1, 11.1, 11.3, 11.5, 13.1, 13.3, 13.30, 13.31, 14.1, 14.3, 14.5, 14.30, 14.31, 15.1, 16.1, 17.2, 17.4, 17.6. [Για περίπτωση των παρόχων μόνο οι τιμές | Λίστα τιμών: 1.1, 1.2, 1.3, 10.2, 11.2, 11.4, 12, 13.2, 13.4, 14.2, 14.4, 17.1, 17.3, 17.5, την |

## 5.3.1 Λοιπές Συσχετιζόμενες Οντότητες

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `type` | `xs:int` | Ναι | Κατηγορία Οντότητας | Πίνακας Παραρτήματος |
| `entityData` | `PartyType` | Ναι | Στοιχεία Οντότητας (Προσώπου) |  |

## 5.3.2 Λοιπά Γενικά Στοιχεία Διακίνησης

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `loadingAddress` | `AddressType` | Ναι | Διεύθυνση Φόρτωσης | Συμπληρώνεται για παραστατικά που είναι δελτία αποστολής (π.χ 9.3) ή τιμολόγιο και αποστολής (isDeliveryNote = true) |
| `deliveryAddress` | `AddρessType Ναι` |  | Διεύθυνση Παράδοσης | Συμπληρώνεται για παραστατικά που είναι δελτία αποστολής (π.χ 9.3) ή τιμολόγιο και αποστολής (isDeliveryNote = true) |
| `startShippingBranch` | `xs:int` | Όχι | Εγκατάσταση έναρξης διακίνησης (Εκδότη) | Συμπληρώνεται για παραστατικά που είναι δελτία αποστολής (π.χ 9.3) ή τιμολόγιο και αποστολής (isDeliveryNote = true) |
| `completeShippingBranch xs:int` |  | Όχι | Εγκατάσταση ολοκλήρωσης διακίνησης (Λήπτη) | Συμπληρώνεται για παραστατικά που είναι δελτία αποστολής (π.χ 9.3) ή τιμολόγιο και αποστολής (isDeliveryNote = true) |

## 5.4 Στοιχεία παραστατικού

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `lineNumber` | `xs:int` | Ναι | ΑΑ γραμμής | Ελάχιστη τιμή = 1 |
| `recType` | `xs:int` | Όχι | Είδος Γραμμής | Ελάχιστη τιμή = 1 Μέγιστη τιμή = 7 Σημείωση: παρούσα έκδοση οι τιμές 1, 4 και 5 δεν θα χρησιμοποιηθούν – έχουν δεσμευτεί στο μοντέλο μελλοντική χρήση |
| `fuelCode` | `FuelCodes` | Όχι | Κωδικός Καυσίμου | Κωδικοί (Λίστα αναλυτικά οι τιμές στο παράρτημα) Αποδεκτό μόνο για την περίπτωση που το παραστατικό είναι παραστατικό καυσίμων |
| `quantity` | `xs:decimal` | Όχι | Ποσότητα | Ελάχιστη τιμή = 0 |
| `measurementUnit` | `xs:int` | Όχι | Είδος Ποσότητας | Λίστα τιμών: Στο παράτημα λεπτομέρειες |
| `invoiceDetailType` | `xs:int` | Όχι | Επισήμανση | Λίστα τιμών: 1,2 |
| `netValue` | `xs:decimal` | Ναι | Καθαρή αξία | Ελάχιστη τιμή = 0 Δεκαδικά ψηφία = 2 |
| `vatCategory` | `xs:int` | Ναι | Κατηγορία ΦΠΑ | Λίστα τιμών: Στο παράτημα λεπτομέρειες |
| `vatAmount` | `xs:decimal` | Ναι | Ποσό ΦΠΑ | Ελάχιστη τιμή = 0 Δεκαδικά ψηφία = 2 |
| `vatExemptionCategory` | `xs:int` | Όχι | Κατηγορία Αιτίας Εξαίρεσης ΦΠΑ | Λίστα τιμών: Στο παράτημα λεπτομέρειες |
| `dienergia` | `ShipType` | Όχι | ΠΟΛ 1177/2018 Αρ. 27 |  |
| `discountOption` | `xs:boolean` | Όχι | Δικαίωμα Έκπτωσης | False / True |
| `withheldAmount` | `xs:decimal` |  | Όχι Παρακράτησης Φόρου | Ποσό Δεκαδικά ψηφία = 2 |
| `withheldPercentCategory` | `xs:int` |  | Όχι Συντελεστή Παρακράτησης Φόρου | Κατηγορία Στο παράτημα λεπτομέρειες |
| `stampDutyAmount` | `xs: decimal` |  | Όχι Τέλους συναλλαγής | Ποσό Ψηφιακού Δεκαδικά ψηφία = 2 |
| `stampDutyPercentCategory` | `xs:int` |  | Όχι Συντελεστή Ψηφιακού Τέλους συναλλαγής | Κατηγορία Στο παράτημα λεπτομέρειες |
| `feesAmount` | `xs:decimal` |  | Όχι | Ποσό Τελών Δεκαδικά ψηφία = 2 |
| `feesPercentCategory` | `xs:int` |  | Όχι Συντελεστή Τελών | Κατηγορία Στο παράτημα λεπτομέρειες |
| `otherTaxesPercentCategory` | `xs:int` |  | Όχι Συντελεστή Λοιπών Φόρων | Κατηγορία Στο παράτημα λεπτομέρειες |
| `otherTaxesAmount` | `xs:decimal` |  | Όχι Φόρων | Ποσό Λοιπών Δεκαδικά ψηφία = 2 |
| `deductionsAmount` | `xs:decimal` |  | Όχι | Ποσό Κρατήσεων Δεκαδικά ψηφία = 2 |
| `lineComments` | `xs:string` |  | Όχι | Σχόλια Γραμμής |
| `incomeClassification` | `IncomeClassificationType` |  | Όχι Εσόδων | Χαρακτηρισμοί |
| `expensesClassification` | `ExpensesClassificationType` |  | Όχι Εξόδων | Χαρακτηρισμοί |
| `quantity15` | `xs:decimal` |  | Όχι Θερμοκρασίας 15 βαθμών | Ποσότητα Αποδεκτό μόνο στην περίπτωση αποστολής παρόχους και για την περίπτωση που το παραστατικό παραστατικό καυσίμων |
| `itemDescr` | `xs:string` |  | Όχι Είδους tax free ή που είναι τιμολόγια και δελτία αποστολής ή απλά δελτία (π.χ 9.3) | Περιγραφή μήκος 300. Αποδεκτό μόνο στην περίπτωση παραστατικών ειδικής κατηγορίας διακίνησης |
| `TaricNo` | `xs:string` | Όχι | Κωδικός Taric | Υποχρεωτικό μήκος 10. Αποδεκτό μόνο στην περίπτωση παραστατικών που είναι τιμολόγια και δελτία αποστολής ή απλά διακίνησης (π.χ 9.3) |
| `itemCode` | `xs:string` | Όχι | Κωδικός Είδους | Μέγιστο επιτρεπτό μήκος 50. Αποδεκτό μόνο στην περίπτωση παραστατικών που είναι τιμολόγια και δελτία αποστολής ή απλά διακίνησης (π.χ 9.3) |
| `otherMeasurementUnitQuantity xs:int` |  | Όχι Μέτρησης Τεμάχια Άλλα | Πλήθος Μονάδας Αποδεκτό μόνο στην περίπτωση measurementUnit = 7 (Τεμάχια_Λοιπές Περιπτώσεις) | που |
| `otherMeasurementUnitTitle` | `xs:string` | Όχι Μέτρησης Τεμάχια Άλλα | Τίτλος Μονάδας Αποδεκτό μόνο στην περίπτωση measurementUnit = 7 (Τεμάχια_Λοιπές Περιπτώσεις) | που |
| `notVAT195` | `xs:boolean` | Όχι | Ένδειξη μη συμμετοχής στο ΦΠΑ (έσοδα – εκροές) | Αποδεκτό μόνο για παραστατικά εσόδων μεταξύ των τύπων 1.1 – 11.5 |
| `movePurposeLine` | `xs:int` | Όχι | Σκοπός Διακίνησης Γραμμής | Λίστα τιμών: Στο παράτημα λεπτομέρειες (Σκοποί Διακίνησης) |
| `otherMovePurposeLineTitle` | `xs:string` | Όχι Αιτίας Διακίνησης Γραμμής | Τίτλος της Λοιπής |  |

## 5.4.1 Δήλωση Διενέργειας (ΠΟΛ 1177/2018 Αρ. 27)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `applicationId` | `xs:string` | Ναι | Αριθμός Δήλωσης Διενέργειας Δραστηριότητας |  |
| `applicationDate` | `xs:date` | Ναι | Ημερομηνία Δήλωσης |  |
| `doy` | `xs:string` | Όχι | ΔΟΥ Δήλωσης |  |
| `shipID` | `xs:string` | Ναι | Στοιχεία Πλοίου |  |

## 5.5 Σύνολα Φόρων

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `taxType` | `xs:byte` | Ναι | Είδος Φόρου 1 = Παρακρατούμενος Φόρος 2 = Τέλη 3 = Λοιποί Φόροι 4 = Ψηφιακού Τέλος συναλλαγής 5 = Κρατήσεις | Λίστα τιμών: |
| `taxCategory` | `xs:byte` | Όχι | Κατηγορία Φόρου | Ελάχιστη τιμή = 1 |
| `underlyingValue` | `xs:decimal` | Όχι | Υποκείμενη Αξία Δεκαδικά ψηφία = 2 | Ελάχιστη τιμή = 0 |
| `taxAmount` | `xs:decimal` | Ναι | Ποσό Φόρου Δεκαδικά ψηφία = 2 | Ελάχιστη τιμή = 0 |
| `id` | `xs:byte` | Όχι | Αύξων αριθμός γραμμής |  |

## 5.6 Περίληψη παραστατικού

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `totalNetValue` | `xs:decimal` | Ναι | Σύνολο Καθαρής Αξίας | Ελάχιστη τιμή = 0 Δεκαδικά ψηφία = 2 |
| `totalVatAmount` | `xs:decimal` | Ναι | Σύνολο ΦΠΑ | Ελάχιστη τιμή = 0 Δεκαδικά ψηφία = 2 |
| `totalWithheldAmount` | `xs:decimal` | Ναι | Σύνολο Παρακρατήσεων Φόρων | Ελάχιστη τιμή = 0 Δεκαδικά ψηφία = 2 |
| `totalFeesAmount` | `xs:decimal` | Ναι | Σύνολο Τελών | Ελάχιστη τιμή = 0 Δεκαδικά ψηφία = 2 |
| `totalStampDutyamount` | `xs:decimal` | Ναι | Σύνολο Ψηφιακού Τέλους συναλλαγής | Ελάχιστη τιμή = 0 Δεκαδικά ψηφία = 2 |
| `totalOtherTaxesAmount` | `xs:decimal` | Ναι | Σύνολο Λοιπών Φόρων | Ελάχιστη τιμή = 0 Δεκαδικά ψηφία = 2 |
| `totalDeductionsAmount` | `xs:decimal` | Ναι | Σύνολο Κρατήσεων | Ελάχιστη τιμή = 0 Δεκαδικά ψηφία = 2 |
| `totalGrossValue` | `xs:decimal` | Ναι | Συνολική Αξία | Ελάχιστη τιμή = 0 Δεκαδικά ψηφία = 2 |
| `incomeClassification` | `IncomeClassificationType` | Όχι | Χαρακτηρισμοί Εσόδων |  |
| `expensesClassification` | `ExpensesClassificationType` | Όχι | Χαρακτηρισμοί Εξόδων |  |

## 5.7 Πληροφορίες Λοιπών Μεταφορικών Μέσων (Καταργήθηκε)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `vehicleNumber` | `xs:string` | Ναι | Αριθμός Μεταφορικού Μέσου | Μέγιστο επιτρεπτό μήκος 50 |

## 5.8 Χαρακτηρισμός Εσόδων

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `classificationType` | `xs: string` | Όχι | Κωδικός Χαρακτηρισμού | Λίστα τιμών: Στο σχετικό παράτημα λεπτομέρειες |
| `classificationCategory` | `xs: string` | Ναι | Κατηγορία Χαρακτηρισμού | Λίστα τιμών: Στο σχετικό παράτημα λεπτομέρειες |
| `amount` | `xs:decimal` | Ναι | Ποσό | Ελάχιστη τιμή = 0 Δεκαδικά ψηφία = 2 |
| `id` | `xs:byte` | Όχι | Αύξων αριθμός Χαρακτηρισμού |  |

## 5.9 Χαρακτηρισμός Εξόδων

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `classificationType` | `xs: string` | Όχι | Κωδικός Χαρακτηρισμού | Λίστα τιμών: Στο σχετικό παράτημα λεπτομέρειες |
| `classificationCategory` | `xs: string` | Όχι | Κατηγορία Χαρακτηρισμού | Λίστα τιμών: Στο σχετικό παράτημα λεπτομέρειες |
| `amount` | `xs:decimal` | Ναι | Ποσό | Ελάχιστη τιμή = 0 Δεκαδικά ψηφία = 2 |
| `vatAmount` | `xs:decimal` | Όχι | Ποσό ΦΠΑ | Ελάχιστη τιμή = 0 Δεκαδικά ψηφία = 2 |
| `vatCategory` | `xs:byte` | Όχι | Κατηγορία ΦΠΑ | Λίστα τιμών: Στο σχετικό παράτημα λεπτομέρειες |
| `vatExemptionCategory xs:byte` |  | Όχι | Κατηγορία Εξαίρεσης ΦΠΑ | Λίστα τιμών: Στο σχετικό παράτημα λεπτομέρειες |
| `id` | `xs:byte` | Όχι | Αύξων αριθμός Χαρακτηρισμού |  |

## 5.10.1 Πληροφορίες Συσκευασίας (PackagingDetailType)

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `packagingType` | `xs:int` | Ναι | Είδος Συσκευασίας | Λίστα τιμών: Στο παράτημα λεπτομέρειες |
| `quantity` | `xs:int` | Ναι | Πλήθος |  |
| `otherPackagingTypeTitle xs: string` |  | Όχι | Τίτλος για Λοιπά Μέγιστο επιτρεπτό Είδη Συσκευασίας | μήκος 150 |

## 6.1 Υποβολή Δεδομένων

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `index` | `xs: int` | Όχι | Αριθμός Σειράς Οντότητας εντός του υποβληθέντος xml |  |
| `statusCode` | `xs: string` | Ναι | Κωδικός Αποτελέσματος | Success, ValidationError, TechnicalError, XMLSyntaxError |
| `invoiceUid` | `xs: string` | Όχι | Αναγνωριστικό Παραστατικού | Μήκος = 40 |
| `invoiceMark` | `xs: long` | Όχι | Μοναδικός Αριθμός Καταχώρησης Παραστατικού |  |
| `classificationMark` | `xs: long` | Όχι | Μοναδικός Αριθμός Παραλαβής Χαρακτηρισμού |  |
| `authenticationCode xs: string` |  | Όχι | Συμβολοσειρά Αυθεντικοποίησης |  |
| `cancellationMark` | `xs: long` | Όχι | Μοναδικός Αριθμός Ακύρωσης |  |
| `qrUrl` | `xs: string` | Όχι | Κωδικοποιημένο αλφαριθμητικό | Χρησιμοποιείται από τα προγράμματα για τη δημιουργία QR |

## 6.2 Λήψη Δεδομένων

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `continuationToken` | `continuationTokenType` | Όχι | Στοιχείο για την τμηματική λήψη αποτελεσμάτων |  |
| `invoicesDoc` | `AadeBookInvoiceType` | Όχι | Λίστα Παραστατικών |  |
| `cancelledInvoicesDoc` | `CancelledInvoiceType` | Όχι | Λίστα ακυρώσεων |  |
| `invoiceMark` | `xs:long` | Ναι | ΜΑΡΚ ακυρώθηκε | παραστατικού που |
| `cancellationMark` | `xs:long` | Ναι | ΜΑΡΚ ακύρωσης |  |
| `cancellationDate` | `xs:date` | Ναι | Ημερομηνία ακύρωσης |  |
| `incomeClassificationsDoc` | `InvoiceIncomeClassificationType` | Όχι | Λίστα Χαρακτηρισμών Εσόδων |  |
| `expensesClassificationsDoc` | `InvoiceExpensesClassificationType` | Όχι | Λίστα Χαρακτηρισμών Εξόδων |  |
| `paymentMethodsDoc` | `PaymentMethodType` | Όχι | Λίστα Τρόπων Πληρωμής |  |
| `nextPartitionKey` | `xs:string` | Ναι | Παράμετρος κλήση λήψης | για |
| `nextRowKey` | `xs:string` | Ναι | Παράμετρος κλήση λήψης | για |

## 6.3 Λήψη Στοιχείων Εσόδων - Εξόδων

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `continuationTokencontinuationTokenType Όχι` |  | Στοιχείο για την τμηματική λήψη αποτελεσμάτων |  |  |
| `counterVatNumber xs:string` |  | Όχι | ΑΦΜ λήπτη |  |
| `issueDate` | `xs:date` | Ναι Παραστατικού | Ημερομηνία έκδοσης |  |
| `invType` | `xs:string` | Ναι | Τύπος Παραστατικού |  |
| `selfpricing` | `xs:bool` | Όχι | Αυτοτιμολόγηση |  |
| `invoiceDetailType` | `xs:int` | Όχι | Επισήμανση |  |
| `netValue` | `xs:double` | Όχι | Καθαρή αξία |  |
| `vatAmount` | `xs:double` | Όχι | Ποσό ΦΠΑ |  |
| `withheldAmount` | `xs:double` | Όχι | Ποσό Παρακράτησης Φόρου |  |
| `otherTaxesAmount` | `xs:double` | Όχι | Ποσό Λοιπών Φόρων |  |
| `stampDutyAmount` | `xs:double` | Όχι συναλλαγής | Ποσό Ψηφιακού Τέλους |  |
| `feesAmount` | `xs:double` | Όχι | Ποσό Τελών |  |
| `deductionsAmount` | `xs:double` | Όχι | Ποσό Κρατήσεων |  |
| `thirdPartyAmount` | `xs:double` | Όχι | Ποσό Περί Τρίτων |  |
| `grossValue` | `xs:double` | Όχι | Συνολική Αξία |  |
| `count` | `xs:int` | Ναι | Πλήθος |  |
| `minMark` | `xs:string` | Όχι | Ελάχιστο ΜΑΡΚ πλήθους |  |
| `maxMark` | `xs:string` | Όχι | Μέγιστο ΜΑΡΚ πλήθους |  |

## 6.4 Λήψη Πληροφοριών για Στοιχεία ΦΠΑ

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `continuationToken` | `continuationTokenType Όχι` | Στοιχείο για την τμηματική λήψη αποτελεσμάτων |  |  |
| `Mark` | `xs:string` | Όχι | Το ΜΑΡΚ του παραστατικού |  |
| `IsCancelled` | `xs:boolean` | Όχι ακυρωμένο | Αν το παραστατικό είναι |  |
| `IssueDate` | `xs:dateTime` | Ναι παραστατικού | Ημερομηνία έκδοσης |  |
| `Vat301` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 301 |  |
| `Vat302` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 302 |  |
| `Vat303` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 303 |  |
| `Vat304` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 304 |  |
| `Vat305` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 305 |  |
| `Vat306` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 306 |  |
| `Vat331` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 331 |  |
| `Vat332` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 332 |  |
| `Vat333` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 333 |  |
| `Vat334` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 334 |  |
| `Vat335` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 335 |  |
| `Vat336` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 336 |  |
| `Vat361` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 361 |  |
| `Vat362` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 362 |  |
| `Vat363` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 363 |  |
| `Vat364` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 364 |  |
| `Vat365` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 365 |  |
| `Vat366` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 366 |  |
| `Vat381` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 381 |  |
| `Vat382` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 382 |  |
| `Vat383` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 383 |  |
| `Vat384` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 384 |  |
| `Vat385` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 385 |  |
| `Vat386` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 386 |  |
| `Vat342` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 342 |  |
| `Vat345` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 345 |  |
| `Vat348` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 348 |  |
| `Vat349` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 349 |  |
| `Vat310` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 310 |  |
| `Vat402` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 402 |  |
| `Vat407` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 407 |  |
| `Vat411` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 411 |  |
| `Vat423` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 423 |  |
| `Vat422` | `xs:decimal` | Όχι | Ποσό ΦΠΑ πεδίου 422 |  |
| `VatUnclassified361 xs:decimal` |  | Όχι χαρακτηρισμένα | Ποσό ΦΠΑ πεδίου | 361 |
| `VatUnclassified381 xs:decimal` |  | Όχι χαρακτηρισμένα | Ποσό ΦΠΑ πεδίου | 381 |

## 7 Σφάλματα

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `message` | `xs: string` | Ναι | Μήνυμα Σφάλματος |  |
| `code` | `xs: string` | Ναι | Κωδικός Σφάλματος |  |

| Field | Type | Required | Description | Values |
| :--- | :--- | :--- | :--- | :--- |
| `{'Ποσό Τελών', Κατηγορία` | `{‘stampDutyAmount,` |  |  |  |
| `Ποσοστού Τελών'},` | `‘stampDutyPercentCategory’` |  |  |  |
| `{'Ποσό Ψηφιακού Τέλους` | `},` |  |  |  |
| `συναλλαγής,' Κατηγορία` | `{‘withheldAmount’,` |  |  |  |
| `Ποσοστού Ψηφιακού Τέλους` | `‘withheldPercentCategory’}]` |  |  |  |
| `συναλλαγής},` |  |  |  |  |
| `{'Παρακρατηθέν Ποσό',` |  |  |  |  |
| `'Κατηγορία` |  |  |  |  |
| `Παρακρατηθέντος` |  |  |  |  |
| `Ποσοστού'}]` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 228 | Invoice | Το {Πεδίο} δεν είναι έγκυρο |
| `[Πιθανές τιμές {Πεδίο}: {UID,` | `[Possible {Field} values: {UID,` |  |  |  |
| `Τύπος Τιμολογίου}` | `InvoiceType}` |  |  |  |
| `[Αφορά μόνο τους` | `[Αφορά` | μόνο | τους |  |
| `παρόχους]` | `παρόχους]` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 229 | Invoice | Το {Πεδίο1} δεν είναι σωστό |
| `σύμφωνα με το δεδομένο:` | `according to the given:` |  |  |  |
| `{Πεδίο2} (γραμμή` | `{Field2}` | (invoice | line: |  |
| `τιμολογίου: {Αριθμός` | `{lineNumber})` |  |  |  |
| `Γραμμής})` | `[ Possible {Field1, Field2}` |  |  |  |
| `[Πιθανές τιμές {Πεδίο1,` | `values:` |  |  |  |
| `{'Ποσό Τελών', Κατηγορία` | `feesPercentCategory’},` |  |  |  |
| `Ποσοστού Τελών'},` | `{‘stampDutyAmount,` |  |  |  |
| `{'Ποσό Ψηφιακού Τέλους` | `‘stampDutyPercentCategory’` |  |  |  |
| `συναλλαγής,' Κατηγορία` | `},` |  |  |  |
| `Ποσοστού Ψηφιακού Τέλους` | `{‘withheldAmount’,` |  |  |  |
| `συναλλαγής},` | `‘withheldPercentCategory’}]` |  |  |  |
| `{'Παρακρατηθέν Ποσό',` | `[Αφορά` | μόνο | τους |  |
| `'Κατηγορία` | `παρόχους]` |  |  |  |
| `Παρακρατηθέντος` |  |  |  |  |
| `Ποσοστού'}]` |  |  |  |  |
| `[Αφορά μόνο τους` |  |  |  |  |
| `παρόχους]` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 230 | Invoice | Το {Πεδίο} είναι |
| `υποχρεωτικό για στοιχεία` | `invoice detail (number}` |  |  |  |
| `τιμολογίου (αριθμός}` | `[Possible {Field} values: {E3` |  |  |  |
| `[Πιθανές τιμές {Πεδίο} :` | `classifications,` | VAT |  |  |
| `{Ταξινομήσεις E3,` | `classifications}` |  |  |  |
| `ταξινομήσεις ΦΠΑ}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 231 | Invoice | Το {Πεδίο} απαγορεύεται |
| `για στοιχεία τιμολογίου` | `invoice detail (number}` |  |  |  |
| `(αριθμός}` | `[Possible {Field} values: {E3` |  |  |  |
| `[Πιθανές τιμές {Πεδίο} :` | `classifications,` | VAT |  |  |
| `{Ταξινομήσεις E3,` | `classifications}` |  |  |  |
| `ταξινομήσεις ΦΠΑ}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 233 | Invoice | UID: Το " + {uid} + " έχει ήδη |
| `σταλεί [Αφορά μόνο τους` | `been` | sent |  |  |
| `παρόχους]` | `[Αφορά παρόχους]` | μόνο | τους |  |
| `HTTP 200 OK` | `ValidationError` | 234 | Invoice | Οι τιμές 7 ή 8 δεν |
| `επιτρέπονται για την` | `allowed for Vat Category for` |  |  |  |
| `κατηγορία ΦΠΑ για αυτόν` | `this invoice type` |  |  |  |
| `τον τύπο τιμολογίου` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 235 | Invoice | Ο εκδότης πρέπει να είναι |
| `διαφορετικός από τον` | `from counterpart` |  |  |  |
| `αντίστοιχο` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 236 | Invoice | Ο Αποστολέας (ΑΦΜ): " + |
| `{ΑΦΜ} + " πρέπει να είναι` | `{afm} + " must be different` |  |  |  |
| `διαφορετικός από τον` | `from the issuer (vatnumber)` |  |  |  |
| `εκδότη (ΑΦΜ)` |  |  |  |  |
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
| `HTTP 200 OK` | `ValidationError` | 240 | Invoice | Ποσό Φόρου {Ποσό Φόρου} |
| `της Γραμμής Φόρου: Το` | `taxline: {A/A} cannot be` |  |  |  |
| `{A/A} δεν μπορεί να είναι` | `greater` | than | the |  |
| `μεγαλύτερο από την` | `corresponding` | underlying |  |  |
| `αντίστοιχη υποκείμενη αξία` | `value` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 241 | Invoice | Το {Πεδίο1} δεν μπορεί να |
| `είναι μεγαλύτερο από την` | `than the corresponding` |  |  |  |
| `αντίστοιχη καθαρή αξία` | `invoiceline net value (invoice` |  |  |  |
| `γραμμής τιμολογίου` | `line: + {linenumber} )` |  |  |  |
| `(Γραμμή Τιμολογίου: +` | `[ Possible {Field1} values:` |  |  |  |
| `{αριθμός γραμμής})` | `{‘feesAmount’,` |  |  |  |
| `[Πιθανές τιμές {Πεδίο1}:` | `‘otherTaxesPercentAmount’,` |  |  |  |
| `{'Ποσό Τελών', 'Ποσό` | `‘stampDutyAmount,` |  |  |  |
| `Ποσοστού Λοιπών Φόρων',` | `‘withheldAmount’}]` |  |  |  |
| `'Ποσό Τέλους Ψηφιακού` |  |  |  |  |
| `Τέλους συναλλαγής,` |  |  |  |  |
| `'Παρακρατηθέν Ποσό'}]` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 242 | Invoice | Η χώρα του {Πεδίο} για |
| `αυτόν τον τύπο τιμολογίου` | `invoice type must be Greece` |  |  |  |
| `πρέπει να είναι η Ελλάδα` | `[Possible {Field} values:` |  |  |  |
| `[Πιθανές τιμές {Πεδίο}:` | `{Issuer, Counterpart}` |  |  |  |
| `{Εκδότης,` |  |  |  |  |
| `Αντισυμβαλλόμενος}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 243 | Invoice | Η χώρα του {Πεδίο} για |
| `αυτόν τον τύπο τιμολογίου` | `invoice type must be in` |  |  |  |
| `πρέπει να είναι στην` | `Europe but not Greece` |  |  |  |
| `Ευρώπη αλλά όχι στην` | `[Possible {Field} values:` |  |  |  |
| `Ελλάδα` | `{Issuer, Counterpart}` |  |  |  |
| `[Πιθανές τιμές {Πεδίο}:` |  |  |  |  |
| `{Εκδότης,` |  |  |  |  |
| `Αντισυμβαλλόμενος}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 244 | Invoice | Η χώρα του {Πεδίο} για |
| `αυτόν τον τύπο τιμολογίου` | `invoice type must not be in` |  |  |  |
| `δεν πρέπει να είναι στην ΕΕ` | `EU` |  |  |  |
| `[Πιθανές τιμές {Πεδίο}:` | `[Possible {Field} values:` |  |  |  |
| `{Εκδότης,` | `{Issuer, Counterpart}` |  |  |  |
| `Αντισυμβαλλόμενος}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 245 | Invoice | Ο πάροχος δεν είναι |
| `εξουσιοδοτημένος να` | `issue` | Invoices | for: |  |
| `εκδίδει τιμολόγια για:` | `{vatNumber}` |  |  |  |
| `{ΑΦΜ}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 246 | Invoice | Το τιμολόγιο τύπου 1.5 |
| `πρέπει να έχει τουλάχιστον` | `have at least one line with` |  |  |  |
| `μία γραμμή με: Τύπος` | `detailtype = 1 and one with` |  |  |  |
| `Στοιχείου = 1 και μία με:` | `detail type=2` |  |  |  |
| `Τύπος Στοιχείου = 2` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 247 | Invoice | Γραμμή τιμολογίου: |
| `{Αριθμός Γραμμής}. Το` | `{Field} is forbidden.` |  |  |  |
| `{Πεδίο} είναι` | `[Possible {Field} values:` |  |  |  |
| `απαγορευμένο.` | `{recType=1,` | recType=4, |  |  |
| `[Πιθανές τιμές {Πεδίο}:` | `recType=5}` |  |  |  |
| `{Τύπος rec =1, Τύπος rec =4,` |  |  |  |  |
| `Τύπος rec =5}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 248 | Invoice | Το τιμολόγιο με MARK |
| `{mark} δεν μπορεί να` | `cannot be cancelled because` |  |  |  |
| `ακυρωθεί επειδή δεν` | `was not posted by VAT` |  |  |  |
| `δημοσιεύτηκε από τον ΑΦΜ` | `number {vat}` |  |  |  |
| `{ΑΦΜ}` |  |  |  |  |
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
| `HTTP 200 OK` | `ValidationError` | 253 | Invoice | Η Ημερομηνία Έκδοσης δεν |
| `είναι έγκυρη, πρέπει να` | `be greater or equal than` |  |  |  |
| `είναι μεγαλύτερη ή ίση με` | `{date} and less or equal than` |  |  |  |
| `{ημερομηνία} και μικρότερη` | `current date` |  |  |  |
| `ή ίση με την τρέχουσα` | `[Δεν αφορά τους παρόχους]` |  |  |  |
| `ημερομηνία` |  |  |  |  |
| `[Δεν αφορά τους παρόχους]` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 254 | Invoice | Γραμμή Φόρου (Σύνολα |
| `Φόρου): + {Αριθμός Γραμμής` | `{taxlinenumber} . {field +` |  |  |  |
| `Φόρου}. Το {Πεδίο +` | `fieldData} is forbidden` |  |  |  |
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
| `πρέπει να έχουν {Πεδίο}` | `{Field}` |  |  |  |
| `[Πιθανές τιμές {Πεδίο}:` | `[Possible {Field} values:` |  |  |  |
| `{Τύπος rec =3}` | `{recType=3}` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 259 | Invoice | Το τιμολόγιο δεν μπορεί να |
| `αναρτηθεί επειδή` | `because it replaces invoice` |  |  |  |
| `αντικαθιστά το τιμολόγιο με` | `with MARK {mark} having` |  |  |  |
| `MARK {mark} που έχει το` | `same UID and is still` |  |  |  |
| `ίδιο UID και εξακολουθεί να` | `connected` | with | active |  |
| `συνδέεται με ενεργά` | `invoices` |  |  |  |
| `τιμολόγια` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 260 | Invoice | Η Ημερομηνία Έκδοσης δεν |
| `είναι έγκυρη, πρέπει να` | `be less or equal than current` |  |  |  |
| `είναι μικρότερη ή ίση με την` | `date` |  |  |  |
| `τρέχουσα ημερομηνία` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 261 | Invoice | Κάθε σειρά τιμολογίου |
| `πρέπει να έχει μοναδικό` | `unique line number` |  |  |  |
| `αριθμό γραμμής` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 262 | Invoice | Το μήκος {Πεδίο} πρέπει να |
| `είναι μικρότερο ή ίσο από το` | `equal than {number}` |  |  |  |
| `{αριθμός}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 263 | Invoice | Το τιμολόγιο με Τύπο |
| `Τροποποίησης Τιμολογίου` | `invoiceVariationType {field}` |  |  |  |
| `{Πεδίο} και Ημερομηνία` | `and IssueDate {issueDate}` |  |  |  |
| `Έκδοσης {Ημερομηνία` | `cannot be sent earlier than {` |  |  |  |
| `Έκδοσης} δεν μπορεί να` | `date}` |  |  |  |
| `σταλεί νωρίτερα από` | `[Possible` | {field} | values: |  |
| `{ημερομηνία}` | `{invoiceVariationType=1,2,3,4}` |  |  |  |
| `[Πιθανές τιμές {Πεδίο}:` |  |  |  |  |
| `{Τύπος Τροποποίησης` |  |  |  |  |
| `Τιμολογίου =1,2,3,4}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 264 | Invoice | Το τιμολόγιο με Τύπο |
| `Τροποποίησης Τιμολογίου` | `invoiceVariationType {field}` |  |  |  |
| `{Πεδίο} δεν μπορεί να` | `cannot` | be | sent | for |
| `σταλεί για έτος` | `issueDate's year earlier than` |  |  |  |
| `Ημερομηνίας Έκδοσης` | `2021` |  |  |  |
| `νωρίτερα από το 2021` | `[Possible` | {field} | values: |  |
| `[Πιθανές τιμές {Πεδίο}:` | `{invoiceVariationType=1,2,3,` |  |  |  |
| `{Τύπος Τροποποίησης` | `4}` |  |  |  |
| `Τιμολογίου=1,2,3,4}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 265 | Invoice | Ο μέγιστος επιτρεπόμενος |
| `αριθμός τιμολογίων που` | `number` | of | invoices |  |
| `περιέχονται σε ένα μήνυμα` | `contained in one message is` |  |  |  |
| `είναι 5000` | `5000` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 266 | Invoice | Το {msg11} είναι |
| `απαγορευμένο {msg2}` | `[Possible {msg1} values:` |  |  |  |
| `[Πιθανές τιμές {msg1}:` | `{‘Invoice with` |  |  |  |
| `{'Τιμολόγιο με πεδίο Τύπος` | `SpecialInvoiceCategoryType` |  |  |  |
| `Ειδικής Κατηγορίας` | `field with value 4 (taxfree invoice)’}` |  |  |  |
| `Τιμολογίου με τιμή 4` | `[Possible {msg2} values: {‘for` |  |  |  |
| `(αφορολόγητο τιμολόγιο)'}` | `invoices sent by provider` |  |  |  |
| `[Πιθανές τιμές {msg2}: {'για` | `channel’}` |  |  |  |
| `τιμολόγια που` |  |  |  |  |
| `αποστέλλονται από το` |  |  |  |  |
| `κανάλι παρόχου'}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 267 | Invoice | Το {msg11} επιτρέπεται |
| `{msg2}` | `[Possible {msg1} values:` |  |  |  |
| `[Πιθανές τιμές {msg1}:` | `{‘Invoice with` |  |  |  |
| `{'Τιμολόγιο με πεδίο Τύπος` | `SpecialInvoiceCategoryType` |  |  |  |
| `Ειδικής Κατηγορίας` | `field with value 4 (taxfree invoice)’}` |  |  |  |
| `Τιμολογίου με τιμή 4` | `[Possible {msg2} values: {‘only` |  |  |  |
| `(αφορολόγητο τιμολόγιο)'}` | `for invoices sent by erp or` |  |  |  |
| `[Πιθανές τιμές {msg2}:` | `timologio channel’}` |  |  |  |
| `{'μόνο για τιμολόγια που` |  |  |  |  |
| `αποστέλλονται από κανάλι` |  |  |  |  |
| `erp ή timologio'}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 268 | Invoice | Στην περίπτωση του |
| `Τιμολογίου Καυσίμων,` | `least one line must have` |  |  |  |
| `τουλάχιστον μία γραμμή` | `fuelCode different from 999` |  |  |  |
| `πρέπει να έχει Κωδικό` |  |  |  |  |
| `Καυσίμων διαφορετικό από το 999` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 269 | Invoice | Στην περίπτωση του |
| `Τιμολογίου Καυσίμων, η` | `net value of the invoice line` |  |  |  |
| `καθαρή αξία της γραμμής` | `with fuelCode 999 must be` |  |  |  |
| `τιμολογίου με τον Κωδικό` | `less or equal than sum of net` |  |  |  |
| `Καυσίμων 999 πρέπει να` | `values of the other invoice` |  |  |  |
| `είναι μικρότερη ή ίση από το` | `lines` |  |  |  |
| `άθροισμα των καθαρών` |  |  |  |  |
| `αξιών των άλλων γραμμών` |  |  |  |  |
| `τιμολογίων` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 270 | Invoice | Στην περίπτωση του |
| `Τιμολογίου Καυσίμων, μόνο` | `one line can have fuelCode` |  |  |  |
| `μία γραμμή μπορεί να έχει` | `equal with 999` |  |  |  |
| `Κωδικό Καυσίμων ίσο με` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 271 | Invoice | Αριθμός γραμμής |
| `τιμολογίου: {αριθμός` | `{linenumber}.` |  |  |  |
| `γραμμής}. Το πεδίο` | `VatExemptionCategory field` |  |  |  |
| `Κατηγορία Απαλλαγής ΦΠΑ` | `is used only in case of` |  |  |  |
| `χρησιμοποιείται μόνο στην` | `vatCategory = 7` |  |  |  |
| `περίπτωση Κατηγορία ΦΠΑ =7` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 272 | Invoice | Το {Πεδίο} είναι |
| `υποχρεωτικό +` | `{moreInfo}` |  |  |  |
| `{Περισσότερες` | `[{moreInfo} μπορεί να είναι` |  |  |  |
| `Πληροφορίες}` | `null]` |  |  |  |
| `[{Περισσότερες` |  |  |  |  |
| `Πληροφορίες} μπορεί να` |  |  |  |  |
| `είναι κενό]` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 273 | Invoice | Το {Πεδίο} δεν επιτρέπεται + |
| `{Περισσότερες` | `{moreInfo}` |  |  |  |
| `Πληροφορίες}` | `[{moreInfo} μπορεί να είναι` |  |  |  |
| `[{περισσότερες` | `null]` |  |  |  |
| `πληροφορίες} μπορεί να` |  |  |  |  |
| `είναι κενό]` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 274 | Invoice | Το {Πεδίο} είναι |
| `υποχρεωτικό για αυτόν τον` | `invoicetype + {moreInfo}` |  |  |  |
| `τύπο τιμολογίου +` | `[{moreInfo} μπορεί να είναι` |  |  |  |
| `{Περισσότερες` | `null]` |  |  |  |
| `Πληροφορίες}` |  |  |  |  |
| `[{περισσότερες` |  |  |  |  |
| `πληροφορίες} μπορεί να` |  |  |  |  |
| `είναι κενό]` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 275 | Invoice | Το μήνυμα δεν μπορεί να |
| `περιέχει τιμολόγια και` | `invoices` | and |  |  |
| `τιμολόγια/δελτία αποστολής` | `invoices/consignment notes` |  |  |  |
| `με το ίδιο uid` | `with the same uid` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 276 | Invoice | Το μήκος του {Πεδίο} πρέπει |
| `να είναι ίσο με τον` | `with {number}` |  |  |  |
| `{αριθμός}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 277 | Invoice | Το μήνυμα δεν μπορεί να |
| `περιέχει τιμολόγια τύπου:` | `invoices` | of | type: |  |
| `{Τύπος Τιμολογίου} με το` | `{invoiceType} with the same` |  |  |  |
| `ίδιο uid` | `uid` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 278 | Invoice | Η Ημερομηνία Έκδοσης δεν |
| `είναι έγκυρη, πρέπει να` | `be greater or equal with` |  |  |  |
| `είναι μεγαλύτερη ή ίση με` | `current date` |  |  |  |
| `την τρέχουσα ημερομηνία` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 279 | Invoice | Το τιμολόγιο με MARK |
| `{mark} δεν μπορεί να` | `cannot be cancelled +` |  |  |  |
| `ακυρωθεί + {Περισσότερες` | `{moreInfo}` |  |  |  |
| `Πληροφορίες}` | `[{moreInfo} μπορεί να είναι` |  |  |  |
| `[{περισσότερες` | `null]` |  |  |  |
| `πληροφορίες} μπορεί να` |  |  |  |  |
| `είναι κενό]` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 280 | Invoice | Η Ημερομηνία Αποστολής |
| `δεν είναι έγκυρη, πρέπει να` | `must be greater or equal` |  |  |  |
| `είναι μεγαλύτερη ή ίση με` | `with current date` |  |  |  |
| `την τρέχουσα ημερομηνία` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 281 | Invoice | Τιμολόγιο τύπου 8.6 με |
| `totalCancelDeliveryOrders =` | `totalCancelDeliveryOrders =` |  |  |  |
| `αληθής, πρέπει να έχει μόνο` | `true, must have only one` |  |  |  |
| `μία σειρά. Η καθαρή αξία` | `row. The net value and vat` |  |  |  |
| `και το ποσό του ΦΠΑ αυτής` | `amount of this row must be` |  |  |  |
| `της σειράς πρέπει να είναι` | `equal with 0 and its vat` |  |  |  |
| `ίσα με 0 και η κατηγορία του` | `category must have value 8` |  |  |  |
| `ΦΠΑ πρέπει να έχει τιμή 8` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 282 | Invoice | Το {msg1} πρέπει να έχει |
| `τιμή μεγαλύτερη ή ίση του` | `greater or equal than 0 for` |  |  |  |
| `μηδενός για αυτό΄ν τον τύπο` | `this invoice type` |  |  |  |
| `του παραστατικού` | `[Possible {msg1} values:` |  |  |  |
| `[Πιθανές {msg1} τιμές: {‘Η` | `{‘NetValue per line, which have` |  |  |  |
| `καθαρή αξία κάθε γραμμής,με` | `recType = 6,’}` |  |  |  |
| `recType = 6,’}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 283 | Invoice | Το παραστατικό με ΜΑΡΚ |
| `{mark} είναι {invoicetype` | `{invoiceType Value} invoice` |  |  |  |
| `value}.` | `Με` | την | type. | With |
| `CancelDeliveryNote μέθοδο` | `CancelDeliveryNote method` |  |  |  |
| `μόνο` | `9.3` | παραστατικά | only 9.3 invoice type can be |  |
| `μπορούν να ακυρωθούν` | `cancelled.` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 284 | Invoice | Περάστε το ΑΦΜ οντότητας |
| `στις παραμέτρους σώμα του` | `entityVatNumber in the` |  |  |  |
| `http αιτήματος` | `request parameters` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 285 | Invoice | Ο πάροχος με {ΑΦΜ |
| `Παρόχου}` | `δεν` | είναι | {vatNumber} | is |
| `εξουσιοδοτημένος` | `να` | authorised to execute this |  |  |
| `εκτελεί αυτή τη μέθοδο για:` | `method` | for: |  |  |
| `{ΑΦΜ Οντότητας}` | `{entityVatNumber}` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 286 | Invoice | Ο εκδότης πρέπει να είναι |
| `ίδιος με τον λήπτη` | `counterpart` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 287 | Invoice | Η χώρα του {Πεδίο} για |
| `αυτόν τον τύπο τιμολογίου` | `invoice type must not be` |  |  |  |
| `δεν πρέπει να είναι η` | `Greece` |  |  |  |
| `Ελλάδα` | `[Possible {Field} values:` |  |  |  |
| `[Πιθανές τιμές {Πεδίο}:` | `{Issuer, Counterpart}` |  |  |  |
| `{Εκδότης,` |  |  |  |  |
| `Αντισυμβαλλόμενος}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 288 | Invoice | Η υποβολή τιμολογίου |
| `επιτρέπεται εντός δύο` | `allowed within two days` |  |  |  |
| `ημερών από την ημερομηνία` | `from the issue date when` |  |  |  |
| `έκδοσης όταν το` | `TransmissionFlag = 4` |  |  |  |
| `TransmissionFlag = 4` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 289 | Invoice | Το ΑΦΜ του {Πεδίο} πρέπει |
| `να είναι 000000000` | `000000000` |  |  |  |
| `[Πιθανές τιμές {Πεδίο}:` | `[Possible {Field} values:` |  |  |  |
| `{Εκδότης,` | `{Issuer’s, Counterpart’s}` |  |  |  |
| `Αντισυμβαλλόμενος}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 301 | Classification | Τα τιμολόγια με MARK |
| `{mark} δεν βρέθηκαν` | `requested not found` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 302 | Classification | Διπλότυπος αριθμός |
| `γραμμής ταξινόμησης` | `number {lineNumber}` |  |  |  |
| `{Αριθμός Γραμμής}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 303 | Classification | Ο αριθμός γραμμής |
| `{Αριθμός Γραμμής} δεν` | `not found in invoice with` |  |  |  |
| `βρέθηκε στο τιμολόγιο με MARK {mark}` | `MARK {mark}` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 304 | Classification | Όλες οι σειρές τιμολογίων ή |
| `καμία θα πρέπει να περιλαμβάνουν ταξινομήσεις` | `should have classifications included` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 305 | Classification | Γραμμή τιμολογίου: |
| `{Αριθμός Γραμμής}. Διπλότυπος τύπος` | `Duplicate classification type {classificationType}` |  |  |  |
| `ταξινόμησης {Τύπος` | `category{classificationCateg` |  |  |  |
| `Ταξινόμησης} και κατηγορία` | `ory}` |  |  |  |
| `{Κατηγορία Ταξινόμησης}` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 306 | Classification | Γραμμή τιμολογίου: |
| `{Αριθμός Γραμμής}. Το` | `Sum of classifications are not` |  |  |  |
| `άθροισμα των ταξινομήσεων` | `equal to line's net value` |  |  |  |
| `δεν είναι ίσο με την καθαρή αξία της γραμμής` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 307 | Classification | Ο τύπος ταξινόμησης {Τύπος |
| `Ταξινόμησης} απαγορεύεται για την κατηγορία` | `{classificationType} forbidden for Classification` | is |  |  |
| `ταξινόμησης {Κατηγορία Ταξινόμησης}` | `category {classificationCategory}` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 308 | Classification | Η κατηγορία ταξινόμησης |
| `{Κατηγορία Ταξινόμησης}` | `{classificationCategory}` | is |  |  |
| `απαγορεύεται για τον τύπο` | `forbidden for Invoice type` |  |  |  |
| `τιμολογίου {Τύπος Ταξινόμησης}` | `{classificationType}` |  |  |  |
| `HTTP 200 OK` | `ValidationError Ταξινόμησης}` | 309 classifications are forbidden | Classification | Ταξινομήσεις {Τρόπος |
| `απαγορεύονται για` | `for invoice with mark {mark}` |  |  |  |
| `τιμολόγιο με σήμα {mark}` | `on behalf of vat number` |  |  |  |
| `για λογαριασμό του ΑΦΜ` | `{vatNumber} for invoice row` |  |  |  |
| `{ΑΦΜ} για σειρά τιμολογίου` | `with detail type {detailType}` |  |  |  |
| `με τύπο στοιχείου {Τύπος Στοιχείου}` |  |  |  |  |
| `HTTP 200 OK` | `TechnicalError` | 310 | Classification | Όλες οι ταξινομήσεις |
| `τιμολογίων ή καμία θα` | `or none should have` |  |  |  |
| `πρέπει να έχουν τιμή` | `category` | value |  |  |
| `κατηγορίας {Κατηγορία Ταξινόμησης}` | `{classificationCategory}` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 311 | Classification | Ταξινόμηση με τύπο {Τύπος |
| `Ταξινόμησης} και κατηγορία` | `{classificationType}` | and |  |  |
| `" {Κατηγορία Ταξινόμησης}` | `category` | " |  |  |
| `δεν βρέθηκε στην περίληψη τιμολογίων` | `{classificationCategory} not found in invoice summary` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 312 | Classification | Άθροισμα ταξινομήσεων με |
| `τύπο {Τύπος Ταξινόμησης}` | `type {classificationType} and` |  |  |  |
| `και κατηγορία {Κατηγορία` | `category` |  |  |  |
| `Ταξινόμησης} που δεν` | `{classificationCategory} not` |  |  |  |
| `ταιριάζει με το σχετικό` | `matching with related total` |  |  |  |
| `σύνολο στην περίληψη τιμολογίων` | `in invoice summary` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 313 | Classification | Ο τύπος ταξινόμησης {Τύπος |
| `Ταξινόμησης} απαγορεύεται για την κατηγορία` | `{classificationType} forbidden for Classification` | is |  |  |
| `ταξινόμησης {Κατηγορία` | `category` |  |  |  |
| `Ταξινόμησης} σε συνδυασμό` | `{classificationCategory}` |  |  |  |
| `με τον τύπο τιμολογίου` | `combined with invoice type` |  |  |  |
| `{Τύπος Τιμολογίου}` | `{invoiceType}` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 314 | Classification | Όλα τα τιμολόγια πρέπει να |
| `περιέχουν είτε την ενότητα` | `either income or expenses` |  |  |  |
| `ταξινομήσεων εσόδων ή` | `classifications section, not` |  |  |  |
| `εξόδων, όχι και τις δύο ή καμία` | `both or none` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 315 | Classification | Οι χαρακτηρισμοί |
| `(ταξινομήσεις) ΦΠΑ δεν` | `category` |  |  |  |
| `έχουν κατηγορία` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError χαρακτηρισμοί` | 316 allowed in case of VAT | Classification | Δεν επιτρέπονται |
| `(ταξινομήσεις) ΦΠΑ σε` | `exemption` |  |  |  |
| `περίπτωση απαλλαγής από τον ΦΠΑ` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 317 | Classification | Στοιχεία τιμολογίου |
| `{Αριθμός Γραμμής}: Η` | `: VAT classification must be` |  |  |  |
| `ταξινόμηση ΦΠΑ πρέπει να` | `of type 366 in case` |  |  |  |
| `είναι τύπου 366 σε` | `vatExemptionCategory = 16` |  |  |  |
| `περίπτωση Κατηγορία` |  |  |  |  |
| `Απαλλαγής ΦΠΑ = 16` |  |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 318 | Invoice | Το στοιχείο {Πεδίο} πρέπει |
| `να έχει την ίδια τιμή με το συσχετισμένο` | `same value with correlated's one` |  |  |  |
| `HTTP 200 OK` | `ValidationError` | 319 | Invoice | Η καθαρή αξία του |
| `συσχετισμένου τιμολογίου` | `invoice already exceeded by` |  |  |  |
| `έχει ήδη υπερβεί το` | `sum of net values of invoices` |  |  |  |
| `άθροισμα των καθαρών` | `correlated to it` |  |  |  |
| `αξιών των τιμολογίων που` |  |  |  |  |
| `σχετίζονται με αυτό` |  |  |  |  |

## 8.2 Κατηγορία Φ.Π.Α.

| Code | Description |
| :--- | :--- |
| 1 | ΦΠΑ συντελεστής 24% — 24% |
| 2 | ΦΠΑ συντελεστής 13% — 13% |
| 3 | ΦΠΑ συντελεστής 6% — 6% |
| 4 | ΦΠΑ συντελεστής 17% — 17% |
| 5 | ΦΠΑ συντελεστής 9% — 9% |
| 6 | ΦΠΑ συντελεστής 4% — 4% |
| 7 | Άνευ Φ.Π.Α. Εγγραφές χωρίς ΦΠΑ — 0% |
| 8 | (πχ Μισθοδοσία, Αποσβέσεις) ΦΠΑ συντελεστής 3% (αρ.31 — - |
| 9 | ν.5057/2023) ΦΠΑ συντελεστής 4% (αρ.31 — 3% |
| 10 | ν.5057/2023) — 4% |

## 8.4 Κατηγορία Παρακρατούμενων Φόρων

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
| 11 | Παρακράτηση Φόρου Μισθωτών Υπηρεσιών παρ. 1 αρ. 15 ν. 4172/2013 — ποσό |
| 12 | Παρακράτηση Φόρου Μισθωτών Υπηρεσιών παρ. 2 αρ. 15 ν. 4172/2013 Αξιωματικών Εμπορικού Ναυτικού — 15% |
| 13 | Παρακράτηση Φόρου Μισθωτών Υπηρεσιών παρ. 2 αρ. 15 ν. 4172/2013 Κατώτερο Πλήρωμα Εμπορικού Ναυτικού — 10% |
| 14 | Παρακράτηση Ειδικής Εισφοράς Αλληλεγγύης — ποσό |
| 15 | Παρακράτηση Φόρου Αποζημίωσης λόγω Διακοπής Σχέσης Εργασίας παρ. — ποσό |
| 16 | Παρακρατήσεις συναλλαγών αλλοδαπής βάσει συμβάσεων αποφυγής διπλής φορολογίας (Σ.Α.Δ.Φ.) — ποσό |
| 17 | Λοιπές Παρακρατήσεις Φόρου — ποσό |
| 18 | Παρακράτηση Φόρου Μερίσματα περ.α παρ. 1 αρ. 64 ν. 4172/2013 — 5% |

## 8.5 Κατηγορία Λοιπών Φόρων

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
| 17 | Λοιποί Φόροι — ποσό |
| 18 | Επιβαρύνσεις Λοιπών Φόρων — ποσό |
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

## 8.6 Κατηγορία Συντελεστή Ψηφιακού Τέλους συναλλαγής

| Code | Description |
| :--- | :--- |
| 1 | Συντελεστής 1,2 % — 1,20% |
| 2 | Συντελεστής 2,4 % — 2,40% |
| 3 | Συντελεστής 3,6 % — 3,60% |
| 4 | Λοιπές περιπτώσεις — ποσό |

## 8.7 Κατηγορία Τελών

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
| 11 | Τέλη Λοιπών Φόρων — Ποσό |
| 12 | Εισφορά δακοκτονίας — Ποσό |
| 13 | Για μηνιαίο λογαριασμό κάθε σύνδεσης (10%) — 10% |
| 14 | Τέλος καρτοκινητής επί της αξίας του χρόνου ομιλίας (10%) — 10% |
| 15 | Τέλος κινητής και καρτοκινητής για φυσικά πρόσωπα ηλικίας 15 έως και 29 ετών (0%) — 0% |
| 16 | Εισφορά προστασίας περιβάλλοντος πλαστικών προϊόντων 0,04 λεπτά ανά τεμάχιο [άρθρο 4 ν. 4736/2020] — ποσό |
| 17 | Τέλος ανακύκλωσης 0,08 λεπτά ανά τεμάχιο [άρθρο 80 ν. 4819/2021] — Ποσό |
| 18 | Τέλος διαμονής παρεπιδημούντων — Ποσό |
| 19 | Τέλος επί των ακαθάριστων εσόδων των εστιατορίων και συναφών καταστημάτων — Ποσό |
| 20 | Τέλος επί των ακαθάριστων εσόδων των κέντρων διασκέδασης — Ποσό |
| 21 | Τέλος επί των ακαθάριστων εσόδων των καζίνο — Ποσό |
| 22 | Λοιπά τέλη επί των ακαθάριστων εσόδων — Ποσό |

## 8.12 Τρόποι Πληρωμής

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

## 8.13 Είδος Ποσότητας

| Code | Description |
| :--- | :--- |
| 1 | Τεμάχια |
| 2 | Κιλά |
| 3 | Λίτρα |
| 4 | Μέτρα |
| 5 | Τετραγωνικά Μέτρα |
| 6 | Κυβικά Μέτρα |
| 7 | Τεμάχια_Λοιπές Περιπτώσεις |

## 8.14 Σκοπός Διακίνησης

| Code | Description |
| :--- | :--- |
| 1 | Πώληση — |
| 2 | Πώληση για Λογαριασμό Τρίτων — |
| 3 | Δειγματισμός — |
| 4 | Έκθεση — |
| 5 | Επιστροφή — Από την τρέχουσα έκδοση δεν θα |
| 6 | Φύλαξη — είναι δυνατή η αποστολή με αυτή την τιμή. |
| 7 | Επεξεργασία Συναρμολόγηση — |
| 8 | Μεταξύ Εγκαταστάσεων Οντότητας — |
| 9 | Αγορά Εφοδιασμός πλοίων και αεροσκαφών — |
| 11 | Δωρεάν διάθεση — |
| 12 | Εγγύηση — |
| 13 | Χρησιδανεισμός — |
| 14 | Αποθήκευση σε Τρίτους — |
| 15 | Επιστροφή από Φύλαξη — Από την τρέχουσα έκδοση δεν θα είναι δυνατή η αποστολή με αυτή την τιμή. Από την τρέχουσα έκδοση δεν θα |
| 16 | Ανακύκλωση — είναι δυνατή η αποστολή με αυτή την τιμή. Από την τρέχουσα έκδοση δεν θα |
| 17 | Καταστροφή άχρηστου υλικού — είναι δυνατή η αποστολή με αυτή την τιμή. Από την τρέχουσα έκδοση δεν θα |
| 18 | Διακίνηση Παγίων (Ενδοδιακίνηση) — είναι δυνατή η αποστολή με αυτή την τιμή. |
| 19 | Λοιπές Διακινήσεις — |
| 20 | Μεταφορές - Ταχυμεταφορές — |

## 8.15 Επισήμανση

| Code | Description |
| :--- | :--- |
| 1 | Εκκαθάριση Πωλήσεων Τρίτων |
| 2 | Αμοιβή από Πωλήσεις Τρίτων |

## 8.16 Είδος Γραμμής

| Code | Description |
| :--- | :--- |
| 1 | Ειδική Γραμμή Παρακρατούμενων Φόρων — Ανενεργός - για μελλοντική χρήση |
| 2 | Γραμμή Τέλους με Φ.Π.Α. — |
| 3 | Γραμμή Λοιπών Φόρων με Φ.Π.Α. — |
| 4 | Ειδική Γραμμή Ψηφιακού Τέλους συναλλαγής — Ανενεργός - για μελλοντική χρήση |
| 5 | Ειδική Γραμμή Κρατήσεων — Ανενεργός - για μελλοντική χρήση |
| 6 | Δωροεπιταγή — Έγκυρο μόνο στις περιπτώσεις των παραστατικών 17.3, 17.4, |
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
| 999 | Λοιπές χρεώσεις υπηρεσιών — Χρησιμοποιείται στις περιπτώσεις που σε ένα παραστατικό εκτός από καύσιμα υπάρχει η ανάγκη να τιμολογούνται και λοιπές χρεώσεις μικρών ποσών |

## 8.18 Τύπος Απόκλισης Παραστατικού

| Code | Description |
| :--- | :--- |
| 1 | Διαβίβαση Παράλειψης από Λήπτη — από τον Λήπτη λόγω Παράλειψης Διαβίβασης του Εκδότη. Επιτρεπτοί τύποι παραστατικών: 1.1, 1.6, 2.1, 2.4, 5.2, 8.1 και |
| 2 | Διαβίβαση Παράλειψης από Εκδότη — περί παράλειψης διαβίβασης από μέρους του (εκδότη) Επιτρεπτοί τύποι παραστατικών: 11.3, 11.4, 13.1, και 13.31 Χρησιμοποιείται αυτή η τιμή για Διαβίβαση Δεδομένων (μη αντικριζόμενα παραστατικά) από τον Λήπτη λόγω Απόκλισης Διαβίβασης Δεδομένων από τον Εκδότη |
| 3 | Διαβίβαση Απόκλισης από Λήπτη — Επιτρεπτοί τύποι παραστατικών: 11.3, 11.4, 13.1, και 13.31 (Ειδικά και αποκλειστικά για παραστατικά που εκδόθηκαν εντός του 2021 οι επιτρεπτοί τύποι είναι οι 1.1 και 5.2) Χρησιμοποιείται αυτή η τιμή για Διαβίβαση Δεδομένων από τον Εκδότη, στην περίπτωση που συμφωνεί με την επισήμανση του Λήπτη «Απόκλιση Διαβίβασης» στον |
| 4 | Διαβίβαση Απόκλισης από Εκδότη — αντικριζόμενο Τύπο Παραστατικού Α1 που είχε διαβιβάσει στον Λήπτη Επιτρεπτοί τύποι παραστατικών: 11.3, 11.4, 13.1, και 13.31 |

## 8.19 Ειδική Κατηγορία Παραστατικού

| Code | Description |
| :--- | :--- |
| 1 | Επιδοτήσεις – Επιχορηγήσεις Έσοδα Λιανικής Ξενοδοχείων – Χρεώσεις Δωματίου — |
| 3 | Λογιστική Εγγραφή — Έγκυρη τιμή μόνο για |
| 4 Δικαιούχοι του άρθρου 3 της υπό στοιχεία | Tax Free Σύνθετες συναλλαγές ημεδαπής – αλλοδαπής — διαβίβαση μέσω erp ή έκδοση μέσω παρόχου ή timologio |
| 6 | 139818 ΕΞ2022/28.09.2022 (Β’5083) κοινής υπουργικής απόφασης Αγορά αγροτικών αγαθών υπηρεσιών Άρθρο 41 του Κώδικα ΦΠΑ — Μόνο για ανάγνωση – μη |
| 8 | Έσοδα Λιανικών ΦΗΜ ΑΑΔΕ_1 — έγκυρη τιμή για αποστολή μέσω ERP / Πάροχο Μόνο για ανάγνωση – μη |
| 9 | Έσοδα Λιανικών ΦΗΜ ΑΑΔΕ_2 Έσοδα Λιανικών ΦΗΜ Επιχείρησης Απόκλιση — έγκυρη τιμή για αποστολή μέσω ERP / Πάροχο |
| 11 | Επίδομα Θέρμανσης — |
| 12 | Συναλλαγές εστίασης — Έγκυρη τιμή μόνο για τύπους |
| 13 | Ένδειξη Δυσχέρεια Συσχέτισης — παραστατικών 11.4 και 14.30 |

## 8.20 Κατηγορία Οντότητας (EntityType)

| Code | Description |
| :--- | :--- |
| 1 | Φορολογικός Εκπρόσωπος — |
| 2 | Διαμεσολαβητής — |
| 3 | Μεταφορέας — |
| 4 | Λήπτης του Αποστολέα (Πωλητή) — |
| 5 | Αποστολέας (Πωλητής) — |
| 6 | Λοιπές Συσχετιζόμενες Οντότητες — |

## 8.21 Αιτία Έκδοσης Αντίστροφης Διακίνησης

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
