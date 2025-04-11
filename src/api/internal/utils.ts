import {
  RequestDocParams,
  RequestMyDataParams,
  RequestVatE3Params
} from '../../models/request-params.model';

// Date/Time Formatting Helpers
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatSearchParamsDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}/${month}/${year}`;
}

export function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export function formatDatesInObject(obj: any): any {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return obj;
  if (Array.isArray(obj)) return obj.map(formatDatesInObject);

  const newObj: { [key: string]: any } = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value instanceof Date) {
        if (
          key === 'issueDate' ||
          key === 'dispatchDate' ||
          key === 'applicationDate' ||
          key === 'cancellationDate' ||
          key === 'IssueDate'
        ) {
          newObj[key] = formatDate(value);
        } else if (key === 'dispatchTime') {
          newObj[key] = formatTime(value);
        } else {
          newObj[key] = formatDate(value);
          console.warn(
            `Unhandled Date object for key: ${key}. Formatting as YYYY-MM-DD.`
          );
        }
      } else {
        newObj[key] = formatDatesInObject(value);
      }
    }
  }
  return newObj;
}

export function requestParamsToUrlParams<
  requestParamsType extends Record<string, any> =
    | RequestDocParams
    | RequestMyDataParams
    | RequestVatE3Params
>(params: requestParamsType): URLSearchParams {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === 'dateFrom' || key === 'dateTo') {
        if (value instanceof Date) {
          value = formatSearchParamsDate(value);
          console.log(`Formatted ${key}: ${value}`);
        }
      }
      queryParams.set(key, String(value));
    }
  });
  return queryParams;
}
