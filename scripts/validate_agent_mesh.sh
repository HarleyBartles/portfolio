#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
python_script="$script_dir/validate_agent_mesh.py"

if [[ ! -f "$python_script" ]]; then
  echo "Python script not found at $python_script" >&2
  exit 1
fi

if command -v py >/dev/null 2>&1; then
  exec py -3 "$python_script" "$@"
elif command -v python3 >/dev/null 2>&1; then
  exec python3 "$python_script" "$@"
else
  exec python "$python_script" "$@"
fi
