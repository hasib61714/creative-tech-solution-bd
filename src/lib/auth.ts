import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export function verifyToken(req: NextRequest): { id: number; email: string; role?: string } | null {
  const auth = req.headers.get('Authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  try {
    return jwt.verify(auth.slice(7), process.env.JWT_SECRET!) as { id: number; email: string; role?: string };
  } catch {
    return null;
  }
}
