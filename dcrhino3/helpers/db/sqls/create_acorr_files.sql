CREATE TABLE IF NOT EXISTS `acorr_files` (
	`acorr_file_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`bench_name` VARCHAR(90) NOT NULL COLLATE 'utf8_bin',
	`pattern_name` VARCHAR(90) NOT NULL COLLATE 'utf8_bin',
	`hole_name` VARCHAR(90) NOT NULL COLLATE 'utf8_bin',
	`hole_id` VARCHAR(90) NOT NULL COLLATE 'utf8_bin',
	`rig_id` VARCHAR(90) NOT NULL COLLATE 'utf8_bin',
	`sensor_id` VARCHAR(90) NOT NULL COLLATE 'utf8_bin',
	`digitizer_id` VARCHAR(90) NOT NULL COLLATE 'utf8_bin',
	`min_ts` INT(10) UNSIGNED NOT NULL DEFAULT '0',
	`max_ts` INT(10) UNSIGNED NOT NULL DEFAULT '0',
	`filename` TEXT NOT NULL COLLATE 'utf8_bin',
	`bo_id` VARCHAR(255) NOT NULL COLLATE 'utf8_bin',
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`acorr_file_id`),
	UNIQUE INDEX `bo_id_unique` (`bo_id`),
	INDEX `digitizer_id` (`digitizer_id`),
	INDEX `sensor_id` (`sensor_id`),
	INDEX `rig_id` (`rig_id`),
	INDEX `hole_id` (`hole_id`),
	INDEX `hole_name` (`hole_name`),
	INDEX `pattern_name` (`pattern_name`),
	INDEX `bench_name` (`bench_name`),
	INDEX `bo_id` (`bo_id`),
	INDEX `created_at` (`created_at`)
)
COLLATE='utf8_bin'
ENGINE=InnoDB
;