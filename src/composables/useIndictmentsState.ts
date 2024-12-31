import type { IndictmentState } from "@/types/app"
import { ref } from "vue"

const indictmentState = ref<IndictmentState>({
    type: new Map([["person", false], ["thesis", false]]),
    level: new Map([["hard", false], ["medium", false], ["soft", false]]),
})

export default () => {

    function setTypeIndictmentState(type: "person" | "thesis", value: boolean) {
        indictmentState.value.type.set(type, value)
    }

    function setLevelIndictmentState(level: "hard" | "medium" | "soft", value: boolean) {
        indictmentState.value.level.set(level, value)
    }

    function getTypeIndictmentState(type: "person" | "thesis"): boolean {
        return indictmentState.value.type.get(type) || false
    }

    function getLevelIndictmentState(level: "hard" | "medium" | "soft"): boolean {
        return indictmentState.value.level.get(level) || false
    }

    function getShowAllConstraints(): boolean {
        indictmentState.value.level.forEach((val) => {
            if (val) {
                return false
            }
        })
        return true
    }

    return {
        setTypeIndictmentState,
        setLevelIndictmentState,
        getTypeIndictmentState,
        getLevelIndictmentState,
        getShowAllConstraints,
    }
}
