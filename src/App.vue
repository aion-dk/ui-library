<!-- This file is a playground where the library components can be mocked and tested during development -->
<!-- Please do not commit this file -->
<script setup lang="ts">
/* DO NOT REMOVE (START) */
import { useI18n } from "vue-i18n";
const i18n = useI18n();
const changeLocale = (e: Event) => {
  if ((e.target as HTMLSelectElement).value === "ar")
    document.querySelector("html")?.setAttribute("dir", "rtl");
  else document.querySelector("html")?.setAttribute("dir", "ltr");
  document.querySelector("html")?.setAttribute("lang", (e.target as HTMLSelectElement).value);
};
/* DO NOT REMOVE (END) */

/* PLAYGROUND (START) */
import * as examples from "@/examples";
/* PLAYGROUND (END) */
</script>

<template>
  <div id="playground">
    <!-- DO NOT REMOVE (START) -->
    <select
      id="localeSelector"
      v-model="i18n.locale.value"
      @change="changeLocale"
    >
      <option value="ar">🇸🇦 AR - Arabic (RTL)</option>
      <option value="ca">🇪🇸 CA - Catalan (LTR)</option>
      <option value="cy">🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY - Welsh (LTR)</option>
      <option value="da">🇩🇰 DA - Danish (LTR)</option>
      <option value="de">🇩🇪 DE - German (LTR)</option>
      <option value="en">🇬🇧 EN - English (LTR)</option>
      <option value="es">🇪🇸 ES - Spanish (LTR)</option>
      <option value="fi">🇫🇮 FI - Finnish (LTR)</option>
      <option value="fr">🇫🇷 FR - French (LTR)</option>
      <option value="is">🇮🇸 IS - Icelandic (LTR)</option>
      <option value="it">🇮🇹 IT - Italian (LTR)</option>
      <option value="ja">🇯🇵 JA - Japanese (LTR)</option>
      <option value="ko">🇰🇷 KO - Korean (LTR)</option>
      <option value="nl">🇳🇱 NL - Dutch (LTR)</option>
      <option value="pl">🇵🇱 PL - Polish (LTR)</option>
      <option value="pt">🇵🇹 PT - Portuguese (LTR)</option>
      <option value="ro">🇷🇴 RO - Romanian (LTR)</option>
      <option value="ru">🇷🇺 RU - Russian (LTR)</option>
      <option value="sv">🇸🇪 SV - Swedish (LTR)</option>
      <option value="zh">🇨🇳 ZH - Chinese (LTR)</option>
    </select>
    <!-- DO NOT REMOVE (END) -->

    <!-- PLAYGROUND (START) -->
    <div style="width: 50%; display: flex; flex-direction: column; gap: 1rem">
      <AVSplitHelper
        :contest="examples.getContest([])"
        :contest-selection="examples.getContestSelection([])"
        :weight="10"
      />
      <AVBallot
        :contest="examples.getContest([])"
        :selection-pile="examples.getSelectionPile([])"
      />
      <AVOption
        :option="
          examples.getOption(['selectable', 'color', 'description', 'image'], 1)
        "
        :selections="examples.getSelectionPile([]).optionSelections"
        :contest="examples.getContest([])"
        :invalid="false"
      />
      <AVBlankOption :error="false" :checked="false" />
    </div>

    <!-- PLAYGORUND (END) -->
  </div>
</template>

<style>
/* PLAYGROUND (START) */

/* PLAYGROUND (END) */

/* DO NOT REMOVE (START) */
#localeSelector {
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: solid 1px var(--bs-border-color);
}

#playground {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
/* DO NOT REMOVE (END) */
</style>
