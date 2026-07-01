# 白石角公交到站查询

> 项目背景、定制方式和主要可调参数见 [项目说明](docs/project-overview.md)。

一个给 iPhone 使用的轻量公交 ETA 页面。九巴 ETA 可由浏览器直接调用；绿色专线小巴 ETA 需要同源代理，因为小巴接口没有开放浏览器跨域访问。

## 当前状态

已实现查询项：

| 分组 | 路线 | 站点 | 方向显示 | 数据源 |
| --- | --- | --- | --- | --- |
| 上班 / 往大学、沙田方向 | 九巴 272A | 逸珑湾 `PA150` | 往大学站方向 | 九巴 ETA API |
| 上班 / 往大学、沙田方向 | 九巴 272A | 云汇 `PA206` | 往大学站方向 | 九巴 ETA API |
| 上班 / 往大学、沙田方向 | 小巴 27A | 逸珑湾 `PA150` | 往沙田方向 | 小巴 ETA API |
| 上班 / 往大学、沙田方向 | 小巴 27B | 逸珑湾 `PA150` | 往沙田方向 | 小巴 ETA API |
| 上班 / 往大学、沙田方向 | 小巴 27A | 云汇 `PA206` | 往沙田方向 | 小巴 ETA API |
| 上班 / 往大学、沙田方向 | 小巴 27B | 云汇 `PA206` | 往沙田方向 | 小巴 ETA API |
| 下班 / 往白石角方向 | 九巴 272A | 大学站 `ST905` | 往白石角方向 | 九巴 ETA API |
| 下班 / 往白石角方向 | 小巴 27B | 大学站 `ST905` | 往白石角方向 | 小巴 ETA API |
| 下班 / 往白石角方向 | 小巴 27A | 沙田站 `排头街` | 往白石角方向 | 小巴 ETA API |
| 下班 / 往白石角方向 | 小巴 27B | 沙田站 `排头街` | 往白石角方向 | 小巴 ETA API |

当前页面会按通勤场景分组显示。每个站点合并同一时间的重复班次，只显示最近 3 班。九巴返回备注为空时，页面显示为“实时预计”；备注为“原定班次”时照实显示。

27A 往沙田和往白石角方向已合并多个 `route_id` 变体；页面不拆成多张卡片，而是在同一张站点卡的 ETA 旁标注 `快车` / `慢车`。

上班组包含“出门建议”。页面会在预留 5 分钟步行/候车时间的前提下，从上班组现有 ETA 中筛选最早能乘上的两班，显示建议出门时间、站点、路线和班次时间。

下班组包含换乘推荐。用户选择“已到大围站”或“已到沙田站”后，页面会结合港铁东铁线实时到站、大学站/沙田站的巴士与小巴 ETA，按预计到家时间推荐换乘站；主推荐显示为一行摘要，下方同时展示沙田站和大学站两套方案。当前默认沙田站预留 4 分钟、大学站预留 3 分钟，沙田站到家车程估算 16 分钟、大学站到家车程估算 11 分钟。港铁实时可用时标题栏显示绿色状态；港铁实时不可用时会按大围到沙田 3 分钟、沙田到大学 7 分钟估算并继续推荐。

## 文件结构

```text
.
├─ index.html                         # iPhone 页面入口
├─ app.js                             # ETA 查询、合并、渲染逻辑
├─ styles.css                         # 页面样式
├─ manifest.webmanifest               # 添加到主屏幕所需的 PWA 元信息
├─ assets/icons/                      # iPhone 主屏幕图标和 favicon 资源
├─ functions/                         # Cloudflare Pages Functions，小巴 API 代理
├─ pak-shek-kok-transit-notes.md       # 另一个对话整理的路线/站点备忘录
├─ pak-shek-kok-transit-routes.json    # 结构化路线/站点参考数据
└─ docs/
   ├─ project-overview.md              # 项目用途、定制方式和可调参数
   ├─ current-context.md               # 当前上下文与新对话交接入口
   ├─ data-sources.md                  # API 与数据规则
   ├─ development.md                   # 开发、验证、加路线流程
   └─ decisions.md                     # 已确认的产品/技术决定
```

## 本地查看

直接用浏览器打开 `index.html` 可以查看九巴 ETA。小巴 ETA 需要部署到支持 `functions/` 的平台后才可在浏览器正常显示。

推荐部署到 Cloudflare Pages。部署后页面会通过同源路径 `/api/gmb/eta/route-stop/...` 代理小巴 ETA。

## iPhone 使用方式

长期建议部署到 Cloudflare Pages。部署后在 iPhone Safari 打开网址，再选择“添加到主屏幕”。主屏幕图标使用 `assets/icons/apple-touch-icon.png`，来源图已裁掉外圈白边并同步生成 favicon 与 manifest 图标。

第一版不需要后端。只有在出现以下需求时再考虑 Cloudflare Worker 或其它服务端：

- 需要聚合多个营运商并隐藏复杂查询逻辑
- 需要缓存、限流、日志或告警
- 需要推送通知
- 需要避免客户端直接暴露所有配置

## 后续开发入口

- 了解项目用途、定制方式和主要参数：看 [docs/project-overview.md](docs/project-overview.md)
- 新对话继续开发：先看 [docs/current-context.md](docs/current-context.md)
- 新增路线/站点：看 [docs/development.md](docs/development.md)
- 核对接口和字段：看 [docs/data-sources.md](docs/data-sources.md)
- 理解为什么这样做：看 [docs/decisions.md](docs/decisions.md)

## 文档分工

当前实现以 `app.js` 为准；结构化配置说明以 [docs/data-sources.md](docs/data-sources.md) 为准；历史决策和取舍原因以 [docs/decisions.md](docs/decisions.md) 为准。

`pak-shek-kok-transit-notes.md` 和 `hk-transit-query-playbook.md` 是前期调研与踩坑备忘录，适合查路线背景、接口经验和站序线索。它们不是当前页面配置的权威来源，新增或修正路线时仍需回到官方 API 和 `docs/data-sources.md` 复核。
