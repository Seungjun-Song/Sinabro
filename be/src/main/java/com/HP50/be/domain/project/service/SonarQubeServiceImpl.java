package com.HP50.be.domain.project.service;

import com.HP50.be.domain.project.entity.Project;
import com.HP50.be.domain.project.repository.ProjectRepository;
import com.HP50.be.global.common.JschUtil;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;

import com.jcraft.jsch.Session;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;

@Service
@Transactional
@RequiredArgsConstructor
public class SonarQubeServiceImpl implements SonarQubeService{
    private final ProjectRepository projectRepository;
    private final JschUtil jschUtil;

    @Override
    public void executeSonarScanner(Integer projectId,String folderName) {
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
        // 권한 부여
        String authorize = "docker exec -i sonar-scanner /bin/sh -c 'cd ./"+repoName+"/"+folderName+" && chmod +x ./gradlew'";
        // build
        String build = "docker exec -w /usr/src/"+repoName+"/"+folderName+" sonar-scanner ./gradlew build -x test";

        // exec command
        String execCommand = "docker exec sonar-scanner sonar-scanner " +
                "-Dsonar.projectKey=" + getProjectKey(project)+" "+ //projectId로 정적 분석 생성
                "-Dsonar.sources=/usr/src/" + repoName +"/"+folderName+" "+
                "-Dsonar.host.url=http://sonarqube:9000 "+
                "-Dsonar.token=squ_4e19fc10ed04b1e8815b83bd0fa853418790e59f "+
                "-Dsonar.java.binaries=/usr/src/"+repoName+"/"+folderName+"/build/classes/java/main"+" "+ //build class지정 필요
                "-Dsonar.sourceEncoding=UTF-8";
        // 품질 조회

        //2. 실행
        Session session = jschUtil.createSession();
        //명령 실행
        try {
            // 존재하는 레포 모두 삭제
            if (!jschUtil.executeCommand(session, deleteRepo)) {
                throw new BaseException(StatusCode.FAIL_DELETE_REPO);
            }
            // 폴더 이동 & git Clone
            if (!jschUtil.executeCommand(session, toFolderAndClone)) {
                throw new BaseException(StatusCode.FAIL_SONAR_CLONE);
            }
            // 권한 부여
            if (!jschUtil.executeCommand(session, authorize)) {
                throw new BaseException(StatusCode.FAIL_BUILD_REPO);
            }

            // 빌드
            if (!jschUtil.executeCommand(session, build)) {
                throw new BaseException(StatusCode.FAIL_BUILD_REPO);
            }
            // sonarQube exec
            if (!jschUtil.executeCommand(session, execCommand)) {
                throw new BaseException(StatusCode.FAIL_SONAR_COMMAND);
            }
            //연결 해제
            session.disconnect();
        }catch (BaseException e){
            e.printStackTrace();
            throw new BaseException(StatusCode.FAIL_SONAR);
        }
        catch (Exception e){
            e.printStackTrace();
        }


    }
    public String getProjectKey(Project project){
        return "sonarQube_"+project.getProjectId();
    }

}
