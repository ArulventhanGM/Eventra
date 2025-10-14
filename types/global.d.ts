// Global type definitions for packages that might be missing types
/// <reference types="node" />

declare module 'express' {
  interface Application {}
  interface Request {}
  interface Response {}
  interface NextFunction {}
}

declare module 'jsonwebtoken' {
  interface JwtPayload {}
  interface SignOptions {}
  interface VerifyOptions {}
}

declare module 'multer' {
  interface Options {}
  interface File {}
}