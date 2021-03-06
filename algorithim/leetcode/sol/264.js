// 264. Ugly Number II
// https://leetcode.com/problems/ugly-number-ii/

{
  var nthUglyNumber = function (n) {
    const factors = [2, 3, 5];
    const offset = [0, 0, 0];
    const ugly = [1];
    let cnt = n;

    while ((cnt -= 1)) {
      const candidates = factors.map((val, i) => ugly[offset[i]] * val);
      const next = Math.min(...candidates);
      offset.forEach((val, i) => {
        candidates[i] === next ? offset[i]++ : null;
      });
      ugly.push(next);
    }
    return ugly.pop();
  };
  console.log(nthUglyNumber(10)); // 12
}

{
  var nthUglyNumber = function (n) {
    const factors = [2, 3, 5];
    const ugly = [1];
    let cnt = n;

    while ((cnt -= 1)) {}
  };
  console.log(nthUglyNumber(10)); // 12
}
