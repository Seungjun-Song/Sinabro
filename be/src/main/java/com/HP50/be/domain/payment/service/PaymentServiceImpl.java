package com.HP50.be.domain.payment.service;

import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.member.repository.MemberRepository;
import com.HP50.be.domain.payment.dto.PaymentResponseDto;
import com.HP50.be.domain.payment.entity.Payment;
import com.HP50.be.domain.payment.entity.PaymentStatus;
import com.HP50.be.domain.payment.repository.PaymentRepository;
import com.HP50.be.domain.project.entity.Project;
import com.HP50.be.domain.project.repository.ProjectCustomRepository;
import com.HP50.be.domain.project.repository.ProjectRepository;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService{
    private final ProjectCustomRepository projectCustomRepository;
    private final ProjectRepository projectRepository;
    private final MemberRepository memberRepository;
    private final PaymentRepository paymentRepository;
    /*
        결제 요청 받은걸로 결과 저장
     */
    @Override
    public PaymentResponseDto requestPayment(int memberId, int projectId,int paymentAmount) {
        boolean isTeammate = projectCustomRepository.isTeammate(memberId, projectId);
        //팀원인지 먼저 확인
        if(!isTeammate){
            throw new BaseException(StatusCode.NOT_TEAM_MEMBER);
        }
        //이미 결제했는지 확인
        boolean alreadyPayment = paymentRepository.existsByProject_ProjectId(projectId);
        if(alreadyPayment){
            throw new BaseException(StatusCode.ALREADY_PAYED);
        }
        //해당 멤버 가져옴
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MEMBER));
        //해당 프로젝트 가져옴
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_PROJECT));

        Payment payment = Payment.builder()
                .paymentAmount(paymentAmount)
                .paymentCard(null)
                .paymentMethod(null)
                .paymentImpUid(null)
                .paymentStatus(PaymentStatus.READY)
                .project(project)
                .build();
        paymentRepository.save(payment);

        return PaymentResponseDto.builder()
                .memberEmail(member.getMemberEmail())
                .memberName(member.getMemberName())
                .build();

    }
}
