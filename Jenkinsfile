pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'DockerHubCred'
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        GITHUB_REPO_URL = 'https://github.com/abhipsa2002/spe-major.git'
    }

    stages {
        stage('Cleanup Docker Images') {
            steps {
                script {
                    sh 'docker rm -f imagecapdb model-service imagecap-service imagecapapp || true'
                    sh 'docker rmi -f abhipsapanda/modebe1 abhipsapanda/backend abhipsapanda/frontend || true'
                }
            }
        }

        stage('Github Checkout') {
            steps {
                script {
                    git branch: 'main', url: "${GITHUB_REPO_URL}"
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    docker.build('rishithaiiitb/bemodel', './model')
                    docker.build('rishithaiiitb/backend', './imagecaptioning')
                    docker.build('rishithaiiitb/frontend', './icfe')
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', "${DOCKERHUB_CREDENTIALS}") {
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
