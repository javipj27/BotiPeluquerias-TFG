provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "botipeluquerias" {
  ami           = "ami-0f9de6e2d2f067fca"
  instance_type = "t2.micro"
  key_name      = "BotiPeluquerias" 
  vpc_security_group_ids = ["sg-01e62c8f8b15e47f1"]
  subnet_id     = "subnet-0ff43c912c80b8f20"

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

  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get install -y docker.io docker-compose",
      "cd /home/ubuntu/BotiPeluquerias-TFG",
      "sudo docker-compose up -d"
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