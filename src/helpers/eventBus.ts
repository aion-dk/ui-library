import { ref } from "vue";
const eventBus = ref(new Map());

const useEventsBus = (): {
  eventBusEmit: (event: string, ...args: unknown[]) => void;
  eventBus: typeof eventBus;
} => {
  const eventBusEmit = (event: string, ...args: unknown[]): void => {
    eventBus.value.set(event, args);
  };

  return {
    eventBusEmit,
    eventBus,
  };
};

export default useEventsBus;
