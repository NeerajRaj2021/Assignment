package com.example.demo.entity;


import javax.validation.constraints.Pattern;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "database_sequences")


public class Students {
	@Transient
    public static final String SEQUENCE_NAME = "user_sequence";

	@Id
	
	
	private String id;
	@Pattern(regexp="^[a-zA-Z ]+$",message="Name contains only Alphabet along with Space")
    private String Name;
    private String dob;
    private String cls;
    private String div;
    private String gen;
	public String getId() {
		return id;
	}
	public void setId(int id) {
		String newId = Integer.toString(id);
		newId = "R-" + newId;
		this.id = newId;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public String getCls() {
		return cls;
	}
	public void setCls(String cls) {
		this.cls = cls;
	}
	public String getDiv() {
		return div;
	}
	public void setDiv(String div) {
		this.div = div;
	}
	public String getGen() {
		return gen;
	}
	public void setGen(String gen) {
		this.gen = gen;
	}
	public static String getSequenceName() {
		return SEQUENCE_NAME;
	}
	@Override
	public String toString() {
		return "Students [id=" + id + ", Name=" + Name + ", dob=" + dob + ", cls=" + cls + ", div=" + div + ", gen="
				+ gen + "]";
	}
      
    
    

	}
   
    
    

   
       


