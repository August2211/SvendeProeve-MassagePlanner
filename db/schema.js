const DB = require("./database");

async function InitSchemas() {
    await DB.execute(
        `
        CREATE TABLE IF NOT EXISTS availability (
        id int(10) unsigned NOT NULL AUTO_INCREMENT,
        start_time datetime NOT NULL,
        end_time datetime NOT NULL,
        PRIMARY KEY (id)
        );
        `
    )

    await DB.execute(
        `
        CREATE TABLE IF NOT EXISTS treatments (
        id int(10) unsigned NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        price decimal(10,2) unsigned NOT NULL,
        duration_minutes smallint(5) unsigned NOT NULL,
        PRIMARY KEY (id)
        );
        `
    )

    await DB.execute(
        `
        CREATE TABLE IF NOT EXISTS bookings (
        id int(10) unsigned NOT NULL AUTO_INCREMENT,
        customer_name varchar(255) NOT NULL,
        customer_email varchar(255) NOT NULL,
        treatment_id int(10) unsigned NOT NULL,
        start_time datetime NOT NULL,
        status varchar(255) NOT NULL DEFAULT 'active',
        created_at timestamp NOT NULL DEFAULT current_timestamp(),
        PRIMARY KEY (id),
        KEY fk_bookings_treatment (treatment_id),
        CONSTRAINT fk_bookings_treatment FOREIGN KEY (treatment_id) REFERENCES treatments (id)
        );
        `
    )

    await DB.execute(
        `
        CREATE TABLE IF NOT EXISTS users (
        id int(10) unsigned NOT NULL AUTO_INCREMENT,
        username varchar(255) NOT NULL,
        password_hash varchar(255) NOT NULL,
        created_at timestamp NOT NULL DEFAULT current_timestamp(),
        PRIMARY KEY (id),
        UNIQUE KEY username (username)
        );
        `
    )
}

module.exports = InitSchemas;