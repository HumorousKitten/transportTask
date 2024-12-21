class TransportationProblemSolver {

    _basisPlanFinder = new BasisPlanFinder();
    _potentialManager = new PotentialManager();
    _solveChecker = new SolveChecker();
    _circleFormer = new CircleFormer();

    solve(table) {
        const basisTable = this._basisPlanFinder.createBasicPlan(table.getTable());
        let [u, v] = this._potentialManager.getPotentials(basisTable);
        while (!this._solveChecker.isOptimalPotentials(basisTable, u, v)) {
            [u, v] = this._potentialManager.getPotentials(basisTable);

            let potentialTable = this._createAndFillNewPotentialMatrix(basisTable, u, v);

            if (this._solveChecker.isOptimalPotentialMatrix(potentialTable)) {
                return basisTable;
            }

            let [k, s] = this._getAllowedCell(potentialTable);
            this._circleFormer.form(basisTable, k, s);
            EventBus.publish(EventTypes.CircleFormed, basisTable, k, s);

            this._circleFormer.changeTableByCircle(basisTable);
            EventBus.publish(EventTypes.TableChangedByCircle, basisTable);
        }

        return basisTable;
    }

    _createAndFillNewPotentialMatrix(table, u, v) {
        const matrix = TableUtils.clone(table);
        IntStream.range(1, matrix.length - 1).forEach(i =>
            IntStream.range(1, matrix[i].length - 1).forEach(j =>
                matrix[i][j] = table[i][j].transportCost - (u[i - 1] + v[j - 1])));

        return matrix;
    }

    _getAllowedCell(table) {
        let [max, k, s] = [0, 0, 0];
        IntStream.range(1, table.length - 1).forEach(i =>
            IntStream.range(1, table[i].length - 1).filter(j => table[i][j] < 0).forEach(j => {
                if (Math.abs(table[i][j]) > Math.abs(max)) {
                    max = table[i][j];
                    [k, s] = [i, j];
                }
            })
        )
        return [k, s];
    }

}