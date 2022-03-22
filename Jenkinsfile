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
      /*when {
        branch 'main'
      }*/
      environment {
        DOCKERHUB_CREDENTIALS = credentials('wygd-docker-hub')
      }
      steps {
        sh 'docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW'
        sh 'docker push wygd/ms-cliente:latest'
        sh 'docker logout'
      }
    }

    stage('Push-producción') {
      when {
        branch 'feature/frontend'
      }
      
      steps {
        sh 'node -v'
      }
    }


    stage('Deploy-Ansible-Producción') {
      // when {
      //   branch 'main'
      // }
      steps {
        sh 'ls -a'
        sh 'ansible-playbook -i Ansible/inventory.test Ansible/playbook-compose.yaml'
      }
    }

  }
}