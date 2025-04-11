import { describe, it, expect } from '@jest/globals';
import {
  formatDate,
  formatSearchParamsDate,
  formatTime,
  formatDatesInObject,
  requestParamsToUrlParams
} from '../../../src/api/internal/utils';

describe('formatDate', () => {
  it('should format date as YYYY-MM-DD', () => {
    const date = new Date(2024, 5, 15); // June 15, 2024
    expect(formatDate(date)).toBe('2024-06-15');
  });

  it('should pad single digit months and days', () => {
    const date = new Date(2024, 0, 1); // Jan 1, 2024
    expect(formatDate(date)).toBe('2024-01-01');
  });
});

describe('formatSearchParamsDate', () => {
  it('should format date as DD/MM/YYYY', () => {
    const date = new Date(2024, 5, 15); // June 15, 2024
    expect(formatSearchParamsDate(date)).toBe('15/06/2024');
  });

  it('should pad single digit months and days', () => {
    const date = new Date(2024, 0, 1); // Jan 1, 2024
    expect(formatSearchParamsDate(date)).toBe('01/01/2024');
  });
});

describe('formatTime', () => {
  it('should format time as HH:MM:SS', () => {
    const date = new Date(2024, 0, 1, 14, 5, 30); // 14:05:30
    expect(formatTime(date)).toBe('14:05:30');
  });

  it('should pad single digit hours, minutes, seconds', () => {
    const date = new Date(2024, 0, 1, 1, 2, 3); // 01:02:03
    expect(formatTime(date)).toBe('01:02:03');
  });
});

describe('formatDatesInObject', () => {
  it('should format issueDate, dispatchDate, and applicationDate correctly', () => {
    const date = new Date(2024, 5, 15, 10, 30, 0); // June 15, 2024, 10:30:00
    const input = {
      invoiceHeader: {
        issueDate: date,
        dispatchDate: date,
        otherField: 'value'
      },
      shipInfo: {
        applicationDate: date
      }
    };
    const expected = {
      invoiceHeader: {
        issueDate: '2024-06-15',
        dispatchDate: '2024-06-15',
        otherField: 'value'
      },
      shipInfo: {
        applicationDate: '2024-06-15'
      }
    };
    expect(formatDatesInObject(input)).toEqual(expected);
  });

  it('should format dispatchTime correctly', () => {
    const date = new Date(2024, 5, 15, 14, 45, 30); // June 15, 2024, 14:45:30
    const input = {
      invoiceHeader: {
        dispatchTime: date,
        anotherField: 123
      }
    };
    const expected = {
      invoiceHeader: {
        dispatchTime: '14:45:30',
        anotherField: 123
      }
    };
    expect(formatDatesInObject(input)).toEqual(expected);
  });

  it('should handle nested objects', () => {
    const date1 = new Date(2023, 0, 1); // Jan 1, 2023
    const date2 = new Date(2023, 0, 1, 12, 0, 0); // Jan 1, 2023, 12:00:00
    const input = {
      level1: {
        issueDate: date1,
        level2: {
          dispatchTime: date2,
          text: 'hello'
        }
      }
    };
    const expected = {
      level1: {
        issueDate: '2023-01-01',
        level2: {
          dispatchTime: '12:00:00',
          text: 'hello'
        }
      }
    };
    expect(formatDatesInObject(input)).toEqual(expected);
  });

  it('should handle arrays of objects', () => {
    const date1 = new Date(2024, 1, 1); // Feb 1, 2024
    const date2 = new Date(2024, 1, 2); // Feb 2, 2024
    const input = {
      items: [
        { issueDate: date1, value: 1 },
        { issueDate: date2, value: 2 }
      ]
    };
    const expected = {
      items: [
        { issueDate: '2024-02-01', value: 1 },
        { issueDate: '2024-02-02', value: 2 }
      ]
    };
    expect(formatDatesInObject(input)).toEqual(expected);
  });

  it('should not modify non-date fields', () => {
    const input = {
      name: 'Test',
      count: 10,
      active: true,
      details: null
    };
    const expected = {
      name: 'Test',
      count: 10,
      active: true,
      details: null
    };
    expect(formatDatesInObject(input)).toEqual(expected);
  });

  it('should handle empty objects and arrays', () => {
    const input = {
      emptyObj: {},
      emptyArr: [],
      nested: { arr: [] }
    };
    const expected = {
      emptyObj: {},
      emptyArr: [],
      nested: { arr: [] }
    };
    expect(formatDatesInObject(input)).toEqual(expected);
  });

  it('should return primitives and null as is', () => {
    expect(formatDatesInObject(null)).toBeNull();
    expect(formatDatesInObject(undefined)).toBeUndefined();
    expect(formatDatesInObject(123)).toBe(123);
    expect(formatDatesInObject('string')).toBe('string');
    expect(formatDatesInObject(true)).toBe(true);
  });

  it('should handle objects created via JSON.parse(JSON.stringify(objWithDates))', () => {
    // Dates become strings after JSON stringify/parse
    const date = new Date(2024, 5, 15, 10, 30, 0);
    const original = {
      invoiceHeader: {
        issueDate: date,
        dispatchTime: date
      }
    };
    const input = JSON.parse(JSON.stringify(original)); // Dates are now ISO strings
    const expected = {
      invoiceHeader: {
        issueDate: date.toISOString(), // Should remain ISO string as it's not a Date instance
        dispatchTime: date.toISOString() // Should remain ISO string
      }
    };
    // formatDatesInObject should not modify strings, even if they look like dates
    expect(formatDatesInObject(input)).toEqual(expected);
  });
});

describe('requestParamsToUrlParams', () => {
  it('should convert request params to URLSearchParams', () => {
    const params = {
      dateFrom: new Date(2024, 0, 1),
      dateTo: new Date(2024, 0, 31),
      mark: '12345',
      entityVatNumber: '999999999'
    };
    const result = requestParamsToUrlParams(params);
    expect(result.get('dateFrom')).toBe('01/01/2024');
    expect(result.get('dateTo')).toBe('31/01/2024');
    expect(result.get('mark')).toBe('12345');
    expect(result.get('entityVatNumber')).toBe('999999999');
  });

  it('should skip undefined and null values', () => {
    const params = {
      dateFrom: new Date(2024, 0, 1),
      dateTo: undefined,
      mark: null,
      entityVatNumber: '999999999'
    };
    const result = requestParamsToUrlParams(params);
    expect(result.get('dateFrom')).toBe('01/01/2024');
    expect(result.get('dateTo')).toBeNull();
    expect(result.get('mark')).toBeNull();
    expect(result.get('entityVatNumber')).toBe('999999999');
  });

  it('should handle string and number values', () => {
    const params = {
      mark: 12345,
      entityVatNumber: '999999999',
      maxMark: '99999'
    };
    const result = requestParamsToUrlParams(params);
    expect(result.get('mark')).toBe('12345');
    expect(result.get('entityVatNumber')).toBe('999999999');
    expect(result.get('maxMark')).toBe('99999');
  });
});
