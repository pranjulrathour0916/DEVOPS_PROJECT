resource "aws_s3_bucket" "state" {
  bucket = "terra-bucket-state"
  tags = {
    name = "test_bucket_state"
    env = "dev"
  }
}
