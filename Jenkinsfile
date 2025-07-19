pipeline {
    triggers {
        pollSCM('H/5 * * * *')
        cron('H 0 * * *')
    }

    environment {
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
    }

    agent none

    stages {
        stage('Pull Project') {
            agent any
            steps {
                git branch: 'main', credentialsId: '6c22d2a7-8a29-4427-af5d-17588aa40f01', url: 'https://git.epam.com/yevhen_sydorenko/at-mentoring-programm.git'
            }
        }

        // stage('Sonarqube Quality Gate') {
        //     agent any
        //     steps {
        //         script {
        //             scannerHome = tool 'SonarScanner'
        //         }
        //         withSonarQubeEnv('SonarScanner') { // If you have cname
        //             sh "$scannerHome/bin/sonar-scanner"
        //         }
        //         waitForQualityGate abortPipeline: true
        //     }
        // }

        // stage('Install project dependencies') {
        //     agent {
        //         docker {
        //             image 'mcr.microsoft.com/playwright:v1.35.0-jammy'
        //         }
        //     }
        //     steps {
        //         sh 'npm i'
        //     }
        // }

        stage('Run Ui tests on test-application.com') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.35.0-jammy'
                }
            }
            steps {
                sh 'npm run ui:remote'
                waitForQualityGate abortPipeline: false

            }
        }

        stage('Generate and publish test report') {
            agent any
            steps {
                tool name: 'allurecl', type: 'allure'
                junit 'reports/xml/results.xml'
                allure includeProperties: false, jdk: '', results: [[path: 'reports/allure-generate']]
                sh './framework/sendResultsToTeams.sh "$BUILD_URL" "$BUILD_NUMBER"'
            }
        }
    }
}
