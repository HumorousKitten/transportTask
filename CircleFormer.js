class CircleFormer {

    form(table, k, s) {
        //неправильно определил удаленные линии (должна удаляться первая строка)
        let [lines, columns] = this._formCircle(table, k, s);
        this._fillSigns(table, lines, columns, k, s);
    }

    _formCircle(table, k, s) {
        let temp = TableUtils.clone(table);
        let [lines, columns] = [[], []];
        let canForm = true;

        while (canForm) {

            const deletedLines = IntStream
                                    .range(1, temp.length - 1)
                                    .filter(i => i !== k)
                                    .filter(i => !lines.includes(i))
                                    .filter(i => TableUtils.countVolumesInLine(temp, i) === 1);

            lines.push(...deletedLines)
            temp = TableUtils.deleteLine(table, deletedLines)

            const deletedColumns = IntStream
                                    .range(1, temp[0].length - 1)
                                    .filter(j => j !== s)
                                    .filter(j => !columns.includes(j))
                                    .filter(j => TableUtils.countVolumesInColumn(table, j) === 1);
            columns.push(...deletedColumns)
            temp = TableUtils.deleteColumn(table, deletedColumns)

            if (deletedLines.length === 0 && deletedColumns.length === 0) {
                canForm = false;
            }
        }

        return [lines, columns];
    }

    _fillSigns(table, lines, columns, k, s) {
        let canFill = true;
        let isColumn = true;
        let i = k;
        table[k][s].sign = '+';
        while (canFill) {
            if (isColumn) {
                k = IntStream
                    .range(1, table.length - 1)
                    .filter(i => !lines.includes(i))
                    .filter(i => i !== k)
                    .filter(i => table[i][s].hasVolume())[0];

                table[k][s].sign = '-';
            } else {
                s = IntStream
                    .range(1, table[k].length - 1)
                    .filter(j => !columns.includes(j))
                    .filter(j => j !== s)
                    // .filter(j => table[k][j].volume !== 0)[0];
                    .filter(j => table[k][j].hasVolume())[0];
                table[k][s].sign = '+';
            }
            if (i === k) {
                canFill = false;
            }
            isColumn = !isColumn;
        }
    }

    changeTableByCircle(table) {
        let nullElements = [];
        let min = this._getMinimumFromCircle(table);
        IntStream.range(1, table.length - 1).forEach(i =>
            IntStream.range(1, table[i - 1].length - 1).filter(j => table[i][j].sign).forEach(j => {
                if (table[i][j].sign === '+') {
                    //table[i][j].volume += min;
                    if (table[i][j].hasVolume()) {
                        if (table[i][j].volume === 0 || table[i][j].volume === min) {
                            nullElements.push({i: i, j: j});
                        }
                    }
                    table[i][j].addVolume(min);
                } else {
                    if (table[i][j].hasVolume()) {
                        if (table[i][j].volume === 0 || table[i][j].volume === min) {
                            nullElements.push({i: i, j: j});
                        }
                    }
                    table[i][j].substractVolume(min);
                    //table[i][j].volume -= min;
                }
                table[i][j].clearSign();
            })
        )

        const maxVolumesCount = (table.length - 2 + (table[0].length - 2) - 1);
        const currentVolumesCount = TableUtils.countVolumes(table);

        if (currentVolumesCount > maxVolumesCount) {
            for (let k = 0; k < currentVolumesCount - maxVolumesCount; k++) {
                const lastNullCoords = nullElements[nullElements.length - 1 - k];
                let [i, j] = [lastNullCoords.i, lastNullCoords.j];
                table[i][j].clearVolume();
            }
        }
    }

    _getMinimumFromCircle(table) {
        let min = Number.MAX_VALUE;
        IntStream.range(1, table.length - 1).forEach(i =>
            IntStream.range(1, table[i - 1].length - 1).filter(j => table[i][j].sign === '-').forEach(j => {
                if (table[i][j].volume < min) {
                    min = table[i][j].volume;
                }
            })
        )
        return min;
    }

}