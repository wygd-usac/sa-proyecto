pipeline {
  agent any
  stages {
    stage('Pull-Repository') {
      steps {
        echo 'Repository was pulled.'
      }
    }

    stage('ImageBuild-Prueba docker desde jenkins') {
      steps {
        echo 'Se ejecutara el deploy en producción.'
        sh 'docker build --no-cache --rm -t wygd/ms-cliente:latest -f ./Dockerfile.cliente .'
        sh 'docker images'
        sh 'docker ps'
      }
    }

    stage('Push-producción') {
      environment {
        DOCKERHUB_CREDENTIALS = credentials('wygd-docker-hub')
      }
      steps {
        sh 'docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW'
        sh 'docker push wygd/ms-cliente:latest'
        sh 'docker logout'
      }
    }

    stage('node testing') {
      when {
        branch 'feature/frontend'
      }
      steps {
        sh 'node -v'
        dir(path: 'Frontend') {
          sh 'pwd'
          sh 'npm install'
          sh 'npm run build --prod'
          sh 'ls -a'
        }

      }
    }
    stage('Deploy-frontend-test') {
      when {
        branch 'feature/frontend'
      }
      steps {
        sh 'ls Frontend -a'
        sh 'ansible-playbook -i Ansible/inventory.test Ansible/playbook-frontend.yaml'
      }
    }
    stage('Deploy-Ansible-Producción') {
      when {
        branch 'main'
      }
      steps {
        sh 'ls -a'
        sh 'ansible-playbook -i Ansible/inventory.test Ansible/playbook-compose.yaml'
      }
    }

  }
}