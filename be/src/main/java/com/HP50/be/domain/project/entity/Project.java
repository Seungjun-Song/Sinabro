package com.HP50.be.domain.project.entity;

import com.HP50.be.domain.calender.entity.Milestone;
import com.HP50.be.domain.code.entity.Category;
import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.project.dto.ProjectCreateRequestDto;
import com.HP50.be.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer projectId;

    @Column
    private String projectName;

    @Column
    private String projectInfo;

    @Column
    private String projectImg;

    @Column
    private String projectRepo;

    @Column
    @Setter
    private LocalDateTime endDttm;

    @Column
    private Integer projectDbPort;

    @ManyToOne
    @Setter
    @JoinColumn(name = "subcategory_id")
    private SubCategory subCategory;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Milestone> milestones;

    //연관관계 image
    // Cascade.PERSIST : Delivery 엔터티를 저장할 때 자동으로 DeliveryImage 엔터티도 저장
    @OneToMany(mappedBy = "project", cascade = CascadeType.PERSIST)
    // teammates 필드에 Builder의 초기값을 설정
    @Builder.Default
    private List<Teammate> teammates = new ArrayList<>();

    public void addTeammate(Teammate teammate){
        teammates.add(teammate);
    }
    // 레포 수정
    public void updateRepo(String url){
        this.projectRepo = url;
    }

}
