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

  }
}