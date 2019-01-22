export function encode(value: string): string {
    value = value.toLowerCase();
    value = value.replace(/\-/g, "%2D");
    value = value.replace(/ /g, "-");
    return value;
}

export function decode(value: string): string {
    value = value.toLowerCase();
    value = value.replace(/\-/g, " ");
    value = value.replace(/\%2D/g, "-");
    return value;
}