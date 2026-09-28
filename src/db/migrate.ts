import { db } from './drizzle';

async function migrate() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255),
      avatar_url VARCHAR(500),
      phone VARCHAR(50),
      details TEXT,
      role VARCHAR(32) NOT NULL DEFAULT 'user',
      permissions TEXT,
      reset_token VARCHAR(255),
      reset_token_expires DATETIME,
      last_login_at DATETIME,
      last_logout_at DATETIME,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  await db.execute(`
    ALTER TABLE users
      ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(500),
      ADD COLUMN IF NOT EXISTS phone VARCHAR(50),
      ADD COLUMN IF NOT EXISTS details TEXT,
      ADD COLUMN IF NOT EXISTS permissions TEXT,
      ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255),
      ADD COLUMN IF NOT EXISTS reset_token_expires DATETIME,
      ADD COLUMN IF NOT EXISTS last_login_at DATETIME,
      ADD COLUMN IF NOT EXISTS last_logout_at DATETIME;
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      service VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      date VARCHAR(50),
      time VARCHAR(50),
      details TEXT,
      status VARCHAR(32) NOT NULL DEFAULT 'pending',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS services (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      description TEXT,
      features TEXT,
      from_price VARCHAR(50),
      tag VARCHAR(50),
      active TINYINT(1) NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS portfolio_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(100),
      metric VARCHAR(255),
      tag VARCHAR(255),
      description TEXT,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  // Portfolio case-study columns. Added separately so existing installs
  // upgrade in place without losing rows.
  await db.execute(`
    ALTER TABLE portfolio_items
      ADD COLUMN IF NOT EXISTS slug VARCHAR(255),
      ADD COLUMN IF NOT EXISTS short_description VARCHAR(500),
      ADD COLUMN IF NOT EXISTS full_description TEXT,
      ADD COLUMN IF NOT EXISTS technologies TEXT,
      ADD COLUMN IF NOT EXISTS github_url VARCHAR(500),
      ADD COLUMN IF NOT EXISTS live_url VARCHAR(500),
      ADD COLUMN IF NOT EXISTS image VARCHAR(500),
      ADD COLUMN IF NOT EXISTS featured TINYINT(1) NOT NULL DEFAULT 0,
      ADD COLUMN IF NOT EXISTS status VARCHAR(50),
      ADD COLUMN IF NOT EXISTS project_type VARCHAR(50),
      ADD COLUMN IF NOT EXISTS year INT,
      ADD COLUMN IF NOT EXISTS updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      company VARCHAR(255),
      message TEXT NOT NULL,
      rating INT DEFAULT 5,
      status VARCHAR(32) NOT NULL DEFAULT 'pending',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255),
      message TEXT NOT NULL,
      \`read\` TINYINT(1) NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  await db.execute(`
    ALTER TABLE contact_messages
      ADD COLUMN IF NOT EXISTS phone VARCHAR(50);
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS site_settings (
      \`key\` VARCHAR(100) PRIMARY KEY,
      value TEXT
    ) ENGINE=InnoDB;
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS admin_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      sender_id INT NOT NULL,
      recipient_id INT,
      subject VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      context VARCHAR(100),
      \`read\` TINYINT(1) NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  // Content audit. Earlier releases shipped defaults asserting a 2020 founding
  // date, 100+ clients, a 95% satisfaction rate and 24/7 availability. If an
  // install saved those defaults into site_settings they would keep overriding
  // the corrected copy, so the stored rows are cleared and the page falls back
  // to the current defaults. Anything the owner has since edited in
  // /admin/content can simply be re-entered there.
  await db.execute(`
    DELETE FROM site_settings WHERE \`key\` IN (
      'home_stats', 'home_badge', 'brand_tagline', 'about_subtitle',
      'about_title', 'about_highlight', 'portfolio_subtitle', 'portfolio_title',
      'portfolio_highlight', 'home_hero_title', 'home_hero_highlight',
      'home_hero_subtitle', 'home_why_heading', 'home_services_subtitle'
    );
  `);

  console.log('All migrations complete.');
}

migrate().catch((e) => { console.error(e); process.exit(1); });
