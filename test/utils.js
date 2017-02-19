export function copy(object) {
    return JSON.parse(JSON.stringify(object));
}