package com.ecommerce.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public class FileExtension {
	public static String saveFile(MultipartFile file) {
		if (!file.isEmpty()) {
			byte[] bytes;
			try {
				bytes = file.getBytes();
				String fileName = file.getOriginalFilename();
				String fileLocation = new File("static/images") + "/" + fileName;
				FileOutputStream fos = new FileOutputStream(fileLocation);
				fos.write(bytes);
				fos.close();
				
				return  "images\\" + fileName;
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			}
		} else {
			return null;
		}
	}
}
