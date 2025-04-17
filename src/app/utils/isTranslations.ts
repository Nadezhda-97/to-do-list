import Translations from "../types/Translations";

function isTranslations(obj: unknown): obj is Translations {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'errorRequired' in obj &&
    'errorTooShort' in obj &&
    'errorTooLong' in obj
  );
}

export default isTranslations;