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
for arg in "$@"; do
  case "$arg" in
    --check|-Check)
      check_mode=true
      ;;
  esac
done

if [[ "$check_mode" == true ]]; then
  bash "$refresh_script" --check
  bash "$doctrine_script" --check
else
  bash "$refresh_script"
  bash "$doctrine_script"
fi
