package com.stephull.guessinggamesample.model;

import javax.persistence.*;

@Entity
@Table(name="guessinggamesample")
public class Query {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	@Column(name="query")
	private String query;
	
	@Column(name="name")
	private String name;
	
	@Column(name="published")
	private boolean published;
	
	public Query() {}
	
	public Query(String q, String n, boolean p) {
		this.query = q;
		this.name = n;
		this.published = p;
	}

	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}
	
	public boolean isPublished() {
		return published;
	}
	
	public void setPublished(boolean published) {
		this.published = published;
	}
	
	@Override
	public String toString() {
		return String.format("uploaded query [name=%s, query=%s, published=%b]", name, query, published);
	}
}
