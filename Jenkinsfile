pipeline {
  agent any
  stages {
    stage('Pull-Repository') {
      steps {
        echo 'Repository was pulled.'
        //sh 'docker rmi $(docker images -q)'
      }
    }

    stage('Run Test Cliente') {
      steps {
        dir(path: 'Backend/cliente') {
          sh 'npm install'
          sh 'npm test'
        }

      }
    }

    stage('Run Test Servicio_Administrativo') {
      steps {
        dir(path: 'Backend/servicio_administrativo') {
          sh 'npm install'
          //sh 'npm test'
        }

      }
    }

    stage('ImageBuild-MicroServicio Testing') {
      when {
        branch 'develop'
      }
      steps {
        echo 'Se ejecutara el deploy en producción.'
        sh 'docker build --no-cache --rm -t wygd/ms-cliente2-test:latest -f ./Backend/cliente/Dockerfile.cliente ./Backend/cliente'
        sh 'docker build --no-cache --rm -t wygd/ms-administracion-test:latest -f ./Backend/administracion/Dockerfile.administracion ./Backend/administracion'
        sh 'docker build --no-cache --rm -t wygd/ms-serv-admin-test:latest -f ./Backend/servicio_administrativo/Dockerfile.servicio_admin ./Backend/servicio_administrativo'
        sh 'docker build --no-cache --rm -t wygd/ms-usuario-test:latest -f ./Backend/usuario/Dockerfile.usuario ./Backend/usuario'
        sh 'docker build --no-cache --rm -t wygd/ms-reporte-test:latest -f ./Backend/reporte/Dockerfile.reporte ./Backend/reporte'
        sh 'docker build --no-cache --rm -t wygd/ms-jwt-test:latest -f ./Backend/jwt/Dockerfile.jwt ./Backend/jwt'
        sh 'docker images'
        sh 'docker ps'
      }
    }


    stage('ImageBuild-MicroServicios Production') {
      when {
        branch 'main'
      }
      steps {
        echo 'Se ejecutara el deploy en producción.'
        sh 'docker build --no-cache --rm -t wygd/ms-cliente-production:latest -f ./Backend/cliente/Dockerfile.cliente ./Backend/cliente'
        sh 'docker build --no-cache --rm -t wygd/ms-administracion-production:latest -f ./Backend/administracion/Dockerfile.administracion ./Backend/administracion'
        sh 'docker build --no-cache --rm -t wygd/ms-serv-admin-production:latest -f ./Backend/servicio_administrativo/Dockerfile.servicio_admin ./Backend/servicio_administrativo'
        sh 'docker build --no-cache --rm -t wygd/ms-usuario-production:latest -f ./Backend/usuario/Dockerfile.usuario ./Backend/usuario'
        sh 'docker build --no-cache --rm -t wygd/ms-reporte-production:latest -f ./Backend/reporte/Dockerfile.reporte ./Backend/reporte'
        sh 'docker build --no-cache --rm -t wygd/ms-jwt-production:latest -f ./Backend/jwt/Dockerfile.jwt ./Backend/jwt'
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

    stage('Push-Microservicio Servicio Testing') {
      when {
        branch 'develop'
      }
      environment {
        DOCKERHUB_CREDENTIALS = credentials('wygd-docker-hub')
      }
      steps {
        sh 'docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW'
        sh 'docker push wygd/ms-serv-admin-test:latest'
        sh 'docker push wygd/ms-cliente2-test:latest'
        sh 'docker push wygd/ms-administracion-test:latest'
        sh 'docker push wygd/ms-usuario-test:latest'
        sh 'docker push wygd/ms-reporte-test:latest'
        sh 'docker push wygd/ms-jwt-test:latest'
        
        sh 'docker logout'
      }
    }

    stage('Push-Microservicio Servicio Production') {
      when {
        branch 'main'
      }
          environment {
            DOCKERHUB_CREDENTIALS = credentials('wygd-docker-hub')
          }
          steps {
            sh 'docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW'
            sh 'docker push wygd/ms-serv-admin-production:latest'
            sh 'docker push wygd/ms-cliente-production:latest'
            sh 'docker push wygd/ms-administracion-production:latest'
            sh 'docker push wygd/ms-usuario-production:latest'
            sh 'docker push wygd/ms-reporte-production:latest'
            sh 'docker push wygd/ms-jwt-production:latest'
            
            sh 'docker logout'
          }
        }

    stage('Build Frontend Test') {
      when {
        branch 'master'
      }
      steps {
        sh 'node -v'
        dir(path: 'FrontendUI') {
          sh 'pwd'
          sh 'npm install'
          sh 'npm run build'
          sh 'ls -a'
        }
      }
    }

    stage('Build Frontend Production') {
      when {
        branch 'main'
      }
      steps {
        sh 'node -v'
        dir(path: 'FrontendUI') {
          sh 'pwd'
          sh 'npm install'
          sh 'npm run build --prod'
          sh 'ls -a'
        }

      }
    }
    stage('Deploy-frontend-test') {
      when {
        branch 'master'
      }
      steps {
        sh 'ls FrontendUI -a'
        sh 'ansible-playbook -i Ansible/inventory.test Ansible/playbook-frontend-test.yaml'
      }
    }
    stage('Deploy-Ansible-test') {
      when {
        branch 'develop'
      }
      steps {
        sh 'ls -a'
        sh 'ansible-playbook -i Ansible/inventory.test Ansible/playbook-compose-test.yaml'
      }
    }


    stage('Deploy-frontend-production') {
      when {
        branch 'main'
      }
      steps {
        sh 'ls FrontendUI -a'
        sh 'ansible-playbook -i Ansible/inventory.production Ansible/playbook-frontend-production.yaml'
      }
    }
    stage('Deploy-Ansible-production') {
      when {
        branch 'main'
      }
      steps {
        sh 'ls -a'
        sh 'ansible-playbook -i Ansible/inventory.production Ansible/playbook-compose-production.yaml'
      }
    }

  }
}