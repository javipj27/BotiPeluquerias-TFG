provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "botipeluquerias" {
  ami                    = "ami-0f9de6e2d2f067fca"  # Ubuntu 22.04 LTS
  instance_type          = "t2.micro"
  key_name               = "BotiPeluqueriasNueva"
  vpc_security_group_ids = ["sg-01e62c8f8b15e47f1"]
  subnet_id              = "subnet-0ff43c912c80b8f20"

  provisioner "file" {
    source      = "C:/Users/javip/Documents/BotiPeluquerias-TFG"
    destination = "/home/ubuntu/BotiPeluquerias-TFG"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("C:/Users/javip/.ssh/BotiPeluqueriasNueva.pem")
      host        = self.public_ip
    }
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get install -y ca-certificates curl gnupg lsb-release",

      # Instalar Docker
      "sudo mkdir -m 0755 -p /etc/apt/keyrings",
      "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg",
      "echo \"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable\" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null",
      "sudo apt-get update",
      "sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin",

      "sudo systemctl start docker",
      "sudo systemctl enable docker",

      # Mover a la carpeta del proyecto
      "cd /home/ubuntu/BotiPeluquerias-TFG",

      # Eliminar volumen previo (si existía)
      "sudo docker volume rm botipeluquerias_db_data || true",

      # Levantar servicios
      "sudo docker compose up -d --build",

      # Esperar a MySQL
      "echo 'Esperando a MySQL...'; sleep 25",

      # Importar dump SQL
      "sudo docker cp infra/dump.sql botipeluquerias-db-1:/dump.sql",
      "sudo docker exec botipeluquerias-db-1 sh -c 'mysql --binary-mode=1 -u root -proot BotiPeluquerias < /dump.sql'",

      "echo 'Provisioning completed' | sudo tee /home/ubuntu/provisioning_log.txt"
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("C:/Users/javip/.ssh/BotiPeluqueriasNueva.pem")
      host        = self.public_ip
    }
  }

  tags = {
    Name = "BotiPeluquerias"
  }
}

output "public_ip" {
  value       = aws_instance.botipeluquerias.public_ip
  description = "IP pública de la instancia EC2"
}
