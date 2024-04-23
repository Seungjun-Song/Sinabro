package com.HP50.be.domain.project.service;

import com.HP50.be.domain.code.entity.Category;
import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.code.repository.CategoryRepository;
import com.HP50.be.domain.code.repository.SubCategoryRepository;
import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.member.entity.TechStack;
import com.HP50.be.domain.member.repository.MemberCustomRepository;
import com.HP50.be.domain.member.repository.MemberRepository;
import com.HP50.be.domain.member.repository.TechStackCustomRepository;
import com.HP50.be.domain.member.repository.TechStackRepository;
import com.HP50.be.domain.port.entity.Port;
import com.HP50.be.domain.port.repository.PortCustomRepository;
import com.HP50.be.domain.project.dto.*;
import com.HP50.be.domain.project.entity.PjtTechStack;
import com.HP50.be.domain.project.entity.Project;
import com.HP50.be.domain.project.entity.Teammate;
import com.HP50.be.domain.project.repository.PjtTechStackRepository;
import com.HP50.be.domain.project.repository.ProjectCustomRepository;
import com.HP50.be.domain.project.repository.ProjectRepository;
import com.HP50.be.domain.project.repository.TeammateRepository;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService{
    private final ProjectCustomRepository projectCustomRepository;
    private final ProjectRepository projectRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final TeammateRepository teammateRepository;
    private final PjtTechStackRepository pjtTechStackRepository;
    private final PortCustomRepository portCustomRepository;
    private final MemberCustomRepository memberCustomRepository;
    private final TechStackCustomRepository techStackCustomRepository;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public ProjectInfoDto getTeamInfo(int memberId, int projectId) {
        return projectCustomRepository.getTeamInfo(projectId,memberId);
    }
    // 프로젝트 생성
    @Override
    public boolean createProject(ProjectCreateRequestDto requestDto) {
        //안쓰는 포트 get
        Port unUse = portCustomRepository.getUnUse();
        if(unUse==null){
            throw new BaseException(StatusCode.NOT_EXIST_PORT);
        }
        //진행 중 상태 가져오기
        SubCategory status = subCategoryRepository.findById(402).orElseThrow(()-> new BaseException(StatusCode.NOT_EXIST_SUB_CATEGORY));

        // 프로젝트 DTO 생성 후 Entity로 변환
        ProjectDto projectDto = ProjectDto.builder()
                .projectName(requestDto.getProjectName())
                .projectInfo(requestDto.getProjectInfo())
                .projectImg(requestDto.getProjectImg())
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
        int reader = requestDto.getMemberId(); //리더
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
}
