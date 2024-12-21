class BasisPlanFinder {

    _table;
    _a;
    _b;

    createBasicPlan(table) {
        this._table = TableUtils.clone(table);
   
        let [k, s] = this._getCoordsOfMinimumTariff();

        this._a = IntStream.range(0, this._table.length).map(i => table[i][table[i].length - 1]);

        this._b = IntStream.range(0, this._table[0].length).map(j => table[table.length - 1][j]);
        do {
            let volume = Math.min(this._a[k], this._b[s]);
            this._setVolume(k, s, volume);

            if (this._a[k] === 0) {
                if (this._isNull(this._a)) {
                    break;
                }
                k = this._getLine(s);           
            } else {
                if (this._isNull(this._b)) {
                    break;
                }
                s = this._getColumn(k);
            }
        } while (this._canFill());

        return this._table;
    }

    _getCoordsOfMinimumTariff() {
        let [min, k, s] = [Number.MAX_VALUE, 0, 0];
        IntStream.range(1, this._table.length - 1).forEach(i =>
            IntStream.range(1, this._table[i].length - 1).forEach(j => {
                if (this._table[i][j].transportCost < min) {
                    min = this._table[i][j].transportCost;
                    [k, s] = [i, j];
                }
            })
        )
        return [k, s];
    }

    _isNull(v) {
        return v.filter(p => p === 0).length === v.length;
    }

    _getColumn(k) {
        const costs = IntStream
            .range(1, this._b.length - 1)
            .filter(j => this._b[j] > 0)
            .map(j => this._table[k][j].transportCost);

        const min = Math.min(...costs);
        const line =  this._table[k].map(element => element.transportCost);
        return line.indexOf(min);
    }

    _getLine(s) {
        const costs = IntStream
            .range(1, this._a.length - 1)
            .filter(i => this._a[i] > 0)
            .map(i => this._table[i][s].transportCost);

        const min = Math.min(...costs);
        const column = IntStream.range(0, this._table.length).map(i => this._table[i][s].transportCost);
        return column.indexOf(min);
    }

    _setVolume(i, j, volume) {
        this._table[i][j].volume = volume;
        this._a[i] -= volume;
        this._b[j] -= volume;
    }

    _canFill() {
        const isNotNull = (v) => {
            return IntStream.range(1, v.length - 1).filter(i => v[i] !== 0).length > 0;
        }
        return isNotNull(this._a) || isNotNull(this._b);
    }
}