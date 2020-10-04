#!/bin/bash

PLUGIN="curatewp-related-posts"

WORKING_DIR=`pwd`

mkdir -p release/$PLUGIN
git clone https://github.com/jrtashjian/${PLUGIN} release/repo

cd release/repo
composer install --no-dev
npm install && npm run build
cd $WORKING_DIR

rsync -av --progress --exclude={'.*','wordpress','node_modules','src','release','.gitignore','composer.*','package*','phpcs.xml','README.md','yarn.lock'} release/repo/* release/$PLUGIN
rm -rf release/repo