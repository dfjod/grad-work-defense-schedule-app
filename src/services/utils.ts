import moment from "moment"

export function formatTime(time: string): string {
    return moment(time, "YYYY-MM-DDTHH:mm:ss").format("MMM D HH:mm")
}
