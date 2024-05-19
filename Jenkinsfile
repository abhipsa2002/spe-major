pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'DockerHubCred'
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        GITHUB_REPO_URL = 'https://github.com/abhipsa2002/spe-major.git'
    }

    stages {
        stage('Github Checkout') {
            steps {
                script {
                    git branch: 'main', url: "${GITHUB_REPO_URL}"
                }
            }
        }

        stage('Build Backend with Maven') {
            steps {
                script {
                    dir('imagecaptioning') {
                        sh 'mvn clean package'
                        sh 'mvn clean install'
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker build -t abhipsapanda/backend ./imagecaptioning'
                    sh 'docker build -t abhipsapanda/frontend ./icfe'
                    sh 'docker build -t abhipsapanda/modelbe1 ./model'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    withDockerRegistry([credentialsId: "${DOCKERHUB_CREDENTIALS}"]) {
                        sh 'docker tag abhipsapanda/frontend abhipsapanda/frontend:latest'
                        sh 'docker push abhipsapanda/frontend:latest'

                        sh 'docker tag abhipsapanda/backend abhipsapanda/backend:latest'
                        sh 'docker push abhipsapanda/backend:latest'

                        sh 'docker tag abhipsapanda/modelbe1 abhipsapanda/modelbe1:latest'
                        sh 'docker push abhipsapanda/modelbe1:latest'
                    }
                }
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                script {
                    ansiblePlaybook(
                        playbook: 'deploy.yml',
                        inventory: 'inventory'
                    )
                }
            }
        }
    }
}
