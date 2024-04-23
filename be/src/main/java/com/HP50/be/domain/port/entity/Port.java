package com.HP50.be.domain.port.entity;

import com.HP50.be.domain.member.entity.Member;
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
public class Port {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer portId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
