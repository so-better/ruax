---
lastUpdated: false
title: 更新日志
---

# 更新日志

## v1.8.17 <Badge type="tip" text='2026.04.26' />

- `responseType` 新增 `stream` 类型，`create()` 直接返回原生 `ReadableStream`，body 不提前消费，支持 SSE 等流式响应场景

## v1.8.16 <Badge type="tip" text='2026.04.26' />

- 移除流式请求支持，`responseType` 不再支持 `stream` 类型，同步移除 `onChunk` 配置项

## v1.8.15 <Badge type="tip" text='2026.04.26' />

- 新增流式请求支持，`responseType` 新增 `stream` 类型，可通过 `onChunk` 回调逐块接收数据，或直接获取 `ReadableStream`
- 新增 `credentials` 配置项，支持设置凭证策略，跨域请求携带 cookie 时可设为 `include`
- 新增 `put()`、`patch()`、`delete()` 快捷请求方法
- 修复 HTTP 方法名大写处理，将 `toLocaleUpperCase()` 改为 `toUpperCase()`，避免特殊语言环境下方法名异常
- 修复 `readProgress` 进度包装时丢失原始响应 headers、status 的问题
- `timeout` 设为 `0` 时不启用超时，适合流式等长连接场景

## v1.8.14 <Badge type="tip" text='2026.04.10' />

- 代码优化，修复部分问题

## v1.8.13 <Badge type="tip" text='2026.04.02' />

- 优化代码

## v1.8.12 <Badge type="tip" text='2025.03.22' />

- 接口请求未成功状态下适配 `beforeResponse`

## v1.8.10 <Badge type="tip" text='2024.12.12' />

- 基于 Fetch API 重构
