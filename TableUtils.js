class TableUtils {

    static clone(table) {
        const clonedTable = [];
        clonedTable.push([...table[0]]);

        IntStream.range(1, table.length - 1).forEach(i => {
            clonedTable.push([table[i][0]])
        });

        IntStream.range(1, table.length - 1).forEach(i =>{
            IntStream.range(1, table[i].length - 1).forEach(j =>{
                clonedTable[i].push(table[i][j].clone())
            })
        });

        IntStream.range(1, table.length - 1).forEach(i =>
            clonedTable[i].push(table[i][table[i].length - 1]));

        clonedTable.push([...table[table.length - 1]]);
        return clonedTable;
    }

    static clearVolume(table, volume) {
        table.forEach(line =>
            line
            .filter(element => element.hasVolume)
            .filter(element => element.volume === volume)
            .forEach(element => element.clearVolume()))
    }

    static countVolumes(table) {
        let volumes = 0;
        IntStream.range(1, table.length - 1).forEach(i =>
            volumes += IntStream.range(1, table[i].length - 1).filter(j => table[i][j].hasVolume()).length);
        return volumes;
    }

    static countVolumesInColumn(table, j) {
        return IntStream
            .range(1, table.length - 1)
            .filter(i => table[i][j].hasVolume()).length;
    }

    static countVolumesInLine(table, i) {
        console.log(IntStream
            .range(1, table[i].length - 1)
            .filter(j => table[i][j].hasVolume()));
        return IntStream
            .range(1, table[i].length - 1)
            .filter(j => table[i][j].hasVolume()).length;
    }

    static transpose(table) {
        const result = [];
        IntStream.range(0, table[0].length).forEach(j => {
            const line = IntStream.range(0, table.length).map(i => table[i][j]);
            //IntStream.range(0, table.length).forEach(i => line.push(table[i][j]));
            result.push(line);
        })
        return result;
    }

    static deleteColumn(table, columns) {
        return table.map(row => row.filter((_, i) => !columns.includes(i)))
    }

    static deleteLine(table, lines) {
        // const result = [];
        // IntStream
        //     .range(0, table.length)
        //     .filter(i => i !== k)
        //     .forEach(i => result.push(table[i]))
        // return result;
        return table.filter((_, index) => !lines.includes(index))
    }

}