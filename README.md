# 아이스스냅 · ICE SNAP

아이폰 웨딩 · 돌 · 스튜디오 · 야외 스냅의 미니멀 포트폴리오 사이트입니다.
빌드 도구 없이 `index.html` · `styles.css` · `app.js` · `images/` 만으로 동작하는 정적 사이트입니다.

> **바로 고치기 (제일 쉬운 방법)**
> 이 저장소가 GitHub Pages로 배포되어 **https://ice-snap.github.io/** 에서 열립니다.
> 문구를 바꾸고 싶으면 GitHub에서 `index.html` 을 열고 오른쪽 위 **연필 아이콘(Edit)** 을 눌러
> 고친 뒤 **Commit changes** 만 하면 됩니다. 1분 안에 사이트에 반영됩니다.
> 직접 수정 링크: https://github.com/ice-snap/ice-snap.github.io/edit/main/index.html
> 사진은 `images/` 폴더에 올리면 되고, 올린 뒤 `index.html` 의 갤러리(`#gallery`)에 `.shot` 한 줄을 추가하면 보입니다.

## 구성

```
ice-snap-site/
├── index.html              전체 페이지 (모든 문구는 여기서 수정)
├── styles.css              디자인 (색 · 타이포 · 간격)
├── app.js                  메뉴 · 필터 · 라이트박스 · 문의 문장 생성 · 카톡 오픈채팅 연결 · 배경음악 토글
├── favicon.svg / favicon.png  브라우저 탭 아이콘 (ICE 모노그램)
├── images/                 실제 촬영본 61장 (본식 17 · 야외 5 · 에디토리얼 11 · 스튜디오 8 · 돌스냅 20, 긴 변 1400px JPEG q84) + og-cover.jpg + ice-logo.png (로고, 투명 배경)
└── audio/bgm.mp3           배경음악 (4분, Smooth Jazz Cafe — Pixabay License, 상업적 사용 가능)
```

## 로컬에서 보기

`index.html` 을 브라우저로 열면 바로 보입니다.
(문의 문장 복사 기능은 `file://` 에서도 동작하지만, 브라우저에 따라 복사가 막히면
미리보기 문장을 길게 눌러 복사하면 됩니다.)

## 배포

- **GitHub Pages** — 이미 연결됨: `main` 브랜치 / root 배포 → https://ice-snap.github.io/
  (다시 설정해야 할 때는 저장소 Settings → Pages → Branch: `main` / root)
- **Netlify** — 폴더를 그대로 드래그 앤 드롭
- **Vercel** — `vercel` 로 폴더 배포 (프레임워크 없음 / 정적)

## 상품 구성 (ICE Ⅰ · ICE Ⅱ)

| 상품 | 구성 | 가격 | 예약금 |
| --- | --- | --- | --- |
| **ICE Ⅰ** | 웨딩(서브)스냅 · 돌(서브)스냅 · 스튜디오(서브)스냅 | 300,000원 | 150,000원 (50%) · 잔금 150,000원 |
| **ICE Ⅱ** | 스튜디오 · 야외스냅 | 500,000원 | 250,000원 (50%) · 잔금 250,000원 |

두 상품을 동시에 진행할 경우 가격은 별도 문의, 컷수·보정 일정·출장비는 상담 시 안내합니다.

## 수정할 곳 (HTML 주석 `<!-- EDIT: -->` 표시)

| 항목 | 위치 |
| --- | --- |
| 재오픈 상태 배지 | `index.html` 히어로 하단 `.hero__status`, About 안 `.badge` |
| 서비스 금액 · 예약금 · 컷수 · 보정 일정 | 각 카드의 `.card__price`(정가) · `.card__meta`(예약금·잔금). 지금은 ICE Ⅰ 300,000원 · ICE Ⅱ 500,000원 · 예약금 50% · 동시 진행은 별도 문의 |
| 포트폴리오 사진 순서 · 분류 | `#gallery` 안의 `.shot` (`data-cat="wedding｜dol"`) |
| 필터 개수 표시 | `.filter` 버튼 안 숫자, 히어로 아래 `#countAll` |
| 인스타그램 주소 | 헤더 · Contact · Footer 의 `instagram.com/ice__snap`, `ice__snap.studio`, `ice__snap.bebe` / Services 카드 하단 `.card__aside` (01 ICE Ⅰ → `@ice__snap`·`@ice__snap.bebe`, 02 ICE Ⅱ → `@ice__snap.studio`) |
| 카카오톡 오픈채팅 링크 | 드로어 · Process 01 · FAQ · Contact 링크 · 문의 폼 버튼 · Footer 의 `https://open.kakao.com/o/syJFXEwg` (링크가 바뀌면 `app.js` 의 `KAKAO_URL` 도 함께) |
| OG 공유 이미지 | `images/og-cover.jpg` 교체 |
| 로고 | `images/ice-logo.png` (헤더·푸터 공통, 투명 배경) · 탭 아이콘 `favicon.png` / `favicon.svg` |
| 배경음악 | `audio/bgm.mp3` 파일을 같은 이름으로 바꿔 넣으면 바로 교체됩니다 (`index.html` 의 `#bgmAudio`) |

## 사진 추가하기

1. 사진을 `images/` 에 넣고 긴 변 1400px 정도의 JPEG(q84)로 저장
2. `#gallery` 안에 `.shot` 하나를 복사해 `src` · `alt` · `data-cat` 수정 (사진 아래 제목·캡션은 표시하지 않습니다)
3. `.filter` 와 `#countAll` 의 숫자를 갱신

## 아직 확정되지 않은 항목 (자리표시)

- 금액은 반영 완료(ICE Ⅰ 300,000원, ICE Ⅱ 500,000원, 모두 예약금 50%, 동시 진행 시 가격 별도 문의).
- 촬영 시간, 컷수, 보정본 전달 일정 — 아직 미정이라 "상담 시 안내"로 표기
- 돌스냅 포트폴리오 사진 — 20장 수록 완료 (필터 탭 `Dol`). 추가 촬영본이 생기면 갤러리에 이어서 넣으면 됩니다.

## 배경음악

- 페이지에 들어오면 `audio/bgm.mp3` 자동 재생을 먼저 시도합니다. 브라우저가 소리 있는 자동 재생을 막으면(아이폰 Safari, 인스타그램·카카오톡 인앱 브라우저 등) 방문자가 화면을 처음 한 번 터치하거나 클릭하는 순간 시작됩니다.
- 오른쪽 아래 알약 버튼(`♪ BGM`, 재생 중에는 `♪ BGM · ON`)으로 언제든 끄고 켤 수 있습니다. 방문자가 직접 끈 뒤에는 다른 곳을 눌러도 저절로 다시 켜지지 않습니다.
- 곡을 바꾸려면 `audio/bgm.mp3` 를 같은 파일명으로 교체하면 됩니다. 기본 음량은 `app.js` 의 `bgm.volume` (0.35)에서 조절합니다.
- 배경음악을 없애려면 `index.html` 의 `<audio id="bgmAudio">` 와 `.bgm-btn` 버튼 블록을 지우면 됩니다 (다른 코드는 그대로 작동합니다).
- 사용한 곡: 「Smooth Jazz Cafe Session 1」 — sleepvolume, Pixabay Content License (상업적 이용 가능 · 저작자 표시 불필요).

## 참고

- 디자인 톤: 웜 아이보리(`#FAF9F7`) · 소프트 스톤(`#F4F2ED`) 바탕에 잉크색 글자, 1px 헤어라인, Cormorant Garamond 이탤릭 디스플레이, 알약형(999px) 버튼. 히어로 · Ceremony · 푸터까지 전 구간이 같은 톤을 쓰고, 어두운 화면은 사진을 크게 볼 때의 라이트박스에만 남겨 두었습니다.
- 폰트: Google Fonts (Cormorant Garamond · Noto Serif KR · Noto Sans KR) + 시스템 폰트 폴백
- 문의 양식은 서버로 전송되지 않습니다. 문장을 만들어 클립보드에 복사한 뒤 인스타그램 DM(`https://ig.me/m/ice__snap`)이나 카카오톡 오픈채팅(`https://open.kakao.com/o/syJFXEwg`)을 여는 방식입니다.
- 모든 사진은 아이스스냅의 실제 촬영본이며, 원본은 `attachments/2026-11-24/` 에 그대로 보관되어 있습니다.
- 사진에는 제목·캡션을 달지 않습니다. 사진만 깔끔하게 보이도록 히어로·Ceremony 띠·포트폴리오·라이트박스 어디에도 캡션이 없고, `alt`(화면 읽기용 설명)만 남겨 두었습니다.
- 갤러리 사진 수는 `app.js` 가 DOM에서 세어 필터 숫자를 자동으로 맞춥니다.

## 미리보기 이미지

`preview-hero.png` (데스크톱 1440×900) · `preview-band.png` (Ceremony) · `preview-portfolio.png` ·
`preview-services.png` · `preview-contact.png` · `preview-lightbox.png` · `preview-mobile.png` (390×844)
— 배포 파일에는 포함되지 않습니다.
