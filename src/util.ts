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

const RANDOM_POSSIBLE = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

export function randomString(length: number): string {
    let result = "";
    for(let i = 0; i < length; i++) {
        result += RANDOM_POSSIBLE.charAt(Math.floor(Math.random() * RANDOM_POSSIBLE.length));
    }

    return result;
}

export function camel2Underscore(source: string) {
    let fixed = "";

    for(let i = 0; i < source.length; i++) {
        let current = source[i];
        
        if(current.toLowerCase() === current) {
            fixed += current;
        } else {
            fixed += `_${current.toLowerCase()}`;
        }
    }

    return fixed;
}

export function removeTrailingSlash(source: string) {
    while(source.charAt(source.length - 1) === "/") {
        source = source.substring(0, source.length - 1);
    }

    return source;
}
