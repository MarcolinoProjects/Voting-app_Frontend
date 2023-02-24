#!/bin/bash

npm update

dependencies=($(jq -r '.dependencies | keys[]' package.json))
for dependency in "${dependencies[@]}"; do
  npm install --save "$dependency"
done

dev_dependencies=($(jq -r '.devDependencies | keys[]' package.json))
for dev_dependency in "${dev_dependencies[@]}"; do
  npm install --save-dev "$dev_dependency"
done