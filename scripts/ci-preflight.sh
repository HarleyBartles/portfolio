#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
refresh_script="$script_dir/refresh_agent_surfaces.sh"
doctrine_script="$script_dir/validate_agent_mesh.sh"

if [[ ! -f "$refresh_script" ]]; then
  echo "Refresh script not found at $refresh_script" >&2
  exit 1
fi

if [[ ! -f "$doctrine_script" ]]; then
  echo "Doctrine validator not found at $doctrine_script" >&2
  exit 1
fi

check_mode=false
if [[ ${1:-} == "--check" || ${1:-} == "-Check" ]]; then
  check_mode=true
fi

if $check_mode; then
  "$refresh_script" --check
  "$doctrine_script" --check
else
  "$refresh_script"
  "$doctrine_script"
fi
