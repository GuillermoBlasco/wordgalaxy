#!/bin/bash
path=$1
rm -rf $path
mkdir $path
cp -rf api $path/api
cp -rf css $path/css
cp -rf img $path/img
cp -rf js $path/js
cp -f favicon.ico $path/favicon.ico
cp -f index.html $path/index.html
cp -f resultado.html $path/resultado.html