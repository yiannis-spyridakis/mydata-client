import { translate } from '../src/translate';

const glossary = {
  terms: {
    'Δελτίο Αποστολής': 'Delivery Note',
    Δελτίο: 'Note',
    Παραστατικό: 'Invoice',
    Ναι: 'Yes'
  }
};

describe('translate', () => {
  it('prefers the longest matching term', () => {
    expect(translate('Δελτίο Αποστολής', glossary).text).toBe('Delivery Note');
  });

  it('reports uncovered Greek with occurrence counts', () => {
    const r = translate('Παραστατικό Άγνωστο Άγνωστο', glossary);
    expect(r.text).toContain('Invoice');
    expect(r.untranslated[0]).toEqual({ text: 'Άγνωστο', count: 2 });
  });

  it('leaves already-English text untouched', () => {
    const input = '| `vatAmount` | `xs:decimal` | Yes |';
    expect(translate(input, glossary).text).toBe(input);
  });

  it('does not translate a term that is only the stem of a longer word', () => {
    // "Ποσότητας" must not become "Quantityς".
    const g = { terms: { Ποσότητα: 'Quantity' } };
    expect(translate('Είδος Ποσότητας', g).text).not.toContain('Quantityς');
    expect(translate('Ποσότητα', g).text).toBe('Quantity');
  });
});
