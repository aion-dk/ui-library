import { ref } from "vue";
const eventBus = ref(new Map());

export default function useEventsBus() {
  function eventBusEmit(event: string, ...args: unknown[]) {
    eventBus.value.set(event, args);
  }

  return {
    eventBusEmit,
    eventBus,
  };
}
