#!/bin/bash

PLUGIN="curatewp-related-posts"
VERSION=$1

WORKING_DIR=`pwd`

svn co "http://svn.wp-plugins.org/${PLUGIN}" $HOME/$PLUGIN

rm -rf $HOME/$PLUGIN/trunk/*
rsync -av --progress ./* $HOME/$PLUGIN/trunk --exclude node_modules --exclude .dev

cd $HOME/$PLUGIN
svn add * --force
svn commit -m "Pushing ${VERSION}"

svn cp trunk tags/$VERSION
svn commit -m "Taggin version ${VERSION}"

cd $WORKING_DIR
echo "https://downloads.wordpress.org/plugin/${PLUGIN}.${VERSION}.zip"