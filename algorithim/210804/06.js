// 6. 뮤직비디오(결정알고리즘)
// 지니레코드에서는 불세출의 가수 조영필의 라이브 동영상을 DVD로 만들어 판매하려 한다.
// DVD에는 총 N개의 곡이 들어가는데, DVD에 녹화할 때에는 라이브에서의 순서가 그대로 유지
// 되어야 한다. 순서가 바뀌는 것을 우리의 가수 조영필씨가 매우 싫어한다. 즉, 1번 노래와 5번
// 노래를 같은 DVD에 녹화하기 위해서는 1번과 5번 사이의 모든 노래도 같은 DVD에 녹화해야
// 한다. 또한 한 노래를 쪼개서 두 개의 DVD에 녹화하면 안된다.
// 지니레코드 입장에서는 이 DVD가 팔릴 것인지 확신할 수 없기 때문에 이 사업에 낭비되는
// DVD를 가급적 줄이려고 한다. 고민 끝에 지니레코드는 M개의 DVD에 모든 동영상을 녹화하기
// 로 하였다. 이 때 DVD의 크기(녹화 가능한 길이)를 최소로 하려고 한다. 그리고 M개의 DVD는
// 모두 같은 크기여야 제조원가가 적게 들기 때문에 꼭 같은 크기로 해야 한다.

// ▣ 입력설명
// 매개변수 nums에 N(1≤N≤1,000)개의 노래 길이가 분 단위로 주어집니다.
// 매개변수 m에 M(1≤M≤N)이 주어진다. 부른 곡의 길이는 10,000분을 넘지 않는다고 가정합니
// 다.
// ▣ 출력설명
// DVD의 최소 용량 크기를 반환하세요.
// ▣ 매개변수 형식 1
// [1, 2, 3, 4, 5, 6, 7, 8, 9], 3
// ▣ 반환값 형식 1
// 17
// 설명 : 3개의 DVD용량이 17분짜리이면 (1, 2, 3, 4, 5) (6, 7), (8, 9) 이렇게 3개의 DVD로 녹음을 할
// 수 있다. 17분 용량보다 작은 용량으로는 3개의 DVD에 모든 영상을 녹화할 수 없다.
// ▣ 매개변수 형식 2
// [6, 5, 8, 5, 6, 8, 7, 6, 6, 7], 3
// ▣ 반환값 형식 2
// 24

{
  function solution(nums, m) {
    let lt = Math.max(...nums);
    let rt = nums.reduce((acc, cur) => acc + cur, 0);
    let answer = Number.MAX_SAFE_INTEGER;

    function Cnt(x) {
      let sum = 0;
      let cnt = 1;
      for (let a of nums) {
        if (sum + a > x) {
          cnt += 1;
          sum = a;
        } else {
          sum += a;
        }
      }
      return cnt; // 필요한 디비디 장수
    }

    while (lt <= rt) {
      let mid = parseInt((lt + rt) / 2);

      if (Cnt(mid) <= m) {
        // 필요한 디비디 갯수가, 요구되는 디비디 갯수보다 작거나 같을 경우 !!
        answer = mid;
        rt = mid - 1;
      } else {
        lt = mid + 1;
      }
    }
    return answer;
  }
  // console.log(solution([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)); //17
}
