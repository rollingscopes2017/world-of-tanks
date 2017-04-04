const ResourceManager = {
    sheet: null,
    base: 1,
    width: 0,
    height: 0,
    config: {
        'block': {
            frames: 1,
            startFrame: 26
        },
        'bullet': {
            frames: 1,
            startFrame: 20
        },
        'green_tank': {
            frames: 8,
            startFrame: 1
        },
        'blue_tank': {
            frames: 8,
            startFrame: 9
        }
    },
    init: function(path, base, width, height) {
        this.sheet = new Image()
        // tileSheet.addEventListener('load', eventSheetLoaded , false);
        this.sheet.src = path
        this.base = base
        this.width = width
        this.height = height
    },
    get: function(key) {
        return Object.assign({
            sheet: this.sheet,
            base: this.base,
            width: this.width,
            height: this.height
        }, this.config[key])
    }
}

export default ResourceManager
