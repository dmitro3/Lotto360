export default class InputInformation {
    constructor(label: string, property: string, type: string) {
        this.label = label;
        this.property = property;
        this.type = type;
    }

    label: string;
    property: string;
    type: string;
}
