import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import * as BrandIcons from "@fortawesome/free-brands-svg-icons";

const icons = {
  ...SolidIcons,
  ...BrandIcons,
};

const iconNames = Object.keys(icons).map((i) => {
  const kebabizedName = i.replace(
    /[A-Z]+(?![a-z])|[A-Z]|[0-9]+(?![a-z])/g,
    ($, ofs) => (ofs ? "-" : "") + $.toLowerCase(),
  );
  const noPrefix = kebabizedName.replace("fa-", "");
  return noPrefix;
});

export { iconNames };
