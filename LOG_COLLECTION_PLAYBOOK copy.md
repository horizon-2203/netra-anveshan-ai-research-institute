# Universal Log Collection Playbook

This document defines a complete, tech-stack-agnostic logging system design.
You can copy this into any project or another chat and ask for implementation in any language/framework.

## 1) Goal

Build logs that are:
- Consistent (same schema everywhere)
- Searchable (structured JSON, not random text)
- Correlatable (request ID, trace ID, user/session context)
- Actionable (good for debugging, security, and operations)
- Safe (PII/secret masking)
- Efficient (sampling, buffering, retention controls)

## 2) Logging Layers (What to Collect)

Collect logs from all layers below:
- Edge/network: reverse proxy, load balancer, WAF
- Application: API handlers, jobs, workers, schedulers
- Auth and security: login, logout, failed auth, permission denials
- Data layer: DB query timing, errors, retries, deadlocks
- External calls: HTTP/gRPC/message broker calls and failures
- Platform/runtime: startup, shutdown, health checks, crash reports
- Infrastructure: container runtime, orchestration events, host metrics

## 3) Event Model (Canonical Schema)

Every log entry should use a single canonical schema.

Required fields:
- timestamp: UTC ISO-8601
- level: DEBUG | INFO | WARN | ERROR | FATAL
- service: service/app name
- environment: dev | staging | prod
- host: hostname or node ID
- event: stable event name (example: request_completed)
- message: short human-readable summary
- request_id: unique per inbound request
- trace_id: distributed tracing ID
- span_id: current operation span ID
- user_id: user identifier if authenticated
- session_id: session identifier if available
- ip: client IP (prefer trusted forwarded IP policy)
- method: HTTP method (if request-based)
- path: route/path template (avoid raw sensitive path)
- status_code: response status (if applicable)
- latency_ms: operation latency in milliseconds
- error_code: app/domain error code when failure occurs
- error_type: exception/class/category
- error_message: sanitized error message

Optional fields:
- geo: country, city, latitude, longitude, timezone
- component: module/subsystem name
- version: app release/version
- build_id: CI/CD build identifier
- deployment_id: deployment identifier
- feature_flag_state: relevant flag values
- payload_size_bytes: request/response size
- retry_count: retries performed
- upstream/downstream metadata

Rule: Keep event names stable; do not change them casually.

## 4) Severity Rules

Use levels consistently:
- DEBUG: deep internal diagnostic, disabled in production by default
- INFO: normal lifecycle and success events
- WARN: recoverable issues, suspicious patterns, degraded behavior
- ERROR: failed operation that impacts one request/task
- FATAL: process/system-level unrecoverable condition

Rule: Never log expected business outcomes as ERROR.

## 5) Correlation and Context Propagation

Always propagate context end-to-end:
- Generate request_id at the entry point if absent
- Reuse trace_id/span_id from tracing headers if present
- Attach request_id and trace_id to every child log
- Include job_id/task_id for async background work
- Include parent_event_id for multi-step workflows

Propagation channels:
- HTTP headers
- Message queue headers/metadata
- RPC metadata
- Thread/task local context in runtime

## 6) Data Protection and Compliance

Mask or drop sensitive fields before writing logs.

Never log:
- Passwords, OTPs, secrets, API keys, private tokens
- Full card data, CVV, private cryptographic keys
- Full personal identifiers where restricted by policy

Masking examples:
- email: j***@domain.com
- phone: last 2 to 4 digits only
- token: keep prefix/suffix only

Compliance controls:
- Data classification tags per field
- Region-aware retention rules
- Right-to-delete workflow if required
- Audit trail for log access

## 7) Log Collection Pipeline

Recommended flow:
1. App emits structured JSON logs to stdout/file/socket
2. Agent/collector (sidecar/daemon) tails and batches logs
3. Collector enriches metadata (host, k8s labels, region)
4. Collector sends to centralized sink (search DB/SIEM/data lake)
5. Indexing + retention + alerting policies applied
6. Dashboards/queries/alerts consume centralized logs

Common collectors:
- Fluent Bit / Fluentd
- Vector
- Logstash
- OpenTelemetry Collector

Common sinks:
- Elasticsearch/OpenSearch
- Loki
- Splunk
- Datadog/New Relic
- Cloud-native log services

## 8) Reliability and Performance Controls

Prevent logging from hurting production performance.

Use:
- Async/non-blocking logging where possible
- Batching with bounded memory
- Backpressure policy (drop DEBUG first)
- Retry with exponential backoff and jitter
- Circuit breaker around remote log sink
- Local spool/queue for transient outages

Sampling strategy:
- 100% ERROR/FATAL
- 100% security/auth failures
- INFO sampled by route/event volume
- DEBUG sampled aggressively in production

## 9) Rotation, Retention, and Cost Control

If file-based logging exists:
- Rotate by size and time
- Compress rotated files
- Cap number of retained files

Central retention policy examples:
- DEBUG: 3 to 7 days
- INFO: 14 to 30 days
- WARN/ERROR: 30 to 90+ days
- Security/audit logs: per compliance requirement

Cost optimizations:
- Reduce high-cardinality fields in INFO logs
- Keep verbose payload dumps off by default
- Use archive tiers for older logs

## 10) Security-Focused Events (Minimum Set)

Always collect these as high-priority logs:
- Authentication success/failure
- Authorization failure (403) with resource/action
- Password reset flow events
- Privilege escalation actions
- Token issuance/revocation
- Suspicious rate/abuse patterns
- Configuration and secret changes
- Admin operations and audit events

## 11) API Request/Response Logging Rules

For inbound requests:
- Log request_received and request_completed events
- Capture method, route, status_code, latency_ms
- Include request_id and trace_id
- Capture user agent and trusted client IP
- Do not log full bodies by default

For outbound calls:
- Log dependency_call_started and dependency_call_completed
- Include target service, method, status, latency_ms
- Include retry_count and timeout information

## 12) Database Logging Rules

Log query metadata, not raw sensitive data.

Capture:
- db_system, db_host logical name, operation (select/insert/update/delete)
- table/entity name (when safe)
- duration_ms
- row_count
- timeout/retry/deadlock events
- transaction boundary events

Avoid:
- Full SQL with raw user data in production
- Full result sets

## 13) Error Logging Blueprint

On exception/failure log:
- level=ERROR
- event=operation_failed
- error_type
- error_code
- sanitized error_message
- stack_trace (internal sink only, optional by env)
- request_id/trace_id
- impacted component and operation name

Rule: Include enough detail to reproduce and triage quickly.

## 14) Health Check Noise Control

Health checks can pollute logs. Control this by either:
- Excluding known health-check user-agent/path from application logs, or
- Logging them at DEBUG and filtering at sink, or
- Sending health logs to a separate low-retention stream

Rule: Keep service health visibility without drowning real traffic logs.

## 15) Alerting Rules (Starter Set)

Create alerts on:
- ERROR/FATAL rate spike by service
- Increased 5xx rate
- Authentication failure burst
- Latency SLO breach (p95/p99)
- Dependency timeout spike
- Log ingestion pipeline failure/backlog growth

Alert payload should include:
- service, environment, time window
- query link/dashboard link
- sample request_id/trace_id
- on-call runbook link

## 16) Dashboards (Starter Set)

Build at least these dashboards:
- Request volume, latency (p50/p95/p99), error rate
- Top failing routes/events
- Auth/security event trends
- Dependency health (timeouts, retries, failures)
- Collector throughput and dropped log count

## 17) Validation Checklist (Definition of Done)

A logging implementation is complete only if:
- All required schema fields are present
- request_id and trace_id propagate end-to-end
- Sensitive data masking is tested
- Log volume and sampling are tuned for production
- Rotation/retention policy is active
- Alerts fire in a controlled test
- Querying by request_id can reconstruct one full transaction

## 17.1) Universal Pseudocode (Drop-in Logic)

Use this pseudocode as the direct implementation blueprint in any language.

```text
GLOBAL CONFIG:
  SERVICE_NAME
  ENVIRONMENT
  HOST
  LOG_LEVEL
  HEALTHCHECK_PATHS = ["/health", "/ready", "/live"]
  HEALTHCHECK_USER_AGENTS = ["kube-probe", "ELB-HealthChecker", "Python-urllib"]
  SENSITIVE_KEYS = ["password", "pass", "secret", "token", "api_key", "authorization", "otp", "cvv"]
  REQUIRED_FIELDS = [
    timestamp, level, service, environment, host, event, message,
    request_id, trace_id, span_id, method, path, status_code, latency_ms
  ]
  LOG_QUEUE_MAX
  BATCH_SIZE
  FLUSH_INTERVAL_MS
  RETRY_MAX
  RETRY_BASE_MS

STATE:
  async_queue = new BoundedQueue(LOG_QUEUE_MAX)
  dropped_debug_count = 0


FUNCTION now_utc_iso():
  return current time in UTC ISO-8601


FUNCTION generate_id(prefix):
  return prefix + random_hex(12)


FUNCTION mask_value(key, value):
  lower_key = lowercase(key)
  IF lower_key in SENSITIVE_KEYS:
    return "[REDACTED]"

  IF lower_key contains "email":
    return mask_email(value)          # a***@domain.com

  IF lower_key contains "phone":
    return mask_phone(value)          # keep last 2-4 digits

  IF lower_key contains "card":
    return mask_card(value)           # keep only last 4

  return value


FUNCTION sanitize_map(obj):
  IF obj is null:
    return null

  out = empty map
  FOR each (k, v) in obj:
    IF v is map:
      out[k] = sanitize_map(v)
    ELSE IF v is list:
      out[k] = sanitize_list(v, k)
    ELSE:
      out[k] = mask_value(k, v)
  return out


FUNCTION sanitize_list(items, parent_key):
  out = []
  FOR item in items:
    IF item is map:
      out.append(sanitize_map(item))
    ELSE:
      out.append(mask_value(parent_key, item))
  return out


FUNCTION should_skip_healthcheck(path, user_agent, ip):
  IF path in HEALTHCHECK_PATHS:
    return true
  FOR marker in HEALTHCHECK_USER_AGENTS:
    IF marker exists in user_agent:
      return true
  # optional strict rule for local probes:
  # IF ip in ["127.0.0.1", "::1"] and user_agent contains known probe marker: return true
  return false


FUNCTION normalize_level(level):
  allowed = ["DEBUG", "INFO", "WARN", "ERROR", "FATAL"]
  IF uppercase(level) in allowed:
    return uppercase(level)
  return "INFO"


FUNCTION ensure_required_fields(event_map):
  FOR field in REQUIRED_FIELDS:
    IF field not present in event_map:
      event_map[field] = null
  return event_map


FUNCTION build_base_context():
  return {
    service: SERVICE_NAME,
    environment: ENVIRONMENT,
    host: HOST,
    timestamp: now_utc_iso()
  }


FUNCTION log_event(level, event_name, message, context_map):
  normalized = merge(build_base_context(), {
    level: normalize_level(level),
    event: event_name,
    message: message
  }, context_map)

  sanitized = sanitize_map(normalized)
  complete = ensure_required_fields(sanitized)

  IF queue is full:
    IF complete.level == "DEBUG":
      dropped_debug_count += 1
      return
    ELSE:
      # for higher levels, try forced write fallback
      write_sync_fallback(complete)
      return

  async_queue.push(complete)


MIDDLEWARE on_request_start(request):
  ctx = {}
  ctx.request_id = request.header("x-request-id") OR generate_id("req_")
  ctx.trace_id = request.header("traceparent") OR request.header("x-trace-id") OR generate_id("tr_")
  ctx.span_id = generate_id("sp_")
  ctx.method = request.method
  ctx.path = normalize_route_template(request.path)
  ctx.ip = extract_trusted_client_ip(request)
  ctx.user_agent = request.header("user-agent")
  ctx.user_id = current_user_id_or_null()
  ctx.session_id = current_session_id_or_null()
  ctx.start_time = monotonic_now_ms()

  set_request_context(ctx)

  IF NOT should_skip_healthcheck(ctx.path, ctx.user_agent, ctx.ip):
    log_event("INFO", "request_received", "Inbound request", {
      request_id: ctx.request_id,
      trace_id: ctx.trace_id,
      span_id: ctx.span_id,
      method: ctx.method,
      path: ctx.path,
      ip: ctx.ip,
      user_id: ctx.user_id,
      session_id: ctx.session_id
    })


MIDDLEWARE on_request_end(response):
  ctx = get_request_context()
  IF ctx is null:
    return

  latency = monotonic_now_ms() - ctx.start_time

  IF should_skip_healthcheck(ctx.path, ctx.user_agent, ctx.ip):
    return

  level = "INFO"
  IF response.status_code >= 500:
    level = "ERROR"
  ELSE IF response.status_code >= 400:
    level = "WARN"

  log_event(level, "request_completed", "Inbound request completed", {
    request_id: ctx.request_id,
    trace_id: ctx.trace_id,
    span_id: ctx.span_id,
    method: ctx.method,
    path: ctx.path,
    ip: ctx.ip,
    user_id: ctx.user_id,
    session_id: ctx.session_id,
    status_code: response.status_code,
    latency_ms: latency,
    payload_size_bytes: response.size_bytes
  })


HANDLER on_exception(error):
  ctx = get_request_context_or_empty()
  log_event("ERROR", "operation_failed", "Unhandled exception", {
    request_id: ctx.request_id,
    trace_id: ctx.trace_id,
    span_id: ctx.span_id,
    method: ctx.method,
    path: ctx.path,
    status_code: 500,
    latency_ms: elapsed_from_ctx(ctx),
    error_type: class_name(error),
    error_code: map_error_to_code(error),
    error_message: sanitize_error_message(error.message),
    stack_trace: stack_if_allowed_by_env(error)
  })


FUNCTION log_auth_event(kind, status, details):
  # kind examples: login, logout, token_issue, token_revoke
  # status examples: success, failed, blocked
  level = (status == "failed" OR status == "blocked") ? "WARN" : "INFO"
  log_event(level, "auth_event", "Authentication event", merge(details, {
    auth_kind: kind,
    auth_status: status
  }))


FUNCTION with_db_logging(operation_name, db_meta, fn):
  start = monotonic_now_ms()
  TRY:
    result = fn()
    duration = monotonic_now_ms() - start
    log_event("INFO", "db_operation_completed", "Database operation completed", {
      operation: operation_name,
      db_system: db_meta.system,
      db_host: db_meta.host_alias,
      entity: db_meta.entity,
      duration_ms: duration,
      row_count: safe_row_count(result)
    })
    return result
  CATCH err:
    duration = monotonic_now_ms() - start
    log_event("ERROR", "db_operation_failed", "Database operation failed", {
      operation: operation_name,
      db_system: db_meta.system,
      db_host: db_meta.host_alias,
      entity: db_meta.entity,
      duration_ms: duration,
      error_type: class_name(err),
      error_code: map_error_to_code(err),
      error_message: sanitize_error_message(err.message)
    })
    RAISE


FUNCTION with_dependency_logging(target, method, fn):
  start = monotonic_now_ms()
  retry_count = 0

  log_event("INFO", "dependency_call_started", "Dependency call started", {
    target_service: target,
    method: method
  })

  TRY:
    result = fn()
    log_event("INFO", "dependency_call_completed", "Dependency call completed", {
      target_service: target,
      method: method,
      status_code: result.status,
      latency_ms: monotonic_now_ms() - start,
      retry_count: retry_count
    })
    return result
  CATCH err:
    log_event("ERROR", "dependency_call_failed", "Dependency call failed", {
      target_service: target,
      method: method,
      latency_ms: monotonic_now_ms() - start,
      retry_count: retry_count,
      error_type: class_name(err),
      error_code: map_error_to_code(err),
      error_message: sanitize_error_message(err.message)
    })
    RAISE


WORKER flush_loop():
  WHILE process_running:
    batch = async_queue.pop_up_to(BATCH_SIZE, FLUSH_INTERVAL_MS)
    IF batch is empty:
      continue

    payload = serialize_json_lines(batch)
    success = send_with_retry(payload)

    IF NOT success:
      spool_to_local_disk(payload)


FUNCTION send_with_retry(payload):
  attempt = 0
  WHILE attempt < RETRY_MAX:
    ok = remote_sink_send(payload)
    IF ok:
      return true

    sleep_ms(exponential_backoff_with_jitter(RETRY_BASE_MS, attempt))
    attempt += 1
  return false


WORKER spool_replay_loop():
  EVERY N seconds:
    files = list_spool_files_oldest_first()
    FOR file in files:
      payload = read_file(file)
      IF send_with_retry(payload):
        delete_file(file)
      ELSE:
        break


SCHEDULER rotate_local_logs_if_enabled():
  FOR each log_file in configured_local_files:
    IF file_size(log_file) > max_size OR file_age(log_file) > max_age:
      rotate(log_file)
      compress(rotated_file)
      delete_oldest_if_over_limit(log_file, max_files)


FUNCTION should_sample(event):
  IF event.level in ["ERROR", "FATAL"]:
    return true
  IF event.event in ["auth_event", "operation_failed", "db_operation_failed", "dependency_call_failed"]:
    return true
  IF event.level == "DEBUG":
    return random_percent() < DEBUG_SAMPLE_PERCENT
  IF event.level == "INFO":
    return random_percent() < INFO_SAMPLE_PERCENT
  return true


FUNCTION emit(event):
  IF should_sample(event):
    log_event(event.level, event.event, event.message, event.context)


STARTUP HOOK:
  start_worker(flush_loop)
  start_worker(spool_replay_loop)
  log_event("INFO", "application_startup", "Service started", { version: APP_VERSION })


SHUTDOWN HOOK:
  drain_queue_with_timeout()
  flush_remaining_spool_metadata()
  log_event("INFO", "application_shutdown", "Service stopped", {})
```

```text
MINIMUM TEST PSEUDOCODE:

TEST required_fields_present:
  event = capture_one_log_from_request()
  assert event contains all REQUIRED_FIELDS

TEST masking_works:
  log_event("INFO", "test", "mask", { password: "abc", token: "xyz", email: "a@b.com" })
  event = read_last_log()
  assert event.password == "[REDACTED]"
  assert event.token == "[REDACTED]"
  assert event.email is masked

TEST correlation_propagates:
  send_request_with_header("x-request-id", "req_123")
  logs = read_logs_for_request("req_123")
  assert all logs.request_id == "req_123"

TEST healthcheck_filtered:
  send_request(path="/health", user_agent="Python-urllib")
  assert no business request log was written
```

## 18) Portable Implementation Prompt (Use in Any Chat)

Paste this to another chat to generate stack-specific code:

"Implement a production-grade structured logging system using this playbook. Use JSON logs with the canonical schema, context propagation (request_id/trace_id), masking of sensitive data, async/batched emission, health-check noise filtering, DB/dependency timing logs, retention/rotation strategy, and alert-ready error/security events. Include middleware/interceptor hooks, example log entries, and tests for schema + masking + correlation."

## 19) Example Canonical Log (JSON)

{
  "timestamp": "2026-03-25T12:34:56.789Z",
  "level": "INFO",
  "service": "example-api",
  "environment": "prod",
  "host": "node-03",
  "event": "request_completed",
  "message": "HTTP request completed",
  "request_id": "req_1f3b9f6",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "span_id": "00f067aa0ba902b7",
  "user_id": "u_9831",
  "session_id": "s_1ab2",
  "ip": "203.0.113.27",
  "method": "GET",
  "path": "/v1/orders/{id}",
  "status_code": 200,
  "latency_ms": 48,
  "component": "orders-controller",
  "version": "v3.8.2"
}

## 20) Quick Architecture Summary

- Emit structured logs in app
- Enrich and ship with collector
- Centralize in queryable sink
- Alert on failures and anomalies
- Protect sensitive data always
- Keep schema stable and portable
