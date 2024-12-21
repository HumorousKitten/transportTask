class SolveChecker {

    // u[i] + v[j] > c[i][j] => not optimal
    isOptimalPotentials(table, u, v) {
        for (let i = 1; i < table.length - 1; i++) {
            for (let j = 1; j < table[i].length; j++) {
                if (u[i - 1] + v[j - 1] > table[i][j].transportCost) {
                    return false;
                }
            }
        }
        return true;
    }

    isOptimalPotentialMatrix(matrix) {
        for (let i = 1; i < matrix.length - 1; i++) {
            for (let j = 1; j < matrix[i].length - 1; j++) {
                if (matrix[i][j] < 0) {
                    return false;
                }
            }
        }
        return true;
    }
}