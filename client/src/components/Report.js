import React, { useState } from "react";
import "./Report.css";

const Report = () => {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState("");
    const [thickness, setThickness] = useState(null);

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!image) {
            alert("Please upload an image!");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log("API Response:", data); // Debugging line
            setResult(data.message);
            setThickness(data.thickness || "N/A");
        } catch (error) {
            console.error("Error:", error);
            alert("Error processing the image.");
        }
    };

    return (
        <div className="report-container">
            <div className="header-rep">
                <h1>Prenatal Health Advisor</h1>
                <p>Fetal Nuchal Fold Thickness Report</p>
                <hr />
                <p>Date of Analysis: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="content">
                <h2>Upload Fetal Ultrasound Image</h2>
                <div className="upload-container">
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                {result && (
                    <div className="result-section">
                        <h3>Analysis Result</h3>
                        <p className="result">{result}</p>
                    </div>
                )}
            </div>

            <div className="disclaimer">
                <h3>Medical Disclaimer</h3>
                <p>
                    This analysis is for advisory purposes only and should not replace official
                    medical records. Consult certified medical professionals for final decisions
                    regarding fetal health.
                </p>
            </div>

            {result && (
                <div className="footer">
                    <button className="button" onClick={() => window.print()}>
                        Download PDF
                    </button>
                </div>
            )}
        </div>
    );
};

export default Report;
