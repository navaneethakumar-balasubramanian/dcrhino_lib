CREATE TABLE `raw_files` (
	`raw_file_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`file_path` TEXT NOT NULL COLLATE 'utf8_bin',
	`rig_id` VARCHAR(90) NOT NULL COLLATE 'utf8_bin',
	`sensor_id` VARCHAR(90) NOT NULL COLLATE 'utf8_bin',
	`digitizer_id` VARCHAR(90) NOT NULL COLLATE 'utf8_bin',
	`min_ts` INT(11) NOT NULL,
	`max_ts` INT(11) NOT NULL,
	`config_str` TEXT NOT NULL COLLATE 'utf8_bin',
	`type` INT(11) UNSIGNED NOT NULL,
	PRIMARY KEY (`raw_file_id`)
)
COLLATE='utf8_bin'
ENGINE=InnoDB
;
