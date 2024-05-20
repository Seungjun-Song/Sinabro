package com.HP50.be.global.utill;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;

public class SonarQubeScanner {
    public void runScanner(String projectPath) {
        try {
            ProcessBuilder builder = new ProcessBuilder();
            builder.command("sonar-scanner", "-Dsonar.projectBaseDir=" + projectPath);
            builder.directory(new File(projectPath)); // Set working directory

            Process process = builder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

            int exitCode = process.waitFor();
            System.out.println("\nExited with error code : " + exitCode);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

