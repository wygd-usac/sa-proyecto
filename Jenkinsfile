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
        //sh 'docker build --no-cache --rm -t wygd/pagina:latest -f Practica4/Dockerfile ./Practica4'
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
        //sh 'docker push wygd/pagina:latest'
        sh 'docker logout'
      }
    }

  }
}