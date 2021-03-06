// 메뉴 리뉴얼
// https://programmers.co.kr/learn/courses/30/lessons/72411

// 조합 DFS
{
  function solution(orders, course) {
    let answer = [];
    let menu = [],
      maxLength = 0;

    for (let x of orders) {
      for (let y of x) {
        if (!menu.includes(y)) menu.push(y);
      }
      if (maxLength < x.length) maxLength = x.length;
    }
    console.log(maxLength);

    for (let c of course) {
      if (maxLength < c) {
        break;
      }
      // 조합으로 course에 있는 애들 만들기
      let parts = [],
        temp = [];
      function DFS(n, L, s) {
        if (L === n) {
          if (temp.length === n) parts.push(temp.slice());
        } else {
          for (let i = s; i < menu.length; i++) {
            temp.push(menu[i]);
            DFS(n, L + 1, i + 1);
            temp.pop();
          }
        }
      }
      DFS(c, 0, 0);

      let sH = new Map();
      // 조합으로 만들어진 애들 중 가장 많이 주문된 애 찾기
      for (let part of parts) {
        for (let str of orders) {
          let flag = false; // p가 str에 들어있지 않은 경우 true
          for (let p of part) {
            if (!str.includes(p)) {
              flag = true;
              break;
            }
          }
          if (flag) {
            // part는 str에 들어있지 않았음.
          } else {
            sH.set(part.join(""), sH.get(part.join("")) + 1 || 1);
          }
        }
      }
      for (let [key, val] of sH) {
        if (val === 1) {
          sH.delete(key);
        }
      }
      if (sH.size === 0) break;
      let max = [...sH.entries()].reduce((a, b) => (a[1] > b[1] ? a : b))[1];

      answer.push(
        ...[...sH.entries()].filter((a) => a[1] === max).map((a) => a[0])
      );
    }

    return answer.map((a) => a.split("").sort().join("")).sort();
  }
  //   console.log(
  //     solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2, 3, 4])
  //   ); // ["AC", "ACDE", "BCFG", "CDE"]

  //   console.log(
  //     solution(["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"], [2, 3, 5])
  //   ); // ["ACD", "AD", "ADE", "CD", "XYZ"]

  //   console.log(solution(["XYZ", "XWY", "WXA"], [2, 3, 4])); // ["WX", "XY"]
}

{
  function solution(orders, course) {
    let answer = [];
    let menu = [],
      maxLength = 0;

    // menu배열에 orders에 있는 메뉴 종류들 담기
    for (let x of orders) {
      for (let y of x) {
        if (!menu.includes(y)) menu.push(y);
      }
      if (maxLength < x.length) maxLength = x.length;
    }

    for (let c of course) {
      if (maxLength < c) {
        break;
      }
      // 조합으로 course에 있는 애들 만들기
      let parts = [],
        temp = [];

      function DFS(n, L, s) {
        if (L === n) {
          if (temp.length === n) parts.push(temp.slice());
        } else {
          for (let i = s; i < menu.length; i++) {
            temp.push(menu[i]);
            DFS(n, L + 1, i + 1);
            temp.pop();
          }
        }
      }
      DFS(c, 0, 0);

      let sH = new Map();
      // 조합으로 만들어진 애들 중 가장 많이 주문된 애 찾기
      for (let part of parts) {
        for (let str of orders) {
          let flag = false; // p가 str에 들어있지 않은 경우 true
          for (let p of part) {
            if (!str.includes(p)) {
              flag = true;
              break;
            }
          }
          if (flag) {
            // part는 str에 들어있지 않았음.
          } else {
            sH.set(part.join(""), sH.get(part.join("")) + 1 || 1);
          }
        }
      }

      if (sH.size === 0) break;
      let arrayedSh = Array.from(sH).sort((a, b) => b[1] - a[1]);

      for (let k = 1; k < arrayedSh.length; k++) {
        if (arrayedSh[k - 1][1] === 1) {
          break;
          // 1명 주문한 메뉴이면 for문 탈출
        }
        answer.push(arrayedSh[k - 1][0]);
        if (arrayedSh[k - 1][1] !== arrayedSh[k][1]) {
          break;
          // k명 주문한 메뉴가 여러개 있지 않으면 for문 탈출
        }
      }
    }
    return answer.map((a) => a.split("").sort().join("")).sort();
  }
  //   console.log(
  //     solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2, 3, 4])
  //   ); // ["AC", "ACDE", "BCFG", "CDE"]

  //   console.log(
  //     solution(["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"], [2, 3, 5])
  //   ); // ["ACD", "AD", "ADE", "CD", "XYZ"]

  //   console.log(solution(["XYZ", "XWY", "WXA"], [2, 3, 4])); // ["WX", "XY"]
}
