terraform {
  backend "s3" {
    bucket = "terra-backend-pr"
    key = "terra-backend-pr"
    region = "ap-south-1"
    use_lockfile = true
  }
}