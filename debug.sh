#adb devices
#bash script to build app onto device @luke hardiman
adb start-server
adb devices | while read line
do
    if [ ! "$line" = "" ] && [ `echo $line | awk '{print $2}'` = "device" ]
    then
        device=`echo $line | awk '{print $1}'`
        #echo "$device $@ ..."
        #adb -s $device $@
        echo "ionic run android --target=$device"
	ionic run android --target=$device

    fi
done
