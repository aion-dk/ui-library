import type { OptionContent } from "@/types";

const flattenOptions = (
  tree: Array<OptionContent>,
  parent?: OptionContent,
): Array<OptionContent> => {
  return tree.flatMap((option) => {
    if (parent)
      option.parentContent = {
        reference: parent.reference,
        code: parent.code,
        title: { ...parent.title },
        accentColor: parent.accentColor,
      };

    if (option.children) return [option, ...flattenOptions(option.children, option)];
    return [option];
  });
};

export { flattenOptions };
