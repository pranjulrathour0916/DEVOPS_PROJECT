terraform {
  backend "s3" {
    bucket = "terra-bucket-state"
    key = "terraform.tfstate"
    region = "ap-south-1"
    dynamodb_table = "terra-state-table"
  }
}