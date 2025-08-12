import type { Meta } from "@/types";
import { AVShowMore } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";

const meta: Meta<typeof AVShowMore> = {
  title: "Design System/Atoms/AVShowMore",
  component: AVShowMore,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: { type: "text" },
    },
    customHeightInPx: {
      control: { type: "number", min: "0", max: "999", step: "10" },
    },
    displayFullContent: {
      control: { type: "boolean" },
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
  },
};

export default meta;

const Template1 = (args: Meta) => ({
  components: { AVShowMore },
  setup() {
    return { args };
  },
  template:
    '<AVShowMore v-bind="args"><template #content><p>Nunc rhoncus ante quis tortor lacinia tristique. Pellentesque cursus eleifend sodales. Quisque mattis vulputate massa in porttitor. Integer sem leo, elementum vitae ipsum at, pretium sollicitudin mi. Pellentesque vitae justo vulputate felis ultricies aliquet. Quisque libero ligula, mollis ut aliquet ac, pellentesque sed tortor. Mauris ultricies ultricies sapien, id placerat nisi viverra vitae. Vestibulum rutrum nec est consectetur auctor. Aenean tempus viverra placerat. Curabitur laoreet dui eu sapien congue venenatis. Maecenas vel tellus vel felis semper tristique. Donec ornare fermentum dui, in sagittis felis hendrerit nec. Mauris porta, urna at commodo condimentum, ante eros tempus elit, in suscipit erat magna et nisl. Aenean cursus sed dolor sit amet sagittis. Nunc ut nisi urna.</p><p>Integer efficitur, nisl id viverra facilisis, enim purus tempor sem, nec efficitur mi enim in ligula. Nulla aliquam imperdiet tellus eget euismod. Duis fringilla sodales erat. Sed hendrerit eu odio sit amet posuere. Phasellus sapien urna, auctor ac pulvinar sit amet, hendrerit non tortor. Cras tempor ipsum sit amet quam vulputate pharetra. Vivamus turpis mi, malesuada id varius sed, vulputate sed magna. Cras massa augue, luctus sit amet diam sed, bibendum posuere elit.</p><p>Pellentesque eu urna ac felis varius tristique ac accumsan nisi. Praesent lacinia rutrum cursus. Nullam vehicula lorem nec turpis pharetra, elementum convallis leo tempus. Nullam volutpat consequat nisi sollicitudin fermentum. Cras neque tortor, accumsan nec hendrerit et, accumsan quis justo. Maecenas quis mi non ante cursus molestie. Ut quam diam, vehicula vel elementum ut, porttitor vitae lectus. Pellentesque et nisi vel eros mollis accumsan sodales id dui. Nam sollicitudin porta lectus sit amet malesuada. Ut congue aliquam est, in vehicula sem fringilla eget.</p><p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam quis hendrerit tortor, a luctus odio. Aenean luctus augue id sapien porttitor lacinia quis non tortor. Mauris id eleifend nisi. In et euismod purus, id maximus tortor. Nullam finibus diam ac convallis dictum. Nam imperdiet ultrices felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla non varius est. Nullam feugiat sem sapien, at rhoncus erat efficitur nec. Curabitur quis luctus erat. Suspendisse convallis turpis at porta mattis. Proin commodo aliquet nulla et sodales.</p><p>Donec ut metus malesuada, imperdiet urna non, aliquet est. Pellentesque consequat neque ac rhoncus placerat. Proin urna turpis, euismod ac risus a, fermentum iaculis sem. Praesent aliquam nunc ligula, at tincidunt dolor hendrerit pellentesque. Praesent augue nunc, elementum at justo id, cursus blandit diam. Mauris convallis scelerisque est in posuere. Phasellus at commodo tortor, eu facilisis risus. Suspendisse scelerisque urna quis enim iaculis, id venenatis leo vehicula. Nullam facilisis congue metus eget hendrerit. Pellentesque pellentesque suscipit lectus vel porta. Donec id consequat diam. Integer dignissim suscipit faucibus. Sed maximus eros mauris, sed maximus arcu cursus vitae. Fusce vel semper tellus. Vestibulum eget libero eu nisi ornare lobortis. Curabitur quis massa felis.</p><p>Donec ut neque enim. Maecenas non dolor mollis, scelerisque leo viverra, sodales massa. Praesent urna nulla, mollis vel ornare in, consequat ut leo. In facilisis mauris a sapien lacinia, sit amet interdum mi elementum. Donec vitae orci dui. Suspendisse non pretium libero, a convallis urna. Integer ut turpis enim. Quisque iaculis nisl sapien, vitae congue libero pretium ut. Nullam tempor pharetra vulputate. Integer eu dictum nisi, bibendum tempus justo. Nunc pellentesque, massa eu pretium volutpat, augue ante euismod nunc, sed venenatis dolor purus eget orci. Quisque pellentesque hendrerit nisi, sit amet sagittis odio euismod quis. Quisque fermentum at urna eu lobortis. Phasellus ac bibendum tellus. Phasellus elementum nibh lorem, nec hendrerit lacus blandit eleifend.</p></template></AVShowMore>',
});

const Template2 = (args: Meta) => ({
  components: { AVShowMore },
  setup() {
    return { args };
  },
  template:
    '<AVShowMore v-bind="args"><template #content><p>Nunc rhoncus ante quis tortor lacinia tristique. Pellentesque cursus eleifend sodales. Quisque mattis vulputate massa in porttitor. Integer sem leo, elementum vitae ipsum at, pretium sollicitudin mi. Pellentesque vitae justo vulputate felis ultricies aliquet. Quisque libero ligula, mollis ut aliquet ac, pellentesque sed tortor. Mauris ultricies ultricies sapien, id placerat nisi viverra vitae. Vestibulum rutrum nec est consectetur auctor. Aenean tempus viverra placerat. Curabitur laoreet dui eu sapien congue venenatis. Maecenas vel tellus vel felis semper tristique. Donec ornare fermentum dui, in sagittis felis hendrerit nec. Mauris porta, urna at commodo condimentum, ante eros tempus elit, in suscipit erat magna et nisl. Aenean cursus sed dolor sit amet sagittis. Nunc ut nisi urna.</p></template></AVShowMore>',
});

export const Default = {
  render: Template1,

  args: {
    id: "test1",
  },
};

export const ForceShowAll = {
  render: Template1,

  args: {
    displayFullContent: true,
    id: "test2",
  },
};

export const ShowAllByShortContent = {
  render: Template2,

  args: {
    id: "test3",
  },
};
