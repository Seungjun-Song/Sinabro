package com.HP50.be.domain.member.entity;


import com.HP50.be.domain.code.entity.Category;
import com.HP50.be.domain.project.entity.Teammate;
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
public class Member extends BaseTimeEntity {
    @Id
    private Integer memberId;

    @Column(nullable = false)
    private String memberName;

    /**
     * 해당 Email 은 유저가 로그인하는 email 이 아닌
     * 깃허브 profile 에 노출시킬 email 이다. <br>
     * 따로 지정을 하지 않은 사람도 많으니 nullable 하게 처리
     * loadUser 에서 멤버 저장
     * @see com.HP50.be.global.oauth.CustomOAuth2UserService
     */
    @Column
    private String memberEmail;

    @Column(nullable = false)
    private String memberGit;

    @Column
    private String memberImg;

    @Column
    private String codeServerName;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "member")
    private List<Teammate> teammates = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<TechStack> techStacks = new ArrayList<>();

    public void updateCodeServerName(String codeServerName) {
        this.codeServerName = codeServerName;
    }
}
