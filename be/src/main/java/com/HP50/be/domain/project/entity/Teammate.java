package com.HP50.be.domain.project.entity;

import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.member.entity.TechStack;
import com.HP50.be.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Teammate extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer teammateId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private Boolean teammateReader;

    @OneToMany(mappedBy = "teammate",cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @Builder.Default
    private List<PjtTechStack> techStacks = new ArrayList<>();

    public void addTechStacks(List<TechStack> techStacks, Teammate teammate){
        for(TechStack techStack:techStacks){
            SubCategory subCategory = techStack.getSubCategory();
            PjtTechStack tech = PjtTechStack.builder()
                    .teammate(teammate)
                    .subCategory(subCategory)
                    .subcategoryName(subCategory.getSubCategoryName())
                    .build();
            teammate.techStacks.add(tech);
        }
    }

}
