package com.HP50.be.domain.member.entity;

import com.HP50.be.domain.code.entity.SubCategory;
import com.HP50.be.domain.member.dto.TechStackResponseDto;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TechStack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer techStackId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "subcategory_id")
    private SubCategory subCategory;

    @Column(length = 50)
    private String subCategoryName;


    public TechStackResponseDto toResponseDto(Member member){
        return null;
    }
}
