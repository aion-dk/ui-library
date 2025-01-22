const globals = {
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
        { value: "ar", left: "🇸🇦", title: "Arabic", right: "AR - RTL" },
        { value: "ca", left: "🇪🇸", title: "Catalan", right: "CA - LTR" },
        { value: "da", left: "🇩🇰", title: "Danish", right: "DA - LTR" },
        { value: "de", left: "🇩🇪", title: "German", right: "DE - LTR" },
        { value: "en", left: "🇬🇧", title: "English", right: "EN - LTR" },
        { value: "es", left: "🇪🇸", title: "Spanish", right: "ES - LTR" },
        { value: "fi", left: "🇫🇮", title: "Finnish", right: "FI - LTR" },
        { value: "fr", left: "🇫🇷", title: "French", right: "FR - LTR" },
        { value: "is", left: "🇮🇸", title: "Icelandic", right: "IS - LTR" },
        { value: "nl", left: "🇳🇱", title: "Dutch", right: "NL - LTR" },
        { value: "pl", left: "🇵🇱", title: "Polish", right: "PL - LTR" },
        { value: "pt", left: "🇵🇹", title: "Portuguese", right: "PT - LTR" },
        { value: "ro", left: "🇷🇴", title: "Romanian", right: "RO - LTR" },
        { value: "ru", left: "🇷🇺", title: "Russian", right: "RU - LTR" },
        { value: "sv", left: "🇸🇪", title: "Swedish", right: "SV - LTR" },
      ],
    },
  },
};

export default globals;
