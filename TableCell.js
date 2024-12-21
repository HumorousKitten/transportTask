class TableCell {

    _CellValue = {
        None: undefined,
    }

    volume;
    transportCost;
    sign;

    constructor({volume: volume, transportCost: transportCost, sign: sign}) {
        this.volume = volume;
        this.transportCost = transportCost;
        this.sign = sign;
    }

    addVolume(volume) {
        if (this.hasVolume()) {
            this.volume += volume;
        } else {
            this.volume = volume;
        }
    }

    substractVolume(volume) {
        if (this.hasVolume()) {
            this.volume -= volume;
        } else {
            this.volume = volume;
        }
    }

    clearVolume() {
        this.volume = this._CellValue.None;
    }

    hasVolume() {
        return this.volume !== this._CellValue.None;
    }

    clearSign() {
        this.sign = this._CellValue.None;
    }

    hasSign() {
        return this.sign;
    }

    clone() {
        return new TableCell({volume: this.volume, transportCost: this.transportCost, sign: this.sign});
    }

}