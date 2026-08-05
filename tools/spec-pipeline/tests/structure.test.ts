import {
  detectColumns,
  isPageFurniture,
  parseTables,
  sliceCells
} from '../src/structure';
import type { CodeRow, FieldRow } from '../src/types';

/**
 * Fixtures are verbatim `pdftotext -layout` output from the official v2.0.1 ERP
 * PDF, including its real column drift and page furniture.
 */
const FIELD_TABLE = [
  '      Πεδίο                           Τύπος        Υποχρεωτικό   Περιγραφή          Αποδεκτές τιμές',
  ' vatAmount                       xs:decimal   Ναι           Ποσό ΦΠΑ           Ελάχιστη τιμή = 0',
  ' notVAT195                      xs:boolean   Όχι   Ένδειξη μη        Αποδεκτό μόνο για',
  '                                                   συμμετοχής στο    παραστατικά εσόδων',
  '',
  '',
  ''
].join('\n');

const PAGED_TABLE = [
  '      Πεδίο                           Τύπος        Υποχρεωτικό   Περιγραφή          Αποδεκτές τιμές',
  ' itemCode                        xs:string    Όχι           Κωδικός Είδους     Μέγιστο μήκος 50.',
  '',
  '              myDATA REST API                                                           48',
  '',
  '      Πεδίο                           Τύπος        Υποχρεωτικό   Περιγραφή          Αποδεκτές τιμές',
  ' TaricNo                         xs:string    Όχι           Κωδικός Taric      Υποχρεωτικό μήκος',
  '                                                                               10.',
  '',
  '',
  ''
].join('\n');

const TABLE_THEN_NOTES = [
  '      Πεδίο                           Τύπος        Υποχρεωτικό   Περιγραφή          Αποδεκτές τιμές',
  ' movePurposeLine                 xs:int       Όχι           Σκοπός Διακίνησης  Λίστα τιμών',
  '         Παρατηρήσεις:',
  '      1) Οι τιμές του πεδίου packagingType περιγράφονται αναλυτικά στον αντίστοιχο',
  '         πίνακα του Παραρτήματος',
  '',
  '',
  ''
].join('\n');

const CODE_TABLE = [
  '8.13 Μονάδες Μέτρησης',
  '',
  '                                   Κωδικός               Περιγραφή',
  '                                   1                     Τεμάχια',
  '                                   2                     Κιλά',
  '                                   7                     Τεμάχια_Λοιπές Περιπτώσεις',
  '',
  '',
  ''
].join('\n');

/** Verbatim v2.0.1 appendix 8.13: codes are centred, so each is indented
 *  differently, and a description may wrap onto the next line. */
const CENTRED_CODE_TABLE = [
  '8.13 Είδος Ποσότητας',
  'Κωδικός       Περιγραφή',
  '  1            Τεμάχια',
  '  4             Μέτρα',
  '  5          Τετραγωνικά',
  '                Μέτρα',
  '    6       Κυβικά Μέτρα',
  '    7      Τεμάχια_Λοιπές',
  '             Περιπτώσεις',
  '',
  '',
  ''
].join('\n');

describe('detectColumns', () => {
  it('ignores leading indentation instead of emitting a phantom column', () => {
    const { starts, labels } = detectColumns(FIELD_TABLE.split('\n')[0]);
    expect(labels).toEqual([
      'Πεδίο',
      'Τύπος',
      'Υποχρεωτικό',
      'Περιγραφή',
      'Αποδεκτές τιμές'
    ]);
    expect(starts[0]).toBeGreaterThan(0);
  });

  it('keeps a two-word label in one column', () => {
    const { labels } = detectColumns('Κωδικός        Αποδεκτές τιμές');
    expect(labels).toEqual(['Κωδικός', 'Αποδεκτές τιμές']);
  });
});

describe('sliceCells', () => {
  it('assigns drifted text to the nearest column', () => {
    const lines = FIELD_TABLE.split('\n');
    const { starts } = detectColumns(lines[0]);
    // This row sits well left of the header's Περιγραφή offset.
    expect(sliceCells(lines[2], starts)).toEqual([
      'notVAT195',
      'xs:boolean',
      'Όχι',
      'Ένδειξη μη',
      'Αποδεκτό μόνο για'
    ]);
  });

  it('keeps multi-word cell content together', () => {
    const lines = FIELD_TABLE.split('\n');
    const { starts } = detectColumns(lines[0]);
    expect(sliceCells(lines[1], starts)[4]).toBe('Ελάχιστη τιμή = 0');
  });
});

describe('isPageFurniture', () => {
  it('detects the running header and bare page numbers', () => {
    expect(isPageFurniture('              myDATA REST API      48')).toBe(true);
    expect(isPageFurniture('   59   ')).toBe(true);
    expect(isPageFurniture(' vatAmount    xs:decimal')).toBe(false);
  });
});

describe('parseTables', () => {
  it('merges a wrapped cell into the record it belongs to', () => {
    const [table] = parseTables(FIELD_TABLE);
    const rows = table.rows as FieldRow[];
    expect(rows).toHaveLength(2);
    expect(rows[1].field).toBe('notVAT195');
    expect(rows[1].description).toBe('Ένδειξη μη συμμετοχής στο');
    expect(rows[1].values).toBe('Αποδεκτό μόνο για παραστατικά εσόδων');
  });

  it('continues one table across a page break', () => {
    const blocks = parseTables(PAGED_TABLE);
    expect(blocks).toHaveLength(1);
    const rows = blocks[0].rows as FieldRow[];
    expect(rows.map(r => r.field)).toEqual(['itemCode', 'TaricNo']);
    expect(rows[1].values).toBe('Υποχρεωτικό μήκος 10.');
  });

  it('stops at trailing notes instead of absorbing them', () => {
    const [table] = parseTables(TABLE_THEN_NOTES);
    const rows = table.rows as FieldRow[];
    expect(rows).toHaveLength(1);
    expect(rows[0].values).toBe('Λίστα τιμών');
    expect(JSON.stringify(rows)).not.toContain('packagingType');
  });

  it('parses appendix code tables and titles them from the heading', () => {
    const [table] = parseTables(CODE_TABLE);
    expect(table.kind).toBe('code');
    expect(table.heading).toBe('8.13 Μονάδες Μέτρησης');
    expect(table.rows as CodeRow[]).toEqual([
      { code: '1', description: 'Τεμάχια' },
      { code: '2', description: 'Κιλά' },
      { code: '7', description: 'Τεμάχια_Λοιπές Περιπτώσεις' }
    ]);
  });

  it('keeps centred codes separate and rejoins wrapped descriptions', () => {
    const [table] = parseTables(CENTRED_CODE_TABLE);
    expect(table.rows as CodeRow[]).toEqual([
      { code: '1', description: 'Τεμάχια' },
      { code: '4', description: 'Μέτρα' },
      { code: '5', description: 'Τετραγωνικά Μέτρα' },
      { code: '6', description: 'Κυβικά Μέτρα' },
      { code: '7', description: 'Τεμάχια_Λοιπές Περιπτώσεις' }
    ]);
  });
});
