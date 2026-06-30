# 开发与维护流程

本文记录后续长期开发时的推荐流程。

## 当前技术形态

第一版是纯静态网页：

- `index.html`：页面结构
- `styles.css`：视觉样式
- `app.js`：查询、去重、渲染
- `manifest.webmanifest`：添加到 iPhone 主屏幕的元信息
- `functions/api/gmb/...`：绿色专线小巴 API 同源代理

没有构建步骤，没有外部依赖。小巴查询需要 Cloudflare Pages Functions 或等价同源代理。

Cloudflare Pages 当前部署方式：

- GitHub 仓库：`qiuyuluuu/hk-transit-eta`
- 生产分支：`master`
- 构建命令：留空
- 构建输出目录：`/`
- 线上地址：`<PRIVATE_DEPLOY_URL>/`

## 验证命令

检查 JavaScript 语法：

```powershell
& 'C:\Users\Qiuyu\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --check app.js
```

实时验证九巴 ETA：

```powershell
Invoke-RestMethod -Uri 'https://data.etabus.gov.hk/v1/transport/kmb/eta/5747450359C7907C/272A/1'
```

检查九巴接口是否允许浏览器跨域：

```powershell
curl.exe -s -D - 'https://data.etabus.gov.hk/v1/transport/kmb/eta/5747450359C7907C/272A/1' -o NUL
```

应看到：

```text
Access-Control-Allow-Origin: *
```

检查小巴接口响应头：

```powershell
curl.exe -s -D - 'https://data.etagmb.gov.hk/eta/route-stop/2007861/1/4' -o NUL
```

如果没有 `Access-Control-Allow-Origin`，浏览器直连会失败；需要通过 `/api/gmb/eta/route-stop/{route_id}/{route_seq}/{stop_seq}` 代理。

Cloudflare Pages Function 代理请求小巴 API 时必须带 `User-Agent`。上游由 CloudFront 提供服务；如果代理请求没有 `User-Agent`，会返回 `403 Request blocked`。

检查港铁东铁线到站：

```powershell
curl.exe -s -D - 'https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=EAL&sta=SHT'
curl.exe -s -D - 'https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=EAL&sta=UNI'
```

应看到 `Access-Control-Allow-Origin: *`，页面可直接从浏览器请求港铁 API。

部署后验证线上资源：

```powershell
curl.exe -s -o NUL -w 'PAGE %{http_code}' '<PRIVATE_DEPLOY_URL>/'
curl.exe -s -o NUL -w 'GMB_PROXY %{http_code}' '<PRIVATE_DEPLOY_URL>/api/gmb/eta/route-stop/2007861/2/1'
```

两项都应返回 `200`。如果刚推送后页面还没更新，等 Cloudflare Pages 自动部署完成后再重试。

## 新增一条九巴查询项

1. 确认用户要看的路线、站点和生活化方向名，例如“往大学站方向”。
2. 从 `pak-shek-kok-transit-routes.json` 或官方接口找 `stop_id`。
3. 调用路线站点接口确认该站在哪些 `service_type` 出现：

```text
https://data.etabus.gov.hk/v1/transport/kmb/route-stop/{route}/outbound/{service_type}
```

4. 对每个相关 `service_type` 调用 ETA 接口，观察是否有重复班次：

```text
https://data.etabus.gov.hk/v1/transport/kmb/eta/{stop_id}/{route}/{service_type}
```

5. 在配置里加入该查询项。
6. 如果多个 `service_type` 返回同一批车，按 ETA 时间窗口去重。
7. 在页面上用简体中文显示站名和方向，备注字段保留“实时预计/原定班次”的区别。
8. 跑 JS 语法检查，并用实时 API 抽查一遍。

## 新增一条小巴查询项

1. 确认路线代码，例如 `27A` 或 `27B`。
2. 调用：

```text
https://data.etagmb.gov.hk/route/NT/{route_code}
```

3. 选择正确的 `route_id` 和 `route_seq`。
4. 如果同一路线代码下有多个 `route_id`，先确认这些变体是否真对应同一个等车位置。不要只因为路线代码相同就合并 ETA。
5. 调用：

```text
https://data.etagmb.gov.hk/route-stop/{route_id}/{route_seq}
```

6. 找到目标站的 `stop_seq`。
7. 调用 ETA：

```text
https://data.etagmb.gov.hk/eta/route-stop/{route_id}/{route_seq}/{stop_seq}
```

8. 处理 `eta=[]` 的情况，页面应显示“暂无到站时间”，不要当成错误。
9. 小巴 API 没有浏览器 CORS 时，前端必须走 `/api/gmb/...` 同源代理。

## 推荐演进顺序

1. 继续逐条加入用户常用站点/路线。
2. 当前 `app.js` 已使用 `commuteGroups` 分组配置；新增站点时优先追加到对应分组的 `routes`，不复制整套渲染逻辑。
3. 27A 已支持多个 `route_id` 变体合并查询；新增或调整变体时，先核对每个方向的实际候车位置，再决定是否标注为 `快车` 或 `慢车`。
4. 换乘推荐目前使用手动位置选择；如果要自动化用户位置，先评估 iPhone 定位权限、港铁车厢内漂移和误推荐风险。
5. 如果开始混合更多营运商，给每个营运商拆出独立 fetch/normalize 函数。
6. 如果需要通知、缓存或隐藏复杂配置，再加 Cloudflare Worker。

## 文案约定

- 页面使用简体中文。
- 官方繁体站名可以保存在数据资料中，用户界面显示简体。
- 循环线的官方目的地可能不符合用户视角，页面可使用生活化方向名。
- 不把“实时预计”和“原定班次”混在一起显示。

## 文档维护约定

- `README.md` 只放项目入口、当前状态和文档地图。
- `docs/data-sources.md` 记录当前实现需要的 API、字段语义、站点映射和显示规则。
- `docs/decisions.md` 记录为什么这样做；早期决定如果被后续实现取代，应保留历史但标注“已被后续决策取代”。
- `pak-shek-kok-transit-notes.md` 和 `hk-transit-query-playbook.md` 作为调研备忘录保留，不作为当前配置的最终依据。
