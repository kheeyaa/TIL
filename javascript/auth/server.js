const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const users = require('./fake-data/users');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

/*
로그인 여부 체크 미들웨어
1. 로그인 사용자인 경우, 메인 페이지로 이동
2. 미로그인 사용자인 경우, 로그인 페이지로 이동
*/
const auth = (req, res, next) => {
  // 토큰이 리퀘스트의 Authorization 헤더를 통해 전달되면 req.headers.authorization으로 전달받고
  // 토큰이 쿠키를 통해 전달되면 req.cookies.accessToken으로 전달받는다.
  const accessToken = req.headers.authorization || req.cookies.accessToken;

  try {
    // 서명이 유효하고 옵션인 expiration, audience, issuer 등이 유효한 경우 디코딩된 페이로드를 반환한다. 그렇지 않으면 에러가 발생한다.
    // https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    console.log(`😀 사용자 인증 성공`, decoded);
    next();
  } catch (e) {
    console.error('😱 사용자 인증 실패..', e);
    // 클라이언트로부터 토큰이 전달되지 않아 accessToken이 undefined이거나 토큰이 유효하지 않으면
    return res.redirect('/auth/signin');
  }
};

// auth route
app.get('/auth/signin', (req, res) => {
  res.sendFile(path.join(__dirname, './public/auth.html'));
});

app.post('/auth/signin', (req, res) => {
  const { userid, password } = req.body;

  // 401 Unauthorized
  if (!userid || !password)
    return res.status(401).send({ error: '사용자 아이디 또는 패스워드가 전달되지 않았습니다.' });

  const user = users.findUser(userid, password);
  console.log('사용자 정보:', user);

  // 401 Unauthorized
  if (!user) return res.status(401).send({ error: '등록되지 않은 사용자입니다.' });

  // 토큰 생성
  const accessToken = jwt.sign({ userid }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });

  // 쿠키에 토큰 설정(http://expressjs.com/ko/api.html#res.cookie)
  res.cookie('accessToken', accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
    httpOnly: true,
  });

  // 로그인 성공
  res.send({ userid, username: user.name });
});

// root route
// 미들웨어 auth를 사용해 로그인 여부를 체크한다.
app.get('/', auth, (req, res) => {
  res.sendFile(path.join(__dirname, './public/main.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
