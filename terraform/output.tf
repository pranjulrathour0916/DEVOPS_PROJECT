# output "pub_id" {
#   value = aws_instance.test_instance.public_ip
# }

# output "state" {
#   value = aws_instance.test_instance.instance_state
# }

# output "id" {
#   value = aws_instance.test_instance.id
# }

output "frontend_ecr_repo" {
 value = aws_ecr_repository.frontend.repository_url
}

output "backend_ecr_repo" {
 value = aws_ecr_repository.backend.repository_url
}