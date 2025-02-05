import type { Meta } from "@/types";
import { AVSearchBallot } from "@/components";
import { SUPPORTED_LOCALES } from "@/constants";
import { getContest } from "@/examples";
import { flattenOptions } from "@/helpers/contestHelpers";

const meta: Meta<typeof AVSearchBallot> = {
  title: "Design System/Molecules/AVSearchBallot",
  component: AVSearchBallot,
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: { type: "object" },
    },
    locale: {
      control: { type: "select" },
      options: SUPPORTED_LOCALES,
    },
  },
};

export default meta;

const Template = (args: Meta) => ({
  components: { AVSearchBallot },
  setup() {
    return { args };
  },
  template: '<AVSearchBallot v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    options: getContest(["children_options"]).options,
  },
};

export const Children = {
  render: Template,

  args: {
    options: flattenOptions([
      {
        code: 1,
        title: {
          en: "Yes",
        },
        children: [
          {
            code: 3,
            title: {
              en: "For",
            },
            children: [
              {
                code: 5,
                title: {
                  en: "Option A",
                },
                children: [
                  {
                    code: 7,
                    title: {
                      en: "SubSub 1",
                    },
                    exclusive: false,
                    reference: "5ccb7281",
                    selectable: true,
                  },
                  {
                    code: 8,
                    title: {
                      en: "SubSub 2",
                    },
                    exclusive: false,
                    reference: "d824dd3a",
                    selectable: true,
                  },
                ],
                exclusive: false,
                reference: "6b449912",
                selectable: true,
              },
              {
                code: 6,
                title: {
                  en: "Option B",
                },
                exclusive: false,
                reference: "900d1e41",
                selectable: true,
              },
            ],
            exclusive: false,
            reference: "for",
            selectable: true,
          },
          {
            code: 4,
            title: {
              en: "Against",
            },
            exclusive: false,
            reference: "against",
            selectable: true,
          },
        ],
        exclusive: false,
        reference: "53d73242",
        selectable: true,
      },
      {
        code: 2,
        title: {
          en: "No",
        },
        exclusive: false,
        reference: "b4f139aa",
        selectable: true,
      },
    ]),
  },
};
