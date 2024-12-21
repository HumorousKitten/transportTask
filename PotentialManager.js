class PotentialManager {

    _Potential = {
        Empty: '-',
    }

    getPotentials(table) {
        const [u, v] = this._fillByDefault(table);
        while (this._potentialsNotFilled(u, v)) {
            IntStream.range(1, table.length - 1).forEach(i =>
                IntStream.range(1, table[i].length - 1)
                    .filter(j => table[i][j].hasVolume())
                    .filter(j => this._canGetPotential(u[i - 1], v[j - 1]))
                    .forEach(j => this._getPotential(table[i][j].transportCost, u, v, i, j)));
        }
        return [u, v];
    }

    _potentialsNotFilled(u, v) {
        return u.includes(this._Potential.Empty) || v.includes(this._Potential.Empty);
    }

    _getPotential(transportCost, u, v, i, j) {
        if (this._isEmpty(u[i - 1])) {
            u[i - 1] = transportCost - v[j - 1];
        } else {
            v[j - 1] = transportCost - u[i - 1];
        }
    }

    _canGetPotential(u, v) {
        return !(this._isEmpty(u) && this._isEmpty(v));
    }

    _isEmpty(potential) {
        return potential === this._Potential.Empty;
    }

    // u = [0,   '-',..., '-']  size = table.length
    // v = ['-', '-',..., '-']  size = table[0].length
    _fillByDefault(table) {
        const [u, v] = [[], []];
        IntStream.range(1, table.length - 1).forEach(() => u.push(this._Potential.Empty));
        IntStream.range(1, table[0].length - 1).forEach(() => v.push(this._Potential.Empty));
        u[0] = 0;
        return [u, v];
    }

}