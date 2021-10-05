export default class ColumnCell {
    property?: string;
    label?: string;
    key?: string;
    content?: Function;

    constructor(path?: string, label?: string, key?: string, content?: Function) {
        this.property = path;
        this.label = label;
        this.key = key;
        this.content = content;
    }
}
