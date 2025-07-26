import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../helpers/config';
export default interface IRequest extends Request {
  userID?: { id: number };
}

export const authMiddleware = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(400).json({
      message: 'No token found',
    });
    return;
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    const decode = jwt.verify(token, env.JWT_Password as string) as {
      userID: number;
    };
    if (typeof decode === 'string') {
      res.status(403).json({ message: 'You are not authorized' });
      return;
    }
    req.userID = (decode as JwtPayload).userID;
    next();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error('Authentication error:', e.message);
      res.status(401).json({ message: e.message });
    } else {
      console.error('Unknown authentication error:', e);
      res.status(401).json({ message: 'Authentication failed' });
    }
  }
};
