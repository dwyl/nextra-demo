import { type DefaultSession } from 'next-auth';
/**
 * Holds types for the application (on the `src` side)
 */

// Types for the `_meta.json` structure
export type PrivateInfo = {
  private: boolean;
  roles?: string[];
};

export type MetaJson = {
  [key: string]: string | any | PrivateInfo;
};

export type PrivateRoutes = {
  [key: string]: string[];
};

// Types for auth
export type ExtendedUser = {
    role?: string;
  } & DefaultSession["user"];