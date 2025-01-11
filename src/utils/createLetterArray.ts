export function createLetterArray(str: string) {
    return str.split('').map((letter, index) => {
        return { id: index + 1, letter: letter };
    });
}