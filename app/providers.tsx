"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const AUTH0_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  const AUTH0_REDIRECT_URI = process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI;
   const AUTH0_AUDIENCE = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE!;
  const AUTH0_SCOPE = process.env.NEXT_PUBLIC_AUTH0_SCOPE || "openid profile email";

  if (!AUTH0_CLIENT_ID || !AUTH0_DOMAIN || !AUTH0_REDIRECT_URI) {
    throw new Error("Environment variables for Auth0 are not defined");
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: AUTH0_REDIRECT_URI,
          audience: AUTH0_AUDIENCE,
          scope: AUTH0_SCOPE,
        }}
        cacheLocation="localstorage"      // Persistent login
        useRefreshTokens={true}           // Silent token refresh
      >
          {children}
      </Auth0Provider>
    </ThemeProvider>
  );
}
