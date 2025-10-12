"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Auth0Provider } from "@auth0/auth0-react";
import { type ThemeProviderProps } from "next-themes/dist/types";

const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN!;
const AUTH0_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!;
const AUTH0_REDIRECT_URI = process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI!;

export function Providers({ children, ...themeProps }: ThemeProviderProps & { children: React.ReactNode }) {
  return (
    <NextThemesProvider {...themeProps}>
      <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        authorizationParams={{ redirect_uri: AUTH0_REDIRECT_URI }}
      >
        {children}
      </Auth0Provider>
    </NextThemesProvider>
  );
}
