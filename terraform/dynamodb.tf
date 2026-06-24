resource "aws_dynamodb_table" "dynamo-tera-state" {
  name             = "terra-state-table"
  hash_key         = "BrodoBaggins"
  billing_mode     = "PAY_PER_REQUEST"

  attribute {
    name = "LockId"
    type = "S"
  }

 tags = {
   Name = "terra-state-table"
 }
}