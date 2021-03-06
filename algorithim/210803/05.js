// 5. 섬나라 아일랜드(DFS) => flood fill algorithm
// N*N의 섬나라 아일랜드의 지도가 격자판의 정보로 주어집니다. 각 섬은 1로 표시되어 상하좌
// 우와 대각선으로 연결되어 있으며, 0은 바다입니다. 섬나라 아일랜드에 몇 개의 섬이 있는지
// 구하는 프로그램을 작성하세요.

// ▣ 입력설명
// 매개변수 board에 N*N(3<=N<=20)의 격자판 정보가 주어집니다.
// ▣ 출력설명
// 섬의 개수를 반환합니다.
// ▣ 매개변수 형식 1
// [[1, 1, 0, 0, 0, 1, 0], [0, 1, 1, 0, 1, 1, 0], [0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 1, 1],
// [1, 1, 0, 1, 1, 0, 0], [1, 0, 0, 0, 1, 0, 0], [1, 0, 1, 0, 1, 0, 0]]
// ▣ 반환값 형식 1
// 5

// my try)
{
  function solution(board) {
    let n = board.length;
    let dx = [-1, 0, 1, -1, 1, -1, 0, 1];
    let dy = [1, 1, 1, 0, 0, -1, -1, -1];
    let answer = 0;

    function DFS(x, y) {
      for (let i = 0; i < 8; i++) {
        // 8방면으로 뺑뺑 돌며 섬인 곳을 찾는다.
        let nx = x + dx[i];
        let ny = y + dy[i];

        if (nx >= 0 && nx < n && ny >= 0 && ny < n && board[nx][ny] === 1) {
          // 경계 내에서 섬인 경우
          board[nx][ny] = 0; // 방문 처리
          DFS(nx, ny);
        }
      }
    }

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] === 1) {
          // 섬인 경우
          board[i][j] = 0; // 방문 철
          DFS(i, j);
          answer++;
        }
      }
    }
    return answer;
  }
  //   console.log(
  //     solution([
  //       [1, 1, 0, 0, 0, 1, 0],
  //       [0, 1, 1, 0, 1, 1, 0],
  //       [0, 1, 0, 0, 0, 0, 0],
  //       [0, 0, 0, 1, 0, 1, 1],
  //       [1, 1, 0, 1, 1, 0, 0],
  //       [1, 0, 0, 0, 1, 0, 0],
  //       [1, 0, 1, 0, 1, 0, 0],
  //     ])
  //   ); // 5
}

// sol)
{
  function solution(board) {
    let dx = [-1, 0, 1, -1, 1, -1, 0, 1];
    let dy = [1, 1, 1, 0, 0, -1, -1, -1];
    let n = board.length;
    let answer = 0;

    // flood fill algorithm
    function DFS(x, y) {
      // 대각선 포함, 8방면으로 뻣어나감.
      for (let k = 0; k < 8; k++) {
        let nx = x + dx[k];
        let ny = y + dy[k];
        // 섬이고, 격자 바깥으로 나가지 않을 때...
        if (nx >= 0 && nx < n && ny >= 0 && ny < n && board[nx][ny] === 1) {
          // 섬을 바다로 바꿔서, 방문 했다는 것을 표시함.
          board[nx][ny] = 0;
          // 그 인접 DFS를 구함.
          DFS(nx, ny);
        }
      }
    }

    // board 격자를 쭉 돌면서 섬일때 인접한 섬을 처리 => DFS
    // 그때 처리되는 섬들은 연결되어 있으므로, answer은 1증가시켜주면 됨.
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] === 1) {
          // 섬일 때
          board[i][j] = 0;
          answer++;
          // 섬의 근처 8방향에서의 인접한 섬을 찾는다.
          DFS(i, j);
        }
      }
    }
    return answer;
  }
  //   console.log(
  //     solution([
  //       [1, 1, 0, 0, 0, 1, 0],
  //       [0, 1, 1, 0, 1, 1, 0],
  //       [0, 1, 0, 0, 0, 0, 0],
  //       [0, 0, 0, 1, 0, 1, 1],
  //       [1, 1, 0, 1, 1, 0, 0],
  //       [1, 0, 0, 0, 1, 0, 0],
  //       [1, 0, 1, 0, 1, 0, 0],
  //     ])
  //   ); // 5
}
