export default class SortColumn {
    property: string;
    order: string;

    constructor(property: string, order: string) {
        this.property = property;
        this.order = order;
    }
}
