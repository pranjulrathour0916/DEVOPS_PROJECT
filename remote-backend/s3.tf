resource "aws_s3_bucket" "state" {
  bucket = "terra-backend-pr"
  tags = {
    name = "terra-backend-pr"
    env = "dev"
  }
}
