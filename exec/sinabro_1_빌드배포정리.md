# 포팅 매뉴얼

## 시작 하기 전 기본 세팅(다운로드 및 설정)

- IntelliJ 다운로드

- MobaXterm 다운로드

- gitlab 레포지토리 생성

- dockerhub 회원가입 및 로그인

- EC2 인스턴스 생성

## Dockerfile 생성

### IntelliJ 최상단 디렉토리에 Dockerfile 생성
```
# Dockerfile
FROM openjdk:17-jdk
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=prod","-Duser.timezone=Asia/Seoul","-jar","app.jar"]
```

## EC2 서버 접속하기 

![image](https://github.com/Seungjun-Song/sinabro/assets/80227755/ec1f2610-c6ec-49b8-a5f0-64aa3923cfef)

- MobaXterm 실행 후 좌측 상단의 Session 클릭

- 위와 같이 Remote host, Specify username, Use private key 을 입력해준다

## docker 설치

1. ec2 접속

2. 패키지 업데이트
    ```
    $ sudo apt update
    ```

3. https 관련 패키지 설치
    ```
    $ sudo apt install apt-transport-https ca-certificates curl software-properties-common
    ```
        
4. docker repository 접근을 위한 gpg 키 설정
    ```
    $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    ```
        
5. docker repository 등록
    ```
    $ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
    ```
        
6. 패키지 다시 업데이트
    ```
    $ sudo apt update
    ```

7. 도커 설치
    ```
    $ sudo apt install docker-ce
    ```

8. 설치 확인
    ```
    $ docker -v
    ```

9. USER 계정에 실행 권한 부여(매번 sudo 권한 요청을 할 필요 없어짐 / 터미널을 재 실행 해야 적용됨)
    ```
    $ sudo usermod -aG docker $USER
    ```

## Dockerfile 생성 및 실행

### Dockerfile 생성
```
vi Dockerfile
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
docker build -t jenkins .
```

## docker-compose 생성 및 실행

### docker-compose.yml 생성
```
vi docker-compose.yml
```

```
# vi docker-compose.yml
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
esc :wq
```

### docker-compose.yml 실행
```
docker compose up -d
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

1. apt update & apt upgrade
    ```
    $ sudo apt update

    $ sudo apt upgrade
    ```

2. 기존 Certbot 제거
    ```
    $ sudo apt remove certbot
    ```

3. Certbot 설치
    ```
    $ sudo snap install *--classic certbot*
    ```

4. 자신의 도메인에 적용
    ```
    $ sudo certbot --nginx
    중간에 도메인 입력칸 나오면 도메인 입력
    1, 2 선택 묻는거 나오면 2 선택
    1을 입력한다면 http 연결을 https로 리다이렉트 하지 않습니다.
    2를 입력한다면 https 연결을 https로 리다이렉트 시킵니다.
    ```

## Nginx 설정

```
vi /etc/nginx/sites-enabled/default
```

```
# default
server {

        location /api {
                proxy_pass http://localhost:8080;
        }

        location /fastapi {
                proxy_pass http://localhost:8000;
        }

        location /swagger-ui/ {
                proxy_pass http://localhost:8080/swagger-ui/;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /v3/api-docs/ {
                proxy_pass http://localhost:8080/v3/api-docs/;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }

        listen [::]:443 ssl ipv6only=on; # managed by Certbot
        listen 443 ssl; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/j10e106.p.ssafy.io/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/j10e106.p.ssafy.io/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
server {
        if ($host = j10e106.p.ssafy.io) {
                return 301 https://$host$request_uri;
        } # managed by Certbot


        listen 80 ;
        listen [::]:80 ;
        server_name j10e106.p.ssafy.io;
        return 404; # managed by Certbot
}
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

    - gitlab
    - ssh agent
    - docker pipeline

5. jenkins credentials 등록

    - aws
        - Kind : SSH Username with private key
        - ID : aws-ec2
        - Username : J10E106T
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
        - File : application-prod-secret.properties
        - ID : application-secret

6. jenkins tools 설정(local 환경과 동일하게 버전 맞춰야 함)

    - gradle intallations 설정
        - name: gradle    
        - Version: Gradle 8.6

7. jenkins push event 설정(master 브랜치에 푸시하면 자동으로 배포 및 빌드 진행)

    - jenkins page
        - item 생성
        - Build Triggers - Build when a change is pushed to GitLab. GitLab webhook URL: http://i10e106.p.ssafy.io:9090/project/master 클릭
        - 고급 클릭
        - Secret token Generate 후 복사
        - item 저장

    - gitlab page
        - gitlab - Settings - Webhooks - Add new webhook
        - URL: http://i10e106.p.ssafy.io:9090/project/master
        - Secret token: jenkins의 Secret token 입력
        - Trigger에서 Push events 선택
        - Wildcard pattern에서 배포를 원하는 브랜치 입력(master)

8. jenkins pipeline
    ```
    pipeline {
        agent any
        tools {
            gradle 'gradle'
        }
        stages {
            stage('Git Clone') {
                steps {
                    git branch: 'master', credentialsId: 'gitlab', url: 'https://lab.ssafy.com/s10-webmobile1-sub2/S10P12E107'
                }
            }
            
            stage('FE-Build') {
                steps {
                    dir("./front-gollajyu"){
                        //CI: 오류 무시
                        sh 'rm -rf node_modules && rm -rf package-lock.json'
                        sh 'npm install && CI=false npm run build'
                    }
                }
            }
            
            stage('Compression'){
                steps{
                    dir("./front-gollajyu"){
                        sh '''
                        rm -rf node_modules
                        tar -cvf build.tar dist
                        '''
                    }
                }
            }
            
            stage('Frontend Deploy to EC2'){
                steps {
                    // EC2 서버에 SSH 접속 크레덴셜 ID
                    sshagent(credentials: ['aws-key']) {
                        sh '''
                            ssh -o StrictHostKeyChecking=no ubuntu@i10E107.p.ssafy.io uptime
                            scp /var/jenkins_home/workspace/gollajyu/front-gollajyu/build.tar ubuntu@i10E107.p.ssafy.io:/home/ubuntu
                            ssh -t ubuntu@i10E107.p.ssafy.io "sudo chmod +x /home/ubuntu/deploy.sh && sudo /home/ubuntu/deploy.sh"
                        '''
                    }
                }
            }
            
            stage('BE-Build') {
                steps {
                    dir("./back-gollajyu"){
                        sh 'cp -r /etc/letsencrypt/live/i10e107.p.ssafy.io/keystore.p12 src/main/resources/'
                        sh 'chmod +x gradlew'
                        sh "./gradlew clean build"
                    }
                    
                }
            }
            
            stage('Docker Build and Push') {
                steps {
                    dir("./back-gollajyu"){
                        script{
                            //현재 작업 디렉토리 확인
                            sh 'pwd'
                            
                            // Docker 이미지 빌드
                            def app = docker.build "ssj0187/gollajyu"
        
                            // Docker Hub에 로그인
                            docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-jenkins') {
                                // Docker 이미지 푸시
                                app.push("1.0") // 1.0 이라는 태그로 image가 푸쉬됨
                            }
                        }
                    }
                }
            }
            
            stage('BackEnd Deploy to EC2'){
                steps {
                    sshagent(credentials: ['aws-key']) {
                        
                        sh '''
                        if test "`docker ps -aq --filter ancestor=ssj0187/gollajyu:1.0`"; then
                        
                        ssh -o StrictHostKeyChecking=no ubuntu@i10E107.p.ssafy.io "docker stop $(docker ps -aq --filter ancestor=ssj0187/gollajyu:1.0)"
                        ssh -o StrictHostKeyChecking=no ubuntu@i10E107.p.ssafy.io "docker rm -f $(docker ps -aq --filter ancestor=ssj0187/gollajyu:1.0)"
                        ssh -o StrictHostKeyChecking=no ubuntu@i10E107.p.ssafy.io "docker rmi ssj0187/gollajyu:1.0"

                        fi
                        '''
                    }
                    
                    sshagent(credentials: ['aws-key']) {
                        sh 'ssh -o StrictHostKeyChecking=no ubuntu@i10E107.p.ssafy.io "sudo docker pull ssj0187/gollajyu:1.0"'
                        sh 'ssh -o StrictHostKeyChecking=no ubuntu@i10E107.p.ssafy.io "sudo docker run --name spring -d -p 8080:8080 -v /home/ubuntu/gollajyuImages:/app/gollajyuImages ssj0187/gollajyu:1.0"'
                    }
                }
            }
        }
    }
    ```

## 2번째 EC2 서버 접속하기 

인바운드 규칙 동적 DB 포트 범위(20000 - 25000) 열기

인바운드 규칙 동적 포트 범위(32768 - 60999) 열기

### 위에서 한 Docker 설치, Nginx 설치, WS 세팅을 한다.

### JSch 사용을 위한 세팅

```
sudo vi /etc/ssh/sshd_config.d/60-cloudimg-settings.conf
```

```
PasswordAuthentication no
PubkeyAcceptedAlgorithms=+ssh-rsa
```

```
sudo systemctl restart ssh
```

### nginx_updater.py 생성

```
vi nginx_updater.py
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
esc :wq
```

### start_mysql.sh 생성

```
vi start_mysql.sh
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
esc :wq
```

### restart_mysql.sh 생성

```
vi restart_mysql.sh

```

```
#!/bin/bash

# 일반 모드로 MySQL 서버 시작
sudo mysqld_safe &

# 서버가 완전히 시작될 때까지 기다림
sleep 1
```

```
esc :wq
```

### Dockerfile 생성 및 실행

```
vi Dockerfile
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
esc :wq
```

### Dockerfile 실행
```
docker build -t code-server .
```

### 웹 소켓 실행 환경 세팅
```
sudo apt update

sudo apt install npm

node -v
npm -v

npm install ws http-proxy
```

### py 스크립트 실행 환경 세팅

```
// 패키지 최신 상태 업데이트
sudo apt update

// python3 및 pip3 설치
sudo apt install python3 python3-pip

// 설치 확인
python3 --version
pip3 --version

// docker 패키지 설치(python으로 docker의 api를 사용할 수 있게 해주는 라이브러리)
sudo python3 -m pip install docker --break-system-packages
```

### websocker-proxy 세팅

```
sudo vi websocket-proxy/proxy-server.js
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
esc :wq
```