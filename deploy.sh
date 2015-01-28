#!/bin/bash
path=$1
mkdir $path
cp -r api $path/api
cp -r css $path/css
cp -r img $path/img
cp -r js $path/js
cp favicon.ico $path/favicon.ico
cp index.html $path/index.html
cp resultado.html $path/resultado.html