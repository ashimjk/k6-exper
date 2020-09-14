run:
	k6 run sample/script.js

with-vm:
	k6 run --vus 10 --duration 30s sample/script.js

output:
	k6 run --out json=sample/test.json sample/script.js

summary:
	k6 run --summary-export=sample/export.json sample/script.js

env:
	k6 run -e MY_HOSTNAME=test.k6.io exercise/env/env.js

visual1:
	docker-compose run k6 run /tests/01-simple/test.js
