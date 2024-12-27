import { type Solution } from "@/types/app";
import { ref } from "vue";

const solutions = ref<Solution[]>([]);

export default () => {
    function saveSolution(s: Solution) {
        const index = solutions.value.findIndex((sol) => sol.id === s.id);
        s.id = s.id || solutions.value.length + 1;
        if (index === -1) {
            solutions.value.push(s);
        } else {
            solutions.value[index] = s;
        }
    }

    return {
        solutions,
        saveSolution,
    }
}
