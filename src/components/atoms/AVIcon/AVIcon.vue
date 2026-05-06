<script lang="ts">
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import * as BrandIcons from "@fortawesome/free-brands-svg-icons";
import type {
  PropType,
  IconName,
  AbstractElement,
  IconMixin,
  IconAttribute,
  VNode,
  IconPack,
  IconLookup,
  IconNotFound,
} from "@/types";

import { parse as faParse, icon as faIcon } from "@fortawesome/fontawesome-svg-core";
import { computed, watch, h, defineComponent } from "vue";

const camelize = (str: string): string => {
  const addFA = `fa-${str}`;
  const arr = addFA.split("-");
  const capital = arr.map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase());
  const capitalString = capital.join("");
  const makeFirstLowercase = capitalString.charAt(0).toLowerCase() + capitalString.slice(1);

  return makeFirstLowercase;
};

export default defineComponent({
  name: "AVIcon",
  props: {
    icon: {
      type: String as PropType<IconName>,
      required: true,
    },
  },
  setup(props) {
    const normalizeIconArgs = (icon: IconName): IconLookup | IconNotFound => {
      if (faParse.icon) {
        return faParse.icon(icon);
      }

      return { iconName: "not_found" } as IconNotFound;
    };

    const AllIcons = {
      ...SolidIcons,
      ...BrandIcons,
    };

    const convert = (
      abstractElement: AbstractElement,
      attrs: IconAttribute = {},
    ): VNode | undefined => {
      const children = (abstractElement.children || []).map((child: AbstractElement) =>
        convert(child),
      );

      if (abstractElement.prefix) return;

      const mixins = Object.keys(abstractElement.attributes || {}).reduce(
        (iconMixins: IconMixin, key: string) => {
          const value = abstractElement.attributes[key];
          iconMixins.attrs[key] = value;

          return iconMixins;
        },
        {
          attrs: {},
        },
      );

      const { ...otherAttrs } = attrs;

      return h(
        abstractElement.tag,
        {
          ...mixins.attrs,
          ...otherAttrs,
        },
        children,
      );
    };

    const iconName = computed(() => camelize(normalizeIconArgs(props.icon).iconName));
    const icon = computed(() => (AllIcons as unknown as IconPack)[iconName.value]);
    const renderedIcon = computed(() => faIcon(icon.value));

    watch(
      renderedIcon,
      (value) => {
        if (!value) {
          // oxlint-disable-next-line no-console
          return console.error("Could not find one or more icon(s)", icon);
        }
      },
      { immediate: true },
    );

    const vnode = computed(() =>
      renderedIcon.value ? convert(renderedIcon.value.abstract[0]) : null,
    );

    return (): VNode | null | undefined => vnode.value;
  },
});
</script>
