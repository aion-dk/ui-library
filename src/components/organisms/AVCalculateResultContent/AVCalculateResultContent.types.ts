import { CALCULATE_RESULT_ROLE, CALCULATE_RESULT_STATUS } from "@/constants";

type AVCalculateResultContentRole = (typeof CALCULATE_RESULT_ROLE)[number];

type AVCalculateResultContentStatus = (typeof CALCULATE_RESULT_STATUS)[number];

type AVCalculateResultContentElapsed = `${string}:${string}:${string}`;

export type {
  AVCalculateResultContentRole,
  AVCalculateResultContentStatus,
  AVCalculateResultContentElapsed,
};
