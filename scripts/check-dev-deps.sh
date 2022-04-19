#!/bin/bash

# read all devDependencies name on package.json

DEV_DEPS="$(cat package.json | grep -A 100 "devDependencies" | grep -B 100 "\}\," | \
awk "NR>1" | sed -e "s/},//" | tr -d '":.^0-9,')";

# loop on dependencies names and save each name on a file

for dep in "$(echo $DEV_DEPS)"; do
	echo $dep | sed -e 's/ /\n/g' > deps;
done;

# read each name on saved file and check version on yarn.lock

while IFS= read -r line; do 
	yarn list --depth 0 | grep $line@
done < ./deps;

# delete file

rm -rf ./deps
