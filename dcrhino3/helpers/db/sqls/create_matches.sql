CREATE TABLE `matches` (
	`match_id` VARCHAR(50) NOT NULL COLLATE 'utf8_bin',
	`bench_name` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`digitizer_id` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`files_ids` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`hole_id` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`hole_name` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`pattern_name` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`rig_id` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`sensor_id` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`start_time_max` INT(11) NULL DEFAULT NULL,
	`start_time_min` INT(11) NULL DEFAULT NULL,
	`solution` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`solution_label` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_bin',
	PRIMARY KEY (`match_id`),
	INDEX `bench_name` (`bench_name`),
	INDEX `digitizer_id` (`digitizer_id`),
	INDEX `hole_id` (`hole_id`),
	INDEX `rig_id` (`rig_id`),
	INDEX `sensor_id` (`sensor_id`),
	INDEX `pattern_name` (`pattern_name`),
	INDEX `hole_name` (`hole_name`),
	INDEX `solution_label` (`solution_label`)
)
COLLATE='utf8_bin'
ENGINE=InnoDB
;
