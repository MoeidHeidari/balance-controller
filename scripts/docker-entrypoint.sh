#!/usr/bin/env sh
set -e

export NODE_ENV=${CURRENT_ENV_:-prod}

__boostrap="/usr/local/bin/bootstrap"

if [ "$#" -eq 0 ] || [ "${1#-}" != "$1" ]; then
  exec "${__boostrap}" "$@"
# If no arguments passed, run the main executable
elif [ -z "$1" ]; then
  exec "${__boostrap}"
fi
# else default to run whatever the user wanted like "bash" or "sh"
exec "$@"
