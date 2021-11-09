#!/bin/sh

echo "waiting for redis server to start..."
./wait-for db:6379

echo "waiting for mongodb to start..."
./wait-for db:27017

echo "starting the server..."
npm run buildjs