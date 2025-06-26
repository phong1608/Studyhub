

variable "frontend_project_name" {
  default = "my-vercel-app"
}

variable "aws_region" {
  default = "us-east-1"
}


variable "vpc_cidr" {
  default = "10.0.0.0/16"
}
variable "ec2_instance_type" {
  default = "t2.micro"
}

variable "ec2_ami_id" {
  default = "ami-0c55b159cbfafe1f0" # Ubuntu 20.04 (SG/SEA)
}

