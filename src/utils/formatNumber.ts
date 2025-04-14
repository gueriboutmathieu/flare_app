export function formatNumber(number: number): string {
    return number.toLocaleString(
        "fr-FR",
        {
            notation: 'compact',
            compactDisplay: 'short',
        },
    );
}