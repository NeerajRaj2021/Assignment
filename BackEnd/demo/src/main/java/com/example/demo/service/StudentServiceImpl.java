package com.example.demo.service;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;

import com.example.demo.entity.DbSequence;
import com.example.demo.entity.Students;
import com.example.demo.repository.StudentsRepo;
@Service

public class StudentServiceImpl implements StudentService{
	@Autowired StudentsRepo studentsrepo;

	@Override
	public String create(Students student) {
		
		student.setId(getSequenceNumber("user_sequence"));
		studentsrepo.save(student);
		
		return "sucess";
	}
	  @Autowired
	    private MongoOperations mongoOperations;


	    public int getSequenceNumber(String sequenceName) {
	       
	        Query query = new Query(Criteria.where("id").is(sequenceName));
	       
	        Update update = new Update().inc("seq", 1);
	        
	        DbSequence counter = mongoOperations
	                .findAndModify(query,
	                        update, options().returnNew(true).upsert(true),
	                        DbSequence.class);

	        return !Objects.isNull(counter) ? counter.getSeq() : 1;
	    }


		@Override
		public List<Students> getstudents() {
			
			return studentsrepo.findAll();
		}
}
