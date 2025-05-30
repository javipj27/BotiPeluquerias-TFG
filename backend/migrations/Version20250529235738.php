<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250529235738 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE cita (id INT AUTO_INCREMENT NOT NULL, peluqueria VARCHAR(255) NOT NULL, peluquero VARCHAR(100) NOT NULL, fecha_hora DATETIME NOT NULL, nombre_cliente VARCHAR(100) NOT NULL, usuario_id INT NOT NULL, INDEX IDX_3E379A62DB38439E (usuario_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE compra (id INT AUTO_INCREMENT NOT NULL, productos JSON NOT NULL, total DOUBLE PRECISION NOT NULL, fecha DATETIME NOT NULL, usuario_id INT NOT NULL, INDEX IDX_9EC131FFDB38439E (usuario_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE peluqueria (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) NOT NULL, direccion VARCHAR(255) NOT NULL, telefono VARCHAR(255) NOT NULL, descripcion LONGTEXT NOT NULL, imagen VARCHAR(255) DEFAULT NULL, logo VARCHAR(255) DEFAULT NULL, peluqueros JSON DEFAULT NULL, productos JSON DEFAULT NULL, galeria JSON DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE usuario (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, password VARCHAR(255) NOT NULL, roles JSON NOT NULL, api_token VARCHAR(64) DEFAULT NULL, is_verified TINYINT(1) NOT NULL, verification_token VARCHAR(64) DEFAULT NULL, username VARCHAR(50) NOT NULL, nombre VARCHAR(100) NOT NULL, telefono VARCHAR(20) DEFAULT NULL, foto_perfil VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_2265B05DE7927C74 (email), UNIQUE INDEX UNIQ_2265B05D7BA2F5EB (api_token), UNIQUE INDEX UNIQ_2265B05DF85E0677 (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE cita ADD CONSTRAINT FK_3E379A62DB38439E FOREIGN KEY (usuario_id) REFERENCES usuario (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE compra ADD CONSTRAINT FK_9EC131FFDB38439E FOREIGN KEY (usuario_id) REFERENCES usuario (id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE cita DROP FOREIGN KEY FK_3E379A62DB38439E
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE compra DROP FOREIGN KEY FK_9EC131FFDB38439E
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE cita
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE compra
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE peluqueria
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE usuario
        SQL);
    }
}
