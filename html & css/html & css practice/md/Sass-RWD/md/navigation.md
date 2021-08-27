# Navigation

## HTML

```html
<!-- .button-burger에 is-active이면 .menu에도 is-active가 적용되어야 함-->
<nav class="appNavigation menu">
  <h2 class="a11yHidden">메인 메뉴</h2>
  <ul class="menu__list">
    <li class="menu__item">
      <a href="#" class="menu__link">HTML에 대해</a>
    </li>
    <li class="menu__item">
      <a href="#" class="menu__link">CSS에 대해</a>
    </li>
    <li class="menu__item">
      <a href="#" class="menu__link">웹표준/웹접근성</a>
    </li>
    <li class="menu__item">
      <a href="#" class="menu__link">묻고 답하기</a>
    </li>
    <li class="menu__item">
      <a href="#" class="menu__link">자료실</a>
    </li>
  </ul>
</nav>
```

---

## CSS 구조

### 모바일

![](./img/nav-mobile.png)

### 데스크탑

![](./img/nav-desk.png)

---

## CSS - \_navigation.scss

- focus-visible-only
  https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible

- border는 상자크기에 영향을 주므로, box-shadow를 이용하자.

```scss
// _header.scss
@use './../utils/' as *;
@use './../components/' as *;

.appHeader {
  // 모바일
  @include mobile {
    // 버튼 배치를 위해
    position: relative;
    // _flexbox.scss
    @include flexbox(column);
    background: $darkbrown;
    // 컨테이너에 양옆 패딩 처리
    padding: 0 rem(20px);
  }

  // 데스크탑
  @include desktop {
    // _mixin.scss
    @include boxSizeMax($paddingX: 20px);

    // 그리드로 배치
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: rem(60px) rem(60px);
    grid-template-areas:
      "logo member"
      "logo search";
  }

  // 로고
  .logo {
    // 데스크탑
    @include desktop {
      grid-area: logo;
    }

    &__link {
      $w: rem(204px);
      $h: rem(59px);
      // a 태그
      display: block;
      width: $w;
      height: $h;
      @include bgRetina("webcafe-logo", "png", $w, $h);
    }
  }

  // 멤버링크
  .memberOnly {
    // 공통영역
    @include flexbox(row, flex-end);
    padding: rem(16px) 0;
    // background-color: pink;

    // 모바일
    @include mobile {
      order: -1;
      color: $white;
      font-size: rem(14px);
    }

    // 데스크탑
    @include desktop {
      grid-area: member;
    }

    // 독립된 컴퍼넌트
    .divider {
      margin: 0 rem(8px);
    }

    // a태그 - line-block 트릭. 링크 클릭하기 용이하게...
    a {
      display: inline-block;
      padding: rem(8px) 0;
      // background-color: purple;
    }
  }

  // 검색
  .searchForm {
    // background-color: pink;

    // 컨테이너 박스
    &__group {
      // 공통부분
      @include flexbox(row, flex-start, center);

      // 입력창
      .formInput {
        flex-grow: 1;
        // _form.scss에서 formInput 재활용.

        // focus-visible only
        // https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible
        &__input:focus-visible {
          outline: 0;
          // border: 10px solid red;
          // 보더는 상자크기에 영향을 주므로, box-shadow를 이용하자.
        }
      }

      // 버튼
      // _button.scss
      .button--primary {
        // 레이아웃 배치는 헤더영역에서.
        // 버튼 자체를 꾸미는건 컴포넌트에서.!
        margin-left: rem(8px);
      }

      // 모바일
      @include mobile {
        padding: rem(16rem) 0;
      }
    }
    // 데스크탑
    @include desktop {
      grid-area: search;
    }
  }

  // 버튼
  .button--burger {
    @include mobile {
      width: rem(36px);
      height: rem(36px);
      position: absolute;
      top: rem(56px);
      right: rem(20px);
      // X로 만들 때 가운데는 안보이게 만듬.
      overflow: hidden;

      &BarTop,
      &BarMiddle,
      &BarBottom {
        transition: all 0.25s;
      }
    }
    @include desktop {
      display: none;
    }
  }

  // 버튼 버거 X로
  .is-active {
    .button--burgerBarTop {
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    }

    .button--burgerBarMiddle {
      transform: translate(-100%, -50%);
    }

    .button--burgerBarBottom {
      top: 50%;
      transform: translateY(-50%) rotate(-45deg);
    }
  }
}
```
