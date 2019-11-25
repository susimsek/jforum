#!/usr/bin/env groovy

node {
    stage('checkout') {
        checkout scm
    }

    stage('check java') {
        sh "java -version"
    }

    stage('clean') {
        sh "chmod +x mvnw"
        sh "./mvnw -ntp clean"
    }
    stage('nohttp') {
        sh "./mvnw -ntp checkstyle:check"
    }

    stage('install tools') {
        sh "./mvnw -ntp com.github.eirslett:frontend-maven-plugin:install-node-and-yarn -DnodeVersion=v12.13.0 -DyarnVersion=v1.19.0"
    }

    stage('yarn install') {
        sh "./mvnw -ntp com.github.eirslett:frontend-maven-plugin:yarn"
    }

    stage('backend tests') {
        try {
            sh "./mvnw -ntp verify"
        } catch(err) {
            throw err
        } finally {
            junit '**/target/test-results/**/TEST-*.xml'
        }
    }

    stage('frontend tests') {
        try {
            sh "./mvnw -ntp com.github.eirslett:frontend-maven-plugin:yarn -Dfrontend.yarn.arguments='run test'"
        } catch(err) {
            throw err
        } finally {
            junit '**/target/test-results/**/TEST-*.xml'
        }
    }

    stage('packaging') {
        sh "./mvnw -ntp verify -Pprod -DskipTests"
        archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
    }
}
