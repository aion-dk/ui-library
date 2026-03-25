import { GlobalTypes } from "storybook/internal/types";

const globals: GlobalTypes = {
  backgrounds: { value: "Light" },
  rtlDirection: {
    autoLocales: ["ar"],
    reload: true,
  },
  locale: {
    name: "locale",
    description: "Internationalization locale",
    defaultValue: "en",
    toolbar: {
      icon: "globe",
      items: [
        { value: "ar", title: "Arabic", right: "🇸🇦 AR - RTL" },
        { value: "ca", title: "Catalan", right: "🇪🇸 CA - LTR" },
        { value: "cy", title: "Welsh", right: "🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY - LTR" },
        { value: "da", title: "Danish", right: "🇩🇰 DA - LTR" },
        { value: "de", title: "German", right: "🇩🇪 DE - LTR" },
        { value: "en", title: "English", right: "🇬🇧 EN - LTR" },
        { value: "es", title: "Spanish", right: "🇪🇸 ES - LTR" },
        { value: "fi", title: "Finnish", right: "🇫🇮 FI - LTR" },
        { value: "fr", title: "French", right: "🇫🇷 FR - LTR" },
        { value: "is", title: "Icelandic", right: "🇮🇸 IS - LTR" },
        { value: "it", title: "Italian", right: "🇮🇹 IT - LTR" },
        { value: "ja", title: "Japanese", right: "🇯🇵 JA - LTR" },
        { value: "ko", title: "Korean", right: "🇰🇷 KO - LTR" },
        { value: "nl", title: "Dutch", right: "🇳🇱 NL - LTR" },
        { value: "pl", title: "Polish", right: "🇵🇱 PL - LTR" },
        { value: "pt", title: "Portuguese", right: "🇵🇹 PT - LTR" },
        { value: "ro", title: "Romanian", right: "🇷🇴 RO - LTR" },
        { value: "ru", title: "Russian", right: "🇷🇺 RU - LTR" },
        { value: "sv", title: "Swedish", right: "🇸🇪 SV - LTR" },
        { value: "zh", title: "Chinese", right: "🇨🇳 ZH - LTR" },
      ],
    },
  },
};

export default globals;
