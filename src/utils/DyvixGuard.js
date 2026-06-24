export const GuardStatus = {
  Error: 'error',
  Warn: 'warn',
  Log: 'log',
  Success: 'success'
};
const PREFIX = '[DyvixUI]';

export function EvaluateFailure(message = '', status) {
  const formatedmsg = `${PREFIX} - ${message}`;

  switch (status) {
    case GuardStatus.Error:
      console.error(formatedmsg);
      return null;
    case GuardStatus.Warn:
      console.warn(formatedmsg);
      break;
    case GuardStatus.Log:
      console.log(formatedmsg);
  }
}

export function allowsNull(value) {
  return value !== null;
}
