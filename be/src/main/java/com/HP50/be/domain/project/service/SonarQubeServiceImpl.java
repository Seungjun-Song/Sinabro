package com.HP50.be.domain.project.service;

import com.HP50.be.domain.project.dto.ImpactDto;
import com.HP50.be.domain.project.dto.IssueDto;
import com.HP50.be.domain.project.dto.SonarQubeResultDto;
import com.HP50.be.domain.project.entity.Project;
import com.HP50.be.domain.project.repository.ProjectRepository;
import com.HP50.be.global.common.JschUtil;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;

import com.jcraft.jsch.Session;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
        //마지막 .git 제거
        if (repoUrl.endsWith(".git")) {
            repoUrl = repoUrl.substring(0, repoUrl.length() - 4);
        }
        /*
           command 세팅
           - 폴더 이동 command
           - clone command
           - exec command
         */
        // 폴더에 있는 repo 다 삭제 후 mkdir
        String deleteRepo = "sudo rm -rf /home/ubuntu/sonarQube/scanner/"+projectId+" && "+"sudo mkdir /home/ubuntu/sonarQube/scanner/"+projectId;

        // 폴더 이동 command & git clone
        String toFolderAndClone = "cd /home/ubuntu/sonarQube/scanner/"+projectId+" && " + "sudo git clone "+repoUrl;
        String[] split = repoUrl.split("/");
        String repoName = split[split.length - 1];
        // 권한 부여
        String authorize = "docker exec -i sonar-scanner /bin/sh -c 'cd ./"+projectId+"/"+repoName+"/"+folderName+" && chmod +x ./gradlew'";
        // build
        String build = "docker exec -w /usr/src/"+projectId+"/"+repoName+"/"+folderName+" sonar-scanner ./gradlew build -x test";

        // exec command
        String execCommand = "docker exec sonar-scanner sonar-scanner " +
                "-Dsonar.projectKey=" + getProjectKey(project)+" "+ //projectId로 정적 분석 생성
                "-Dsonar.sources=/usr/src/" + projectId+"/"+repoName +"/"+folderName+" "+
                "-Dsonar.host.url=http://sonarqube:9000 "+
                "-Dsonar.token=squ_4e19fc10ed04b1e8815b83bd0fa853418790e59f "+
                "-Dsonar.java.binaries=/usr/src/"+projectId+"/"+repoName+"/"+folderName+"/build/classes/java/main"+" "+ //build class지정 필요
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
    /**
     *  소나큐브 결과 반환
        결과 정리해서 return
     */
    @Override
    public SonarQubeResultDto getResult(Integer projectId, Integer pageNumber, JsonObject jsonObject,Integer effortTotal,Integer openTotal) {
        //page, effortTotal로 기초 세팅
        Integer page = jsonObject.get("p").getAsInt();
        Integer total = jsonObject.get("total").getAsInt();
        Integer totalPage = (int) Math.ceil(total/20.0);
        SonarQubeResultDto result = SonarQubeResultDto.builder()
                .page(page)
                .totalPage(totalPage)
                .effortTotal(effortTotal)
                .total(total)
                .openTotal(openTotal)
                .issues(new ArrayList<>()).build();

        //이슈 하나씩 관리
        JsonArray asJsonArray = jsonObject.get("issues").getAsJsonArray();
        for(JsonElement element:asJsonArray){
            //object로 다시 변환
            JsonObject object = element.getAsJsonObject();
            //값 추출
            String rule = object.get("rule").getAsString();
            String severity = object.get("severity").getAsString();
            String execComponent = object.get("component").getAsString().split(":")[1];
            String component = removeLeadingNumbers(execComponent);
            //start textRange
            //startLine,endLine,startOffset,endOffset
            JsonObject textRange = object.get("textRange").getAsJsonObject();
            int startLine = textRange.get("startLine").getAsInt();
            int endLine = textRange.get("endLine").getAsInt();
            int startOffset = textRange.get("startOffset").getAsInt();
            int endOffset = textRange.get("endOffset").getAsInt();
            //end textRange
            String message = object.get("message").getAsString();
            int effort = Integer.parseInt(object.get("effort").getAsString().split("min")[0]);
            String type = object.get("type").getAsString();
            //impacts setting start
            JsonArray impactsJsonArray = object.get("impacts").getAsJsonArray();
            List<ImpactDto> impactList = new ArrayList<>();
            for(JsonElement impactObject:impactsJsonArray){
                JsonObject impact = impactObject.getAsJsonObject();
                String softwareQuality = impact.get("softwareQuality").getAsString();
                String impactSeverity = impact.get("severity").getAsString();
                ImpactDto impactDto = ImpactDto.builder()
                        .softwareQuality(softwareQuality)
                        .severity(impactSeverity)
                        .build();
                impactList.add(impactDto);
            }
            //impacts setting end
            // Tags setting start
            JsonArray tagsJsonArray = object.get("tags").getAsJsonArray();
            List<String> tags = new ArrayList<>();
            for (JsonElement tagElement : tagsJsonArray) {
                String tag = tagElement.getAsString();
                tags.add(tag);
            }
            // Tags setting end

            //이슈 코드 가져오기
            String issueCode = getIssueCode(execComponent, startLine, endLine);
            //이슈 상태 가져오기
            String issueStatus = object.get("issueStatus").getAsString();
            //이슈 키 가져오기
            String key = object.get("key").getAsString();
            //모든 세팅 끝 - IssueDto build 시작
            IssueDto issueDto = IssueDto.builder()
                    .rule(rule)
                    .severity(severity)
                    .component(component)
                    .startLine(startLine)
                    .endLine(endLine)
                    .startOffset(startOffset)
                    .endOffset(endOffset)
                    .message(message)
                    .effort(effort)
                    .type(type)
                    .impacts(impactList)
                    .tags(tags)
                    .issueCode(issueCode)
                    .issueStatus(issueStatus)
                    .key(key)
                    .build();
            //추가
            result.addIssue(issueDto);
        }
        return result;
    }

    @Override
    public void changeIssuesStatus(String issues, String doTransition) {

    }

    @Override
    public List<String> getFolders(Integer projectId) {
        //1. git clone - /home/sonarQube/scanner
        // 깃 레포 가져오기
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_PROJECT));
        String repoUrl = project.getProjectRepo();
        //마지막 .git 제거
        if (repoUrl.endsWith(".git")) {
            repoUrl = repoUrl.substring(0, repoUrl.length() - 4);
        }
        /*
           command 세팅
           - 폴더 이동 command
           - clone command
           - exec command
         */
        // 폴더에 있는 repo 다 삭제 후 mkdir
        String deleteRepo = "sudo rm -rf /home/ubuntu/sonarQube/scanner/"+projectId+" && "+"sudo mkdir -p /home/ubuntu/sonarQube/scanner/"+projectId;
        String pwd = "pwd";
        // 폴더 이동 command & git clone
        String toFolderAndClone = "cd /home/ubuntu/sonarQube/scanner/"+projectId+" && " + "sudo git clone "+repoUrl;
        String[] split = repoUrl.split("/");
        String repoName = split[split.length - 1];

        String toFolderAndLs = "cd /home/ubuntu/sonarQube/scanner/"+projectId+"/"+repoName+" && ls -l | grep '^d' | awk '{print $NF}'";

        //2. 실행
        Session session = jschUtil.createSession();
        List<String> folders = null;
        try {
            // 존재하는 레포 모두 삭제
            if (!jschUtil.executeCommand(session, deleteRepo)) {
                throw new BaseException(StatusCode.FAIL_DELETE_REPO);
            }
            if (!jschUtil.executeCommand(session, pwd)) {
                throw new BaseException(StatusCode.FAIL_DELETE_REPO);
            }
            // 폴더 이동 & git Clone
            if (!jschUtil.executeCommand(session, toFolderAndClone)) {
                throw new BaseException(StatusCode.FAIL_SONAR_CLONE);
            }
            //현재 폴더 구조 가져오기
            folders = Arrays.stream(jschUtil.executeCommandAndGetOutput(session, toFolderAndLs).split("\n")).toList();

            //연결 해제
            session.disconnect();
        }catch (BaseException e){
            e.printStackTrace();
            throw new BaseException(StatusCode.FAIL_SONAR);
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return folders;
    }

    /**
     * Jsch로 이슈 코드 가져옴
     */
    private String getIssueCode(String execComponent, int startLine, int endLine) {
        int lastSlashIndex = execComponent.lastIndexOf('/');
        String path = execComponent.substring(0,lastSlashIndex); // 경로 추출
        String fileName = execComponent.substring(lastSlashIndex+1); //파일 이름 추출
        //명령어 만든다.
        String getFileComponentCmd = "cd /home/ubuntu/sonarQube/scanner/"+path+" && sed -n "+ startLine +","+ endLine +"p "+fileName ;
        //해당 이슈 코드 얻어오기 위한 Jsch실행
        Session session = jschUtil.createSession();
        return jschUtil.executeCommandAndGetOutput(session, getFileComponentCmd);
    }
    //프로젝트 Key 추출
    public String getProjectKey(Project project){
        return "sonarQube_"+project.getProjectId();
    }
    //앞의 projectId제거
    private static String removeLeadingNumbers(String path) {
        return path.replaceAll("^[0-9]+/", "");
    }
}
