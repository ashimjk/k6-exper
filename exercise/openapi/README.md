## Generate K6 script from openapi
```shell script
docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate \
    -i https://apis-stg.corporate-dev.progressoft.cloud/auditing/activity/v2/api-docs \
    -g k6 \
    -o /local/k6-test/ \
    --skip-validate-spec
```
