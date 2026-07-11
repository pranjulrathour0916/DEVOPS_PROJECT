# module "eks" {
#   source  = "terraform-aws-modules/eks/aws"
#   version = "~> 21.0"

#   name               = local.name
#   kubernetes_version = "1.33"

#   # Optional
#   endpoint_public_access = true

#   # Optional: Adds the current caller identity as an administrator via cluster access entry
#   enable_cluster_creator_admin_permissions = true

#   control_plane_subnet_ids = module.vpc.intra_subnets

#   vpc_id     = module.vpc.vpc_id
#   subnet_ids = module.vpc.private_subnets

#     cluster_addons = {
#         vpc-cni = {}
#         kube-proxy = {}
#         coredns = {}
#     }


#   eks_managed_node_groups  = {
#     pranjul-ng = {
#       instance_types = ["t3.small"]
#       attach_cluster_primary_security_group = true
#       capacity_type = "SPOT"
#       disk_size = 15
#       min_size     = 1
#       max_size     = 2
#       desired_size = 1
#     }
#   }

#   tags = {
#     Environment = "dev"
#     Terraform   = "true"
#   }
# }