import { XmlHelper } from '../../src/api/internal/xml-helper';
import { DeliveryOutcome } from '../../src/models';
import path from 'node:path';
import { validateXmlFile } from '../validation/xsd-utils';

describe('delivery-note XML', () => {
  const helper = new XmlHelper();

  it('serializes RegisterTransfer fields in XSD sequence', async () => {
    const xml = helper.buildRegisterTransferXml({
      qrUrl: 'https://mydata.aade.gr/qr/example',
      transportDetail: {
        vehicleNumber: 'ABC-1234',
        transportType: 2,
        timeStamp: new Date('2026-03-20T10:15:00Z'),
        carrierVatNumber: '987654321',
        pNumber: 'P-100',
        location: { longitude: 23.7275, latitude: 37.9838 }
      }
    });

    expect(xml).toContain('<Transport');
    expect(xml).not.toContain('xmlns="https://www.aade.gr/myDATA/transport/v1.0"');
    expect(xml).toContain('<timeStamp>2026-03-20T10:15:00.000Z</timeStamp>');
    expect(xml).toMatch(
      /<qrUrl>.*<transportDetail>.*<vehicleNumber>.*<transportType>.*<timeStamp>.*<carrierVatNumber>.*<pNumber>.*<location>.*<longitude>.*<latitude>/
    );
    await expect(
      validateXmlFile(
        'register-transfer.xml',
        xml,
        path.join(process.cwd(), 'schemas/RegisterTransfer-v2.0.1.xsd')
      )
    ).resolves.toBe(true);
  });

  it('serializes ConfirmDeliveryOutcome packaging in XSD sequence', async () => {
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
    await expect(
      validateXmlFile(
        'confirm-delivery-outcome.xml',
        xml,
        path.join(process.cwd(), 'schemas/ConfirmDeliveryOutcome-v2.0.1.xsd')
      )
    ).resolves.toBe(true);
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

  it('serializes a MARK-based rejection without an empty qrUrl', async () => {
    const xml = helper.buildRejectDeliveryNoteXml({
      invoiceMark: 400000000000001,
      rejectionReason: 'Damaged goods'
    });

    expect(xml).not.toContain('<qrUrl>');
    expect(xml).toMatch(/<invoiceMark>.*<rejectionReason>Damaged goods/);
    await expect(
      validateXmlFile(
        'reject-delivery-note.xml',
        xml,
        path.join(process.cwd(), 'schemas/RejectDeliveryNote-v2.0.1.xsd')
      )
    ).resolves.toBe(true);
  });
});