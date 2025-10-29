# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Abhishek-RM12/unitconverter-pipeline.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('.') {
                    bat '"C:\\Program Files\\nodejs\\npm.cmd" install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('.') {
                    bat '"C:\\Program Files\\nodejs\\npm.cmd" run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def sourceDir = "dist"
                    def targetDir = "C:\\ProgramData\\Jenkins\\.jenkins\\userContent\\unitconverter-pipeline"

                    bat "if not exist \"${targetDir}\" mkdir \"${targetDir}\""
                    bat "xcopy /s /e /y \"${sourceDir}\" \"${targetDir}\""
                }
            }
        }
    }

    post {
        success {
            echo "Unit Converter app built and deployed successfully!"
        }
        failure {
            echo "Build failed!"
        }
    }
}
