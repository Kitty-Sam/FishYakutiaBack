pipeline {

    agent {
            label 'ProdYF'
          }

    environment {
        GIT_TOKEN = credentials('GIT_TOKEN')
        DOCKERHUB_CREDENTIALS = credentials('kirilljbee_dockerhub')
        ENV = credentials('FISH.env')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(
                                branches: [[name: 'devops']],
                                userRemoteConfigs: [[credentialsId:'GIT_TOKEN',
                                url: 'https://github.com/Kitty-Sam/FishYakutiaBack.git']])
            }
        }

        // stage('Stop API server') {
        //      steps {
        //           sh 'docker compose --env-file ${ENV} down'
        //       }
        //  }

        // stage('Delete API server') {
        //      steps {
        //           sh 'docker rmi fishyakutiabackkitty-backend:latest'
                  
        //       }
        //  }

        // stage('Start API server') {
        //      steps {
        //           sh 'docker compose --env-file ${ENV} up -d'
        //       }
        //  }

    }

    post {
        always {
            cleanWs()
              dir("${env.WORKSPACE}@tmp") {
                          deleteDir()
              }
        }
    }
  
}
