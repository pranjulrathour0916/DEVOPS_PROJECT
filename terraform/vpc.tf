# module "vpc" {
#   source = "terraform-aws-modules/vpc/aws"

#   name = "${local.name}-vpc"
#   cidr = "10.0.0.0/16"

#   azs             = local.azs
#   private_subnets = local.private_subnets
#   public_subnets  = local.public_subnets
#   intra_subnets  = local.intra_subnets

#   enable_dns_hostnames = true
#   enable_dns_support   = true
#   enable_nat_gateway = true
#   enable_vpn_gateway = true

#   tags = {
#     Terraform = "true"
#     Environment = local.env
#   }
# }