"use client";
import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download } from 'lucide-react';
import './Certificate.css';

export default function Certificate({ data }) {
    const certificateRef = useRef(null);

    if (!data) return null;

    const {
        name,
        father_name,
        gender,
        technology,
        duration,
        issue_date,
        certificate_no
    } = data;

    const displayName = name || data.student_name || 'Verified Candidate';

    const verifyUrl = `https://mjtechglobal.in/verify?id=${certificate_no}`;

    const handleDownloadPDF = async () => {
        const element = certificateRef.current;
        if (!element) return;

        // Briefly adjust styles for printing if needed, or just capture as is
        try {
            const canvas = await html2canvas(element, {
                scale: 2, // High resolution
                useCORS: true,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            // A4 size: 297 x 210 mm (Landscape)
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
            pdf.save(`Certificate_${displayName?.replace(/\s+/g, '_')}_${certificate_no}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    return (
        <div className="certificate-wrapper">
            <button className="btn-download-cert" onClick={handleDownloadPDF}>
                <Download size={18} /> Download as PDF
            </button>
            <div className="certificate-container" ref={certificateRef}>
                <div className="certificate-border">
                    <div className="certificate-inner">
                        {/* Watermark Logo */}
                        <img src="/logo.png" alt="" className="cert-watermark" />

                        {/* Header Details */}
                        <div className="cert-header">
                            <div className="cert-logo-area">
                                {/* Assuming you have logo.png in public folder */}
                                <img src="/logo.png" alt="MJ Tech Global" className="cert-logo" />
                                <h1 className="cert-company-name">MJ TECH GLOBAL</h1>
                            </div>

                            {/* MSME Details */}
                            <div className="cert-msme-area">
                                <img src="/msme.png" alt="MSME Logo" className="cert-msme-logo" />
                                <p className="cert-msme-text">Registered, Under Ministry of MSME Govt. India</p>
                            </div>

                            <div className="cert-number-area">
                                <p><strong>Certificate No:</strong> {certificate_no}</p>
                                <p><strong>Issue Date:</strong> {new Date(issue_date).toLocaleDateString()}</p>
                            </div>
                        </div>

                        {/* Certificate Title */}
                        <div className="cert-title-area">
                            <h2>CERTIFICATE</h2>
                            <h3>OF INTERNSHIP COMPLETION</h3>
                        </div>

                        {/* Certificate Body */}
                        <div className="cert-body">
                            <p className="cert-present-text">This is proudly presented to</p>
                            <h2 className="cert-recipient-name">{displayName}</h2>
                            {father_name && (
                                <p className="cert-relation">{gender === 'Female' ? 'D/O' : 'S/O'} {father_name}</p>
                            )}

                            <p className="cert-description">
                                For successfully completing the <strong>{duration}</strong> Internship Program in
                                <br />
                                <strong className="cert-course">{technology}</strong>.
                            </p>
                            <p className="cert-para">
                                During this internship, the candidate demonstrated exceptional skill,
                                dedication, and professional excellence in the assigned tasks and projects.
                            </p>
                        </div>

                        {/* Certificate Footer */}
                        <div className="cert-footer">
                            <div className="cert-signature">
                                <img src="/signature.png" alt="Signature" className="cert-signature-img" />
                                <div className="signature-line"></div>
                                <p>Authorized Signatory</p>
                                <p className="signatory-title">Founder &amp; CEO, MJ Tech Global</p>
                            </div>

                            <div className="cert-qr">
                                <QRCodeSVG
                                    value={verifyUrl}
                                    size={80}
                                    level="H"
                                    includeMargin={true}
                                />
                                <p className="qr-text">Scan to Verify</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
