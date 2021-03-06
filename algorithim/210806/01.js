// 1. 동전 바꿔주기(냅색알고리즘)
// 명보네 동네 가게의 현금 출납기에는 k가지 동전이 각각n1, n2, ... , nk개 씩 들어있다.
// 가게 주인은 명보에게 T원의 지폐를 동전으로 바꿔 주려고한다. 이때, 동전 교환 방법은 여러
// 가지가 있을 수 있다.예를 들어, 10원 짜리, 5원 짜리, 1원 짜리 동전이 각각2개, 3개, 5개씩
// 있을 때, 20원 짜리 지폐를 다음과 같은4가지 방법으로 교환할 수 있다.
// 20 = 10×2
// 20 = 10×1+5×2
// 20 = 10×1+5×1+1×5
// 20 = 5×3+1×5
// 입력으로 지폐의 금액 T, 동전의 가지수 k, 각 동전 하나의 금액 pi와 개수 ni가 주어질 때
// (i=1,2,...,k)
// 지폐를 동전으로 교환하는 방법의 가지 수를 계산하는프로그램을 작성하시오. 방법의 수는 2
// 31
// 을 초과하지않는 것으로 가정한다.

// ▣ 입력설명
// 매개변수 t에 지폐의 금액 T(0<T≤10,000), 매개변수 coins에 k(0<k≤10)개의 동전 종류의 정
// 보가 주어진다. coins의 순서쌍은 동전의금액 pi(0<pi≤T)와 개수 ni(0<ni≤10)이다.
// ▣ 출력설명
// 동전 교환 방법의 가지 수를 반환한다.(교환할 수 없는 경우는 존재하지 않는다.)
// ▣ 입력예제 1
// 20, [[5, 3], [10, 2], [1, 5]]
// ▣ 출력예제 1
// 4
{
  function solution(t, coins) {
    let answer = 0;
    let dy = Array.from({ length: t + 1 }, () => 0);
    dy[0] = 1;

    for (let [p, n] of coins) {
      // 동전 선택
      for (let j = t; j >= 1; j--) {
        // 전체 금액 20, 19, 18, ...
        for (let k = 1; k <= n; k++) {
          // 동전의 갯수만큼 반복
          if (j - p * k < 0) break;
          dy[j] += dy[j - p * k];
        }
      }
    }
    answer = dy[t];
    return answer;
  }
  //   console.log(
  //     solution(20, [
  //       [5, 3],
  //       [10, 2],
  //       [1, 5],
  //     ])
  //   ); // 4
}
