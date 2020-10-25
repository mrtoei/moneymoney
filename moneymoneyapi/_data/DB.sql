#2020-10-25
CREATE TABLE IF NOT EXISTS categories (
  id INT UNSIGNED NOT NULL PRIMARY KEY,
  parent_id INT UNSIGNED NULL,
  user_id INT UNSIGNED NOT NULL,
  name VARCHAR(200) NOT NULL,
  status TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NULL,
  updated_at DATETIME NULL,
  INDEX user_id_idx (user_id ASC),
  INDEX parent_id_idx (parent_id ASC),
  CONSTRAINT user_id
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT parent_id
    FOREIGN KEY (parent_id)
    REFERENCES categories (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
