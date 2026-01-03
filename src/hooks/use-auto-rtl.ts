import { useRouter } from "next/router";
import { useEffect } from "react";

const useAutoRtl = () => {
  const { locale } = useRouter();
  useEffect(() => {
    const isRTL = locale === "ar";
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = locale || "en";
  }, [locale]);
};

export default useAutoRtl;
