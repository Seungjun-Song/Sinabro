package com.HP50.be.domain.calender.entity;

import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.project.entity.Project;
import com.HP50.be.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Calender extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer calenderId;
    private String calenderName;
    private LocalDate calenderStartDt;
    private LocalDate calenderEndDt;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "subcategory_id")
    private SubCategory subCategory;

}