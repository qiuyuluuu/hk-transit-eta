# 当前开发上下文

更新时间：2026-06-30

这份文档用于压缩上下文、开启新对话或交接开发。新线程优先读本文，再按需要查看 `README.md`、`docs/data-sources.md`、`docs/decisions.md` 和 `docs/development.md`。

## 项目目标

为 iPhone 提供一个轻量白石角公交 ETA 页面，重点覆盖用户日常上班/下班路线：

- 上班：白石角出发，往大学站、沙田方向
- 下班：东铁线回白石角，比较沙田站和大学站换乘

线上地址：

```text
<PRIVATE_DEPLOY_URL>/
```

GitHub 仓库：

```text
qiuyuluuu/hk-transit-eta
```

Cloudflare Pages 设置：

- 生产分支：`master`
- 构建命令：留空
- 输出目录：`/`
- 小巴 API 通过 Pages Functions 同源代理

## 当前实现

主要文件：

- `index.html`：页面骨架、刷新按钮、上班/下班滑块
- `styles.css`：视觉样式、站点分组、卡片和推荐面板样式
- `app.js`：路线配置、ETA 查询、去重、推荐计算、渲染
- `functions/api/gmb/eta/route-stop/[routeId]/[routeSeq]/[stopSeq].js`：绿色专线小巴 ETA 代理
- `manifest.webmanifest`：添加到 iPhone 主屏幕

当前页面交互：

- 顶部显示 `刷新` 和全局更新时间
- 使用滑块切换 `上班` / `下班`
- 滑块外不再显示额外的上班/下班方向标题
- 默认显示上班页
- 刷新会更新全部 ETA 缓存，切换页面不重新请求
- 每个页面按站点分组，路线卡片挂在站点标题下
- 单条路线卡片内部 ETA 样式保持正式页原样，没有采用原型中的极紧凑 ETA 单元格

## 已实现路线

上班页：

- `逸珑湾 PA150`
  - 九巴 `272A` 往大学站方向
  - 小巴 `27A` 往沙田方向，标注 `快车` / `慢车`
  - 小巴 `27B` 往沙田方向，标注 `经大学站`
- `云汇 PA206`
  - 九巴 `272A` 往大学站方向
  - 小巴 `27A` 往沙田方向，标注 `快车` / `慢车`
  - 小巴 `27B` 往沙田方向，标注 `经大学站`

下班页：

- `大学站 ST905`
  - 九巴 `272A` 往白石角方向
  - 小巴 `27B` 往白石角方向，标注 `经大学站`
- `沙田站 排头街`
  - 小巴 `27A` 往白石角方向，标注 `快车` / `慢车`
  - 小巴 `27B` 往白石角方向，标注 `经大学站`

27B 显示规则：

- 若 27B 返回空 ETA，自动隐藏对应 27B 卡片
- 若接口失败，显示错误，不隐藏，便于排查

## 推荐功能

### 上班出门建议

位置：上班页顶部。

规则：

- 复用上班页已刷新出的 ETA
- 预留 5 分钟乘车
- 只考虑 `ETA >= 当前时间 + 5 分钟`
- 按 ETA 从早到晚排序
- 显示最早两班
- 27A 快慢车、不同站点、不同路线即使时间相同也保留为独立候选

UI 文案：

- 标题为 `出门建议`
- 后面小字显示 `预留 5 分钟乘车`
- 右侧显示 `最快两班`
- 每个候选左侧同一块分两行显示最快/第二快方案和出门时间/站点，不显示站点代码；右侧右对齐分两行显示乘车时间和路线/快慢车，不显示 ETA 备注

### 下班换乘推荐

位置：下班页顶部。

用户手动选择：

- `已到大围站`
- `已到沙田站`

比较站点：

- 沙田站
- 大学站

站点级换乘时间配置位于 `app.js` 的 `transferStations`：

```js
shaTin: { walkMinutes: 4 }
university: { walkMinutes: 3 }
```

规则：

- 沙田站下车默认预留 4 分钟到换乘点
- 大学站下车默认预留 3 分钟到换乘点
- 候选条件：`巴士/小巴 ETA >= 东铁到站时间 + 该站 walkMinutes`
- 推荐等待时间最短的候选
- 等待时间向上取整显示
- 大围到沙田至少按约 3 分钟校正
- 沙田到大学至少按约 7 分钟校正
- 主推荐文案显示为 `推荐大学站下车` / `推荐沙田站下车`，不在词语之间加空格；`推荐` 和 `下车` 为灰色细体
- 主推荐内的班次时间显示为 `14:15发车`

## 数据源注意事项

九巴：

- 浏览器可直接请求九巴 ETA API
- 272A 是循环线，`service_type` 很重要
- 当前配置：
  - 逸珑湾 `PA150`：`service_type=1,2,3,4`
  - 云汇 `PA206`：`service_type=1,3,4`
  - 大学站 `ST905`：`service_type=1,2,4`
- 多个 `service_type` 可能返回同一班车，页面按 90 秒时间窗口去重

小巴：

- 浏览器不能直连小巴 ETA，必须走 `/api/gmb/eta/route-stop/...`
- Pages Function 请求小巴上游时必须带 `User-Agent`
- 27A 合并多个 `route_id`，并在 ETA 旁显示 `快车` / `慢车`
- 27B 统一显示 `经大学站`

港铁：

- 东铁线实时到站 API 可浏览器直连
- 使用 `EAL` 的 `UP` 方向
- 沙田站代码 `SHT`
- 大学站代码 `UNI`

详细接口、站点映射和 route_id 见 `docs/data-sources.md`。

## 最近关键提交

- `d891100`：出门建议标题压缩；27B 空班次自动隐藏
- `25adc6a`：修复上班/下班切换隐藏失败
- `44b3e9f`：加入上班/下班滑块；下班换乘时间改为站点级配置
- `ff2fc64`：正式页应用站点分组和紧凑外层布局
- `e0514ab`：下班换乘推荐改为左侧主推荐、右侧解释

## 验证命令

检查 JS 语法：

```powershell
& 'C:\Users\Qiuyu\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --check app.js
```

部署后检查线上资源：

```powershell
curl.exe -s -o NUL -w 'PAGE %{http_code}' '<PRIVATE_DEPLOY_URL>/'
curl.exe -s -o NUL -w 'GMB_PROXY %{http_code}' '<PRIVATE_DEPLOY_URL>/api/gmb/eta/route-stop/2007861/2/1'
```

## 后续开发建议

优先级较高：

1. 在真实 iPhone 上检查上班/下班滑块、27B 隐藏、换乘推荐是否符合使用预期。
2. 如果 27B 空卡隐藏后站点下没有任何小巴卡片，需要考虑站点组是否也要自动收紧间距或隐藏空站点。
3. 如果用户希望下次打开保留上班/下班选择，可加入 `localStorage`。
4. 如果换乘推荐还不够准，优先调 `transferStations.*.walkMinutes`，不要改算法。

开发约束：

- 不要把正式卡片内部 ETA 样式改成原型 A2 的紧凑样式，除非用户明确要求
- 新增路线前先查 `docs/development.md`
- 修改站点/route_id 前同步 `docs/data-sources.md`
- 新增产品决策后同步 `docs/decisions.md`
