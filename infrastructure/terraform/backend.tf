terraform {
    backend "s3" {
        bucket         = "learnhub-terraform-state"
        key            = "terraform/backend"
        region         = "us-east-1"
    }
}