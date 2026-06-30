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
        id: "gmb-27b-mayfair-pa150",
        provider: "gmb",
        operator: "GMB",
        operatorLabel: "小巴",
        route: "27B",
        routeId: 2007895,
        routeSeq: 1,
        stopSeq: 4,
        stopId: 20007310,
        variantLabel: "经大学站",
        variantClass: "via",
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
      {
        id: "gmb-27b-st-martin-pa206",
        provider: "gmb",
        operator: "GMB",
        operatorLabel: "小巴",
        route: "27B",
        routeId: 2007895,
        routeSeq: 1,
        stopSeq: 5,
        stopId: 20007094,
        variantLabel: "经大学站",
        variantClass: "via",
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
        id: "gmb-27b-university-st905",
        provider: "gmb",
        operator: "GMB",
        operatorLabel: "小巴",
        route: "27B",
        routeId: 2007895,
        routeSeq: 2,
        stopSeq: 2,
        stopId: 20002275,
        variantLabel: "经大学站",
        variantClass: "via",
        stopLabel: "大学站",
        stopCode: "ST905",
        directionLabel: "往白石角方向",
        officialStopLabel: "港铁大学站巴士总站",
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
      {
        id: "gmb-27b-sha-tin-pai-tau",
        provider: "gmb",
        operator: "GMB",
        operatorLabel: "小巴",
        route: "27B",
        routeId: 2007895,
        routeSeq: 2,
        stopSeq: 1,
        stopId: 20015839,
        variantLabel: "经大学站",
        variantClass: "via",
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
const lastUpdatedAt = document.querySelector("#lastUpdatedAt");
const viewSwitch = document.querySelector(".view-switch");
const viewSwitchButtons = [...document.querySelectorAll("[data-view]")];
const departureBufferMinutes = 5;
const eastRailTravelMinutes = {
  taiWaiToShaTin: 3,
  shaTinToUniversity: 7,
};
let departureAdvisorElements = null;
let activeCommuteView = "workbound";
let selectedTransferPosition = "at-tai-wai";
let transferAdvisorElements = null;
const latestEtaByRoute = new Map();

const transferPositions = [
  {
    id: "at-tai-wai",
    label: "已到大围站",
    arrivals: { shaTin: "mtr", university: "mtr" },
  },
  {
    id: "at-sha-tin",
    label: "已到沙田站",
    arrivals: { shaTin: "now", university: "mtr" },
  },
];

const transferStations = {
  shaTin: {
    label: "沙田站",
    mtrCode: "SHT",
    walkMinutes: 4,
    routeIds: ["gmb-27a-sha-tin-pai-tau", "gmb-27b-sha-tin-pai-tau"],
  },
  university: {
    label: "大学站",
    mtrCode: "UNI",
    walkMinutes: 3,
    routeIds: ["kmb-272a-university-st905", "gmb-27b-university-st905"],
  },
};

function createDepartureAdvisor(groupRoot) {
  const panel = document.createElement("section");
  panel.className = "transfer-advisor departure-advisor";
  panel.setAttribute("aria-labelledby", "departure-advisor-title");
  panel.innerHTML = `
    <header class="transfer-heading">
      <div>
        <p class="transfer-kicker departure-kicker" id="departure-advisor-title">
          出门建议
          <span>预留 ${departureBufferMinutes} 分钟乘车</span>
        </p>
      </div>
      <span class="transfer-rule">最快两班</span>
    </header>
    <div class="departure-result" data-departure-result>
      <div class="loading-row">正在计算...</div>
    </div>
  `;

  groupRoot.appendChild(panel);
  departureAdvisorElements = {
    panel,
    result: panel.querySelector("[data-departure-result]"),
  };
}

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

function getStopGroupKey(config) {
  return `${config.stopLabel}|${config.stopCode}`;
}

function createStopGroup(groupRoot, config) {
  const stopGroup = document.createElement("section");
  const stopGroupId = `${config.id}-stop`;
  stopGroup.className = "stop-group";
  stopGroup.setAttribute("aria-labelledby", stopGroupId);
  stopGroup.innerHTML = `
    <h3 class="stop-group-title" id="${stopGroupId}">
      <span>${config.stopLabel}</span>
      <b>${config.stopCode}</b>
    </h3>
    <div class="route-stack" data-route-stack></div>
  `;
  groupRoot.appendChild(stopGroup);
  return stopGroup.querySelector("[data-route-stack]");
}

function createTransferAdvisor(groupRoot) {
  const panel = document.createElement("section");
  panel.className = "transfer-advisor";
  panel.setAttribute("aria-label", "换乘推荐");
  panel.innerHTML = `
    <header class="transfer-heading">
      <div>
        <p class="transfer-kicker">换乘推荐</p>
      </div>
      <span class="transfer-rule">换乘 3-4 分钟</span>
    </header>
    <div class="position-control" role="group" aria-label="当前位置">
      ${transferPositions
        .map(
          (position) => `
            <button class="position-button" type="button" data-position="${position.id}" aria-pressed="${position.id === selectedTransferPosition}">
              ${position.label}
            </button>
          `
        )
        .join("")}
    </div>
    <div class="transfer-result" data-transfer-result>
      <div class="loading-row">正在计算...</div>
    </div>
  `;

  panel.querySelectorAll("[data-position]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedTransferPosition = button.dataset.position;
      updateTransferPositionButtons();
      refreshTransferRecommendation();
    });
  });

  groupRoot.appendChild(panel);
  transferAdvisorElements = {
    panel,
    result: panel.querySelector("[data-transfer-result]"),
    buttons: [...panel.querySelectorAll("[data-position]")],
  };
}

function updateTransferPositionButtons() {
  if (!transferAdvisorElements) {
    return;
  }

  for (const button of transferAdvisorElements.buttons) {
    const isSelected = button.dataset.position === selectedTransferPosition;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  }
}

function createCommuteGroup(group) {
  const section = document.createElement("section");
  section.className = "commute-group";
  section.dataset.commuteGroup = group.id;
  section.setAttribute("aria-label", group.title);
  section.innerHTML = `
    <div class="stops-stack" data-group-stops></div>
  `;
  stopsRoot.appendChild(section);
  return section.querySelector("[data-group-stops]");
}

function setActiveCommuteView(viewId) {
  activeCommuteView = viewId;
  viewSwitch.dataset.activeView = activeCommuteView;

  document.querySelectorAll("[data-commute-group]").forEach((section) => {
    const isActive = section.dataset.commuteGroup === activeCommuteView;
    section.classList.toggle("is-active", isActive);
    section.hidden = !isActive;
  });

  for (const button of viewSwitchButtons) {
    const isActive = button.dataset.view === activeCommuteView;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  }
}

function createStopPanel(groupRoot, config) {
  const panel = document.createElement("section");
  panel.className = "stop-panel";
  panel.setAttribute("aria-labelledby", `${config.id}-title`);
  panel.dataset.stopId = config.id;
  panel.innerHTML = `
    <div class="route-heading">
      <div>
        <h2 class="route-title" id="${config.id}-title">${config.route} <span>${config.directionLabel}</span></h2>
      </div>
      <span class="operator">${config.operatorLabel}</span>
    </div>

    <div class="eta-list" data-eta-list>
      <div class="loading-row">正在更新...</div>
    </div>
  `;
  groupRoot.appendChild(panel);
  return panel;
}

const panels = new Map();

for (const group of commuteGroups) {
  const groupRoot = createCommuteGroup(group);
  const stopGroups = new Map();

  if (group.id === "workbound") {
    createDepartureAdvisor(groupRoot);
  }

  if (group.id === "homebound") {
    createTransferAdvisor(groupRoot);
  }

  for (const config of sortRoutesByStop(group.routes)) {
    const stopKey = getStopGroupKey(config);
    if (!stopGroups.has(stopKey)) {
      stopGroups.set(stopKey, createStopGroup(groupRoot, config));
    }
    panels.set(config.id, createStopPanel(stopGroups.get(stopKey), config));
  }
}

setActiveCommuteView(activeCommuteView);

for (const button of viewSwitchButtons) {
  button.addEventListener("click", () => setActiveCommuteView(button.dataset.view));
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
        variantLabel: config.variantLabel,
        variantClass: config.variantClass,
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

async function fetchMtrNorthboundArrival(stationCode) {
  const url = `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=EAL&sta=${stationCode}`;
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`MTR ${stationCode} failed with ${response.status}`);
  }

  const payload = await response.json();
  const stationData = payload.data?.[`EAL-${stationCode}`];
  const trains = stationData?.UP || [];
  const now = new Date();
  const nextTrain = trains
    .filter((train) => train.valid === "Y" && train.time)
    .map((train) => ({
      ...train,
      arrivalDate: parseHongKongDateTime(train.time),
    }))
    .filter((train) => Number.isFinite(train.arrivalDate.getTime()))
    .filter((train) => train.arrivalDate.getTime() >= now.getTime() - 60_000)
    .sort((a, b) => a.arrivalDate - b.arrivalDate)[0];

  if (!nextTrain) {
    throw new Error(`No MTR ${stationCode} northbound train`);
  }

  return nextTrain.arrivalDate;
}

function parseHongKongDateTime(value) {
  return new Date(value.replace(" ", "T"));
}

async function getTransferArrivals() {
  const position = transferPositions.find((item) => item.id === selectedTransferPosition) || transferPositions[0];
  const entries = await Promise.all(
    Object.entries(position.arrivals).map(async ([stationKey, source]) => {
      if (source === "now") {
        return [stationKey, new Date()];
      }

      const station = transferStations[stationKey];
      return [stationKey, await fetchMtrNorthboundArrival(station.mtrCode)];
    })
  );

  const arrivals = Object.fromEntries(entries);
  const now = new Date();
  const addMinutes = (date, minutes) => new Date(date.getTime() + minutes * 60_000);

  if (selectedTransferPosition === "at-tai-wai" && arrivals.shaTin) {
    const earliestShaTin = addMinutes(now, eastRailTravelMinutes.taiWaiToShaTin);
    if (arrivals.shaTin.getTime() < earliestShaTin.getTime()) {
      arrivals.shaTin = earliestShaTin;
    }
  }

  if (arrivals.shaTin && arrivals.university) {
    const earliestUniversity = addMinutes(arrivals.shaTin, eastRailTravelMinutes.shaTinToUniversity);
    if (arrivals.university.getTime() < earliestUniversity.getTime()) {
      arrivals.university = earliestUniversity;
    }
  }

  if (selectedTransferPosition === "at-sha-tin" && arrivals.university) {
    const earliestUniversity = addMinutes(now, eastRailTravelMinutes.shaTinToUniversity);
    if (arrivals.university.getTime() < earliestUniversity.getTime()) {
      arrivals.university = earliestUniversity;
    }
  }

  return arrivals;
}

async function fetchTransferOptions(stationKey, arrivalDate) {
  const station = transferStations[stationKey];
  const readyAt = new Date(arrivalDate.getTime() + station.walkMinutes * 60_000);
  const configs = station.routeIds.map((routeId) => routeConfigs.find((config) => config.id === routeId)).filter(Boolean);
  const results = await Promise.allSettled(
    configs.map(async (config) => {
      const items =
        config.provider === "gmb"
          ? normalizeEta(config, await fetchGmbEta(config))
          : normalizeEta(config, (await Promise.all(config.serviceTypes.map((serviceType) => fetchServiceType(config, serviceType)))).flat());
      return items.map((item) => ({ config, item }));
    })
  );
  const options = results
    .flatMap((result) => (result.status === "fulfilled" ? result.value : []))
    .filter(({ item }) => item.etaDate.getTime() >= readyAt.getTime())
    .map(({ config, item }) => ({
      stationKey,
      stationLabel: station.label,
      walkMinutes: station.walkMinutes,
      config,
      item,
      arrivalDate,
      readyAt,
      waitMinutes: Math.max(0, Math.ceil((item.etaDate - readyAt) / 60_000)),
    }))
    .sort((a, b) => a.waitMinutes - b.waitMinutes || a.item.etaDate - b.item.etaDate);

  return {
    stationKey,
    stationLabel: station.label,
    walkMinutes: station.walkMinutes,
    arrivalDate,
    readyAt,
    best: options[0] || null,
  };
}

async function refreshTransferRecommendation() {
  if (!transferAdvisorElements) {
    return;
  }

  transferAdvisorElements.result.innerHTML = '<div class="loading-row">正在计算...</div>';

  try {
    const arrivals = await getTransferArrivals();
    const stationResults = await Promise.all(
      Object.entries(arrivals).map(([stationKey, arrivalDate]) => fetchTransferOptions(stationKey, arrivalDate))
    );
    const candidates = stationResults.filter((result) => result.best);

    if (candidates.length === 0) {
      renderTransferUnavailable(stationResults);
      return;
    }

    const recommended = candidates
      .map((result) => result.best)
      .sort((a, b) => a.waitMinutes - b.waitMinutes || a.item.etaDate - b.item.etaDate)[0];
    renderTransferRecommendation(recommended, stationResults);
  } catch (error) {
    console.error(error);
    transferAdvisorElements.result.innerHTML = '<div class="error-row">推荐暂不可用</div>';
  }
}

function renderTransferRecommendation(recommended, stationResults) {
  const alternatives = stationResults
    .map((result) => {
      if (!result.best) {
        return `<span>${result.stationLabel}：暂无合适班次</span>`;
      }

      return `<span>${result.stationLabel}：等 ${result.best.waitMinutes} 分钟</span>`;
    })
    .join("");
  const badge = recommended.item.variantLabel
    ? `<span class="eta-badge eta-badge--${recommended.item.variantClass}">${recommended.item.variantLabel}</span>`
    : "";

  transferAdvisorElements.result.innerHTML = `
    <div class="recommendation-main recommendation-main--split">
      <div class="recommendation-primary">
        <p class="recommendation-label recommendation-label--transfer">
          <span>推荐</span><strong>${recommended.stationLabel}</strong><span>下车</span>
        </p>
        <div class="recommendation-route">
          <strong>${recommended.config.route}</strong>
          ${badge}
          <span>${formatClock(recommended.item.etaDate)}</span>
        </div>
      </div>
      <div class="recommendation-context">
        <p class="recommendation-detail">
          ${formatClock(recommended.arrivalDate)} 到站，${formatClock(recommended.readyAt)} 后可换乘，预计等 ${recommended.waitMinutes} 分钟
        </p>
        <div class="recommendation-alternatives">${alternatives}</div>
      </div>
    </div>
  `;
}

function renderTransferUnavailable(stationResults) {
  const summary = stationResults.map((result) => `<span>${result.stationLabel}：暂无合适班次</span>`).join("");
  transferAdvisorElements.result.innerHTML = `
    <div class="recommendation-main recommendation-main--split">
      <div class="recommendation-primary">
        <p class="recommendation-label">暂无推荐</p>
      </div>
      <div class="recommendation-context">
        <p class="recommendation-detail">按各站换乘时间过滤后，暂时没有合适班次。</p>
        <div class="recommendation-alternatives">${summary}</div>
      </div>
    </div>
  `;
}

function setDepartureLoading() {
  if (!departureAdvisorElements) {
    return;
  }

  departureAdvisorElements.result.innerHTML = '<div class="loading-row">正在计算...</div>';
}

function refreshDepartureRecommendation() {
  if (!departureAdvisorElements) {
    return;
  }

  const group = commuteGroups.find((item) => item.id === "workbound");
  const now = new Date();
  const readyAt = new Date(now.getTime() + departureBufferMinutes * 60_000);
  const candidates = group.routes
    .flatMap((config) => {
      const items = latestEtaByRoute.get(config.id) || [];
      return items.map((item) => ({
        config,
        item,
        departureTime: new Date(item.etaDate.getTime() - departureBufferMinutes * 60_000),
      }));
    })
    .filter(({ item }) => item.etaDate.getTime() >= readyAt.getTime())
    .sort((a, b) => a.item.etaDate - b.item.etaDate || a.config.stopLabel.localeCompare(b.config.stopLabel, "zh-Hans-HK"))
    .slice(0, 2);

  if (candidates.length === 0) {
    departureAdvisorElements.result.innerHTML = `
      <div class="recommendation-main">
        <p class="recommendation-label">暂无可赶上的班次</p>
        <p class="recommendation-detail">按 ${departureBufferMinutes} 分钟乘车预留时间过滤后，暂时没有合适班次。</p>
      </div>
    `;
    return;
  }

  departureAdvisorElements.result.innerHTML = `
    <div class="departure-options">
      ${candidates.map((candidate, index) => renderDepartureOption(candidate, index)).join("")}
    </div>
  `;
}

function renderDepartureOption(candidate, index) {
  const { config, item, departureTime } = candidate;
  const title = index === 0 ? "最快方案" : "第二快方案";
  const remark = item.rmk_sc || item.rmk_tc || "实时预计";
  const badge = item.variantLabel
    ? `<span class="eta-badge eta-badge--${item.variantClass}">${item.variantLabel}</span>`
    : "";

  return `
    <article class="departure-option">
      <p class="recommendation-label">${title}</p>
      <div class="departure-option-plan">
        <strong class="departure-origin">${formatClock(departureTime)} 出门 ${config.stopLabel} ${config.stopCode}</strong>
        <p class="departure-boarding">
          <span>${formatClock(item.etaDate)} 乘坐 <strong>${config.route}</strong> ${badge}</span>
          <span>${remark}</span>
        </p>
      </div>
    </article>
  `;
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
  try {
    const items =
      config.provider === "gmb"
        ? normalizeEta(config, await fetchGmbEta(config))
        : normalizeEta(config, (await Promise.all(config.serviceTypes.map((serviceType) => fetchServiceType(config, serviceType)))).flat());
    latestEtaByRoute.set(config.id, items);
    panel.hidden = config.route === "27B" && items.length === 0;
    renderEta(panel, items);
  } catch (error) {
    console.error(error);
    latestEtaByRoute.set(config.id, []);
    panel.hidden = false;
    renderError(panel, error.userMessage);
  }
}

async function refreshEta() {
  refreshButton.classList.add("is-loading");
  refreshButton.disabled = true;
  lastUpdatedAt.textContent = "正在更新...";

  try {
    setDepartureLoading();
    latestEtaByRoute.clear();
    await Promise.all([...routeConfigs.map(refreshStop), refreshTransferRecommendation()]);
    refreshDepartureRecommendation();
    lastUpdatedAt.textContent = `更新于 ${formatClock(new Date())}`;
  } finally {
    refreshButton.classList.remove("is-loading");
    refreshButton.disabled = false;
  }
}

refreshButton.addEventListener("click", refreshEta);
refreshEta();
setInterval(refreshEta, 60_000);
