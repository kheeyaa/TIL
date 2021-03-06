// 2. 졸업 선물
// 선생님은 올해 졸업하는 반 학생들에게 졸업선물을 주려고 합니다.
// 학생들에게 인터넷 쇼핑몰에서 각자 원하는 상품을 골라 그 상품의 가격과 배송비를 제출하라 고 했습니다.
// 선생님이 가지고 있는 예산은 한정되어 있습니다.
// 현재 예산으로 최대 몇 명의 학생에게 선물을 사줄 수 있는지 구하는 프로그램을 작성하세요.
// 선생님은 상품 하나를 50% 할인해서(반 가격) 살 수 있는 쿠폰을 가지고 있습니다. 배송비는 할인에 포함되지 않습니다.

// - 선물 가격이 합이 작은 것 부터 나열한다.
// - 첫번째 선물 부터 할인 쿠폰을 사용하고, 맨 처음 작은 것들을 더해나간다. 예산(m)을 넘으면 중지하고 물건의 갯수를 적는다.
// - 그 다음엔 두번째 선물을 할인 쿠폰을 사용하고, 위를 반복한다.
// - 마지막 선물까지 위를 반복한다.
// - 가장 큰 갯수를 반환한다.

// Sol)
// 전부 다 해본다.
{
  function solution(product, m) {
    let answer = 0;
    let n = product.length;
    // 음수가 되었을 때 바꿈.
    product.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));

    for (let i = 0; i < n; i++) {
      let money = m - (product[i][0] / 2 + product[i][1]);
      let cnt = 1;
      for (let j = 0; j < n; j++) {
        if (j !== i && product[j][0] + product[j][1] > money) break;
        if (j !== i && product[j][0] + product[j][1] <= money) {
          money -= product[j][0] + product[j][1];
          cnt += 1;
        }
      }
      answer = Math.max(answer, cnt);
    }

    return answer;
  }
  console.log(
    solution(
      [
        [6, 6],
        [2, 2],
        [4, 3],
        [4, 5],
        [10, 3],
      ],
      28
    )
  );
  console.log(
    solution(
      [
        [8, 6],
        [2, 2],
        [4, 3],
        [4, 5],
        [6, 4],
      ],
      27
    )
  );
  console.log(
    solution(
      [
        [8, 6],
        [2, 2],
        [4, 3],
        [4, 5],
        [12, 1],
      ],
      41
    )
  );
}

// MySol)
{
  function solution(nums, m) {
    const N = nums.length;
    let result = 0;

    // 선물 가격과 배송비 합을 기준으로 오름차순 정렬
    nums.sort(function (a, b) {
      return a[0] + a[1] - (b[0] + b[1]);
    });

    for (let i = 0; i < N; i++) {
      let sum = nums[i][0] / 2 + nums[i][1]; // 할인 받은 선물
      let cnt = 1;

      for (let j = 0; j < N; j++) {
        if (i !== j) {
          // 나머지 선물들의 합
          sum += nums[j][0] + nums[j][1];
          cnt += 1;
        } else {
          // 자기 자신일 경우 pass
          continue;
        }
        if (sum === m) {
          // 예산과 같은 경우
          result = result < cnt ? cnt : result;
          break;
        } else if (sum > m) {
          // 예산을 넘긴 경우
          result = result < cnt - 1 ? cnt - 1 : result;
          break;
        }
      }
    }
    return result;
  }
  console.log(
    solution(
      [
        [6, 6],
        [2, 2],
        [4, 3],
        [4, 5],
        [10, 3],
      ],
      28
    )
  );
  console.log(
    solution(
      [
        [8, 6],
        [2, 2],
        [4, 3],
        [4, 5],
        [6, 4],
      ],
      27
    )
  );
  console.log(
    solution(
      [
        [8, 6],
        [2, 2],
        [4, 3],
        [4, 5],
        [12, 1],
      ],
      41
    )
  );
}
