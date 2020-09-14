## How to run:
- `docker-compose up -d influxdb grafana`
- Load http://localhost:3000, and import the `grafana_dashboard.json` config to a new dashboard.
- `docker-compose run k6 run /tests/01-simple/test.js`
- `docker-compose run k6 run /tests/02-stages/test.js`
