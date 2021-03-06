// 5. 가방문제(냅색 알고리즘)
// 최고 11kg의 무게를 저장할 수 있는 가방이 있다. 그리고 각각 5kg, 3kg, 6kg, 4kg의 무게를
// 가진 4종류의 보석이 있다. 이 보석들의 가치는 각각 12, 8, 14, 7이다.
// 이 보석을 가방에 담는데 11kg를 넘지 않으면서 최대의 가치가 되도록 하려면 어떻게 담아야
// 할까요? 각 종류별 보석의 개수는 무한이 많다. 한 종류의 보석을 여러 번 가방에 담을 수 있
// 다는 뜻입니다.

// ▣ 입력설명
// 매개변수 nums에 각 보석의 무게와 가치가 순서쌍을 주어집니다. 매개변수 m에 가방에 저장
// 할 수 있는 무게가 주어집니다.
// 가방의 저장무게는 1000kg을 넘지 않는다. 보석의 개수는 30개 이내이다.
// ▣ 출력설명
// 가방에 담을 수 있는 보석의 최대가치를 출력한다.
// ▣ 입력예제 1
// [[5, 12], [3, 8], [6, 14], [4, 7]], 11
// [무게, 가치]. 최대무게
// ▣ 출력예제 1
// 28
// 해설 : 5g 1개, 3g 2개를 선택해서 28가치가 최대이다.

{
  function solution(nums, m) {
    const n = nums.length;
    const dy = Array.from({ length: m + 1 }, () => 0);

    for (const [weight, value] of nums) {
      for (let i = weight; i <= m; i++) {
        if (dy[i] < dy[i - weight] + value) dy[i] = dy[i - weight] + value;
      }
    }

    return dy[m];
  }
}

{
  function solution(nums, m) {
    let n = nums.length;
    let dy = Array.from({ length: m + 1 }, () => 0);
    // dy 가 필요함
    // dy[i] : i 무게 까지 가방에 담을 수 있을 때의 최대 가치, 0으로 초기화

    for (let x of nums) {
      for (let i = 0; i < m; i++) {
        for (let j = x[0]; j <= m; j++) {
          let tmp = dy[j - x[0]];
          if (tmp + x[1] > dy[j]) dy[j] = tmp + x[1];
        }
      }
    }
    return dy[m];
  }
  // console.log(
  //   solution(
  //     [
  //       [5, 12],
  //       [3, 8],
  //       [6, 14],
  //       [4, 7],
  //     ],
  //     11
  //   )
  // ); // 28
}
