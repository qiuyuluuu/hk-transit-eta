const commuteGroups = [
  {
    id: "workbound",
    title: "上班",
    subtitle: "往大学、沙田方向",
    routes: [
      {
        id: "kmb-272a-mayfair-pa150",
        provider: "kmb",
        operator: "KMB",
        operatorLabel: "九巴",
        route: "272A",
        stopId: "5747450359C7907C",
        stopLabel: "逸珑湾",
        stopCode: "PA150",
        directionLabel: "往大学站方向",
        serviceTypes: [1, 2, 3, 4],
        maxItems: 3,
      },
      {
        id: "kmb-272a-st-martin-pa206",
        provider: "kmb",
        operator: "KMB",
        operatorLabel: "九巴",
        route: "272A",
        stopId: "3F24CFF9046300D9",
        stopLabel: "云汇",
        stopCode: "PA206",
        directionLabel: "往大学站方向",
        serviceTypes: [1, 3, 4],
        maxItems: 3,
      },
      {
        id: "gmb-27a-mayfair-pa150",
        provider: "gmb",
        operator: "GMB",
        operatorLabel: "小巴",
        route: "27A",
        variants: [
          { routeId: 2007861, routeSeq: 1, stopSeq: 4, stopId: 20007310, variantLabel: "快车", variantClass: "fast" },
          { routeId: 2007862, routeSeq: 1, stopSeq: 4, stopId: 20007310, variantLabel: "快车", variantClass: "fast" },
          { routeId: 2007893, routeSeq: 1, stopSeq: 3, stopId: 20007310, variantLabel: "慢车", variantClass: "slow" },
          { routeId: 2007894, routeSeq: 1, stopSeq: 3, stopId: 20007310, variantLabel: "慢车", variantClass: "slow" },
        ],
        stopLabel: "逸珑湾",
        stopCode: "PA150",
        directionLabel: "往沙田方向",
        officialStopLabel: "科进路停车湾近DC2431灯柱",
        maxItems: 3,
      },
      {
        id: "gmb-27a-st-martin-pa206",
        provider: "gmb",
        operator: "GMB",
        operatorLabel: "小巴",
        route: "27A",
        variants: [
          { routeId: 2007861, routeSeq: 1, stopSeq: 5, stopId: 20007094, variantLabel: "快车", variantClass: "fast" },
          { routeId: 2007862, routeSeq: 1, stopSeq: 5, stopId: 20007094, variantLabel: "快车", variantClass: "fast" },
          { routeId: 2007893, routeSeq: 1, stopSeq: 6, stopId: 20015873, variantLabel: "慢车", variantClass: "slow" },
          { routeId: 2007894, routeSeq: 1, stopSeq: 6, stopId: 20015873, variantLabel: "慢车", variantClass: "slow" },
        ],
        stopLabel: "云汇",
        stopCode: "PA206",
        directionLabel: "往沙田方向",
        officialStopLabel: "创新路, 近云滙",
        maxItems: 3,
      },
    ],
  },
  {
    id: "homebound",
    title: "下班",
    subtitle: "往白石角方向",
    routes: [
      {
        id: "kmb-272a-university-st905",
        provider: "kmb",
        operator: "KMB",
        operatorLabel: "九巴",
        route: "272A",
        stopId: "9F542D4B6CF41651",
        stopLabel: "大学站",
        stopCode: "ST905",
        directionLabel: "往白石角方向",
        serviceTypes: [1, 2, 4],
        maxItems: 3,
      },
      {
        id: "gmb-27a-sha-tin-pai-tau",
        provider: "gmb",
        operator: "GMB",
        operatorLabel: "小巴",
        route: "27A",
        variants: [
          { routeId: 2007861, routeSeq: 2, stopSeq: 1, stopId: 20015839, variantLabel: "快车", variantClass: "fast" },
          { routeId: 2007862, routeSeq: 2, stopSeq: 1, stopId: 20015839, variantLabel: "快车", variantClass: "fast" },
          { routeId: 2007893, routeSeq: 2, stopSeq: 1, stopId: 20015880, variantLabel: "慢车", variantClass: "slow" },
          { routeId: 2007894, routeSeq: 2, stopSeq: 1, stopId: 20015880, variantLabel: "慢车", variantClass: "slow" },
        ],
        stopLabel: "沙田站",
        stopCode: "排头街",
        directionLabel: "往白石角方向",
        officialStopLabel: "沙田中, 排头街, 港铁沙田站外",
        maxItems: 3,
      },
    ],
  },
];

const routeConfigs = commuteGroups.flatMap((group) => group.routes);
const stopsRoot = document.querySelector("#stopsRoot");
const refreshButton = document.querySelector("#refreshButton");

function sortRoutesByStop(routes) {
  const stopOrder = [];

  for (const route of routes) {
    if (!stopOrder.includes(route.stopCode)) {
      stopOrder.push(route.stopCode);
    }
  }

  return routes
    .map((route, index) => ({
      route,
      index,
      stopRank: stopOrder.indexOf(route.stopCode),
    }))
    .sort((a, b) => a.stopRank - b.stopRank || a.index - b.index)
    .map((item) => item.route);
}

function createCommuteGroup(group) {
  const section = document.createElement("section");
  section.className = "commute-group";
  section.setAttribute("aria-labelledby", `${group.id}-title`);
  section.innerHTML = `
    <header class="group-heading">
      <p class="group-kicker">${group.title}</p>
      <h2 class="group-title" id="${group.id}-title">${group.subtitle}</h2>
    </header>
    <div class="stops-stack" data-group-stops></div>
  `;
  stopsRoot.appendChild(section);
  return section.querySelector("[data-group-stops]");
}

function createStopPanel(groupRoot, config) {
  const panel = document.createElement("section");
  panel.className = "stop-panel";
  panel.setAttribute("aria-labelledby", `${config.id}-title`);
  panel.dataset.stopId = config.id;
  panel.innerHTML = `
    <div class="route-heading">
      <div>
        <p class="stop-name">${config.stopLabel} <span class="stop-code">${config.stopCode}</span></p>
        <h2 class="route-title" id="${config.id}-title">${config.route} <span>${config.directionLabel}</span></h2>
      </div>
      <span class="operator">${config.operatorLabel}</span>
    </div>

    <div class="eta-list" data-eta-list>
      <div class="loading-row">正在更新...</div>
    </div>

    <div class="status-line">
      <span data-updated-at>等待更新</span>
      <span>官方 ETA</span>
    </div>
  `;
  groupRoot.appendChild(panel);
  return panel;
}

const panels = new Map();

for (const group of commuteGroups) {
  const groupRoot = createCommuteGroup(group);

  for (const config of sortRoutesByStop(group.routes)) {
    panels.set(config.id, createStopPanel(groupRoot, config));
  }
}

async function fetchServiceType(config, serviceType) {
  const url = `https://data.etabus.gov.hk/v1/transport/kmb/eta/${config.stopId}/${config.route}/${serviceType}`;
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`${config.route} ${config.stopCode} ETA ${serviceType} failed with ${response.status}`);
  }

  const payload = await response.json();
  return (payload.data || []).map((item) => ({ ...item, service_type: serviceType }));
}

async function fetchGmbEta(config) {
  const isHttpPage = window.location.protocol === "http:" || window.location.protocol === "https:";

  if (!isHttpPage) {
    const error = new Error("GMB ETA needs a same-origin proxy");
    error.userMessage = "小巴需部署后查看";
    throw error;
  }

  const variants =
    config.variants ||
    [
      {
        routeId: config.routeId,
        routeSeq: config.routeSeq,
        stopSeq: config.stopSeq,
        stopId: config.stopId,
      },
    ];
  const results = await Promise.allSettled(variants.map((variant) => fetchGmbVariant(config, variant)));
  const successful = results.flatMap((result) => (result.status === "fulfilled" ? result.value : []));

  if (successful.length === 0) {
    const failed = results.find((result) => result.status === "rejected");
    if (failed) {
      throw failed.reason;
    }
  }

  return successful;
}

async function fetchGmbVariant(config, variant) {
  const path = `/api/gmb/eta/route-stop/${variant.routeId}/${variant.routeSeq}/${variant.stopSeq}`;
  const url = path;
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`${config.route} ${config.stopCode} ETA ${variant.routeId} failed with ${response.status}`);
  }

  const payload = await response.json();
  const eta = payload.data?.eta || [];
  return eta.map((item) => ({
    route: config.route,
    eta_seq: item.eta_seq,
    eta: item.timestamp,
    diff: item.diff,
    rmk_sc: item.remarks_sc,
    rmk_tc: item.remarks_tc,
    rmk_en: item.remarks_en,
    stop_id: payload.data?.stop_id,
    route_id: variant.routeId,
    variantLabel: variant.variantLabel,
    variantClass: variant.variantClass,
  }));
}

function normalizeEta(config, items, now = new Date()) {
  const upcoming = items
    .filter((item) => item.eta)
    .map((item) => ({
      ...item,
      etaDate: new Date(item.eta),
    }))
    .filter((item) => Number.isFinite(item.etaDate.getTime()))
    .filter((item) => item.etaDate.getTime() >= now.getTime() - 60_000)
    .sort((a, b) => a.etaDate - b.etaDate);

  const unique = [];

  for (const item of upcoming) {
    const duplicate = unique.find((existing) => {
      const closeInTime = Math.abs(existing.etaDate - item.etaDate) < 90_000;
      return closeInTime && existing.route === item.route && existing.variantClass === item.variantClass;
    });

    if (!duplicate) {
      unique.push(item);
    }
  }

  return unique.slice(0, config.maxItems);
}

function formatMinutes(etaDate, now = new Date()) {
  const minutes = Math.max(0, Math.round((etaDate - now) / 60_000));
  if (minutes === 0) {
    return { value: "即将", unit: "到达" };
  }

  return { value: String(minutes), unit: "分钟" };
}

function formatClock(date) {
  return new Intl.DateTimeFormat("zh-Hans-HK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function renderEta(panel, items) {
  const etaList = panel.querySelector("[data-eta-list]");

  if (items.length === 0) {
    etaList.innerHTML = '<div class="empty-row">暂无到站时间</div>';
    return;
  }

  const now = new Date();
  etaList.replaceChildren(
    ...items.map((item) => {
      const row = document.createElement("article");
      const minutes = formatMinutes(item.etaDate, now);
      const remark = item.rmk_sc || item.rmk_tc || "";
      const variantClass = item.variantClass ? ` eta-row--${item.variantClass}` : "";
      const variantBadge = item.variantLabel
        ? `<span class="eta-badge eta-badge--${item.variantClass}">${item.variantLabel}</span>`
        : "";

      row.className = `eta-row${variantClass}`;
      row.innerHTML = `
        <div class="eta-minutes">${minutes.value}<small>${minutes.unit}</small></div>
        <div class="eta-time">
          <div class="eta-meta">
            <strong>${formatClock(item.etaDate)}</strong>
            ${variantBadge}
          </div>
          <span>${remark || "实时预计"}</span>
        </div>
      `;
      return row;
    })
  );
}

function renderError(panel, message = "更新失败，稍后再试") {
  const etaList = panel.querySelector("[data-eta-list]");
  etaList.innerHTML = `<div class="error-row">${message}</div>`;
}

async function refreshStop(config) {
  const panel = panels.get(config.id);
  const updatedAt = panel.querySelector("[data-updated-at]");
  try {
    const items =
      config.provider === "gmb"
        ? normalizeEta(config, await fetchGmbEta(config))
        : normalizeEta(config, (await Promise.all(config.serviceTypes.map((serviceType) => fetchServiceType(config, serviceType)))).flat());
    renderEta(panel, items);
    updatedAt.textContent = `更新于 ${formatClock(new Date())}`;
  } catch (error) {
    console.error(error);
    renderError(panel, error.userMessage);
    updatedAt.textContent = "更新失败";
  }
}

async function refreshEta() {
  refreshButton.classList.add("is-loading");
  refreshButton.disabled = true;

  try {
    await Promise.all(routeConfigs.map(refreshStop));
  } finally {
    refreshButton.classList.remove("is-loading");
    refreshButton.disabled = false;
  }
}

refreshButton.addEventListener("click", refreshEta);
refreshEta();
setInterval(refreshEta, 60_000);
