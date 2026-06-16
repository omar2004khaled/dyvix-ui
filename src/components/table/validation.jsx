import {
  EvaluateFailure,
  GuardStatus,
  allowsNull
} from '../../utils/DyvixGuard';
import { ValidatAndLoadJSON } from '../../utils/Smart Json Caching/SJCManager';

const component = 'Table';
const CacheMapping = {
  animation: {
    jsonpath: '../../components/animations.json',
    csspath: null
  }
};

export async function ValidateTable(
  animation,
  theme,
  children,
  columns,
  data,
  callback,
  instance
) {
  let normalizedAnimation = animation?.trim().toLowerCase();

  const isAnimation = await ValidatAndLoadJSON(
    CacheMapping,
    normalizedAnimation,
    callback,
    'animation',
    component
  );
  if (!isAnimation.status && !allowsNull(normalizedAnimation)) {
    return {
      status: GuardStatus.Error,
      error: 'Please provide a valid animation.'
    };
  }
  if (!children) {
    if (!Array.isArray(columns)) {
      return {
        status: GuardStatus.Error,
        error: 'columns prop must be a valid array.'
      };
    }
    const isMalformed = columns.some(
      (col) => typeof col !== 'object' || col === null || col.key === undefined
    );

    if (isMalformed) {
      return {
        status: GuardStatus.Error,
        error: 'All column entries must be objects containing a unique key.'
      };
    }
    const isDuplicateCol = checkDuplicates(columns, 'key');
    if (isDuplicateCol?.status === GuardStatus.Error) {
      return isDuplicateCol;
    }
  }
  return { status: GuardStatus.Success };
}

function checkDuplicates(elements, field) {
  let found = new Set();
  for (const element of elements) {
    const val = element[field];

    if (val === '!/') continue;
    if (found.has(val)) {
      return {
        status: GuardStatus.Error,
        error: `The column ${field} "${val}" must be unique.`
      };
    }

    found.add(val);
  }

  return { status: GuardStatus.Success };
}
