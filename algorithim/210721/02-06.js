// 6. 멘토링
// 현수네 반 선생님은 반 학생들의 수학점수를 향상시키기 위해 멘토링 시스템을 만들려고 합니다.
// 멘토링은 멘토(도와주는 학생)와 멘티(도움을 받는 학생)가 한 짝이 되어 멘토가 멘티의수학공부를 도와주는 것입니다.
// 선생님은 M번의 수학테스트 등수를 가지고 멘토와 멘티를 정합니다.
// 만약 A학생이 멘토이고, B학생이 멘티가 되는 짝이 되었다면, A학생은 M번의 수학테스트에서 모두 B학생보다 등수가 앞서야 합니다.
// M번의 수학성적이 주어지면 멘토와 멘티가 되는 짝을 만들 수 있는 경우가 총 몇 가지 인지 출력하는 프로그램을 작성하세요.

// 나보다 뒤에있는 학생을 count => [1번학생, 2번학생, 3번학생, 4번학생, ..., N번 학생]
// M 번의 테스트를 거친 결과, 위에서 count된 값이 M이 된 학생이 나의 멘티가 될 수 있음

function solution(nums) {
  let result = 0;
  const M = nums.length; // M 번의 테스트
  const N = nums[0].length; // N 명의 학생

  for (let me = 1; me <= N; me++) {
    let cnt = Array.from({ length: N }, () => 0); // 길이는 N, 값은 0인 배열 생성

    for (let i = 0; i < M; i++) {
      // M번의 테스트 결과, cnt === M인 학생이 항상 나의 뒤에 있었으므로 멘티가 될 수 있음
      let indexMe = nums[i].indexOf(me); // 나의 등수
      for (let j = indexMe + 1; j < N; j++) {
        // 나보다 뒤에 있는 학생만 선택
        cnt[nums[i][j] - 1] += 1; // cnt 증가시킴
      }
    }
    // 멘티 될 학생수 만큼, 멘토링 짝이 생성됨
    result += cnt.filter((c) => c === M).length;
  }
  return result;
}
console.log(
  solution([
    [3, 4, 1, 2],
    [4, 3, 2, 1],
    [3, 1, 4, 2],
  ])
);