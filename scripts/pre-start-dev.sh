#!/bin/bash

# check if some node app is running on port 3000 and kill the process

lsof -i:3000 | awk '/node/{print $2}' | awk 'NR == 1' | xargs -r kill -9
