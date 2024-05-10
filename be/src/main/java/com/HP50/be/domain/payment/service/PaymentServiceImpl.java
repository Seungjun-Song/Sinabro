package com.HP50.be.domain.payment.service;

import com.HP50.be.domain.member.entity.Member;
import com.HP50.be.domain.member.repository.MemberRepository;
import com.HP50.be.domain.payment.dto.PaymentResponseDto;
import com.HP50.be.domain.payment.dto.PaymentValidateDto;
import com.HP50.be.domain.payment.entity.Payment;
import com.HP50.be.domain.payment.entity.PaymentStatus;
import com.HP50.be.domain.payment.repository.PaymentCustomRepository;
import com.HP50.be.domain.payment.repository.PaymentRepository;
import com.HP50.be.domain.project.entity.Project;
import com.HP50.be.domain.project.repository.ProjectCustomRepository;
import com.HP50.be.domain.project.repository.ProjectRepository;
import com.HP50.be.global.common.StatusCode;
import com.HP50.be.global.exception.BaseException;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService{
    private final ProjectCustomRepository projectCustomRepository;
    private final ProjectRepository projectRepository;
    private final MemberRepository memberRepository;
    private final PaymentRepository paymentRepository;
    private final PaymentCustomRepository paymentCustomRepository;
    private final IamportClient iamportClient;
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
        boolean alreadyPayment = paymentCustomRepository.checkPaid(projectId);
        if(alreadyPayment){
            throw new BaseException(StatusCode.ALREADY_PAID);
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

    @Override
    public Boolean validatePayment(int memberId,PaymentValidateDto dto)  {

        // 결제 단건 조회(아임포트)
        int paymentAmount = 0;
        String memberEmail = ""; //결제 이메일
        String paymentStatus = "";
        String paymentMethod ="";
        String paymentCard = "";
        //PortOne에서 결제건에 대한 정보를 가져온다.
        try {
            //Payment Entity와 중복 -> 명확한 경로로 객체 지정
            com.siot.IamportRestClient.response.Payment iamResponse = iamportClient.paymentByImpUid(dto.getPaymentImpUid()).getResponse();
            paymentAmount = Integer.parseInt(iamResponse.getAmount().toString());
            memberEmail = iamResponse.getBuyerEmail();
            paymentStatus = iamResponse.getStatus();
            paymentMethod = iamResponse.getPayMethod();
            paymentCard = iamResponse.getCardName();
        } catch (IamportResponseException e) {
            throw new BaseException(StatusCode.NOT_EXIST_PORTONE);
        } catch (IOException e) {
            throw new BaseException(StatusCode.FAIL_PORTONE_RESPONSE);
        }
        /*
            DB와 일치하는지 확인 start
         */
        //신청한사람이 일치하는지 확인
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MEMBER));
        if(!member.getMemberEmail().equals(memberEmail))throw new BaseException(StatusCode.NOT_EQUAL_MEMBER);

        //결제 상태 확인
        Payment payment = paymentRepository.findByProject_ProjectId(dto.getProjectId());
        if(payment==null){
            throw new BaseException(StatusCode.NOT_EXIST_PAYMENT);
        }
        //이미 결제했으면 return
        if(payment.getPaymentStatus()==PaymentStatus.OK)
            throw new BaseException(StatusCode.ALREADY_PAID);

        //아니라면 결제 진행
        //1. Validation 진행 - 결제 금액 일치
        if(paymentAmount!=payment.getPaymentAmount()){
            throw new BaseException(StatusCode.NOT_EQUAL_ACOUNT);
        }
        //2. 상태가 paid 아닌 경우
        if(!paymentStatus.equals("paid")){
            throw new BaseException(StatusCode.STATUS_IS_NOT_PAID);
        }
        /*
            DB와 일치하는지 확인 end
         */
        //모든 Validate를 통과한 경우 정보 수정
        payment.updatePayment(dto,paymentMethod,paymentCard);
        return true;
    }
}
