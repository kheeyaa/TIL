// 2.원더랜드(최소스패닝트리 : 크루스칼, Union&Find 활용)
// 원더랜드에 문제가 생겼다. 원더랜드의 각 도로를 유지보수하는 재정이 바닥난 것이다.
// 원더랜드는 모든 도시를 서로 연결하면서 최소의 유지비용이 들도록 도로를 선택하고 나머지
// 도로는 폐쇄하려고 한다.
// 아래의 그림은 그 한 예를 설명하는 그림이다.
// 위의 지도는 각 도시가 1부터 9로 표현되었고, 지도의 오른쪽은 최소비용 196으로 모든 도시
// 를 연결하는 방법을 찾아낸 것이다.

// ▣ 입력설명
// 매개변수 n에 도시의 개수 N(1≤N≤100)이 주어집니다.
// 매개변수 edges에 E(1≤E≤1,000) 개의 각 도로에 대한 정보를 나타내는 세 정수 A, B, C의
// 순서쌍 정보가 주어집니다. 이는 A번 도시와 B번 도시가 유지비용이 C인 도로로 연결되어 있
// 다는 의미이다.
// ▣ 출력설명
// 모든 도시를 연결하면서 드는 최소비용을 반환합니다.
// ▣ 매개변수 형식 1
// 9, [[1, 2, 12], [1, 9, 25], [2, 3, 10], [2, 8, 17], [2, 9, 8], [3, 4, 18], [3, 7, 55], [4,
// 5, 44], [5, 6, 60], [5, 7, 38], [7, 8, 35], [8, 9, 15]]
// ▣ 반환값 형식 1
// 196

// 트리는 회로가 존재하지 않는다
{
  function solution(n, edges) {
    let unf = Array.from({ length: n + 1 }, (v, i) => i);
    let m = edges.length;
    let answer = 0;

    // 집합 번호 찾아줌
    function Find(v) {
      if (v === unf[v]) return v;
      else return (unf[v] = Find(unf[v]));
    }

    // 다리 가격이 저렴한 순으로 sort
    edges.sort((a, b) => a[2] - b[2]);

    // 다리 길이만큼 돌면서 연결하기
    for (let [a, b, c] of edges) {
      let fa = Find(a);
      let fb = Find(b);
      if (fa !== fb) {
        // union 해주기
        answer += c;
        unf[fa] = fb;
      }
    }
    return answer;
  }
  // 196
  //   console.log(
  //     solution(9, [
  //       [1, 2, 12],
  //       [1, 9, 25],
  //       [2, 3, 10],
  //       [2, 8, 17],
  //       [2, 9, 8],
  //       [3, 4, 18],
  //       [3, 7, 55],
  //       [4, 5, 44],
  //       [5, 6, 60],
  //       [5, 7, 38],
  //       [7, 8, 35],
  //       [8, 9, 15],
  //     ])
  //   );
}