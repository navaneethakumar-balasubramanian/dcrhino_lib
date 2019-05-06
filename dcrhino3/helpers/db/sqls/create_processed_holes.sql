CREATE TABLE `processed_holes` (
	`processed_hole_id` INT(11) NOT NULL AUTO_INCREMENT,
	`processed_at_ts` INT(11) NULL DEFAULT NULL,
	`seconds_processed` INT(11) NULL DEFAULT NULL,
	`hole_id` VARCHAR(90) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`bench_name` VARCHAR(90) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`pattern_name` VARCHAR(90) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`hole_name` VARCHAR(90) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`rig_id` VARCHAR(90) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`sensor_id` VARCHAR(90) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`digitizer_id` VARCHAR(90) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`sensor_accelerometer_type` INT(11) NULL DEFAULT NULL,
	`sensor_saturation_g` INT(11) NULL DEFAULT NULL,
	`flow_id` VARCHAR(250) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`output_folder_name` VARCHAR(250) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`to_mp` TINYINT(1) NULL DEFAULT '0',
	`process_id` INT(11) NULL DEFAULT NULL,
	`archived` TINYINT(4) NULL DEFAULT '0',
	PRIMARY KEY (`processed_hole_id`),
	INDEX `processed_at_ts` (`processed_at_ts`),
	INDEX `process_id` (`process_id`),
	INDEX `to_mp` (`to_mp`),
	INDEX `archived` (`archived`),
	INDEX `hole_id` (`hole_id`),
	INDEX `bench_name` (`bench_name`),
	INDEX `pattern_name` (`pattern_name`),
	INDEX `hole_name` (`hole_name`),
	INDEX `rig_id` (`rig_id`),
	INDEX `sensor_id` (`sensor_id`),
	INDEX `digitizer_id` (`digitizer_id`),
	INDEX `flow_id` (`flow_id`)
)
COLLATE='utf8_bin'
ENGINE=InnoDB
;
