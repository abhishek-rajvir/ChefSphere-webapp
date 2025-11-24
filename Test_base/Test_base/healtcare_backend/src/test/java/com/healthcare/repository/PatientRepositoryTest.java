package com.healthcare.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.healthcare.entities.DiagnosticTest;

@DataJpaTest //to declare  test case (class) fro DAO layer testing - Scans Repo + Entities
@AutoConfigureTestDatabase(replace = Replace.NONE)//continues to use main DB - mysql
class PatientRepositoryTest {
	//Field Level D.I
	@Autowired
	private PatientRepository patientRepository;

	@Test
	void testGetAllTestsForPatient() {
		Set<DiagnosticTest> tests = patientRepository.getAllTestsForPatient(1l);
		assertEquals(4l, tests.size());
		
	}

}
