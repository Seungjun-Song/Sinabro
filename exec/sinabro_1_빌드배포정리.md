# 포팅 매뉴얼

## 시작 하기 전 기본 세팅(다운로드 및 설정)

- MobaXterm 다운로드

- dockerhub 회원가입 및 로그인

- EC2 인스턴스 생성
  - 인바운드 규칙 동적 포트 범위(20000 - 25000, 32768 - 60999) 열기

## Dockerfile 생성

### IntelliJ 최상단 디렉토리에 Dockerfile 생성
```
# Dockerfile
FROM openjdk:17-jdk
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=prod","-Duser.timezone=Asia/Seoul","-jar","app.jar"]
```

## 1번째 EC2 서버 접속하기 

![image](https://github.com/Seungjun-Song/Sinabro/assets/80227755/5099fa14-bdf4-4517-8db7-1d4ca8997a1e)

- MobaXterm 실행 후 좌측 상단의 Session 클릭

- 위와 같이 Remote host, Specify username, Use private key 을 입력해준다

## docker 설치
```
$ sudo apt update

$ sudo apt install apt-transport-https ca-certificates curl software-properties-common

$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

$ sudo apt update

$ sudo apt install docker-ce

$ sudo usermod -aG docker $USER

$ sudo reboot
```

## Dockerfile 생성 및 실행

### Dockerfile 생성
```
$ vi Dockerfile
```

```
# 사용할 Jenkins 이미지
FROM jenkins/jenkins:jdk17

# Docker CLI, Node.js, 그리고 Gradle 설치를 위한 설정
USER root

# 필수 패키지 설치
RUN apt-get update && \
    apt-get install -y apt-transport-https \
                       ca-certificates \
                       curl \
                       gnupg-agent \
                       software-properties-common

# wget과 unzip 설치 추가
RUN apt-get install -y wget unzip

# Docker 저장소 추가 및 Docker CLI 설치
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
    add-apt-repository \
       "deb [arch=amd64] https://download.docker.com/linux/debian \
       $(lsb_release -cs) \
       stable" && \
    apt-get update && \
    apt-get install -y docker-ce-cli

# Node.js 설치 (NodeSource Node.js 20.x repo 추가)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Gradle 설치
RUN wget https://services.gradle.org/distributions/gradle-8.7-bin.zip -P /tmp && \
    unzip -d /opt/gradle /tmp/gradle-8.7-bin.zip && \
    rm /tmp/gradle-8.7-bin.zip

# Gradle 환경변수 설정
ENV GRADLE_HOME=/opt/gradle/gradle-8.7
ENV PATH=$PATH:$GRADLE_HOME/bin

USER jenkins
```

### Dockerfile 실행
```
$ docker build -t jenkins .
```

## docker-compose 생성 및 실행

### docker-compose.yml 생성
```
$ vi docker-compose.yml
```

```
services:
  jenkins:
    image: jenkins
    container_name: jenkins
    ports:
      - "9090:8080"
    volumes:
      - /home/ubuntu/jenkins-data:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock

  mysql:
    image: mysql:latest
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: k10hp50e0509

  neo4j:
    image: neo4j:latest
    container_name: neo4j
    ports:
      - "7474:7474"
      - "7687:7687"
    environment:
      NEO4J_AUTH: neo4j/WdmK2PA0Je3GvFB

  redis:
    image: redis:latest
    container_name: redis
    ports:
      - "6379:6379"
    environment:
      REDIS_PASSWORD: Sinabro!k103

  postgres:
    image: postgres:latest
    container_name: postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: sinabro
      POSTGRES_USER: root
      POSTGRES_PASSWORD: k10hp50e0509

  sonarqube:
    image: sonarqube:latest
    container_name: sonarqube
    ports:
      - "9000:9000"
    environment:
      SONAR_JDBC_URL: jdbc:postgresql://postgres:5432/sinabro
      SONAR_JDBC_USERNAME: root
      SONAR_JDBC_PASSWORD: k10hp50e0509
    depends_on:
      - postgres

  sonarscanner:
    image: sonarsource/sonar-scanner-cli:latest
    container_name: sonar-scanner
    environment:
      - SONAR_HOST_URL=http://sonarqube:9000
    entrypoint: ["/bin/bash", "-c", "while ! nc -z sonarqube 9000; do sleep 1; done; sonar-scanner"]
    depends_on:
      - sonarqube
```

```
$ esc :wq
```

### docker-compose.yml 실행
```
$ docker compose up -d
```

## openvidu 설치

```
// 관리자 권한
$ sudo su

// openvidu가 설치되는 경로
$ cd /opt

// openvidu on promises 설치
$ curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash
```

## openvidu 세팅

### openvidu 도메인 지정 및 포트 지정

```
$ sudo vi /opt/openvidu/.env
```

```
# OpenVidu configuration
# ----------------------
# Domain name. If you do not have one, the public IP of the machine.
# For example: 198.51.100.1, or openvidu.example.com
DOMAIN_OR_PUBLIC_IP=k10e103.p.ssafy.io

# OpenVidu SECRET used for apps to connect to OpenVidu server and users to access to OpenVidu Dashboard
OPENVIDU_SECRET=[OpenVidu 비밀번호]

# Certificate type:
# - selfsigned:  Self signed certificate. Not recommended for production use.
#                Users will see an ERROR when connected to web page.
# - owncert:     Valid certificate purchased in a Internet services company.
#                Please put the certificates files inside folder ./owncert
#                with names certificate.key and certificate.cert
# - letsencrypt: Generate a new certificate using letsencrypt. Please set the
#                required contact email for Let's Encrypt in LETSENCRYPT_EMAIL
#                variable.
CERTIFICATE_TYPE=letsencrypt

# If CERTIFICATE_TYPE=letsencrypt, you need to configure a valid email for notifications
LETSENCRYPT_EMAIL=[본인 이메일]

# Proxy configuration
# If you want to change the ports on which openvidu listens, uncomment the following lines

# Allows any request to http://DOMAIN_OR_PUBLIC_IP:HTTP_PORT/ to be automatically
# redirected to https://DOMAIN_OR_PUBLIC_IP:HTTPS_PORT/.
# WARNING: the default port 80 cannot be changed during the first boot
# if you have chosen to deploy with the option CERTIFICATE_TYPE=letsencrypt
HTTP_PORT=8081

# Changes the port of all services exposed by OpenVidu.
# SDKs, REST clients and browsers will have to connect to this port
HTTPS_PORT=8443
```

```
$ esc :wq
```

### lets encrypt 인증서 파일 볼륨 마운트

```
$ sudo vi /opt/openvidu/docker-compose.yml
```

```
# docker-compose.yml
nginx:
        image: openvidu/openvidu-proxy:2.29.0
        restart: always
        network_mode: host
        volumes:
            - /etc/letsencrypt:/etc/letsencrypt
            - ./owncert:/owncert
            - ./custom-nginx-vhosts:/etc/nginx/vhost.d/
            - ./custom-nginx-locations:/custom-nginx-locations
            - ${OPENVIDU_RECORDING_CUSTOM_LAYOUT}:/opt/openvidu/custom-layout
```

```
$ esc :wq
```

### openviud 실행

```
$ cd /opt/openvidu/

$ ./openvidu start

$ Ctrl + C
```

## Nginx 설치 및 실행

```
$ sudo apt update

$ sudo apt install nginx

$ sudo service nginx start

$ sudo service nginx status
```

![image](https://github.com/Seungjun-Song/gollajyu/assets/80227755/93731c49-6519-44c1-9906-5ec8ebc145b7)

<실행 성공 화면>

## Web Server https 적용

```
$ sudo apt update

$ sudo apt upgrade

$ sudo snap install *--classic certbot*

$ sudo certbot --nginx
중간에 도메인 입력칸 나오면 도메인 입력
1, 2 선택 묻는거 나오면 2 선택
1을 입력한다면 http 연결을 https로 리다이렉트 하지 않습니다.
2를 입력한다면 https 연결을 https로 리다이렉트 시킵니다.
```

## Nginx 설정

```
$ sudo vi /etc/nginx/sites-enabled/default
```

```
server {
        root /home/ubuntu/dist;

        index index.html index.htm index.nginx-debian.html;
        server_name k10e103.p.ssafy.io; # managed by Certbot

        location / {
                try_files $uri $uri/ /index.html;
        }

        location /api {
                proxy_pass http://localhost:8080;
        }

        listen [::]:443 ssl ipv6only=on; # managed by Certbot
        listen 443 ssl; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/k10e103.p.ssafy.io/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/k10e103.p.ssafy.io/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
server {
        if ($host = k10e103.p.ssafy.io) {
                return 301 https://$host$request_uri;
        } # managed by Certbot

        listen 80 ;
        listen [::]:80 ;
        server_name k10e103.p.ssafy.io;
        return 404; # managed by Certbot
}
```

```
$ esc :wq

$ sudo service nginx restart
```

## pem key 업로드

![image](https://github.com/Seungjun-Song/Sinabro/assets/80227755/f984445c-7606-4ecc-9ffb-15ffe6904a31)

### pem key 2개 다 업로드 후에

```
$ sudo mv K10E103T.pem /etc/keys

$ sudo mv sinabro.pem /etc/keys
```

## Jenkins

1. jenkins 컨테이너 접속
    ```
    $ docker exec -it jenkins bash
    ```

2. 초기 관리자 키 확인
    ```
    $ cat /var/jenkins_home/secrets/initialAdminPassword
    ```

3. 초기 관리자 계정 생성

4. jenkins plugin 설치

    - GitLab
    - SSH Agent
    - Docker Pipeline
    - Mattermost Notification Plugin

5. System 설정

    - MM
        - 좌측 상단 그리드 아이콘 클릭
        - 통합 클릭
        - 전체 Incoming Webhook 클릭
        - Incoming Webhook 추가하기 클릭
        - 제목, 설명, 채널 선택 후 저장
        - 생성된 Webhook URL 복사
        - 밖으로 나가서 지정한 채널을 우클릭 하고 링크 복사
        ![image](https://github.com/Seungjun-Song/Sinabro/assets/80227755/de6f2811-d20f-4722-a066-d4df4cdc716e)
        - https://meeting.ssafy.com/s10p30e1/channels/772f3b16d37a7f6a6ca623ad054eb43f 이렇게 링크가 나오면 제일 마지막의 772f3b16d37a7f6a6ca623ad054eb43f만 따로 복사

    - jenkins page
        - System 설정
        - Global Mattermost Notifier Settings 찾기
        - Endpoint에 위에서 복사한 Webhook URL 입력
        - channel에 위에서 복사한 채널 링크 주소 입력
        - Test Connection을 눌렀을 때 Success가 뜨면 성공
        ![image](https://github.com/Seungjun-Song/Sinabro/assets/80227755/b36e9a79-8065-4ff4-bbc7-67526005b5b7)

6. jenkins credentials 등록

    - aws
        - Kind : SSH Username with private key
        - ID : aws-key
        - Private Key : pem키 private key(cat 또는 vs code 등으로 열람)

    - gitlab
        - Kind : Username with password
        - Username : gitlab Id
        - Password : gitlab access token
        - ID : gitlab

    - docker-hub
        - Kind : Username with password
        - Username : dockerhub Id
        - Password : dockerhub access token
        - ID : dockerhub
    
    - secret file
        - Kind : Secret file
        - File : .env
        - ID : front-env

    - secret file
        - Kind : Secret file
        - File : application-prod.yml
        - ID : back-env

7. front

    - Pipeline type으로 front, back 이라는 이름으로 2개의 Item 생성

    - front Item의 설정 들어가기

    - jenkins push event 설정(fe/dev 브랜치에 푸시하면 자동으로 배포 및 빌드 진행)
        - jenkins page
            - Build Triggers - Build when a change is pushed to GitLab. GitLab webhook URL: http://k10e103.p.ssafy.io:9090/project/front 클릭
            - Push Events 클릭
            - 고급 클릭
            - Secret token Generate 후 복사

        - gitlab page
            - gitlab - Settings - Webhooks - Add new webhook
            - URL: http://k10e103.p.ssafy.io:9090/project/front
            - Secret token: jenkins에서 복사한 Secret token 입력
            - Trigger에서 Push events 선택
            - Wildcard pattern에서 배포를 원하는 브랜치 입력(fe/dev)

    - jenkins pipeline
        ```
        pipeline {
            agent any
            environment {
                GIT_BRANCH = 'fe/dev'
                GIT_CREDENTIALS = 'gitlab'
                GIT_URL = 'https://lab.ssafy.com/s10-final/S10P31E103'
                FRONT_DIR = './fe'
                SECRET_FILE_CREDENTIALS = 'front-env'
                SSH_CREDENTIALS = 'aws-key'
                SSH_HOST = 'ubuntu@k10E103.p.ssafy.io'
                WORKSPACE_DIR = '/var/jenkins_home/workspace/front'
                EC2_TARGET_PATH = '/home/ubuntu'
            }
            
            stages {
                stage('Git Clone') {
                    steps {
                        git branch: GIT_BRANCH, credentialsId: GIT_CREDENTIALS, url: GIT_URL
                    }
                }
                
                stage('Initiate Pipeline') {
                    steps {
                        script {
                            mattermostSend (
                                color: "#2A42EE", 
                                message: "### 배포 시작: ${env.JOB_NAME} #${env.BUILD_NUMBER} \n<${env.BUILD_URL}|Details..>"
                            )
                        }
                    }
                }

                stage('Copy Secret File') {
                    steps {
                        dir(FRONT_DIR){
                            withCredentials([file(credentialsId: SECRET_FILE_CREDENTIALS, variable: 'SECRET_FILE')]) {
                                sh 'cp -f $SECRET_FILE .'
                            }
                        }
                    }
                }

                stage('Frontend Build') {
                    steps {
                        dir(FRONT_DIR){
                            sh 'npm install --legacy-peer-deps'
                            sh 'npm run build'
                        }
                    }
                }

                stage('Compression'){
                    steps{
                        dir(FRONT_DIR){
                            sh 'tar -cvf build.tar dist'
                        }
                    }
                }

                stage('Frontend Deploy to EC2'){
                    steps {
                        sshagent(credentials: [SSH_CREDENTIALS]) {
                            sh '''
                                ssh -o StrictHostKeyChecking=no ${SSH_HOST} uptime
                                scp ${WORKSPACE_DIR}/${FRONT_DIR}/build.tar ${SSH_HOST}:${EC2_TARGET_PATH}
                                ssh -o StrictHostKeyChecking=no ${SSH_HOST} "cd ${EC2_TARGET_PATH} && tar -xvf build.tar && sudo service nginx restart"
                            '''
                        }
                    }
                }
            }
            
            post {
                success {
                    script {
                        env.AUTHOR_ID = sh(script: "git show -s --pretty=%an HEAD~1", returnStdout: true).trim()
                        mattermostSend (
                            color: 'good', 
                            message: "### 배포 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER} (by ${AUTHOR_ID})\n<${env.BUILD_URL}|Details..>"
                        )
                    }
                }
                failure {
                    script {
                        env.AUTHOR_ID = sh(script: "git show -s --pretty=%an HEAD~1", returnStdout: true).trim()
                        mattermostSend (
                            color: 'danger', 
                            message: "### 배포 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER} (by ${AUTHOR_ID})\n<${env.BUILD_URL}|Details..>"
                        )
                    }
                }
            }
        }
        ```

8. back

    - back Item의 설정 들어가기

    - jenkins push event 설정(be/dev 브랜치에 푸시하면 자동으로 배포 및 빌드 진행)
        - jenkins page
            - Build Triggers - Build when a change is pushed to GitLab. GitLab webhook URL: http://k10e103.p.ssafy.io:9090/project/back 클릭
            - Push Events 클릭
            - 고급 클릭
            - Secret token Generate 후 복사

        - gitlab page
            - gitlab - Settings - Webhooks - Add new webhook
            - URL: http://k10e103.p.ssafy.io:9090/project/back
            - Secret token: jenkins에서 복사한 Secret token 입력
            - Trigger에서 Push events 선택
            - Wildcard pattern에서 배포를 원하는 브랜치 입력(be/dev)

    - jenkins pipeline
        ```
        pipeline {
            agent any
            environment {
                GIT_BRANCH = 'be/dev'
                GIT_CREDENTIALS = 'gitlab'
                GIT_URL = 'https://lab.ssafy.com/s10-final/S10P31E103'
                BACK_DIR = './be'
                SECRET_FILE_CREDENTIALS = 'back-env'
                SECRET_KEY_CREDENTIALS = 'pem-key'
                DOCKER_IMAGE = 'ssj0187/sinabro'
                DOCKER_TAG = 'latest'
                SPRING_PROFILE = 'prod'
                SSH_CREDENTIALS = 'aws-key'
                SSH_HOST = 'ubuntu@k10E103.p.ssafy.io'
            }
            stages {
                stage('Initiate Pipeline') {
                    steps {
                        script {
                            mattermostSend (
                                color: "#2A42EE", 
                                message: "### 배포 시작: ${env.JOB_NAME} #${env.BUILD_NUMBER} \n<${env.BUILD_URL}|Details..>"
                            )
                        }
                    }
                }
                
                stage('Git Clone') {
                    steps {
                        git branch: GIT_BRANCH, credentialsId: GIT_CREDENTIALS, url: GIT_URL
                    }
                }
                
                stage('Copy Secret File') {
                    steps {
                        dir(BACK_DIR){
                            withCredentials([file(credentialsId: SECRET_FILE_CREDENTIALS, variable: 'SECRET_FILE')]) {
                                sh 'cp -f $SECRET_FILE /var/jenkins_home/workspace/back/be/src/main/resources'
                            }
                        }
                    }
                }

                stage('Backend Build') {
                    steps {
                        dir(BACK_DIR){
                            sh 'chmod +x gradlew'
                            sh "./gradlew clean build -x test"
                        }
                    }
                }
                
                stage('Docker Build and Push') {
                    steps {
                        dir(BACK_DIR){
                            script{
                                def app = docker.build("${env.DOCKER_IMAGE}", "--build-arg SPRING_PROFILES_ACTIVE=${env.SPRING_PROFILE} .")
                                docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-jenkins') {
                                    app.push(env.DOCKER_TAG)
                                }
                            }
                        }
                    }
                }
                
                stage('BackEnd Deploy to EC2') {
                    steps {
                        sshagent(credentials: [SSH_CREDENTIALS]) {
                            script {
                                sh """
                                ssh -o StrictHostKeyChecking=no ${env.SSH_HOST} '
                                    docker rm -f spring || true;
                                    docker pull ${env.DOCKER_IMAGE}:${env.DOCKER_TAG};
                                    docker run --name spring -d -p 8080:8080 ${env.DOCKER_IMAGE}:${env.DOCKER_TAG};
                                    docker cp /etc/keys/K10E103T.pem spring:/
                                    docker cp /etc/keys/sinabro.pem spring:/
                                    docker image prune -af
                                '
                                """
                            }
                        }
                    }
                }
            }
            
            post {
                success {
                    script {
                        env.AUTHOR_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                        mattermostSend (
                            color: 'good', 
                            message: "### 배포 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER} (by ${AUTHOR_ID})\n<${env.BUILD_URL}|Details..>"
                        )
                    }
                }
                failure {
                    script {
                        env.AUTHOR_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                        mattermostSend (
                            color: 'danger', 
                            message: "### 배포 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER} (by ${AUTHOR_ID})\n<${env.BUILD_URL}|Details..>"
                        )
                    }
                }
            }
        }
        ```

## 2번째 EC2 서버 접속하기 

### 위에서 한 Docker 설치, Nginx 설치, Web Server https 세팅을 한다.

### JSch 사용을 위한 세팅

```
$ sudo vi /etc/ssh/sshd_config.d/60-cloudimg-settings.conf
```

```
PasswordAuthentication no
PubkeyAcceptedAlgorithms=+ssh-rsa
```

```
$ esc :wq

$ sudo systemctl restart ssh
```

### nginx_updater.py 생성

```
$ vi nginx_updater.py
```

```
import docker
import os

# Initialize Docker client
client = docker.from_env()

nginx_config_file = '/etc/nginx/sites-enabled/default'

def update_nginx_config(containers):
    """Updates the Nginx configuration with current code server containers."""
    # Prepare the basic structure for the configuration
    config_content = """
server {
    root /var/www/html;

    index index.html index.htm index.nginx-debian.html;
    server_name projectsinabro.store;

    location / {
        try_files $uri $uri/ /index.html;
    }
"""

    for container in containers:
        container_name = container.name
        container_ports = container.attrs['NetworkSettings']['Ports']

        if "80/tcp" in container_ports:
            host_port = container_ports["80/tcp"][0]["HostPort"]
            dev_port = container_ports["5173/tcp"][0]["HostPort"]
            start_port = container_ports["3000/tcp"][0]["HostPort"]
            guest_port = int(host_port) + 15000

            config_content += f"""
    location /{container_name}/proxy/5173/ {{
        proxy_pass http://localhost:{dev_port};
        include /etc/nginx/sites-enabled/proxy_common.conf;
    }}

    location /{container_name}/proxy/3000/ {{
        proxy_pass http://localhost:{start_port};
        include /etc/nginx/sites-enabled/proxy_common.conf;
    }}

    location /{container_name}/ {{
        proxy_pass http://localhost:{host_port}/;
        include /etc/nginx/sites-enabled/proxy_common.conf;
    }}

    location /{container_name}-t0s1e8u7g/ {{
        proxy_pass http://localhost:{guest_port}/;
        include /etc/nginx/sites-enabled/proxy_common.conf;
    }}
"""

    # Close the server block
    config_content += """
    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/projectsinabro.store/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/projectsinabro.store/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
"""

    # Include the third server block content
    config_content += """
server {
    listen 80;
    listen [::]:80;
    server_name projectsinabro.store;

    if ($host = 'projectsinabro.store') {
        return 301 https://$host$request_uri;
    }

    return 404;
}
"""

    # Write to the Nginx configuration file
    with open(nginx_config_file, 'w') as f:
        f.write(config_content)

    # Reload Nginx
    os.system("sudo nginx -s reload")

def main():
    """Fetch current containers and update Nginx configuration."""
    containers = client.containers.list(filters={"name": "code-server-"})

    update_nginx_config(containers)

if __name__ == '__main__':
    main()
```

```
$ esc :wq
```

### start_mysql.sh 생성

```
$ vi start_mysql.sh
```

```
#!/bin/bash

# 권한 설정
sudo chown -R mysql:mysql /var/lib/mysql
sudo chown -R mysql:mysql /var/log/mysql
sudo chmod 755 /var/lib/mysql
sudo chmod 755 /var/log/mysql

# 안전 모드로 MySQL 서버 시작
sudo mysqld_safe --skip-grant-tables &

# 서버 시작 대기
sleep 1

# MySQL 권한 설정
mysql -e "
    FLUSH PRIVILEGES;
    ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'ssafy';
    CREATE USER 'root'@'%' IDENTIFIED BY 'ssafy';
    GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
    FLUSH PRIVILEGES;
"

# MySQL 서버 중지
sudo pkill mysqld

sleep 2

# 일반 모드로 MySQL 서버 시작
sudo mysqld_safe &

# 서버가 완전히 시작될 때까지 기다림
sleep 1
```

```
$ esc :wq
```

### restart_mysql.sh 생성

```
$ vi restart_mysql.sh

```

```
#!/bin/bash

# 일반 모드로 MySQL 서버 시작
sudo mysqld_safe &

# 서버가 완전히 시작될 때까지 기다림
sleep 1
```

```
$ esc :wq
```

### Dockerfile 생성 및 실행

```
$ vi Dockerfile
```

```
FROM codercom/code-server:latest

# 패키지 업데이트 및 설치
RUN sudo apt update && \
    sudo apt install -y python3 openjdk-17-jdk unzip wget curl net-tools gnupg lsof && \
    sudo apt clean && \
    sudo rm -rf /var/lib/apt/lists/*

# MySQL 설치 및 설정
RUN sudo wget https://repo.mysql.com/RPM-GPG-KEY-mysql-2023 -O /usr/share/keyrings/mysql.gpg && \
    sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/mysql.gpg /usr/share/keyrings/mysql.gpg && \
    echo "deb http://repo.mysql.com/apt/debian bookworm mysql-8.0" | sudo tee /etc/apt/sources.list.d/mysql.list && \
    sudo apt update && \
    sudo apt install -y mysql-server && \
    sudo apt clean && \
    sudo rm -rf /var/lib/apt/lists/*

# MySQL 초기화 및 비밀번호 설정
COPY start_mysql.sh /start_mysql.sh
COPY restart_mysql.sh /restart_mysql.sh
RUN sudo chmod +x /start_mysql.sh /restart_mysql.sh

# Node.js 설치
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && \
    sudo apt-get install -y nodejs && \
    sudo apt-get clean && \
    sudo rm -rf /var/lib/apt/lists/*

# 환경 변수 설정
ENV PYTHONHOME=/usr \
    PYTHONPATH=/usr/lib/python3.8 \
    JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64 \
    PATH=$JAVA_HOME/bin:$PATH

# Gradle 설치
RUN wget https://services.gradle.org/distributions/gradle-8.7-bin.zip -P /tmp && \
    sudo unzip -d /opt/gradle /tmp/gradle-8.7-bin.zip && \
    rm /tmp/gradle-8.7-bin.zip
ENV GRADLE_HOME=/opt/gradle/gradle-8.7 \
    PATH=$PATH:$GRADLE_HOME/bin

# code-server 환경 준비
RUN mkdir -p /home/coder/.local/share/code-server/User && \
    echo '{ "workbench.colorTheme": "Visual Studio Dark" }' > /home/coder/.local/share/code-server/User/settings.json
RUN code-server --install-extension ms-python.python && \
    code-server --install-extension vscjava.vscode-java-pack && \
    code-server --install-extension vmware.vscode-boot-dev-pack && \
    code-server --install-extension esbenp.prettier-vscode
RUN mkdir -p /home/coder/.config/code-server && \
    echo "auth: none\ncert: false" > /home/coder/.config/code-server/config.yaml

RUN mkdir -p /home/coder/code-server
WORKDIR /home/coder/code-server

# 헬스체크
HEALTHCHECK --interval=3s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80/ || exit 1
```

```
$ esc :wq
```

### Dockerfile 실행
```
$ docker build -t code-server .
```

### 웹 소켓 실행 환경 세팅
```
$ sudo apt update

$ sudo apt install npm

$ npm install ws http-proxy
```

### py 스크립트 실행 환경 세팅

```
$ sudo apt install python3 python3-pip

$ sudo python3 -m pip install docker --break-system-packages
```

### websocker-proxy 세팅

```
$ sudo vi websocket-proxy/proxy-server.js
```

```
const http = require('http');
const WebSocket = require('ws');
const httpProxy = require('http-proxy');
const { exec } = require('child_process');

const proxy = httpProxy.createProxyServer({});
const clients = new Map();
let serverPort; // 서버 포트 초기화

// 커맨드 라인에서 컨테이너 ID 받기
const containerId = process.argv[2];
if (!containerId) {
  console.error('Container ID is required as a command line argument.');
  process.exit(1);
}

// 도커 포트 가져오기 및 서버 설정
getDockerPort(containerId, (error, port) => {
  if (error) {
    console.error('Failed to get docker port:', error);
    process.exit(1); // 실패 시 서버 종료
  }
  serverPort = parseInt(port) + 15000; // 포트 계산

  // HTTP 서버 및 웹소켓 서버 설정
  const server = http.createServer((req, res) => {
    proxy.web(req, res, { target: `http://localhost:${port}` });
  });

  const wss = new WebSocket.Server({ server });

  wss.on('connection', function(ws, req) {
    console.log('WebSocket connection to port:', port);
    setupWebSocket(ws, `ws://localhost:${port}`);
  });

  server.listen(serverPort, () => {
    console.log(`Proxy server running on http://localhost:${serverPort}`);
  });
});

function setupWebSocket(ws, initialTargetUrl) {
    let retryCount = 0;
    let target = new WebSocket(initialTargetUrl);
    clients.set(ws, target);

    const connectTarget = () => {
        target = new WebSocket(initialTargetUrl);
        target.on('open', () => {
            console.log('WebSocket target connected.');
            retryCount = 0;  // 재연결 성공 시 카운터 초기화
        });

        target.on('message', function(message) {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(message);
          }
        });

        target.on('close', () => {
          if (retryCount < 5) {
            setTimeout(() => {
                console.log(`Attempting to reconnect (${retryCount + 1}/5)`);
                retryCount++;
                connectTarget();  // 재시도 로직
            }, 2000);
          } else {
            ws.close();
            clients.delete(ws);
            console.log('Max retries reached, closing WebSocket connection.');
          }
        });

        target.on('error', error => {
            console.error('Target WebSocket error:', error);
            target.close();
        });
    };

    connectTarget();

    ws.on('message', function(message) {
    try {
        const messageString = message.toString('utf8');

        // 터미널 입력 금지
        if (messageString.includes('input')) {
            console.log('Blocking terminal interaction or command execution');
            return;
        }

        // 파일 저장 금지
        if (messageString.includes('workbench.action.files.save')) {
            console.log('Blocking save command');
            return;
        }

        // 파일 추가 금지
        if (messageString.includes('remoteFilesystemwriteFile')) {
            console.log('Blocking file addition');
            return;
        }

        // 파일 삭제 금지
        if (messageString.includes('remoteFilesystemdelete')) {
            console.log('Blocking file deletion');
            return;
        }

        // 디렉토리 추가 금지
        if (messageString.includes('remoteFilesystemmkdir')) {
            console.log('Blocking directory addition');
            return;
        }

        // 파일 이름 변경 금지
        if (messageString.includes('renameFile')) {
            console.log('Blocking file renaming');
            return;
        }

        if (target.readyState === WebSocket.OPEN) {
            target.send(message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
    });

    ws.on('close', () => {
        target.close();
        clients.delete(ws);
        console.log('Connection closed, client removed.');
    });

    ws.on('error', error => {
        console.error('WebSocket error:', error);
        ws.close();
    });
};

function getDockerPort(containerId, callback) {
  exec(`docker port ${containerId} 80`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error fetching Docker ports: ${error}`);
      return callback(error);
    }
    if (stderr) {
      console.error(`Error on Docker command: ${stderr}`);
      return callback(new Error(stderr));
    }

    // 파싱 로직 구현: 80포트에 매핑된 두 번째 포트 추출
    const lines = stdout.trim().split('\n');
    if (lines.length < 2) {
      return callback(new Error('Not enough ports mapped to 80'));
    }

    const secondPortMapping = lines[1];
    const port = secondPortMapping.split(':')[1];
    callback(null, port-1);
  });
}
```

```
$ esc :wq
```
