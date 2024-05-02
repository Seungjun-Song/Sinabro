package com.HP50.be.domain.project.service;

import com.HP50.be.domain.project.entity.Project;
import com.HP50.be.domain.project.repository.ProjectRepository;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;

import com.jcraft.jsch.Session;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.InputStream;

@Service
@Transactional
@RequiredArgsConstructor
public class SonarQubeServiceImpl implements SonarQubeService{
    private final ProjectRepository projectRepository;
    /**
        정적 분석
     */
    private String host = "k10e103.p.ssafy.io";
    private String user = "ubuntu";
    private String privateKey = "C:\\Users\\SSAFY\\Desktop\\자율\\S10P31E103\\be\\K10E103T.pem";

    @Override
    public void executeSonarScanner(Integer projectId) {

        //1. git clone - /home/sonarQube/scanner
        // 깃 레포 가져오기
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_PROJECT));
        String repoUrl = project.getProjectRepo();
        /*
           command 세팅
           - 폴더 이동 command
           - clone command
           - exec command
         */
        // 폴더에 있는 repo 다 삭제
        String deleteRepo = "sudo rm -rf /home/ubuntu/sonarQube/scanner/*";

        // 폴더 이동 command & git clone
        String toFolderAndClone = "cd /home/ubuntu/sonarQube/scanner && " + "sudo git clone "+repoUrl;
        String[] split = repoUrl.split("/");
        String repoName = split[split.length - 1];

        // exec command
        String execCommand = "docker exec sonar-scanner sonar-scanner " +
                "-Dsonar.projectKey=" + "sqp_9ac1374591c1df73cbe3ac04bbfbd960cf88ce35 "+
                "-Dsonar.sources=/usr/src/" + repoName+" "+
                "-Dsonar.host.url=http://sonarqube:9000";
        //2. 실행
        JSch jsch = new JSch();
        Session session = null;
        //3. 성공했다는 결과 반환
        try {
            // 키 기반 인증 설정
            jsch.addIdentity(privateKey);
            // EC2 인스턴스에 연결
            session = jsch.getSession(user, host, 22);
            //검증 무시
            session.setConfig("StrictHostKeyChecking", "no");
            session.connect();
            // 존재하는 레포 모두 삭제
            if(!executeCommand(session,deleteRepo)){
                throw new BaseException(StatusCode.FAIL_DELETE_REPO);
            }
            // 폴더 이동 & git Clone
            if (!executeCommand(session, toFolderAndClone)) {
                throw new BaseException(StatusCode.FAIL_SONAR_CLONE);
            }
            // sonarQube exec
            if (!executeCommand(session, execCommand)) {
                throw new BaseException(StatusCode.FAIL_SONAR_COMMAND);
            }

            session.disconnect();

        } catch (BaseException e) {
            e.printStackTrace();
            throw new BaseException(StatusCode.FAIL_SONAR);
        } catch (Exception e ){
            e.printStackTrace();
        }

    }

    @Override
    public boolean executeCommand(Session session, String command)  throws Exception{
        Channel channel = session.openChannel("exec");
        ((ChannelExec) channel).setCommand(command);
        channel.setInputStream(null);
        InputStream in = channel.getInputStream();
        InputStream err = ((ChannelExec) channel).getErrStream(); // 오류 스트림 추가

        channel.connect();

        StringBuilder output = new StringBuilder();
        byte[] tmp = new byte[1024];
        int n;
        while ((n = in.read(tmp)) != -1) {
            output.append(new String(tmp, 0, n));
        }

        StringBuilder errorOutput = new StringBuilder();
        while ((n = err.read(tmp)) != -1) {
            errorOutput.append(new String(tmp, 0, n));
        }

        // 명령 실행이 완료될 때까지 기다림
        while (!channel.isClosed()) {
            System.out.println("channel.isClosed() = " + channel.isClosed());
            Thread.sleep(100);
        }

        channel.disconnect();

        System.out.println("=================================================");
        System.out.println("Command: " + command);
        System.out.println("Output: " + output.toString());
        System.out.println("Error: " + errorOutput.toString());
        System.out.println("channel.getExitStatus() = " + channel.getExitStatus());
        System.out.println("=================================================");

        return channel.getExitStatus() == 0; // 성공 시 true 반환
    }
}
