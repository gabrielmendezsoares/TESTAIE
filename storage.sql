SET FOREIGN_KEY_CHECKS = 0;


DROP TABLE IF EXISTS `api_types`;
DROP TABLE IF EXISTS `application_types`;
DROP TABLE IF EXISTS `authentication_types`;
DROP TABLE IF EXISTS `bulletin_grouping_types`;
DROP TABLE IF EXISTS `database_types`;
DROP TABLE IF EXISTS `data_types`;
DROP TABLE IF EXISTS `formatting_types`;
DROP TABLE IF EXISTS `method_types`;
DROP TABLE IF EXISTS `response_types`;
DROP TABLE IF EXISTS `role_types`;
DROP TABLE IF EXISTS `service_types`;
DROP TABLE IF EXISTS `table_types`;


DROP TABLE IF EXISTS `sankhya_database_configuration`;
DROP TABLE IF EXISTS `segware_configuration`;
DROP TABLE IF EXISTS `sigma_desktop_database_configuration`;
DROP TABLE IF EXISTS `three_mod_database_configuration`;


DROP TABLE IF EXISTS `apis`;
DROP TABLE IF EXISTS `queries`;
DROP TABLE IF EXISTS `users`;


DROP PROCEDURE IF EXISTS `create_single_row_table_triggers`;
DROP PROCEDURE IF EXISTS `validate_json_3d_string_array`;
DROP PROCEDURE IF EXISTS `validate_json_2d_string_array`;
DROP PROCEDURE IF EXISTS `validate_api_authentication`;
DROP PROCEDURE IF EXISTS `validate_relational_formatting`;
DROP FUNCTION IF EXISTS `validate_users_role_list`;


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

CREATE TABLE `authentication_types` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `authentication_type` VARCHAR(191) NOT NULL UNIQUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   
	PRIMARY KEY (`id`),
    
    INDEX `idx_authentication_type` (`authentication_type`),
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

CREATE TABLE `formatting_types` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `formatting_type` VARCHAR(191) NOT NULL UNIQUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   
	PRIMARY KEY (`id`),
    
    INDEX `idx_formatting_type` (`formatting_type`),
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

CREATE TABLE `response_types` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `response_type` VARCHAR(191) NOT NULL UNIQUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   
	PRIMARY KEY (`id`),
    
    INDEX `idx_response_type` (`response_type`),
	INDEX `idx_created_at` (`created_at`),
    INDEX `idx_updated_at` (`updated_at`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `role_types` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `role_type` VARCHAR(191) NOT NULL UNIQUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   
	PRIMARY KEY (`id`),
    
    INDEX `idx_role_type` (`role_type`),
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


CREATE TABLE `apis` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) UNIQUE NOT NULL,
    `heading` VARCHAR(191) NOT NULL,
    `subheading` VARCHAR(191),
    `application_type` VARCHAR(191) NOT NULL,
	`service_type` VARCHAR(191) NOT NULL,
    `data_type` VARCHAR(191) NOT NULL,
	`method_type` VARCHAR(191) NOT NULL,
	`authentication_type` VARCHAR(191),
    `response_type` VARCHAR(191) NOT NULL,
	`formatting_type` VARCHAR(191),
	`bulletin_grouping_type` VARCHAR(191),
	`basic_authentication_username` VARCHAR(191),
    `basic_authentication_password` VARCHAR(191),
    `token_authentication_token` VARCHAR(191),
	`basic_and_token_authentication_url` VARCHAR(191),
    `basic_and_token_authentication_token_extractor_list` VARCHAR(191),
	`basic_and_token_authentication_expiration_extractor_list` VARCHAR(191),
	`basic_and_token_authentication_expiration_buffer` INT,
	`api_key_authentication_key` VARCHAR(191),
	`api_key_authentication_header_name` VARCHAR(191),
    `oauth2_authentication_client_id` VARCHAR(191),
    `oauth2_authentication_client_secret` VARCHAR(191),
    `oauth2_authentication_token_url` VARCHAR(191),
	`oauth2_authentication_initial_token_map` JSON,
    `data_url` VARCHAR(191) NOT NULL,
    `body` JSON,
	`relational_formatting_content_selection_list` JSON,
    `relational_formatting_content_separation_list` JSON,
	`relational_formatting_content_key_map` JSON,
    `relational_formatting_content_key_list` JSON,
    `relational_formatting_is_key_value_content_key` BOOLEAN,
	`is_response_mapped` BOOLEAN NOT NULL,
    `is_api_active` BOOLEAN NOT NULL DEFAULT TRUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
	CONSTRAINT `oauth2_authentication_initial_token_map` CHECK (JSON_TYPE(`oauth2_authentication_initial_token_map`) = 'OBJECT'),
    
    PRIMARY KEY (`id`),
    
    FOREIGN KEY (`application_type`) REFERENCES `application_types`(`application_type`) ON DELETE CASCADE,
	FOREIGN KEY (`service_type`) REFERENCES `service_types`(`service_type`) ON DELETE CASCADE,
	FOREIGN KEY (`data_type`) REFERENCES `data_types`(`data_type`) ON DELETE CASCADE,
    FOREIGN KEY (`method_type`) REFERENCES `method_types`(`method_type`) ON DELETE CASCADE,
	FOREIGN KEY (`authentication_type`) REFERENCES `authentication_types`(`authentication_type`) ON DELETE CASCADE,
	FOREIGN KEY (`response_type`) REFERENCES `response_types`(`response_type`) ON DELETE CASCADE,
	FOREIGN KEY (`formatting_type`) REFERENCES `formatting_types`(`formatting_type`) ON DELETE CASCADE,
    FOREIGN KEY (`bulletin_grouping_type`) REFERENCES `bulletin_grouping_types`(`bulletin_grouping_type`) ON DELETE CASCADE,
    
    INDEX `idx_heading` (`heading`),
    INDEX `idx_subheading` (`subheading`),
    INDEX `idx_application_type` (`application_type`),
    INDEX `idx_service_type` (`service_type`),
    INDEX `idx_data_type` (`data_type`),
	INDEX `idx_method_type` (`method_type`),
	INDEX `idx_authentication_type` (`authentication_type`),
	INDEX `idx_response_type` (`response_type`),
	INDEX `idx_formatting_type` (`formatting_type`),
	INDEX `idx_bulletin_grouping_type` (`bulletin_grouping_type`),
	INDEX `idx_basic_authentication_username` (`basic_authentication_username`),
	INDEX `idx_basic_authentication_password` (`basic_authentication_password`),
	INDEX `idx_token_authentication_token` (`token_authentication_token`),
	INDEX `idx_basic_and_token_authentication_url` (`basic_and_token_authentication_url`),
	INDEX `idx_basic_and_token_authentication_expiration_buffer` (`basic_and_token_authentication_expiration_buffer`),
	INDEX `idx_api_key_authentication_key` (`api_key_authentication_key`),
	INDEX `idx_api_key_authentication_header_name` (`api_key_authentication_header_name`),
	INDEX `idx_oauth2_authentication_client_id` (`oauth2_authentication_client_id`),
	INDEX `idx_oauth2_authentication_client_secret` (`oauth2_authentication_client_secret`),
	INDEX `idx_oauth2_authentication_token_url` (`oauth2_authentication_token_url`),
	INDEX `idx_data_url` (`data_url`),
	INDEX `idx_relational_formatting_is_key_value_content_key` (`relational_formatting_is_key_value_content_key`),
    INDEX `idx_is_response_mapped` (`is_response_mapped`),
    INDEX `idx_is_api_active` (`is_api_active`),
    INDEX `idx_created_at` (`created_at`),    
	INDEX `idx_updated_at` (`updated_at`)          
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `queries` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) UNIQUE NOT NULL,
    `heading` VARCHAR(191) NOT NULL,
    `subheading` VARCHAR(191),
    `application_type` VARCHAR(191) NOT NULL,
	`service_type` VARCHAR(191) NOT NULL,
    `data_type` VARCHAR(191) NOT NULL,
	`formatting_type` VARCHAR(191),
	`bulletin_grouping_type` VARCHAR(191),
	`relational_formatting_content_selection_list` JSON,
    `relational_formatting_content_separation_list` JSON,
	`relational_formatting_content_key_map` JSON,
    `relational_formatting_content_key_list` JSON,
    `relational_formatting_is_key_value_content_key` BOOLEAN,
	`database_type` VARCHAR(191) NOT NULL,
    `sql` LONGTEXT NOT NULL,
	`is_response_mapped` BOOLEAN NOT NULL,
	`is_query_periodic` BOOLEAN NOT NULL DEFAULT TRUE,
    `is_query_active` BOOLEAN NOT NULL DEFAULT TRUE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (`id`),
    
    FOREIGN KEY (`application_type`) REFERENCES `application_types`(`application_type`) ON DELETE CASCADE,
	FOREIGN KEY (`service_type`) REFERENCES `service_types`(`service_type`) ON DELETE CASCADE,
	FOREIGN KEY (`data_type`) REFERENCES `data_types`(`data_type`) ON DELETE CASCADE,
	FOREIGN KEY (`formatting_type`) REFERENCES `formatting_types`(`formatting_type`) ON DELETE CASCADE,
    FOREIGN KEY (`bulletin_grouping_type`) REFERENCES `bulletin_grouping_types`(`bulletin_grouping_type`) ON DELETE CASCADE,
    
    INDEX `idx_heading` (`heading`),
    INDEX `idx_subheading` (`subheading`),
    INDEX `idx_application_type` (`application_type`),
    INDEX `idx_service_type` (`service_type`),
    INDEX `idx_data_type` (`data_type`),
	INDEX `idx_formatting_type` (`formatting_type`),
	INDEX `idx_bulletin_grouping_type` (`bulletin_grouping_type`),
	INDEX `idx_relational_formatting_is_key_value_content_key` (`relational_formatting_is_key_value_content_key`),
	INDEX `idx_database_type` (`database_type`),
    INDEX `idx_is_response_mapped` (`is_response_mapped`),
	INDEX `idx_is_query_periodic` (`is_query_periodic`),
    INDEX `idx_is_query_active` (`is_query_active`),
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


DELIMITER //


CREATE PROCEDURE `create_single_row_table_triggers`(IN `table_name` VARCHAR(255))
BEGIN
    SET @insert_trigger = CONCAT('
    CREATE TRIGGER `', `table_name`, '_insert` 
    BEFORE INSERT ON `', `table_name`, '` 
    FOR EACH ROW 
    BEGIN
        DECLARE row_count INT;
        
        SELECT COUNT(*) INTO row_count FROM `', `table_name`, '`;
        
        IF row_count >= 1 THEN
            SIGNAL SQLSTATE ''45000'' 
            SET MESSAGE_TEXT = ''Only one row is allowed in the ', `table_name`, ' table.'';
        END IF;
    END;
    ');
    
    SET @update_trigger = CONCAT('
    CREATE TRIGGER `', `table_name`, '_update` 
    BEFORE UPDATE ON `', `table_name`, '` 
    FOR EACH ROW 
    BEGIN
        DECLARE row_count INT;
        
        SELECT COUNT(*) INTO row_count FROM `', `table_name`, '`;
        
        IF row_count >= 1 THEN
            SIGNAL SQLSTATE ''45000'' 
            SET MESSAGE_TEXT = ''Only one row is allowed in the ', `table_name`, ' table.'';
        END IF;
    END;
    ');
    
    SET @drop_insert = CONCAT('DROP TRIGGER IF EXISTS `', `table_name`, '_insert`');
    SET @drop_update = CONCAT('DROP TRIGGER IF EXISTS `', `table_name`, '_update`');
    
    PREPARE stmt FROM @drop_insert;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
    
    PREPARE stmt FROM @drop_update;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
    
    PREPARE stmt FROM @insert_trigger;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
    
    PREPARE stmt FROM @update_trigger;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END;
//

CREATE PROCEDURE `validate_json_3d_string_array`(
    IN `json_data` JSON,
    IN `field_name` VARCHAR(100),
    OUT `is_valid` BOOLEAN,
    OUT `error_message` VARCHAR(255)
)
BEGIN
    SET `is_valid` = TRUE;
    
    IF JSON_TYPE(`json_data`) != 'ARRAY' THEN
        SET `is_valid` = FALSE;
        SET `error_message` = CONCAT(`field_name`, ' must be an array');
    END IF;
    
    SET @first_level_length = JSON_LENGTH(`json_data`);
    SET @i = 0;

    WHILE @i < @first_level_length AND `is_valid` = TRUE DO
        IF JSON_TYPE(JSON_EXTRACT(`json_data`, CONCAT('$[', @i, ']'))) != 'ARRAY' THEN
            SET `is_valid` = FALSE;
            SET `error_message` = CONCAT('Item at first level index ', @i, ' is not an array');
        ELSE
            SET @second_level_length = JSON_LENGTH(JSON_EXTRACT(`json_data`, CONCAT('$[', @i, ']')));
            SET @j = 0;
            
            WHILE @j < @second_level_length AND `is_valid` = TRUE DO
                IF JSON_TYPE(JSON_EXTRACT(`json_data`, CONCAT('$[', @i, '][', @j, ']'))) != 'ARRAY' THEN
                    SET `is_valid` = FALSE;
                    SET `error_message` = CONCAT('Item at index [', @i, '][', @j, '] is not an array');
                ELSE
                    SET @third_level_length = JSON_LENGTH(JSON_EXTRACT(`json_data`, CONCAT('$[', @i, '][', @j, ']')));
                    SET @k = 0;
                    
                    WHILE @k < @third_level_length AND `is_valid` = TRUE DO
                        IF JSON_TYPE(JSON_EXTRACT(`json_data`, CONCAT('$[', @i, '][', @j, '][', @k, ']'))) != 'STRING' THEN
                            SET `is_valid` = FALSE;
                            SET `error_message` = CONCAT('Item at index [', @i, '][', @j, '][', @k, '] is not a string');
                        END IF;
                        
                        SET @k = @k + 1;
                    END WHILE;
                END IF;
                
                SET @j = @j + 1;
            END WHILE;
        END IF;
        
        SET @i = @i + 1;
    END WHILE;
END;
//

CREATE PROCEDURE `validate_json_2d_string_array`(
    IN `json_data` JSON,
    IN `field_name` VARCHAR(100),
    OUT `is_valid` BOOLEAN,
    OUT `error_message` VARCHAR(255)
)
BEGIN
    SET `is_valid` = TRUE;
    
    IF JSON_TYPE(`json_data`) != 'ARRAY' THEN
        SET `is_valid` = FALSE;
        SET `error_message` = CONCAT(`field_name`, ' must be an array');
    END IF;
    
    SET @first_level_length = JSON_LENGTH(`json_data`);
    SET @i = 0;

    WHILE @i < @first_level_length AND `is_valid` = TRUE DO
        IF JSON_TYPE(JSON_EXTRACT(`json_data`, CONCAT('$[', @i, ']'))) != 'ARRAY' THEN
            SET `is_valid` = FALSE;
            SET `error_message` = CONCAT('Item at first level index ', @i, ' is not an array');
        ELSE
            SET @second_level_length = JSON_LENGTH(JSON_EXTRACT(`json_data`, CONCAT('$[', @i, ']')));
            SET @j = 0;
            
            WHILE @j < @second_level_length AND `is_valid` = TRUE DO
                IF JSON_TYPE(JSON_EXTRACT(`json_data`, CONCAT('$[', @i, '][', @j, ']'))) != 'STRING' THEN
                    SET `is_valid` = FALSE;
                    SET `error_message` = CONCAT('Item at index [', @i, '][', @j, '] is not a string');
                END IF;
                
                SET @j = @j + 1;
            END WHILE;
        END IF;
        
        SET @i = @i + 1;
    END WHILE;
END;
//

CREATE PROCEDURE `validate_api_authentication`(
    IN `authentication_type` VARCHAR(50),
    IN `api_key_authentication_key` VARCHAR(255),
    IN `api_key_authentication_header_name` VARCHAR(255),
    IN `basic_authentication_username` VARCHAR(255),
    IN `basic_authentication_password` VARCHAR(255),
    IN `token_authentication_token` VARCHAR(255),
    IN `basic_and_token_authentication_url` VARCHAR(255),
    IN `basic_and_token_authentication_token_extractor_list` JSON,
    IN `basic_and_token_authentication_expiration_extractor_list` JSON,
    IN `basic_and_token_authentication_expiration_buffer` INT,
    IN `oauth2_authentication_client_id` VARCHAR(255),
    IN `oauth2_authentication_client_secret` VARCHAR(255),
    IN `oauth2_authentication_token_url` VARCHAR(255),
    IN `oauth2_authentication_initial_token_map` JSON,
    OUT `is_valid` BOOLEAN,
    OUT `error_message` VARCHAR(255)
)
BEGIN
    SET `is_valid` = TRUE;
    
    IF `authentication_type` = 'API Key' THEN
        IF `api_key_authentication_key` IS NULL OR `api_key_authentication_header_name` IS NULL THEN
            SET `is_valid` = FALSE;
            SET `error_message` = 'Invalid api_key_authentication fields';
        END IF;
    END IF;
    
    IF `authentication_type` = 'Basic' THEN
        IF `basic_authentication_username` IS NULL OR `basic_authentication_password` IS NULL THEN
            SET `is_valid` = FALSE;
            SET `error_message` = 'Invalid basic_authentication fields';
        END IF;
    END IF;
    
    IF `authentication_type` = 'Basic And Token' THEN
        IF `basic_authentication_username` IS NULL OR `basic_authentication_password` IS NULL OR 
           `token_authentication_token` IS NULL OR `basic_and_token_authentication_url` IS NULL OR 
           `basic_and_token_authentication_token_extractor_list` IS NULL OR `basic_and_token_authentication_expiration_extractor_list` IS NULL OR 
           `basic_and_token_authentication_expiration_buffer` IS NULL THEN
            SET `is_valid` = FALSE;
            SET `error_message` = 'Invalid basic_and_token_authentication fields';
        END IF;
    END IF;
    
    IF `authentication_type` = 'OAuth 2.0' THEN
        IF `oauth2_authentication_client_id` IS NULL OR `oauth2_authentication_client_secret` IS NULL OR 
           `oauth2_authentication_token_url` IS NULL OR `oauth2_authentication_initial_token_map` IS NULL THEN
            SET `is_valid` = FALSE;
            SET `error_message` = 'Invalid oauth2_authentication fields';
        END IF;
    END IF;
    
    IF `authentication_type` = 'Token' THEN
        IF `basic_username` IS NULL OR `basic_password` IS NULL THEN
            SET `is_valid` = FALSE;
            SET `error_message` = 'Invalid basic_authentication fields';
        END IF;
    END IF;
END;
//

CREATE PROCEDURE `validate_relational_formatting`(
    IN `formatting_type` VARCHAR(50),
    IN `relational_formatting_content_selection_list` JSON,
    IN `relational_formatting_content_separation_list` JSON,
    IN `relational_formatting_content_key_list` JSON,
    IN `relational_formatting_is_key_value_content_key` BOOLEAN,
    OUT `is_valid` BOOLEAN,
    OUT `error_message` VARCHAR(255)
)
BEGIN
    SET `is_valid` = TRUE;
    
    IF `formatting_type` = 'Relational' THEN
        IF `relational_formatting_content_selection_list` IS NULL OR `relational_formatting_content_separation_list` IS NULL OR `relational_formatting_content_key_list` IS NULL OR `relational_formatting_is_key_value_content_key` IS NULL THEN
            SET `is_valid` = FALSE;
            SET `error_message` = 'Invalid relational_formatting fields';
        END IF;
    END IF;
END;
//

CREATE FUNCTION `validate_users_role_list`(`role_list` JSON) 
RETURNS BOOLEAN
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE `i` INT DEFAULT 0;
    DECLARE `array_size` INT;
    DECLARE `current_type` VARCHAR(255);
    DECLARE `is_valid` BOOLEAN DEFAULT TRUE;
  
    IF JSON_TYPE(`role_list`) != 'ARRAY' THEN
        RETURN FALSE;
    END IF;
  
    SET `array_size` = JSON_LENGTH(`role_list`);
  
    IF `array_size` = 0 THEN
        RETURN TRUE;
    END IF;
  
    WHILE `i` < `array_size` AND `is_valid` = TRUE DO
        SET `current_type` = JSON_UNQUOTE(JSON_EXTRACT(`role_list`, CONCAT('$[', `i`, ']')));
        
        IF JSON_TYPE(JSON_EXTRACT(`role_list`, CONCAT('$[', `i`, ']'))) != 'STRING' THEN
            SET `is_valid` = FALSE;
        ELSE
            IF NOT EXISTS (SELECT 1 FROM `role_types` WHERE `role_type` COLLATE utf8mb4_unicode_ci = `current_type`) THEN
                SET `is_valid` = FALSE;
            END IF;
        END IF;
        
        SET `i` = `i` + 1;
    END WHILE;

    RETURN `is_valid`;
END;
//


CREATE TRIGGER `before_apis_insert`
BEFORE INSERT ON `apis`
FOR EACH ROW
BEGIN
    DECLARE `is_valid` BOOLEAN DEFAULT TRUE;
    DECLARE `error_message` VARCHAR(255);
    
    CALL `validate_api_authentication`(
        NEW.`authentication_type`,
        NEW.`api_key_authentication_key`,
        NEW.`api_key_authentication_header_name`,
        NEW.`basic_authentication_username`,
        NEW.`basic_authentication_password`,
        NEW.`token_authentication_token`,
        NEW.`basic_and_token_authentication_url`,
        NEW.`basic_and_token_authentication_token_extractor_list`,
        NEW.`basic_and_token_authentication_expiration_extractor_list`,
        NEW.`basic_and_token_authentication_expiration_buffer`,
        NEW.`oauth2_authentication_client_id`,
        NEW.`oauth2_authentication_client_secret`,
        NEW.`oauth2_authentication_token_url`,
        NEW.`oauth2_authentication_initial_token_map`,
        `is_valid`,
        `error_message`
    );
    
    IF NOT `is_valid` THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = `error_message`;
    END IF;

    CALL `validate_relational_formatting`(
        NEW.`formatting_type`,
        NEW.`relational_formatting_content_selection_list`,
        NEW.`relational_formatting_content_separation_list`,
        NEW.`relational_formatting_content_key_list`,
        NEW.`relational_formatting_is_key_value_content_key`,
        `is_valid`,
        `error_message`
    );
    
    IF NOT `is_valid` THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = `error_message`;
    END IF;
    
    IF NEW.`relational_formatting_content_selection_list` IS NOT NULL THEN
        CALL `validate_json_3d_string_array`(
            NEW.`relational_formatting_content_selection_list`,
            'relational_formatting_content_selection_list',
            `is_valid`,
            `error_message`
        );
        
        IF NOT `is_valid` THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = `error_message`;
        END IF;
    END IF;
    
    IF NEW.`relational_formatting_content_separation_list` IS NOT NULL THEN
        CALL `validate_json_3d_string_array`(
            NEW.`relational_formatting_content_separation_list`,
            'relational_formatting_content_separation_list',
            `is_valid`,
            `error_message`
        );
        
        IF NOT `is_valid` THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = `error_message`;
        END IF;
    END IF;
    
    IF NEW.`relational_formatting_content_key_list` IS NOT NULL THEN
        CALL `validate_json_2d_string_array`(
            NEW.`relational_formatting_content_key_list`,
            'relational_formatting_content_key_list',
            `is_valid`,
            `error_message`
        );
        
        IF NOT `is_valid` THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = `error_message`;
        END IF;
    END IF;
END;
//

CREATE TRIGGER `before_apis_update`
BEFORE UPDATE ON `apis`
FOR EACH ROW
BEGIN
    DECLARE `is_valid` BOOLEAN DEFAULT TRUE;
    DECLARE `error_message` VARCHAR(255);
    
    CALL `validate_api_authentication`(
        NEW.`authentication_type`,
        NEW.`api_key_authentication_key`,
        NEW.`api_key_authentication_header_name`,
        NEW.`basic_authentication_username`,
        NEW.`basic_authentication_password`,
        NEW.`token_authentication_token`,
        NEW.`basic_and_token_authentication_url`,
        NEW.`basic_and_token_authentication_token_extractor_list`,
        NEW.`basic_and_token_authentication_expiration_extractor_list`,
        NEW.`basic_and_token_authentication_expiration_buffer`,
        NEW.`oauth2_authentication_client_id`,
        NEW.`oauth2_authentication_client_secret`,
        NEW.`oauth2_authentication_token_url`,
        NEW.`oauth2_authentication_initial_token_map`,
        `is_valid`,
        `error_message`
    );
    
    IF NOT `is_valid` THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = `error_message`;
    END IF;

    CALL `validate_relational_formatting`(
        NEW.`formatting_type`,
        NEW.`relational_formatting_content_selection_list`,
        NEW.`relational_formatting_content_separation_list`,
        NEW.`relational_formatting_content_key_list`,
        NEW.`relational_formatting_is_key_value_content_key`,
        `is_valid`,
        `error_message`
    );
    
    IF NOT `is_valid` THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = `error_message`;
    END IF;
    
    IF NEW.`relational_formatting_content_selection_list` IS NOT NULL THEN
        CALL `validate_json_3d_string_array`(
            NEW.`relational_formatting_content_selection_list`,
            'relational_formatting_content_selection_list',
            `is_valid`,
            `error_message`
        );
        
        IF NOT `is_valid` THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = `error_message`;
        END IF;
    END IF;
    
    IF NEW.`relational_formatting_content_separation_list` IS NOT NULL THEN
        CALL `validate_json_3d_string_array`(
            NEW.`relational_formatting_content_separation_list`,
            'relational_formatting_content_separation_list',
            `is_valid`,
            `error_message`
        );
        
        IF NOT `is_valid` THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = `error_message`;
        END IF;
    END IF;
    
    IF NEW.`relational_formatting_content_key_list` IS NOT NULL THEN
        CALL `validate_json_2d_string_array`(
            NEW.`relational_formatting_content_key_list`,
            'relational_formatting_content_key_list',
            `is_valid`,
            `error_message`
        );
        
        IF NOT `is_valid` THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = `error_message`;
        END IF;
    END IF;
END;
//

CREATE TRIGGER `before_queries_insert`
BEFORE INSERT ON `queries`
FOR EACH ROW
BEGIN
    DECLARE is_valid BOOLEAN DEFAULT TRUE;
    DECLARE error_message VARCHAR(255);
    
    CALL `validate_relational_formatting`(
        NEW.`formatting_type`,
        NEW.`relational_formatting_content_selection_list`,
        NEW.`relational_formatting_content_separation_list`,
        NEW.`relational_formatting_content_key_list`,
        NEW.`relational_formatting_is_key_value_content_key`,
        is_valid,
        error_message
    );
    
    IF NOT is_valid THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
    END IF;
    
    IF NEW.`relational_formatting_content_selection_list` IS NOT NULL THEN
        CALL `validate_json_3d_string_array`(
            NEW.`relational_formatting_content_selection_list`,
            'relational_formatting_content_selection_list',
            is_valid,
            error_message
        );
        
        IF NOT is_valid THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;
    END IF;
    
    IF NEW.`relational_formatting_content_separation_list` IS NOT NULL THEN
        CALL `validate_json_3d_string_array`(
            NEW.`relational_formatting_content_separation_list`,
            'relational_formatting_content_separation_list',
            is_valid,
            error_message
        );
        
        IF NOT is_valid THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;
    END IF;
    
    IF NEW.`relational_formatting_content_key_list` IS NOT NULL THEN
        CALL `validate_json_2d_string_array`(
            NEW.`relational_formatting_content_key_list`,
            'relational_formatting_content_key_list',
            is_valid,
            error_message
        );
        
        IF NOT is_valid THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;
    END IF;
END;
//

CREATE TRIGGER `before_queries_update`
BEFORE UPDATE ON `queries`
FOR EACH ROW
BEGIN
    DECLARE is_valid BOOLEAN DEFAULT TRUE;
    DECLARE error_message VARCHAR(255);
    
    CALL `validate_relational_formatting`(
        NEW.`formatting_type`,
        NEW.`relational_formatting_content_selection_list`,
        NEW.`relational_formatting_content_separation_list`,
        NEW.`relational_formatting_content_key_list`,
        NEW.`relational_formatting_is_key_value_content_key`,
        is_valid,
        error_message
    );
    
    IF NOT is_valid THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
    END IF;
    
    IF NEW.`relational_formatting_content_selection_list` IS NOT NULL THEN
        CALL `validate_json_3d_string_array`(
            NEW.`relational_formatting_content_selection_list`,
            'relational_formatting_content_selection_list',
            is_valid,
            error_message
        );
        
        IF NOT is_valid THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;
    END IF;
    
    IF NEW.`relational_formatting_content_separation_list` IS NOT NULL THEN
        CALL `validate_json_3d_string_array`(
            NEW.`relational_formatting_content_separation_list`,
            'relational_formatting_content_separation_list',
            is_valid,
            error_message
        );
        
        IF NOT is_valid THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;
    END IF;
    
    IF NEW.`relational_formatting_content_key_list` IS NOT NULL THEN
        CALL `validate_json_2d_string_array`(
            NEW.`relational_formatting_content_key_list`,
            'relational_formatting_content_key_list',
            is_valid,
            error_message
        );
        
        IF NOT is_valid THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;
    END IF;
END;
//

CREATE TRIGGER `before_users_insert`
BEFORE INSERT ON `users`
FOR EACH ROW
BEGIN
    DECLARE is_valid BOOLEAN;
  
    SET is_valid = `validate_users_role_list`(NEW.`role_list`);
  
    IF is_valid = FALSE THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid role_list: All elements must be strings that exist in the `role_types` table';
    END IF;
END;
//

CREATE TRIGGER `before_users_update`
BEFORE UPDATE ON `users`
FOR EACH ROW
BEGIN
    DECLARE is_valid BOOLEAN;
  
    SET is_valid = `validate_users_role_list`(NEW.`role_list`);
  
    IF is_valid = FALSE THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid role_list: All elements must be strings that exist in the `role_types` table';
    END IF;
END;
//


CALL create_single_row_table_triggers('sankhya_database_configuration');
CALL create_single_row_table_triggers('segware_configuration');
CALL create_single_row_table_triggers('sigma_desktop_database_configuration');
CALL create_single_row_table_triggers('three_mod_database_configuration');


DELIMITER ;


INSERT INTO `api_types` (`api_type`)
VALUES
    ('api-interpreter'),
    ('query-interpreter'),
    ('storage-manager');

INSERT INTO `application_types` (`application_type`)
VALUES
    ('api-interpreter'),
    ('boletins-gerenciais'),
    ('query-interpreter'),
    ('storage-manager');
    
INSERT INTO `authentication_types` (`authentication_type`)
VALUES
    ('API Key'),
    ('Basic'),
    ('Basic And Token'),
    ('OAuth 2.0'),
    ('Token');
    
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

INSERT INTO `formatting_types` (`formatting_type`)
VALUES
    ('Relational');

INSERT INTO `method_types` (`method_type`)
VALUES
    ('GET'),
    ('DELETE'),
    ('HEAD'),
    ('PATCH'),
    ('POST'),
    ('PUT');

INSERT INTO `response_types` (`response_type`)
VALUES
    ('arraybuffer'),
    ('blob'),
    ('document'),
    ('formdata'),
    ('json'),
    ('stream'),
    ('text');

INSERT INTO `role_types` (`role_type`)
VALUES
    ('admin'),
    ('user');

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
    ('authentication_types'),
    ('bulletin_grouping_types'),
    ('database_types'),
    ('data_types'),
    ('formatting_types'),
    ('method_types'),
    ('response_types'),
    ('role_types'),
    ('service_types'),
    ('table_types'),
    ('apis'),
    ('queries'),
    ('sankhya_database_configuration'),
    ('segware_configuration'),
    ('sigma_desktop_database_configuration'),
    ('three_mod_database_configuration'),
    ('users');
    
    
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


/*    
INSERT INTO `apis`
    (
        `name`, 
        `heading`, 
        `subheading`,
        `application_type`, 
        `service_type`, 
        `data_type`, 
        `method_type`, 
        `authentication_type`, 
        `response_type`, 
        `formatting_type`, 
        `bulletin_grouping_type`, 
        `basic_authentication_username`, 
        `basic_authentication_password`,
        `token_authentication_token`, 
        `basic_and_token_authentication_url`,
        `basic_and_token_authentication_token_extractor_list`,
        `basic_and_token_authentication_expiration_extractor_list`,
        `basic_and_token_authentication_expiration_buffer`,
        `api_key_authentication_key`, 
        `api_key_authentication_header_name`, 
        `oauth2_authentication_client_id`, 
        `oauth2_authentication_client_secret`, 
        `oauth2_authentication_token_url`, 
        `oauth2_authentication_initial_token_map`, 
        `data_url`, 
        `body`,
        `relational_formatting_content_selection_list`, 
        `relational_formatting_content_separation_list`, 
        `relational_formatting_content_key_map`, 
        `relational_formatting_content_key_list`, 
        `relational_formatting_is_key_value_content_key`,
        `is_response_mapped`, 
        `is_api_active`
    ) 
VALUES
    ();
*/
    
/*
INSERT INTO `queries`
    (
        `name`, 
        `heading`, 
        `subheading`,
        `application_type`, 
        `service_type`, 
        `data_type`, 
        `database_type`,
        `formatting_type`, 
        `bulletin_grouping_type`, 
        `relational_formatting_content_selection_list`, 
        `relational_formatting_content_separation_list`, 
        `relational_formatting_content_key_map`, 
        `relational_formatting_content_key_list`, 
        `relational_formatting_is_key_value_content_key`,
        `sql`, 
        `is_response_mapped`, 
        `is_query_periodic`,
        `is_query_active`
    ) 
VALUES
    ();
*/
        
INSERT INTO `users` (`application_type`, `username`, `password`, `role_list`, `is_user_active`)
VALUES
    ('api-interpreter', 'admin', '$2a$10$mwm596weoEp3WcyIgz1Gc.v/X4ahJmg/hsV6reNr6VLeEGcUhoQ/6', '["admin", "user"]', TRUE),
    ('api-interpreter', 'user', '$2a$10$HB/w4Q8IonMozeujZguvE.fJX.pL28lw6sZcIesIYvdAY16HXMgMW', '["user"]', TRUE),
    ('query-interpreter', 'admin', '$2a$10$mwm596weoEp3WcyIgz1Gc.v/X4ahJmg/hsV6reNr6VLeEGcUhoQ/6', '["admin", "user"]', TRUE),
    ('query-interpreter', 'user', '$2a$10$HB/w4Q8IonMozeujZguvE.fJX.pL28lw6sZcIesIYvdAY16HXMgMW', '["user"]', TRUE),
    ('storage-manager', 'admin', '$2a$10$mwm596weoEp3WcyIgz1Gc.v/X4ahJmg/hsV6reNr6VLeEGcUhoQ/6', '["admin", "user"]', TRUE),
    ('storage-manager', 'user', '$2a$10$HB/w4Q8IonMozeujZguvE.fJX.pL28lw6sZcIesIYvdAY16HXMgMW', '["user"]', TRUE);

