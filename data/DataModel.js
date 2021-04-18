class DataModel {
    constructor(
        id,
        markdown,
        brand,
        color,
        size,
        description,
        picture
    ) {
        this.id = id;
        this.markdown = markdown;
        this.brand = brand;
        this.color = color;
        this.size = size;
        this.description = description;
        this.picture = picture;
    }
}

export default DataModel;