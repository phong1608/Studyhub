output "ecs_cluster_name" {
  value = aws_ecs_cluster.ecs_cluster.name
}

output "ecs_service_name" {
  value = aws_ecs_service.ecs_service.name
}

output "ecs_instance_public_ips" {
  description = "Public IPs of EC2 instances in ECS Auto Scaling Group"
  value       = data.aws_instances.ecs_instances.public_ips
}
output "alb_dns_name" {
  description = "The DNS name of the ALB"
  value       = aws_lb.ecs_alb.dns_name
}
