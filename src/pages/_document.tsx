import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    const locale = this.props.__NEXT_DATA__.locale;
    const isRTL = locale === "ar";

    return (
      <Html lang={locale} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
