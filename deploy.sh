#!/bin/bash

rm -Rf ../../http/gedure/public/static
cp -Rf backend/* ../../http/gedure
chmod -R 775 ../../http/gedure/storage
chmod -R 775 ../../http/gedure/bootstrap