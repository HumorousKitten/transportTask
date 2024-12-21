class TableService {

    static colorAllowedElementInTable(table, k, s) {
        table.getElementsByTagName('tr')[k].getElementsByTagName('td')[s].style.backgroundColor = 'red';
    }

    static createAndFillNewTable(data) {
        const table = document.createElement('table');
        table.classList.add('table')
        this.fillTableFromMatrix(table, data);
        return table;
    }

    static fillTableFromMatrix(table, data) {
        this._createTableFields(table, data);

        // Заполнить верхнюю строку ('', 'c', x[i]) c учётом сдвига от нулей (x[i] != '-0')
        this._fillShopNames(table, data);

        // Заполнить y[i] и константы
        this._fillStorageNames(table, data);

        // Окрашиваться зелёным должны только числа в матрице
        this._fillNumbers(table, data);

        // Заполнить низ и право
        this._fillStorageAndShopVolumes(table, data);
    }

    static _createTableFields(table, data) {
        for (let i = 0; i < data.length; i++) {
            table.appendChild(document.createElement('tr'));
            for (let j = 0; j < data[i].length; j++) {
                const td = document.createElement('td')
                if((i === 0 && j === 0) || (i === data.length - 1 && j === 0) || (i === 0 && j === data[i].length - 1) || (i === data.length - 1 && j === data[i].length - 1)) {
                    td.classList.add('noneBorder')
                }
                table.getElementsByTagName('tr')[i].appendChild(td);
            }
        }
    }

    static _fillShopNames(table, data) {
        for (let j = 0; j < data[0].length; j++) {
            const td = table.getElementsByTagName('tr')[0].getElementsByTagName('td')[j];
            td.innerText = data[0][j];
        }
    }

    static _fillStorageNames(table, data) {
        IntStream.range(1, table.getElementsByTagName('tr').length).forEach(i => {
            const td = table.getElementsByTagName('tr')[i].getElementsByTagName('td')[0];
            td.innerText = data[i][0];
        })
    }

    static _fillNumbers(table, data) {
        IntStream.range(1, data.length - 1).forEach(i =>
            IntStream.range(1, data[i].length - 1).forEach(j => {
                const cell = table.getElementsByTagName('tr')[i].getElementsByTagName('td')[j];

                const sup = document.createElement('sup');
                sup.classList.add('transportCost')
                sup.innerText = data[i][j].transportCost;
                if (data[i][j].hasVolume()) {
                    cell.innerText = data[i][j].volume;
                } else {
                    if (!data[i][j].hasSign()) {
                        sup.className = 'aloneSup';
                    }
                }
                cell.appendChild(sup);

                if (data[i][j].sign) {
                    const sub = document.createElement('sub');
                    sub.className = 'indexes';
                    sub.innerText = data[i][j].sign;
                    cell.appendChild(sub);
                    if (data[i][j].hasVolume() && data[i][j].sign === '+') {
                        cell.style.backgroundColor = 'lightgreen';
                    } else if(data[i][j].sign === '+' && !data[i][j].hasVolume()) {
                        cell.style.backgroundColor = 'red';
                    }else {
                        cell.style.backgroundColor = 'yellow';
                    }
                }
            })
        )
    }

    static _fillStorageAndShopVolumes(table, data) {
        const i = data.length - 1;
        for (let j = 0; j < data[i].length; j++) {
            table.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].innerText = data[i][j];
        }

        const j = data[i].length - 1;
        for (let i = 0; i < data.length; i++) {
            table.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].innerText = data[i][j];
        }
    }
}