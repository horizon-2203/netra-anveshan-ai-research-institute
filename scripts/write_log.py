#!/usr/bin/env python3
import json
import os
import sys
from pathlib import Path


def main() -> int:
    raw = sys.stdin.read()
    if not raw:
        return 1

    payload = json.loads(raw)
    base_dir = payload.get("baseDir")
    entry = payload.get("entry")
    targets = payload.get("targets", [])

    if not base_dir or not isinstance(entry, dict) or not isinstance(targets, list):
        return 1

    logs_root = Path(base_dir) / "logs"
    serialized = json.dumps(entry, ensure_ascii=True) + "\n"

    for relative_target in targets:
        if not isinstance(relative_target, str) or not relative_target:
            continue
        target_path = logs_root / relative_target
        target_path.parent.mkdir(parents=True, exist_ok=True)
        with target_path.open("a", encoding="utf-8") as log_file:
            log_file.write(serialized)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
