/* eslint-disable no-extend-native */
declare global {
    interface String {
        replaceAt(index: number, replacement: string): string;
    }
}

String.prototype.replaceAt = function (this: string, index: number, replacement: string) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};

export const declarePrototypes = () => {};
