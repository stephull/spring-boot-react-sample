package com.stephull.guessinggamesample.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stephull.guessinggamesample.model.Query;

@Repository
public interface QueryRepository extends JpaRepository<Query, Long> {
	List<Query> findByPublished(boolean published);
	List<Query> findByQuery(String query);
}
