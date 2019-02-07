#!/bin/bash
local_folder=$1
server=$2
remote_folder=$3

#sleep_interval=1
sleep_interval=$4

#server="deploy@13.77.162.25"
# server="thiago@10.0.0.33"

echo "Creating remote_folder: "$server:$remote_folder
ssh $server mkdir -p $remote_folder

while :
do
	echo "Uploading data"
	# echo $local_folder $server:$remote_folder
	rsync -azP --exclude 'traces*' $local_folder $server:$remote_folder
	sleep $sleep_interval
done
