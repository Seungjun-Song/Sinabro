package com.HP50.be.domain.memoryGraph.service;

import com.HP50.be.domain.memoryGraph.entity.Memo;
import com.HP50.be.domain.memoryGraph.repository.MemoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class MemoServiceImpl implements MemoService {
    private final MemoRepository memoRepository;

    public List<Memo> findAll(){return this.memoRepository.findAll();}

    @Override
    public void saveMemo() {

    }
}
