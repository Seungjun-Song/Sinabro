
package com.HP50.be.domain.community.entity;

import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.project.entity.Project;
import com.HP50.be.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Board extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer boardId;

    @ManyToOne
    @JoinColumn(name= "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name= "subcategory_id")
    private SubCategory subCategory;

    @Column(length = 500)
    private String projectLink;

    @Column(length = 500)
    private String boardTitle;

    @Column(length = 500)
    private String boardContent;

    @Column(columnDefinition = "JSON")
    private String boardTag;

    @Column
    private String boardImg;

    @Column(columnDefinition = "tinyint")
    private boolean communityProgress;
}
