// 7. 토마토(BFS)
// 현수의 토마토 농장에서는 토마토를 보관하는 큰 창고를 가지고 있다. 토마토는 아래의 그림
// 과 같이 격자 모양 상자의 칸에 하나씩 넣어서 창고에 보관한다.
// 창고에 보관되는 토마토들 중에는 잘 익은 것도 있지만, 아직 익지 않은 토마토들도 있을 수
// 있다. 보관 후 하루가 지나면, 익은 토마토들의 인접한 곳에 있는 익지 않은 토마토들은 익은
// 토마토의 영향을 받아 익게 된다. 하나의 토마토의 인접한 곳은 왼쪽, 오른쪽, 앞, 뒤 네 방향
// 에 있는 토마토를 의미한다. 대각선 방향에 있는 토마토들에게는 영향을 주지 못하며, 토마토
// 가 혼자 저절로 익는 경우는 없다고 가정한다. 현수는 창고에 보관된 토마토들이 며칠이 지나
// 면 다 익게 되는지, 그 최소 일수를 알고 싶어 합니다. 여러분이 도와주세요.
// 단, 상자의 일부 칸에는 토마토가 들어있지 않을 수도 있다.
// ▣ 입력설명
// 매개변수 board에 하나의 상자에 저장된 토마토들의 정보가 주어집니다. 정수 1은 익은 토마
// 토, 정수 0은 익지 않은 토마토, 정수 -1은 토마토가 들어있지 않은 칸을 나타낸다.
// ▣ 출력설명
// 여러분은 토마토가 모두 익을 때까지의 최소 날짜를 반환해야 합니다. 만약, 저장될 때부터 모
// 든 토마토가 익어있는 상태이면 0을 출력해야 하고, 토마토가 모두 익지는 못하는 상황이면
// -1을 출력해야 한다.
// ▣ 매개변수 형식 1
// [[0, 0, -1, 0, 0, 0], [0, 0, 1, 0, -1, 0], [0, 0, -1, 0, 0, 0], [0, 0, 0, 0, -1, 1]]
// ▣ 반환값 형식 1
// 4

// mysol)
{
  function solution(board) {
    let dx = [-1, 1, 0, 0];
    let dy = [0, 0, -1, 1];
    let answer = 0;
    let n = board.length; // 행
    let m = board[0].length; // 열
    let queue = [];

    // 큐 돌아가면서, 큐가 빌 때 까지 반복!
    function BFS() {
      while (queue.length) {
        let v = queue.shift();

        for (let i = 0; i < 4; i++) {
          // 4방향 뺑뺑 돌면서... 인접한 안익은 토마토 찾기
          let nx = v[0] + dx[i];
          let ny = v[1] + dy[i];

          if (nx >= 0 && nx < n && ny >= 0 && ny < m && board[nx][ny] === 0) {
            board[nx][ny] = board[v[0]][v[1]] + 1; // 익은 토마토로 바꿈, 날짜는 이전 토마토 + 1
            queue.push([nx, ny]);
            answer = Math.max(answer, board[nx][ny]);
          }
        }
      }
    }

    // 익은 토마토 찾아서 인덱스를 큐에 넣기
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        // console.log(board[i][j]);
        if (board[i][j] === 1) {
          queue.push([i, j]);
        }
      }
    }

    BFS();

    // 전체 상자 다시 뺑뺑 돌면서, 안익은 토마토가 있는지 확인
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (board[i][j] === 0) {
          return -1;
        }
      }
    }

    return answer - 1;
  }
  //   console.log(
  //     solution([
  //       [0, 0, -1, 0, 0, 0],
  //       [0, 0, 1, 0, -1, 0],
  //       [0, 0, -1, 0, 0, 0],
  //       [0, 0, 0, 0, -1, 1],
  //     ])
  //   ); // 4
  //   console.log(
  //     solution([
  //       [0, 0, -1, 0, 0, 0],
  //       [0, 0, 1, 0, -1, 0],
  //       [0, 0, -1, 0, 0, -1],
  //       [0, 0, 0, 0, -1, 0],
  //     ])
  //   ); // -1
}

{
  // 익은 토마토들은 L = 1에 전부 큐에 저장해야함.
  // 동시 다발적으로 발생
  function solution(board) {
    let dx = [-1, 1, 0, 0];
    let dy = [0, 0, -1, 1];
    let answer = 0;
    let n = board.length; // 행
    let m = board[0].length; // 열
    let dist = Array.from(Array(n), () => Array(m).fill(0));
    let queue = [];

    function BFS(x, y) {
      while (queue.length) {
        // 큐에 원소가 있을때 까지
        let cur = queue.shift();
        for (let j = 0; j < 4; j++) {
          // 4방향
          let nx = cur[0] + dx[j];
          let ny = cur[1] + dy[j];

          if (nx >= 0 && nx < n && ny >= 0 && ny < m && board[nx][ny] === 0) {
            // 경계선 안이고, 안익은 토마토
            board[nx][ny] = 1; // 익었다고 바꿈
            // 인접한 토마토 보다 하루 뒤에 익는다.
            dist[nx][ny] = dist[cur[0]][cur[1]] + 1;
            queue.push([nx, ny]);
            answer = dist[nx][ny]; // 맨 마지막에 들어간 날짜가 정답.
          }
        }
      }
    }

    // 익은 토마토의 인덱스를 큐에 넣는다.
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (board[i][j] === 1) {
          queue.push([i, j]);
        }
      }
    }
    BFS();

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        // 아직 안익은 토마토가 있다면? -1
        if (board[i][j] === 0) {
          return -1;
        }
      }
    }
    return answer;
  }
  //   console.log(
  //     solution([
  //       [0, 0, -1, 0, 0, 0],
  //       [0, 0, 1, 0, -1, 0],
  //       [0, 0, -1, 0, 0, 0],
  //       [0, 0, 0, 0, -1, 1],
  //     ])
  //   ); // 4
  //   console.log(
  //     solution([
  //       [0, 0, -1, 0, 0, 0],
  //       [0, 0, 1, 0, -1, 0],
  //       [0, 0, -1, 0, 0, -1],
  //       [0, 0, 0, 0, -1, 0],
  //     ])
  //   ); // -1
}
