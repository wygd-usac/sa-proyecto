pipeline {
  agent any
  stages {
    stage('Pull-Repository') {
      steps {
        echo 'Repository was pulled.'
        //sh 'docker rmi $(docker images -q)'
      }
    }

    stage('ImageBuild-MicroServicio Cliente') {
      steps {
        echo 'Se ejecutara el deploy en producción.'
        sh 'docker build --no-cache --rm -t wygd/ms-cliente:latest -f ./Backend/cliente/Dockerfile.cliente ./Backend/cliente'
        sh 'docker build --no-cache --rm -t wygd/ms-administracion:latest -f ./Backend/administracion/Dockerfile.administracion ./Backend/administracion'
        sh 'docker build --no-cache --rm -t wygd/ms-serv-admin:latest -f ./Backend/servicio_administrativo/Dockerfile.servicio_admin ./Backend/servicio_administrativo'
        sh 'docker images'
        sh 'docker ps'
      }
    }

    // stage('Push-Microservicio Cliente') {
    //   environment {
    //     DOCKERHUB_CREDENTIALS = credentials('wygd-docker-hub')
    //   }
    //   steps {
    //     sh 'docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW'
    //     sh 'docker push wygd/ms-cliente:latest'
    //     sh 'docker logout'
    //   }
    // }

    // stage('ImageBuild-MicroServicio Administracion') {
    //   steps {
    //     echo 'Se ejecutara el deploy en producción.'
    //     sh 'docker build --no-cache --rm -t wygd/ms-administracion:latest -f ./Dockerfile.administracion .'
    //   }
    // }

    // stage('Push-Microservicio Administracion') {
    //   environment {
    //     DOCKERHUB_CREDENTIALS = credentials('wygd-docker-hub')
    //   }
    //   steps {
    //     sh 'docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW'
    //     sh 'docker push wygd/ms-administracion:latest'
    //     sh 'docker logout'
    //   }
    // }

    // stage('ImageBuild-MicroServicio Serv-Admin') {
    //   steps {
    //     echo 'Se ejecutara el deploy en producción.'
    //     sh 'docker build --no-cache --rm -t wygd/ms-serv-admin:latest -f ./Dockerfile.servicio_admin .'
    //     sh 'docker images'
    //     sh 'docker ps'
    //   }
    // }

    stage('Push-Microservicio Servicio Administrativo') {
      environment {
        DOCKERHUB_CREDENTIALS = credentials('wygd-docker-hub')
      }
      steps {
        sh 'docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW'
        sh 'docker push wygd/ms-serv-admin:latest'
        sh 'docker push wygd/ms-cliente:latest'
        sh 'docker push wygd/ms-administracion:latest'
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
    stage('Deploy-Ansible-test') {
      /*when {
        branch 'main'
      }*/
      steps {
        sh 'ls -a'
        sh 'ansible-playbook -i Ansible/inventory.test Ansible/playbook-compose.yaml'
      }
    }

  }
}