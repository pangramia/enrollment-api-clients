#docker run -v $(dirname "$(pwd)"):/local weiyang/swagger-codegen generate -i /local/enrollmentlite-api/enrollmentlite-restapi/api/swagger/swagger.yaml -l typescript-angular2  -o /local/enrollmentlite-site/src/app/shared/services
# git checkout swagger-codegen master 
# mvn package  -Dmaven.test.skip=true
# cp swagger-codegen-cli.jar to bin

# java  -jar /opt/swagger-codegen/modules/swagger-codegen-cli/target/swagger-codegen-cli.jar  generate -i enrollmentlite-api/enrollmentlite-restapi/api/swagger/swagger.yaml -l typescript-angular2  -o enrollmentlite-site/src/app/shared/services

java  -jar ../bin/swagger-codegen-cli.jar generate -i ../enrollmentlite-api-rest/api/swagger/swagger.yaml -l typescript-angular  -o src/app/shared/api

