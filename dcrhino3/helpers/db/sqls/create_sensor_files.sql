CREATE TABLE IF NOT EXISTS `sensor_files` (
	`sensor_file_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`file_path` VARCHAR(255) NOT NULL COLLATE 'utf8_bin',
	`rig_id` VARCHAR(90) NOT NULL COLLATE 'utf8_bin',
	`sensor_id` VARCHAR(90) NOT NULL COLLATE 'utf8_bin',
	`digitizer_id` VARCHAR(90) NOT NULL COLLATE 'utf8_bin',
	`min_ts` INT(11) NOT NULL,
	`max_ts` INT(11) NOT NULL,
	`config_str` TEXT NOT NULL COLLATE 'utf8_bin',
	`type` INT(11) UNSIGNED NOT NULL,
	`status` ENUM('valid','invalid','processing','error') NULL DEFAULT NULL COLLATE 'utf8_bin',
	`file_name` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`original_file_record_day` INT(11) NOT NULL,
	`updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`file_changed_at` FLOAT NOT NULL,
	`file_size` INT NOT NULL,

	PRIMARY KEY (`sensor_file_id`),
	UNIQUE INDEX `file_path` (`file_path`),
	INDEX `rig_id` (`rig_id`),
	INDEX `sensor_id` (`sensor_id`),
	INDEX `digitizer_id` (`digitizer_id`),
	INDEX `min_ts` (`min_ts`),
	INDEX `max_ts` (`max_ts`),
	INDEX `type` (`type`),
	INDEX `status` (`status`),
	INDEX `file_name` (`file_name`)
)
COLLATE='utf8_bin'
ENGINE=InnoDB
AUTO_INCREMENT=0
;
