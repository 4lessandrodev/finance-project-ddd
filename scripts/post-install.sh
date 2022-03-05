#!/bin/bash

# This file check environment and run a specific command for each one

# Get node environment
NODEJS_ENV="$(printenv | awk '/^NODE_ENV/{print $1}' | cut -d '=' -f2)";


if [[ "$NODEJS_ENV" == "production" ]]; then

	# Run production commands
	echo "Production";

else

	# Run dev commands
	npm run generate:gql

fi;
