#!/bin/bash
local_folder=$1

server=$2
#server="deploy@13.77.162.25"
#server="thiago@10.0.0.33"

remote_folder=$3

#sleep_interval=1
sleep_interval=$4

stats_folder=$5
#stats_folder="/tmp/dcrhino"

echo "Creating remote_folder: "$server:$remote_folder
ssh $server mkdir -p $remote_folder

while :
do
	echo "Uploading data"
	# echo $local_folder $server:$remote_folder
	rsync -azP --exclude '*RTR*' --exclude "*.tmp" $local_folder $server:$remote_folder
	rsync -azP --exclude 'system_health.npy' $stats_folder $server:$remote_folder
	sleep $sleep_interval
done
