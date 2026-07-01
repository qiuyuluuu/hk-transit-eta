# 项目说明

## 主要用途

香港现有交通 app 更适合通用查询，但对“只集中看自己关心的几条通勤线路”支持不够直接。本项目是一个轻量 iPhone web app，用来集中查看白石角相关的九巴、绿色专线小巴和港铁换乘 ETA。

当前线路和站点主要服务开发者自己的日常通勤场景。它不是全港公交查询器；如果你的常用路线不同，可以按本文说明替换为自己的站点、路线和参数。

## 适用场景

- 上班：从白石角出发，查看往大学站、沙田方向的班次。
- 下班：乘东铁线回白石角时，比较在沙田站或大学站换乘哪边更快。
- iPhone Safari 添加到主屏幕后，作为一个轻量、固定线路的 ETA 面板使用。

## 当前主要功能

- 查询九巴 `272A` ETA。
- 查询绿色专线小巴 `27A`、`27B` ETA。
- 通过 Cloudflare Pages Function 代理小巴 API，绕过浏览器 CORS 限制。
- 上班“出门建议”：按预留乘车时间筛出最早可乘的两班。
- 下班“换乘推荐”：结合港铁到站、巴士/小巴 ETA 和站点换乘时间，按预计到家时间推荐沙田站或大学站。
- 港铁实时到站可用时优先使用实时数据；不可用时用东铁区间估算兜底。
- 27A 合并快车/慢车变体并标注。
- 27B 如果返回空 ETA，自动隐藏对应卡片。
- 页面按上班/下班滑块切换，适合手机快速扫一眼。

## 当前线路范围

当前实现围绕白石角、大学站、沙田站和东铁线通勤：

| 通勤场景 | 路线 | 主要站点 |
| --- | --- | --- |
| 上班 | 九巴 `272A` | 逸珑湾 `PA150`、云汇 `PA206` |
| 上班 | 小巴 `27A` | 逸珑湾 `PA150`、云汇 `PA206` |
| 上班 | 小巴 `27B` | 逸珑湾 `PA150`、云汇 `PA206` |
| 下班 | 九巴 `272A` | 大学站 `ST905` |
| 下班 | 小巴 `27A` | 沙田站 `排头街` |
| 下班 | 小巴 `27B` | 沙田站 `排头街`、大学站 `ST905` |

这些路线是个人关注线路。要改成自己的通勤线路，主要修改 `app.js` 内的路线配置和对应文档。

## 如何定制自己的线路

主要入口是 `app.js`：

- `commuteGroups`：配置上班/下班分组、路线、站点、显示名和方向。
- 九巴路线：配置 `route`、`stopId`、`serviceTypes` 和 `maxItems`。
- 小巴路线：配置 `routeId`、`routeSeq`、`stopSeq`、`stopId` 和页面标签。
- `transferStations`：配置下班换乘推荐比较的站点、换乘步行时间、到家车程估算和候选路线。
- `eastRailTravelMinutes`：配置港铁实时不可用时的东铁区间估算。

通常不需要修改 `functions/api/gmb/...`。它只是把同源请求转发到绿色专线小巴 API。

新增路线时建议流程：

1. 先在官方 API 或 `pak-shek-kok-transit-routes.json` 找到站点、站序和路线方向。
2. 在 `app.js` 加入或替换对应路线配置。
3. 同步更新 `docs/data-sources.md` 的站点映射。
4. 跑 `node --check app.js`。
5. 部署后验证页面和小巴代理接口。

## 主要可变变量与参数

这些参数会直接影响推荐结果，后续最好按实际通勤测量修正：

| 参数 | 当前值 | 位置 | 说明 |
| --- | --- | --- | --- |
| 上班出门预留乘车时间 | 5 分钟 | `departureBufferMinutes` | 从现在到能赶上车的缓冲时间。 |
| 沙田站换乘步行时间 | 4 分钟 | `transferStations.shaTin.walkMinutes` | 东铁到沙田后走到排头街小巴站的时间。 |
| 大学站换乘步行时间 | 3 分钟 | `transferStations.university.walkMinutes` | 东铁到大学后走到 ST905/小巴站的时间。 |
| 沙田站到家车程估算 | 16 分钟 | `transferStations.shaTin.homeTravelMinutes` | 从沙田站上车到白石角/逸珑湾一带的估算时间。 |
| 大学站到家车程估算 | 11 分钟 | `transferStations.university.homeTravelMinutes` | 从大学站上车到白石角/逸珑湾一带的估算时间。 |
| 大围到沙田东铁估算 | 3 分钟 | `eastRailTravelMinutes.taiWaiToShaTin` | 港铁实时不可用或实时结果过早时的下限校正。 |
| 沙田到大学东铁估算 | 7 分钟 | `eastRailTravelMinutes.shaTinToUniversity` | 比较继续坐到大学站再换乘时使用。 |
| ETA 去重窗口 | 90 秒 | `normalizeEta()` 内的 `90_000` | 合并官方 API 返回的重复班次。 |
| 每张路线卡显示班次数 | 3 班 | 各 route config 的 `maxItems` | 控制普通 ETA 卡片最多显示几班。 |
| 两站卡片窄屏断点 | 380px | `styles.css` | 小屏下把两站对比卡从并列改为上下排列。 |

其中最需要实测的是换乘步行时间和上车后到家车程。官方 `route-stop` 只提供站序，不提供同一班车到每个中途站的计划到达时间，所以 `homeTravelMinutes` 目前是经验估算，后续应按实测或长期 ETA 采样修正。

## 数据来源与限制

本项目依赖以下公开数据：

- 九巴开放数据 API：路线、站点和 ETA。
- 绿色专线小巴 API：路线、站点和 ETA。
- 港铁东铁线实时到站 API。

需要注意：

- 小巴 API 当前没有浏览器 CORS，需要走同源代理。
- 官方 ETA 可能临时为空、延迟或返回“原定班次”。
- 官方 `route-stop` 只给站序，不给站间分钟数。
- 下班推荐结果是辅助判断，不保证一定赶上车。

## 部署方式

当前部署使用 Cloudflare Pages：

- 生产分支：`master`
- 构建命令：留空
- 输出目录：`/`
- 线上地址：`<PRIVATE_DEPLOY_URL>/`

页面主体是静态文件；只有小巴 ETA 通过 `functions/api/gmb/...` 走 Cloudflare Pages Function 代理。

## 相关文档

- 当前上下文与交接：[current-context.md](current-context.md)
- 数据源、站点映射和参数：[data-sources.md](data-sources.md)
- 开发与验证流程：[development.md](development.md)
- 产品和技术决策：[decisions.md](decisions.md)
