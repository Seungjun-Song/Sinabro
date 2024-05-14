package com.HP50.be.domain.calender.entity;

import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.project.entity.Project;
import com.HP50.be.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Milestone extends BaseTimeEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer milestoneId;

    @Column(nullable = false, length = 100)
    private String milestoneTitle;

    @Column(nullable = false, length = 500)
    private String milestoneContent;

    @Column(nullable = false)
    private LocalDateTime milestoneStartDttm;

    @Column(nullable = false)
    private LocalDateTime milestoneEndDttm;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @OneToOne
    @JoinColumn(name = "subCategory_id")
    private SubCategory subCategory;
}
