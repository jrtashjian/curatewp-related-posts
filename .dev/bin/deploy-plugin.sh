#!/bin/bash

PLUGIN="curatewp-related-posts"
VERSION=$1

WORKING_DIR=`pwd`

mkdir -p release/svn
svn co "http://svn.wp-plugins.org/${PLUGIN}" release/svn

rm -rf release/svn/trunk/*
rsync -av --progress release/$PLUGIN/* release/svn/trunk

cd release/svn
svn status | grep '^!' | awk '{print $2}' | xargs svn delete
svn add * --force
svn commit -m "Pushing ${VERSION}"

svn cp trunk tags/$VERSION
svn commit -m "Taggin version ${VERSION}"

cd $WORKING_DIR
rm -rf release
echo "https://downloads.wordpress.org/plugin/${PLUGIN}.${VERSION}.zip"