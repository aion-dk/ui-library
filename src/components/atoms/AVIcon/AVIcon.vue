<script lang="ts">
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import * as BrandIcons from "@fortawesome/free-brands-svg-icons";

import { parse as faParse, icon as faIcon } from "@fortawesome/fontawesome-svg-core";
import { computed, watch, h, defineComponent } from "vue";

export default defineComponent({
  name: "AVIcon",
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const normalizeIconArgs = (icon: string) => {
      if (faParse.icon) {
        return faParse.icon(icon);
      }

      return null;
    };

    const AllIcons = {
      ...SolidIcons,
      ...BrandIcons,
    };

    const convert = (abstractElement: object, attrs: object = {}) => {
      const children = (abstractElement.children || []).map((child: object) => convert(child));

      if (abstractElement.prefix) return;

      const mixins: object = Object.keys(abstractElement.attributes || {}).reduce(
        (mixins: object, key: string) => {
          const value = abstractElement.attributes[key];
          mixins.attrs[key] = value;

          return mixins;
        },
        {
          attrs: {},
        },
      );

      const { ...otherAttrs }: object = attrs;

      return h(
        abstractElement.tag,
        {
          ...mixins.attrs,
          ...otherAttrs,
        },
        children,
      );
    };

    function camelize(str: string) {
      const addFA = `fa-${str}`;
      const arr = addFA.split("-");
      const capital = arr.map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase());
      const capitalString = capital.join("");
      const makeFirstLowercase = capitalString.charAt(0).toLowerCase() + capitalString.slice(1);

      return makeFirstLowercase;
    }

    const iconName = computed(() => camelize(normalizeIconArgs(props.icon).iconName));
    const icon = computed(() => (AllIcons as object)[iconName.value]);

    const renderedIcon = computed(() =>
      faIcon(icon.value, {
        symbol: false,
        title: icon.value,
      }),
    );

    watch(
      renderedIcon,
      (value) => {
        if (!value) {
          return console.log("Could not find one or more icon(s)", icon);
        }
      },
      { immediate: true },
    );

    const vnode = computed(() => (renderedIcon.value ? convert(renderedIcon.value.abstract[0]) : null));

    return () => vnode.value;
  },
});
</script>
