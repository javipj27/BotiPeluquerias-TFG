provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "botipeluquerias" {
  ami                    = "ami-0f9de6e2d2f067fca"  # Ubuntu 22.04 LTS (por ejemplo)
  instance_type          = "t2.micro"
  key_name               = "BotiPeluquerias"
  vpc_security_group_ids = ["sg-01e62c8f8b15e47f1"]
  subnet_id              = "subnet-0ff43c912c80b8f20"

  # Subida del código fuente al servidor
  provisioner "file" {
    source      = "C:/Users/javip/Documents/BotiPeluquerias-TFG"
    destination = "/home/ubuntu/BotiPeluquerias-TFG"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("C:/Users/javip/.ssh/BotiPeluquerias.pem")
      host        = self.public_ip
    }
  }

  # Instalación de dependencias y despliegue con Docker
  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get install -y ca-certificates curl gnupg lsb-release",

      # Docker GPG Key
      "sudo mkdir -p /etc/apt/keyrings",
      "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg",

      # Docker repo
      "echo \"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable\" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null",

      "sudo apt-get update",

      # Instalar Docker y Compose plugin moderno
      "sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin",

      # Iniciar y habilitar Docker
      "sudo systemctl start docker",
      "sudo systemctl enable docker",

      

      # Cambiar al directorio y levantar los contenedores
      "cd /home/ubuntu/BotiPeluquerias-TFG",
      "sudo docker compose up -d",

      # Esperar a que MySQL esté listo y restaurar el dump
      "sleep 15",
      "sudo docker cp infra/dump.sql botipeluquerias-tfg-db-1:/dump.sql",
      "sudo docker exec botipeluquerias-tfg-db-1 sh -c 'mysql -u root -proot BotiPeluquerias < /dump.sql'",

      # Marcar finalización para depurar
      "echo 'Provisioning completed' > /home/ubuntu/provisioning_log.txt"
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("C:/Users/javip/.ssh/BotiPeluquerias.pem")
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