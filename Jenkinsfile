pipeline {
  agent any
  tools { nodejs 'node20' }
  environment {
    GIT_USER_NAME  = 'jenkins-ci'
    GIT_USER_EMAIL = 'ci@jenkins'
    GH_REPO = 'https://github.com/Abhishek-RM12/bmi-calc.git'
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Install') {
      steps { sh 'npm ci || npm install' }
    }
    stage('Build') {
      steps { sh 'npm run build' }
    }
    stage('Deploy to GitHub Pages') {
      steps {
        withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
          sh '''
            rm -rf gh-pages
            if git ls-remote --heads https://github.com/$GH_REPO.git gh-pages | grep gh-pages; then
              git clone --depth 1 --branch gh-pages https://$GITHUB_TOKEN@github.com/$GH_REPO.git gh-pages
            else
              mkdir gh-pages && cd gh-pages && git init && git checkout -b gh-pages && cd ..
            fi
            rsync -av --delete dist/ gh-pages/
            cd gh-pages
            touch .nojekyll
            git add -A
            git -c user.name="$GIT_USER_NAME" -c user.email="$GIT_USER_EMAIL" commit -m "Deploy $BUILD_TAG" || true
            git remote remove origin || true
            git remote add origin https://$GITHUB_TOKEN@github.com/$GH_REPO.git
            git push -u origin gh-pages
          '''
        }
      }
    }
  }
}
