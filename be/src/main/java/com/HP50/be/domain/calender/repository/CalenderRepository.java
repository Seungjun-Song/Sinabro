package com.HP50.be.domain.calender.repository;

import com.HP50.be.domain.calender.entity.Calender;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CalenderRepository extends JpaRepository<Calender,Integer> {

}
