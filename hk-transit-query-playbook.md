# 香港公交资料查询踩坑手册

整理日期：2026-06-30  
背景：基于白石角 272A、272K、专线小巴 27A、27B 查询过程总结，供后续补路线、查站序、接 ETA 服务时参考。

## 推荐查询顺序

1. 先查官方开放数据，确认路线是否存在、方向、服务类型。
2. 再查官方时间表或路线网页，补营运时间。
3. 最后用第三方页面交叉阅读，尤其是“经某路段”“特别班次”“主要上落客点”的人类可读说明。
4. 做开发配置时，内部字段优先保存官方 ID，不要只保存站名。

## 九巴查询经验

九巴开放数据主入口：

- 路线：`https://data.etabus.gov.hk/v1/transport/kmb/route/{route}/{bound}/{service_type}`
- 路线站点：`https://data.etabus.gov.hk/v1/transport/kmb/route-stop/{route}/{bound}/{service_type}`
- 站点详情：`https://data.etabus.gov.hk/v1/transport/kmb/stop/{stop_id}`
- 到站 ETA：`https://data.etabus.gov.hk/v1/transport/kmb/eta/{stop_id}/{route}/{service_type}`

常见坑：

- 循环线通常只有 `outbound` 数据，`inbound` 可能返回空对象；不要误判为路线不存在。
- `service_type` 很重要。同一路线不同服务类型可能有完全不同的站序，例如 272A 的短程、清晨白石角开出、经科技大道西。
- `route-stop` 只给站点 ID 和顺序；要再调用 `stop/{stop_id}` 才能拿站名、经纬度。
- 官方开放数据不一定包含完整时间表。九巴网页内部时间表接口更有用：
  `https://search.kmb.hk/KMBWebSite/Function/FunctionRequest.ashx?action=getschedule&route={route}&bound=1`
- 九巴官网页面本身是动态加载，直接打开页面经常看不到完整站表/时间表；要看脚本或直接调用内部接口。
- ETA 端点用 `stop_id + route + service_type`，不是用站序。开发时需要先从路线站序映射到 `stop_id`。
- ETA 返回里 `rmk_tc` 可能是“原定班次”，不一定是真实时车辆位置；UI 上可以保守显示为“预计/原定到站”。

九巴时间表字段提示：

- `DayType=MF`：星期一至五。
- `DayType=S`：星期六。
- `DayType=H`：星期日及公众假期。
- `BoundText1` 通常是时段，例如 `07:00-09:00`。
- `BoundTime1` 通常是班次分钟，例如 `8 -10`。
- 特别服务会作为其他 service type 出现，例如 `02`、`03`、`04`。

## 专线小巴查询经验

专线小巴开放数据主入口：

- 全部路线：`https://data.etagmb.gov.hk/route`
- 分区路线：`https://data.etagmb.gov.hk/route/NT`
- 路线/班次：`https://data.etagmb.gov.hk/route/NT/{route_code}`
- 路线站点：`https://data.etagmb.gov.hk/route-stop/{route_id}/{route_seq}`
- 到站 ETA：`https://data.etagmb.gov.hk/eta/route-stop/{route_id}/{route_seq}/{stop_seq}`

常见坑：

- 一个 `route_code` 可能对应多个 `route_id`。例如 27A 同时有普通辅助服务、经科技大道西、经海日湾、经海日湾及创新路。
- 小巴 ETA 不是按站点 ID 查，而是按 `route_id + route_seq + stop_seq` 查。
- `route_seq=1/2` 是方向；同一个站在不同方向可能有不同 `stop_seq`，不要跨方向复用。
- 官方接口会返回 `enabled=true` 但 `eta=[]`，这表示端点有效，只是当前没有到站资料。
- 官方数据的班次可能比第三方摘要更细。比如第三方写“06:40-23:00”，官方会拆成早晚普通、日间经科技大道西、特别班次等多个 route_id。
- `data_timestamp` 很重要。有些特别班次的资料更新时间可能早于主服务，不代表失效，但需要在记录里保留时间戳以便以后复查。

## 第三方资料怎么用

16seats 很适合读人类可懂的路线说明：

- 会写“经大学站”“经海日湾”“部分时段改经科技大道西”等说明。
- 会列“主要上落客点”，比官方站名更贴近乘客视角。
- 但开发数据不要只依赖第三方页面；站点 ID、route_id、stop_seq 仍以官方开放数据为准。

推荐用法：

- 官方 API：作为机器配置来源。
- 16seats：作为解释路线、补充别名、识别特别班次的交叉参考。
- HKeMobility/营办商网页：作为最终人工核对入口。

## 工具和编码坑

PowerShell/Windows 环境下的注意事项：

- `Invoke-WebRequest` 或 `Invoke-RestMethod` 对部分站点可能报 `Object reference not set to an instance of an object`；换 `curl.exe -L --max-time 20` 通常更稳。
- 中文 JSON 文件建议按 UTF-8 读写。Windows PowerShell 5 的 `Get-Content` 可能按 ANSI 读无 BOM UTF-8，导致中文乱码并让 `ConvertFrom-Json` 假报错。
- 校验 UTF-8 JSON 可用：
  ```powershell
  $path = Resolve-Path .\pak-shek-kok-transit-routes.json
  $text = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
  $text | ConvertFrom-Json | Out-Null
  ```
- 如果用 `curl.exe` 输出 JSON 到控制台，控制台显示可能乱码，但文件/API 内容本身未必错。用显式 UTF-8 解析验证。

## 开发建模建议

路线实体建议至少保存：

- `operator`：`KMB` / `GMB`
- `route` 或 `route_code`
- 九巴：`bound`、`service_type`
- 小巴：`region`、`route_id`、`route_seq`
- `origin_tc`、`destination_tc`
- `schedule_summary`
- `source_url`
- `data_timestamp`

站点实体建议至少保存：

- 九巴：`stop_id`、`seq`、`name_tc`、`lat`、`long`
- 小巴：`route_id`、`route_seq`、`stop_seq`、`stop_id`、`name_tc`
- 可选：`display_name_sc` 或自定义短名，供前端显示。

查询 ETA 的 key：

- 九巴：`operator=KMB + route + service_type + stop_id`
- 小巴：`operator=GMB + route_id + route_seq + stop_seq`

## 复查清单

每次新增路线前，按这个清单过一遍：

1. 是否是循环线？如果是，确认是否只有 `outbound`。
2. 是否有多个 `service_type` 或多个 `route_id`？
3. 每个方向的站序是否都取了？
4. ETA 端点是否用一个样本站点验证过？
5. 时间表是否区分平日、星期六、公众假期？
6. 第三方资料是否提示有特别走线、部分时段改道、短程班次？
7. JSON 是否用显式 UTF-8 校验过？
8. 文件里是否记录了查询日期和数据源链接？
