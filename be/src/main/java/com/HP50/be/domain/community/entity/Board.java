
package com.HP50.be.domain.community.entity;

import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.project.entity.Project;
import com.HP50.be.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Board extends BaseTimeEntity {
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer boardId;

    @ManyToOne
    @JoinColumn(name= "member_id")
    private Member member;

    @Setter
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name= "subcategory_id")
    private SubCategory subCategory;

    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();

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

    @Setter
    @Column
    @ColumnDefault("0")
    private Integer recruitedPeopleBackEnd;

    @Setter
    @Column
    @ColumnDefault("0")
    private Integer recruitedPeopleFrontEnd;

    @Setter
    @Column
    @ColumnDefault("0")
    private Integer requiredPeopleBackEnd;

    @Setter
    @Column
    @ColumnDefault("0")
    private Integer requiredPeopleFrontEnd;
}
