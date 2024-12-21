const EventTypes = {
    TableFilled: 'TableFilled',
    CircleFormed: 'CircleFormed',
    TableChangedByCircle: 'TableChangedByCircle',
}

const createTable = (oldTable) => {
    const newTable = TableService.createAndFillNewTable(oldTable);
    document.body.appendChild(newTable);
}


const tableFilledSubscription = EventBus.subscribe(EventTypes.TableFilled, (oldTable) => {
    createTable(oldTable);
})

const circleFormedSubscription = EventBus.subscribe(EventTypes.CircleFormed, (oldTable, k, s) => {
    const tables = document.getElementsByTagName('table');
    const lastTable = tables[tables.length - 1];
    TableService.colorAllowedElementInTable(lastTable, k, s);

    createTable(oldTable);
})

const tableChangedByCircleSubscription = EventBus.subscribe(EventTypes.TableChangedByCircle, (oldTable) => {
    createTable(oldTable);
})


const outputSolve = (table) => {
    function getFunctionValue(table) {
        let value = 0;
        IntStream.range(1, table.length - 1).forEach(i =>
            IntStream.range(1, table[i].length - 1).filter(j => table[i][j].hasVolume()).forEach(j =>
                value += (table[i][j].volume * table[i][j].transportCost)));

        return value;
    }
    const h2 = document.createElement('h2');
    h2.classList.add('finalAnswer')
    h2.innerText = 'F = ' + getFunctionValue(table);
    document.body.appendChild(h2);
}

const unsubscribe = () => {
    tableFilledSubscription.unsubscribe();
    circleFormedSubscription.unsubscribe();
    tableChangedByCircleSubscription.unsubscribe();
}

let storageNames = [];
let shopNames = [];

const task1 = () => {
    // const transportCosts = [
    //     [21, 22, 2, 13, 7],
    //     [27, 10, 4, 24, 9],
    //     [3, 16, 25, 5, 4],
    //     [28, 11, 17, 10, 29]
    // ];

    // const storagesVolumes = [18, 12, 17, 13];
    // const shopsNeeds = [8, 8, 8, 8, 28];

    const transportCosts = [
        [15, 6, 25, 11, 12],
        [13, 14, 20, 27, 30],
        [16, 7, 19, 10, 21],
        [1, 29, 23, 25, 18]
    ];

    const storagesVolumes = [9, 18, 23, 26];
    const shopsNeeds = [11, 22, 31, 6, 6];

    // const transportCosts = [
    //     [2, 5, 4, 3],
    //     [6, 2, 8, 9],
    //     [7, 8, 3, 4],
    // ];

    // const storagesVolumes = [30, 40, 50];
    // const shopsNeeds = [30, 40, 20, 30];

    IntStream.range(0, transportCosts.length).forEach(i => storageNames.push(`A${i + 1}`));
    IntStream.range(0, transportCosts[0].length).forEach(i => shopNames.push(`a${i + 1}`));


    const table = new Table();
    table.setTable(shopNames, storageNames, transportCosts, storagesVolumes, shopsNeeds);

    const htmlTable = document.getElementById('transport');
    TableService.fillTableFromMatrix(htmlTable, table.getTable());
    const solver = new TransportationProblemSolver();
    const solve = solver.solve(table);
    outputSolve(solve);

    unsubscribe();
}

// const task2 = () => {
//     const transportCosts = [
//         [21, 22, 2, 13, 7],
//         [27, 10, 4, 24, 9],
//         [3, 16, 25, 5, 4],
//         [28, 11, 17, 10, 29]
//     ];

//     const storagesVolumes = [18, 12, 17, 13];
//     const shopsNeeds = [8, 8, 8, 8, 28];

//     IntStream.range(0, transportCosts.length).forEach(i => storageNames.push(`A${i + 1}`));
//     IntStream.range(0, transportCosts[0].length).forEach(i => shopNames.push(`α${i + 1}`));


//     const table = new Table();
//     table.setTable(shopNames, storageNames, transportCosts, storagesVolumes, shopsNeeds);

//     const htmlTable = document.getElementById('transport');
//     TableService.fillTableFromMatrix(htmlTable, table.getTable());

//     const solver = new TransportationProblemSolver();
//     const solve = solver.solve(table);
//     outputSolve(solve);

//     unsubscribe();
// }

task1();