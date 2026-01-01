// import { create } from "zustand";
// import { persist } from "zustand/middleware";
//
// type ThemeState = {
//   theme: "light" | "dark" | "system";
//   setTheme: (theme: ThemeState["theme"]) => void;
// };
//
// export const useThemeStore = create<ThemeState>()(
//   persist(
//     (set) => ({
//       theme: "system",
//       setTheme: (theme) => set({ theme }),
//     }),
//     {
//       name: "theme-storage",
//     },
//   ),
// );
