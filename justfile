install:
	npm run build && python3 runners/install.py --name LiveRemote

watch:
	python3 runners/watch.py --version 'Live 12.0.15'

close-set:
	pkill -x Ableton Live 12 Suite

open-set:
	open set/set.als

reload:
	just install && just close-set && sleep 1 && just open-set

rename:
	python3 runners/rename.py