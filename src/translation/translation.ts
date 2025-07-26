import arab from './arab/index';
import chin from './chin/index';
import eng from './eng/index';
import nep from './nep/index';
import span from './spanish/index';
import jap from './jap/index';

export type Language = 'eng' | 'arab' | 'chin' | 'nep' | 'span' | 'jap';
export type MessageType = 'error' | 'success';

// Utility function to check if a string is a valid Language
export const isValidLanguage = (lang: string): lang is Language => {
  const validLanguages: Language[] = ['eng', 'arab', 'chin', 'nep', 'span', 'jap'];
  return validLanguages.includes(lang as Language);
};

// Get all supported languages
export const getSupportedLanguages = (): Language[] => {
  return ['eng', 'arab', 'chin', 'nep', 'span', 'jap'];
};

const messages: Record<Language, any> = {
  arab: arab,
  chin: chin,
  eng: eng,
  nep: nep,
  span: span,
  jap: jap,
};

function getNestedValue(obj: any, keyPath: string): any {
  return keyPath.split('.').reduce((acc, key) => acc?.[key], obj);
}

export const translate = (fullKey: string, lang: Language = 'eng'): string => {
  const [type, ...keyParts] = fullKey.split('.');
  const keyPath = keyParts.join('.');

  if (type !== 'success' && type !== 'error') return fullKey;

  const langPack = messages[lang] || messages.eng;
  const messageSet = langPack[type] || messages.eng[type];

  const translated = getNestedValue(messageSet, keyPath);
  return translated || fullKey;
};
