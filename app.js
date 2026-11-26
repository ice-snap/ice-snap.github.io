/* ═══════════════════════════════════════════════════════════════
   ICE SNAP — app.js
   1) 헤더 상태   2) 모바일 메뉴   3) 등장 애니메이션
   4) 포트폴리오 필터   5) 라이트박스   6) 문의 문장 생성·복사   7) 배경음악
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ── 1. 헤더 ─────────────────────────────────────────────── */
  const header = $('#header');
  const setHeader = () => {
    if (!header) return;
    header.classList.toggle('is-solid', window.scrollY > 60);
  };
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  /* ── 2. 모바일 메뉴 ──────────────────────────────────────── */
  const drawer = $('#drawer');
  const menuBtn = $('#menuBtn');
  const drawerClose = $('#drawerClose');

  const openDrawer = () => {
    if (!drawer) return;
    drawer.hidden = false;
    document.body.classList.add('is-locked');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    const first = drawer.querySelector('a');
    if (first) first.focus({ preventScroll: true });
  };
  const closeDrawer = () => {
    if (!drawer || drawer.hidden) return;
    drawer.hidden = true;
    document.body.classList.remove('is-locked');
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.focus({ preventScroll: true });
    }
  };
  if (menuBtn) menuBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawer) {
    $$('a', drawer).forEach((a) => a.addEventListener('click', closeDrawer));
  }

  /* ── 3. 등장 애니메이션 ──────────────────────────────────── */
  const revealEls = $$('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  /* ── 4. 포트폴리오 필터 ──────────────────────────────────── */
  const gallery = $('#gallery');
  const shots = gallery ? $$('.shot', gallery) : [];
  const filters = $$('.filter');

  const applyFilter = (key) => {
    shots.forEach((shot) => {
      const match = key === 'all' || shot.dataset.cat === key;
      shot.classList.toggle('is-hidden', !match);
    });
    filters.forEach((btn) => {
      const on = btn.dataset.filter === key;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  };

  filters.forEach((btn) => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter || 'all'));
  });

  // 분류별 개수를 DOM에서 세어 필터 숫자를 맞춘다 (사진을 추가하면 숫자가 자동 갱신)
  const counts = { all: shots.length };
  shots.forEach((shot) => {
    const key = shot.dataset.cat || 'etc';
    counts[key] = (counts[key] || 0) + 1;
  });
  filters.forEach((btn) => {
    const key = btn.dataset.filter || 'all';
    const num = btn.querySelector('span');
    if (num && counts[key] != null) num.textContent = String(counts[key]);
  });
  const countAll = $('#countAll');
  if (countAll) countAll.textContent = String(counts.all);

  /* ── 5. 라이트박스 ──────────────────────────────────────── */
  const lb = $('#lightbox');
  const lbImg = $('#lbImg');
  const lbCounter = $('#lbCounter');
  const lbPrev = $('#lbPrev');
  const lbNext = $('#lbNext');
  const lbClose = $('#lbClose');
  let lbList = [];
  let lbIndex = 0;
  let lastFocus = null;

  const visibleShots = () => shots.filter((s) => !s.classList.contains('is-hidden'));

  const renderLightbox = () => {
    const shot = lbList[lbIndex];
    if (!shot || !lbImg) return;
    const img = $('img', shot);
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || '';
    lbCounter.textContent = `${lbIndex + 1} / ${lbList.length}`;

    // 다음 사진 미리 불러오기
    const nextShot = lbList[(lbIndex + 1) % lbList.length];
    if (nextShot) {
      const ni = new Image();
      ni.src = $('img', nextShot).src;
    }
  };

  const openLightbox = (shot) => {
    lbList = visibleShots();
    lbIndex = Math.max(0, lbList.indexOf(shot));
    lastFocus = document.activeElement;
    if (!lb) return;
    lb.hidden = false;
    document.body.classList.add('is-locked');
    renderLightbox();
    if (lbClose) lbClose.focus({ preventScroll: true });
  };

  const closeLightbox = () => {
    if (!lb || lb.hidden) return;
    lb.hidden = true;
    document.body.classList.remove('is-locked');
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  };

  const step = (dir) => {
    if (!lbList.length) return;
    lbIndex = (lbIndex + dir + lbList.length) % lbList.length;
    renderLightbox();
  };

  shots.forEach((shot) => {
    const btn = $('.shot__btn', shot);
    if (btn) btn.addEventListener('click', () => openLightbox(shot));
  });
  if (lbPrev) lbPrev.addEventListener('click', () => step(-1));
  if (lbNext) lbNext.addEventListener('click', () => step(1));
  if (lbClose) lbClose.addEventListener('click', closeLightbox);

  let touchX = null;
  if (lb) {
    lb.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 44) step(dx > 0 ? -1 : 1);
      touchX = null;
    }, { passive: true });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lb && !lb.hidden) closeLightbox();
      else closeDrawer();
      return;
    }
    if (lb && !lb.hidden) {
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      if (e.key === 'Tab') {
        const focusables = [lbClose, lbPrev, lbNext].filter(Boolean);
        const i = focusables.indexOf(document.activeElement);
        e.preventDefault();
        const next = e.shiftKey ? (i - 1 + focusables.length) % focusables.length : (i + 1) % focusables.length;
        focusables[next].focus();
      }
    }
  });

  /* ── 6. 문의 문장 생성 ──────────────────────────────────── */
  const form = $('#inquiryForm');
  const previewBody = $('#previewBody');
  const dmLink = $('#dmLink');
  const toastEl = $('#toast');

  const val = (id) => {
    const el = document.getElementById(id);
    return el ? String(el.value || '').trim() : '';
  };

  const getDmTarget = () => {
    const type = val('f-type');
    // ICE Ⅰ — 돌(서브)스냅 → 돌스냅 전용 계정, ICE Ⅱ — 스튜디오 · 야외스냅 → 서브 계정
    if (type.indexOf('돌') !== -1) return { handle: '@ice__snap.bebe', url: 'https://ig.me/m/ice__snap.bebe' };
    if (type.indexOf('Ⅱ') !== -1) return { handle: '@ice__snap.studio', url: 'https://ig.me/m/ice__snap.studio' };
    return { handle: '@ice__snap', url: 'https://ig.me/m/ice__snap' };
  };

  const formatDate = (v) => {
    if (!v) return '';
    const d = new Date(v + 'T00:00:00');
    if (isNaN(d)) return v;
    const weekday = new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(d);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${weekday})`;
  };

  const buildMessage = () => {
    const lines = ['안녕하세요, 아이스스냅에 촬영 문의드립니다.', ''];
    const name = val('f-name');
    const type = val('f-type');
    const date = formatDate(val('f-date'));
    const place = val('f-place');
    const note = val('f-note');

    if (name) lines.push(`· 성함 : ${name}`);
    if (type) lines.push(`· 촬영 구분 : ${type}`);
    lines.push(`· 희망 일시 : ${date || '조정 가능'}`);
    lines.push(`· 예식장 · 장소 : ${place || '미정'}`);
    if (note) lines.push(`· 참고사항 : ${note}`);
    lines.push('', '가능한 일정과 진행 방식 안내 부탁드립니다.', '감사합니다.');
    return lines.join('\n');
  };

  const updatePreview = () => {
    if (previewBody) previewBody.textContent = buildMessage();
    if (dmLink) {
      const target = getDmTarget();
      dmLink.href = target.url;
      dmLink.textContent = `${target.handle} DM 열기`;
    }
  };

  if (form) {
    form.addEventListener('input', updatePreview);
    form.addEventListener('change', updatePreview);
    updatePreview();
  }

  const toast = (msg) => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toastEl.classList.remove('is-on'), 2600);
  };

  const copyText = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      throw new Error('no clipboard api');
    } catch (err) {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
      } catch (err2) {
        return false;
      }
    }
  };

  const copyAction = async (msg) => {
    const ok = await copyText(buildMessage());
    toast(ok ? msg : '복사가 되지 않았습니다. 미리보기 문장을 길게 눌러 복사해 주세요.');
    return ok;
  };

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const target = getDmTarget();
      const ok = await copyText(buildMessage());
      toast(ok ? `문의 내용을 복사했어요. ${target.handle} DM에 붙여넣어 주세요.` : '복사가 되지 않았습니다. 미리보기 문장을 길게 눌러 복사해 주세요.');
      window.open(target.url, '_blank', 'noopener');
    });
  }

  const copyOnly = $('#copyOnly');
  if (copyOnly) {
    copyOnly.addEventListener('click', () => copyAction('문의 내용을 복사했어요.'));
  }

  /* 카카오톡 오픈채팅 문의: 문의 문장을 복사하고 오픈채팅방을 연다 */
  const KAKAO_URL = 'https://open.kakao.com/o/syJFXEwg';
  const copyAndKakao = $('#copyAndKakao');
  if (copyAndKakao) {
    copyAndKakao.addEventListener('click', () => {
      // 팝업 차단을 피하려고 새 탭을 먼저 연다 (복사는 바로 이어서 실행)
      window.open(KAKAO_URL, '_blank', 'noopener');
      copyText(buildMessage()).then((ok) => {
        toast(
          ok
            ? '문의 내용을 복사했어요. 카카오톡 오픈채팅에 붙여넣어 주세요.'
            : '복사가 되지 않았습니다. 미리보기 문장을 길게 눌러 복사해 주세요.'
        );
      });
    });
  }

  /* ── 7. 배경음악 ──────────────────────────────────────── */
  // 페이지에 들어오면 바로 재생을 시도하고, 브라우저가 자동 재생을 막으면
  // (아이폰 Safari · 인스타그램·카카오톡 인앱 브라우저 등) 방문자의 첫 터치·클릭·키 입력에서 시작한다.
  const bgm = $('#bgmAudio');
  const bgmBtn = $('#bgmBtn');
  const bgmLabel = $('#bgmLabel');
  if (bgm && bgmBtn) {
    bgm.loop = true;
    bgm.volume = 0.35; // 은은하게

    let userPaused = false; // 방문자가 직접 음악을 껐는가
    let unlocked = false;   // 브라우저가 소리 재생을 허용했는가

    const UNLOCK_EVENTS = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown'];

    const setBgmState = (playing) => {
      bgmBtn.classList.toggle('is-playing', playing);
      bgmBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
      bgmBtn.setAttribute('aria-label', playing ? '배경음악 끄기' : '배경음악 재생');
      if (bgmLabel) bgmLabel.textContent = playing ? '♪ BGM · ON' : '♪ BGM';
    };

    let addUnlockListeners; // 아래에서 정의

    const removeUnlockListeners = () => {
      UNLOCK_EVENTS.forEach((type) => document.removeEventListener(type, onFirstInteraction, true));
    };

    const markUnlocked = () => {
      unlocked = true;
      if (addUnlockListeners) removeUnlockListeners();
    };

    // 첫 터치/클릭/키 입력 → 자동 시작
    const onFirstInteraction = (e) => {
      if (userPaused || unlocked) {
        removeUnlockListeners();
        return;
      }
      // ♪ BGM 버튼은 자기 클릭 핸들러가 처리한다 (두 번 재생되지 않도록 여기서는 건너뜀)
      if (bgmBtn.contains(e.target)) return;

      const p = bgm.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          markUnlocked();
          setBgmState(true);
        }).catch(() => {
          // 아직 제스처가 인정되지 않은 경우 — 다음 입력에서 다시 시도한다
        });
      } else {
        markUnlocked();
        setBgmState(true);
      }
    };

    addUnlockListeners = () => {
      UNLOCK_EVENTS.forEach((type) => document.addEventListener(type, onFirstInteraction, true));
    };

    // 페이지 진입 즉시 자동 재생 시도
    const tryAutoplay = () => {
      if (userPaused || unlocked || !bgm.paused) return;
      const p = bgm.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          markUnlocked();
          setBgmState(true);
        }).catch(() => {
          // 자동 재생 차단 → 첫 터치를 기다린다
          setBgmState(false);
          addUnlockListeners();
        });
      } else {
        markUnlocked();
        setBgmState(true);
      }
    };

    bgmBtn.addEventListener('click', () => {
      markUnlocked(); // 버튼 클릭 자체가 사용자 제스처
      if (!bgm.paused) {
        userPaused = true;
        bgm.pause();
        setBgmState(false);
        return;
      }
      userPaused = false;
      const p = bgm.play();
      if (p && typeof p.then === 'function') {
        p.then(() => setBgmState(true)).catch(() => {
          setBgmState(false);
          toast('브라우저가 재생을 막았어요. 버튼을 한 번 더 눌러 주세요.');
        });
      } else {
        setBgmState(true);
      }
    });

    bgm.addEventListener('play', () => {
      markUnlocked();
      setBgmState(true);
    });
    bgm.addEventListener('pause', () => setBgmState(false));

    // autoplay 속성으로 이미 재생이 시작됐을 수 있으니 실제 상태에서 출발한다
    setBgmState(!bgm.paused);
    if (!bgm.paused) markUnlocked();

    if (document.readyState === 'complete') {
      tryAutoplay();
    } else {
      window.addEventListener('load', tryAutoplay, { once: true });
    }
  }

  /* ── 기타 ──────────────────────────────────────────────── */
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  // 같은 페이지 안 앵커로 이동할 때 헤더 높이만큼 여백 주기
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 62;
      window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
    });
  });
})();
