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

// CSS module declarations
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.sass' {
  const content: Record<string, string>;
  export default content;
}