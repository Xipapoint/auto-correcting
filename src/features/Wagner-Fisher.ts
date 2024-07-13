function lev_distance(i: number, j: number, s1: string, s2: string, matrix: number[][]): number{
    if(i == 0 && j == 0) return 0
    else if(i == 0 && j > 0) return j
    else if(j == 0 && i > 0) return i
    else{
        let m: number;
        if(s1[i-1] === s2[j-1]) m = 0
        else m = 1
        return Math.min(matrix[i][j-1]+1, matrix[i-1][j]+1, matrix[i-1][j-1]+m)
    }
}

export function calculate_distances(s1: string, s2: string){
    const n: number = s1.length
    const m: number = s2.length
    const matrix: number[][] = [];
    for (let i = 0; i <= n; i++) {
        matrix[i] = [];
        for (let j = 0; j <= m; j++) {
            matrix[i][j] = 0;
        }
    }
    // Заполняем матрицу значениями расстояния Левенштейна
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= m; j++) {
            matrix[i][j] = lev_distance(i, j, s1, s2, matrix);
        }
    }
    return matrix
}