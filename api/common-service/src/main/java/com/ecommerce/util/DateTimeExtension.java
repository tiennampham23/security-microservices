package com.ecommerce.util;

import java.sql.Timestamp;

public class DateTimeExtension {
	public static Timestamp getCurrentDate() {
		return new Timestamp(System.currentTimeMillis());
	}
}
