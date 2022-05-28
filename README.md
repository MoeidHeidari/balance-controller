# Grover monetary transaction

# Table of Contents

1. [Overview](#overview)
   1. [APIs](#provided-apis)
2. [Code architecture](#code-architecture)
3. [Build instruction](#service-build-information)
   1. [source code](#source-code)
   2. [NPM](#npm)
   3. [Docker](#docker)
   4. [Docker-compose](#docker-compose)
   5. [Start.sh script](#start.sh-script)
4. [Test](#test)
5. [Deployment](#instructions-for-deploying-the-software)
6. [Monitoring and alerting](#monitoring-and-alerting)
7. [OpenApi](#ppenApi)
8. [Documentation](#documentation)
9. [ToDo list](#to-do-list)

## Overview

Grover monetary transaction provides a bunch of REST APIs  to simulate a monetary transaction for the given user. It provides following list of APIs

---

#### Provided APIs

- Create new account (`/api/v1/account`)***[POST][GET][PUT][DELETE]***

- Deposit money (`/api/v1/balance/deposit`)***[POST]***

- Widraw money (`/api/v1/balance/widraw`)***[POST]***

- Show balance(`/api/v1/balance`)***[GET]***

---

## Code architecture

Onion Architecture

```bash
src
├── application
│   ├── controllers
│   └── dtos
├── domain
│   ├── decorators
│   ├── entities
│   ├── enums
│   │   └── httpResponse
│   ├── exceptions
│   ├── guards
│   ├── helpers
│   ├── interceptors
│   ├── interfaces
│   ├── modules
│   │   └── common
│   ├── pipes
│   ├── repositories
│   ├── seeders
│   └── servicecs
│       └── common
└── infrastructure
    ├── config
    └── modules
        └── common
```

Here we have three very main layers 

- Application
  
  in this layer we define the actual behavior of our application, thus being responsible for performing interactions among units of the domain layer.

- Domain
  
  this layer represents the business and behavior objects. we define units which play the role of entities and business rules and have a direct relationship to our domain

- Infrastructure
  
  this layer the boundary to whatever is external to our application: the database, email services, queue engines, etc.

---

## Service build information

There are different stages of building the application for this service. Based on the environment you want to deploy we have different ways to build the application. following information may help with building the service.

### source code

```bash
tar -xvf monetary-transaction.tar
cd monetary-transaction
```

#### NPM

```bash
npm install
npm run build
```

#### Docker

```bash
docker build . -t grover:latest
```

#### Docker-compose

```bash
docker-compose build
```

#### Start.sh script

```bash
sudo bash scripts/start.sh -h
Usage: start.sh [-h] [-build_docker] [-build_and_run_docker] [-stop_docker] [-run_app] [-run_test] [-run_lint] [-deploy_on_kubernetes] 


This script helps you to runn the application in different forms. below you can get the full list of available options.

Available options:

-h, --help              Print this help and exit
-build_docker           Build the docker image called "grover:latest"
-build_and_run_docker   Build the docker image and run on local machine
-stop_docker            Stop running docker container named "grover"
-run_app                Run application with npm in usual way for development
-run_test               Run npm test
-run_lint               Run npm lint
-generate_doc           Generate the code documentation
-deploy_on_kubernetes   you need to have a kubernetes cluster already up and running on the machine.
```

## Tests

```bash
npm test
 PASS  __test__/e2e-tests/e2e.spec.ts (6.367 s)
 PASS  __test__/account-balance-tests/account.spec.ts
 PASS  __test__/account-balance-tests/health.comtroller.spec.ts

Test Suites: 3 passed, 3 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        7.665 s
Ran all test suites.
```

## Instructions for deploying the software

#### Helm

with the following instruction you can make the helmchart ready for deployment. Following instruction make a app-0.1.0.tgz helm package. then we can install or push it to a helm repository.

```bash
cd k8s
helm package .
```

with the following instruction you can install the helm chart on an up and running kubernetes cluster.

```bash
helm install grover-app app-0.1.0.tgz --set service.type=NodePort
```

#### Kubernetes

Alternativelly you can deploy the application on an up an running kubernetes cluster using provided config files.

```bash
cd k8s/configFiles
kubectl apply -f grover-namespace.yaml, grover-configmap.yaml, grover-deployment.yaml, grover-service.yaml
```

it should give you following output

```bash
namespace/grover created
configmap/grover-config created
deployment.apps/grover created
service/grover created
```

#### Skaffold

Skaffold handles the workflow for building, pushing and deploying the application

```bash
make
```

```bash
skaffold dev --auto-build --auto-deploy --tail --cleanup
Listing files to watch...
 - grover
Generating tags...
 - grover -> grover:6b79957-dirty
Checking cache...
 - grover: Not found. Building
Starting build...
Found [minikube] context, using local docker daemon.
Building [grover]...
Target platforms: [linux/amd64]
[+] Building 14.0s (8/14)                                                                                                                                                                                          
 => [internal] load build definition from Dockerfile                                                                                                                                                          0.0s
 => => transferring dockerfile: 594B                                                                                                                                                                          0.0s
 => [internal] load .dockerignore                                                                                                                                                                             0.0s
 => => transferring context: 35B                                                                                                                                                                              0.0s
 => [internal] load metadata for docker.io/library/node:12.19.0-alpine3.9                                                                                                                                     1.3s
 => [internal] load build context                                                                                                                                                                             0.0s
 => => transferring context: 5.77kB                                                                                                                                                                           0.0s
 => [development 1/7] FROM docker.io/library/node:12.19.0-alpine3.9@sha256:63777fafdf8d55f53dc31910d0e086a7bd12c45f5bb09be63d720f5fb37a0635                                                                   0.0s
 => CACHED [development 2/7] WORKDIR /usr/src/app                                                                                                                                                             0.0s
 => CACHED [development 3/7] COPY package*.json ./                                                                                                                                                            0.0s
 => [development 4/7] RUN npm install glob rimraf                                                                                                                                                            10.5s
 => [production 4/6] RUN npm install
```

## Monitoring and alerting

#### Health check

by calling the following endpoint you can make sure that the application is running and listening to your desired port

`http://localhost:{port_number}/health`

most probably you will get a result back as follow

> **Example**
> {"status":"ok","info":{"alive":{"status":"up"}},"error":{},"details":{"alive":{"status":"up"}}}

mertics

to get the default metrics of the application you can use the following endpoint

`http://localhost:{port_number}/metrics`

## OpenApi

by calling the following endpoint you can see the Swagger OpenApi documentation and explore all the available apis and  schemas.

`http://localhost:{port_number}/api`

## Documentation

By running following comman you  can generate the full code documentation (Compodoc) and get access to it through port `7000`

```bash
npm run doc
```

http://localhost:7000

## ToDo list

- [ ]  add moneytion from one account to another account

- [ ]  apply commision to money transaction

- [ ]  apply commision to widraw money

- [ ]  apply deposit fee per minute to the balance

- [ ]  add counter metric to the apis

- [ ] 
