import React, { useState } from "react";
import { motion } from "framer-motion";

type FormData = {
  jobTitle: string;
  companyName: string;
  recipientName: string;
};

const EmailForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    companyName: "",
    recipientName: "",
  });

  const [emailText, setEmailText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      const generatedEmail = result.email;
      setEmailText(generatedEmail);
      
      // Automatically copy to clipboard
      await navigator.clipboard.writeText(generatedEmail);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Error generating email:", error);
      setEmailText("Error generating email.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.jobTitle && formData.companyName && formData.recipientName;

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="card"
        >
          <div className="header">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold text-white text-center"
            >
              Professional Email Generator
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="mt-2 text-blue-100 text-center"
            >
              Generate personalized job application emails in seconds
            </motion.p>
          </div>

          <div className="p-8">
            <motion.div 
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <label className="form-label">
                  Job Title
                </label>
                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  whileHover={{ scale: 1.01 }}
                  type="text"
                  placeholder="e.g. Senior Software Engineer"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="input-field"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="form-label">
                  Company Name
                </label>
                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  whileHover={{ scale: 1.01 }}
                  type="text"
                  placeholder="e.g. Acme Corporation"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="input-field"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="form-label">
                  Recipient Name
                </label>
                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  whileHover={{ scale: 1.01 }}
                  type="text"
                  placeholder="e.g. John Smith"
                  value={formData.recipientName}
                  onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                  className="input-field"
                />
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!isFormValid || isLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-lg transition duration-200 ${
                  isFormValid
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span className="ml-2">Generating...</span>
                  </span>
                ) : isCopied ? (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    Copied to clipboard! ✓
                  </motion.span>
                ) : (
                  "Generate Email"
                )}
              </motion.button>
            </motion.div>

            {emailText && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Generated Email
                  </h3>
                  <motion.pre
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="whitespace-pre-wrap font-mono text-sm text-gray-600 bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-white/20"
                  >
                    {emailText}
                  </motion.pre>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmailForm;