package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Students;
import com.example.demo.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:3000")

public class StudentController {
   @Autowired StudentService studentservice;
	
   @PostMapping("/create")
   
   public HashMap<String, String> create(@Valid @RequestBody Students student,BindingResult result)
   {
	   System.out.println(student);
	   List<FieldError> fieldErrors;
	   HashMap<String, String> map = new HashMap<>();
	   
	   
	   
	   if(result.hasErrors())
	   {
		   
		   fieldErrors =result.getFieldErrors();
			 System.out.println(fieldErrors);
			 
			 fieldErrors.stream().forEach(fieldError->{
				 
				 map.put("status", fieldError.getDefaultMessage());
				 System.out.println(fieldError.getField()+" "+fieldError.getDefaultMessage());
				 
			 });
			 return map; 
	   }
	   else {
	   System.out.println(student);
	   String flag=studentservice.create(student);
	   map.put("status","success");
	   return map;
	   
	   }

  }
   
   
   @GetMapping("/getStudents")
   public List<Students> getstudents(){
	   System.out.println("in get");
	   
	   return studentservice.getstudents();
	   
   }

   

}
