# 아이스스냅 · ICE SNAP

아이폰 본식 · 야외 · 돌스냅 스튜디오의 미니멀 포트폴리오 사이트입니다.
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
├── app.js                  메뉴 · 필터 · 라이트박스 · 문의 문장 생성 · 카톡 오픈채팅 연결
├── favicon.svg / favicon.png  브라우저 탭 아이콘 (ICE 모노그램)
├── images/                 실제 촬영본 53장 (본식 17 · 야외 5 · 에디토리얼 11 · 돌스냅 20, 긴 변 1400px JPEG q84) + og-cover.jpg + ice-logo.png (로고, 투명 배경)
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

## 수정할 곳 (HTML 주석 `<!-- EDIT: -->` 표시)

| 항목 | 위치 |
| --- | --- |
| 재오픈 상태 배지 | `index.html` 히어로 하단 `.hero__status`, About 안 `.badge` |
| 서비스 금액 · 컷수 · 보정 일정 | `.card__meta` (현재는 "재오픈 시 최종 안내" 자리표시) |
| 포트폴리오 사진 순서 · 캡션 · 분류 | `#gallery` 안의 `.shot` (`data-cat="ceremony｜outdoor｜editorial"`) |
| 필터 개수 표시 | `.filter` 버튼 안 숫자, 히어로 아래 `#countAll` |
| 인스타그램 주소 | 헤더 · Contact · Footer 의 `instagram.com/ice__snap`, `ice__snap.studio`, `ice__snap.bebe` |
| 카카오톡 오픈채팅 링크 | 드로어 · Process 01 · FAQ · Contact 링크 · 문의 폼 버튼 · Footer 의 `https://open.kakao.com/o/syJFXEwg` (링크가 바뀌면 `app.js` 의 `KAKAO_URL` 도 함께) |
| OG 공유 이미지 | `images/og-cover.jpg` 교체 |
| 로고 | `images/ice-logo.png` (헤더·푸터 공통, 투명 배경) · 탭 아이콘 `favicon.png` / `favicon.svg` |

## 사진 추가하기

1. 사진을 `images/` 에 넣고 긴 변 1400px 정도의 JPEG(q84)로 저장
2. `#gallery` 안에 `.shot` 하나를 복사해 `src` · `alt` · 캡션 · `data-cat` 수정
3. `.filter` 와 `#countAll` 의 숫자를 갱신

## 아직 확정되지 않은 항목 (자리표시)

- 금액, 촬영 시간, 컷수, 보정본 전달 일정 — 모두 "재오픈 시 최종 안내"로 표기
- 돌스냅 포트폴리오 사진 — 20장 수록 완료 (필터 탭 `Dol`). 추가 촬영본이 생기면 갤러리에 이어서 넣으면 됩니다.

## 참고

- 디자인 톤: 웜 아이보리(`#FAF9F7`) · 소프트 스톤(`#F4F2ED`) 바탕에 잉크색 글자, 1px 헤어라인, Cormorant Garamond 이탤릭 디스플레이, 알약형(999px) 버튼. 히어로 · Ceremony · 푸터까지 전 구간이 같은 톤을 쓰고, 어두운 화면은 사진을 크게 볼 때의 라이트박스에만 남겨 두었습니다.
- 폰트: Google Fonts (Cormorant Garamond · Noto Serif KR · Noto Sans KR) + 시스템 폰트 폴백
- 문의 양식은 서버로 전송되지 않습니다. 문장을 만들어 클립보드에 복사한 뒤 인스타그램 DM(`https://ig.me/m/ice__snap`)이나 카카오톡 오픈채팅(`https://open.kakao.com/o/syJFXEwg`)을 여는 방식입니다.
- 모든 사진은 아이스스냅의 실제 촬영본이며, 원본은 `attachments/2026-11-24/` 에 그대로 보관되어 있습니다.
- 갤러리 사진 수는 `app.js` 가 DOM에서 세어 필터 숫자를 자동으로 맞춥니다.

## 미리보기 이미지

`preview-hero.png` (데스크톱 1440×900) · `preview-band.png` (Ceremony) · `preview-portfolio.png` ·
`preview-services.png` · `preview-contact.png` · `preview-lightbox.png` · `preview-mobile.png` (390×844)
— 배포 파일에는 포함되지 않습니다.
