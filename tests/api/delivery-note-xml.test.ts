import { XmlHelper } from '../../src/api/internal/xml-helper';
import { DeliveryOutcome } from '../../src/models';

describe('delivery-note XML', () => {
  const helper = new XmlHelper();

  it('serializes RegisterTransfer fields in XSD sequence', () => {
    const xml = helper.buildRegisterTransferXml({
      invoiceMark: 400000000000001,
      entityVatNumber: '123456789',
      vehicleNumber: 'ABC-1234',
      transportType: 2,
      timeStamp: new Date('2026-03-20T10:15:00Z'),
      carrierVatNumber: '987654321',
      pNumber: 'P-100',
      location: { longitude: 23.7275, latitude: 37.9838 }
    });

    expect(xml).toContain('xmlns="https://www.aade.gr/myDATA/DeliveryNote/v1.0"');
    expect(xml).toContain('<timeStamp>2026-03-20T10:15:00.000Z</timeStamp>');
    expect(xml).toMatch(
      /<invoiceMark>.*<entityVatNumber>.*<vehicleNumber>.*<transportType>.*<timeStamp>.*<carrierVatNumber>.*<pNumber>.*<location>.*<longitude>.*<latitude>/
    );
  });

  it('serializes ConfirmDeliveryOutcome packaging in XSD sequence', () => {
    const xml = helper.buildConfirmDeliveryOutcomeXml({
      qrUrl: 'https://mydata.aade.gr/qr/example',
      outcome: DeliveryOutcome.PARTIAL,
      deliveredWithoutRecipient: false,
      deliveredPackaging: [
        { packagingType: 6, quantity: 2, otherPackagingTypeTitle: 'Crate' }
      ]
    });

    expect(xml).toMatch(
      /<qrUrl>.*<outcome>PARTIAL<\/outcome>.*<deliveredWithoutRecipient>false<\/deliveredWithoutRecipient>.*<deliveredPackaging>.*<packagingType>6<\/packagingType>.*<quantity>2<\/quantity>.*<otherPackagingTypeTitle>Crate/
    );
  });

  it('requires exactly one RejectDeliveryNote identifier', () => {
    expect(() => helper.buildRejectDeliveryNoteXml({})).toThrow(
      'exactly one of qrUrl or invoiceMark'
    );
    expect(() =>
      helper.buildRejectDeliveryNoteXml({
        qrUrl: 'https://mydata.aade.gr/qr/example',
        invoiceMark: 400000000000001
      })
    ).toThrow('exactly one of qrUrl or invoiceMark');
  });

  it('serializes a MARK-based rejection without an empty qrUrl', () => {
    const xml = helper.buildRejectDeliveryNoteXml({
      invoiceMark: 400000000000001,
      rejectionReason: 'Damaged goods'
    });

    expect(xml).not.toContain('<qrUrl>');
    expect(xml).toMatch(/<invoiceMark>.*<rejectionReason>Damaged goods/);
  });
});