package com.HP50.be.domain.project.entity;

import com.HP50.be.domain.code.entity.SubCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PjtTechStack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pjtTechStackId;

    @ManyToOne
    @JoinColumn(name = "teammate_id")
    private Teammate teammate;

    @ManyToOne
    @JoinColumn(name = "subcategory_id")
    private SubCategory subCategory;
    private String subcategoryName;
}
