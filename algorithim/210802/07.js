// 7. 중복순열 구하기 => 오늘 문제,,!!
// - 순열 : 중복 X 순서 O
// - 중복순열 : 중복 O 순서 O
// - 조합 : 중복 X 순서 X
// 1부터 N까지 번호가 적힌 구슬이 있습니다. 이 중 중복을 허락하여 M번을 뽑아 일렬로 나열
// 하는 방법을 모두 출력합니다.
// ▣ 입력설명
// 매개변수 n에 자연수 N(3<=N<=10)이 주어지고, 매개변수 m에 M(2<=M<=N) 이 주어집니다.
// ▣ 출력설명
// 중복순열의 경우를 배열 형태로 반환합니다. 각 경우의 순서는 오름차순입니다.
// ▣ 매개변수 형식 1
// 3 2
// ▣ 반환값 형식 1
// [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]]

// 중복 순열
{
  function solution(n, m) {
    let answer = [];
    let tmp = [];
    function DFS(L) {
      // 재귀는 지역, 매개변수만 컨트롤 하는 것
      // 종료조건
      if (L === m) {
        // 뽑는 갯수...
        answer.push(tmp.slice());
      } else {
        // n까지의 자연수를 넣고 빼고를 해야함..
        for (let i = 1; i <= n; i++) {
          tmp.push(i); // 집어넣고
          DFS(L + 1);
          tmp.pop(); // 빼고
        }
      }
    }
    DFS(0);
    return answer;
  }
  // console.log(solution(3, 2));
  //[[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]]
}

// my try)
{
  function solution(n, m) {
    let answer = [];
    let tmp = [];
    function DFS(L) {
      if (L === m) {
        // 종료조건, 깊이가 m이라는 것은 m중 반복문과 동일.
        answer.push(tmp.slice()); // 깊은 복사!!!
      } else {
        // 뽑기.. n개의 수 중 하나를 뽑아야함.
        for (let i = 1; i <= n; i++) {
          tmp.push(i);
          DFS(L + 1);
          tmp.pop();
        }
        // 원래 넣거나 안넣거나 둘중에 하나를 고르는 것이면,
        // DFS를 2번만 불러오면 됐다. (6번 문제)
        // 하지만 얘는 n개의 경우를 세야하므로 ....
        // DFS를 n번 불러와야한다.
      }
    }
    DFS(0);
    return answer;
  }
  //console.log(solution(3, 2));
}
