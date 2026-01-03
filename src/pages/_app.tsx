import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  return (
    <ThemeProvider>
      <NextIntlClientProvider locale={locale} messages={pageProps.messages}>
        <Component {...pageProps} />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
