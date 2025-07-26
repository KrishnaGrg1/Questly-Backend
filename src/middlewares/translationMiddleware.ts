import { NextFunction, Response } from 'express';
import IRequest from './authMiddleware';
import { Language, isValidLanguage } from '../translation/translation';

export interface TranslationRequest extends IRequest {
  language?: string;
}

const translationMiddeware = async (
  req: TranslationRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const languageHeader = req.headers['x-language'];
    if (
      !languageHeader ||
      typeof languageHeader !== 'string' ||
      !isValidLanguage(languageHeader)
    ) {
      req.language = 'eng'; // Default to English
    } else {
      req.language = languageHeader;
    }

    next();
  } catch (error) {
    console.error('Translation middleware error:', error);
    // Always default to English on error
    req.language = 'eng';
    next(); // Continue processing instead of stopping
  }
};

export default translationMiddeware;
