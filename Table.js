class Table {

    //   ['', 'c', -x1, ... ,-xn]
    //   [y1,  c1, a11, ... ,a1n]
    //   ........................
    //   [ym,  cm, am1, ... ,amn]
    //   ['f', f0,  f1, ... , fn]
    //   ['g', g1, g2,  ... , gn]
    _table

    /*----------------------------------*
     *          Initialization          *
     *----------------------------------*/
    constructor() {
        this._table = [];
    }

    setTable(shopNames, storageNames, transportCosts, storagesVolumes, shopsNeeds) {
        this._table.push(['']);
        this._table[0] = [].concat(this._table[0], shopNames);
        this._table[0].push('');


        IntStream.range(0, storageNames.length).forEach(i => {
            this._table.push([]);
            this._table[i + 1].push(storageNames[i]);
        })


        IntStream.range(0, transportCosts.length).forEach(i =>
            IntStream.range(0, transportCosts[i].length).forEach(j =>
                this._table[i + 1].push(new TableCell({transportCost: transportCosts[i][j]}))));


        IntStream.range(0, storagesVolumes.length).forEach(i =>
            this._table[i + 1].push(storagesVolumes[i]));


        this._table.push(['']);
        this._table[this._table.length - 1] = [].concat(this._table[this._table.length - 1], shopsNeeds);
        this._table[this._table.length - 1].push('');
    }

    /*----------------------------------*
     *             Utilities            *
     *----------------------------------*/
    clone() {
        const table = [];
        this._table.forEach(line => {
            table.push(Object.assign([], line));
        })
        return table;
    }

    getTable() {
        return this._table;
    }

}