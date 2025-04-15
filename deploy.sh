#!/bin/bash
    echo hi123
    chmod 777 build.sh
    echo build
    docker build -t test .
    docker login -u varshni057 -p @Varshni@1407
    docker tag test varshni057/devops5
    docker push varshni057/devops5

