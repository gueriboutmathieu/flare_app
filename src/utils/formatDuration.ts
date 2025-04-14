export function formatDuration(duration: number) {
    const daysNumber = Math.floor(duration / 86400);
    const days = daysNumber > 0 ? String(daysNumber).padStart(2, "0") + ":" : "";

    const hoursNumber = Math.floor((duration % 86400) / 3600);
    const hours = hoursNumber > 0 ? String(hoursNumber).padStart(2, "0") + ":" : "";

    const minutesNumber = Math.floor(((duration % 86400) % 3600) / 60);
    const minutes = String(minutesNumber).padStart(2, "0") + ":";

    const secondsNumber = Math.floor((duration % 86400) % 3600) % 60;
    const seconds = String(secondsNumber).padStart(2, "0");

    return [days, hours, minutes, seconds].join("");
}
