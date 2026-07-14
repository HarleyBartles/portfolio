#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
python_script="$script_dir/validate_agent_mesh.py"

if [[ ! -f "$python_script" ]]; then
  echo "Python script not found at $python_script" >&2
  exit 1
fi

python_launchers=(python3 python py)
python_launcher=""

for launcher in "${python_launchers[@]}"; do
  if command -v "$launcher" >/dev/null 2>&1; then
    python_launcher="$launcher"
    break
  fi
done

if [[ -z "$python_launcher" ]]; then
  echo "No Python launcher found. Tried: ${python_launchers[*]}" >&2
  exit 1
fi

args=("$python_script" "$@")

if [[ "$python_launcher" == "py" ]]; then
  "$python_launcher" -3 "${args[@]}"
else
  "$python_launcher" "${args[@]}"
fi
