# 当前开发上下文

更新时间：2026-06-30

这份文档用于压缩上下文、开启新对话或交接开发。新线程优先读本文，再按需要查看 `README.md`、`docs/data-sources.md`、`docs/decisions.md` 和 `docs/development.md`。

## 项目目标

为 iPhone 提供一个轻量白石角公交 ETA 页面，重点覆盖用户日常上班/下班路线：

- 上班：白石角出发，往大学站、沙田方向
- 下班：东铁线回白石角，比较沙田站和大学站换乘

线上地址：

```text
私有部署地址，不在公开仓库记录。
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
- `assets/icons/`：裁掉外圈白边后的 iPhone 主屏幕图标、manifest 图标和 favicon

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

站点级换乘时间和到家车程估算配置位于 `app.js` 的 `transferStations`：

```js
shaTin: { walkMinutes: 4, homeTravelMinutes: 16 }
university: { walkMinutes: 3, homeTravelMinutes: 11 }
```

规则：

- 沙田站下车默认预留 4 分钟到换乘点
- 大学站下车默认预留 3 分钟到换乘点
- 候选条件：`巴士/小巴 ETA >= 东铁到站时间 + 该站 walkMinutes`
- 对候选班次加上该站到白石角/逸珑湾一带的 `homeTravelMinutes`
- 推荐预计到家时间最早的候选
- 等待时间向上取整显示
- 大围到沙田至少按约 3 分钟校正
- 沙田到大学至少按约 7 分钟校正
- 主推荐摘要显示为 `推荐 大学站 下车 272A 19:00发车`
- 摘要内 `推荐` 和 `下车` 为灰色细体，站点、路线和发车时间为强调样式
- 摘要下方同时显示沙田站和大学站两套方案，包括东铁到站、可换乘时间、等待时间和到家预计；不展开班次信息和来源标记
- 换乘推荐标题栏右侧同一行显示港铁状态框和 `换乘 3-4 分钟`；实时可用时显示绿色 `港铁实时可用`，若港铁实时到站 API 不可用，则按大围到沙田 3 分钟、沙田到大学 7 分钟估算，并显示红色 `港铁实时不可用，已估算`

参数速查见 `docs/data-sources.md` 的“可调参数速查”，包含出门预留时间、换乘步行时间、东铁兜底时间、到家车程估算、ETA 去重窗口和窄屏断点。

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

- `本次提交`：新增裁边后的 iPhone 主屏幕图标、favicon 和 manifest 图标，并补充上线前图标校验文档
- `本次提交`：换乘推荐改为按预计到家时间推荐；主推荐改成一行摘要，下方并列展示沙田站/大学站两套简化方案；整理相关文档
- `257c822`：出门建议右侧改为时间/线路两行，隐藏 ETA 备注
- `815bafa`：避免出门建议站点信息在 iPhone Pro Max 上断行
- `be8ac4b`：调整出门建议左右信息块的底部对齐
- `8c139d3`：去掉滑块外方向标题；调整推荐文案与布局

## 验证命令

检查 JS 语法：

```powershell
& 'C:\Users\Qiuyu\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --check app.js
& 'C:\Users\Qiuyu\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --check functions\api\gmb\eta\route-stop\[routeId]\[routeSeq]\[stopSeq].js
```

检查 manifest 与图标尺寸：

```powershell
& 'C:\Users\Qiuyu\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -c "from pathlib import Path; from PIL import Image; import json; json.loads(Path('manifest.webmanifest').read_text(encoding='utf-8')); base=Path('assets')/'icons'; expected={'apple-touch-icon.png':(180,180),'icon-192.png':(192,192),'icon-512.png':(512,512),'favicon-32x32.png':(32,32),'favicon-16x16.png':(16,16),'app-icon-1024.png':(1024,1024)}; assert all((base/name).exists() and Image.open(base/name).size == size for name,size in expected.items()); assert (base/'favicon.ico').exists(); print('manifest and icons ok')"
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
4. 如果换乘推荐还不够准，优先调 `transferStations.*.walkMinutes`、`transferStations.*.homeTravelMinutes` 或 `eastRailTravelMinutes`，不要只改 UI 文案。

开发约束：

- 不要把正式卡片内部 ETA 样式改成原型 A2 的紧凑样式，除非用户明确要求
- 新增路线前先查 `docs/development.md`
- 修改站点/route_id 前同步 `docs/data-sources.md`
- 新增产品决策后同步 `docs/decisions.md`
