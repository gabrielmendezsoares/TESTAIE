SET FOREIGN_KEY_CHECKS = 0;


DROP TABLE IF EXISTS `api_types`;
DROP TABLE IF EXISTS `application_types`;
DROP TABLE IF EXISTS `bulletin_grouping_types`;
DROP TABLE IF EXISTS `database_types`;
DROP TABLE IF EXISTS `data_types`;
DROP TABLE IF EXISTS `method_types`;
DROP TABLE IF EXISTS `service_types`;
DROP TABLE IF EXISTS `table_types`;


DROP TABLE IF EXISTS `apis`;
DROP TABLE IF EXISTS `queries`;
DROP TABLE IF EXISTS `sankhya_database_configuration`;
DROP TABLE IF EXISTS `segware_configuration`;
DROP TABLE IF EXISTS `sigma_desktop_database_configuration`;
DROP TABLE IF EXISTS `three_mod_database_configuration`;
DROP TABLE IF EXISTS `users`;


SET FOREIGN_KEY_CHECKS = 1;


CREATE TABLE `api_types` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`api_type` VARCHAR(191) NOT NULL UNIQUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (`id`),
    
    INDEX `idx_api_type` (`api_type`),
	INDEX `idx_created_at` (`created_at`),
    INDEX `idx_updated_at` (`updated_at`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `application_types` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `application_type` VARCHAR(191) NOT NULL UNIQUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   
	PRIMARY KEY (`id`),
    
    INDEX `idx_application_type` (`application_type`),
	INDEX `idx_created_at` (`created_at`),
    INDEX `idx_updated_at` (`updated_at`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `bulletin_grouping_types` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `bulletin_grouping_type` VARCHAR(191) NOT NULL UNIQUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (`id`),
    
    INDEX `idx_bulletin_grouping_type` (`bulletin_grouping_type`),
	INDEX `idx_created_at` (`created_at`),
    INDEX `idx_updated_at` (`updated_at`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `database_types` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `database_type` VARCHAR(191) NOT NULL UNIQUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (`id`),
    
    INDEX `idx_database_type` (`database_type`),
	INDEX `idx_created_at` (`created_at`),
    INDEX `idx_updated_at` (`updated_at`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `data_types` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`data_type` VARCHAR(191) NOT NULL UNIQUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (`id`),
    
    INDEX `idx_data_type` (`data_type`),
	INDEX `idx_created_at` (`created_at`),
    INDEX `idx_updated_at` (`updated_at`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `method_types` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `method_type` VARCHAR(191) NOT NULL UNIQUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (`id`),
    
    INDEX `idx_method_type` (`method_type`),
	INDEX `idx_created_at` (`created_at`),
    INDEX `idx_updated_at` (`updated_at`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `service_types` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `service_type` VARCHAR(191) NOT NULL UNIQUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (`id`),
    
    INDEX `idx_service_type` (`service_type`),
	INDEX `idx_created_at` (`created_at`),
    INDEX `idx_updated_at` (`updated_at`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `table_types` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `table_type` VARCHAR(191) NOT NULL UNIQUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (`id`),
    
    INDEX `idx_table_type` (`table_type`),
	INDEX `idx_created_at` (`created_at`),
    INDEX `idx_updated_at` (`updated_at`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `apis` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191),
    `application_type` VARCHAR(191) NOT NULL,
	`service_type` VARCHAR(191) NOT NULL,
    `data_type` VARCHAR(191) NOT NULL,
    `label_map` JSON,
    `bulletin_grouping_type` VARCHAR(191),
    `bulletin_formatting_content_selection_filter_list` JSON,
    `bulletin_formatting_content_separator_list` JSON,
    `bulletin_formatting_label_list` JSON,
    `method_type` VARCHAR(191) NOT NULL,
	`authentication_endpoint` VARCHAR(191),
    `data_endpoint` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `body` JSON,
	`is_bulletin_formatting_key_value_label` BOOLEAN,
    `is_api_active` BOOLEAN NOT NULL DEFAULT TRUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (`id`),
    
    FOREIGN KEY (`application_type`) REFERENCES `application_types`(`application_type`) ON DELETE CASCADE,
	FOREIGN KEY (`service_type`) REFERENCES `service_types`(`service_type`) ON DELETE CASCADE,
	FOREIGN KEY (`data_type`) REFERENCES `data_types`(`data_type`) ON DELETE CASCADE,
    FOREIGN KEY (`bulletin_grouping_type`) REFERENCES `bulletin_grouping_types`(`bulletin_grouping_type`) ON DELETE CASCADE,
    FOREIGN KEY (`method_type`) REFERENCES `method_types`(`method_type`) ON DELETE CASCADE,
    
    INDEX `idx_title` (`title`),
    INDEX `idx_subtitle` (`subtitle`),
    INDEX `idx_application_type` (`application_type`),
    INDEX `idx_service_type` (`service_type`),
    INDEX `idx_data_type` (`data_type`),
    INDEX `idx_bulletin_grouping_type` (`bulletin_grouping_type`),
    INDEX `idx_method_type` (`method_type`),
    INDEX `idx_authentication_endpoint` (`authentication_endpoint`),
    INDEX `idx_data_endpoint` (`data_endpoint`),
    INDEX `idx_username` (`username`),
    INDEX `idx_password` (`password`),
	INDEX `idx_is_bulletin_formatting_key_value_label` (`is_bulletin_formatting_key_value_label`),
    INDEX `idx_is_api_active` (`is_api_active`),
	INDEX `idx_created_at` (`created_at`),
    INDEX `idx_updated_at` (`updated_at`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `queries` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191),
    `application_type` VARCHAR(191) NOT NULL,
	`service_type` VARCHAR(191) NOT NULL,
    `data_type` VARCHAR(191) NOT NULL,
    `label_map` JSON,
    `bulletin_grouping_type` VARCHAR(191),
    `bulletin_formatting_content_selection_filter_list` JSON,
    `bulletin_formatting_content_separator_list` JSON,
    `bulletin_formatting_label_list` JSON,
    `database_type` VARCHAR(191) NOT NULL,
    `sql` LONGTEXT NOT NULL,
	`is_bulletin_formatting_key_value_label` BOOLEAN,
    `is_query_periodic` BOOLEAN NOT NULL DEFAULT FALSE,
    `is_query_active` BOOLEAN NOT NULL DEFAULT TRUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (`id`),
    
    FOREIGN KEY (`application_type`) REFERENCES `application_types`(`application_type`) ON DELETE CASCADE,
	FOREIGN KEY (`service_type`) REFERENCES `service_types`(`service_type`) ON DELETE CASCADE,
	FOREIGN KEY (`data_type`) REFERENCES `data_types`(`data_type`) ON DELETE CASCADE,
    FOREIGN KEY (`bulletin_grouping_type`) REFERENCES `bulletin_grouping_types`(`bulletin_grouping_type`) ON DELETE CASCADE,
    FOREIGN KEY (`database_type`) REFERENCES `database_types`(`database_type`) ON DELETE CASCADE,
    
    INDEX `idx_title` (`title`),
    INDEX `idx_subtitle` (`subtitle`),
    INDEX `idx_application_type` (`application_type`),
    INDEX `idx_service_type` (`service_type`),
    INDEX `idx_data_type` (`data_type`),
    INDEX `idx_bulletin_grouping_type` (`bulletin_grouping_type`),
    INDEX `idx_database_type` (`database_type`),
	INDEX `idx_is_bulletin_formatting_key_value_label` (`is_bulletin_formatting_key_value_label`),
	INDEX `idx_is_query_periodic` (`is_query_periodic`),
	INDEX `idx_is_query_active` (`is_query_active`),
	INDEX `idx_created_at` (`created_at`),
    INDEX `idx_updated_at` (`updated_at`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `sankhya_database_configuration` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `instant_client_path` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `connect_string` VARCHAR(191) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (`id`),
    
	INDEX `idx_instant_client_path` (`instant_client_path`),
	INDEX `idx_username` (`username`),
    INDEX `idx_password` (`password`),
    INDEX `idx_connect_string` (`connect_string`),
	INDEX `idx_created_at` (`created_at`),
    INDEX `idx_updated_at` (`updated_at`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `segware_configuration` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`auth_endpoint` VARCHAR(191) NOT NULL,
    `events_endpoint` VARCHAR(191) NOT NULL,
    `service_orders_endpoint` VARCHAR(191) NOT NULL,
    `system_status_endpoint` VARCHAR(191) NOT NULL,
	`username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
	`token` LONGTEXT NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (`id`),
    
	INDEX `idx_auth_endpoint` (`auth_endpoint`),
    INDEX `idx_events_endpoint` (`events_endpoint`),
    INDEX `idx_service_orders_endpoint` (`service_orders_endpoint`),
    INDEX `idx_system_status_endpoint` (`system_status_endpoint`),
	INDEX `idx_username` (`username`),
    INDEX `idx_password` (`password`),
	INDEX `idx_created_at` (`created_at`),
    INDEX `idx_updated_at` (`updated_at`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `sigma_desktop_database_configuration` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `host` VARCHAR(191) NOT NULL,
    `database` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (`id`),
    
	INDEX `idx_host` (`host`),
    INDEX `idx_database` (`database`),
	INDEX `idx_username` (`username`),
    INDEX `idx_password` (`password`),
	INDEX `idx_created_at` (`created_at`),
    INDEX `idx_updated_at` (`updated_at`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `three_mod_database_configuration` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `host` VARCHAR(191) NOT NULL,
    `database` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (`id`),
    
	INDEX `idx_host` (`host`),
    INDEX `idx_database` (`database`),
	INDEX `idx_username` (`username`),
    INDEX `idx_password` (`password`),
	INDEX `idx_created_at` (`created_at`),
    INDEX `idx_updated_at` (`updated_at`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `application_type` VARCHAR(191) NOT NULL,
	`username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role_list` JSON NOT NULL,
    `is_user_active` BOOLEAN NOT NULL DEFAULT TRUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (`id`),
    
    FOREIGN KEY (`application_type`) REFERENCES `application_types`(`application_type`) ON DELETE CASCADE,
    
    UNIQUE KEY `unique_application_type_username` (`application_type`, `username`), 
    
	INDEX `idx_application_type` (`application_type`),
	INDEX `idx_username` (`username`),
    INDEX `idx_password` (`password`),
	INDEX `idx_is_user_active` (`is_user_active`),
	INDEX `idx_created_at` (`created_at`),
    INDEX `idx_updated_at` (`updated_at`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DELIMITER $$


CREATE TRIGGER `apis_bulletin_formatting_content_selection_filter_list_insert`
BEFORE INSERT ON `apis`
FOR EACH ROW
BEGIN
    DECLARE is_valid BOOLEAN DEFAULT TRUE;
    DECLARE error_message VARCHAR(255);
    
    IF NEW.`bulletin_formatting_content_selection_filter_list` IS NOT NULL THEN
        IF JSON_TYPE(NEW.`bulletin_formatting_content_selection_filter_list`) != 'ARRAY' THEN
            SET is_valid = FALSE;
            SET error_message = 'bulletin_formatting_content_selection_filter_list must be an array';
        ELSE
            SET @first_level_length = JSON_LENGTH(NEW.`bulletin_formatting_content_selection_filter_list`);
            SET @i = 0;

            WHILE @i < @first_level_length AND is_valid = TRUE DO
                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, ']'))) != 'ARRAY' THEN
                    SET is_valid = FALSE;
                    SET error_message = CONCAT('Item at first level index ', @i, ' is not an array');
                ELSE
                    SET @second_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, ']')));
                    SET @j = 0;
                    
                    WHILE @j < @second_level_length AND is_valid = TRUE DO
                        IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, '][', @j, ']'))) != 'ARRAY' THEN
                            SET is_valid = FALSE;
                            SET error_message = CONCAT('Item at index [', @i, '][', @j, '] is not an array');
                        ELSE
                            SET @third_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, '][', @j, ']')));
                            SET @k = 0;
                            
                            WHILE @k < @third_level_length AND is_valid = TRUE DO
                                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, '][', @j, '][', @k, ']'))) != 'STRING' THEN
                                    SET is_valid = FALSE;
                                    SET error_message = CONCAT('Item at index [', @i, '][', @j, '][', @k, '] is not a string');
                                END IF;
                                
                                SET @k = @k + 1;
                            END WHILE;
                        END IF;
                        
                        SET @j = @j + 1;
                    END WHILE;
                END IF;
                
                SET @i = @i + 1;
            END WHILE;
        END IF;
        
        IF is_valid = FALSE THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = error_message;
        END IF;
    END IF;
END$$

CREATE TRIGGER `apis_bulletin_formatting_content_selection_filter_list_update`
BEFORE UPDATE ON `apis`
FOR EACH ROW
BEGIN
    DECLARE is_valid BOOLEAN DEFAULT TRUE;
    DECLARE error_message VARCHAR(255);
    
    IF NEW.`bulletin_formatting_content_selection_filter_list` IS NOT NULL THEN
        IF JSON_TYPE(NEW.`bulletin_formatting_content_selection_filter_list`) != 'ARRAY' THEN
            SET is_valid = FALSE;
            SET error_message = 'bulletin_formatting_content_selection_filter_list must be an array';
        ELSE
            SET @first_level_length = JSON_LENGTH(NEW.`bulletin_formatting_content_selection_filter_list`);
            SET @i = 0;

            WHILE @i < @first_level_length AND is_valid = TRUE DO
                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, ']'))) != 'ARRAY' THEN
                    SET is_valid = FALSE;
                    SET error_message = CONCAT('Item at first level index ', @i, ' is not an array');
                ELSE
                    SET @second_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, ']')));
                    SET @j = 0;
                    
                    WHILE @j < @second_level_length AND is_valid = TRUE DO
                        IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, '][', @j, ']'))) != 'ARRAY' THEN
                            SET is_valid = FALSE;
                            SET error_message = CONCAT('Item at index [', @i, '][', @j, '] is not an array');
                        ELSE
                            SET @third_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, '][', @j, ']')));
                            SET @k = 0;
                            
                            WHILE @k < @third_level_length AND is_valid = TRUE DO
                                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, '][', @j, '][', @k, ']'))) != 'STRING' THEN
                                    SET is_valid = FALSE;
                                    SET error_message = CONCAT('Item at index [', @i, '][', @j, '][', @k, '] is not a string');
                                END IF;
                                
                                SET @k = @k + 1;
                            END WHILE;
                        END IF;
                        
                        SET @j = @j + 1;
                    END WHILE;
                END IF;
                
                SET @i = @i + 1;
            END WHILE;
        END IF;
        
        IF is_valid = FALSE THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = error_message;
        END IF;
    END IF;
END$$


CREATE TRIGGER `apis_bulletin_formatting_content_separator_list_insert`
BEFORE INSERT ON `apis`
FOR EACH ROW
BEGIN
    DECLARE is_valid BOOLEAN DEFAULT TRUE;
    DECLARE error_message VARCHAR(255);
    
    IF NEW.`bulletin_formatting_content_separator_list` IS NOT NULL THEN
        IF JSON_TYPE(NEW.`bulletin_formatting_content_separator_list`) != 'ARRAY' THEN
            SET is_valid = FALSE;
            SET error_message = 'bulletin_formatting_content_separator_list must be an array';
        ELSE
            SET @first_level_length = JSON_LENGTH(NEW.`bulletin_formatting_content_separator_list`);
            SET @i = 0;

            WHILE @i < @first_level_length AND is_valid = TRUE DO
                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, ']'))) != 'ARRAY' THEN
                    SET is_valid = FALSE;
                    SET error_message = CONCAT('Item at first level index ', @i, ' is not an array');
                ELSE
                    SET @second_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, ']')));
                    SET @j = 0;
                    
                    WHILE @j < @second_level_length AND is_valid = TRUE DO
                        IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, '][', @j, ']'))) != 'ARRAY' THEN
                            SET is_valid = FALSE;
                            SET error_message = CONCAT('Item at index [', @i, '][', @j, '] is not an array');
                        ELSE
                            SET @third_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, '][', @j, ']')));
                            SET @k = 0;
                            
                            WHILE @k < @third_level_length AND is_valid = TRUE DO
                                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, '][', @j, '][', @k, ']'))) != 'STRING' THEN
                                    SET is_valid = FALSE;
                                    SET error_message = CONCAT('Item at index [', @i, '][', @j, '][', @k, '] is not a string');
                                END IF;
                                
                                SET @k = @k + 1;
                            END WHILE;
                        END IF;
                        
                        SET @j = @j + 1;
                    END WHILE;
                END IF;
                
                SET @i = @i + 1;
            END WHILE;
        END IF;
        
        IF is_valid = FALSE THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = error_message;
        END IF;
    END IF;
END$$

CREATE TRIGGER `apis_bulletin_formatting_content_separator_list_update`
BEFORE UPDATE ON `apis`
FOR EACH ROW
BEGIN
    DECLARE is_valid BOOLEAN DEFAULT TRUE;
    DECLARE error_message VARCHAR(255);
    
    IF NEW.`bulletin_formatting_content_separator_list` IS NOT NULL THEN
        IF JSON_TYPE(NEW.`bulletin_formatting_content_separator_list`) != 'ARRAY' THEN
            SET is_valid = FALSE;
            SET error_message = 'bulletin_formatting_content_separator_list must be an array';
        ELSE
            SET @first_level_length = JSON_LENGTH(NEW.`bulletin_formatting_content_separator_list`);
            SET @i = 0;

            WHILE @i < @first_level_length AND is_valid = TRUE DO
                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, ']'))) != 'ARRAY' THEN
                    SET is_valid = FALSE;
                    SET error_message = CONCAT('Item at first level index ', @i, ' is not an array');
                ELSE
                    SET @second_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, ']')));
                    SET @j = 0;
                    
                    WHILE @j < @second_level_length AND is_valid = TRUE DO
                        IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, '][', @j, ']'))) != 'ARRAY' THEN
                            SET is_valid = FALSE;
                            SET error_message = CONCAT('Item at index [', @i, '][', @j, '] is not an array');
                        ELSE
                            SET @third_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, '][', @j, ']')));
                            SET @k = 0;
                            
                            WHILE @k < @third_level_length AND is_valid = TRUE DO
                                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, '][', @j, '][', @k, ']'))) != 'STRING' THEN
                                    SET is_valid = FALSE;
                                    SET error_message = CONCAT('Item at index [', @i, '][', @j, '][', @k, '] is not a string');
                                END IF;
                                
                                SET @k = @k + 1;
                            END WHILE;
                        END IF;
                        
                        SET @j = @j + 1;
                    END WHILE;
                END IF;
                
                SET @i = @i + 1;
            END WHILE;
        END IF;
        
        IF is_valid = FALSE THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = error_message;
        END IF;
    END IF;
END$$


CREATE TRIGGER `apis_bulletin_formatting_label_list_insert`
BEFORE INSERT ON `apis`
FOR EACH ROW
BEGIN
    DECLARE is_valid BOOLEAN DEFAULT TRUE;
    DECLARE error_message VARCHAR(255);
    
    IF NEW.`bulletin_formatting_label_list` IS NOT NULL THEN
        IF JSON_TYPE(NEW.`bulletin_formatting_label_list`) != 'ARRAY' THEN
            SET is_valid = FALSE;
            SET error_message = 'bulletin_formatting_label_list must be an array';
        ELSE
            SET @first_level_length = JSON_LENGTH(NEW.`bulletin_formatting_label_list`);
            SET @i = 0;

            WHILE @i < @first_level_length AND is_valid = TRUE DO
                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_label_list`, CONCAT('$[', @i, ']'))) != 'ARRAY' THEN
                    SET is_valid = FALSE;
                    SET error_message = CONCAT('Item at first level index ', @i, ' is not an array');
                ELSE
                    SET @second_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_label_list`, CONCAT('$[', @i, ']')));
                    
                    SET @j = 0;
                    WHILE @j < @second_level_length AND is_valid = TRUE DO
                        IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_label_list`, CONCAT('$[', @i, '][', @j, ']'))) != 'STRING' THEN
                            SET is_valid = FALSE;
                            SET error_message = CONCAT('Item at index [', @i, '][', @j, '] is not a string');
                        END IF;
                       
                       SET @j = @j + 1;
                    END WHILE;
                END IF;
                
                SET @i = @i + 1;
            END WHILE;
        END IF;
        
        IF is_valid = FALSE THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = error_message;
        END IF;
    END IF;
END$$

CREATE TRIGGER `apis_bulletin_formatting_label_list_update`
BEFORE UPDATE ON `apis`
FOR EACH ROW
BEGIN
    DECLARE is_valid BOOLEAN DEFAULT TRUE;
    DECLARE error_message VARCHAR(255);
    
    IF NEW.`bulletin_formatting_label_list` IS NOT NULL THEN
        IF JSON_TYPE(NEW.`bulletin_formatting_label_list`) != 'ARRAY' THEN
            SET is_valid = FALSE;
            SET error_message = 'bulletin_formatting_label_list must be an array';
        ELSE
            SET @first_level_length = JSON_LENGTH(NEW.`bulletin_formatting_label_list`);
            SET @i = 0;

            WHILE @i < @first_level_length AND is_valid = TRUE DO
                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_label_list`, CONCAT('$[', @i, ']'))) != 'ARRAY' THEN
                    SET is_valid = FALSE;
                    SET error_message = CONCAT('Item at first level index ', @i, ' is not an array');
                ELSE
                    SET @second_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_label_list`, CONCAT('$[', @i, ']')));
                    
                    SET @j = 0;
                    WHILE @j < @second_level_length AND is_valid = TRUE DO
                        IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_label_list`, CONCAT('$[', @i, '][', @j, ']'))) != 'STRING' THEN
                            SET is_valid = FALSE;
                            SET error_message = CONCAT('Item at index [', @i, '][', @j, '] is not a string');
                        END IF;
                       
                       SET @j = @j + 1;
                    END WHILE;
                END IF;
                
                SET @i = @i + 1;
            END WHILE;
        END IF;
        
        IF is_valid = FALSE THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = error_message;
        END IF;
    END IF;
END$$


CREATE TRIGGER `queries_bulletin_formatting_content_selection_filter_list_insert`
BEFORE INSERT ON `queries`
FOR EACH ROW
BEGIN
    DECLARE is_valid BOOLEAN DEFAULT TRUE;
    DECLARE error_message VARCHAR(255);
    
    IF NEW.`bulletin_formatting_content_selection_filter_list` IS NOT NULL THEN
        IF JSON_TYPE(NEW.`bulletin_formatting_content_selection_filter_list`) != 'ARRAY' THEN
            SET is_valid = FALSE;
            SET error_message = 'bulletin_formatting_content_selection_filter_list must be an array';
        ELSE
            SET @first_level_length = JSON_LENGTH(NEW.`bulletin_formatting_content_selection_filter_list`);
            SET @i = 0;

            WHILE @i < @first_level_length AND is_valid = TRUE DO
                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, ']'))) != 'ARRAY' THEN
                    SET is_valid = FALSE;
                    SET error_message = CONCAT('Item at first level index ', @i, ' is not an array');
                ELSE
                    SET @second_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, ']')));
                    SET @j = 0;
                    
                    WHILE @j < @second_level_length AND is_valid = TRUE DO
                        IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, '][', @j, ']'))) != 'ARRAY' THEN
                            SET is_valid = FALSE;
                            SET error_message = CONCAT('Item at index [', @i, '][', @j, '] is not an array');
                        ELSE
                            SET @third_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, '][', @j, ']')));
                            SET @k = 0;
                            
                            WHILE @k < @third_level_length AND is_valid = TRUE DO
                                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, '][', @j, '][', @k, ']'))) != 'STRING' THEN
                                    SET is_valid = FALSE;
                                    SET error_message = CONCAT('Item at index [', @i, '][', @j, '][', @k, '] is not a string');
                                END IF;
                                
                                SET @k = @k + 1;
                            END WHILE;
                        END IF;
                        
                        SET @j = @j + 1;
                    END WHILE;
                END IF;
                
                SET @i = @i + 1;
            END WHILE;
        END IF;
        
        IF is_valid = FALSE THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = error_message;
        END IF;
    END IF;
END$$

CREATE TRIGGER `queries_bulletin_formatting_content_selection_filter_list_update`
BEFORE UPDATE ON `queries`
FOR EACH ROW
BEGIN
    DECLARE is_valid BOOLEAN DEFAULT TRUE;
    DECLARE error_message VARCHAR(255);
    
    IF NEW.`bulletin_formatting_content_selection_filter_list` IS NOT NULL THEN
        IF JSON_TYPE(NEW.`bulletin_formatting_content_selection_filter_list`) != 'ARRAY' THEN
            SET is_valid = FALSE;
            SET error_message = 'bulletin_formatting_content_selection_filter_list must be an array';
        ELSE
            SET @first_level_length = JSON_LENGTH(NEW.`bulletin_formatting_content_selection_filter_list`);
            SET @i = 0;

            WHILE @i < @first_level_length AND is_valid = TRUE DO
                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, ']'))) != 'ARRAY' THEN
                    SET is_valid = FALSE;
                    SET error_message = CONCAT('Item at first level index ', @i, ' is not an array');
                ELSE
                    SET @second_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, ']')));
                    SET @j = 0;
                    
                    WHILE @j < @second_level_length AND is_valid = TRUE DO
                        IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, '][', @j, ']'))) != 'ARRAY' THEN
                            SET is_valid = FALSE;
                            SET error_message = CONCAT('Item at index [', @i, '][', @j, '] is not an array');
                        ELSE
                            SET @third_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, '][', @j, ']')));
                            SET @k = 0;
                            
                            WHILE @k < @third_level_length AND is_valid = TRUE DO
                                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_selection_filter_list`, CONCAT('$[', @i, '][', @j, '][', @k, ']'))) != 'STRING' THEN
                                    SET is_valid = FALSE;
                                    SET error_message = CONCAT('Item at index [', @i, '][', @j, '][', @k, '] is not a string');
                                END IF;
                                
                                SET @k = @k + 1;
                            END WHILE;
                        END IF;
                        
                        SET @j = @j + 1;
                    END WHILE;
                END IF;
                
                SET @i = @i + 1;
            END WHILE;
        END IF;
        
        IF is_valid = FALSE THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = error_message;
        END IF;
    END IF;
END$$


CREATE TRIGGER `queries_bulletin_formatting_content_separator_list_insert`
BEFORE INSERT ON `queries`
FOR EACH ROW
BEGIN
    DECLARE is_valid BOOLEAN DEFAULT TRUE;
    DECLARE error_message VARCHAR(255);
    
    IF NEW.`bulletin_formatting_content_separator_list` IS NOT NULL THEN
        IF JSON_TYPE(NEW.`bulletin_formatting_content_separator_list`) != 'ARRAY' THEN
            SET is_valid = FALSE;
            SET error_message = 'bulletin_formatting_content_separator_list must be an array';
        ELSE
            SET @first_level_length = JSON_LENGTH(NEW.`bulletin_formatting_content_separator_list`);
            SET @i = 0;

            WHILE @i < @first_level_length AND is_valid = TRUE DO
                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, ']'))) != 'ARRAY' THEN
                    SET is_valid = FALSE;
                    SET error_message = CONCAT('Item at first level index ', @i, ' is not an array');
                ELSE
                    SET @second_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, ']')));
                    SET @j = 0;
                    
                    WHILE @j < @second_level_length AND is_valid = TRUE DO
                        IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, '][', @j, ']'))) != 'ARRAY' THEN
                            SET is_valid = FALSE;
                            SET error_message = CONCAT('Item at index [', @i, '][', @j, '] is not an array');
                        ELSE
                            SET @third_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, '][', @j, ']')));
                            SET @k = 0;
                            
                            WHILE @k < @third_level_length AND is_valid = TRUE DO
                                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, '][', @j, '][', @k, ']'))) != 'STRING' THEN
                                    SET is_valid = FALSE;
                                    SET error_message = CONCAT('Item at index [', @i, '][', @j, '][', @k, '] is not a string');
                                END IF;
                                
                                SET @k = @k + 1;
                            END WHILE;
                        END IF;
                        
                        SET @j = @j + 1;
                    END WHILE;
                END IF;
                
                SET @i = @i + 1;
            END WHILE;
        END IF;
        
        IF is_valid = FALSE THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = error_message;
        END IF;
    END IF;
END$$

CREATE TRIGGER `queries_bulletin_formatting_content_separator_list_update`
BEFORE UPDATE ON `queries`
FOR EACH ROW
BEGIN
    DECLARE is_valid BOOLEAN DEFAULT TRUE;
    DECLARE error_message VARCHAR(255);
    
    IF NEW.`bulletin_formatting_content_separator_list` IS NOT NULL THEN
        IF JSON_TYPE(NEW.`bulletin_formatting_content_separator_list`) != 'ARRAY' THEN
            SET is_valid = FALSE;
            SET error_message = 'bulletin_formatting_content_separator_list must be an array';
        ELSE
            SET @first_level_length = JSON_LENGTH(NEW.`bulletin_formatting_content_separator_list`);
            SET @i = 0;

            WHILE @i < @first_level_length AND is_valid = TRUE DO
                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, ']'))) != 'ARRAY' THEN
                    SET is_valid = FALSE;
                    SET error_message = CONCAT('Item at first level index ', @i, ' is not an array');
                ELSE
                    SET @second_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, ']')));
                    SET @j = 0;
                    
                    WHILE @j < @second_level_length AND is_valid = TRUE DO
                        IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, '][', @j, ']'))) != 'ARRAY' THEN
                            SET is_valid = FALSE;
                            SET error_message = CONCAT('Item at index [', @i, '][', @j, '] is not an array');
                        ELSE
                            SET @third_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, '][', @j, ']')));
                            SET @k = 0;
                            
                            WHILE @k < @third_level_length AND is_valid = TRUE DO
                                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_content_separator_list`, CONCAT('$[', @i, '][', @j, '][', @k, ']'))) != 'STRING' THEN
                                    SET is_valid = FALSE;
                                    SET error_message = CONCAT('Item at index [', @i, '][', @j, '][', @k, '] is not a string');
                                END IF;
                                
                                SET @k = @k + 1;
                            END WHILE;
                        END IF;
                        
                        SET @j = @j + 1;
                    END WHILE;
                END IF;
                
                SET @i = @i + 1;
            END WHILE;
        END IF;
        
        IF is_valid = FALSE THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = error_message;
        END IF;
    END IF;
END$$


CREATE TRIGGER `queries_bulletin_formatting_label_list_insert`
BEFORE INSERT ON `queries`
FOR EACH ROW
BEGIN
    DECLARE is_valid BOOLEAN DEFAULT TRUE;
    DECLARE error_message VARCHAR(255);
    
    IF NEW.`bulletin_formatting_label_list` IS NOT NULL THEN
        IF JSON_TYPE(NEW.`bulletin_formatting_label_list`) != 'ARRAY' THEN
            SET is_valid = FALSE;
            SET error_message = 'bulletin_formatting_label_list must be an array';
        ELSE
            SET @first_level_length = JSON_LENGTH(NEW.`bulletin_formatting_label_list`);
            SET @i = 0;

            WHILE @i < @first_level_length AND is_valid = TRUE DO
                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_label_list`, CONCAT('$[', @i, ']'))) != 'ARRAY' THEN
                    SET is_valid = FALSE;
                    SET error_message = CONCAT('Item at first level index ', @i, ' is not an array');
                ELSE
                    SET @second_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_label_list`, CONCAT('$[', @i, ']')));
                    
                    SET @j = 0;
                    WHILE @j < @second_level_length AND is_valid = TRUE DO
                        IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_label_list`, CONCAT('$[', @i, '][', @j, ']'))) != 'STRING' THEN
                            SET is_valid = FALSE;
                            SET error_message = CONCAT('Item at index [', @i, '][', @j, '] is not a string');
                        END IF;
                       
                       SET @j = @j + 1;
                    END WHILE;
                END IF;
                
                SET @i = @i + 1;
            END WHILE;
        END IF;
        
        IF is_valid = FALSE THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = error_message;
        END IF;
    END IF;
END$$

CREATE TRIGGER `queries_bulletin_formatting_label_list_update`
BEFORE UPDATE ON `queries`
FOR EACH ROW
BEGIN
    DECLARE is_valid BOOLEAN DEFAULT TRUE;
    DECLARE error_message VARCHAR(255);
    
    IF NEW.`bulletin_formatting_label_list` IS NOT NULL THEN
        IF JSON_TYPE(NEW.`bulletin_formatting_label_list`) != 'ARRAY' THEN
            SET is_valid = FALSE;
            SET error_message = 'bulletin_formatting_label_list must be an array';
        ELSE
            SET @first_level_length = JSON_LENGTH(NEW.`bulletin_formatting_label_list`);
            SET @i = 0;

            WHILE @i < @first_level_length AND is_valid = TRUE DO
                IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_label_list`, CONCAT('$[', @i, ']'))) != 'ARRAY' THEN
                    SET is_valid = FALSE;
                    SET error_message = CONCAT('Item at first level index ', @i, ' is not an array');
                ELSE
                    SET @second_level_length = JSON_LENGTH(JSON_EXTRACT(NEW.`bulletin_formatting_label_list`, CONCAT('$[', @i, ']')));
                    
                    SET @j = 0;
                    WHILE @j < @second_level_length AND is_valid = TRUE DO
                        IF JSON_TYPE(JSON_EXTRACT(NEW.`bulletin_formatting_label_list`, CONCAT('$[', @i, '][', @j, ']'))) != 'STRING' THEN
                            SET is_valid = FALSE;
                            SET error_message = CONCAT('Item at index [', @i, '][', @j, '] is not a string');
                        END IF;
                       
                       SET @j = @j + 1;
                    END WHILE;
                END IF;
                
                SET @i = @i + 1;
            END WHILE;
        END IF;
        
        IF is_valid = FALSE THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = error_message;
        END IF;
    END IF;
END$$


CREATE TRIGGER `apis_insert`
BEFORE INSERT ON `apis`
FOR EACH ROW
BEGIN
	DECLARE invalid_formatting BOOLEAN DEFAULT FALSE;

	IF NEW.`application_type` = 'boletins-gerenciais' THEN
		SET invalid_formatting = 
			(NEW.`bulletin_formatting_content_selection_filter_list` IS NOT NULL AND (NEW.`bulletin_formatting_content_separator_list` IS NULL OR NEW.`bulletin_formatting_label_list` IS NULL OR NEW.`is_bulletin_formatting_key_value_label` IS NULL)) OR
			(NEW.`bulletin_formatting_content_separator_list` IS NOT NULL AND (NEW.`bulletin_formatting_content_selection_filter_list` IS NULL OR NEW.`bulletin_formatting_label_list` IS NULL OR NEW.`is_bulletin_formatting_key_value_label` IS NULL)) OR
			(NEW.`bulletin_formatting_label_list` IS NOT NULL AND (NEW.`bulletin_formatting_content_selection_filter_list` IS NULL OR NEW.`bulletin_formatting_content_separator_list` IS NULL OR NEW.`is_bulletin_formatting_key_value_label` IS NULL)) OR
			(NEW.`is_bulletin_formatting_key_value_label` IS NOT NULL AND (NEW.`bulletin_formatting_content_selection_filter_list` IS NULL OR NEW.`bulletin_formatting_content_separator_list` IS NULL OR NEW.`bulletin_formatting_label_list` IS NULL));

		IF invalid_formatting THEN
			SIGNAL SQLSTATE '45000' 
			SET MESSAGE_TEXT = 'All bulletin formatting fields must be provided if any of them is not null for application_type boletins-gerenciais';
		END IF;
	END IF;
END$$

CREATE TRIGGER `apis_update`
BEFORE UPDATE ON `apis`
FOR EACH ROW
BEGIN
	DECLARE invalid_formatting BOOLEAN DEFAULT FALSE;

	IF NEW.`application_type` = 'boletins-gerenciais' THEN
		SET invalid_formatting = 
			(NEW.`bulletin_formatting_content_selection_filter_list` IS NOT NULL AND (NEW.`bulletin_formatting_content_separator_list` IS NULL OR NEW.`bulletin_formatting_label_list` IS NULL OR NEW.`is_bulletin_formatting_key_value_label` IS NULL)) OR
			(NEW.`bulletin_formatting_content_separator_list` IS NOT NULL AND (NEW.`bulletin_formatting_content_selection_filter_list` IS NULL OR NEW.`bulletin_formatting_label_list` IS NULL OR NEW.`is_bulletin_formatting_key_value_label` IS NULL)) OR
			(NEW.`bulletin_formatting_label_list` IS NOT NULL AND (NEW.`bulletin_formatting_content_selection_filter_list` IS NULL OR NEW.`bulletin_formatting_content_separator_list` IS NULL OR NEW.`is_bulletin_formatting_key_value_label` IS NULL)) OR
			(NEW.`is_bulletin_formatting_key_value_label` IS NOT NULL AND (NEW.`bulletin_formatting_content_selection_filter_list` IS NULL OR NEW.`bulletin_formatting_content_separator_list` IS NULL OR NEW.`bulletin_formatting_label_list` IS NULL));

		IF invalid_formatting THEN
			SIGNAL SQLSTATE '45000' 
			SET MESSAGE_TEXT = 'All bulletin formatting fields must be provided if any of them is not null for application_type boletins-gerenciais';
		END IF;
	END IF;
END$$


CREATE TRIGGER `queries_insert`
BEFORE INSERT ON `queries`
FOR EACH ROW
BEGIN
	DECLARE invalid_formatting BOOLEAN DEFAULT FALSE;

	IF NEW.`application_type` = 'boletins-gerenciais' THEN
		SET invalid_formatting = 
			(NEW.`bulletin_formatting_content_selection_filter_list` IS NOT NULL AND (NEW.`bulletin_formatting_content_separator_list` IS NULL OR NEW.`bulletin_formatting_label_list` IS NULL OR NEW.`is_bulletin_formatting_key_value_label` IS NULL)) OR
			(NEW.`bulletin_formatting_content_separator_list` IS NOT NULL AND (NEW.`bulletin_formatting_content_selection_filter_list` IS NULL OR NEW.`bulletin_formatting_label_list` IS NULL OR NEW.`is_bulletin_formatting_key_value_label` IS NULL)) OR
			(NEW.`bulletin_formatting_label_list` IS NOT NULL AND (NEW.`bulletin_formatting_content_selection_filter_list` IS NULL OR NEW.`bulletin_formatting_content_separator_list` IS NULL OR NEW.`is_bulletin_formatting_key_value_label` IS NULL)) OR
			(NEW.`is_bulletin_formatting_key_value_label` IS NOT NULL AND (NEW.`bulletin_formatting_content_selection_filter_list` IS NULL OR NEW.`bulletin_formatting_content_separator_list` IS NULL OR NEW.`bulletin_formatting_label_list` IS NULL));

		IF invalid_formatting THEN
			SIGNAL SQLSTATE '45000' 
			SET MESSAGE_TEXT = 'All bulletin formatting fields must be provided if any of them is not null for application_type boletins-gerenciais';
		END IF;
	END IF;
END$$

CREATE TRIGGER `queries_update`
BEFORE UPDATE ON `queries`
FOR EACH ROW
BEGIN
	DECLARE invalid_formatting BOOLEAN DEFAULT FALSE;

	IF NEW.`application_type` = 'boletins-gerenciais' THEN
		SET invalid_formatting = 
			(NEW.`bulletin_formatting_content_selection_filter_list` IS NOT NULL AND (NEW.`bulletin_formatting_content_separator_list` IS NULL OR NEW.`bulletin_formatting_label_list` IS NULL OR NEW.`is_bulletin_formatting_key_value_label` IS NULL)) OR
			(NEW.`bulletin_formatting_content_separator_list` IS NOT NULL AND (NEW.`bulletin_formatting_content_selection_filter_list` IS NULL OR NEW.`bulletin_formatting_label_list` IS NULL OR NEW.`is_bulletin_formatting_key_value_label` IS NULL)) OR
			(NEW.`bulletin_formatting_label_list` IS NOT NULL AND (NEW.`bulletin_formatting_content_selection_filter_list` IS NULL OR NEW.`bulletin_formatting_content_separator_list` IS NULL OR NEW.`is_bulletin_formatting_key_value_label` IS NULL)) OR
			(NEW.`is_bulletin_formatting_key_value_label` IS NOT NULL AND (NEW.`bulletin_formatting_content_selection_filter_list` IS NULL OR NEW.`bulletin_formatting_content_separator_list` IS NULL OR NEW.`bulletin_formatting_label_list` IS NULL));

		IF invalid_formatting THEN
			SIGNAL SQLSTATE '45000' 
			SET MESSAGE_TEXT = 'All bulletin formatting fields must be provided if any of them is not null for application_type boletins-gerenciais';
		END IF;
	END IF;
END$$


CREATE TRIGGER `sankhya_database_configuration_insert` 
BEFORE INSERT ON `sankhya_database_configuration`
FOR EACH ROW 
BEGIN
    DECLARE row_count INT;
    
    SELECT COUNT(*) INTO row_count FROM `sankhya_database_configuration`;
    
    IF row_count >= 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only one row is allowed in the sankhya_database_configuration table.';
    END IF;
END$$

CREATE TRIGGER `sankhya_database_configuration_update` 
BEFORE UPDATE ON `sankhya_database_configuration`
FOR EACH ROW 
BEGIN
    DECLARE row_count INT;
    
    SELECT COUNT(*) INTO row_count FROM `sankhya_database_configuration`;
    
    IF row_count >= 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only one row is allowed in the sankhya_database_configuration table.';
    END IF;
END$$


CREATE TRIGGER `segware_configuration_insert` 
BEFORE INSERT ON `segware_configuration`
FOR EACH ROW 
BEGIN
    DECLARE row_count INT;
    
    SELECT COUNT(*) INTO row_count FROM `segware_configuration`;
    
    IF row_count >= 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only one row is allowed in the segware_configuration table.';
    END IF;
END$$

CREATE TRIGGER `segware_configuration_update` 
BEFORE UPDATE ON `segware_configuration`
FOR EACH ROW 
BEGIN
    DECLARE row_count INT;
    
    SELECT COUNT(*) INTO row_count FROM `segware_configuration`;
    
    IF row_count >= 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only one row is allowed in the segware_configuration table.';
    END IF;
END$$


CREATE TRIGGER `sigma_desktop_database_configuration_insert` 
BEFORE INSERT ON `sigma_desktop_database_configuration`
FOR EACH ROW 
BEGIN
    DECLARE row_count INT;
    
    SELECT COUNT(*) INTO row_count FROM `sigma_desktop_database_configuration`;
    
    IF row_count >= 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only one row is allowed in the sigma_desktop_database_configuration table.';
    END IF;
END$$

CREATE TRIGGER `sigma_desktop_database_configuration_update` 
BEFORE UPDATE ON `sigma_desktop_database_configuration`
FOR EACH ROW 
BEGIN
    DECLARE row_count INT;
    
    SELECT COUNT(*) INTO row_count FROM `sigma_desktop_database_configuration`;
    
    IF row_count >= 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only one row is allowed in the sigma_desktop_database_configuration table.';
    END IF;
END$$


CREATE TRIGGER `three_mod_database_configuration_insert` 
BEFORE INSERT ON `three_mod_database_configuration`
FOR EACH ROW 
BEGIN
    DECLARE row_count INT;
    
    SELECT COUNT(*) INTO row_count FROM `three_mod_database_configuration`;
    
    IF row_count >= 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only one row is allowed in the three_mod_database_configuration table.';
	END IF;
END$$

CREATE TRIGGER `three_mod_database_configuration_update` 
BEFORE UPDATE ON `three_mod_database_configuration`
FOR EACH ROW 
BEGIN
    DECLARE row_count INT;
    
    SELECT COUNT(*) INTO row_count FROM `three_mod_database_configuration`;
    
    IF row_count >= 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only one row is allowed in the three_mod_database_configuration table.';
	END IF;
END$$


DELIMITER ;


INSERT INTO `api_types` (`api_type`)
VALUES
    ('storage-manager');

INSERT INTO `application_types` (`application_type`)
VALUES
	('storage-manager'),
    ('boletins-gerenciais');
    
INSERT INTO `bulletin_grouping_types` (`bulletin_grouping_type`)
VALUES
    ('A'),
    ('B');

INSERT INTO `database_types` (`database_type`)
VALUES
    ('Sankhya'),
    ('Sigma Desktop'),
    ('Three Mod');
    
INSERT INTO `data_types` (`data_type`)
VALUES
    ('Contagem'),
    ('Relatório');

INSERT INTO `method_types` (`method_type`)
VALUES
    ('GET'),
    ('POST'),
    ('PUT'),
	('PATCH'),
    ('DELETE'),
	('HEAD');

INSERT INTO `service_types` (`service_type`)
VALUES
	('Google'),
    ('Sigma Cloud'),
    ('Sigma Desktop'),
    ('Three Mod');
    
INSERT INTO `table_types` (`table_type`)
VALUES
	('api_types'),
    ('application_types'),
    ('bulletin_grouping_types'),
    ('database_types'),
	('data_types'),
	('method_types'),
	('prisma_method_types'),
	('service_types'),
	('table_types'),
	('apis'),
	('queries'),
	('sankhya_database_configuration'),
	('segware_configuration'),
	('sigma_desktop_database_configuration'),
	('three_mod_database_configuration');
    
INSERT INTO `apis` (`title`, `subtitle`, `application_type`, `service_type`, `data_type`, `label_map`, `bulletin_grouping_type`, `bulletin_formatting_content_selection_filter_list`, `bulletin_formatting_content_separator_list`, `bulletin_formatting_label_list`, `method_type`, `authentication_endpoint`, `data_endpoint`, `username`, `password`, `body`, `is_bulletin_formatting_key_value_label`, `is_api_active`) 
VALUES 
    ('Nota do Google', NULL, 'boletins-gerenciais', 'Google', 'Contagem', NULL, 'A', NULL, NULL, NULL, 'POST', 'http://localhost:3100/api/v1/google/manager/main/get/authentication', 'http://localhost:3100/api/v1/google/manager/main/get/rating-and-reviews', 'admin', '$2a$10$8/wO4yQap0G497YYXurz5uED0aeVzzJATziLvqzncU/IsxNoeJTYW', NULL, NULL, TRUE),
    ('OS 24h', NULL, 'boletins-gerenciais', 'Sigma Cloud', 'Contagem', NULL, 'A', NULL, NULL, NULL, 'POST', 'http://localhost:3110/api/v1/sigma/cloud/main/get/authentication', 'http://localhost:3110/api/v1/sigma/cloud/main/get/service-order', 'admin', '$2a$10$8/wO4yQap0G497YYXurz5uED0aeVzzJATziLvqzncU/IsxNoeJTYW', NULL, NULL, TRUE),
    ('Teste periódico', NULL, 'boletins-gerenciais', 'Sigma Cloud', 'Contagem', NULL, 'A', NULL, NULL, NULL, 'POST', 'http://localhost:3110/api/v1/sigma/cloud/main/get/authentication', 'http://localhost:3110/api/v1/sigma/cloud/main/get/periodic-test', 'admin', '$2a$10$8/wO4yQap0G497YYXurz5uED0aeVzzJATziLvqzncU/IsxNoeJTYW', NULL, NULL, TRUE),
    ('Licenças', NULL, 'boletins-gerenciais', 'Sigma Cloud', 'Contagem', NULL, 'B', '[[["Utilizados", "Disponíveis"]], [["Utilizados", "Disponíveis"]]]', '[[["x"]], [["x"]]]', '[["Cloud AL"], ["Cloud AC"]]', 'POST', 'http://localhost:3110/api/v1/sigma/cloud/main/get/authentication', 'http://localhost:3110/api/v1/sigma/cloud/main/get/system-status', 'admin', '$2a$10$8/wO4yQap0G497YYXurz5uED0aeVzzJATziLvqzncU/IsxNoeJTYW', NULL, FALSE, TRUE);
  
INSERT INTO `queries` (`title`, `subtitle`, `application_type`, `service_type`, `data_type`, `label_map`, `bulletin_grouping_type`, `bulletin_formatting_content_selection_filter_list`, `bulletin_formatting_content_separator_list`, `bulletin_formatting_label_list`, `database_type`, `sql`, `is_bulletin_formatting_key_value_label`, `is_query_periodic`, `is_query_active`) 
VALUES 
	('Ativos Gerais', NULL, 'boletins-gerenciais', 'Sigma Cloud', 'Contagem', NULL, 'B', NULL, NULL, NULL, 'Sankhya', "SELECT (SELECT COUNT(1) FROM (SELECT DISTINCT accounts.id_empresa, accounts.id_central FROM sankhya.ad_dbcsigma accounts WHERE 1 = 1 AND accounts.fg_ativo = 1 AND accounts.ctrl_central = 1)) AS Desktop, (SELECT COUNT(1) FROM (SELECT DISTINCT accounts.company_id, accounts.account_code FROM sankhya.ad_accountsc accounts WHERE 1 = 1 AND accounts.enabled = 'S' AND (accounts.alarm_enabled = 'S' OR accounts.access_control_enabled = 'S'))) AS Cloud, (SELECT SUM(product_service_contracts.qtdeprevista) FROM sankhya.tcsocc occurrences_a INNER JOIN sankhya.tcspsc product_service_contracts ON product_service_contracts.numcontrato = occurrences_a.numcontrato AND product_service_contracts.codprod = occurrences_a.codprod INNER JOIN sankhya.tcsoco occurrences_status_a ON occurrences_status_a.codocor = occurrences_a.codocor INNER JOIN sankhya.tcscon contract ON contract.numcontrato = occurrences_a.numcontrato WHERE 1 = 1 AND contract.ativo = 'S' AND occurrences_a.codprod IN (10127, 9685, 15284, 1078, 1764, 14076) AND occurrences_status_a.sitprod = 'A' AND occurrences_a.dtocor IN (SELECT max(occurrences_b.dtocor) FROM sankhya.tcsocc occurrences_b INNER JOIN sankhya.tcsoco occurrences_status_b ON occurrences_status_b.codocor = occurrences_b.codocor WHERE 1 = 1 AND occurrences_b.numcontrato = occurrences_a.numcontrato AND occurrences_b.codprod = occurrences_a.codprod AND occurrences_b.dtocor <= SYSDATE)) AS Sankhya FROM dual;", NULL, FALSE, TRUE),
	('Cloud', 'Novos / Cancelados', 'boletins-gerenciais', 'Sigma Cloud', 'Contagem', NULL, 'B', '[[["Novos", "Cancelados"]], [["Novos", "Cancelados"]], [["Novos", "Cancelados"]]]', '[[["x"]], [["x"]], [["x"]]]', '[["Mês"], ["Mês"], ["Mês"]]', 'Sankhya', "WITH new_accounts AS (SELECT TO_CHAR(TRUNC(SYSDATE, 'Mon'), 'Mon', 'NLS_DATE_LANGUAGE=PORTUGUESE') AS MONTH, COUNT(*) AS quantity FROM sankhya.ad_accountsc accounts_a INNER JOIN sankhya.ad_accountsc_log accounts_logs_a ON accounts_a.id = accounts_logs_a.account_id WHERE 1 = 1 AND accounts_logs_a.enabled = 'S' AND (accounts_logs_a.access_control_enabled = 'S' OR accounts_logs_a.alarm_enabled = 'S') AND TRUNC(accounts_logs_a.change_date, 'DD') BETWEEN TRUNC(SYSDATE, 'Mon') AND TRUNC(SYSDATE) AND accounts_logs_a.change_date IN (SELECT MIN(accounts_logs_b.change_date) FROM sankhya.ad_accountsc_log accounts_logs_b WHERE 1 = 1 AND accounts_logs_b.enabled = 'S' AND (accounts_logs_b.access_control_enabled = 'S' OR accounts_logs_b.alarm_enabled = 'S') AND accounts_logs_b.account_id = accounts_logs_a.account_id) AND NOT EXISTS (SELECT 1 FROM sankhya.ad_accountsc accounts_b INNER JOIN sankhya.ad_accountsc_log acccounts_logs_b ON accounts_b.id = acccounts_logs_b.account_id WHERE 1 = 1 AND accounts_b.account_code = accounts_a.account_code AND accounts_b.company_id = accounts_a.company_id AND acccounts_logs_b.enabled = 'S' AND (acccounts_logs_b.access_control_enabled = 'S' OR acccounts_logs_b.alarm_enabled = 'S') AND acccounts_logs_b.change_date < accounts_logs_a.change_date) UNION ALL SELECT TO_CHAR(TRUNC(ADD_MONTHS(SYSDATE, -1), 'Mon'), 'Mon', 'NLS_DATE_LANGUAGE=PORTUGUESE') AS MONTH, COUNT(*) AS quantity FROM sankhya.ad_accountsc accounts_a INNER JOIN sankhya.ad_accountsc_log accounts_logs_a ON accounts_a.id = accounts_logs_a.account_id WHERE 1 = 1 AND accounts_logs_a.enabled = 'S' AND (accounts_logs_a.access_control_enabled = 'S' OR accounts_logs_a.alarm_enabled = 'S') AND TRUNC(accounts_logs_a.change_date, 'DD') BETWEEN TRUNC(ADD_MONTHS(SYSDATE, -1), 'Mon') AND TRUNC(LAST_DAY(ADD_MONTHS(SYSDATE, -1))) AND accounts_logs_a.change_date IN (SELECT MIN(accounts_logs_b.change_date) FROM sankhya.ad_accountsc_log accounts_logs_b WHERE 1 = 1 AND accounts_logs_b.enabled = 'S' AND (accounts_logs_b.access_control_enabled = 'S' OR accounts_logs_b.alarm_enabled = 'S') AND accounts_logs_b.account_id = accounts_logs_a.account_id) AND NOT EXISTS (SELECT 1 FROM sankhya.ad_accountsc accounts_b INNER JOIN sankhya.ad_accountsc_log accounts_logs_b ON accounts_b.id = accounts_logs_b.account_id WHERE 1 = 1 AND accounts_b.account_code = accounts_a.account_code AND accounts_b.company_id = accounts_a.company_id AND accounts_logs_b.enabled = 'S' AND (accounts_logs_b.access_control_enabled = 'S' OR accounts_logs_b.alarm_enabled = 'S') AND accounts_logs_b.change_date < accounts_logs_a.change_date) UNION ALL SELECT TO_CHAR(TRUNC(ADD_MONTHS(SYSDATE, -2), 'Mon'), 'Mon', 'NLS_DATE_LANGUAGE=PORTUGUESE') AS MONTH, COUNT(*) AS quantity FROM sankhya.ad_accountsc accounts_a INNER JOIN sankhya.ad_accountsc_log accounts_logs_a ON accounts_a.id = accounts_logs_a.account_id WHERE 1 = 1 AND accounts_logs_a.enabled = 'S' AND (accounts_logs_a.access_control_enabled = 'S' OR accounts_logs_a.alarm_enabled = 'S') AND TRUNC(accounts_logs_a.change_date, 'DD') BETWEEN TRUNC(ADD_MONTHS(SYSDATE, -2), 'Mon') AND TRUNC(LAST_DAY(ADD_MONTHS(SYSDATE, -2))) AND accounts_logs_a.change_date IN (SELECT MIN(accounts_logs_b.change_date) FROM sankhya.ad_accountsc_log accounts_logs_b WHERE 1 = 1 AND accounts_logs_b.enabled = 'S' AND (accounts_logs_b.access_control_enabled = 'S' OR accounts_logs_b.alarm_enabled = 'S') AND accounts_logs_b.account_id = accounts_logs_a.account_id) AND NOT EXISTS (SELECT 1 FROM sankhya.ad_accountsc accounts_b INNER JOIN sankhya.ad_accountsc_log accounts_logs_b ON accounts_b.id = accounts_logs_b.account_id WHERE 1 = 1 AND accounts_b.account_code = accounts_a.account_code AND accounts_b.company_id = accounts_a.company_id AND accounts_logs_b.enabled = 'S' AND (accounts_logs_b.access_control_enabled = 'S' OR accounts_logs_b.alarm_enabled = 'S') AND accounts_logs_b.change_date < accounts_logs_a.change_date)), canceled_accounts AS (SELECT TO_CHAR(TRUNC(SYSDATE, 'Mon'), 'Mon', 'NLS_DATE_LANGUAGE=PORTUGUESE') AS MONTH, COUNT(*) AS quantity FROM sankhya.ad_accountsc accounts_a INNER JOIN sankhya.ad_accountsc_log accounts_logs_a ON accounts_a.id = accounts_logs_a.account_id WHERE 1 = 1 AND accounts_logs_a.enabled = 'N' AND TRUNC(accounts_logs_a.change_date, 'DD') BETWEEN TRUNC(SYSDATE, 'Mon') AND TRUNC(SYSDATE) AND accounts_logs_a.change_date IN (SELECT MAX(accounts_logs_b.change_date) FROM sankhya.ad_accountsc_log accounts_logs_b WHERE 1 = 1 AND accounts_logs_b.account_id = accounts_logs_a.account_id) AND EXISTS (SELECT 1 FROM sankhya.ad_accountsc accounts_b INNER JOIN sankhya.ad_accountsc_log accounts_logs_c ON accounts_b.id = accounts_logs_c.account_id WHERE 1 = 1 AND accounts_b.account_code = accounts_a.account_code AND accounts_b.company_id = accounts_a.company_id AND accounts_logs_c.enabled = 'S' AND (accounts_logs_c.alarm_enabled = 'S' OR accounts_logs_c.access_control_enabled = 'S')) AND NOT EXISTS (SELECT 1 FROM sankhya.ad_accountsc accounts_b WHERE 1 = 1 AND accounts_b.account_code = accounts_a.account_code AND accounts_b.company_id = accounts_a.company_id AND accounts_b.enabled = 'S') AND NOT EXISTS (SELECT 1 FROM sankhya.ad_accountsc accounts_b INNER JOIN sankhya.ad_accountsc_log accounts_logs_b ON accounts_b.id = accounts_logs_b.account_id WHERE 1 = 1 AND accounts_b.id <> accounts_a.id AND accounts_b.account_code = accounts_a.account_code AND accounts_b.company_id = accounts_a.company_id AND accounts_logs_b.enabled = 'N' AND accounts_logs_b.change_date > accounts_logs_a.change_date) UNION ALL SELECT TO_CHAR(TRUNC(ADD_MONTHS(SYSDATE, -1), 'Mon'), 'Mon', 'NLS_DATE_LANGUAGE=PORTUGUESE') AS MONTH, COUNT(*) AS quantity FROM sankhya.ad_accountsc accounts_a INNER JOIN sankhya.ad_accountsc_log accounts_logs_a ON accounts_a.id = accounts_logs_a.account_id WHERE 1 = 1 AND accounts_logs_a.enabled = 'N' AND TRUNC(accounts_logs_a.change_date, 'DD') BETWEEN TRUNC(ADD_MONTHS(SYSDATE, -1), 'Mon') AND TRUNC(LAST_DAY(ADD_MONTHs(SYSDATE, -1))) AND accounts_logs_a.change_date IN (SELECT MAX(accounts_logs_b.change_date) FROM sankhya.ad_accountsc_log accounts_logs_b WHERE 1 = 1 AND accounts_logs_b.account_id = accounts_logs_a.account_id) AND EXISTS (SELECT 1 FROM sankhya.ad_accountsc accounts_b INNER JOIN sankhya.ad_accountsc_log accounts_logs_b ON accounts_b.id = accounts_logs_b.account_id WHERE 1 = 1 AND accounts_b.account_code = accounts_a.account_code AND accounts_b.company_id = accounts_a.company_id AND accounts_logs_b.enabled = 'S' AND (accounts_logs_b.alarm_enabled = 'S' OR accounts_logs_b.access_control_enabled = 'S')) AND NOT EXISTS (SELECT 1 FROM sankhya.ad_accountsc accounts_b WHERE 1 = 1 AND accounts_b.account_code = accounts_a.account_code AND accounts_b.company_id = accounts_a.company_id AND accounts_b.enabled = 'S') AND NOT EXISTS (SELECT 1 FROM sankhya.ad_accountsc accounts_b INNER JOIN sankhya.ad_accountsc_log accounts_logs_b ON accounts_b.id = accounts_logs_b.account_id WHERE 1 = 1 AND accounts_b.id <> accounts_a.id AND accounts_b.account_code = accounts_a.account_code AND accounts_b.company_id = accounts_a.company_id AND accounts_logs_b.enabled = 'N' AND accounts_logs_b.change_date > accounts_logs_a.change_date) UNION ALL SELECT TO_CHAR(TRUNC(ADD_MONTHS(SYSDATE, -2), 'Mon'), 'Mon', 'NLS_DATE_LANGUAGE=PORTUGUESE') AS MONTH, COUNT(*) AS quantity FROM sankhya.ad_accountsc accounts_a INNER JOIN sankhya.ad_accountsc_log accounts_logs_a ON accounts_a.id = accounts_logs_a.account_id WHERE 1 = 1 AND accounts_logs_a.enabled = 'N' AND TRUNC(accounts_logs_a.change_date, 'DD') BETWEEN TRUNC(ADD_MONTHS(SYSDATE, -2), 'Mon') AND TRUNC(LAST_DAY(ADD_MONTHs(SYSDATE, -2))) AND accounts_logs_a.change_date IN (SELECT MAX(accounts_logs_b.change_date) FROM sankhya.ad_accountsc_log accounts_logs_b WHERE 1 = 1 AND accounts_logs_b.account_id = accounts_logs_a.account_id) AND EXISTS (SELECT 1 FROM sankhya.ad_accountsc accounts_b INNER JOIN sankhya.ad_accountsc_log accounts_logs_b ON accounts_b.id = accounts_logs_b.account_id WHERE 1 = 1 AND accounts_b.account_code = accounts_a.account_code AND accounts_b.company_id = accounts_a.company_id AND accounts_logs_b.enabled = 'S' AND (accounts_logs_b.alarm_enabled = 'S' OR accounts_logs_b.access_control_enabled = 'S')) AND NOT EXISTS (SELECT 1 FROM sankhya.ad_accountsc accounts_b WHERE 1 = 1 AND accounts_b.account_code = accounts_a.account_code AND accounts_b.company_id = accounts_a.company_id AND accounts_b.enabled = 'S') AND NOT EXISTS (SELECT 1 FROM sankhya.ad_accountsc accounts_b INNER JOIN sankhya.ad_accountsc_log accounts_logs_b ON accounts_b.id = accounts_logs_b.account_id WHERE 1 = 1 AND accounts_b.id <> accounts_a.id AND accounts_b.account_code = accounts_a.account_code AND accounts_b.company_id = accounts_a.company_id AND accounts_logs_b.enabled = 'N' AND accounts_logs_b.change_date > accounts_logs_a.change_date)) SELECT COALESCE(new_accounts_reference.month, canceled_accounts_reference.month) AS Mês, new_accounts_reference.quantity AS Novos, canceled_accounts_reference.quantity Cancelados FROM new_accounts new_accounts_reference FULL OUTER JOIN canceled_accounts canceled_accounts_reference ON new_accounts_reference.month = canceled_accounts_reference.month;", FALSE, FALSE, TRUE),
    ('Clientes', 'Novos / Faturados', 'boletins-gerenciais', 'Sigma Cloud', 'Contagem', NULL, 'B', '[[["Novos", "Faturados"]], [["Novos", "Faturados"]], [["Novos", "Faturados"]]]', '[[["x"]], [["x"]], [["x"]]]', '[["Mês"], ["Mês"], ["Mês"]]', 'Sankhya', "SELECT TO_CHAR(TRUNC(occurrence_a.dtocor, 'Mon'), 'Mon') AS Mês, COUNT(1) AS Novos, SUM(CASE WHEN EXISTS (SELECT 1 FROM sankhya.tgfcab heading INNER JOIN sankhya.tgfite information ON information.nunota = heading.nunota WHERE 1 = 1 AND heading.tipmov = 'P' AND heading.numcontrato = contract.numcontrato AND information.codprod = occurrence_a.codprod AND TRUNC(heading.dtval, 'Mon') >= TRUNC(ADD_MONTHS(TRUNC(occurrence_a.dtocor, 'Mon'), 1), 'Mon') AND TRUNC(heading.dtval, 'Mon') <= TRUNC(ADD_MONTHS(TRUNC(occurrence_a.dtocor, 'Mon'), 2), 'Mon')) THEN 1 ELSE 0 END) AS Faturados FROM sankhya.tcsocc occurrence_a INNER JOIN sankhya.tcsoco occurrence_status_a ON occurrence_status_a.codocor = occurrence_a.codocor INNER JOIN sankhya.tcscon contract ON contract.numcontrato = occurrence_a.numcontrato WHERE 1 = 1 AND occurrence_a.codprod IN (10127, 9685, 15284, 1078, 1764, 14076) AND occurrence_status_a.sitprod = 'A' AND TRUNC(occurrence_a.dtocor, 'Mon') BETWEEN TRUNC(ADD_MONTHS(SYSDATE, -2), 'Mon') AND TRUNC(SYSDATE, 'Mon') AND occurrence_a.dtocor IN (SELECT MIN(occurrence_b.dtocor) FROM sankhya.tcsocc occurrence_b INNER JOIN sankhya.tcsoco occurrence_status_b ON occurrence_status_b.codocor = occurrence_b.codocor WHERE 1 = 1 AND occurrence_b.numcontrato = occurrence_a.numcontrato AND occurrence_b.codprod = occurrence_a.codprod AND occurrence_status_b.sitprod = 'A') GROUP BY TRUNC(occurrence_a.dtocor, 'Mon') ORDER BY TRUNC(occurrence_a.dtocor, 'Mon') DESC;", FALSE, FALSE, TRUE),
    ('Títulos', 'Vencimento / Pago / Atraso', 'boletins-gerenciais', 'Sigma Cloud', 'Contagem', NULL, 'B', '[[["Vencimento", "Pago", "Atraso"]], [["Vencimento", "Pago", "Atraso"]], [["Vencimento", "Pago", "Atraso"]]]', '[[["x", "x"]], [["x", "x"]], [["x", "x"]]]', '[["Mês"], ["Mês"], ["Mês"]]', 'Sankhya', "SELECT TO_CHAR(financial.dtvenc, 'Mon', 'NLS_DATE_LANGUAGE=PORTUGUESE') AS Mês, COUNT(*) AS Vencimento, SUM(CASE WHEN financial.dhbaixa IS NOT NULL THEN 1 ELSE 0 END) AS Pago, SUM(CASE WHEN financial.dhbaixa IS NULL THEN 1 ELSE 0 END) AS Atraso FROM sankhya.tgffin financial INNER JOIN sankhya.tgfpar partner ON partner.codparc = financial.codparc INNER JOIN sankhya.tsiemp company ON company.codemp = financial.codemp WHERE financial.recdesp = 1 AND financial.CODTIPTIT = 4 AND financial.PROVISAO = 'N' AND financial.codnat IN (80201001, 80201002, 80201003, 80201004, 80201005, 80201006, 80201007, 80201010, 80201012, 80201016, 80201021, 80201025, 80201029, 80201031, 80201032, 80201033, 80202001) AND financial.dtvenc BETWEEN ADD_MONTHS(TRUNC(SYSDATE, 'Mon'), -2) AND TRUNC(ADD_MONTHS(SYSDATE, 1), 'Mon') - 1 GROUP BY TO_CHAR(financial.dtvenc, 'Mon', 'NLS_DATE_LANGUAGE=PORTUGUESE'), TO_CHAR(financial.dtvenc, 'YYYYMM') ORDER BY TO_CHAR(financial.dtvenc, 'YYYYMM') DESC;", FALSE, FALSE, TRUE),
	('Arrombamentos', NULL, 'boletins-gerenciais', 'Sigma Desktop', 'Contagem', NULL, 'A', NULL, NULL, NULL, 'Sigma Desktop', "SELECT COUNT(service_order.id_ordem) AS Corporativo FROM dbordem service_order INNER JOIN dbcentral central ON central.cd_cliente = service_order.cd_cliente LEFT JOIN grupo_cliente client_group ON client_group.cd_grupo_cliente = central.cd_grupo_cliente LEFT JOIN empresa company ON company.cd_empresa = central.id_empresa LEFT JOIN os_notas notes ON notes.id_ordem = service_order.id_ordem LEFT JOIN osdefeito defect ON defect.idosdefeito = service_order.idosdefeito LEFT JOIN colaborador employee ON employee.cd_colaborador = central.cd_tecnico_responsavel LEFT JOIN rota way ON way.cd_rota = central.id_rota WHERE 1 = 1 AND abertura BETWEEN (CONVERT(VARCHAR(10), CURRENT_TIMESTAMP-2, 120) + ' 06:00:00.000') AND CURRENT_TIMESTAMP AND employee.nm_colaborador LIKE 'ROTA 5%' AND defect.descricaodefeito IN ('ARROMBAMENTO')", NULL, FALSE, TRUE),
    ('Arrombamentos', NULL, 'boletins-gerenciais', 'Sigma Desktop', 'Contagem', NULL, 'A', NULL, NULL, NULL, 'Sigma Desktop', "SELECT COUNT(service_order.id_ordem) AS Portaria FROM dbordem service_order INNER JOIN dbcentral central ON central.cd_cliente = service_order.cd_cliente LEFT JOIN grupo_cliente client_group ON client_group.cd_grupo_cliente = central.cd_grupo_cliente LEFT JOIN empresa company ON company.cd_empresa = central.id_empresa LEFT JOIN os_notas notes ON notes.id_ordem = service_order.id_ordem LEFT JOIN osdefeito defect ON defect.idosdefeito = service_order.idosdefeito WHERE 1 = 1 AND abertura BETWEEN (CONVERT(VARCHAR(10), CURRENT_TIMESTAMP - 2, 120) + ' 06:00:00.000') AND CURRENT_TIMESTAMP AND company.cd_empresa IN ( 10037, 10052 ) AND client_group.cd_grupo_cliente IN ( 20066, 20136, 20136, 20108, 20124, 20066, 20166, 20127 ) AND defect.descricaodefeito IN ('ARROMBAMENTO')", NULL, FALSE, TRUE),
	('Arrombamentos', NULL, 'boletins-gerenciais', 'Sigma Desktop', 'Contagem', NULL, 'A', NULL, NULL, NULL, 'Sigma Desktop', "SELECT COUNT(service_order.id_ordem) AS Varejo FROM dbordem service_order INNER JOIN dbcentral central ON central.cd_cliente = service_order.cd_cliente LEFT JOIN grupo_cliente client_group ON client_group.cd_grupo_cliente = central.cd_grupo_cliente LEFT JOIN empresa company ON company.cd_empresa = central.id_empresa LEFT JOIN os_notas notes ON notes.id_ordem = service_order.id_ordem LEFT JOIN osdefeito defect ON defect.idosdefeito = service_order.idosdefeito WHERE 1 = 1 AND abertura BETWEEN (CONVERT(VARCHAR(10), CURRENT_TIMESTAMP - 2, 120) + ' 06:00:00.000') AND CURRENT_TIMESTAMP AND company.cd_empresa IN ( 10017, 10021, 10020, 10025, 10054 ) AND client_group.cd_grupo_cliente IN ( 20066, 20136, 20136, 20108, 20124, 20066, 20166, 20127 ) AND defect.descricaodefeito IN ('ARROMBAMENTO')", NULL, FALSE, TRUE),
    ('Clientes em Falha', NULL, 'boletins-gerenciais', 'Sigma Desktop', 'Contagem', NULL, 'A', NULL, NULL, NULL, 'Sigma Desktop', "WITH last_event AS (SELECT cd_cliente, MAX(dt_recebido) AS event_date FROM view_historico WHERE dt_recebido BETWEEN CURRENT_TIMESTAMP - 120 AND CURRENT_TIMESTAMP GROUP BY cd_cliente), last_xxx1_event AS (SELECT history.cd_cliente, history.dt_recebido AS event_date FROM view_historico history INNER JOIN last_event last_event_reference ON history.cd_cliente = last_event_reference.cd_cliente WHERE 1 = 1 AND history.dt_recebido = last_event_reference.event_date AND history.cd_evento = 'XXX1'), last_e602_or_1602_event AS (SELECT cd_cliente, MAX(dt_recebido) AS event_date FROM view_historico WHERE cd_evento IN ('E602', '1602') GROUP BY cd_cliente), results AS ( SELECT central.id_central, CONVERT(VARCHAR, xxx1_event_reference.event_date, 103) AS xxx1_date, CONVERT(VARCHAR, e602_or_1602_event_reference.event_date, 103) AS e602_or_1602_date, DATEDIFF(DAY, e602_or_1602_event_reference.event_date, xxx1_event_reference.event_date) AS failure_day, client_group.nm_descricao AS client_group, company.nm_razao_social AS empresa FROM last_xxx1_event xxx1_event_reference LEFT JOIN last_e602_or_1602_event e602_or_1602_event_reference ON xxx1_event_reference.cd_cliente = e602_or_1602_event_reference.cd_cliente JOIN dbcentral central ON xxx1_event_reference.cd_cliente = central.cd_cliente JOIN grupo_cliente client_group ON client_group.cd_grupo_cliente = central.cd_grupo_cliente JOIN empresa company ON company.cd_empresa = central.id_empresa WHERE 1 = 1 AND central.fg_ativo = 1 AND central.ctrl_central = 1 AND central.ctrl_teste = 1 AND central.id_estado = 'GO' AND DATEDIFF(DAY, e602_or_1602_event_reference.event_date, xxx1_event_reference.event_date) > 0 ) SELECT COUNT(DISTINCT id_central) AS Total FROM results", NULL, FALSE, TRUE), 
    ('Desktop', 'Novos / Cancelados', 'boletins-gerenciais', 'Sigma Desktop', 'Contagem', NULL, 'B', '[[["Novos", "Cancelados"]], [["Novos", "Cancelados"]], [["Novos", "Cancelados"]]]', '[[["x"]], [["x"]], [["x"]]]', '[["Mês"], ["Mês"], ["Mês"]]', 'Sankhya', "WITH new_accounts AS (SELECT TO_CHAR(TRUNC(SYSDATE, 'Mon'), 'Mon', 'NLS_DATE_LANGUAGE=PORTUGUESE') AS MONTH, COUNT(*) AS quantity FROM sankhya.ad_dbcsigma accounts_a INNER JOIN sankhya.ad_dbcsigmalog accounts_logs_a ON accounts_a.cd_cliente = accounts_logs_a.cd_cliente WHERE 1 = 1 AND accounts_logs_a.fg_ativo = 1 AND accounts_logs_a.ctrl_central = 1 AND TRUNC(accounts_logs_a.log_timestamp, 'DD') BETWEEN TRUNC(SYSDATE, 'Mon') AND TRUNC(SYSDATE) AND accounts_logs_a.log_timestamp IN (SELECT MIN(accounts_logs_b.log_timestamp) FROM sankhya.ad_dbcsigmalog accounts_logs_b WHERE 1 = 1 AND accounts_logs_b.fg_ativo = 1 AND accounts_logs_b.ctrl_central = 1 AND accounts_logs_b.cd_cliente = accounts_logs_a.cd_cliente) AND NOT EXISTS (SELECT 1 FROM sankhya.ad_dbcsigma accounts_b INNER JOIN sankhya.ad_dbcsigmalog accounts_logs_b ON accounts_b.cd_cliente = accounts_logs_b.cd_cliente WHERE 1 = 1 AND accounts_b.id_central = accounts_a.id_central AND accounts_b.id_empresa = accounts_a.id_empresa AND accounts_logs_b.fg_ativo = 1 AND accounts_logs_b.ctrl_central = 1 AND accounts_logs_b.log_timestamp < accounts_logs_a.log_timestamp) UNION ALL SELECT TO_CHAR(TRUNC(ADD_MONTHS(SYSDATE, -1), 'Mon'), 'Mon', 'NLS_DATE_LANGUAGE=PORTUGUESE') AS MONTH, COUNT(*) AS quantity FROM sankhya.ad_dbcsigma accounts_a INNER JOIN sankhya.ad_dbcsigmalog accounts_logs_a ON accounts_a.cd_cliente = accounts_logs_a.cd_cliente WHERE 1 = 1 AND accounts_logs_a.fg_ativo = 1 AND accounts_logs_a.ctrl_central = 1 AND TRUNC(accounts_logs_a.log_timestamp, 'DD') BETWEEN TRUNC(ADD_MONTHS(SYSDATE, -1), 'Mon') AND TRUNC(LAST_DAY(ADD_MONTHS(SYSDATE, -1))) AND accounts_logs_a.log_timestamp IN (SELECT MIN(accounts_logs_b.log_timestamp) FROM sankhya.ad_dbcsigmalog accounts_logs_b WHERE 1 = 1 AND accounts_logs_b.fg_ativo = 1 AND accounts_logs_b.ctrl_central = 1 AND accounts_logs_b.cd_cliente = accounts_logs_a.cd_cliente) AND NOT EXISTS (SELECT 1 FROM sankhya.ad_dbcsigma accounts_b INNER JOIN sankhya.ad_dbcsigmalog accounts_logs_b ON accounts_b.cd_cliente = accounts_logs_b.cd_cliente WHERE 1 = 1 AND accounts_b.id_central = accounts_a.id_central AND accounts_b.id_empresa = accounts_a.id_empresa AND accounts_logs_b.fg_ativo = 1 AND accounts_logs_b.ctrl_central = 1 AND accounts_logs_b.log_timestamp < accounts_logs_a.log_timestamp) UNION ALL SELECT TO_CHAR(TRUNC(ADD_MONTHS(SYSDATE, -2), 'Mon'), 'Mon', 'NLS_DATE_LANGUAGE=PORTUGUESE') AS MONTH, COUNT(*) AS quantity FROM sankhya.ad_dbcsigma accounts_a INNER JOIN sankhya.ad_dbcsigmalog accounts_logs_a ON accounts_a.cd_cliente = accounts_logs_a.cd_cliente WHERE 1 = 1 AND accounts_logs_a.fg_ativo = 1 AND accounts_logs_a.ctrl_central = 1 AND TRUNC(accounts_logs_a.log_timestamp, 'DD') BETWEEN TRUNC(ADD_MONTHS(SYSDATE, -2), 'Mon') AND TRUNC(LAST_DAY(ADD_MONTHS(SYSDATE, -2))) AND accounts_logs_a.log_timestamp IN (SELECT MIN(accounts_logs_b.log_timestamp) FROM sankhya.ad_dbcsigmalog accounts_logs_b WHERE 1 = 1 AND accounts_logs_b.fg_ativo = 1 AND accounts_logs_b.ctrl_central = 1 AND accounts_logs_b.cd_cliente = accounts_logs_a.cd_cliente) AND NOT EXISTS (SELECT 1 FROM sankhya.ad_dbcsigma accounts_b INNER JOIN sankhya.ad_dbcsigmalog accounts_logs_b ON accounts_b.cd_cliente = accounts_logs_b.cd_cliente WHERE 1 = 1 AND accounts_b.id_central = accounts_a.id_central AND accounts_b.id_empresa = accounts_a.id_empresa AND accounts_logs_b.fg_ativo = 1 AND accounts_logs_b.ctrl_central = 1 AND accounts_logs_b.log_timestamp < accounts_logs_a.log_timestamp)), canceled_accounts AS (SELECT TO_CHAR(TRUNC(SYSDATE, 'Mon'), 'Mon', 'NLS_DATE_LANGUAGE=PORTUGUESE') AS MONTH, COUNT(*) AS quantity FROM sankhya.ad_dbcsigma accounts_a INNER JOIN sankhya.ad_dbcsigmalog accounts_logs_a ON accounts_a.cd_cliente = accounts_logs_a.cd_cliente WHERE 1 = 1 AND accounts_logs_a.fg_ativo = 0 AND TRUNC(accounts_logs_a.log_timestamp, 'DD') BETWEEN TRUNC(SYSDATE, 'Mon') AND TRUNC(SYSDATE) AND accounts_logs_a.log_timestamp IN (SELECT MAX(accounts_logs_b.log_timestamp) FROM sankhya.ad_dbcsigmalog accounts_logs_b WHERE 1 = 1 AND accounts_logs_b.cd_cliente = accounts_logs_a.cd_cliente) AND EXISTS (SELECT 1 FROM sankhya.ad_dbcsigma accounts_b INNER JOIN sankhya.ad_dbcsigmalog accounts_logs_b ON accounts_b.cd_cliente = accounts_logs_b.cd_cliente WHERE 1 = 1 AND accounts_b.id_central = accounts_a.id_central AND accounts_b.id_empresa = accounts_a.id_empresa AND accounts_logs_b.fg_ativo = 1 AND accounts_logs_b.ctrl_central = 1) AND NOT EXISTS (SELECT 1 FROM sankhya.ad_dbcsigma accounts_b WHERE 1 = 1 AND accounts_b.id_central = accounts_a.id_central AND accounts_b.id_empresa = accounts_a.id_empresa AND accounts_b.fg_ativo = 1) AND NOT EXISTS (SELECT 1 FROM sankhya.ad_dbcsigma accounts_b INNER JOIN sankhya.ad_dbcsigmalog accounts_logs_b ON accounts_b.cd_cliente = accounts_logs_b.cd_cliente WHERE 1 = 1 AND accounts_b.cd_cliente <> accounts_a.cd_cliente AND accounts_b.id_central = accounts_a.id_central AND accounts_b.id_empresa = accounts_a.id_empresa AND accounts_logs_b.fg_ativo = 0 AND accounts_logs_b.log_timestamp > accounts_logs_a.log_timestamp) UNION ALL SELECT TO_CHAR(TRUNC(ADD_MONTHS(SYSDATE, -1), 'Mon'), 'Mon', 'NLS_DATE_LANGUAGE=PORTUGUESE') AS MONTH, COUNT(*) AS quantity FROM sankhya.ad_dbcsigma accounts_a INNER JOIN sankhya.ad_dbcsigmalog accounts_logs_a ON accounts_a.cd_cliente = accounts_logs_a.cd_cliente WHERE 1 = 1 AND accounts_logs_a.fg_ativo = 0 AND TRUNC(accounts_logs_a.log_timestamp, 'DD') BETWEEN TRUNC(ADD_MONTHS(SYSDATE, -1), 'Mon') AND TRUNC(LAST_DAY(ADD_MONTHS(SYSDATE, -1))) AND accounts_logs_a.log_timestamp IN (SELECT MAX(accounts_logs_b.log_timestamp) FROM sankhya.ad_dbcsigmalog accounts_logs_b WHERE 1 = 1 AND accounts_logs_b.cd_cliente = accounts_logs_a.cd_cliente) AND EXISTS (SELECT 1 FROM sankhya.ad_dbcsigma accounts_b INNER JOIN sankhya.ad_dbcsigmalog accounts_logs_b ON accounts_b.cd_cliente = accounts_logs_b.cd_cliente WHERE 1 = 1 AND accounts_b.id_central = accounts_a.id_central AND accounts_b.id_empresa = accounts_a.id_empresa AND accounts_logs_b.fg_ativo = 1 AND accounts_logs_b.ctrl_central = 1) AND NOT EXISTS (SELECT 1 FROM sankhya.ad_dbcsigma accounts_b WHERE 1 = 1 AND accounts_b.id_central = accounts_a.id_central AND accounts_b.id_empresa = accounts_a.id_empresa AND accounts_b.fg_ativo = 1) AND NOT EXISTS (SELECT 1 FROM sankhya.ad_dbcsigma accounts_b INNER JOIN sankhya.ad_dbcsigmalog accounts_logs_b ON accounts_b.cd_cliente = accounts_logs_b.cd_cliente WHERE 1 = 1 AND accounts_b.cd_cliente <> accounts_a.cd_cliente AND accounts_b.id_central = accounts_a.id_central AND accounts_b.id_empresa = accounts_a.id_empresa AND accounts_logs_b.fg_ativo = 0 AND accounts_logs_b.log_timestamp > accounts_logs_a.log_timestamp) UNION ALL SELECT TO_CHAR(TRUNC(ADD_MONTHS(SYSDATE, -2), 'Mon'), 'Mon', 'NLS_DATE_LANGUAGE=PORTUGUESE') AS MONTH, COUNT(*) AS quantity FROM sankhya.ad_dbcsigma accounts_a INNER JOIN sankhya.ad_dbcsigmalog accounts_logs_a ON accounts_a.cd_cliente = accounts_logs_a.cd_cliente WHERE 1 = 1 AND accounts_logs_a.fg_ativo = 0 AND TRUNC(accounts_logs_a.log_timestamp, 'DD') BETWEEN TRUNC(ADD_MONTHS(SYSDATE, -2), 'Mon') AND TRUNC(LAST_DAY(ADD_MONTHS(SYSDATE, -2))) AND accounts_logs_a.log_timestamp IN (SELECT MAX(accounts_logs_b.log_timestamp) FROM sankhya.ad_dbcsigmalog accounts_logs_b WHERE 1 = 1 AND accounts_logs_b.cd_cliente = accounts_logs_a.cd_cliente) AND EXISTS (SELECT 1 FROM sankhya.ad_dbcsigma accounts_b INNER JOIN sankhya.ad_dbcsigmalog accounts_logs_b ON accounts_b.cd_cliente = accounts_logs_b.cd_cliente WHERE 1 = 1 AND accounts_b.id_central = accounts_a.id_central AND accounts_b.id_empresa = accounts_a.id_empresa AND accounts_logs_b.fg_ativo = 1 AND accounts_logs_b.ctrl_central = 1) AND NOT EXISTS (SELECT 1 FROM sankhya.ad_dbcsigma accounts_b WHERE 1 = 1 AND accounts_b.id_central = accounts_a.id_central AND accounts_b.id_empresa = accounts_a.id_empresa AND accounts_b.fg_ativo = 1) AND NOT EXISTS (SELECT 1 FROM sankhya.ad_dbcsigma accounts_b INNER JOIN sankhya.ad_dbcsigmalog accounts_logs_b ON accounts_b.cd_cliente = accounts_logs_b.cd_cliente WHERE 1 = 1 AND accounts_b.cd_cliente <> accounts_a.cd_cliente AND accounts_b.id_central = accounts_a.id_central AND accounts_b.id_empresa = accounts_a.id_empresa AND accounts_logs_b.fg_ativo = 0 AND accounts_logs_b.log_timestamp > accounts_logs_a.log_timestamp)) SELECT COALESCE(new_accounts_reference.month, canceled_accounts_reference.month) AS Mês, new_accounts_reference.quantity AS Novos, canceled_accounts_reference.quantity AS Cancelados FROM new_accounts new_accounts_reference FULL OUTER JOIN canceled_accounts canceled_accounts_reference ON new_accounts_reference.month = canceled_accounts_reference.month;", FALSE, FALSE, TRUE),
    ('Deslocamentos 24h', NULL, 'boletins-gerenciais', 'Sigma Desktop', 'Contagem', NULL, 'A', NULL, NULL, NULL, 'Sigma Desktop', "SELECT COUNT(central.id_central) AS Total FROM dbcentral central JOIN view_historico history ON history.cd_cliente = central.cd_cliente WHERE 1 = 1 AND history.dt_recebido BETWEEN (CONVERT(VARCHAR(10), CURRENT_TIMESTAMP - 1, 120) + ' 06:00:00.000') AND CURRENT_TIMESTAMP AND central.id_central <> '0000' AND history.dt_viatura_no_local <> '' AND central.id_estado = 'GO'", NULL, FALSE, TRUE),
    ('Licenças', 'Utilizados / Disponíveis', 'boletins-gerenciais', 'Sigma Desktop', 'Contagem', NULL, 'B', '[[["Utilizados", "Disponíveis"]]]', '[[["x"]]]', '[["Mês"]]', 'Sigma Desktop', "SELECT nu_contas_ativas AS Utilizados, (nu_contas_liberadas - nu_contas_ativas) AS Disponíveis FROM svl", FALSE, FALSE, TRUE),
    ('OS 24h', NULL, 'boletins-gerenciais', 'Sigma Desktop', 'Contagem', NULL, 'A', NULL, NULL, NULL, 'Sigma Desktop', "SELECT COUNT(service_order.id_ordem) AS Desktop FROM dbordem service_order INNER JOIN dbcentral central ON central.cd_cliente = service_order.cd_cliente LEFT JOIN grupo_cliente client_group ON client_group.cd_grupo_cliente = central.cd_grupo_cliente LEFT JOIN empresa company ON company.cd_empresa = central.id_empresa LEFT JOIN os_notas notes ON notes.id_ordem = service_order.id_ordem LEFT JOIN osdefeito defect ON defect.idosdefeito = service_order.idosdefeito LEFT JOIN colaborador employee ON employee.cd_colaborador = central.cd_tecnico_responsavel LEFT JOIN rota way ON way.cd_rota = central.id_rota WHERE abertura BETWEEN CURRENT_TIMESTAMP - 90 AND CURRENT_TIMESTAMP AND service_order.fechado = 0 AND notes.nota IS NULL AND DATEDIFF(HOUR, service_order.abertura, CURRENT_TIMESTAMP) >= 60", NULL, FALSE, TRUE),
    ('O.S. Sem Notas', NULL, 'boletins-gerenciais', 'Sigma Desktop', 'Contagem', NULL, 'A', NULL, NULL, NULL, 'Sigma Desktop', "SELECT COUNT(service_order.id_ordem) AS Cadastro FROM dbordem service_order INNER JOIN dbcentral central ON central.cd_cliente = service_order.cd_cliente LEFT JOIN grupo_cliente client_group ON client_group.cd_grupo_cliente = central.cd_grupo_cliente LEFT JOIN empresa company ON company.cd_empresa = central.id_empresa LEFT JOIN os_notas notes ON notes.id_ordem = service_order.id_ordem LEFT JOIN osdefeito defect ON defect.idosdefeito = service_order.idosdefeito WHERE abertura BETWEEN CURRENT_TIMESTAMP - 90 AND CURRENT_TIMESTAMP AND service_order.fechado = 0 AND company.cd_empresa IN (10017, 10021, 10020, 10025, 10054, 10037, 10052) AND client_group.cd_grupo_cliente IN (20066, 20136, 20136, 20108, 20124, 20066, 20166, 20127) AND notes.nota IS NULL AND central.id_estado = 'GO' AND defect.descricaodefeito IN ('CADASTRO', 'VENDA CONTROLE / TAG', 'CONTROLE DE ACESSO', 'EXCLUSÃO / BLOQUEIO', 'APLICATIVOS') AND DATEDIFF(HOUR, service_order.abertura, CURRENT_TIMESTAMP) >= 60", NULL, FALSE, TRUE),
    ('O.S. Sem Notas', NULL, 'boletins-gerenciais', 'Sigma Desktop', 'Contagem', NULL, 'A', NULL, NULL, NULL, 'Sigma Desktop', "SELECT COUNT(service_order.id_ordem) AS Corporativo FROM dbordem service_order INNER JOIN dbcentral central ON central.cd_cliente = service_order.cd_cliente LEFT JOIN grupo_cliente client_group ON client_group.cd_grupo_cliente = central.cd_grupo_cliente LEFT JOIN empresa company ON company.cd_empresa = central.id_empresa LEFT JOIN os_notas notes ON notes.id_ordem = service_order.id_ordem LEFT JOIN colaborador employee ON employee.cd_colaborador = central.cd_tecnico_responsavel LEFT JOIN rota way ON way.cd_rota = central.id_rota WHERE abertura BETWEEN CURRENT_TIMESTAMP - 90 AND CURRENT_TIMESTAMP AND service_order.fechado = 0 AND employee.nm_colaborador LIKE 'ROTA 5%' AND notes.nota IS NULL AND DATEDIFF(HOUR, service_order.abertura, CURRENT_TIMESTAMP) >= 60", NULL, FALSE, TRUE),
    ('O.S. Sem Notas', NULL, 'boletins-gerenciais', 'Sigma Desktop', 'Contagem', NULL, 'A', NULL, NULL, NULL, 'Sigma Desktop', "SELECT COUNT(service_order.id_ordem) AS Portaria FROM dbordem service_order INNER JOIN dbcentral central ON central.cd_cliente = service_order.cd_cliente LEFT JOIN grupo_cliente client_group ON client_group.cd_grupo_cliente = central.cd_grupo_cliente LEFT JOIN empresa company ON company.cd_empresa = central.id_empresa LEFT JOIN os_notas notes ON notes.id_ordem = service_order.id_ordem WHERE abertura BETWEEN CURRENT_TIMESTAMP - 90 AND CURRENT_TIMESTAMP AND service_order.fechado = 0 AND company.cd_empresa IN (10037, 10052) AND client_group.cd_grupo_cliente IN (20066, 20136, 20136, 20108, 20124, 20066, 20166, 20127) AND notes.nota IS NULL AND DATEDIFF(HOUR, service_order.abertura, CURRENT_TIMESTAMP) >= 60", NULL, FALSE, TRUE),
    ('O.S. Sem Notas', NULL, 'boletins-gerenciais', 'Sigma Desktop', 'Contagem', NULL, 'A', NULL, NULL, NULL, 'Sigma Desktop', "SELECT COUNT(service_order.id_ordem) AS Varejo FROM dbordem service_order INNER JOIN dbcentral central ON central.cd_cliente = service_order.cd_cliente LEFT JOIN grupo_cliente client_group ON client_group.cd_grupo_cliente = central.cd_grupo_cliente LEFT JOIN empresa company ON company.cd_empresa = central.id_empresa LEFT JOIN os_notas notes ON notes.id_ordem = service_order.id_ordem WHERE abertura BETWEEN CURRENT_TIMESTAMP - 90 AND CURRENT_TIMESTAMP AND service_order.fechado = 0 AND company.cd_empresa IN (10017, 10021, 10020, 10025, 10054) AND client_group.cd_grupo_cliente IN (20066, 20136, 20136, 20108, 20124, 20066, 20166, 20127) AND notes.nota IS NULL AND DATEDIFF(HOUR, service_order.abertura, CURRENT_TIMESTAMP) >= 60", NULL, FALSE, TRUE),
    ('Teste períodico', NULL, 'boletins-gerenciais', 'Sigma Desktop', 'Contagem', NULL, 'A', NULL, NULL, NULL, 'Sigma Desktop', "SELECT COUNT(history.cd_evento) AS Desktop FROM dbcentral central INNER JOIN view_historico history ON history.cd_cliente = central.cd_cliente LEFT JOIN dbeventctid primary_event ON primary_event.id_evento = history.cd_evento LEFT JOIN dbevento secondary_event ON secondary_event.cd_cliente = central.cd_cliente AND secondary_event.id_evento = history.nu_auxiliar LEFT JOIN colaborador employee ON employee.cd_colaborador = central.cd_tecnico_responsavel LEFT JOIN rota way ON way.cd_rota = central.id_rota LEFT JOIN view_ctrl_horario_central central_time ON central_time.cd_cliente = central.cd_cliente LEFT JOIN grupo_cliente client_group ON client_group.cd_grupo_cliente = central.cd_grupo_cliente LEFT JOIN empresa company ON company.cd_empresa = central.id_empresa WHERE 1 = 1 AND history.dt_recebido BETWEEN (CONVERT(VARCHAR(10), CURRENT_TIMESTAMP - 1, 120) + ' 16:00:00.000') AND CURRENT_TIMESTAMP AND central.id_central <> '0000' AND history.cd_evento IN ('E602', '1602')", NULL, FALSE, TRUE),
	('Comunicação 3MOD', NULL, 'boletins-gerenciais', 'Three Mod', 'Contagem', NULL, 'A', NULL, NULL, NULL, 'Three Mod', "SELECT (SELECT COUNT(csid) FROM Conexao3MOD WHERE bloqueado = 0 AND falhacomunicacao = 0 AND horarioultrecepcao >= CURRENT_TIMESTAMP - 30) AS Online, (SELECT COUNT(csid) FROM Conexao3MOD WHERE bloqueado = 0 AND falhacomunicacao = 1 AND horarioultrecepcao >= CURRENT_TIMESTAMP - 30) AS Falha", NULL, FALSE, TRUE);

INSERT INTO `sankhya_database_configuration` (`instant_client_path`, `username`, `password`, `connect_string`)
VALUES
    ('bf278c7d0e2ec91e4136954c4f6b7671e9653971fff3d5797b8356c5b41a3a83', 'c8ee46cd57d998f228979924744c3a2a', '3e6f4f21281f420d4d5e51954a7bac55', '38c5f332e0f02eb275d320d2677ac2aca2432b252fdf28ba02e5bbae785c858a');
  
INSERT INTO `segware_configuration` (`auth_endpoint`, `events_endpoint`, `service_orders_endpoint`, `system_status_endpoint`, `username`, `password`, `token`)
VALUES
    ('https://cloud.segware.com.br/server/v2/auth', 'https://api.segware.com.br/v1/events', 'https://api.segware.com.br/v1/serviceOrders', 'https://api.segware.com.br/v1/system/status', 'e1614193d647cb868fb434418c2e5f0f28fde54fb50e92707f0891b64729bc50', 'a6f808c850a640df12a4f47c65df12e4', '53101c25c171c4039b4907cd3a3e2c9ff38888594d8625bdaf6934c3bf3a49d3b2fb2e0d2d68dd65b302a95951d6c2fd6678bf8f93edd95359c25de42a54e3bbd7a01e15aaf74c66b74ffa080cd759c5451eb5421ee107acfce2adfadf90e4fde07acadf3d4e637cbb42393ce6fd2123c7f3dca2400016ffdaa26b259b3ca1d4be492c994ccd762b576df8c9a40bc7503e417fd837e0b8cab13db9a0f1a9017f7f14cf5f7a8e6cda3eb4fbeb0daf95f28046c49324dbc2a5c2e007c416a72acac87d1d9f78bd3e9cf8970d87a93309938d8df4ac4f82054121fa7397e212c60190da5c0210ed2a2a7cdef8d9a966588c2c3529b54bb53df694a71e74b4fea5ad922630bc688bea19527bdc045145913ae21538e4d6b343f3cf9bbda39a9fc7197c5d7bdd3156ebd851f6110e32e15515');
 
INSERT INTO `sigma_desktop_database_configuration` (`host`, `database`, `username`, `password`)
VALUES
    ('d40ae8cd27f5a44bd94f606a69853079', '11775b52e950c9226672e3c5d9e20dd8', '78b0e0eb23613c315dd6df5fac5db257', '6a1b0e2e2038d877327bf213eae4173f97fa7e9532b18bfba84f9626eb97a6ad');
    
INSERT INTO `three_mod_database_configuration` (`host`, `database`, `username`, `password`)
VALUES
	('9083a7a426c3a84f5ed1e4c8a658830d', '92e42f5940badb00352e7e1801d98f7b8c4d869b3d90f572ce274f09d4d753b7', '73c1e50b3424ca16cabd9a93132e9348', '4f60709cac7977807304ddf7def283a0');
    
INSERT INTO `users` (`application_type`, `username`, `password`, `role_list`, `is_user_active`)
VALUES
    ('storage-manager', 'admin', '$2a$10$mwm596weoEp3WcyIgz1Gc.v/X4ahJmg/hsV6reNr6VLeEGcUhoQ/6', '["admin", "user"]', TRUE),
    ('storage-manager', 'user', '$2a$10$HB/w4Q8IonMozeujZguvE.fJX.pL28lw6sZcIesIYvdAY16HXMgMW', '["user"]', TRUE)

