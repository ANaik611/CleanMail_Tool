package com.emailformatter;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")  // Allow requests from anywhere (your React app)
public class EmailController {

    @PostMapping("/generate")
    public Map<String, String> generateEmail(@RequestBody Map<String, String> request) {
        // Get data from the request (job title, company name, recipient name)
        String jobTitle = request.get("jobTitle");
        String companyName = request.get("companyName");
        String recipientName = request.get("recipientName");

        // Generate the email content
        String emailContent = generateEmailContent(jobTitle, companyName, recipientName);

        // Send back the generated email content
        Map<String, String> response = new HashMap<>();
        response.put("email", emailContent);

        return response;
    }

    private String generateEmailContent(String jobTitle, String companyName, String recipientName) {
        return String.format(
            "Dear %s,\n\n" +
            "I hope this email finds you well. I am writing to express my strong interest in the %s position at %s. I was excited to learn about this opportunity and believe my skills and experience align well with what you're looking for.\n\n" +
            "I am particularly drawn to %s's innovative approach and industry leadership. I am confident that my background in software development, combined with my passion for creating impactful solutions, makes me a strong candidate for this role.\n\n" +
            "I would welcome the opportunity to discuss how my background aligns with your team's needs. Thank you for considering my application.\n\n" +
            "Best regards",
            recipientName, jobTitle, companyName, companyName
        );
    }
}
