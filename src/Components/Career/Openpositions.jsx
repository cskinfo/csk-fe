import { useState } from "react";
import { Search, MapPin, Briefcase, Tag, Calendar, User, FileX } from "lucide-react";

import { Upload, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Center } from "@react-three/drei";
import axios from "axios";
import { useEffect } from "react";







export default function OpenPositions() {

    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
  fetchJobs();
}, []);

const fetchJobs = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/jobs"
    );

    setJobs(res.data);
  } catch (err) {
    console.log(err);
  }
};

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        experience: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // form 
   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setIsSubmitting(true);

    const data = new FormData();

    data.append(
      "jobTitle",
      selectedJob?.title || ""
    );

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append(
      "experience",
      formData.experience
    );
    data.append("message", formData.message);

    if (resumeFile) {
      data.append(
        "resume",
        resumeFile
      );
    }

    await axios.post(
      "http://localhost:5000/api/applications",
      data,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    setSubmitSuccess(true);

    setTimeout(() => {
      setShowModal(false);

      setSubmitSuccess(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
        experience: "",
        message: "",
      });

      setResumeFile(null);
    }, 2000);

  } catch (err) {
    console.log(err);
    alert("Application submit failed");
  } finally {
    setIsSubmitting(false);
  }
};


    const [searchQuery, setSearchQuery] = useState("");

    const filtered = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (



        <section
            className="w-full bg-white py-16 px-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            {/* Google Fonts — Inter */}
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
                rel="stylesheet"
            />

            <div className="max-w-5xl mx-auto">
                {/* Breadcrumb / Home */}
                {/* <div className="flex justify-end mb-2">
                    <a
                        href="#"
                        className="text-sm font-medium"
                        style={{ color: "#1a56db" }}
                    >
                        Home
                    </a>
                </div> */}

                {/* Section Label */}
                <div className="flex items-center gap-2 mb-3">
                    <div
                        className="w-6 h-0.5"
                        style={{ backgroundColor: "#f59e0b" }}
                    />
                    <span
                        className="text-xs font-semibold tracking-widest uppercase"
                        style={{ color: "#f59e0b", letterSpacing: "0.15em" }}
                    >
                        Open Positions
                    </span>
                </div>

                {/* Heading */}
                <h2
                    className="font-bold mb-8"
                    style={{
                        fontSize: "2.25rem",
                        color: "#191B23",
                        lineHeight: "1.2",
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    Find Your Role
                </h2>

                {/* Search Bar */}
               <div
  className="flex items-center justify-between mb-10 flex-wrap gap-4"
>
  {/* Search Bar */}
  <div
    className="flex items-center gap-0"
    style={{ maxWidth: "440px", width: "100%" }}
  >
    <input
      type="text"
      placeholder="Search job title, skills..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="flex-1 px-4 py-2.5 text-sm border outline-none"
      style={{
        border: "1px solid #d1d5db",
        borderRight: "none",
        color: "#191B23",
        borderRadius: "4px 0 0 4px",
        height: "44px",
      }}
    />
    

    <button
  style={{
    backgroundColor: "#1a56db",
    width: "44px",
    height: "44px",
    borderRadius: "0 4px 4px 0",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    flexShrink: 0,
    border: "none",
    cursor: "pointer",
  }}
>
  <Search size={18} color="white" strokeWidth={2.5} />
</button>
  </div>

  {/* Home Link */}
  <Link 
  to={"/"}
    
    href="/"
    className="text-sm font-semibold"
    style={{
      color: "#1a56db",
      whiteSpace: "nowrap",
    }}
  >
    Home
  </Link>
</div>

                {/* Job Cards */}
                {/* Job Cards */}
                <div className="flex flex-col gap-5">
                    {filtered.map((job) => (
                        <div
                            key={job._id}
                            className="py-7 px-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            style={{
                                border: "1px solid #e5e7eb",
                                borderRadius: "18px",
                                background: "#ffffff",
                            }}
                        >
                            {/* Title row */}
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <h3
                                        className="font-bold text-lg"
                                        style={{
                                            color: "#191B23",
                                            fontSize: "1.1rem",
                                        }}
                                    >
                                        {job.title}
                                    </h3>

                                    <span
                                        className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                                        style={
                                            job.badgeColor === "orange"
                                                ? {
                                                    backgroundColor: "#fff7ed",
                                                    color: "#c2410c",
                                                    border: "1px solid #fed7aa",
                                                }
                                                : {
                                                    backgroundColor: "#eff6ff",
                                                    color: "#1d4ed8",
                                                    border: "1px solid #bfdbfe",
                                                }
                                        }
                                    >
                                        {job.badge}
                                    </span>
                                </div>

                                <span
                                    className="text-xs whitespace-nowrap"
                                    style={{ color: "#9ca3af" }}
                                >
                                    {job.postedAgo}
                                </span>
                            </div>

                            {/* Meta row */}
                            <div className="flex items-center flex-wrap gap-x-5 gap-y-2 mb-4">
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={13} color="#2563eb" />
                                    <span className="text-xs text-gray-600">
                                        {job.experience}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <MapPin size={13} color="#2563eb" />
                                    <span className="text-xs text-blue-600">
                                        {job.location}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <Briefcase size={13} color="#2563eb" />
                                    <span className="text-xs text-blue-600">
                                        {job.department}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <Tag size={13} color="#2563eb" />
                                    <span className="text-xs text-blue-600">
                                        {job.category}
                                    </span>
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="mb-4">
                                <span
                                    className="block mb-2 text-xs font-semibold tracking-widest"
                                    style={{
                                        color: "#f59e0b",
                                        letterSpacing: "0.12em",
                                    }}
                                >
                                    SKILLS
                                </span>

                                <p
                                    className="text-sm"
                                    style={{
                                        color: "#4b5563",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    {job.skills}
                                </p>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => {
                                    setSelectedJob(job);
                                    setShowModal(true);
                                }}
                                className="inline-flex items-center gap-2 text-sm font-semibold"
                                style={{ color: "#2563eb" }}
                            >
                                {job.ctaLabel}
                                <span>→</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>


            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center mt-15"
                    style={{
                        background: "rgba(0,0,0,.55)",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    <div
                        style={{
                            width: "650px",
                            maxWidth: "95%",
                            background: "#fff",
                            borderRadius: "20px",
                            padding: "32px",
                        }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2
                                style={{
                                    fontSize: "24px",
                                    fontWeight: 700,
                                }}
                            >
                                Apply for {selectedJob?.title}
                            </h2>

                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    fontSize: "22px",
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                }}
                            >
                                ×
                            </button>
                        </div>

                        {!submitSuccess ? (
                            <form onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <input
                                        placeholder="Full Name"
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="border rounded-lg px-4 py-3"
                                    />

                                    <input
                                        placeholder="Email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        className="border rounded-lg px-4 py-3"
                                    />

                                    <input
                                        placeholder="Phone Number"
                                        required
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                phone: e.target.value,
                                            })
                                        }
                                        className="border rounded-lg px-4 py-3"
                                    />

                                    <input
                                        placeholder="Experience"
                                        value={formData.experience}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                experience: e.target.value,
                                            })
                                        }
                                        className="border rounded-lg px-4 py-3"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "8px",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            color: "#374151",
                                        }}
                                    >
                                        Resume / CV
                                    </label>

                                    <label
                                        htmlFor="resumeUpload"
                                        className="flex items-center justify-between cursor-pointer"
                                        style={{
                                            border: "1px solid #d1d5db",
                                            borderRadius: "12px",
                                            padding: "14px 16px",
                                            background: "#fafafa",
                                            transition: "all .2s ease",
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            {resumeFile ? (
                                                <>
                                                    <FileText size={20} color="#2563eb" />
                                                    <span
                                                        style={{
                                                            fontSize: "14px",
                                                            color: "#111827",
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {resumeFile.name}
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload size={20} color="#6b7280" />
                                                    <span
                                                        style={{
                                                            fontSize: "14px",
                                                            color: "#6b7280",
                                                        }}
                                                    >
                                                        Upload Resume (PDF, DOC, DOCX)
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        <span
                                            style={{
                                                fontSize: "12px",
                                                color: "#2563eb",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Browse
                                        </span>
                                    </label>

                                    <input
                                        id="resumeUpload"
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        style={{ display: "none" }}
                                        onChange={(e) => setResumeFile(e.target.files[0])}
                                    />
                                </div>

                                <textarea
                                    rows="4"
                                    placeholder="Message"
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            message: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-lg px-4 py-3 mb-5"
                                />

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{
                                        background: "#2563eb",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "10px",
                                        padding: "12px 24px",
                                        cursor: "pointer",
                                    }}
                                >
                                    {isSubmitting
                                        ? "Submitting..."
                                        : "Submit Application"}
                                </button>
                            </form>
                        ) : (
                            <div
                                style={{
                                    textAlign: "center",
                                    padding: "40px 20px",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "52px",
                                        marginBottom: "10px",
                                    }}
                                >
                                    ✅
                                </div>

                                <h3
                                    style={{
                                        fontSize: "24px",
                                        fontWeight: 700,
                                        marginBottom: "10px",
                                    }}
                                >
                                    Application Submitted
                                </h3>

                                <p style={{ color: "#666" }}>
                                    Thank you for applying. Our team will
                                    contact you soon.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}