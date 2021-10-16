---
layout: post
title:
subtitle: <strong>String 연습 문제</strong>
category: ex
section: ex
seq: 1
subseq: 3
permalink: /:categories/:title
description:
---

- TOC
  {:toc}

# 1. 유효한 팰린드롬

문자열 s가 주어지면 영문자와 숫자만 고려하고 대소문자를 무시하여 회문인지 확인한다.

[leetcode: valid-palindrome](https://leetcode.com/problems/valid-palindrome)

```javascript
isPalindrome('A man, a plan, a canal: Panama'); // => true
isPalindrome('race a car'); // => false
```

<!--
// 48ms
const isPalindrome = s => {
  const temp = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return temp === [...temp].reverse().join('');
};

// 48ms: reverse().join('')과 속도면에서 별 차이가 없다.
// const isPalindrome = s => {
//   const temp = s.toLowerCase().replace(/[^a-z0-9]/gi, '');

//   let start = 0;
//   let end = temp.length - 1;

//   while (start < end) {
//     if (temp[start] !== temp[end]) return false;
//     start += 1;
//     end -= 1;
//   }

//   return true;
// };

// console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
// console.log(isPalindrome('race a car')); // false
-->

# 2. 신규 아이디 추천

[programmers > 2021 KAKAO BLIND RECRUITMENT > 신규 아이디 추천](https://programmers.co.kr/learn/courses/30/lessons/72410?language=javascript)

<!--
function solution(new_id) {
  const recommended = new_id
    .toLowerCase() // 1단계
    .replace(/[^\w-.]+/g, '') // 2단계
    .replace(/\.{2,}/g, '.') // 3단계
    .replace(/^\.|\.$/g, '') // 4단계
    .replace(/^$/g, 'a') // 5단계. ^$는 빈문자열에 매칭한다.
    .slice(0, 15)
    .replace(/\.$/g, ''); // 6단계

  // 7단계
  // const { length } = recommended;
  // // length가 1이면 2번, length가 2이면 1번 repeat
  // return length <= 2 ? recommended + recommended[length - 1].repeat(3 - length) : recommended;

  // recommended의 길이가 3이 될 때까지 recommended의 마지막 문자를 끝에 추가
  return recommended.padEnd(3, recommended[recommended.length - 1]);
}
-->

# 3. A를 #으로

대문자로 이루어진 영어 단어가 입력되면 단어에 포함된 ‘A'를 모두 ’#‘으로 바꾸어 출력하는 프로그램을 작성하세요.

```javascript
replaceAtoSharp('BANANA'); // => B#N#N#
```

<!--
// String#replaceAll => ECMAScript 2021(ES12)
const replaceAtoSharp = str => str.replaceAll('A', '#');

// const replace = str => str.replace(/A/g, '#');

// const replace = str => {
//   let res = '';
//   for (let i = 0; i < str.length; i++) {
//     // if (str[i] === 'A') res += '#';
//     // else res += str[i];

//     res += str[i] === 'A' ? '#' : str[i];
//   }
//   return res;
// };

// console.log(replace('BANANA')); // B#N#N#
-->

# 4. 대문자 찾기

한 개의 문자열을 입력받아 해당 문자열에 알파벳 대문자가 몇 개 있는지 알아내는 프로그램을 작성하세요.

```javascript
countUpperCase('KoreaTimeGood'); // => 3
```

<!--
const countUpperCase = str => str.match(/[A-Z]/g).length;

// const countUpperCase = str => [...str].filter(c => c === c.toUpperCase()).length;

// const countUpperCase = str => {
//   let res = 0;
//   for (let i = 0; i < str.length; i++) {
//     if (str[i] === str[i].toUpperCase()) res += 1;
//   }
//   return res;
// };

// console.log(countUpperCase('KoreaTimeGood')); // 3
-->

# 5. 문자 찾기

한 개의 문자열을 입력받고, 특정 문자를 입력받아 해당 특정문자가 입력받은 문자열에 몇 개 존재하는지 알아내는 프로그램을 작성하세요. 문자열의 길이는 100을 넘지 않습니다.

```javascript
count('COMPUTERPROGRAMMING', 'R'); // => 3
```

<!--
// String#match는 g 플래그가 지정되면 모든 매칭 결과를 배열로 반환한다.
// RegExp#exec는 문자열 내의 모든 패턴을 검색하는 g 플래그를 지정해도 첫 번째 매칭 결과만 반환한다.
const count = (str, target) => str.match(new RegExp(target, 'g')).length;

// const count = (str, target) => [...str].filter(c => c === target).length;

// const count = (str, target) => {
//   let res = 0;
//   for (let i = 0; i < str.length; i++) {
//     if (str[i] === target) res += 1;
//   }
//   return res;
// };

// console.log(count('COMPUTERPROGRAMMING', 'R')); // 3
-->

# 6. 대소문자 변환

대문자와 소문자가 같이 존재하는 문자열을 입력받아 대문자는 소문자로 소문자는 대문자로 변환하여 출력하는 프로그램을 작성하세요.

```javascript
toggleCase('StuDY'); // => 'sTUdy'
```

<!--
/**
 * 콜백함수의 매개변수 _, lowerCase, upperCase에는 다음과 같이 정규식에 의해 캡쳐된 문자열이 전달된다.
 *
 * 'StuDY' =>
 * ① S undefined S
 * ② tu tu undefined
 * ③ DY undefined DY
 */

const toggleCase = str =>
  str.replace(/([a-z]+)|([A-Z]+)/g, (_, lowerCase, upperCase) =>
    lowerCase ? lowerCase.toUpperCase() : upperCase.toLowerCase()
  );

// const toggleCase = str =>
//   [...str]
//     .map(c => {
//       const upperCase = c.toUpperCase();
//       const lowerCase = c.toLowerCase();

//       return c === upperCase ? lowerCase : upperCase;
//     })
//     .join('');

// const toggleCase = str => {
//   let res = '';

//   for (let i = 0; i < str.length; i++) {
//     const upperCase = str[i].toUpperCase();
//     const lowerCase = str[i].toLowerCase();

//     res += str[i] === upperCase ? lowerCase : upperCase;
//   }

//   return res;
// };
-->

# 7. 문자열 압축

같은 문자가 연속으로 반복되는 문자 뒤에 반복 횟수를 표기하는 방법으로 문자열을 압축하라. 단, 반복 횟수가 1이면 생략한다.

```javascript
compress('ABBCCCE'); // => AB2C3E
```

<!--
/**
 * \1은 이전에 일치한 그룹()을 의미한다. 따라서 정규표현식 /(.)\1+/g는 이전에 일치한 어떤 문자가 1번 이상 반복될 때 매칭한다.
 * String#replace의 콜백의 매개변수 match에는 KK, SSSSSSS가 순차적으로 전달된다.
 * See https://regexr.com/63hhf
 */
/** @type { (str: string) => string } */
// 50ms
const compress = str => str.replace(/(.)\1+/g, match => match[0] + match.length);

// 50ms
// const compress = str => {
//   let cnt = 1;
//   let res = '';

//   for (let i = 0; i < str.length; i++) {
//     // // 마지막 순회에 str[i + 1]은 언제나 undefined
//     if (str[i] === str[i + 1]) cnt += 1;
//     else {
//       res += str[i] + (cnt === 1 ? '' : cnt);
//       cnt = 1;
//     }
//   }

//   return res;
// };

console.log(compress('KKHSSSSSSSE')); // K2HS7E
console.log(compress('ABBCCCE')); // AB2C3E
-->
