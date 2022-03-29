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
        sh 'docker build --no-cache --rm -t wygd/ms-cliente:test -f ./Backend/cliente/Dockerfile.cliente ./Backend/cliente'
        sh 'docker build --no-cache --rm -t wygd/ms-administracion:test -f ./Backend/administracion/Dockerfile.administracion ./Backend/administracion'
        sh 'docker build --no-cache --rm -t wygd/ms-serv-admin:test -f ./Backend/servicio_administrativo/Dockerfile.servicio_admin ./Backend/servicio_administrativo'
        sh 'docker build --no-cache --rm -t wygd/ms-usuario:test -f ./Backend/usuario/Dockerfile.usuario ./Backend/usuario'
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
        sh 'docker push wygd/ms-serv-admin:test'
        sh 'docker push wygd/ms-cliente:test'
        sh 'docker push wygd/ms-administracion:test'
        sh 'docker push wygd/ms-usuario:test'
        sh 'docker logout'
      }
    }

    stage('Build Frontend Test') {
      when {
        branch 'feature/image-building'
      }
      steps {
        sh 'node -v'
        dir(path: 'Frontend') {
          sh 'pwd'
          sh 'npm install'
          sh 'npm run build'
          sh 'ls -a'
        }
      }
    }

    stage('Build Frontend Production') {
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
        branch 'feature/image-building'
      }
      steps {
        sh 'ls Frontend -a'
        sh 'ansible-playbook -i Ansible/inventory.test Ansible/playbook-frontend-test.yaml'
      }
    }
    stage('Deploy-Ansible-test') {
      /*when {
        branch 'main'
      }*/
      steps {
        sh 'ls -a'
        sh 'ansible-playbook -i Ansible/inventory.test Ansible/playbook-compose-test.yaml'
      }
    }

  }
}