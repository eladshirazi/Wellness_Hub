import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET. Check your .env file.");
}

//Extend Express Request to Include `user`
interface AuthenticatedRequest extends Request {
  user: { id: string }; //Ensure `id` is always present
}

// **JWT Middleware for Protecting Routes**
export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized, no token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    //Use Type Assertion to let TypeScript know `req` is `AuthenticatedRequest`
    (req as AuthenticatedRequest).user = { id: decoded.id };

    next(); //Ensure `next()` is always called
  } catch (error) {
    res.status(401).json({ message: "Unauthorized, invalid token" });
    return;
  }
};
