#!/bin/bash - 

#notes npm install -g bootprint bootprint-openapi bootprint-swagger

docker run -v ${PWD}:/local weiyang/swagger-codegen generate -i /local/enrollmentlite-api-rest/api/swagger/swagger.yaml -l swagger -o /local/docs

bootprint openapi docs/swagger.json docs/html
