// 4. 효율적인 공부
// 철수는 과학적으로 공부하기 위해 전문 병원에서 철수의 신체 리듬에 따라 공부의 효율성을
// 표시한 표를 받았다.
// 표는 N(1<=N<=1,000,000)시간의 일정을 겹쳐지는 M(1<=M<=1,000)구간별로 공부의 효율성
// 이 표시되어 있다.
// 각 구간은 시작시간(0<=st<N)과 끝나는 시간(st<et<=N) 그리고 해당 구간에서의 공부의 효율
// 성이 주어진다.
// 철수는 한 구간을 공부하고 나면 꼭 휴식시간(1<=R<=N)을 가져야만 합니다.
// 철수가 N시간동안 공부를 할 때 각 구간을 잘 선택해서 공부를 열심히 한다면 가장 높은 효율
// 성을 얼마인지 출력하는 프로그램을 작성하세요.

// ▣ 입력설명
// 매개변수 times에 M 구간의 시작시간, 끝나는 시간 그리고 해당구간의 공부효율성이 주어집니
// 다. 매개변수 r에 R값이 주어집니다.
// ▣ 출력설명
// 가장 높은 효율성을 반환하세요
// ▣ 매개변수 형식 1
// [[3, 5, 20], [4, 7, 16], [1, 2, 5], [11, 13, 7], [9, 10, 6]], 2
// => 5 + 26 + 7 = 28
// ▣ 반환값 형식 1
// 28

// - 끝나는 시간을 기준으로 오름차순 정렬
// - 자신을 기준으로, 앞에서 끝나는 시간 + r 이, 나의 시작 시간보다 작거나 같다면 조건에 만족함
// - 조건을 만족하는 애들 중에서, 가장 최대 효율을 가지는 애를 골라서 나의 효율과 더해서 저장.

// sol)
{
  function solution(times, r) {
    let answer = 0;
    let m = times.length;
    let dy = Array.from({ length: m }, () => 0);
    times.sort((a, b) => a[1] - b[1]);
    for (let i = 0; i < m; i++) {
      dy[i] = times[i][2];
      for (let j = i - 1; j >= 0; j--) {
        if (times[j][1] + r <= times[i][0] && dy[j] + times[i][2] > dy[i]) {
          dy[i] = dy[j] + times[i][2];
        }
      }
      answer = Math.max(answer, dy[i]);
    }
    return answer;
  }
  // console.log(
  //   solution(
  //     [
  //       [3, 5, 20],
  //       [4, 7, 16],
  //       [1, 2, 5],
  //       [11, 13, 7],
  //       [9, 10, 6],
  //     ],
  //     2
  //   )
  // ); //28
}

// mysol)
{
  function solution(times, r) {
    let n = times.length;
    let dy = Array.from({ length: n }, () => 0);

    // 끝나는 시간을 기준으로 오름차순 정렬.
    // 시간표문제, 예약시간문제 같은 문제는 끝시간을 기준으로 정렬하고,
    // 맨 처음부터 가장 많이 선택하는 경우의 수를 찾으면 된다
    times.sort((a, b) => a[1] - b[1]);
    let answer = 0;

    dy[0] = times[0][2]; // 첫번째 효율

    for (let i = 0; i < n; i++) {
      // 기준
      let max = 0;
      for (let j = i - 1; j >= 0; j--) {
        // 기준보다 앞에 있는 것
        if (times[i][0] >= times[j][1] + r && dy[j] > max) {
          // 기준 공부의 시작 시간 >= 앞 공부의 종료 시간 + 휴식시간
          // 을 만족하는 앞 공부 중의 효율성의 누적이 가장 좋은 것을 고른다.
          max = dy[j];
        }
      }
      dy[i] = max + times[i][2];
      // 앞 공부 효율성 + 기준 공부 효율성

      if (answer < dy[i]) answer = dy[i];
      // 여태 누적한 효율성 중의 최고를 고름
    }

    // console.log(dy); // [5, 20, 21, 27, 28]
    return answer;
  }
  // console.log(
  //   solution(
  //     [
  //       [3, 5, 20],
  //       [4, 7, 16],
  //       [1, 2, 5],
  //       [11, 13, 7],
  //       [9, 10, 6],
  //     ],
  //     2
  //   )
  // ); //28
}

// mytry)
{
  function solution(times, r) {
    let n = times.length;
    let dy = Array.from({ length: n }, () => 0);

    // 끝나는 시간순!!!!!!!! 정렬
    times.sort((a, b) => a[1] - b[1]);
    dy[0] = times[0][2]; // 효율성
    let answer = 0;

    for (let i = 0; i < n; i++) {
      let a_s = times[i][0]; // 기준의 시작시간
      let a_m = times[i][2]; // 기준의 효율성
      let max = 0;
      for (let j = i - 1; j >= 0; j--) {
        let b_e = times[j][1]; // 비교의 종료시간
        if (a_s >= b_e + r && dy[j] > max) {
          max = dy[j];
        }
      }
      dy[i] = max + a_m;
      answer = Math.max(dy[i], answer);
    }
    console.log(dy);
    return answer;
  }
  // console.log(
  //   solution(
  //     [
  //       [3, 5, 20],
  //       [4, 7, 16],
  //       [1, 2, 5],
  //       [11, 13, 7],
  //       [9, 10, 6],
  //     ],
  //     2
  //   )
  // ); //28
}
