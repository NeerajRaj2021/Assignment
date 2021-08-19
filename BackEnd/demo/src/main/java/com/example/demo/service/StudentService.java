package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Students;

public interface StudentService {

	public String create(Students student);
	public int getSequenceNumber(String sequenceName);
	public List<Students> getstudents();
	

}
