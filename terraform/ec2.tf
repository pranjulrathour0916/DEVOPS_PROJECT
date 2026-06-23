
# resource "aws_key_pair" "key2" {
#   key_name = "test-key2"
#   public_key = file("test_key.pub")
# }

# resource "aws_default_vpc" "default" {
  
# }
# resource "aws_security_group" "sg_1" {
#   name = "sg"
#   description = "the auto security group"
#   vpc_id = aws_default_vpc.default.id

#   ingress{
#     from_port = 22
#     to_port = 22
#     protocol = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#     description = "for ssh"
#   }

#   egress{
#     from_port = 0
#     to_port = 0
#     protocol = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#     description = "all access open"
#   }

# }

# resource "aws_instance" "test_instance" {

#      instance_type = "t3.micro"
#      security_groups = [aws_security_group.sg_1.name]
#      ami = "ami-07a00cf47dbbc844c"
#      key_name = aws_key_pair.key2.key_name
#      root_block_device {
#        volume_size = "15"
#        volume_type = "gp3"
#      }
#      tags = {
#         env = "dev"
#         name = "test-instance"
#      }

# }