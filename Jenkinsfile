pipeline {
    agent any
    environment {
        APP_NAME = "ecom-web-app"
        BUILD_DIR = "ocp"
    }
    stages {
        stage('Checkout Source') {
            steps {
                checkout scm
                echo "Source code checked out successfully"
            }
        }
        stage('Create BuildConfig (If Not Exists)') {
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject() {
                            if (!openshift.selector("bc", env.APP_NAME).exists()) {
                                echo "Creating BuildConfig ${env.APP_NAME}"
                                openshift.newBuild(
                                    "--name=${env.APP_NAME}",
                                    "--image-stream=nginx:latest",
                                    "--binary=true"
                                )
                            } else {
                                echo "BuildConfig ${env.APP_NAME} already exists"
                            }
                        }
                    }
                }
            }
        }
        stage('Start Binary Build') {
            steps {
                script {
                    sh """
                        rm -rf ${BUILD_DIR}
                        mkdir -p ${BUILD_DIR}
                        cp *.html ${BUILD_DIR}/ || true
                        cp *.css ${BUILD_DIR}/ || true
                        cp *.js ${BUILD_DIR}/ || true
                    """
                    openshift.withCluster() {
                        openshift.withProject() {
                            echo "Starting binary build from ${BUILD_DIR}"
                            openshift.selector("bc", env.APP_NAME)
                                .startBuild(
                                    "--from-dir=${BUILD_DIR}",
                                    "--follow",
                                    "--wait=true"
                                )
                        }
                    }
                }
            }
        }
        stage('Deploy Application') {
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject() {
                            if (!openshift.selector("dc", env.APP_NAME).exists()) {
                                echo "Deploying application ${env.APP_NAME}"
                                def app = openshift.newApp(env.APP_NAME, "--as-deployment-config")
                                app.narrow("svc").expose()
                            } else {
                                echo "Application ${env.APP_NAME} already deployed"
                            }
                        }
                    }
                }
            }
        }
        stage('Verify Deployment') {
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject() {
                            def dc = openshift.selector("dc", env.APP_NAME)
                            dc.rollout().status()
                            echo "Application deployed and verified successfully"
                        }
                    }
                }
            }
        }
    }
    post {
        success {
            echo "✅ CI/CD Pipeline completed successfully"
        }
        failure {
            echo "❌ CI/CD Pipeline failed"
        }
    }
}
