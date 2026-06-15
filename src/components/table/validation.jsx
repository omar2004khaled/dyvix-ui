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

export async function ValidateTable(animation, theme, callback, instance) {
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

  return { status: GuardStatus.Success };
}
