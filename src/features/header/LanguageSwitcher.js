import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

function LanguageSwitcher() {
  const { i18n } = useTranslation("landing");
  const language = i18n.language;

  const switchLang = useCallback(() => {
    if (language.startsWith("th")) {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("th");
    }
  }, [i18n, language]);

  return (
    <ToggleButtonGroup
      value={language}
      exclusive
      onChange={switchLang}
      aria-label="language"
      color="primary"
    >
      <ToggleButton value="th" aria-label="thai">
        th
      </ToggleButton>
      <ToggleButton value="en" aria-label="english">
        en
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default LanguageSwitcher;
