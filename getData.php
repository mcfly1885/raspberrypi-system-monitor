<?php
header("Content-Type: application/json; charset=UTF-8");


$uptime = exec("uptime -p");
$uptimesince = exec("uptime -s");

/*CPU---DATA-----------------------------------------------------------------*/
$temp = exec("cat /sys/class/thermal/thermal_zone0/temp")/1000;
$freq = exec("cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq") /1000;


/*MEMORY---DATA--------------------------------------------------------------*/
$mem = exec("free  -h | grep Mem: | awk '{print substr($2,0,3)}'");
$memused = exec("free  -h | grep Mem: | awk '{print substr($3,0,3)}'");
$memfree = exec("free  -h | grep Mem: | awk '{print substr($4,0,3)}'");
/*Swap-------------*/
$swap = exec("free  -h | grep Swap: | awk '{print ($2,0,4)}'");
$swapused = exec("free  -h | grep Swap: | awk '{print substr($3,0,3)}'");
$swapfree = exec("free  -h | grep Swap: | awk '{print substr($4,0,3)}'");
/*SD-CARD---DATA-------------------------------------------------------------*/
$sd = exec("df -h | grep /dev/mmcblk0p2 | awk '{print $2}' | tr -d 'G'");
$sdused = exec("df -h | grep /dev/mmcblk0p2 | awk '{print $3}' | tr -d 'G'");
$sdfree = exec("df -h | grep /dev/mmcblk0p2 | awk '{print $4}' | tr -d 'G'");

$data = [
	"uptime"=>$uptime,
	"uptimesince"=>$uptimesince,
	"temp"=>$temp,
	"freq"=>$freq,
	"used"=>$memused,
	"free"=>$memfree,
	"memtotal"=>$mem,
	"swap"=>floatval($swap),
	"swapused"=>floatval($swapused),
	"swapfree"=>floatval($swapfree),
	"sd"=>$sd,
	"sdused"=>$sdused,
	"sdfree"=>$sdfree
	
];

echo json_encode($data);
?>

