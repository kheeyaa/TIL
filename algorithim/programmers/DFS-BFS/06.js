// 1631. Path With Minimum Effort
// https://leetcode.com/problems/path-with-minimum-effort/

// 1차 시도 : DFS => 잘 안풀림
{
  function minimumEffortPath(heights) {
    let answer = Number.MAX_SAFE_INTEGER;
    let row = heights.length;
    let column = heights[0].length;
    let ch = Array.from({ length: row }, () => Array(column).fill(0));
    let dx = [1, -1, 0, 0];
    let dy = [0, 0, 1, -1];
    let max = 0,
      min = Number.MAX_SAFE_INTEGER,
      gab;

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        max = Math.max(max, heights[i][j]);
        min = Math.min(min, heights[i][j]);
      }
    }
    gab = max - min;
    if (gab === 0) return 0;

    function DFS(x, y, h) {
      if (x === row - 1 && y === column - 1) {
        // 종료
        return (answer = Math.min(answer, h));
      } else {
        ch[x][y] = 1;
        for (let i = 0; i < 4; i++) {
          let curx = x + dx[i];
          let cury = y + dy[i];

          if (curx >= 0 && curx < row && cury >= 0 && cury < column && ch[curx][cury] === 0) {
            let curh = Math.abs(heights[x][y] - heights[curx][cury]);
            curh = Math.max(h, curh);
            console.log(curx, cury, curh);

            DFS(curx, cury, curh);
          }
        }
        ch[x][y] = 0;
      }
    }
    DFS(0, 0, 0);
    return answer;
  }
  // console.log(
  //   minimumEffortPath([
  //     [8, 3, 2, 5, 2, 10, 7, 1, 8, 9],
  //     [1, 4, 9, 1, 10, 2, 4, 10, 3, 5],
  //     [4, 10, 10, 3, 6, 1, 3, 9, 8, 8],
  //     [4, 4, 6, 10, 10, 10, 2, 10, 8, 8],
  //     [9, 10, 2, 4, 1, 2, 2, 6, 5, 7],
  //     [2, 9, 2, 6, 1, 4, 7, 6, 10, 9],
  //     [8, 8, 2, 10, 8, 2, 3, 9, 5, 3],
  //     [2, 10, 9, 3, 5, 1, 7, 4, 5, 6],
  //     [2, 3, 9, 2, 5, 10, 2, 7, 1, 8],
  //     [9, 10, 4, 10, 7, 4, 9, 3, 1, 6],
  //   ])
  // ); // 타임리밋남 ㅠㅠ
  // console.log(minimumEffortPath([[1, 10, 6, 7, 9, 10, 4, 9]])); // 9
  //   console.log(
  //     minimumEffortPath([
  //       [1, 2, 2],
  //       [3, 8, 2],
  //       [5, 3, 5],
  //     ])
  //   ); // 2
  //   console.log(
  //     minimumEffortPath([
  //       [1, 2, 3],
  //       [3, 8, 4],
  //       [5, 3, 5],
  //     ])
  //   ); // 1
  //   console.log(
  //     minimumEffortPath([
  //       [1, 2, 1, 1, 1],
  //       [1, 2, 1, 2, 1],
  //       [1, 2, 1, 2, 1],
  //       [1, 2, 1, 2, 1],
  //       [1, 1, 1, 2, 1],
  //     ])
  //   ); // 0
}

// 2차 시도 : BFS => 성공
{
  function minimumEffortPath(heights) {
    let n = heights.length;
    let m = heights[0].length;
    let dx = [1, -1, 0, 0];
    let dy = [0, 0, 1, -1];
    let dist = Array.from({ length: n }, () => Array(m).fill(Number.MAX_SAFE_INTEGER));

    function BFS() {
      let queue = [[0, 0]];
      dist[0][0] = 0;
      while (queue.length) {
        let [curx, cury] = queue.shift();
        for (let i = 0; i < 4; i++) {
          let [nx, ny] = [curx + dx[i], cury + dy[i]];

          if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
            let dh = Math.max(Math.abs(heights[nx][ny] - heights[curx][cury]), dist[curx][cury]);
            if (dist[nx][ny] > dh) {
              dist[nx][ny] = dh;
              queue.push([nx, ny]);
            }
          }
        }
      }
    }
    BFS();
    console.log(dist);
    return dist[n - 1][m - 1];
  }
  // console.log(
  //   minimumEffortPath([
  //     [8, 3, 2, 5, 2, 10, 7, 1, 8, 9],
  //     [1, 4, 9, 1, 10, 2, 4, 10, 3, 5],
  //     [4, 10, 10, 3, 6, 1, 3, 9, 8, 8],
  //     [4, 4, 6, 10, 10, 10, 2, 10, 8, 8],
  //     [9, 10, 2, 4, 1, 2, 2, 6, 5, 7],
  //     [2, 9, 2, 6, 1, 4, 7, 6, 10, 9],
  //     [8, 8, 2, 10, 8, 2, 3, 9, 5, 3],
  //     [2, 10, 9, 3, 5, 1, 7, 4, 5, 6],
  //     [2, 3, 9, 2, 5, 10, 2, 7, 1, 8],
  //     [9, 10, 4, 10, 7, 4, 9, 3, 1, 6],
  //   ])
  // ); // 타임리밋남 ㅠㅠ
  // console.log(minimumEffortPath([[1, 10, 6, 7, 9, 10, 4, 9]])); // 9
  // console.log(
  //   minimumEffortPath([
  //     [1, 2, 2],
  //     [3, 8, 2],
  //     [5, 3, 5],
  //   ])
  // ); // 2
  // console.log(
  //   minimumEffortPath([
  //     [1, 2, 3],
  //     [3, 8, 4],
  //     [5, 3, 5],
  //   ])
  // ); // 1
  // console.log(
  //   minimumEffortPath([
  //     [1, 2, 1, 1, 1],
  //     [1, 2, 1, 2, 1],
  //     [1, 2, 1, 2, 1],
  //     [1, 2, 1, 2, 1],
  //     [1, 1, 1, 2, 1],
  //   ])
  // ); // 0
}
