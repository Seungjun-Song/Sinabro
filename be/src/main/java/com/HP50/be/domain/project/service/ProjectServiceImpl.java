package com.HP50.be.domain.project.service;

import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.code.repository.CategoryRepository;
import com.HP50.be.domain.code.repository.SubCategoryRepository;
import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.member.entity.TechStack;
import com.HP50.be.domain.member.repository.MemberCustomRepository;
import com.HP50.be.domain.member.repository.MemberRepository;
import com.HP50.be.domain.member.repository.TechStackCustomRepository;
import com.HP50.be.domain.port.entity.Port;
import com.HP50.be.domain.port.repository.PortCustomRepository;
import com.HP50.be.domain.port.repository.PortRepository;
import com.HP50.be.domain.project.dto.*;
import com.HP50.be.domain.project.entity.Project;
import com.HP50.be.domain.project.entity.Teammate;
import com.HP50.be.domain.project.repository.PjtTechStackRepository;
import com.HP50.be.domain.project.repository.ProjectCustomRepository;
import com.HP50.be.domain.project.repository.ProjectRepository;
import com.HP50.be.domain.project.repository.TeammateRepository;
import com.HP50.be.global.common.BaseResponse;
import com.HP50.be.global.common.JschUtil;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import com.HP50.be.global.jwt.JwtUtil;
import com.jcraft.jsch.Session;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService{
    private final ProjectCustomRepository projectCustomRepository;
    private final ProjectRepository projectRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final TeammateRepository teammateRepository;
    private final PjtTechStackRepository pjtTechStackRepository;
    private final PortRepository portRepository;
    private final PortCustomRepository portCustomRepository;
    private final MemberCustomRepository memberCustomRepository;
    private final TechStackCustomRepository techStackCustomRepository;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;
    private final JwtUtil jwtUtil;
    private final JschUtil jschUtil;

    @Override
    public ProjectInfoDto getTeamInfo(int memberId, int projectId) {
        return projectCustomRepository.getTeamInfo(projectId,memberId);
    }
    // 프로젝트 생성
    @Override
    public boolean createProject(ProjectCreateRequestDto requestDto, int reader) {
        //안쓰는 포트 get
        Port unUse = portCustomRepository.getUnUse();
        if(unUse==null){
            throw new BaseException(StatusCode.NOT_EXIST_PORT);
        }
        //진행 중 상태 가져오기
        SubCategory status = subCategoryRepository.findById(502).orElseThrow(()-> new BaseException(StatusCode.NOT_EXIST_SUB_CATEGORY));

        // 프로젝트 DTO 생성 후 Entity로 변환
        ProjectDto projectDto = ProjectDto.builder()
                .projectName(requestDto.getProjectName())
                .projectInfo(requestDto.getProjectInfo())
                .projectImg(requestDto.getProjectImg())//fireBase에서 저장된 후 mysql에 저장
                .projectRepo(requestDto.getProjectRepo())
                .projectDbPort(unUse.getPortId())
                .subCategory(status)
                .build();

        Project project = projectDto.toEntity(projectDto);

        //  팀원 생성 + 꼭 TechStack 지정 해줘야함.
        List<Integer> memberList = requestDto.getMemberList().stream()
                .map(TechStackSimpleDto::getMemberId)
                .collect(Collectors.toList());

        Map<Integer, Integer> memberCategory = requestDto.getMemberList().stream()
                .collect(Collectors.toMap(
                        TechStackSimpleDto::getMemberId,
                        TechStackSimpleDto::getCategoryId
                ));

        Map<Integer, Member> membersMap = memberCustomRepository.getMembersMap(memberList);

        for(Integer id:memberList){
            Member member = membersMap.get(id);
            Teammate teammate = Teammate.builder()
                    .project(project)
                    .member(member)
                    .teammateReader(reader == id)
                    .build();
            //멤버의 카테고리 가져오고
            Integer categoryId = member.getCategory().getCategoryId();
            //만약 해당 멤버의 카테고리가 풀스택이라면 List에서 선택한걸 가져오도록 지정.
            Integer selectCategoryId = 0;
            if(categoryId==300){
                selectCategoryId = memberCategory.get(id);
            }else{//아니라면 본인 스택 해당하는걸로
                selectCategoryId = categoryId;
            }
            //1. 해당 멤버의 해당 소분류 기술스택을 다 가져온다. ( 기준 : memberId & categoryId )
            List<TechStack> techStacks = techStackCustomRepository.getByMemberIdAndCategoryId(id,selectCategoryId);

            if(techStacks.isEmpty()){
                throw new BaseException(StatusCode.NOT_EXIST_STACK);
            }
            // techStack to PjtTechStack
            teammate.addTechStacks(techStacks,teammate);

            //2. for문 돌면서 다.. add..
            project.addTeammate(teammate);
        }
        // 저장
        projectRepository.save(project);
        return true;

    }
    // 팀원 추가

    @Override
    public boolean addTeammate(TeammateRequestDto requestDto) {
        Integer memberId = requestDto.getMemberId();
        Integer projectId = requestDto.getProjectId();
        Integer categoryId = requestDto.getCategoryId();
        //Entity 만들기위해서 가져옴.
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_PROJECT));
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MEMBER));

        Teammate teammate = Teammate.builder()
                .member(member)
                .project(project)
                .teammateReader(false)
                .build();
        int selectedCategoryId = 0;
        //풀스택이면 선택한 카테고리로
        if(member.getCategory().getCategoryId()==300){
            selectedCategoryId = categoryId;
        }else{ //아니면 선택한 카테고리로 진행
            selectedCategoryId = member.getCategory().getCategoryId();
        }
        List<TechStack> techStacks = new ArrayList<>();
        //근데 만약 선택한게 풀스택이면 100,200둘다 겟
        if(selectedCategoryId==300){
            List<TechStack> frontStack = techStackCustomRepository.getByMemberIdAndCategoryId(memberId, 100);
            List<TechStack> backStack = techStackCustomRepository.getByMemberIdAndCategoryId(memberId, 200);
            // frontStack과 backStack을 합치기
            techStacks = Stream.concat(frontStack.stream(), backStack.stream())
                    .collect(Collectors.toList());
        }else{//아니면 해당하는것만 겟
            techStacks = techStackCustomRepository.getByMemberIdAndCategoryId(memberId, selectedCategoryId);
        }

        teammate.addTechStacks(techStacks,teammate);
        project.addTeammate(teammate);
        return true;
    }

    @Override
    public boolean deleteTeammate(TeammateRequestDto requestDto) {
        Project project = projectRepository.findById(requestDto.getProjectId()).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_PROJECT));
        //팀 메이트 리스트 가져와서
        List<Teammate> teammates = project.getTeammates();
        //돌면서 지워야하는 팀 멤버면 remove하고 return
        for(Teammate teammate: teammates){
            if(teammate.getMember().getMemberId().equals(requestDto.getMemberId())){
                teammateRepository.delete(teammate);
                teammates.remove(teammate);
                break;
            }

        }
        return true;
    }
    // 원격 레포 연결
    @Override
    public boolean updateRepo(GitRepoRequestDto requestDto) {
        Project project = projectRepository.findById(requestDto.getProjectId()).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_PROJECT));
        project.updateRepo(requestDto.getProjectRepo());
        return true;
    }

    // 프로젝트 입장
    @Override
    public ProjectEnterDto enterProject(String token, ProjectEnterRequestDto projectEnterRequestDto) {
        Integer memberId = jwtUtil.getMemberId(token); // accessToken에서 memberId 추출
        String repoUrl = projectEnterRequestDto.getRepoUrl();
        String repoName = repoUrl.split("/")[repoUrl.split("/").length - 1].replace(".git", "");

        // 기존에 codeServerName을 가지고 있으면 바로 입장 시키고 없으면 UUID를 이용해 새로운 codeServerName을 만들어서 할당하는 로직
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MEMBER));
        String codeServerName = member.getCodeServerName();
        if (codeServerName == null || codeServerName.isEmpty()) {
            UUID uuid = UUID.randomUUID();
            codeServerName = "code-server-" + uuid;
            member.updateCodeServerName(codeServerName);
            memberRepository.save(member);
        }

        // 기존에 할당된 포트가 있으면 그대로 사용하고 없으면 새로운 포트를 할당하는 로직
        Port port = portCustomRepository.findExistingPortByMemberId(memberId);
        if(port == null){
            port = portCustomRepository.getUnUse();
            if(port == null) {
                throw new BaseException(StatusCode.NOT_EXIST_PORT);
            }

            port = Port.builder()
                    .portId(port.getPortId())
                    .member(member)
                    .portUse(true)
                    .build();
            portRepository.save(port);
        }
        Integer dbPort = port.getPortId();

        // SSH 세션 생성
        Session session = jschUtil.createSession();

        // 컨테이너가 존재하는지 확인
        String isContainerExistsCommand = "docker inspect --format='{{.State.Health.Status}}' " + codeServerName;
        if(!jschUtil.executeCommand(session, isContainerExistsCommand)) {
            // 컨테이너가 존재하지 않으면 docker run 프로세스 실행
            log.info("컨테이너 없음");
            runContainer(session, codeServerName, dbPort, repoUrl);
        } else {
            // 컨테이너가 존재하면 docker start 프로세스 실행
            log.info("컨테이너 있음");
            startContainer(session, codeServerName, repoUrl);
        }

        // 리버스 프록시 설정
        String nginxUpdateCommand = "sudo python3 nginx_updater.py";
        if(!jschUtil.executeCommand(session, nginxUpdateCommand)) {
            throw new BaseException(StatusCode.NGINX_UPDATE_FAIL);
        }

        // 깃 클론 전 디렉토리 존재 여부 확인
        String checkDirCommand = "docker exec " + codeServerName + " /bin/bash -c '[ -d \"/home/coder/code-server/" + repoName + "\" ] && echo \"exists\" || echo \"not exists\"'";
        if(!jschUtil.executeCommandAndGetOutput(session, checkDirCommand).trim().equals("exists")) {
            // 깃 클론
            String gitCloneCommand = "docker exec " + codeServerName + " git clone " + repoUrl;
            if(!jschUtil.executeCommand(session, gitCloneCommand)) {
                throw new BaseException(StatusCode.GIT_CLONE_FAIL);
            }
        }

        // 깃 config 세팅
        String userName = jwtUtil.getMemberName(token);
        String userEmail = jwtUtil.getEmail(token);
        String gitConfigSettingCommand = "docker exec " + codeServerName + " /bin/bash -c 'git config --global user.name " + userName + "; git config --global user.email " + userEmail + "'";
        if(!jschUtil.executeCommand(session, gitConfigSettingCommand)) {
            throw new BaseException(StatusCode.GIT_CLONE_FAIL);
        }

        // SSH 세션 종료
        session.disconnect();

        return ProjectEnterDto.builder()
                .url("https://k10e103.p.ssafy.io/" + codeServerName + "/?folder=/home/coder/code-server/" + repoName)
                .dbPort(dbPort)
                .build();
    }

    // 프로젝트 퇴장
    @Override
    public void exitProject(String token) {
        Integer memberId = jwtUtil.getMemberId(token); // accessToken에서 memberId 추출
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MEMBER));
        String codeServerName = member.getCodeServerName();

        Session session = jschUtil.createSession();

        // 테마를 토글하는 명령
        String stopCommand = "docker stop " + codeServerName;
        if (!jschUtil.executeCommand(session, stopCommand)) {
            throw new BaseException(StatusCode.CONTAINER_STOP_FAIL);
        }

        session.disconnect();
    }

    // 프로젝트 다크모드
    @Override
    public void projectDarkMode(String token) {
        Integer memberId = jwtUtil.getMemberId(token); // accessToken에서 memberId 추출
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MEMBER));
        String codeServerName = member.getCodeServerName();

        Session session = jschUtil.createSession();

        // 테마를 토글하는 명령
        String toggleThemeCommand = "docker exec " + codeServerName + " /bin/bash -c \"sed -i 's|\\\"Visual Studio Dark\\\"|\\\"Visual Studio Light\\\"|;t;s|\\\"Visual Studio Light\\\"|\\\"Visual Studio Dark\\\"|' /home/coder/.local/share/code-server/User/settings.json\"";
        if (!jschUtil.executeCommand(session, toggleThemeCommand)) {
            throw new BaseException(StatusCode.CHANGE_DARK_MODE_FAIL);
        }

        session.disconnect();
    }


    @Override
    public ResponseEntity<?> getProjectListInMember(String token) {
        Member member = memberRepository.findById(jwtUtil.getMemberId(token)).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MEMBER));
        List<ProjectListResponseDto> projectListResponseDtos = member.getTeammates().stream()
                .map(project -> ProjectListResponseDto.builder()
                        .projectId(project.getProject().getProjectId())
                        .projectName(project.getProject().getProjectName())
                        .projectInfo(project.getProject().getProjectInfo())
                        .projectImg(project.getProject().getProjectImg())
                        .projectRepo(project.getProject().getProjectRepo())
                        .subCategory(project.getProject().getSubCategory())
                        .build())
                .toList();
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse<>(projectListResponseDtos));
    }

    // 컨테이너 생성 프로세스 
    public void runContainer(Session session, String codeServerName, Integer dbPort, String repoUrl) {
        // 컨테이너 생성 및 실행
        String runCommand = "docker run --name " + codeServerName + " -d -p :80 -p " + dbPort + ":3306 code-server --bind-addr=0.0.0.0:80";
        if(!jschUtil.executeCommand(session, runCommand)) {
            throw new BaseException(StatusCode.CONTAINER_RUN_FAIL);
        }

        // 컨테이너 헬스 체크(실행 중인지 켜졌는지 실행 실패 했는지 확인)
        int retryCount = 0;
        int maxRetryCount = 10; // 최대 10번 시도 (약 10초)
        String isContainerReadyCommand = "docker inspect --format='{{.State.Health.Status}}' " + codeServerName;
        while (!jschUtil.isContainerReady(session, isContainerReadyCommand) && retryCount < maxRetryCount) {
            retryCount++;
        }
        log.info(retryCount == maxRetryCount ? "컨테이너가 준비되지 않음" : "컨테이너 준비 완료");

        // mysql 실행
        String mysqlStartCommand = "docker exec " + codeServerName + " /start_mysql.sh";
        if(!jschUtil.executeCommand(session, mysqlStartCommand)) {
            throw new BaseException(StatusCode.MYSQL_START_FAIL);
        }
    }

    // 컨테이너 실행 프로세스
    public void startContainer(Session session, String codeServerName, String repoUrl) {
        // 컨테이너 실행
        String startCommand = "docker start " + codeServerName;
        if(!jschUtil.executeCommand(session, startCommand)) {
            throw new BaseException(StatusCode.CONTAINER_START_FAIL);
        }

        // 컨테이너 헬스 체크(실행 중인지 켜졌는지 실행 실패 했는지 확인)
        int retryCount = 0;
        int maxRetryCount = 10; // 최대 10번 시도 (약 10초)
        String isContainerReadyCommand = "docker inspect --format='{{.State.Health.Status}}' " + codeServerName;
        while (!jschUtil.isContainerReady(session, isContainerReadyCommand) && retryCount < maxRetryCount) {
            retryCount++;
        }
        log.info(retryCount == maxRetryCount ? "컨테이너가 준비되지 않음" : "컨테이너 준비 완료");

        // mysql 재실행
        String mysqlRestartCommand = "docker exec " + codeServerName + " /restart_mysql.sh";
        if(!jschUtil.executeCommand(session, mysqlRestartCommand)) {
            throw new BaseException(StatusCode.MYSQL_RESTART_FAIL);
        }
    }
}
