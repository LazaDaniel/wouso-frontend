#!/bin/bash

set +x

server=$1

if [ -z "$server" ]; then server="th"; fi 

yarn build

scp -r build $server:

ssh $server sudo cp -r build/* /var/www/html/
