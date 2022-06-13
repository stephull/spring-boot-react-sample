package com.stephull.guessinggamesample.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.stephull.guessinggamesample.model.Query;
import com.stephull.guessinggamesample.repository.QueryRepository;

@CrossOrigin(origins="http://127.0.0.1:8083")
@RestController
@RequestMapping("/api/v1")
public class QueryController {

	@Autowired
	protected QueryRepository queryRepo;
	
	@GetMapping("/queries")
	public ResponseEntity<List<Query>> getAllQueries(@RequestParam(required=false) String q) {
		try {
			List<Query> queries = new ArrayList<Query>();
			if (q == null) {
				queryRepo.findAll().forEach(queries::add);
			} else {
				queryRepo.findByQuery(q).forEach(queries::add);
			}
			return (queries.isEmpty())
					? new ResponseEntity<>(HttpStatus.NO_CONTENT)
					: new ResponseEntity<>(queries, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/queries/{id}")
	public ResponseEntity<Query> getQueryById(@PathVariable("id") long id) {
		Optional<Query> queryData = queryRepo.findById(id);
		return (queryData.isPresent())
				? new ResponseEntity<>(queryData.get(), HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@RequestMapping(value="/queries", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Query> createQuery(@RequestBody Query query) {
		try {
			Query q = queryRepo.save(new Query(query.getQuery(), query.getName(), false));
			return new ResponseEntity<>(q, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/queries/{id}")
	public ResponseEntity<Query> updateQuery(@PathVariable("id") long id, @RequestBody Query query) {
		Optional<Query> queryData = queryRepo.findById(id);
		if (queryData.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		Query q = queryData.get();
		q.setQuery(query.getQuery());
		q.setName(query.getName());
		return new ResponseEntity<>(queryRepo.save(q), HttpStatus.OK);
	}
	
	@DeleteMapping("/queries/{id}")
	public ResponseEntity<HttpStatus> deleteQuery(@PathVariable("id") long id) {
		try {
			queryRepo.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/queries")
	public ResponseEntity<HttpStatus> deleteAllQueries() {
		try {
			queryRepo.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/queries/published")
	public ResponseEntity<List<Query>> findByPublished() {
		try {
			List<Query> guesses = queryRepo.findByPublished(true);
			return (guesses.isEmpty()) ? 
				new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(guesses, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
