---
tags:
  - cloudComputing
  - realTime
  - devOps
  - microservice
---
#cloudComputing #realTime #devOps #microservice 

# Container Orchestration
Container orchestrators provide automated management for containerized applications, especially in environments in which large numbers of containers are running on multiple hosts. In complex environments such as these, orchestrators are usually needed to handle operations such as deploying and scaling the containers. [Kubernetes](https://kubernetes.io/) and [Amazon Elastic Container Service (ECS)](https://aws.amazon.com/ecs/) are examples of popular container orchestration tools.
https://www.datadoghq.com/knowledge-center/containerized-applications/#the-role-of-container-orchestration-tools

Purspose Constainer applications:
- provide a secure, reliable, and lightweight runtime environment for applications that is consistent from host to host.

Purpose of serverless:
* provide a way to build and run applications without having to consider the underlying hosts at all. To support serverless applications, a cloud provider provisions and deallocates servers as needed behind the scenes.

## Kubernetes
System to automate deployment, scaling and management of containerized applications

**containerized applications:** are applications that run in isolated runtime environments called _containers_. Containers encapsulate an application with all its dependencies, including system libraries, binaries, and configuration files. https://www.datadoghq.com/knowledge-center/containerized-applications/