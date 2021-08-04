// 1. 동전교환 => 그리디
// 그리디 : 정렬 한번 하면 이후에 쭉 처리한다. o(n*logn)
// 현재 상황에서 가장 좋은 것을 선택해 가는 것.
// 다음과 같이 여러 단위의 동전들이 주어져 있을때 거스름돈을 가장 적은 수의 동전으로 교환
// 해주려면 어떻게 주면 되는가? 각 단위의 동전은 무한정 쓸 수 있다.
/*
- 입력
매개변수 nums에 N(2<=N<=50)개의 동전의 종류가 주어진다. 매개변수 m에 거슬러 줄 금액
M(1<=M<=500,000)이 주어진다. 각 단위의 동전이 A1<A2<...Ai<An 이라면 A1은 항상 1원짜
리이고, Ai는 A(i-1) 동전의 배수입니다. 동전의 종류는 오름차순으로 주어집니다.

- 출력
첫 번째 줄에 거슬러 줄 동전의 최소개수를 출력한다.
*/

{
  function solution(nums, m) {
    let n = nums.length;
    let cnt = 0;

    for (let i = 0; i < n; i++) {
      cnt += parseInt(m / nums[n - i - 1]); // 몫
      m = m % nums[n - i - 1]; // 나
    }
    return cnt;
  }
  // console.log(solution([1, 5, 10], 15)); // 2
}