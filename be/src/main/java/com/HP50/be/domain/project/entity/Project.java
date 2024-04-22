package com.HP50.be.domain.project.entity;

import com.HP50.be.domain.code.entity.Category;
import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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
    private LocalDateTime endDttm;

    @Column
    private Integer projectDbPort;

    @ManyToOne
    @JoinColumn(name = "subcategory_id")
    private SubCategory subCategory;

}
