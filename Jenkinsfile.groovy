pipeline {

    agent { 
            label 'Server'
          }

    environment {
        GIT_TOKEN = credentials('GIT_TOKEN')
        DOCKERHUB_CREDENTIALS = credentials('kirilljbee_dockerhub')
        NAME_IMAGE = 'kirilljbee/FishYakutiaBack:latest'
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

        // stage('Build image webpage') { 
        //     steps {
        //         sh 'docker build -t ${NAME_IMAGE} .'    
        //     }
        // }

        // stage('Push image webpage') {
        //     steps {
        //         sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
        //         sh 'docker push ${NAME_IMAGE}'
        //         sh 'docker system prune -af'
        //     }
        // }

        // stage('Terraform init') {
        //     steps {
        //         sh 'terraform init'
        //     }  
        // }

        // stage('Terraform plan') {
        //     steps {
        //         sh 'terraform plan -out tfplan'
        //         sh 'terraform show -no-color tfplan > tfplan.txt'
        //     }
        // }

        // stage('Apply/Destroy') {
        //     steps {
        //         //sh 'terraform apply -input=false tfplan'
        //         sh 'terraform destroy --auto-approve'
        //     }
        // }

        // stage('Deploy webimage') {

        //     steps {
        //         script {
        //             withCredentials([
        //                 file(credentialsId: 'DH_vaultkey', variable: 'ANSIBLE_VAULT_KEY')
        //                 ]) {
        //                 sh 'ansible-playbook -i dynamic_inventory.ini --vault-password-file $ANSIBLE_VAULT_KEY playbook.yml'
        //             }
        //         }         
        //     }
        // }
    }

        

    // post { 

    //     success {
    //         mail to: 'jbeework@gmail.com',
    //         subject: "Job '${JOB_NAME}' (${BUILD_NUMBER}) was successfully completed!",
    //         body: "Please go to ${BUILD_URL} and verify the build"      
    //     }

    //     failure {
    //         mail to: 'jbeework@gmail.com',
    //         subject: "Job '${JOB_NAME}' (${BUILD_NUMBER}) ended unsuccessfully!",
    //         body: "Please go to ${BUILD_URL} and verify the build"              
    //     }

    //     aborted {
    //         mail to: 'jbeework@gmail.com',
    //         subject: "Job '${JOB_NAME}' (${BUILD_NUMBER}) was aborted",
    //         body: "Please go to ${BUILD_URL} and verify the build" 
    //     }
    // }
}