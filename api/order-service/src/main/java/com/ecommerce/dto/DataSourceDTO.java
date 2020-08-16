package com.ecommerce.dto;

import java.util.List;

public class DataSourceDTO {
	private List<String> labels;
	
	private SeriesDTO series;
	
	private String title;

	public DataSourceDTO(List<String> labels, SeriesDTO series, String title) {
		super();
		this.labels = labels;
		this.series = series;
		this.title = title;
	}

	public DataSourceDTO(String title) {
		super();
		this.title = title;
		// TODO Auto-generated constructor stub
	}

	public List<String> getLabels() {
		return labels;
	}

	public void setLabels(List<String> labels) {
		this.labels = labels;
	}

	public SeriesDTO getSeries() {
		return series;
	}

	public void setSeries(SeriesDTO series) {
		this.series = series;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	
}
