import React, { useEffect, useState ,useRef} from "react";
import { useForm } from "react-hook-form";
import "../components/css/profile.css";
import axios from 'axios';
import Cookies from 'js-cookie'; 

function ProfilePage() {
 
  const { register, handleSubmit, formState: { errors },setValue} = useForm();
  const empid = Cookies.get('employeeID');
  const jwtToken = Cookies.get('jwt11');
  const imageRef = useRef();
  
  console.log(jwtToken,empid)

  const [detail,setDetail] = useState({});
  const [profile,setProfile] = useState({});
  const [view,setView] = useState(false);
  const [preview, setPreview] = useState(null); 
  const [fileset,setFileSet] = useState(null);
  const [imgset,setImgset] = useState(null);
  //check if login the view page....

  const checkCompOrNot = async () => { 
    try {
      const response = await axios.get(`http://localhost:8000/profile/api/checkfillornot/${empid}`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
      console.log("GETORNOT::: >",response.data.detailemployee);
      setView(response.data.success);
      setProfile(response.data.detailemployee)
      setImgset(response.data.detailemployee.profileImage)
      console.log("IMG RES:> ",response.data.detailemployee.profileImage)
    } catch (error) {
      console.error("Error in checkCompOrNot:", error.response || error.message);
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("File is her, ",file)
    if (file) {
      setFileSet(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);   
      };
      reader.readAsDataURL(file);
    }
  };

  
  const submitHandler = async (data) => { 
    try {
      console.log("Data is:: ", data);
      console.log("TOKEN::", jwtToken);

      const formData = new FormData();
      console.log(detail.name,data.firstName)
      formData.append("name", detail.name);
      formData.append("id", detail.id);
      formData.append("role", detail.role);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("fatherName", data.fatherName);
      formData.append("motherName", data.motherName);
      formData.append("birthDate", data.birthDate);
      formData.append("mail", detail.mail);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("gender", data.gender);
      formData.append("nationality", data.nationality);
      formData.append("religion", data.religion);
      formData.append("block", data.block);
      formData.append("street", data.street);
      formData.append("village", data.village);
      formData.append("taluka", data.taluka);
      formData.append("district", data.district);
      formData.append("pincode", data.pincode);
      formData.append("country", data.country);
      formData.append("bankName", data.bankName);
      formData.append("ifscCode", data.ifscCode);
      formData.append("accountNo", data.accountNo);
      formData.append("aadharNumber", data.aadharNumber);
      
      console.log(data.profileImage);
      data.profileImage=fileset;
      console.log(fileset); 
      if (data.profileImage) {
        console.log("IJDFSL: ",fileset);
        formData.append("profileImage", fileset);   
      }

      console.log("Form Data:", formData)
      const response = await axios.post(`http://localhost:8000/profile/api/add-detailprofile/${empid}`, formData, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      console.log(response.data); 
      checkCompOrNot()  
    } catch (error) {
      console.error("Error in form submission:", error);
      alert("ERROR {Form Submission}");
    }
  };

  useEffect(() => {
    checkCompOrNot();
    getDetailFirst();
   
  }, []);

  const getDetailFirst = async () =>{
    const response = await axios.get(`http://localhost:8000/profile/api/getEmpDetailbyid/${empid}`,{
      withCredentials: true,
      headers: {
          'Authorization': `Bearer ${jwtToken}` 
      }}); 
    setDetail(response.data);
  }

  

  return (
    <>
      <style jsx>{`
        body{
        background:#E2F1E7;
        }
        section{ 
        }
        .special-left {
          flex: 1 1 300px;
          padding-left: 18%;
        }

        .ppl-25 {
          padding-left: 25%;
        }
        .best-bg {
          background-color: #E2F1E7;
        }
        .zindex {
          z-index: 100;
        }
        .bg-main { 
        background-color: #243642;
         }
        .bg-accent {
         background-color: #387478; 
         }
        .text-accent { 
        color: #387478;
         }
        .text-light { 
        color: #E2F1E7;
         }
        .border-accent { border-color: #629584; }
        .border-light { border-color: #E2F1E7; }
 
        .profile-card { box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
        .rounded-custom { border-radius: 8px; }
        .profile-image { border: 3px solid #629584; }
        .section-title { font-size: 1.25rem; font-weight: 600; }

        .imgProf {
          width: 150px;
          height: 150px;
          border: 2px solid #387478; 
          background-size: cover;  
          background-position: center; 
          border-radius: 50%; 
}
 `}</style> 

      {
        view ? 
        
    <div>   
      <section className="pt-5 profile-container">
        <div className="container">
          <div className="card border-accent rounded-custom profile-card">
            <div className="card-header bg-accent text-center text-light">
              <h3 className="card-header-title mb-0 fs-4" style={{color:"white"}}>Profile Information</h3>
            </div>

            <div className="card-body"> 
            <div className="mb-4 ">
            <div className="col-md-3 text-center mx-auto">
              {/* <div className="imgProf" style={{width:"150px",height:"150px",margin:"auto",borderRadius:"50%"}}>
                <img src={imgset} style={{width:"90%",height:"90%"}}></img>
              </div> */}
              <div 
              className="imgProf" 
              style={{
                width: "150px",
                height: "150px",
                margin: "auto",
                borderRadius: "50%",
                overflow: "hidden", 
                display: "flex", 
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f0f0f0" 
              }}
            >
              <img 
                src={imgset} 
                alt="Profile" 
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",  
                }}
              />
            </div>

            </div>
          </div>
              <div className="row mb-3">
                <h5 className="section-title text-accent">Personal Information</h5>
                <div className="col-md-6"><p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p></div>
                <div className="col-md-6"><p><strong>ID:</strong> {profile.id}</p></div>
                <div className="col-md-6"><p><strong>Role:</strong> {profile.role}</p></div>
                <div className="col-md-6"><p><strong>Father's Name:</strong> {profile.fatherName}</p></div>
                <div className="col-md-6"><p><strong>Mother's Name:</strong> {profile.motherName}</p></div>
                <div className="col-md-6"><p><strong>Birth Date:</strong> {new Date(profile.birthDate).toLocaleDateString()}</p></div>
                <div className="col-md-6"><p><strong>Gender:</strong> {profile.gender}</p></div>
              </div>
      
              <div className="row mb-3">
                <h5 className="section-title text-accent">Contact Information</h5>
                <div className="col-md-6"><p><strong>Email:</strong> {profile.mail}</p></div>
                <div className="col-md-6"><p><strong>Phone Number:</strong> {profile.phoneNumber}</p></div>
              </div>
      
              <div className="row mb-3">
                <h5 className="section-title text-accent">Address</h5>
                <div className="col-md-6"><p><strong>Block:</strong> {profile.block}</p></div>
                <div className="col-md-6"><p><strong>Street:</strong> {profile.street}</p></div>
                <div className="col-md-6"><p><strong>Village:</strong> {profile.village}</p></div>
                <div className="col-md-6"><p><strong>Taluka:</strong> {profile.taluka}</p></div>
                <div className="col-md-6"><p><strong>District:</strong> {profile.district}</p></div>
                <div className="col-md-6"><p><strong>Pincode:</strong> {profile.pincode}</p></div>
                <div className="col-md-6"><p><strong>Country:</strong> {profile.country}</p></div>
              </div>
      
              <div className="row mb-3">
                <h5 className="section-title text-accent">Bank Information</h5>
                <div className="col-md-6"><p><strong>Bank Name:</strong> {profile.bankName}</p></div>
                <div className="col-md-6"><p><strong>IFSC Code:</strong> {profile.ifscCode}</p></div>
                <div className="col-md-6"><p><strong>Account Number:</strong> {profile.accountNo}</p></div>
              </div>
      
              <div className="row mb-3">
                <div className="col-md-12">
                  <p><strong>Aadhar Number:</strong> {profile.aadharNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
      </div>
        :
        <section className="pt-5 best-bg " style={{background:"#E2F1E7"}}>
        <div className="container ">
          <div className="row">
            <div className="col-xl-12">
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="card  border    rounded-3 mb-3   ">
                  {/* Card header */}
                  <div className="card-header bg-transparent border-bottom "> 
                    <div className="card-header bg-accent text-center text-light d-flex justify-content-between align-items-center">
                      <h3 className="card-header-title mb-0 fs-4" style={{color:"white"}}>Profile Information</h3>
                      <button  
                        className="btn btn-primary btn-sm" 
                        style={{background:"#E2F1E7",color:"black",border:"#E2F1E7"}}
                      > 
                        Save
                      </button>
                    </div>
                  </div>
                  {/* Card body START */}
                  <div className="card-body ">
                    <div className="d-flex flex-wrap justify-content-between  ">
                      {/* Left side: Image Upload */}
                      <div
                        className="upload-image mb-4 ppl-25 "
                        // style={{ flex: "1 1 120px", paddingLeft: "25%" }}
                      >
                        <label
                          className="rounded-circle position-relative cursor-pointer mb-4"
                          style={{ height: 120, width: 120 }}
                        >
                          <input
                            type="file"
                            className="imageUpload mb-2"
                            name="photo"
                            id="photo"
                            required=""
                            accept="image/*"
                            data-error="profile_photo-errors"
                            ref={imageRef}
                            onChange={handleImageChange}
                          />
                          {/* <button onClick={()=>imageRef?.current.click()} style={{border:"1px solid red"}}>Upload Image</button> */}
                           
                           <div
                            style={{
                              width: "100px",
                              height: "100px",
                              border: "1px solid #ccc",
                              marginTop: "10px",
                            }}
                          >
                            {preview && (
                              <img
                                src={preview}
                                alt="Preview"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              />
                            )}
                          </div>
                           
                        </label>
                        <div className="profile_photo-errors" />
                      </div>
                      {/* Right side: Profile Information (Name, ID, Gender) */}
                      <div
                        className="d-flex flex-column mt-4 justify-content-center flex-grow-1 ppl-25 "
                        // style={{ flex: "1 1 300px", paddingLeft: "18%" }}
                      >
                        <div className="mb-2">
                          <p className="form-control-static" id="user_name"
                          >
                             
                            Name : {detail.name}
                          </p>
                        </div>
                        <div className="mb-2">
                          <p className="form-control-static" id="user_id">
                            {/* ID: {profile.id} */}
                            ID : {detail.id}
                          </p>
                        </div>
                        <div className="mb-2">
                          <p className="form-control-static" id="user_role">
                            {/* Role : {profile.role} */}
                            Role : {detail.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card border rounded-3 mb-3 ">
                  {/* Card header */}
                  <div className="card-header bg-transparent border-bottom">
                    <h3 className="card-header-title mb-0 fs-5">
                      Basic Information
                    </h3>
                  </div>
                  {/* Card body START */}
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-md-4 mb-4 ">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          {...register("firstName", {
                            required: "Name is required",
                            minLength: {
                              value: 3,
                              message:
                                "Name must be at least 3 characters long",
                            },
                            maxLength: {
                              value: 50,
                              message: "Name cannot exceed 50 characters",
                            },
                          })}
                          className="form-control"
                        />
                        {errors.firstName && (
                          <p className="error-message">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div className="col-md-4 mb-4">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          {...register("lastName", {
                            required: "Name is required",
                            minLength: {
                              value: 3,
                              message:
                                "Name must be at least 3 characters long",
                            },
                            maxLength: {
                              value: 50,
                              message: "Name cannot exceed 50 characters",
                            },
                          })}
                          className="form-control"
                        />
                        {errors.lastname && (
                          <p className="error-message">{errors.lastName.message}</p>
                        )}
                      </div>
                      <div className="col-md-4 mb-4">
                        <label>ID</label>
                        <input
                          readonly
                          type="text"
                          value={detail.id}
                          name="id"
                         
                          className="form-control"
                        />
                        {errors.id && (
                          <p className="error-message">{errors.id.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-md-4 mb-4">
                        <label>Father's Name</label>
                        <input
                          type="text"
                          name="fatherName"
                          {...register("fatherName", {
                            required: "Father Name is required",
                            minLength: {
                              value: 3,
                              message:
                                "Father Name must be at least 3 characters long",
                            },
                            maxLength: {
                              value: 50,
                              message:
                                "Father Name cannot exceed 50 characters",
                            },
                          })}
                          className="form-control"
                        />
                        {errors.fatherName && (
                          <p className="error-message">{errors.fatherName.message}</p>
                        )}
                        
                      </div>
                      <div className="col-md-4 mb-4">
                        <label>Mother's Name</label>
                        <input
                          type="text"
                          name="motherName"
                          {...register("motherName", {
                            required: "Mother Name is required",
                            minLength: {
                              value: 3,
                              message:
                                "Mother Name must be at least 3 characters long",
                            },
                            maxLength: {
                              value: 50,
                              message:
                                "Mother Name cannot exceed 50 characters",
                            },
                          })}
                          className="form-control"
                        />
                        {errors.mothername && (
                          <p className="error-message">{errors.motherName.message}</p>
                        )}
                      </div>
                      <div className="col-md-4 mb-4">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          name="dob"
                          {...register("birthDate", {
                            required: "Date of Birth is required",
                          })}
            
                          className="form-control"
                        />
                        {errors.birthDate && (
                          <p className="error-message">{errors.birthDate.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-md-4 mb-4">
                        <label>Email</label>
                        <input
                          readOnly
                          value={detail.mail}
                          type="email"
                          name="email" 

                          className="form-control"
                        />
                        {errors.email && (
                          <p className="error-message">{errors.email.message}</p>
                        )}
                      </div>
                      <div className="col-md-4 mb-4">
                        <label>Phone</label>
                        <input
                          type="text"
                          name="phone"
                          {...register("phoneNumber", {
                            required: "Phone is required",
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: "Invalid Phone",
                            },
                          })}
                          className="form-control"
                        />
                        {errors.phoneNumber && (
                          <p className="error-message">{errors.phoneNumber.message}</p>
                        )}
                      </div>
                      <div className="col-md-4 mb-4">
                        <label>Gender</label>
                        <select
                          name="gender"
                          {...register("gender", {
                            required: "Gender is required",
                          }
                          )}
                          className="form-control"
                        >

                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>

                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-4">
                        <label>Role</label>
                        <input
                          readOnly
                          value={detail.role}
                          type="text"
                          name="role"  
                          className="form-control"
                        /> 

                      </div>
                      <div className="col-md-4 mb-4">
                        <label>Nationality</label>
                        <input
                          type="text"
                          name="nationality"
                          {...register("nationality", {
                            required: "Nationality is required",
                          })}

                          className="form-control"
                        />
                        {errors.national
                          && (
                            <p className="error-message">{errors.nationality.message}</p>   
                          )}
                        
                      </div>
                      <div className="col-md-4 ">
                        <label>Religion</label>
                        <input
                          type="text"
                          name="religion"
                          {...register("religion", {
                            required: "Religion is required",
                          })}

                          className="form-control"
                        />
                        {errors.religion && (
                          <p className="error-message">{errors.religion.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card  border rounded-3 mb-3 ">
                  {/* Card header */}
                  <div className="card-header bg-transparent border-bottom">
                    <h3 className="card-header-title mb-0 fs-5">Address</h3>
                  </div>
                  {/* Card body START */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Block</label>
                          <input
                            type="text"
                            name="block"
                            {...register("block", {
                              required: "Block is required",
                            })}
                            className="form-control"
                          />
                          {errors.block && (
                            <p className="error-message">{errors.block.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Street</label>
                          <input
                            type="text"
                            name="street"
                            {...register("street", {
                              required: "Street is required",
                            })}
                            className="form-control"
                          />
                          {errors.street && (
                            <p className="error-message">{errors.street.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Village</label>
                          <input
                            type="text"
                            name="village"
                            {...register("village", {
                              required: "Village is required",
                            })}
                            className="form-control"
                          />
                          {errors.village && (
                            <p className="error-message">{errors.village.message}</p>
                          )}

                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Taluka</label>
                          <input
                            type="text"
                            name="taluka"
                            {...register("taluka", {
                              required: "Taluka is required",
                            })}

                            className="form-control"
                          />
                          {errors.taluka && (
                            <p className="error-message">{errors.taluka.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>District</label>
                          <input
                            type="text"
                            name="district"
                            {...register("district", {
                              required: "District is required",
                            })}

                            className="form-control"
                          />
                          {errors.district && (
                            <p className="error-message">{errors.district.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Pincode</label>
                          <input
                            type="text"
                            name="pincode"
                            {...register("pincode", {
                              required: "Pincode is required",
                              pattern: {
                                value: /^[0-9]{6}$/,
                                message: "Invalid Pincode",
                              },  
                            })}

                            className="form-control"
                          />
                          {errors.pincode && (
                            <p className="error-message">{errors.pincode.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>State</label>
                          <input
                            type="text"
                            name="state"
                            {...register("state", {
                              required: "State is required",
                            })}
                            className="form-control"
                          />
                          {errors.state && (
                            <p className="error-message">{errors.state.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Country</label>
                          <input
                            type="text"
                            name="country"
                            {...register("country", {
                              required: "Country is required",
                            })}
                            className="form-control"
                          />
                          {errors.country && (
                            <p className="error-message">{errors.country.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card  border rounded-3 mb-3">
                  {/* Card header */}
                  <div className="card-header bg-transparent border-bottom">
                    <h3 className="card-header-title mb-0 fs-5">
                      Personal Details
                    </h3>
                  </div>
                  {/* Card body START */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Bank Name</label>
                          <input
                            type="text"
                            name="bankName"
                            {...register("bankName", {
                              required: "Bank Name is required",
                            })}
                            className="form-control"
                          />
                          {errors.bankName && (
                            <p className="error-message">{errors.bankName.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>IFSC Code</label>
                          <input
                            type="text"
                            name="ifscCode"
                            {...register("ifscCode", {
                              required: "IFSC Code is required",
                            })}
                            className="form-control"
                          />
                          {errors.ifscCode && (
                            <p className="error-message">{errors.ifscCode.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Account Number</label>
                          <input
                            type="text"
                            name="accountNumber"
                            {...register("accountNo", {
                              required: "Account Number is required",
                              pattern: {
                                value: /^[0-9]{9,18}$/,
                                message: "Invalid Account Number",
                              },
                            })}
                            className="form-control"
                          />
                          {errors.accountNo && (
                            <p className="error-message">{errors.accountNo.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label>Aadhar Number</label>
                          <input
                            type="text"
                            name="aadhar_number"
                            {...register("aadharNumber", {
                              required: "Aadhar Number is required",
                              pattern: {
                                value: /^[0-9]{12}$/,
                                message: "Invalid Aadhar Number",
                              },
                            })}
                            className="form-control"
                          />
                          {errors.aadharNumber && (
                            <p className="error-message">{errors.aadharNumber.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div> 
        </div> 
      </section>

        
      }
    </>
 
 
);
}

export default ProfilePage;
