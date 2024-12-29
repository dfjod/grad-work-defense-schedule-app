import { ref } from "vue";
const bus = ref(new Map());

export default function useEventsBus(){
    function emit<T>(event: string, ...args: T[]) {
        bus.value.set(event, args);
    }

    return {
        emit,
        bus
    }
}
