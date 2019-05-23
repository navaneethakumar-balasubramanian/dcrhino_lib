CREATE TABLE IF NOT EXISTS `sensor_files` (
	`sensor_file_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`file_path` TEXT NOT NULL COLLATE 'utf8_bin',
	`rig_id` VARCHAR(90) NOT NULL COLLATE 'utf8_bin',
	`sensor_id` VARCHAR(90) NOT NULL COLLATE 'utf8_bin',
	`digitizer_id` VARCHAR(90) NOT NULL COLLATE 'utf8_bin',
	`min_ts` INT(11) NOT NULL,
	`max_ts` INT(11) NOT NULL,
	`config_str` TEXT NOT NULL COLLATE 'utf8_bin',
	`archived` TINYINT(4) NULL DEFAULT '0',
	`type` INT(11) UNSIGNED NOT NULL,
	PRIMARY KEY (`sensor_file_id`),
	INDEX `min_ts` (`min_ts`),
	INDEX `max_ts` (`max_ts`),
	INDEX `rig_id` (`rig_id`),
	INDEX `sensor_id` (`sensor_id`),
	INDEX `digitizer_id` (`digitizer_id`),
	INDEX `archived` (`archived`)
)
COLLATE='utf8_bin'
ENGINE=InnoDB
;
