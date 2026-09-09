/* ============================================================
   DMM FANZA Creators (demo) - app logic
   search / filter / sort / ranking / favorites / faq / modal
   ============================================================ */
(function () {
  "use strict";

  /* ---------- favorites (localStorage) ---------- */
  const FAV_KEY = "dfc_favs_v1";
  function getFavs() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY) || "[]"); }
    catch (e) { return []; }
  }
  function setFavs(list) {
    localStorage.setItem(FAV_KEY, JSON.stringify(list));
    syncFavButtons();
    const badge = document.querySelector("[data-fav-count]");
    if (badge) badge.textContent = list.length ? `お気に入り(${list.length})` : "お気に入り";
  }
  function isFav(id) { return getFavs().includes(id); }
  function toggleFav(id) {
    let list = getFavs();
    if (list.includes(id)) {
      list = list.filter((x) => x !== id);
      toast("お気に入りを解除しました");
    } else {
      list.push(id);
      toast("お気に入りに登録しました♡");
    }
    setFavs(list);
  }
  function syncFavButtons() {
    const list = getFavs();
    document.querySelectorAll("[data-fav-btn]").forEach((btn) => {
      const on = list.includes(btn.getAttribute("data-fav-btn"));
      btn.classList.toggle("on", on);
      const heart = on ? "♥" : "♡";
      btn.innerHTML = btn.classList.contains("btn-outline") ? `${heart} お気に入り` : heart;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  /* ---------- toast ---------- */
  let toastTimer = null;
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
  }

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function deltaHtml(c) {
    if (c.delta > 0) return `<span class="delta up">↑ 前回よりUP</span>`;
    if (c.delta < 0) return `<span class="delta down">↓ 前回よりDOWN</span>`;
    return `<span class="delta stay">― キープ</span>`;
  }
  function tagHtml(c) {
    return c.genres.concat(c.tags || [])
      .map((t, i) => `<span class="tag${i >= c.genres.length ? " hot" : ""}">${esc(t)}</span>`)
      .join("");
  }
  function photoHtml(c, cls) {
    const initial = esc(c.name.charAt(0));
    return `<div class="${cls}"><span class="avatar-ph">${initial}</span>` +
      `<img src="${creatorImage(c.id, c.rank)}" alt="${esc(c.name)}" loading="lazy" onerror="this.remove()">` +
      `</div>`;
  }

  /* ---------- card builders ---------- */
  function creatorCard(c) {
    return `<article class="creator-card">
      ${photoHtml(c, "cc-photo")}
      <button class="fav-btn${isFav(c.id) ? " on" : ""}" data-fav-btn="${c.id}" aria-label="お気に入り">${isFav(c.id) ? "♥" : "♡"}</button>
      <div class="cc-body">
        <h3>${esc(c.name)}</h3>
        <div class="cc-follow">👤 フォロワー ${fmtFollowers(c.followers)}</div>
        <div class="tags">${tagHtml(c)}</div>
        <a class="btn btn-outline" href="creator.html?id=${c.id}">プロフィールを見る ＞</a>
      </div>
    </article>`;
  }
  function rankItem(c, showFollow) {
    const rc = c.rank <= 3 ? ` r${c.rank}` : "";
    return `<article class="rank-item">
      <div class="rank-num${rc}">${c.rank}</div>
      ${photoHtml(c, "rank-photo")}
      <div>
        <h3>${esc(c.name)}</h3>
        <div class="tags">${tagHtml(c)}</div>
        <p class="catch">${esc(c.catch)}</p>
      </div>
      <div class="rank-meta">
        ${deltaHtml(c)}
        ${showFollow ? `<div class="follow-num">👤 ${c.followers.toLocaleString()}<small>${esc(c.growth || "")}</small></div>` : ""}
        <button class="fav-btn${isFav(c.id) ? " on" : ""}" style="position:static" data-fav-btn="${c.id}" aria-label="お気に入り">${isFav(c.id) ? "♥" : "♡"}</button>
        <a class="btn btn-outline" href="creator.html?id=${c.id}">プロフィールを見る ＞</a>
      </div>
    </article>`;
  }
  function listRow(c) {
    return `<article class="list-row">
      ${photoHtml(c, "rank-photo")}
      <div>
        <h3 style="margin:0">${esc(c.name)}</h3>
        <div class="tags">${tagHtml(c)}</div>
        <div class="cc-follow">👤 フォロワー ${fmtFollowers(c.followers)}</div>
        <p class="catch" style="font-size:12px;color:var(--muted);margin:2px 0 0">${esc(c.catch)}</p>
      </div>
      <a class="btn btn-outline" href="creator.html?id=${c.id}">プロフィールを見る ＞</a>
    </article>`;
  }

  /* ---------- global: drawer / modal / faq / fav clicks ---------- */
  function bindGlobal() {
    document.addEventListener("click", (e) => {
      const fav = e.target.closest("[data-fav-btn]");
      if (fav) { e.preventDefault(); toggleFav(fav.getAttribute("data-fav-btn")); return; }
      const open = e.target.closest("[data-open-login]");
      if (open) { document.getElementById("loginModal").classList.add("open"); return; }
      const close = e.target.closest("[data-close-login]");
      if (close) { document.getElementById("loginModal").classList.remove("open"); return; }
      const ham = e.target.closest("[data-open-drawer]");
      if (ham) { document.getElementById("drawer").classList.add("open"); return; }
      const dx = e.target.closest("[data-close-drawer]");
      if (dx) { document.getElementById("drawer").classList.remove("open"); return; }
      const q = e.target.closest(".faq-q");
      if (q) { q.closest(".faq").classList.toggle("open"); return; }
      const aff = e.target.closest("[data-aff]");
      if (aff) {
        e.preventDefault();
        window.open(aff.getAttribute("href") || AFFILIATE_DEFAULT, "_blank", "noopener");
        return;
      }
    });
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        document.getElementById("loginModal").classList.remove("open");
        toast("ログインしました（デモ）");
      });
    }
    // 検索バー → search.html へ
    document.querySelectorAll("[data-search-form]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.querySelector("input[type=text],input[type=search],input:not([type])");
        const kw = input ? input.value.trim() : "";
        location.href = "search.html" + (kw ? ("?kw=" + encodeURIComponent(kw)) : "");
      });
    });
    syncFavButtons();
  }

  /* ---------- page: home ---------- */
  function initHome() {
    const box = document.getElementById("homeRecommend");
    if (!box) return;
    box.innerHTML = CREATORS.slice(0, 5).map(creatorCard).join("");
    syncFavButtons();
  }

  /* ---------- page: ranking ---------- */
  function initRanking() {
    const list = document.getElementById("rankList");
    if (!list) return;
    const tabs = document.querySelectorAll("[data-genre-tab]");
    const updated = document.getElementById("rankUpdated");
    if (updated) {
      const d = new Date();
      updated.textContent = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")} 更新`;
    }
    function render(genre) {
      let arr = CREATORS.slice().sort((a, b) => a.rank - b.rank);
      if (genre && genre !== "総合") {
        if (genre === "新人") arr = arr.filter((c) => c.isNew);
        else if (genre === "女性") arr = arr.filter((c) => !c.genres.includes("配信者") || c.genres.includes("女優") || c.genres.includes("グラビア"));
        else arr = arr.filter((c) => c.genres.includes(genre) || (c.tags || []).includes(genre));
      }
      list.innerHTML = arr.length
        ? arr.map((c) => rankItem(c, true)).join("")
        : `<div class="empty">該当するクリエイターがいません。</div>`;
      syncFavButtons();
    }
    tabs.forEach((t) => t.addEventListener("click", () => {
      tabs.forEach((x) => x.classList.remove("on"));
      t.classList.add("on");
      render(t.getAttribute("data-genre-tab"));
    }));
    render("総合");

    // 急上昇
    const hot = document.getElementById("hotList");
    if (hot) {
      const arr = CREATORS.slice().sort((a, b) => b.delta - a.delta).slice(0, 5);
      hot.innerHTML = arr.map((c, i) => `
        <div class="mini-rank">
          <span class="n">${i + 1}</span>
          <img class="mp" src="${creatorImage(c.id, c.rank)}" alt="" loading="lazy" onerror="this.remove()">
          <div><b>${esc(c.name)}</b><small>↑ +${8 + (c.delta + 3) * 3}%</small></div>
          <span class="tag" style="margin-left:auto">${esc(c.genres[0])}</span>
        </div>`).join("");
    }
  }

  /* ---------- page: search ---------- */
  const PER_PAGE = 8;
  function initSearch() {
    const grid = document.getElementById("searchGrid");
    if (!grid) return;
    const params = new URLSearchParams(location.search);
    const kwInput = document.getElementById("searchKw");
    const sortSel = document.getElementById("sortSel");
    const countEl = document.getElementById("resultCount");
    const pager = document.getElementById("pager");
    const rows = document.getElementById("searchRows");
    let page = 1;

    if (kwInput && params.get("kw")) kwInput.value = params.get("kw");
    const genreParam = params.get("genre");
    if (genreParam) {
      document.querySelectorAll("[data-f-genre]").forEach((cb) => {
        cb.checked = cb.value === genreParam;
      });
      const all = document.querySelector('[data-f-genre][value="all"]');
      if (all) all.checked = false;
    }

    function currentGenres() {
      const checked = Array.from(document.querySelectorAll("[data-f-genre]:checked")).map((x) => x.value);
      if (!checked.length || checked.includes("all")) return [];
      return checked;
    }
    function currentPop() {
      const r = document.querySelector("[data-f-pop]:checked");
      return r ? r.value : "all";
    }
    function filtered() {
      const kw = (kwInput ? kwInput.value.trim() : "").toLowerCase();
      const gs = currentGenres();
      const pop = currentPop();
      let arr = CREATORS.slice();
      if (gs.length) {
        arr = arr.filter((c) => {
          if (gs.includes("新人") && c.isNew) return true;
          return gs.some((g) => c.genres.includes(g) || (c.tags || []).includes(g));
        });
      }
      if (pop === "rising") arr = arr.filter((c) => c.delta > 0);
      if (pop === "many") arr = arr.filter((c) => c.followers >= 300000);
      if (pop === "new") arr = arr.filter((c) => c.isNew);
      if (pop === "hot-new") arr = arr.filter((c) => c.isNew && c.delta >= 0);
      if (kw) {
        arr = arr.filter((c) =>
          (c.name + c.kana + c.genres.join(" ") + (c.tags || []).join(" ") + c.catch + c.profile)
            .toLowerCase().includes(kw)
        );
      }
      const sort = sortSel ? sortSel.value : "rank";
      if (sort === "followers") arr.sort((a, b) => b.followers - a.followers);
      else if (sort === "favs") arr.sort((a, b) => b.favs - a.favs);
      else if (sort === "name") arr.sort((a, b) => a.kana.localeCompare(b.kana, "ja"));
      else arr.sort((a, b) => a.rank - b.rank);
      return arr;
    }
    function render() {
      const arr = filtered();
      const totalPages = Math.max(1, Math.ceil(arr.length / PER_PAGE));
      if (page > totalPages) page = totalPages;
      const slice = arr.slice((page - 1) * PER_PAGE, page * PER_PAGE);
      if (countEl) countEl.innerHTML = `検索結果 <span>${arr.length}</span> 件`;
      if (matchMedia("(max-width:768px)").matches && rows) {
        grid.style.display = "none"; rows.style.display = "flex";
        rows.innerHTML = slice.length ? slice.map(listRow).join("") : `<div class="empty">条件に合うクリエイターがいません。</div>`;
      } else if (rows) {
        rows.style.display = "none"; grid.style.display = "grid";
        grid.innerHTML = slice.length ? slice.map(creatorCard).join("") : `<div class="empty" style="grid-column:1/-1">条件に合うクリエイターがいません。</div>`;
      } else {
        grid.innerHTML = slice.length ? slice.map(creatorCard).join("") : `<div class="empty" style="grid-column:1/-1">条件に合うクリエイターがいません。</div>`;
      }
      if (pager) {
        let html = "";
        for (let i = 1; i <= totalPages; i++) {
          if (totalPages > 7 && i > 5 && i < totalPages) {
            if (i === 6) html += `<span style="color:var(--muted)">…</span>`;
            continue;
          }
          html += `<button data-page="${i}" class="${i === page ? "on" : ""}">${i}</button>`;
        }
        if (totalPages > 1) html += `<button data-page="${Math.min(totalPages, page + 1)}">＞</button>`;
        pager.innerHTML = html;
      }
      syncFavButtons();
    }
    document.querySelectorAll("[data-f-genre],[data-f-pop]").forEach((el) =>
      el.addEventListener("change", () => {
        if (el.hasAttribute("data-f-genre")) {
          if (el.value === "all" && el.checked) {
            document.querySelectorAll('[data-f-genre]:not([value="all"])').forEach((x) => (x.checked = false));
          } else if (el.checked) {
            const all = document.querySelector('[data-f-genre][value="all"]');
            if (all) all.checked = false;
          }
        }
        page = 1; render();
      })
    );
    if (sortSel) sortSel.addEventListener("change", () => { page = 1; render(); });
    const form = document.getElementById("searchForm");
    if (form) form.addEventListener("submit", (e) => { e.preventDefault(); page = 1; render(); });
    const reset = document.getElementById("resetFilter");
    if (reset) reset.addEventListener("click", () => {
      document.querySelectorAll("[data-f-genre]").forEach((x) => (x.checked = x.value === "all"));
      document.querySelectorAll("[data-f-pop]").forEach((x) => (x.checked = x.value === "all"));
      if (kwInput) kwInput.value = "";
      if (sortSel) sortSel.value = "rank";
      page = 1; render();
    });
    if (pager) pager.addEventListener("click", (e) => {
      const b = e.target.closest("[data-page]");
      if (!b) return;
      page = parseInt(b.getAttribute("data-page"), 10);
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    // ジャンルチップ
    document.querySelectorAll("[data-genre-chip]").forEach((chip) =>
      chip.addEventListener("click", () => {
        const g = chip.getAttribute("data-genre-chip");
        document.querySelectorAll("[data-f-genre]").forEach((x) => (x.checked = x.value === g));
        const all = document.querySelector('[data-f-genre][value="all"]');
        if (all && g === "all") all.checked = true;
        page = 1; render();
      })
    );
    render();
  }

  /* ---------- page: creator detail ---------- */
  function initCreator() {
    const root = document.getElementById("creatorRoot");
    if (!root) return;
    const id = new URLSearchParams(location.search).get("id") || CREATORS[0].id;
    const c = CREATORS.find((x) => x.id === id) || CREATORS[0];

    document.title = `${c.name}｜プロフィール - DMM FANZA Creators`;
    document.getElementById("crumbName").textContent = c.name;
    document.getElementById("covPhoto").innerHTML =
      `<span class="avatar-ph" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:64px;font-weight:900;color:rgba(176,74,99,.5)">${esc(c.name.charAt(0))}</span>` +
      `<img src="${creatorImage(c.id, c.rank)}" alt="${esc(c.name)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" onerror="this.remove()">`;
    document.getElementById("cName").textContent = c.name;
    document.getElementById("cKana").textContent = c.kana;
    document.getElementById("cTags").innerHTML = tagHtml(c);
    document.getElementById("cDesc").textContent = c.profile;
    document.getElementById("cFollowers").textContent = c.followers.toLocaleString();
    document.getElementById("cFavs").textContent = c.favs.toLocaleString();
    document.getElementById("cFavBtn").setAttribute("data-fav-btn", c.id);
    document.getElementById("cProfileName").textContent = `${c.name} (${c.kana})`;
    document.getElementById("cProfileGenre").textContent = c.genres.join("・");
    document.getElementById("cProfileDebut").textContent = c.debut;
    document.getElementById("cProfileHobby").textContent = c.hobby;
    document.getElementById("cBirth").textContent = c.birth;
    document.getElementById("cBirthplace").textContent = c.birthplace;
    document.getElementById("cMessage").innerHTML =
      `<h4>${esc(c.name)}さんからのメッセージ</h4><p style="margin:0">${esc(c.message)}</p>`;
    document.getElementById("cWorks").innerHTML = c.works.map((w) => `
      <div class="work-card">
        <div class="work-photo">
          <span class="avatar-ph">${esc(c.name.charAt(0))}</span>
          <img src="${creatorImage(c.id, c.rank)}" alt="${esc(w.title)}" loading="lazy" onerror="this.remove()">
          <span class="work-badge">${esc(w.genre)}</span>
          <button class="fav-btn${isFav(c.id) ? " on" : ""}" data-fav-btn="${c.id}">♡</button>
        </div>
        <div class="wb"><b>${esc(w.title)}</b><small>♥ ${esc(w.likes)}</small></div>
      </div>`).join("");
    document.getElementById("cPoints").innerHTML = c.points.map((p) => `
      <div class="point"><div class="p-ico">${p.icon}</div><b>${esc(p.title)}</b><span>${esc(p.text)}</span></div>`).join("");
    document.getElementById("cFaqs").innerHTML = c.faqs.map((f) => `
      <div class="faq"><button class="faq-q" type="button"><span class="q">Q</span>${esc(f.q)}<span class="arr">▽</span></button>
      <div class="faq-a">${esc(f.a)}</div></div>`).join("");
    const related = CREATORS.filter((x) => x.id !== c.id && x.genres.some((g) => c.genres.includes(g)))
      .concat(CREATORS.filter((x) => x.id !== c.id)).slice(0, 4);
    document.getElementById("cRelated").innerHTML = related.map(creatorCard).join("");

    // タブのスクロール連動（簡易）
    const tabs = document.querySelectorAll(".detail-tabs a");
    tabs.forEach((t) => t.addEventListener("click", () => {
      tabs.forEach((x) => x.classList.remove("on"));
      t.classList.add("on");
    }));
    syncFavButtons();
  }

  /* ---------- page: favorites ---------- */
  function initFavorites() {
    const grid = document.getElementById("favGrid");
    if (!grid) return;
    function render() {
      const list = getFavs().map((id) => CREATORS.find((c) => c.id === id)).filter(Boolean);
      document.getElementById("favCount").innerHTML = `<span>${list.length}</span> 件`;
      grid.innerHTML = list.length
        ? list.map(creatorCard).join("")
        : `<div class="empty" style="grid-column:1/-1">まだお気に入りがありません。<br>気になるクリエイターの ♡ を押して登録してみましょう。<br><br><a class="btn btn-primary" href="ranking.html">人気ランキングを見る</a></div>`;
      syncFavButtons();
    }
    // このページでは解除したら即 re-render
    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-fav-btn]")) setTimeout(render, 50);
    });
    render();
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    bindGlobal();
    initHome();
    initRanking();
    initSearch();
    initCreator();
    initFavorites();
  });
})();
