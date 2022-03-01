#!/bin/bash

# This file check environment and run a specific command for each one

# Get node environment
NODE_ENV="$(printenv | awk '/^NODE_ENV/{print $1}')";


if [[ "$NODE_ENV" == "NODE_ENV=production" ]]; then

	# Run production commands
	echo "Production";

else

	# Run dev commands
	npm run generate:gql

fi;
